<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

class controller{
    /**/
    private $_view;
    private $_action;
    /**/

    final public function initBase(){
        $this->_view = DHC::getSingleton('view');
        $this->_view->setPath(DHC_APP.DHC::getConfig('app').DS);
        $this->_pageTitle = '';
    }

    public function run($actionName){
        if(empty($actionName)) $actionName = DHC::getConfig('action');
        if($this->beforeAction()){
            $actions = $this->actions();
            if(isset($actions[$actionName])){
                include($actions[$actionName]);
                $action = DHC::getSingleton(
                    DHC::getConfig('app').'_Controller_'.DHC::getConfig('controller').'_Action_'.$actionName
                );
                $return = $action->run();
            }else{
                if(method_exists($this, 'action'.$actionName)){
                    $actionName = 'action'.$actionName;
                    $return = $this->$actionName();
                }  
                else
                    Error::logError(CORE_CONTROLLER_EC_NO_ACTION, EXCEPTION);
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

    public function redirect(){
        if($this->beforeRedirect()){
            //todo
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
                            'controller'    =>  DHC::getConfig('controller'),
                            'action'        =>  DHC::getConfig('action')
                        );
        $this->assign($controllerParam);
    }

    protected function afterRender(){
        exit;
    }

    public function init(){}

    public function __destruct(){}
    
}