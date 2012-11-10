<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

//基本SQL语句 如果不需要同步要求的数据可以使用LOW_PRIORITY
//规则 INSERT INTO TABLENAME (KEY1,KEY2...) VALUES ({@VALUE1},{@VALUE2},...);
define('INSERT_STR', 'INSERT INTO `{table}` ({keys}) VALUES ({values})');
define('UPDATE_STR', 'UPDATE `{table}` SET {sets} {where}');
define('SELECT_STR', 'SELECT `{fields}` FROM {table} {where}');
define('DELETE_STR', 'DELETE FROM `{table}` {where}');

define('ORDER_BY_ASC', 1);
define('ORDER_BY_DESC', -1);

class mysql implements Idb{
    private $_instance;
    private $_conn;
    private $_tableName;

    public static function init($connectionstring,$database){
        if($this->_instance == null){
            $this->_instance = DHC::getSingleton('mysql');
        }

        if($this->_conn == null){
			$s = parse_url($connectionstring);
			$this->_conn = mysql_connect($s['host'].':'.$s['port'], $s['user'], $s['pass'], true, MYSQL_CLIENT_SSL | MYSQL_CLIENT_COMPRESS);
			mysql_select_db($database, $this->_conn);
			$this->query("SET character_set_connection=utf8, character_set_results=utf8, character_set_client=binary", $this->_conn);
			$this->query("SET sql_mode = ''", $this->_conn);
		}

        return $this->_instance;
    }

    private static $_order_by = array(
                                    ORDER_BY_ASC    =>  'ASC',
                                    ORDER_BY_DESC   =>  'DESC'
                                );

    public function setTableName($tableName){
        $this->_tableName = $tableName;
    }

    private function _makeKey($key){
        return '[@'.$key.']';
    }

    private function _keyEqValue($key){
        return $key.'=[@'.$key.']';
    }

    private function _order(){

    }


    public function create($data){
        $keys = array_keys($data);
        $search = array_map(array($this,'_makeKey'),$keys);
        $sql = str_replace('{table}', $this->_tableName, INSERT_STR);
        $sql = str_replace('{keys}', implode(',',$keys), $sql);
        $sql = str_replace('{values}', implode(',',$search), $sql);
        if($this->execute($sql,$data))
            return $this->insertId();
    }

    //默认情况下where只考虑and
    public function update($data, $where = array()){
        $dataKeys = array_keys($data);
        $whereKeys = array_keys($where);
        $sql = str_replace('{table}', $this->_tableName, UPDATE_STR);
        $sql = str_replace('{sets}', implode(',',array_map(array($this,'_keyEqValue'),$dataKeys)), $sql);
        $sql = str_replace('{where}', implode(' AND ',array_map(array($this,'_keyEqValue'),$whereKeys)), $sql);
        return $this->execute($sql,$data+$where);
    }


    public function all($where = array(), $fields = '*', $sort = array(), $limit = array()){
        $whereKeys = array_keys($where);
        $sql = str_replace('{table}', $this->_tableName, SELECT_STR);
        $sql = str_replace('{fields}', ($fields == '*')?'*':implode(',',$fields), $sql);
        $sql = str_replace('{where}', empty($whereKeys)?'':implode(' AND ',array_map(array($this,'_keyEqValue'),$whereKeys)), $sql);
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
        $query = $this->query($sql, $this->_conn, $where);
        $rows = array();
        if(!$query){
            $this->_error($this->_conn);
        }

        while($row = mysql_fetch_array($query, $fetch_type)) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function one($where = array(), $fields = '*'){
        $rows = $this->all($where, $fields,array(),array('length'=>1));
        return $rows[0];
    }

    public function delete($where = array()){
        $whereKeys = array_keys($where);
        $sql = str_replace('{table}', $this->_tableName, DELETE_STR);
        $sql = str_replace('{where}', empty($whereKeys)?'':implode(' AND ',array_map(array($this,'_keyEqValue'),$whereKeys)), $sql);
        return $this->execute($sql,$where);
    }

   
    public function query($sql, $conn, $replace = array()){
        if (!is_resource($conn)) {    // 
            Error::logError(CORE_DB_MYSQL_EC_NO_CONNECT, EXCEPTION);
            return false;
        }
        $argc = count($replace);
        if($argc){
            foreach ($replace as $key => $value) {
                if(is_string($value)){
                    $sql = str_replace('[@'.$key.']', '\''.$this->conn_real_escape_string($value, $conn).'\'', $sql);
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
            $this->_error($conn);
        }
        return $ret;
    }

    private function conn_real_escape_string($str, $conn = NULL) {
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

    public function insertId(){
        return mysql_insert_id();
    }

    public function execute($sql, $argv = array()){
        return $this->query($sql, $this->_conn, $argv) or $this->_error($this->_conn) or die();
    }

    public function _q($sql){
        if (!is_resource($conn)) {    // 
            Error::logError(CORE_DB_MYSQL_EC_NO_CONNECT, EXCEPTION);
            return false;
        }
        $ret = @mysql_query($sql, $this->conn);
        if(!$ret){
            $this->_error($this->conn);
        }
        return $ret;
    }

    private function _error($conn){
        Error::logError(CORE_DB_MYSQL_EC_SYSTEM_ERROR, EXCEPTION, array('sql'=>$sql,'mysql_errno'=>mysql_errno($conn),'mysql_error'=>mysql_error($conn)));
    } 
}
