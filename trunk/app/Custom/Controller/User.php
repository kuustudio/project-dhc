<?php
/*
* 喵空间
*/
class Custom_Controller_User extends Custom_Controller_Base {

    public function init(){
        $this->assign('page_name',MONK::getConfig('action'));
    }

    public function actionList(){
        return $this->render();
    }

    public function actionHome(){
        return $this->render();
    }

    public function actionShare(){
        return $this->render();
    }

    public function actionFriend(){
        return $this->render();
    }

    public function actionGroup(){
        return $this->render();
    }

    public function actionInfo(){
        return $this->render();
    }
}
