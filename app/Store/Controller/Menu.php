<?php
class Store_Controller_Menu extends Store_Controller_Base {

    public function init(){
        if(!$this->isLogin()) return $this->redirect(MONK::_url('index/login'));
        parent::init();
    }

    public function actionIndex(){
        //获取菜单上线状态
        $model_menu = MONK::getSingleton('Store_Model_Menu');
        $menu = $model_menu->get($this->store['account_id']);
        if(empty($menu)) return false;
        $this->assign('menu',$menu);
        //获取菜品分类
        $model_dish = MONK::getSingleton('Store_Model_Dish');
        $categorys = $model_dish->get_category_all($this->store['account_id']);
        $dishs = $model_dish->get_dish_all($this->store['account_id']);
        $this->assign('categorys',$categorys);
        $this->assign('dishs',$dishs);
        $this->render();
    }
    
    //菜单上线
    public function actionPushonline_AJAX_POST(){
        $this->_setType(array('is_online'=>PARAM_BOOL),'post');
        $is_online = intval($this->_post('is_online'));
        $model_menu = MONK::getSingleton('Store_Model_Menu');
        $r = $model_menu->set_online($this->store['account_id'],$is_online);
        return $this->_json_return($r);
    }

}