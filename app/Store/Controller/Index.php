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
        $admin_model_store = MONK::getSingleton('Admin_Model_Store');
        $this->assign('store_categorys',$admin_model_store->_store_categorys);
        $this->assign('no_topbar',true);
        $this->render();
    }

    public function actionLogout(){
        
    }
}
