<?php
class Store_Model_Menu extends model {

    private $sqls = array(
        'get' => 'select * from `menu` where `account_id` = [@account_id];',
        'set_online' => 'update `menu` set `is_online`=[@is_online],`updated`=[@updated] where `account_id` = [@account_id]',
    );

    public function __construct(){
        parent::__construct();
    }

    public function get($account_id){
        if(empty($account_id)) return false;
        $m = mysql::fetch('menu', $this->sqls['get'], array('account_id'=>$account_id));
        if(!empty($m)) return array_shift($m);
        return false;
    }

    public function set_online($account_id,$is_online){
        if(empty($account_id)) return false;
        mysql::execute('menu', $this->sqls['set_online'], array('account_id'=>$account_id,'is_online'=>$is_online,'updated'=>time()));
        return true;
    }

}