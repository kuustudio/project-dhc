<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

//基本SQL语句 如果不需要同步要求的数据可以使用LOW_PRIORITY
//规则 INSERT INTO TABLENAME (KEY1,KEY2...) VALUES ({@VALUE1},{@VALUE2},...);
define('INSERT_STR', 'INSERT INTO `{table}` ({keys}) VALUES ({values})');
define('UPDATE_STR', 'UPDATE `{table}` SET {sets} {where}');
define('SELECT_STR', 'SELECT {fields} FROM `{table}` {where}');
define('DELETE_STR', 'DELETE FROM `{table}` {where}');

define('ORDER_BY_ASC', 1);
define('ORDER_BY_DESC', -1);

define('MYSQL_WHERE_SYMBOL', 'symbol');

class mysql implements Idb{
    private static $_conn;
    private static $_tableName;

    public static function init($connectionstring,$database){
        if(self::$_conn == null){
            try{
                $s = parse_url($connectionstring);
                self::$_conn = mysql_connect($s['host'].':'.$s['port'], $s['user'], $s['pass'], true);
                mysql_select_db($database, self::$_conn);
                self::query("SET character_set_connection=utf8, character_set_results=utf8, character_set_client=binary", self::$_conn);
                self::query("SET sql_mode = ''", self::$_conn);
            }catch(Exception $e){
                Error::logError(CORE_MODEL_EC_DB_INIT_FAILED, EXCEPTION);
            }
		}
    }

    private static $_order_by = array(
                                    ORDER_BY_ASC    =>  'ASC',
                                    ORDER_BY_DESC   =>  'DESC'
                                );

    public static function setTableName($tableName){
        self::$_tableName = $tableName;
    }

    private static function _makeKey($key){
        return '[@'.$key.']';
    }

    private static function _keyEqValue($key){
        return $key.'=[@'.$key.']';
    }

    private static function _where($where, & $whereKeyValue){
        $_whereContainer = array();
        foreach ($where as $key => $value_arr) {
            $_whereContainer[] = $key.$value_arr['symbol'].'[@'.$key.']';
            $whereKeyValue[$key] = $value_arr['value'];
        }
        return ' WHERE '.implode(' AND ',$_whereContainer);
    }



    public static function create($data){
        $keys = array_keys($data);
        $search = array_map(array('self','_makeKey'),$keys);
        $sql = str_replace('{table}', self::$_tableName, INSERT_STR);
        $sql = str_replace('{keys}', implode(',',$keys), $sql);
        $sql = str_replace('{values}', implode(',',$search), $sql);
        if(self::execute($sql,$data))
            return self::insertId();
    }

    //默认情况下where只考虑and
    public static function update($data, $where = array()){
        $dataKeys = array_keys($data);
        $_where = array();
        $whereSql = empty($where)?'':self::_where($where,$_where);
        $sql = str_replace('{table}', self::$_tableName, UPDATE_STR);
        $sql = str_replace('{sets}', implode(',',array_map(array('self','_keyEqValue'),$dataKeys)), $sql);
        $sql = str_replace('{where}', $whereSql, $sql);
        return self::execute($sql,$data+$_where);
    }


    public static function all($where = array(), $fields = '*', $sort = array(), $limit = array(), $fetch_type = MYSQL_ASSOC){
        $_where = array();
        $whereSql = empty($where)?'':self::_where($where,$_where);
        if($fields != '*')
            $fields = implode(',',$fields);
        $sql = str_replace('{table}', self::$_tableName, SELECT_STR);
        $sql = str_replace('{fields}', $fields, $sql);
        $sql = str_replace('{where}', $whereSql, $sql);
        if(!empty($sort)){
            $sql .= ' ORDER BY ';
            $sort_tmp = array();
            foreach ($sort as $key => $value) {
                $sort_tmp[] = $key.' '.self::$_order_by[$value];
            }
            $sql .= implode(',', $sort_tmp);
        }
        if(!empty($limit['length'])){
            if(empty($limit['offset']))
                $sql .= ' LIMIT '.$limit['length'];
            else
                $sql .= ' LIMIT '.$limit['offset'].','.$limit['length'];
        }
        $query = self::query($sql, self::$_conn, $_where);
        $rows = array();
        if(!$query){
            self::_error($sql, self::$_conn);
        }

        while($row = mysql_fetch_array($query, $fetch_type)) {
            $rows[] = $row;
        }
        return $rows;
    }


    public static function delete($where = array()){
        $_where = array();
        $whereSql = empty($where)?'':self::_where($where,$_where);
        $sql = str_replace('{table}', self::$_tableName, DELETE_STR);
        $sql = str_replace('{where}', $whereSql, $sql);
        return self::execute($sql,$_where);
    }

   
    public static function query($sql, $conn, $replace = array()){
        if (!is_resource($conn)) {    // 
            Error::logError(CORE_DB_MYSQL_EC_NO_CONNECT, EXCEPTION);
            return false;
        }
        $argc = count($replace);
        if($argc){
            foreach ($replace as $key => $value) {
                if(is_string($value)){
                    $sql = str_replace('[@'.$key.']', '\''.self::conn_real_escape_string($value, $conn).'\'', $sql);
                }elseif (is_scalar($value)) {
                    $sql = str_replace('[@'.$key.']', $value, $sql);
                }else{
                    $bad_param = str_replace("\n", '', var_export($value, true));
                    Error::logError(CORE_DB_MYSQL_EC_NON_SCALAR, EXCEPTION, array('SQL_query_parameter'=>$value,'var'=>$bad_param,'sql'=>$sql));  
                    return false;
                }
            }


            if ($sql=='') {  
                Error::logError(CORE_DB_MYSQL_EC_SQL_QUERY_PARAMETER_MISSING, EXCEPTION, array('sql'=>$sql));
            }
        }else{
            $sql = str_replace('%%', '%', $sql);
        }
        $ret = @mysql_query($sql, $conn);
        if(!$ret){
            self::_error($sql, $conn);
        }
        return $ret;
    }

    private static function conn_real_escape_string($str, $conn = NULL) {
        if (!$conn) {
            $escaped = @mysql_real_escape_string($str);
            if (!$escaped) {
              return mysql_escape_string($str);
            } else {
              return $escaped;
            }
        }
        return mysql_real_escape_string($str, $conn);
    }

    public static function insertId(){
        return mysql_insert_id();
    }

    public static function execute($sql, $argv = array()){
        return self::query($sql, self::$_conn, $argv) or self::_error($sql, self::$_conn) or die();
    }

    public static function _q($sql){
        if (!is_resource($conn)) {    // 
            Error::logError(CORE_DB_MYSQL_EC_NO_CONNECT, EXCEPTION);
            return false;
        }
        $ret = @mysql_query($sql, self::conn);
        if(!$ret){
            self::_error($sql, self::conn);
        }
        return $ret;
    }

    private static function _error($sql, $conn){
        Error::logError(CORE_DB_MYSQL_EC_SYSTEM_ERROR, ERROR_SHOW, array('sql'=>$sql,'mysql_errno'=>mysql_errno($conn),'mysql_error'=>mysql_error($conn)));
    } 
}
