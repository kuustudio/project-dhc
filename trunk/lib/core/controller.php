<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

class controller{
    /**/
    private $_action;
    private $_pageTitle;
    /**/
    public function __construct(){
        $this->_pageTitle = '';
    }

    public function run($actionName){
        if(empty($actionName)) $actionName = self::getConfig('action');
        if($this->beforeAction()){
            $actions = $this->actions();
            if(isset($actions[$actionName])){
                include_once($actions[$actionName]);
                $action = DHC::getSingleton(
                    self::getConfig('app').'_Controller_'.self::getConfig('controller').'_Action_'.$actionName
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

    public function getPageTitle(){}

    public function setPageTitle(){}

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

    public function render(){
        if($this->beforeRender()){
            //todo
            $this->afterRender();
        }
    }

    protected function beforeRender(){
        return true;
    }

    protected function afterRender(){
        return true;
    }

    public function init(){}

    public function __destruct(){}
    
}