<?php
/*
* 用户中心首页
*/
class Custom_Controller_Home extends Custom_Controller_Base {
    
    public function init(){
        //验证是否登陆
        parent::init();
    }
    public function actionIndex(){
        $this->render();
    }
}
