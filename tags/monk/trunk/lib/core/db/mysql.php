<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

class mysql implements Idb{
    private static $_conn;

    public static function init($connectionstring,$database){
        if(self::$_conn == null){
            try{
                $s = parse_url($connectionstring);
                self::$_conn = mysql_connect($s['host'].':'.$s['port'], $s['user'], $s['pass'], true);
                mysql_select_db($database, self::$_conn);
                self::command("SET character_set_connection=".MONK::getConfig('character_set_connection').", character_set_results=".MONK::getConfig('character_set_results').", character_set_client=".MONK::getConfig('character_set_client').";", self::$_conn);
                self::command("SET sql_mode = '".MONK::getConfig('sql_mode')."';", self::$_conn);
            }catch(Exception $e){
                throw new Exception(CORE_MODEL_EC_DB_INIT_FAILED);
            }
		}
    }

    public static function insertId(){
        return mysql_insert_id();
    }
    
    //获取数据
    public static function fetch($sql){
        $rows = array();
        $rs = self::escape_query($sql, self::$_conn, $argv) or self::_error($sql, self::$_conn) or die();
        if (!$rs) { return false; }
        while (($row = mysql_fetch_assoc($rs))) {
            $rows[] = $row;
        }
        return $rows;
    }
    
    
    //执行语句
    public static function execute($sql, $argv = array()){
        return self::escape_query($sql, self::$_conn, $argv) or self::_error($sql, self::$_conn) or die();
    }
    

    public static function command($sql, $conn = null){
        if(empty($conn)) $conn = self::$_conn;
        if (!is_resource($conn)) {    // 
            throw new Exception(CORE_DB_MYSQL_EC_NO_CONNECT);
        }
        $ret = @mysql_query($sql, $conn);
        if(!$ret){
            self::_error($sql, $conn);
        }
        return $ret;
    }

    public static function escape_query($sql, $conn, $replace = array()){
        if (!is_resource($conn)) {    // 
            throw new Exception(CORE_DB_MYSQL_EC_NO_CONNECT);
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
        return self::command($sql, $conn);
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

    private static function _error($sql, $conn){
        Error::logError(CORE_DB_MYSQL_EC_SYSTEM_ERROR, ERROR_SHOW, array('sql'=>$sql,'mysql_errno'=>mysql_errno($conn),'mysql_error'=>mysql_error($conn)));
    } 
}
