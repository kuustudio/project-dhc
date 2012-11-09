<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');


class mysqlModel implements Imodel{
    //需要实现的接口函数
    //public function init(){}
    //public function validator(){}
    //public function validateAttribute($attrName, $typeName){}

    //数据库操作句柄
    private $_db;

    //数据库类型
    private $_dbType;

    //表名称
    private $_tableName;

    //主键名称
    private $_primary;

    //用于验证的键值对
    private $_validateKeyMap;


    const $mapPath = DHC_CONF.'map'.DS;

    public function init($map_name){
        list($this->_dbType,$this->_tableName,$this->_primary,$this->_validateKeyMap) = $this->_getMap($name);
        $DSN = DHC::getConfig($this->_dbType);
        $this->_db = {$this->_dbType}::init($DSN['master']['one']['connectionstring'],$DSN['master']['one']['database']);
    }

    private function _getMap($name){
        return include_once(DHC::getConfig('map_path').$name.'.php');
    }

    public function validator($data){
        $_data = array();
        foreach ($data as $key => $value) {
            $_data[$key] = $this->validateAtrribute($value, $this->_validateKeyMap[$key]);
        }
        return $_data;
    }

    public function validateAtrribute($value, $typeName){
        return {validator::$function_array[$typeName]}($value);
    }

    public function create($data){
        $_data = array_intersect_key($data, $this->_validateKeyMap);
        if(DHC::getConfig('db_write_validate')){
           $_data = $this->validator($_data);
        }
    }

    public function update(){

    }

    public function select(){

    }

    public function one(){

    }
}