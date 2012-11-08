<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

class mysql implements Idb{
    private $_instance;
    private $_conn;

    public static function init($connectionstring,$database){
        if($this->_instance == null){
            $this->_instance = new mysql();
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

    public function query($sql, $conn){
        if (!is_resource($conn)) {    // 
            Error::logError(CORE_DB_MYSQL_EC_NO_CONNECT,array('file'=>__FILE__,'line'=>__LINE__));
            return false;
        }
        $argv = func_get_args();
        $argc = count($argv);
        if($argc > 2){
            for ($x=2; $x<$argc; $x++) {                 
              if (is_string($argv[$x])) {             
                $sql_str = $argv[$x];
                $sql_str = $this->conn_real_escape_string($sql_str, $conn); 
                $sql_params[] = '\''.$sql_str.'\'';    
              } elseif (is_scalar($argv[$x])) {        
                $sql_params[] = $argv[$x];             
              } else {                                  
                $bad_param = str_replace("\n", '', var_export($argv[$x], true));
                Error::logError(CORE_DB_MYSQL_EC_NON_SCALAR,array('file'=>__FILE__,'line'=>__LINE__,"SQL_query_parameter"=>$argv[$x],'var'=>$bad_param,'sql'=>$sql));  
                return false;
              }
            }

            $true_sql = vsprintf($sql, $sql_params);    

            if ($true_sql=='') {  
                Error::logError(CORE_DB_MYSQL_EC_SQL_QUERY_PARAMETER_MISSING,array('file'=>__FILE__,'line'=>__LINE__,'sql'=>$sql));
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

    public function execute($sql){
        return $this->query($sql, $this->_conn) or Error::logError(CORE_DB_MYSQL_EC_EXECUTE_FAILED,array('file'=>__FILE__,'line'=>__LINE__,'sql'=>$sql,'mysql_error'=>mysql_error())) or die();
    }

    /**
    * @reutrn Assoc
    */
    public static function findOne($sql){
        $query = $this->query($sql, $this->_conn);
        while($row = mysql_fetch_assoc($query)) {
            return $row;
        }
        return null;
    }
    /**
    * @reutrn Array(Assoc,)
    */
    public static function find($sql,$fetch_type = MYSQL_ASSOC){
        $query = $this->query($sql, $this->_conn);
        $rows = array();
        $err = mysql_error();
        if($err != null){
            Error::logError(CORE_DB_MYSQL_EC_EXECUTE_FAILED,array('file'=>__FILE__,'line'=>__LINE__,'sql'=>$sql,'mysql_error'=>mysql_error()));
        }
        while($row = mysql_fetch_array($query, $fetch_type)) {
            $rows[] = $row;
        }
        return $rows;
    }
}
