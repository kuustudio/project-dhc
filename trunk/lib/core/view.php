<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

//BigPipe ，页面分段输出
class view{
    private $method;
    private $theme;
    private $viewPath;
    private $compilePath;
    private $filePath;

    const TYPE_REMOTE   = 1;
    const TYPE_ROOT     = 2;

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
        if(!is_dir($path.DHC::getConfig('view_dir_name').DS.$theme))
            Error::logError(CORE_VIEW_EC_THEME_NOT_EXISTS, EXCEPTION);
        if(!is_dir(DHC::getConfig('compile_dir_name')))
            Error::logError(CORE_VIEW_EC_C_VIEW_NOT_EXISTS, EXCEPTION);

        $this->viewPath = $path.DHC::getConfig('view_dir_name').DS;
        $this->theme = $theme;
    }
    /*  base::代表跟目录下的views
    *   scheme://user:pass@host
    *   app://
    *   remote url
    *   $param = array(
    *       'type' => 1
    *       'file'  => '...'               
    *   )
    *   root view
    *   $param = array(
    *       'type'  => 2,
    *       'theme' => '...' 可以为空
    *       'file'  => '...'
    *   )
    *   一般状况下
    *   $param = array(
    *       'app'   => '...', 可以为空
    *       'theme' => '...', 可以为空
    *       'controller'=> '...' 可以为空
    *       'action'=> '...' 可以为空
    *   )
    */
    public function _view($param = array()){
        $this->compilePath = DHC::getConfig('compile_dir_name');
        if(empty($param)){
            $this->setPath(DHC_APP.DHC::getConfig('app').DS);
            $this->filePath = strtolower(DHC::getConfig('controller')).DS.strtolower(DHC::getConfig('action'));
        }else{
            if(isset($param['type'])){
                if($param['type']==TYPE_REMOTE){
                    $this->viewPath = '';
                    $this->theme = '';
                    $this->filePath = $param['file'];
                }
                if($param['type']==TYPE_ROOT){
                    $this->viewPath = DHC_ROOT;
                    $this->theme = empty($param['theme'])?DHC::getConfig('theme'):$param['theme'];;
                    $this->filePath = $param['file'];
                }
            }else{
                $app = empty($param['app'])?DHC::getConfig('app'):$param['app'];
                $theme = empty($param['theme'])?DHC::getConfig('theme'):$param['theme'];
                $controller = empty($param['controller'])?DHC::getConfig('controller'):$param['controller'];
                $action = empty($param['action'])?DHC::getConfig('action'):$param['action'];
                $this->setPath(DHC_APP.$app.DS, $theme);
                $this->filePath = strtolower($controller).DS.strtolower($action);
            }
        }
        $viewFile = $this->viewPath.$this->theme.DS.$this->filePath;
        $compileFile = $this->getComplieFile($viewFile);
       
        if(DHC::getConfig('view_complie')){
            if(!file_exists($compileFile))
                $this->compile($viewFile);
            include($compileFile);
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

    private function getComplieFile($viewFile){
        return $this->compilePath.md5($viewFile);
    }

    private function compile($viewFile){
        $compileFile = $this->getComplieFile($viewFile);
    }
}
