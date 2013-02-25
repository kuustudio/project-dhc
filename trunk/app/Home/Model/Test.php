<?php
class Home_Model_Test extends model {

    var $test1_map = array();
    var $test2_map = array();

    protected $sqls = array(
        'create'   => 'insert into test1(`name`,`created`,`value`) values([@name],[@created],[@value]);',
        'select'   => 'select test1.name as t1name,test1.value as t1value,test2.value as t2value from test1,test2 where test1.name = [@test1.name] and test1.name = test2.name;',
    );
    
    public function __construct(){
        parent::__construct();
    }

    /*
    *
    * 传入的$data的key应该和SQL语句中的[@key]相匹配
    *
    */
    public function create($sql, $data){
        mysql::execute($sql, $data);

    }

    public function select($sql, $data){
        return mysql::fetch($sql, $data);

    }
}