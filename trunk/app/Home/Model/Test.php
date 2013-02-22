<?php
class Home_Model_Test extends model {

    var $test1_map = array();
    var $test2_map = array();

    protected $sqls = array(
        'create1'   => 'insert into test1(`name`,`created`,`value`) values([@name],[@created],[@value]);'
    );
    
    public function __construct(){
        $this->test1_map = $this->getMap('test1');
        $this->test2_map = $this->getMap('test2');
        parent::__construct();
    }

    public function create($data){
        echo $this->getSql('create1');
        mysql::execute('create1',$data);

    }
}