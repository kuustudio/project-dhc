<?php
class Store_Controller_Menu extends Store_Controller_Base {

    public function init(){
        $this->isLogin();
        parent::init();
    }

    public function actionIndex(){
        //获取菜品分类
        $model_dish = MONK::getSingleton('Store_Model_Dish');
        $categorys = $model_dish->get_category_all($this->store['account_id']);
        $this->assign('categorys',$categorys);
        $this->render();
    }
    
    //菜单上线
    public function actionPushonline_AJAX_POST(){
        $this->_setType(array('is_online'=>PARAM_BOOL),'post');
        $is_online = intval($this->_post('is_online'));
        echo $is_online;
    }

}