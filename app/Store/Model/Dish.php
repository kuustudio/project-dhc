<?php
class Store_Model_Dish extends model {

    private $sqls = array(
        'create_category'   => 'insert into `dish_category`(`category_id`,`account_id`,`category_name`,`created`,`updated`) values([@category_id],[@account_id],[@category_name],[@created],[@updated]);',
        'get_category_all'  => 'select `category_id`,`category_name` from `dish_category` where `account_id` = [@account_id] order by created desc;',
        'update_category'   => 'update `dish_category` set `category_name`=[@category_name],`updated`=[@updated] where `account_id` = [@account_id] and `category_id` = [@category_id]',
        'delete_category'   => 'delete from `dish_category` where `account_id` = [@account_id] and `category_id` = [@category_id]',
        'delete_dish_by_category_id'   => 'delete from `dish` where `account_id` = [@account_id] and `category_id` = [@category_id]',
        'create_dish'       => 'insert into `dish`(`dish_id`,`account_id`,`category_id`,`dish_name`,`dish_price`,`created`,`updated`) values([@dish_id],[@account_id],[@category_id],[@dish_name],[@dish_price],[@created],[@updated]);',
        'get_dish_all'      => 'select * from `dish` where `account_id` = [@account_id] order by created asc;',
        'update_dish'       => 'update `dish` set `dish_name`=[@dish_name],`dish_price`=[@dish_price],`updated`=[@updated] where `account_id` = [@account_id] and `dish_id` = [@dish_id]',
        'delete_dish'       => 'delete from `dish` where `account_id` = [@account_id] and `dish_id` = [@dish_id]',
        'push_dish'         => 'update `dish` set `dish_push`=[@dish_push],`updated`=[@updated] where `account_id` = [@account_id] and `dish_id` = [@dish_id]',
    );

    public function __construct(){
        parent::__construct();
    }

    public function get_category_all($account_id){
        return mysql::fetch('dish_category', $this->sqls['get_category_all'],array('account_id'=>$account_id));
    }

    public function create_category($data){
        $data['created'] = $data['updated'] = time();
        $data['category_id'] = md5($data['category_name'].$data['created'].rand());
        mysql::execute('dish_category', $this->sqls['create_category'], $data);
        return $data['category_id'];
    }

    public function update_category($data){
        $data['updated'] = time();
        mysql::execute('dish_category', $this->sqls['update_category'], $data);
        return true;
    }

    public function delete_category($data){
        mysql::startTrans();
        mysql::execute('dish_category', $this->sqls['delete_category'], $data);
        mysql::execute('dish', $this->sqls['delete_dish_by_category_id'], $data);
        mysql::commit();
        return true;
    }

    public function create_dish($data){
        $data['created'] = $data['updated'] = time();
        $data['dish_id'] = md5($data['dish_name'].$data['created'].rand());
        mysql::execute('dish', $this->sqls['create_dish'], $data);
        return $data['dish_id'];
    }

    public function get_dish_all($account_id){
        return mysql::fetch('dish', $this->sqls['get_dish_all'],array('account_id'=>$account_id));
    }

    public function update_dish($data){
        $data['updated'] = time();
        mysql::execute('dish', $this->sqls['update_dish'], $data);
        return true;
    }

    public function delete_dish($data){
        mysql::execute('dish', $this->sqls['delete_dish'], $data);
        return true;
    }

    public function push_dish($data){
        $data['updated'] = time();
        mysql::execute('dish', $this->sqls['push_dish'], $data);
        return true;
    }

}