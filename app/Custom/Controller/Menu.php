<?php
/*
* 今日菜单页面，可根据楼，距离等筛选及排序
**/
class Custom_Controller_Menu extends Custom_Controller_Base {

    public function actionIndex(){
        //根据当前地点获取距离最近的菜单
        $model_menu = MONK::getSingleton('Custom_Model_Menu');
        $store = $model_menu->get_all_by_place(8,29.785459,121.537835,1,100);
        //dump($store);
        $this->render();
    }
}
