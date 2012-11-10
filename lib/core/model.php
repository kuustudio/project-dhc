<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

/*
 * model 是各类数据库的单表映射，并具有数据库工厂的功能，
 * 调用map文件对数据库输入数据进行类型验证，
 * 一致性统一调度
 */

class model implements Imodel{
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

    //主键信息
    private $_primary = array();

    //用于验证的键值对
    private $_validateKeyMap = array();


    const $mapPath      = DHC_CONF.'map'.DS;
    const $driverPath   = DHC_LIB.'core'.DS.'db'.DS;

    public function init($map_name){
        list($this->_dbType, $this->_tableName, $this->_primary, $this->_validateKeyMap) = $this->_getMap($name);
        $this->_db = $this->_dbFactory($this->_dbType);
        $this->_db->setTableName($this->_tableName);
    }

    private function _dbFactory($dbType){
        $db = null;
        try{
            include($this->$driverPath.$dbType.'.php');
            $DSN = DHC::getConfig($dbType);
            $db = {$dbType}::init($DSN['master']['one']['connectionstring'],$DSN['master']['one']['database']);
        }catch($e){
            DHC::_exception($e);
        }
        if(!$db){
            Error::logError(CORE_MODEL_EC_DB_INIT_FAILED, EXCEPTION);
        }
        return $db;
    }

    private function _getMap($name){
        return include(DHC::getConfig('map_path').$name.'.php');
    }

    //field所有都需要验证
    public function validator($data){
        $_dataContainer = array();
        $_data = array_intersect_key($data, $this->_validateKeyMap);
        foreach ($_data as $key => $value) {
            $_dataContainer[$key] = $this->validateAtrribute($value, $this->_validateKeyMap[$key]);
        }
        return $_dataContainer;
    }

    public function validateAtrribute($value, $typeName){
        return {validator::$function_array[$typeName]}($value);
    }

    public function create($data){
        if(empty($data)) Error::logError(CORE_MODEL_EC_NO_CREATE_DATA, EXCEPTION);
        if(isset($data[$this->_primary['name']]) && isset($data[$this->_primary['auto_increment']]) && $data[$this->_primary['auto_increment']] == true)
            unset($data[$this->_primary['name']]);
        if(DHC::getConfig('db_write_validate')){
           $data = $this->validator($data);
        }
        call_user_func_array(array($this->_db, 'create'), array('data'=>$data));
    }

    public function update($data, $where = array()){
        if(empty($data)) Error::logError(CORE_MODEL_EC_NO_UPDATE_DATA, EXCEPTION);
        if(isset($data[$this->_primary['name']]) && isset($data[$this->_primary['auto_increment']]) && $data[$this->_primary['auto_increment']] == true)
            unset($data[$this->_primary['name']]);
        if(DHC::getConfig('db_write_validate')){
           $data = $this->validator($data);
        }
        if (DHC::getConfig('db_where_validate') && !$where) {
            $where = $this->validator($where);
        }
        call_user_func_array(array($this->_db, 'update'), array('data'=>$data,'where'=>$where));
    }

    //$where格式 array('key1'=>'value1',...);
    //$fields格式 array('value1','value2',...);
    //$sort格式 array('key1'=>1,'key2'=>-1,...);
    //$limit格式 array('offset'=>2,'length'=>10); offset可以为空
    public function all($where = array(), $fields = array(), $sort = array(), $limit = array()){
        if (DHC::getConfig('db_where_validate') && !$where) {
            $where = $this->validator($where);
        }
        $map_field_keys = array_keys($this->_validateKeyMap);
        $fields = array_values(array_intersect($fields, $map_field_keys));
        call_user_func_array(array($this->_db, 'all'), array('where'=>$where,'fields'=>$fields,'sort'=>$sort,'limit'=>$limit));
    }

    public function one($where = array(), $fields = array()){
        if (DHC::getConfig('db_where_validate') && !$where) {
            $where = $this->validator($where);
        }
        $map_field_keys = array_keys($this->_validateKeyMap);
        $fields = array_values(array_intersect($fields, $map_field_keys));
        call_user_func_array(array($this->_db, 'one'), array('where'=>$where,'fields'=>$fields));
    }

    public function delete($where = array()){
        call_user_func_array(array($this->_db, 'delete'), array('where'=>$where));
    }
}