<?php
class Store_Controller_Dish extends Store_Controller_Base {
    public function actionIndex(){
        $this->render();
    }

    public function actionAdddishcategory(){
        $this->_setType(array('name'=>PARAM_STRING,'msg'=>PARAM_STRING));
        $this->assign('name',$this->_get('name'));
        $this->assign('msg',$this->_get('msg'));
        $this->render();
    }

    public function actionAdddishcategory_POST(){
        $this->_setType(array('category_name'=>PARAM_STRING),'post');
        $category_name = $this->_post('category_name');
        if(empty($category_name)) return $this->redirect(MONK::_url('*/Adddishcategory',array('name'=>'category_name','msg'=>urlencode('名称不能不填哦 ~_~'))));
        if(strlen($category_name)>100) return $this->redirect(MONK::_url('*/Adddishcategory',array('name'=>'category_name','msg'=>urlencode('名称太长了哦 ~_~'))));
        $model_dish = MONK::getSingleton('Store_Model_Dish');
        $category_id = $model_dish->create_category($category_name);
        if($category_id){
            return $this->redirect(MONK::_url('menu/index'));
        }else{
            return $this->redirect(MONK::_url('*/Adddishcategory',array('name'=>'category_name','msg'=>urlencode('创建不成功，请重新试试吧 ~_~'))));
        }
    }

    public function actionAdddish(){
        $this->_setType(array('name'=>PARAM_STRING,'msg'=>PARAM_STRING));
        $this->assign('name',$this->_get('name'));
        $this->assign('msg',$this->_get('msg'));
        $this->render();
    }
}