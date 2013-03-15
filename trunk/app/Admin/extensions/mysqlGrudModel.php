<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

//基本SQL语句 如果不需要 同步要求的数据可以使用LOW_PRIORITY
//规则 INSERT INTO TABLENAME (KEY1,KEY2...) VALUES ({@VALUE1},{@VALUE2},...);
define('INSERT_STR', 'INSERT INTO `{table}` ({keys}) VALUES ({values})');
define('UPDATE_STR', 'UPDATE `{table}` SET {sets} {where}');
define('SELECT_STR', 'SELECT {fields} FROM `{table}` {where}');
define('DELETE_STR', 'DELETE FROM `{table}` {where}');

define('ORDER_BY_ASC', 1);
define('ORDER_BY_DESC', -1);

define('MYSQL_WHERE_SYMBOL', 'symbol');

class mysqlGrudModel implements model{

    private $_mapName;

    //表名称
    private $_tableName;

    const CREATE_TIME_FIELD = 'created';

    const UPDATE_TIME_FIELD = 'updated';

    private $_order_by = array(
        ORDER_BY_ASC    =>  'ASC',
        ORDER_BY_DESC   =>  'DESC'
    );

    public function __construct(){
        
    }

    public function setTableName($tableName){
        $this->_tableName = $tableName;
    }

    public function setMapName($mapName){
        $this->_mapName = $mapName;
    }

    private function _makeKey($key){
        return '[@'.$key.']';
    }

    private function _keyEqValue($key){
        return $key.'=[@'.$key.']';
    }

    private function _where($where, & $whereKeyValue){
        $_whereContainer = array();
        foreach ($where as $key => $value_arr) {
            $_whereContainer[] = $key.$value_arr[MYSQL_WHERE_SYMBOL].'[@'.$key.']';
            $whereKeyValue[$key] = $value_arr['value'];
        }
        return ' WHERE '.implode(' AND ',$_whereContainer);
    }

    private function _setTime($time_field, & $data){
        if(!in_array($time_field, array_keys($data))){
            $data[$time_field] = time();
        }
    }

    public function create($data){
        if(empty($data)) Error::logError('创建数据为空', CORE_MODEL_EC_NO_CREATE_DATA);
        $this->_setTime($this->CREATE_TIME_FIELD, $data);
        $keys = array_keys($data);
        $search = array_map(array('this','_makeKey'),$keys);
        $sql = str_replace('{table}', $this->_tableName, INSERT_STR);
        $sql = str_replace('{keys}', implode(',',$keys), $sql);
        $sql = str_replace('{values}', implode(',',$search), $sql);
        if(mysql::execute($this->_mapName, $sql,$data))
            return mysql::insertId();
    }

    public function update($data, $where = array()){
        if(empty($data)) Error::logError('更新数据为空', CORE_MODEL_EC_NO_UPDATE_DATA);

        $this->_setTime($this->UPDATE_TIME_FIELD, $data);
        $dataKeys = array_keys($data);
        $_where = array();
        $whereSql = empty($where)?'':$this->_where($where,$_where);
        $sql = str_replace('{table}', $this->_tableName, UPDATE_STR);
        $sql = str_replace('{sets}', implode(',',array_map(array('this','_keyEqValue'),$dataKeys)), $sql);
        $sql = str_replace('{where}', $whereSql, $sql);
        return mysql::execute($this->_mapName, $sql,$data+$_where);
    }

    //$where格式 array('key1'=>'value1',...);
    //$fields格式 array('value1','value2',...);
    //$sort格式 array('key1'=>1,'key2'=>-1,...);
    //$limit格式 array('offset'=>2,'length'=>10); offset可以为空
    public function all($where = array(), $fields = '*', $sort = array(), $limit = array()){
        $_where = array();
        $whereSql = empty($where)?'':$this->_where($where,$_where);
        if($fields != '*')
            $fields = implode(',',$fields);
        $sql = str_replace('{table}', $this->_tableName, SELECT_STR);
        $sql = str_replace('{fields}', $fields, $sql);
        $sql = str_replace('{where}', $whereSql, $sql);
        if(!empty($sort)){
            $sql .= ' ORDER BY ';
            $sort_tmp = array();
            foreach ($sort as $key => $value) {
                $sort_tmp[] = $key.' '.$this->_order_by[$value];
            }
            $sql .= implode(',', $sort_tmp);
        }
        if(!empty($limit['length'])){
            if(empty($limit['offset']))
                $sql .= ' LIMIT '.$limit['length'];
            else
                $sql .= ' LIMIT '.$limit['offset'].','.$limit['length'];
        }
        return mysql::fetch($this->_mapName, $sql, $_where);
    }

    public function one($where = array(), $fields = '*', $sort = array()){
        $rows = $this->all($where,$fields,$sort,array('length'=>1));
        if(!empty($rows)) return $rows[0];
        return array();
    }

    public function delete($where = array()){
        $_where = array();
        $whereSql = empty($where)?'':$this->_where($where,$_where);
        $sql = str_replace('{table}', $this->_tableName, DELETE_STR);
        $sql = str_replace('{where}', $whereSql, $sql);
        return mysql::execute($this->_mapName, $sql,$_where);
    }


}