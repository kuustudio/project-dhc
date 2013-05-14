<?php
class Store_Model_Dish extends model {

    private $sqls = array(
        'create_category'    => 'insert into `dish_category`(`category_name`,`created`,`updated`) values([@category_name],[@created],[@updated]);',
    );

    public function __construct(){
        parent::__construct();
    }

    public function create_category($name){
        $data = array();
        $data['category_name'] = $name;
        $data['created'] = $data['updated'] = time();
        mysql::execute('dish_category', $this->sqls['create_category'], $data);
        return mysql::insertId();
    }

}