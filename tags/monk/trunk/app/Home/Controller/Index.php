<?php
class Home_Controller_Index extends controller{
    public function init(){
        parent::init();
    }

    public function actionIndex(){
        $model_test = MONK::getSingleton('Home_Model_Test');
        $model_test->M('select',array('test1','test2'),array('test1.name'=>'t111'),true);
        $this->render();
    }
}
