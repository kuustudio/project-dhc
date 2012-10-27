<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

define('API_EC_SUCCESS', 0);

/*
 * 一般错误
 */
define('API_EC_UNKNOWN', 1);
define('API_EC_SERVICE', 2);
define('API_EC_METHOD', 3);
define('API_EC_OBJECT', 4);
define('API_EC_TOO_MANY_CALLS', 5);
define('API_EC_BAD_IP', 6);

/*
 * 参数错误
 */
define('API_EC_PARAM', 100);
define('API_EC_PARAM_API_KEY', 101);
define('API_EC_PARAM_SESSION_KEY', 102);
define('API_EC_PARAM_SIGNATURE', 104);
define('API_EC_PARAM_TOO_MANY', 105);
define('API_EC_PARAM_USER_ID', 110);
define('API_EC_PARAM_USER_FIELD', 111);
define('API_EC_PARAM_SOCIAL_FIELD', 112);
define('API_EC_PARAM_SUBCATEGORY', 141);
define('API_EC_PARAM_TITLE', 142);
define('API_EC_PARAM_BAD_JSON', 144);

/*
 * 用户权限错误
 */
define('API_EC_PERMISSION', 200);
define('API_EC_PERMISSION_USER', 210);
define('API_EC_PERMISSION_ALBUM', 220);
define('API_EC_PERMISSION_PHOTO', 221);
define('API_EC_PERMISSION_MESSAGE', 230);
define('API_EC_PERMISSION_MARKUP_OTHER_USER', 240);
define('API_EC_PERMISSION_STATUS_UPDATE', 250);

/*
 * SQL错误
 */
define('FQL_EC_UNKNOWN_ERROR', 600); // 不能发生
define('FQL_EC_PARSER_ERROR', 601);
define('FQL_EC_UNKNOWN_FIELD', 602);
define('FQL_EC_UNKNOWN_TABLE', 603);
define('FQL_EC_NO_INDEX', 604);
define('FQL_EC_UNKNOWN_FUNCTION', 605);
define('FQL_EC_INVALID_PARAM', 606);

/**
 * Ref stuff
 */
define('API_EC_REF_SET_FAILED', 700);

/**
 * 数据存储错误
 */
define('API_EC_DATA_UNKNOWN_ERROR', 800); // 不能发生
define('API_EC_DATA_INVALID_OPERATION', 801);
define('API_EC_DATA_QUOTA_EXCEEDED', 802);
define('API_EC_DATA_OBJECT_NOT_FOUND', 803);
define('API_EC_DATA_OBJECT_ALREADY_EXISTS', 804);
define('API_EC_DATA_DATABASE_ERROR', 805);


/*
 * 应用信息错误
 */
define('API_EC_NO_SUCH_APP', 900);


define('API_EC_BATCH_TOO_MANY_ITEMS', 950);

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
		API_EC_SUCCESS             => '成功',
		API_EC_UNKNOWN             => '发生未知错误',
		API_EC_SERVICE             => '服务暂时不可用',
		API_EC_METHOD              => '未知方法',
		API_EC_OBJECT              => '无效对象',
		API_EC_TOO_MANY_CALLS      => '达到应用程序的请求限制',
		API_EC_BAD_IP              => '未经授权的源IP地址',
		API_EC_PARAM               => '无效的参数',
		API_EC_PARAM_API_KEY       => '无效的API key',
		API_EC_PARAM_SESSION_KEY   => '无效或者过期的Session key',
		API_EC_PARAM_SIGNATURE     => '不正确的签名',
		API_EC_PARAM_TOO_MANY      => '该操作的参数过多',
		API_EC_PARAM_USER_ID       => '无效的用户id',
		API_EC_PARAM_USER_FIELD    => '无效的用户info字段',
		API_EC_PARAM_SOCIAL_FIELD  => '无效的用户字段',
		API_EC_PARAM_SUBCATEGORY   => '无效的子分类',
		API_EC_PARAM_TITLE         => '无效的标题',
		API_EC_PARAM_BAD_JSON      => 'JSON字符串异常',
		API_EC_PERMISSION          => '权限错误',
		API_EC_PERMISSION_USER     => '用户不可见',
		API_EC_PERMISSION_ALBUM    => '相册或专辑不可见',
		API_EC_PERMISSION_PHOTO    => '照片不可见',
		API_EC_PERMISSION_MESSAGE  => '不允许发送消息给用户',
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
	public static function logError($code, $option, $method, $ext = array()){
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
