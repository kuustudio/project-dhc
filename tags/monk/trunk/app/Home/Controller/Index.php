<?php
class Home_Controller_Index extends controller{
    public function init(){
        parent::init();
    }

    public function actionIndex(){
        $this->render();
    }
}
