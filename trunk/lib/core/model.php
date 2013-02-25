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
    
    //$isMultiple 是否多表结构
    //$tables 如果是单表，则是表名称字符串，如果是多表，则是表数组

    public function M($func,$tables,$data,$isMultiple = false){
        if(MONK::getConfig('db_param_validate'))
            $data = $this->validator($tables,$data,$isMultiple);
        return $this->$func($this->sqls[$func],$data);
    }

    public function validateAtrribute($value, $typeName){
        $func = validator::$function_array[$typeName];
        return validator::$func($value);
    }

    public function validator($tables,$data,$isMultiple = false){
        $_data = array();
        if($isMultiple){
            $table_map_finish = array();
            foreach($tables as $table){
                $table_map = $this->getMap($table);
                foreach($table_map['field'] as $key=>$type){
                    $table_map_finish[$table_map['table'].'.'.$key] = $type;
                }
            }
            $_data = array_intersect_key($data, $table_map_finish);
            foreach($_data as $key => $value){
                $_data[$key] = $this->validateAtrribute($value, $table_map_finish[$key]);
            }
        }else{
            $table_map = $this->getMap($tables);
            $_data = array_intersect_key($data, $table_map['field']);
            foreach ($_data as $key => $value) {
                $_data[$key] = $this->validateAtrribute($value, $table_map['field'][$key]);
            }
        }
        
        return $_data;
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