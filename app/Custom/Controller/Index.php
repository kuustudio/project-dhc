<?php
class Custom_Controller_Index extends Custom_Controller_Base {

    public function actionIndex(){
        //如果已经登陆，则直接跳转到home
        $this->render();
    }

}
