<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

class mysql implements Idb{
    private $_instance;
    private $_conn;

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

    public function query($sql, $conn, $search = array(), $replace = array()){
        if (!is_resource($conn)) {    // 
            Error::logError(CORE_DB_MYSQL_EC_NO_CONNECT, EXCEPTION);
            return false;
        }
        $argc = count($replace);
        if($argc){
            for ($x=0; $x<$argc; $x++) {                 
              if (is_string($replace[$x])) {             
                $sql_str = $replace[$x];
                $sql_str = $this->conn_real_escape_string($sql_str, $conn); 
                $sql_params[] = '\''.$sql_str.'\'';    
              } elseif (is_scalar($replace[$x])) {        
                $sql_params[] = $replace[$x];             
              } else {                                  
                $bad_param = str_replace("\n", '', var_export($replace[$x], true));
                Error::logError(CORE_DB_MYSQL_EC_NON_SCALAR, EXCEPTION, array('SQL_query_parameter'=>$replace[$x],'var'=>$bad_param,'sql'=>$sql));  
                return false;
              }
            }

            //$true_sql = vsprintf($sql, $sql_params);
            $true_sql = str_replace($search, $replace, $sql);

            if ($true_sql=='') {  
                Error::logError(CORE_DB_MYSQL_EC_SQL_QUERY_PARAMETER_MISSING, EXCEPTION, array('sql'=>$sql));
            }
        }else{
            $true_sql = str_replace('%%', '%', $sql);
        }
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

    public function execute($sql, $search = array(), $argv = array()){
        return $this->query($sql, $this->_conn, $search, $argv) or Error::logError(CORE_DB_MYSQL_EC_EXECUTE_FAILED, EXCEPTION, array('sql'=>$sql,'mysql_error'=>mysql_error())) or die();
    }

    /**
    * @reutrn Assoc
    */
    public static function findOne($sql, $search = array(), $argv = array()){
        $query = $this->query($sql, $this->_conn, $search, $argv);
        while($row = mysql_fetch_assoc($query)) {
            return $row;
        }
        return null;
    }
    /**
    * @reutrn Array(Assoc,)
    */
    public static function find($sql, $search = array(), $argv = array(), $fetch_type = MYSQL_ASSOC){
        $query = $this->query($sql, $this->_conn, $search, $argv);
        $rows = array();
        $err = mysql_error();
        if($err != null){
            Error::logError(CORE_DB_MYSQL_EC_EXECUTE_FAILED, EXCEPTION, array('sql'=>$sql,'mysql_error'=>mysql_error()));
        }
        while($row = mysql_fetch_array($query, $fetch_type)) {
            $rows[] = $row;
        }
        return $rows;
    }
}
