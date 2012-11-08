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
			$this->_conn = mysql_connect($s['host'].':'.$s['port'], $s['user'], $s['pass'], true, MYSQL_CLIENT_SSL|MYSQL_CLIENT_COMPRESS);
			mysql_select_db($database, $this->_conn);
			self::query("SET character_set_connection=utf8, character_set_results=utf8, character_set_client=binary", $this->_conn);
			self::query("SET sql_mode = ''", $this->_conn);
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

        }
    }
}
