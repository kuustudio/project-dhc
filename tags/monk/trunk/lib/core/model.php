<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

/*
 * model 是数据实体模型，
 * 调用map文件对数据库输入数据进行类型验证，
 * 一致性统一调度
 */
define('DRIVERPATH', MONK_LIB.'core'.DS.'db'.DS);

class model implements Imodel{
    //需要实现的接口函数
    //public function validateAttribute($attrName, $typeName){}
    
    //存储模型用到的所有SQL原型
    protected $sqls = array();

    private $maps = array();

    public function __construct(){
        
    }

    public function getMap($name,$driver = 'mysql'){
        if(!isset($this->maps[$name]) || empty($this->maps[$name])){
            if(file_exists(MONK::getConfig('map_path').$driver.DS.$name.'.php'))
                $this->maps[$name] = include(MONK::getConfig('map_path').$driver.DS.$name.'.php');
            else
                throw new Exception('映射文件路径`'.MONK::getConfig('map_path').$driver.DS.$name.'.php'.'`不存在',CORE_MODEL_EC_MAP_FILE_CONNOT_FOUND);
        }
            
        return $this->maps[$name];
    }

    public function getSql($key){
        if(!empty($this->sqls[$key]))
            return $this->sqls[$key];
        else
            throw new Exception('该键`'.$key.'`不存在对应的SQL语句',CORE_MODEL_EC_NOT_SQL);
    }

    public function validateAtrribute($value, $typeName){
        $func = validator::$function_array[$typeName];
        return validator::$func($value);
    }

    public function validator(){
        
    }

    
    /*
    private $_mapName;

    //数据库操作句柄
    private $_db;

    //数据库类型
    private $_dbType;

    //表名称
    private $_tableName;

    //主键信息
    private $_primary = array();

    //用于验证的键值对
    private $_validateKeyMap = array();

    public function setMapName($map_name){
        $this->_mapName = $map_name;
    }

    private function _dbFactory($dbType){
        try{
            include(DRIVERPATH.$dbType.'.php');
            $DSN = MONK::getConfig($dbType);
            $dbType::init($DSN['master']['one']['connectionString'],$DSN['master']['one']['database']);
        }catch(exception $e){
            MONK::_exception($e);
        }
    }

    //field所有都需要验证
    public function validator_data($data){
        $_data = array_intersect_key($data, $this->_validateKeyMap);
        foreach ($_data as $key => $value) {
            $_data[$key] = $this->validateAtrribute($value, $this->_validateKeyMap[$key]);
        }
        return $_data;
    }
    //field所有都需要验证
    public function validator_where($where){
        $_where = array_intersect_key($where, $this->_validateKeyMap);
        foreach ($_where as $key => $value_arr) {
            $_where[$key]['value'] = $this->validateAtrribute($value_arr['value'], $this->_validateKeyMap[$key]);
        }
        return $_where;
    }
    

    private function _setTime($time_field, & $data){
        if(!in_array($time_field, array_keys($data)) && in_array($time_field, array_keys($this->_validateKeyMap))){
            $data[$time_field] = time();
        }
    }

    public function q($com){
        return call_user_func_array(array($this->_dbType, 'q'), array($com));
    }
    */

}