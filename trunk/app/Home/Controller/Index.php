<?php
class Home_Controller_Index extends controller {
    public function init(){
        //parent::init();
    }
    public function actionIndex(){
        $model_store = DHC::getSingleton('Home_Model_Store');
        $_data = array(
                    'store_name'  =>  '春天拉面3333',
                );
        $_where = array(
                      'store_id'  =>  array('value'=>3,'symbol'=>'<')
                  );
        //$rows = $model_store->all(array(),array('store_name','store_id'),array('store_id'=>-1));
        $row = $model_store->one($_where,'*',array('store_id'=>-1));
        dump($row);
    }
}