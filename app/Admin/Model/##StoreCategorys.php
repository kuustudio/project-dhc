<?php
class Admin_Model_Category extends model {

    public function __construct(){
        parent::__construct();
    }

    public $_category = array(
        0 => '不限',
        1 => '种子期',
        2 => '初创期',
        3 => '成长期',
        4 => '扩张期',
        5 => '成熟期',
        6 => 'Pre-IPO',
    );
}