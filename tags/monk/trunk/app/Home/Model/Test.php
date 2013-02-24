<?php
class Home_Model_Test extends model {

    var $test1_map = array();
    var $test2_map = array();

    protected $sqls = array(
        'create1'   => 'insert into test1(`name`,`created`,`value`) values([@name],[@created],[@value]);',
        'select1'   => 'select * from test1,test2 where test1.name = [@test1.name] and test1.name = test2.name;',
    );
    
    public function __construct(){
        parent::__construct();
    }

    /*
    *
    * 传入的$data的key应该和SQL语句中的[@key]相匹配
    *
    */
    public function create($data){
        mysql::execute($this->getSql('create1'),$data);

    }

    public function select($data){
        $d = mysql::fetch($this->getSql('select1'),$data);

    }
}