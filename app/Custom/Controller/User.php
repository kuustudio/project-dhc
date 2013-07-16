<?php
/*
* 喵空间
*/
class Custom_Controller_User extends Custom_Controller_Base {

    public function actionList(){
        return $this->render();
    }

    public function actionHome(){
        $this->assign('page_name','Home');
        return $this->render();
    }

    public function actionShare(){
        $this->assign('page_name','Share');
        return $this->render();
    }

    public function actionLike(){
        $this->assign('page_name','Share');
        return $this->render();
    }

    public function actionMagazine(){
        $this->assign('page_name','Share');
        return $this->render();
    }

    public function actionFollowmagazine(){
        $this->assign('page_name','Share');
        return $this->render();
    }

    public function actionFollow(){
        $this->assign('page_name','Follow');
        return $this->render();
    }

    public function actionFans(){
        $this->assign('page_name','Follow');
        return $this->render();
    }

    public function actionGroup(){
        $this->assign('page_name','Group');
        return $this->render();
    }

    public function actionInfo(){
        $this->assign('page_name','Info');
        return $this->render();
    }
}
