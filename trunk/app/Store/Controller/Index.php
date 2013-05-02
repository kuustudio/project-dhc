<?php
class Store_Controller_Index extends Store_Controller_Base {

    public function actionIndex(){
        $this->render();
    }

    public function actionHome(){
        $this->render();
    }

    public function actionLogin(){
        $this->assign('no_topbar',true);
        $this->render();
    }

    public function actionReg(){
        $this->assign('no_topbar',true);
        $this->render();
    }
}
