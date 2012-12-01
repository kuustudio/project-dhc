<?php
class Admin_Controller_Base extends controller {
    public function init(){
       $this->assign('Title','web');
       $this->assign('Description','web');
       $this->assign('Keywords','web');
    }
}