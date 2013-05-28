<?php
class Store_Model_Menu extends model {

    private $sqls = array(
        'get' => 'select * from `store` where `account_id` = [@account_id];',
        'set_online' => 'update `store` set `is_online`=[@is_online],`updated`=[@updated],`category_with_dish`=[@category_with_dish] where `account_id` = [@account_id]',
    );

    public function __construct(){
        parent::__construct();
    }

    public function get($account_id){
        if(empty($account_id)) return false;
        $m = mysql::fetch('store', $this->sqls['get'], array('account_id'=>$account_id));
        if(!empty($m)) return array_shift($m);
        return false;
    }

    public function set_online($account_id,$is_online,$category_with_dish = null){
        if(empty($account_id)) return false;
        mysql::execute('store', $this->sqls['set_online'], array('account_id'=>$account_id,'is_online'=>$is_online,'category_with_dish'=>$category_with_dish,'updated'=>time()));
        return true;
    }

}