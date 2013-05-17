<?php
class Store_Controller_Dish extends Store_Controller_Base {

    public $model_dish;

    public function init(){
        if(!$this->isLogin()) return $this->redirect(MONK::_url('index/login'));
        $this->model_dish = MONK::getSingleton('Store_Model_Dish');
        parent::init();
    }

    //添加系列
    public function actionAdddishcategory_AJAX_POST(){
        $this->_setType(array('category_name'=>PARAM_STRING),'post');
        $category_name = $this->_post('category_name');
        if(empty($category_name) || strlen($category_name)>100) return $this->_json_return(false,array('name'=>'category_name'));
        $category_id = $this->model_dish->create_category(array('account_id'=>$this->store['account_id'],'category_name'=>$category_name));
        return $this->_json_return($category_id,array('category_id'=>$category_id));
    }

    //编辑系列
    public function actionEditdishcategory_AJAX_POST(){
        $this->_setType(array('category_id'=>PARAM_STRING,'category_name'=>PARAM_STRING),'post');
        $category_id = $this->_post('category_id');
        $category_name = $this->_post('category_name');
        if(empty($category_id)) return $this->_json_return(false);
        if(empty($category_name) || strlen($category_name)>100) return $this->_json_return(false,array('name'=>'category_name'));
        $r = $this->model_dish->update_category(array('account_id'=>$this->store['account_id'],'category_id'=>$category_id,'category_name'=>$category_name));
        return $this->_json_return($r);
    }
    //删除系列
    public function actionDeletedishcategory_AJAX_POST(){
        $this->_setType(array('category_id'=>PARAM_STRING),'post');
        $category_id = $this->_post('category_id');
        if(empty($category_id)) return $this->_json_return(false);
        $r = $this->model_dish->delete_category(array('account_id'=>$this->store['account_id'],'category_id'=>$category_id));
        return $this->_json_return($r);
    }
    
    //添加菜品
    public function actionAdddish_AJAX_POST(){
        $this->_setType(array('category_id'=>PARAM_STRING,'dish_name'=>PARAM_STRING,'dish_price'=>PARAM_FLOAT),'post');
        $category_id = $this->_post('category_id');
        $dish_name = $this->_post('dish_name');
        $dish_price = $this->_post('dish_price');
        if(empty($category_id)) return $this->_json_return(false);
        if(empty($dish_name) || strlen($dish_name)>100) return $this->_json_return(false,array('name'=>'dish_name'));
        if(empty($dish_price)) return $this->_json_return(false,array('name'=>'dish_price'));
        $dish_id = $this->model_dish->create_dish(array('account_id'=>$this->store['account_id'],'category_id'=>$category_id,'dish_name'=>$dish_name,'dish_price'=>$dish_price));
        return $this->_json_return($dish_id,array('dish_id'=>$dish_id,'dish_name'=>$dish_name,'dish_price'=>$dish_price));
    }

    //编辑菜品
    public function actionEditdish_AJAX_POST(){
        $this->_setType(array('dish_id'=>PARAM_STRING,'dish_name'=>PARAM_STRING,'dish_price'=>PARAM_FLOAT),'post');
        $dish_id = $this->_post('dish_id');
        $dish_name = $this->_post('dish_name');
        $dish_price = $this->_post('dish_price');
        if(empty($dish_id)) return $this->_json_return(false);
        if(empty($dish_name) || strlen($dish_name)>100) return $this->_json_return(false,array('name'=>'dish_name'));
        if(empty($dish_price)) return $this->_json_return(false,array('name'=>'dish_price'));
        $r = $this->model_dish->update_dish(array('account_id'=>$this->store['account_id'],'dish_id'=>$dish_id,'dish_name'=>$dish_name,'dish_price'=>$dish_price));
        return $this->_json_return($r);
    }
    //删除菜品
    public function actionDeletedish_AJAX_POST(){
        $this->_setType(array('dish_id'=>PARAM_STRING),'post');
        $dish_id = $this->_post('dish_id');
        if(empty($dish_id)) return $this->_json_return(false);
        $r = $this->model_dish->delete_dish(array('account_id'=>$this->store['account_id'],'dish_id'=>$dish_id));
        return $this->_json_return($r);
    }

    //菜品上架
    public function actionPushdish_AJAX_POST(){
        $this->_setType(array('dish_id'=>PARAM_STRING,'dish_push'=>PARAM_BOOL),'post');
        $dish_id = $this->_post('dish_id');
        $dish_push = $this->_post('dish_push');
        $dish_push = !$dish_push;
        $r = $this->model_dish->push_dish(array('account_id'=>$this->store['account_id'],'dish_id'=>$dish_id,'dish_push'=>$dish_push));
        return $this->_json_return($r);
    }

    //编辑图
    public function actionEditdishimg(){
        //$this->_setType(array('dish_id'=>PARAM_STRING,'dish_push'=>PARAM_UNIT),'post');
    }

    //编辑文
    public function actionEditdishinfo(){
        $this->_setType(array('dish_id'=>PARAM_STRING,'dish_info'=>array('func'=>PARAM_STRING,'argv'=>PARAM_TEXT)),'post');
        $dish_id = $this->_post('dish_id');
        $dish_info = $this->_post('dish_info');
        $r = $this->model_dish->update_dish_info(array('account_id'=>$this->store['account_id'],'dish_id'=>$dish_id,'dish_info'=>$dish_info));
        return $this->_json_return($r);
    }
}