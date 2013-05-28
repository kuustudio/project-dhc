<?php
class Store_Controller_Menu extends Store_Controller_Base {
    
    public $model_menu = null,$model_dish = null;

    public function init(){
        if(!$this->isLogin()) return $this->redirect(MONK::_url('index/login'));
        $this->model_menu = MONK::getSingleton('Store_Model_Menu');
        $this->model_dish = MONK::getSingleton('Store_Model_Dish');
        parent::init();
    }

    public function actionIndex(){
        //获取菜单上线状态
        $menu = $this->model_menu->get($this->store['account_id']);
        if(empty($menu)) return false;
        $this->assign('menu',$menu);
        //获取菜品分类
        $categorys = $this->model_dish->get_category_all($this->store['account_id']);
        $dishs = $this->model_dish->get_dish_all($this->store['account_id']);
        $this->assign('categorys',$categorys);
        $this->assign('dishs',$dishs);
        $this->render();
    }
    
    //菜单上线
    public function actionPushonline_AJAX_POST(){
        $this->_setType(array('is_online'=>PARAM_BOOL),'post');
        $is_online = intval($this->_post('is_online'));
        $categorys = $this->model_dish->get_category_all($this->store['account_id']);
        $dishs = $this->model_dish->get_dish_all($this->store['account_id']);
        $c_d = array();
        foreach($dishs as $dish){
            if(!empty($dish['dish_push'])){
                foreach($categorys as $category){
                    $c_d[$category['category_id']]['Dish'][] = $dish;
                }
            }
            continue;
        }
        $r = $this->model_menu->set_online($this->store['account_id'],$is_online,json_encode($c_d));
        return $this->_json_return($r);
    }

}