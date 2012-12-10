<?php
class Admin_Controller_Index extends Admin_Controller_Base {

    public function actionIndex(){
        $this->render();
    }

    public function actionFirst(){
        // $this->_setType(array(
        //     'id'    => PARAM_UINT,
        //     'order' => PARAM_UINT
        // ), 'get');
        //echo $this->_get('id');
        $this->render();
    }

    public function actionMenu(){
        $this->render();
    }
}