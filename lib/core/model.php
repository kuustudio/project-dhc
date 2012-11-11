<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

/*
 * model 是各类数据库的单表映射，并具有数据库工厂的功能，
 * 调用map文件对数据库输入数据进行类型验证，
 * 一致性统一调度
 */
define('DRIVERPATH', DHC_LIB.'core'.DS.'db'.DS);

class model implements Imodel{
    //需要实现的接口函数
    //public function init(){}
    //public function validator(){}
    //public function validateAttribute($attrName, $typeName){}

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

    const CREATE_TIME_FIELD = 'created';

    const UPDATE_TIME_FIELD = 'updated';

    public function __construct(){
        $map = $this->_getMap($this->_mapName);
        $this->_dbType = $map['type'];
        $this->_tableName = $map['table'];
        $this->_primary = $map['primary'];
        $this->_validateKeyMap = $map['field'];
        $this->_dbFactory($this->_dbType);
        call_user_func_array(array($this->_dbType, 'setTableName'), array('tableName'=>$this->_tableName));
    }

    public function setMapName($map_name){
        $this->_mapName = $map_name;
    }

    private function _dbFactory($dbType){
        try{
            include(DRIVERPATH.$dbType.'.php');
            $DSN = DHC::getConfig($dbType);
            $dbType::init($DSN['master']['one']['connectionString'],$DSN['master']['one']['database']);
        }catch(exception $e){
            DHC::_exception($e);
        }
    }

    private function _getMap($name){
        return include(DHC::getConfig('map_path').$name.'.php');
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

    public function validateAtrribute($value, $typeName){
        $func = validator::$function_array[$typeName];
        return validator::$func($value);
    }

    public function create($data){
        if(empty($data)) Error::logError(CORE_MODEL_EC_NO_CREATE_DATA, EXCEPTION);
        if(isset($data[$this->_primary['name']]) && isset($data[$this->_primary['auto_increment']]) && $data[$this->_primary['auto_increment']] == true)
            unset($data[$this->_primary['name']]);
        if(DHC::getConfig('db_write_validate')){
           $data = $this->validator_data($data);
        }
        $this->_setTime(self::CREATE_TIME_FIELD, $data);
        call_user_func_array(array($this->_dbType, 'create'), array('data'=>$data));
    }

    public function update($data, $where = array()){
        if(empty($data)) Error::logError(CORE_MODEL_EC_NO_UPDATE_DATA, EXCEPTION);
        if(isset($data[$this->_primary['name']]) && isset($data[$this->_primary['auto_increment']]) && $data[$this->_primary['auto_increment']] == true)
            unset($data[$this->_primary['name']]);
        if(DHC::getConfig('db_write_validate')){
           $data = $this->validator_data($data);
        }
        $this->_setTime(self::UPDATE_TIME_FIELD, $data);
        if (DHC::getConfig('db_where_validate') && !$where) {
            $where = $this->validator_where($where);
        }
        call_user_func_array(array($this->_dbType, 'update'), array('data'=>$data,'where'=>$where));
    }

    //$where格式 array('key1'=>'value1',...);
    //$fields格式 array('value1','value2',...);
    //$sort格式 array('key1'=>1,'key2'=>-1,...);
    //$limit格式 array('offset'=>2,'length'=>10); offset可以为空
    public function all($where = array(), $fields = '*', $sort = array(), $limit = array()){
        if (DHC::getConfig('db_where_validate') && !$where) {
            $where = $this->validator_where($where);
        }
        $map_field_keys = array_keys($this->_validateKeyMap);
        if($fields != '*' && is_array($fields)) $fields = array_values(array_intersect($fields, $map_field_keys));
        return call_user_func_array(array($this->_dbType, 'all'), array('where'=>$where,'fields'=>$fields,'sort'=>$sort,'limit'=>$limit));
    }

    public function one($where = array(), $fields = '*', $sort = array()){
        $rows = $this->all($where,$fields,$sort,array('length'=>1));
        if(!empty($rows)) return $rows[0];
        return array();
    }

    public function delete($where = array()){
        call_user_func_array(array($this->_dbType, 'delete'), array('where'=>$where));
    }

    private function _setTime($time_field, & $data){
        if(!in_array($time_field, array_keys($data)) && in_array($time_field, array_keys($this->_validateKeyMap))){
            $data[$time_field] = time();
        }
    }

}