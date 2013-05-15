<?php
class Store_Model_Dish extends model {

    private $sqls = array(
        'create_category'   => 'insert into `dish_category`(`category_id`,`account_id`,`category_name`,`created`,`updated`) values([@category_id],[@account_id],[@category_name],[@created],[@updated]);',
        'get_category_all'  => 'select `category_id`,`category_name` from `dish_category` where `account_id` = [@account_id] order by created desc;',
    );

    public function __construct(){
        parent::__construct();
    }

    public function create_category($data){
        $data['created'] = $data['updated'] = time();
        $data['category_id'] = md5($data['category_name'].$data['created'].rand());
        mysql::execute('dish_category', $this->sqls['create_category'], $data);
        return $data['category_id'];
    }

    public function get_category_all($account_id){
        return mysql::fetch('dish_category', $this->sqls['get_category_all'],array('account_id'=>$account_id));
    }

}