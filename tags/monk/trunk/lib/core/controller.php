<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

class controller{
    /**/
    private $_view;
    private $_action;
    /**/

    final public function initBase(){
        $this->_view = MONK::getSingleton('view');
        $this->_pageTitle = '';
    }

    public function run($actionName){
        if(empty($actionName)) $actionName = MONK::getConfig('action');
        if($this->beforeAction()){
            $actions = $this->actions();
            if(isset($actions[$actionName])){
                include($actions[$actionName]);
                $action = MONK::getSingleton(
                    MONK::getConfig('app').'_Controller_'.MONK::getConfig('controller').'_Action_'.$actionName
                );
                $return = $action->run();
            }else{
                if(method_exists($this, 'action'.$actionName)){
                    $actionName = 'action'.$actionName;
                    $return = $this->$actionName();
                }  
                else
                    throw new Exception(CORE_CONTROLLER_EC_NO_ACTION);
            }
        }

        
    }

    /* 
    * 'actionName1'  => 'path/actionName1Class',
    * 'actionName2'  => 'path/actionName2Class'
    */
    public function actions(){
        return array();
    }

    public function getAction(){
        return $this->_action;
    }

    public function setAction($action){
        $this->_action = $action;
    }

    protected function beforeAction(){
        return true;
    }

    protected function afterAction(){
        return true;
    }

    public function getController(){
        return $this->_controller;
    }

    public function getApp(){
        return $this->_app;
    }

    public function widget(){}

    public function forward(){
        if($this->beforeForward()){
            //todo
            $this->afterForward();
        }
    }

    protected function beforeForward(){
        return true;
    }

    protected function afterForward(){
        return true;
    }

    public function redirect($url){
        if($this->beforeRedirect()){
            header("Location:" . $url);
            exit;
            $this->afterRedirect();
        }
    }

    protected function beforeRedirect(){
        return true;
    }

    protected function afterRedirect(){
        return true;
    }

    public function refresh(){}

    public function assign($key, $val=null){
        $this->_view->assign($key,$val);
    }
    public function render($param = array(), $method = 'view'){
        $this->beforeRender();
        call_user_func_array(array($this->_view,'_'.$method), array($param));
        $this->afterRender();
    }

    protected function beforeRender(){
        $controllerParam = array(
            'controller' => MONK::getConfig('controller'),
            'action' => MONK::getConfig('action')
        );
        $this->assign($controllerParam);
    }

    protected function afterRender(){
        exit;
    }

    public function init(){}

    public function __destruct(){}

    public function _setType($types, $op = 'get'){
        call_user_func_array(array(MONK::$_input,$op.'s'), array($types));
    }
    
    public function _get($key){
        return MONK::$_input->get($key);
    }

    public function _post($key){
        return MONK::$_input->post($key);
    }

    public function _cookie($key){
        return MONK::$_input->cookie($key);
    }

    public function _server($key){
        return MONK::$_input->server($key);
    }
}