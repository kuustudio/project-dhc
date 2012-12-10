<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

class mongodb implements Idb{
    private static $_conn;
    private static $_collection;

    public static function init($connectionString,$database){
        $mongo = new Mongo($connectionString);
        self::$_conn = $mongo->{$database};
    }

    public static function setTableName($collection){
        self::$_collection = $collection;
    }

    public static function create($data){
        return self::$_conn->{self::$_collection}->save($data);
    }

    public static function update($data, $where = array()){
        //return self::$_conn->{self::$_collection}->update($where, array('$set'=>$newobj), array('upsert'=>$upsert));
    }
}