<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

define('API_EC_SUCCESS', 0);


/*
 * 系统框架核心错误
 *
 */
define('CORE_INPUT_EC_NO_URL_METHOD', 100); //非法的url_method
define('CORE_ROUTER_EC_UNABLE_URL', 200); //无法形成URL
define('CORE_CONTROLLER_EC_NO_ACTION', 300);
define('CORE_BOOTSTRAP_EC_CONFIG_NOT_EXISTS', 1);
define('CORE_BOOTSTRAP_EC_REGISTER_NOT_OBJECT', 2);
define('CORE_BOOTSTRAP_EC_REGISTER_HAS_KEY', 3);
define('CORE_BOOTSTRAP_EC_NO_PATH_ARRAY', 4);
define('CORE_BOOTSTRAP_EC_NO_CONTROLLER', 5);
define('CORE_BOOTSTRAP_EC_CANNOT_REGISTRY', 6);


/*
 * 错误日志处理方式
 */
define('ERROR_SAVE',	0x00000001);//存入日志缓冲
define('ERROR_SHOW',	0x00000002);//自定义显示
define('ERROR_LOG',		0x00000004);//error_log() 可记录到服务器，或者发送邮件
define('EXCEPTION',		0x00000008);//异常方式
define('LOGSYS',		0x00000010);//发送自定义日志系统

class Error{
	private static $errorContainer = array();
	private static $errorExplain = array(
		CORE_INPUT_EC_NO_URL_METHOD             => '非法的url_method',
		CORE_ROUTER_EC_UNABLE_URL             	=> '无法形成URL',
		CORE_BOOTSTRAP_EC_CONFIG_NOT_EXISTS     => '配置项不存在',
		CORE_BOOTSTRAP_EC_REGISTER_NOT_OBJECT   => '注册的不是对象',
		CORE_BOOTSTRAP_EC_REGISTER_HAS_KEY      => '该键已经注册',
		CORE_BOOTSTRAP_EC_NO_PATH_ARRAY      		=> '无法获取路径数组',
		CORE_BOOTSTRAP_EC_NO_CONTROLLER      		=> '无法找到控制器',
		CORE_BOOTSTRAP_EC_CANNOT_REGISTRY      	=> '无法从注册数据中取出当前键',
		CORE_CONTROLLER_EC_NO_ACTION		      	=> '未找到行动',
	);
	
	/*
	* $option = array(
	*	'dir'	=> __DIR__,
	*	'file'	=> __FILE__,
	*	'line'	=> __LINE__,
	*	'function'=> __FUNCTION__,
	*	'class' => __CLASS__,
	*	'method'=> __METHOD__,
	*	'namespace'	=> __NAMESPACE__,
	*	...更多需要存储或者显示的字段...
	* );
	*
	* $ext为$method的附加选项
	*/
	public static function logError(
															$code, 
															$option,
															$method = ERROR_SHOW, 
															$ext = array(
																	'format'	=> true
															)
													){
		//可通过计算 $code大小定义级别和类别
		if($method & ERROR_SAVE){
			self::$errorContainer[] = array(
				'code'	=> $code,
				'option'=> $option
			);
		}
		//$ext可传入格式
		if($method & ERROR_SHOW){
			if(!empty($ext['format'])){
				$html =	'<ul>'.
							'<li>code:'.$code.'</li><br />'.
							'<li>说明:'.self::$errorExplain[$code].'</li><br />';
				foreach($option as $k=>$v){
					$html.=	'<li>'.$k.':'.$v.'</li><br />';
				}
				$html .='</ul>';
				echo $html;
			}else{
				$str = '[code:'.$code.',说明:'.self::$errorExplain[$code];
				foreach($option as $k=>$v){
					$str.=	','.$k.':'.$v;
				}
				$str .= ']';
			}
			
		}
		if($method & ERROR_LOG){
			$str = '[code:'.$code.',说明:'.self::$errorExplain[$code];
			foreach($option as $k=>$v){
				$str.=	','.$k.':'.$v;
			}
			$str .= ']';
			$ext['type'] = (!empty($ext['type']))?$ext['type']:0;
			if($ext['type']==1){
				error_log($str, 1, (isset($ext['destination'])?$ext['destination']:''), (isset($ext['headers'])?$ext['headers']:''));
			}elseif($ext['type']==3){
				error_log($str, 3, (isset($ext['destination'])?$ext['destination']:''));
			}elseif($ext['type']==4){
				error_log($str, 4);
			}else{
				error_log($str, 0);
			}
		}
		if($method & EXCEPTION){
			$exception = (!empty($ext['exception']))?$ext['exception']:'';
			if(empty($exception)){
				throw new Exception(self::$errorExplain[$code],$code);
			}else{
				throw new $exception(self::$errorExplain[$code],$code,$option);
			}
		}
		if($method & LOGSYS){
			$logger = (!empty($ext['logger']))?$ext['logger']:'';
			$logger->log($code, self::$errorExplain[$code], $option);
		}
	}
}
