<?php
class Admin_Model_Custom extends model {
    public function __construct(){
        $this->setMapName('Custom');
        parent::__construct();
    }
}