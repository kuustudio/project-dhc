<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

//BigPipe ，页面分段输出
class view{
    private $method;
    private $theme;
    private $viewPath;
    private $compilePath;

    public function assign($key, $val=null){
        if(is_string($key)){
            $this->vars[$key] = $val;
        }else if(is_array($key)){
            foreach($key as $k => $v){
                $this->vars[$k] = $v;
            }
        }
    }

    public function setPath($path, $theme = 'default'){
        if(!is_dir($path.DHC::getConfig('view_dir_name')))
            Error::logError(CORE_VIEW_EC_VIEW_NOT_EXISTS, EXCEPTION);
        if(!is_dir($path.DS.DHC::getConfig('view_dir_name').$theme))
            Error::logError(CORE_VIEW_EC_THEME_NOT_EXISTS, EXCEPTION);
        $this->viewPath = $path;
        $this->theme = $theme;
    }

    public function _view($param = array()){
        if(empty($param)){
            
        }else{
            
        }
    }

    public function _json($param = array()){

    }

    public function _file($param){

    }

    public function _error($param){

    }

    public function _content($param){

    }

    public function _script($param){

    }
}
