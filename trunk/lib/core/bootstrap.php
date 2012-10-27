<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

define('DS', DIRECTORY_SEPARATOR);
define('PS', PATH_SEPARATOR);
define('DHC_LIB', dirname(dirname(__FILE__)).DS);
define('DHC_CONF', dirname(dirname(dirname(__FILE__))).DS.'conf'.DS);
set_include_path(get_include_path().PS.DHC_LIB.PS.DHC_CONF);

include_once(DHC_LIB.'core/function.php');
include_once(DHC_LIB.'core/exception.php');
include_once(DHC_LIB.'core/input.php');

class DHC{
    private static $_config = array();
    private static $_route = array();
    private static $_autoload = array();
    private static $_object = array();
    //private static $_error = array();
    private static $_cache = array();
    private static $_input;
    
    private static function init(){
        self::$_config = include_once(DHC_CONF.'config.php');
        self::$_route = include_once(DHC_CONF.'route.php');
        self::$_autoload = include_once(DHC_CONF.'autoload_class.php');
        //self::$_error = include_once(DHC_CONF.'errors.php');
        self::$_input = new DHCInput(array(
			'url_method'	=> self::$_config['url_method'],
			'server'		=> array()
		));

        spl_autoload_register('self::autoload');
    }
    
    public static function run(){
        self::init();
        //dump(self::$_error);
        header('Content-Type: text/html; charset=utf8');
        echo 'run';
    } 
    
    public static function getConfig($key){
        if(isset(self::$_config[$key]))
            return self::$_config[$key];
        else
            error_log('config ['.$key.'] is not exist');
    } 
    
    public static function setConfig($key, $value){
        self::$_config[$key] = $value;
    }
    
    public static function route(){
        return self::$_route;
    }
    
    public static function register($key, $object){
        if (!is_object($object))
        {
            throw new CoreRegisterNotObjectException($object, gettype($object));
        }
		if(!isset(self::$_object[$key])){
			self::$_object[$key] = $object;
		}else{
			throw new CoreRegisterHasKeyException($object, gettype($object));
		}
    }
    
    
    //自动加载类 
    private static function autoload($classname){
        if(self::$_autoload[$classname]){
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

