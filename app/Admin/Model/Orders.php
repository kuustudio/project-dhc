<?php
class Admin_Model_Orders extends model {
    public function __construct(){
        $this->setMapName('Orders');
        parent::__construct();
    }
}