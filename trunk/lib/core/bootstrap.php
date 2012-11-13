<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

define('DS', DIRECTORY_SEPARATOR);
define('PS', PATH_SEPARATOR);
define('DHC_ROOT', dirname(dirname(dirname(__FILE__))).DS);
define('DHC_LIB', DHC_ROOT.'lib'.DS);
define('DHC_CONF', DHC_ROOT.'conf'.DS);
define('DHC_APP', DHC_ROOT.'app'.DS);
set_include_path(get_include_path().PS.DHC_LIB.PS.DHC_CONF);

include(DHC_LIB.'core/interface.php');
include(DHC_LIB.'core/function.php');
include(DHC_LIB.'core/error.php');
include(DHC_LIB.'core/exception.php');
include(DHC_LIB.'core/validator.php');
include(DHC_LIB.'core/input.php');
include(DHC_LIB.'core/router.php');

class DHC{
    public static $_config = array();
    //private static $_route = array();
    public static $_autoload = array();
    public static $_object = array();
    //private static $_error = array();
    public static $_cache = array();
    public static $_input;
    public static $_router;
    
    private static function init(){
        spl_autoload_register('self::autoload');
        self::$_config = include(DHC_CONF.'config.php');
        //self::$_route = include(DHC_CONF.'route.php');
        self::$_autoload = include(DHC_CONF.'autoload_class.php');
        //self::$_error = include(DHC_CONF.'errors.php');
        set_error_handler(array('DHC','_error'), E_ALL);
        set_exception_handler(array('DHC','_exception'));
        self::$_input = new DHCInput(array(
			'server'		=> array(
                'HTTP_USER_AGENT'   =>  array(
                                            'func'  => PARAM_STRING
                                        ),
                'HTTP_HOST'         =>  array(
                                            'func'  => PARAM_STRING,
                                            //'argv'  => '对域名主机进行验证'
                                        ),
                'PATH_INFO'         =>  array(
                                            'func'  => PARAM_STRING
                                            //'argv'  => '对PATH_INFO'进行验证
                                        )
            )
		));
        self::$_router = new DHCRouterUri(DHC::getConfig('url_method'), include(DHC_CONF.'route.php'));

        if($pathArray = self::$_router->parse_uri(self::$_input->pathinfo())){
            self::setConfig('app', ucfirst(strtolower($pathArray['app'])));
            self::setConfig('controller', ucfirst(strtolower($pathArray['controller'])));
            self::setConfig('action', ucfirst(strtolower($pathArray['action'])));
            $controllerfile = DHC_APP . self::getConfig('app') .'/Controller/'. self::getConfig('controller') .'.php';
            //echo $controllerfile;
            if(file_exists($controllerfile)){
                include($controllerfile);
                $controller = self::getSingleton(
                    self::getConfig('app').'_Controller_'.self::getConfig('controller')
                );
                $controller->initBase();
                $controller->init();
                $controller->run(self::getConfig('action'));
                
            }else{
                Error::logError(CORE_BOOTSTRAP_EC_NO_CONTROLLER, EXCEPTION);
            }

        }else{
            Error::logError(CORE_BOOTSTRAP_EC_NO_PATH_ARRAY, EXCEPTION);
        }

    }
    
    public static function run(){
        self::init();
        //dump(self::$_input->pathinfo());
        //$pathinfo = self::$_router->parse_uri(self::$_input->pathinfo());
        //dump($pathinfo);
        //echo self::$_router->url(array('app'=>'home','controller'=>'index','action'=>'index','id'=>156,'foodid'=>566));
        header('Content-Type: text/html;charset=utf8');
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
            include(DHC_APP.$class_array[0].DS.$class_array[1].DS.$class_array[2].'.php');
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
}

