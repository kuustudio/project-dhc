<?php
class Home_Controller_Index extends controller{
    public function init(){
        parent::init();
    }

    public function actionIndex(){
        $model_test = MONK::getSingleton('Home_Model_Test');
        $model_test->create(array('name'=>'t111','created'=>time(),'value'=>'s33333'));
        $this->render();
    }
}
