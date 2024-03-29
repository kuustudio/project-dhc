<?php
/*
* 店铺
**/
class Custom_Controller_Store extends Custom_Controller_Base {

    public function actionList(){
        //根据当前地点获取距离最近的菜单
        $model_store = MONK::getSingleton('Custom_Model_Store');
        $store = $model_store->get_all_by_place(8,29.785459,121.537835,1,100);
        //dump($store);
        return $this->render();
    }

    public function actionIndex(){
        $this->_setType(array('l'=>PARAM_STRING));
        $l = $this->_get('l');
        if(empty($l)) $l = 'productlist';
        return $this->render(array('action'=>$l));
    }

    public function actionProduct(){
        return $this->render();
    }

}
