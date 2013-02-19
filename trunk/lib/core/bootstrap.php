<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

define('DS', DIRECTORY_SEPARATOR);
define('PS', PATH_SEPARATOR);
define('MONK_ROOT', dirname(dirname(dirname(__FILE__))).DS);
define('MONK_LIB', MONK_ROOT.'lib'.DS);
define('MONK_CONF', MONK_ROOT.'conf'.DS);
define('MONK_APP', MONK_ROOT.'app'.DS);
set_include_path(get_include_path().PS.MONK_LIB.PS.MONK_CONF);

include(MONK_LIB.'core/interface.php');
include(MONK_LIB.'core/function.php');
include(MONK_LIB.'core/error.php');
include(MONK_LIB.'core/exception.php');
include(MONK_LIB.'core/validator.php');
include(MONK_LIB.'core/input.php');
include(MONK_LIB.'core/router.php');
include(MONK_LIB.'core/block.php');

class MONK{
    public static $_config = array();
    //private static $_route = array();
    public static $_autoload = array();
    public static $_object = array();
    //private static $_error = array();
    public static $_cache = array();
    public static $_input = null;
    public static $_router = null;
    //是否是post
    private static $_isPost = false;
    //是否是ajax
    private static $_isAjax = false;
    //存储引入的JS文件
    private static $_js = array();
    //存储引入的CSS文件
    private static $_css = array();
    
    private static function init(){
        spl_autoload_register('self::autoload');
        self::$_config = include(MONK_CONF.'config.php');
        //self::$_route = include(MONK_CONF.'route.php');
        self::$_autoload = include(MONK_CONF.'autoload_class.php');
        //self::$_error = include(MONK_CONF.'errors.php');
        set_error_handler(array('MONK','_error'), E_ALL);
        set_exception_handler(array('MONK','_exception'));
        self::$_input = new MONKInput(array(
			'server' => MONK::getConfig('allowed_server_param')
		));
        self::$_router = new MONKRouterUri(MONK::getConfig('url_method'), include(MONK_CONF.'route.php'));

        if($pathArray = self::$_router->parse_uri(self::$_input->pathinfo())){
            self::setConfig('app', ucfirst(strtolower($pathArray['app'])));
            self::setConfig('controller', ucfirst(strtolower($pathArray['controller'])));
            self::setConfig('action', ucfirst(strtolower($pathArray['action'])));
            $controllerfile = MONK_APP . self::getConfig('app') .'/Controller/'. self::getConfig('controller') .'.php';
            //echo $controllerfile;
            if(file_exists($controllerfile)){
                include($controllerfile);
                $controller = self::getSingleton(
                    self::getConfig('app').'_Controller_'.self::getConfig('controller')
                );
                $controller->initBase();
                $controller->init();
                $action_subfix = '';
                if(self::$_input->is_ajax()) $action_subfix .= '_AJAX';
                if(self::$_input->is_post()) $action_subfix .= '_POST';
                $controller->run(self::getConfig('action').$action_subfix);
                
            }else{
                Error::logError(CORE_BOOTSTRAP_EC_NO_CONTROLLER, EXCEPTION);
            }

        }else{
            Error::logError(CORE_BOOTSTRAP_EC_NO_PATH_ARRAY, EXCEPTION);
        }

    }

    public static function block($block_class){
        return self::getSingleton($block_class);
    }

    public static function widget($widget_class){
        return self::getSingleton($widget_class);
    }
    
    public static function run(){
        header('Content-Type: text/html;charset=utf8');
        self::init();
        //dump(self::$_input->pathinfo());
        //$pathinfo = self::$_router->parse_uri(self::$_input->pathinfo());
        //dump($pathinfo);
        //echo self::$_router->url(array('app'=>'home','controller'=>'index','action'=>'index','id'=>156,'foodid'=>566));
        echo 'run';
    } 

    public static function getSingleton($classname){
        if(!self::isRegistered($classname)){
            if(class_exists($classname))
                self::register($classname,new $classname());
        }
        return self::registry($classname);
    }
    
    public static function getConfig($key){
        if(isset(self::$_config[$key]))
            return self::$_config[$key];
        else
            Error::logError(CORE_BOOTSTRAP_EC_CONFIG_NOT_EXISTS, EXCEPTION);
    } 
    
    public static function setConfig($key, $value){
        self::$_config[$key] = $value;
    }
    
    public static function isRegistered($key){
        return isset(self::$_object[$key]);
    }
    
    public static function register($key, $object){
        if (!is_object($object))
        {
            Error::logError(CORE_BOOTSTRAP_EC_REGISTER_NOT_OBJECT, EXCEPTION);
        }
		if(!isset(self::$_object[$key])){
			self::$_object[$key] = $object;
		}else{
            Error::logError(CORE_BOOTSTRAP_EC_REGISTER_HAS_KEY, EXCEPTION);
		}
    }

    public static function registry($key){
        if (isset(self::$_object[$key]) && is_object(self::$_object[$key])) {
            return self::$_object[$key];
        }else{
            Error::logError(CORE_BOOTSTRAP_EC_CANNOT_REGISTRY, EXCEPTION);
        }
    }
    
    
    //自动加载类 
    private static function autoload($classname){
        if(isset(self::$_autoload[$classname])){
            if(is_file(self::$_autoload[$classname])) include(self::$_autoload[$classname]);
        }elseif ($class_array = self::parse_class($classname)) {
            include(MONK_APP.$class_array[0].DS.$class_array[1].DS.$class_array[2].'.php');
        }else{
            include($classname);
        }
    }

    //类路径解析
    private static function parse_class($classname){
        if(strpos($classname, '_')){
            return explode('_', $classname);
        }
        return false;
    }
    
    //需要加载多语言
    public static function __($str){
        return $str;
    }

    /*
    * 路由说明
    * 表示当前应用，控制器，方法
    */
    public static function _url($uri = '*/*/*', $additional = array()){
        $option = array();
        $uriArray = explode('/', $uri);
        $option['app'] = ($uriArray[0] == '*')?MONK::getConfig('app'):$uriArray[0];
        $option['controller'] = ($uriArray[1] == '*')?MONK::getConfig('controller'):$uriArray[1];
        $option['action'] = ($uriArray[2] == '*')?MONK::getConfig('action'):$uriArray[2];
        $option += $additional;
        return MONK::$_router->url($option);
    }


    public static function _error($errno, $errstr, $errfile, $errline){
        Error::logError(
            CORE_BOOTSTRAP_EC_SYSTEM_ERROR,
            ERROR_SHOW,
            array(
                'level'     =>  $errno,
                'message'   =>  $errstr,
                'file'      =>  $errfile,
                'line'      =>  $errline
            )
        );
    }

    public static function _exception($e){
        Error::logError(
            CORE_BOOTSTRAP_EC_USER_EXCEPTION,
            ERROR_SHOW,
            array(
                'code'      =>  $e->getCode(),
                'message'   =>  $e->getMessage(),
                'file'      =>  $e->getFile(),
                'line'      =>  $e->getLine()
            )
        );
    }

    public static function include_js($id, $file, $ifMerge = true, $debug = false, $mergeName = ''){
        if($ifMerge) {
            //
            if(!isset(self::$_js[$id])) self::$_js[$id] = $file;
        }else{
            if($debug) return $file.'?'.time();
        }
        return $file;
    }

    public static function include_css($id, $file, $ifMerge = true, $debug = false, $mergeName = ''){
        if($ifMerge) {
            //
            if(!isset(self::$_css[$id])) self::$_css[$id] = $file;
        }else{
            if($debug) return $file.'?'.time();
        }
        return $file;
    }
}

