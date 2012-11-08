<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');


class mysqlModel implements Imodel{
    //需要实现的接口函数
    //public function init(){}
    //public function validator(){}
    //public function validateAttribute($attrName, $typeName){}

    //数据库操作句柄
    private $_db;

    //用于验证的表映射
    private $_validateMap;

    public function init(){
        
    }

    public function validator(){
        
    }

    public function validateAtrribute($attrName, $typeName){
        
    }
}