<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

define('DS', DIRECTORY_SEPARATOR);
define('PS', PATH_SEPARATOR);
define('DHC_ROOT', dirname(dirname(dirname(__FILE__))).DS);
define('DHC_LIB', DHC_ROOT.'lib'.DS);
define('DHC_CONF', DHC_ROOT.'conf'.DS);
define('DHC_APP', DHC_ROOT.'app'.DS);
set_include_path(get_include_path().PS.DHC_LIB.PS.DHC_CONF);

include_once(DHC_LIB.'core/function.php');
include_once(DHC_LIB.'core/error.php');
include_once(DHC_LIB.'core/exception.php');
include_once(DHC_LIB.'core/input.php');
include_once(DHC_LIB.'core/router.php');

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
        self::$_config = include_once(DHC_CONF.'config.php');
        //self::$_route = include_once(DHC_CONF.'route.php');
        self::$_autoload = include_once(DHC_CONF.'autoload_class.php');
        //self::$_error = include_once(DHC_CONF.'errors.php');
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
        self::$_router = new DHCRouterUri(DHC::getConfig('url_method'), include_once(DHC_CONF.'route.php'));

        if($pathArray = self::$_router->parse_uri(self::$_input->pathinfo())){
            self::setConfig('app', ucfirst(strtolower($pathArray['app'])));
            self::setConfig('controller', ucfirst(strtolower($pathArray['controller'])));
            self::setConfig('action', ucfirst(strtolower($pathArray['action'])));
            $controllerfile = DHC_APP . self::getConfig('app') .'/Controller/'. self::getConfig('controller') .'.php';
            //echo $controllerfile;
            if(file_exists($controllerfile)){
                include_once($controllerfile);
                $controller = self::getSingleton(
                    self::getConfig('app').'_Controller_'.self::getConfig('controller')
                );
                $controller->init();
                $controller->run(self::getConfig('action'));
                
            }else{
                Error::logError(CORE_BOOTSTRAP_EC_NO_CONTROLLER,array('file'=>__FILE__,'line'=>__LINE__));
            }
        }else{
            Error::logError(CORE_BOOTSTRAP_EC_NO_PATH_ARRAY,array('file'=>__FILE__,'line'=>__LINE__));
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
                self::register($classname,new $classname($classname));
        }
        return self::registry($classname);
    }
    
    public static function getConfig($key){
        if(isset(self::$_config[$key]))
            return self::$_config[$key];
        else
            Error::logError(CORE_BOOTSTRAP_EC_CONFIG_NOT_EXISTS,array('file'=>__FILE__,'line'=>__LINE__));
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
            Error::logError(CORE_BOOTSTRAP_EC_REGISTER_NOT_OBJECT,array('file'=>__FILE__,'line'=>__LINE__));
        }
		if(!isset(self::$_object[$key])){
			self::$_object[$key] = $object;
		}else{
            Error::logError(CORE_BOOTSTRAP_EC_REGISTER_HAS_KEY,array('file'=>__FILE__,'line'=>__LINE__));
		}
    }

    public static function registry($key){
        if (isset(self::$_object[$key]) && is_object(self::$_object[$key])) {
            return self::$_object[$key];
        }else{
            Error::logError(CORE_BOOTSTRAP_EC_CANNOT_REGISTRY,array('file'=>__FILE__,'line'=>__LINE__));
        }
    }
    
    
    //自动加载类 
    private static function autoload($classname){
        if(isset(self::$_autoload[$classname])){
            if(is_file(self::$_autoload[$classname])) include_once(self::$_autoload[$classname]);
        }else{
            include_once($classname);
        }
    }
    
    //需要加载多语言
    public static function __($str){
        return $str;
    }
}

