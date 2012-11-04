<?php 
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

// 逻辑过滤
define('PARAM_STRING',	0x00000001);
define('PARAM_INT',		0x00000002); // 默认为无符号整数
define('PARAM_UINT',	0x00000002); // 无符号整数，必须是最常用的整数类型
define('PARAM_SINT',	0x00000004); // 有符号整数
define('PARAM_FLOAT',	0x00000008);
define('PARAM_BOOL',	0x00000010);
define('PARAM_HEX',		0x00000020);
define('PARAM_EXISTS',	0x00000040); // 只验证是否设置了该参数，并且得出一个布尔值
define('PARAM_ARRAY',	0x00000080);
define('PARAM_RAW',		0x00000100); // 不进行任何处理，这是危险的行为
// 防毒过滤器以及选项
define('PARAM_STRIPTAGS', 0x00001000); // 调用 strip_tags, 只适合于字符串
define('PARAM_HASHVAR',	0x00002000); // user facing 变量是一个hash值, param_ 必须在登录后调用
define('PARAM_MD5',		0x00004000); // md5 变量, 值必须匹配 url hash, param_ 必须在登录后调用
define('PARAM_ERROR',	0x00008000); // 当有一个错误的时候，进行错误回调，而不是发送到用户首页
define('PARAM_ALLOW_A',	0x00010000); // 当调用 strip_tags 时，允许 href 链接,<a>
define('PARAM_ALLOW_B',	0x00020000); // 当调用 strip_tags 时，允许 bold 链接,<b>
define('PARAM_USERID',	0x00040000); // 对数字的用户 ID 进行验证
define('PARAM_OBJID',	0x00080000); // 对数字的对象 ID 进行验证
// 类型域
define('PARAM_TEXT',	PARAM_STRING ^ PARAM_STRIPTAGS);
define('PARAM_ID',		PARAM_INT);
define('PARAM_UID',		PARAM_INT ^ PARAM_USERID);
define('PARAM_TID',		PARAM_INT ^ PARAM_OBJID);
define('PARAM_URLMD5',	PARAM_STRING ^ PARAM_MD5);
define('PARAM_NULLOK',	PARAM_INT ^ PARAM_SINT ^ PARAM_FLOAT ^ PARAM_BOOL ^ PARAM_HEX);

class DHCInput{
	
	/**
	 * 通过服务器传送过来的pathinfo
	 *
	 * @var array
	 */
	var $pathinfo				= '';
	/**
	 * 类型监测函数识别数组
	 *
	 * @var array
	 */
	static $input_check_array = array(
		PARAM_STRING	=> 'get_param_string',
		PARAM_UINT		=> 'get_param_uint',
		PARAM_SINT		=> 'get_param_sint',
		PARAM_FLOAT		=> 'get_param_float',
		PARAM_BOOL		=> 'get_param_bool',
		PARAM_HEX		=> 'get_param_hex',
		PARAM_EXISTS	=> 'get_param_exists',
		PARAM_ARRAY		=> 'get_param_array',
		PARAM_RAW		=> 'get_param_raw',
		PARAM_HASHVAR	=> 'get_param_hashvar',
		PARAM_ERROR		=> 'get_param_error',
		PARAM_NULLOK	=> 'get_param_null'
	);
	/**
	 * 通过类型安全监测的$_GET
	 *
	 * @var array
	 */
	var $gets					= array();
	/**
	 * 通过类型安全监测的$_POST
	 *
	 * @var array
	 */
	var $posts					= array();
	/**
	 * 通过类型安全监测的$_COOKIE
	 *
	 * @var array
	 */
	var $cookies				= array();
	/**
	 * 通过类型安全监测的$_SERVER
	 *
	 * @var array
	 */
	var $servers				= array();
	/**
	 * 系统内$_GET的默认前缀
	 *
	 * @var string
	 */
	var $get_prefix				= 'get_';
	/**
	 * 系统内$_POST的默认前缀
	 *
	 * @var string
	 */
	var $post_prefix			= 'post_';
	/**
	 * 系统内$_COOKIE的默认前缀
	 *
	 * @var string
	 */
	var $cookie_prefix			= 'cookie_';
	/**
	 * 系统内$_SERVER的默认前缀
	 *
	 * @var string
	 */
	var $server_prefix			= 'server_';
	/**
	 * 当前用户的IP地址
	 *
	 * @var string
	 */
	var $ip_address					= FALSE;
	/**
	 * 当前用户使用的浏览器 user agent
	 *
	 * @var string
	 */
	var $user_agent						= FALSE;
	/**
	 * 如果是false,$_GET为一个空数组
	 *
	 * @var bool
	 */
	var $_allow_get_array			= TRUE;
	/**
	 * List of all HTTP request headers
	 *
	 * @var array
	 */
	protected $headers			= array();
	/*
	* 优先做平台检测
	*/


	/*
	* 构造函数
	*/
	public function __construct($option = null){
		$this->gets	= array();
		$this->posts	= array();
		$this->cookies	= array();
		$this->servers	= array();
		if(!empty($option['url_method'])) $this->url_method = $option['url_method'];
		if(!empty($option['server'])) $this->servers($option['server']);
	}

	public function pathinfo(){
		return $this->server('PATH_INFO');
	}

	/*
	* 判断是否命令行模式
	*/
	public function is_cli()
	{
		return (php_sapi_name() == 'cli') or defined('STDIN');
	}
	/*
	* 判断是否ajax request
	*/
	public function is_ajax()
	{
		return ($this->server('HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest');
	}

	/*
	* $types = array(
	*	'content'	=> array('func'=>PARAM_STRING,'argv'=>PARAM_TEXT),
	*	'sex'	=> array('func'=>PARAM_STRING)
	* );
	*/
	public function gets($types){
		foreach($types as $key=>$type){
			$this->gets[$this->get_prefix.$key] = $this->get_param_by_type($_GET[$key],$type['func'],isset($type['argv'])?$type['argv']:'');
		}
	}

	public function posts($types){
		foreach($types as $key=>$type){
			$this->posts[$this->post_prefix.$key] = $this->get_param_by_type($_POST[$key],$type['func'],isset($type['argv'])?$type['argv']:'');
		}
	}

	public function cookies($types){
		foreach($types as $key=>$type){
			$this->cookies[$this->cookie_prefix.$key] = $this->get_param_by_type($_COOKIE[$key],$type['func'],isset($type['argv'])?$type['argv']:'');
		}
	}

	public function servers($types){
		foreach($types as $key=>$type){
			$this->servers[$this->server_prefix.$key] = $this->get_param_by_type($_SERVER[$key],$type['func'],isset($type['argv'])?$type['argv']:'');
		}
	}

	public function get($key){
		return isset($this->gets[$this->get_prefix.$key])?$this->gets[$this->get_prefix.$key]:'';
	}

	public function post($key){
		return isset($this->posts[$this->post_prefix.$key])?$this->posts[$this->post_prefix.$key]:'';
	}

	public function cookie($key){
		return isset($this->cookies[$this->cookie_prefix.$key])?$this->cookies[$this->cookie_prefix.$key]:'';
	}

	public function server($key){
		return isset($this->servers[$this->server_prefix.$key])?$this->servers[$this->server_prefix.$key]:'';
	}

	function get_param_by_type($value,$funckey,$argv){
		$func = self::$input_check_array[$funckey];
		if(empty($argv)) return $this->$func($value);
		return $func($value,$argv);
	}

	protected function noslashes($s) {
		if(!get_magic_quotes_gpc())
			return $s;
		return stripslashes($s);
	}

	/*
	* $_GET,$_POST,$_COOKIE,$_SERVER等值的验证依赖函数
	* 也可以独立使用
	*/
	function get_param_exists($value){
		return isset($value);
	}

	function get_param_hashvar($value){
		//用于验证的哈希值
	}

	function get_param_raw($value){
		return $value;
	}

	//禁止二维数组，支持数组内的单一数组类型的值检测
	function get_param_array($arr,$argv = PARAM_ARRAY){
		$arr_r = array();
		if(is_array($arr)){
			foreach ($arr as $key => $r){
          if ($ret = $this->get_param_by_type($r, ($argv & ~PARAM_ARRAY)))
          {  
          		$arr_r[$key] = $ret;
          }else{
          		return false;
          }
      }
      return $arr_r;
		}else{
			return array();
		}
	}

	function get_param_null($value){
		if($value == '') return null;
	}

	function get_param_uint($value,$argv = PARAM_UINT){
		if(ctype_digit($value) || is_int($value)){
			if($argv & PARAM_OBJID){
				//验证是否对象ID,PARAM_TID
			}
			if($argv & PARAM_USERID){
				//验证是否用户ID,PARAM_UID
			}
			return intval($value);
		}else{
			if(strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 7.0') !== false && preg_match('/[0-9]+[0-9a-f]{8}$/', $value) == 1) {
				exit;// 处理ie7 beta2问题
			}
			//返回空值或者异常处理
		}
	}


	function get_param_sint($value){
		if(ctype_digit($value) || is_int($value)){
			return intval($value);
		}else{
			if($value[0] == '-' && ctype_digit(substr($value, 1))){
				return intval($value);
			}else{
				if(strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 7.0') !== false && preg_match('/[0-9]+[0-9a-f]{8}$/', $value) == 1) {
					exit;// 处理ie7 beta2问题
				}
				//返回空值或者异常处理
			}
		}
	}

	function get_param_float($value){
		if(preg_match('/^[0-9\.]*$/i', $value)){
			return floatval($value);
		}else{
			//返回空值或者异常处理
		}
	}

	function get_param_bool($value){
		switch (strtolower($value)) {
			case '0':
			case '1':
				settype($value,'bool');
				return $value;
				break;
			case 'true':
			case 'on':
			case 'yes':
				return true;
				break;
			case 'false':
			case 'off':
			case 'no':
				return false;
				break;
			default:
				//返回空值或者异常处理
				break;
		}	
	}

	function get_param_hex($value){
		if(ctype_xdigit($value)){
			return intval(hexdec($value));
		}else{
			//返回空值或者异常处理
		}
	}

	function get_param_string($str,$argv = PARAM_STRING){
		if($argv & PARAM_MD5){
			//检验url_md5,PARAM_URLMD5
		}
		$str = $this->noslashes($str);
		if($argv & PARAM_STRIPTAGS){
			$allowtags = '';
			if($argv & PARAM_ALLOW_A){
				$allowtags .= '<a>';
			}
			if($argv & PARAM_ALLOW_B){
				$allowtags .= '<b>';
			}
			$str = strip_tags($str, $allowtags);
			// 实体保护
			if ($allowtags && strpos($str, '=') !== false) {  // 有没有实体需要保护?
				// 过滤大多数xss实体
				$exprs = array('/( on[a-z]{1,}|style|class|id|target)="(.*?)"/i',
							   '/( on[a-z]{1,}|style|class|id|target)=\'(.*?)\'/i',
							   '/( on[a-z]{1,}|style|class|id|target)=(.*?)( |>)/i',
							   '/([a-z]{1,})="(( |\t)*?)(javascript|vbscript|about):(.*?)"/i',
							   '/([a-z]{1,})=\'(( |\t)*?)(javascript|vbscript|about):(.*?)\'/i',
							   '/([a-z]{1,})=(( |\t)*?)(javascript|vbscript|about):(.*?)( |>)/i',
							  );

				$reps = array('', '', '$3', '$1=""', '$1=""', '$1=""$6');
				$str = preg_replace($exprs, $reps, $str);
			}
		}
		// 过滤\r字符
		$str = str_replace("\r","",$str);
		return strval($str);
	}

	
	/**
	* 获取IP地址
	*
	* @access	public
	* @return	string
	*/
	function ip_address()
	{
		if ($this->ip_address !== FALSE)
		{
			return $this->ip_address;
		}

		if (config_item('proxy_ips') != '' && $this->server('HTTP_X_FORWARDED_FOR') && $this->server('REMOTE_ADDR'))
		{
			$proxies = preg_split('/[\s,]/', config_item('proxy_ips'), -1, PREG_SPLIT_NO_EMPTY);
			$proxies = is_array($proxies) ? $proxies : array($proxies);

			$this->ip_address = in_array($_SERVER['REMOTE_ADDR'], $proxies) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];
		}
		elseif ($this->server('REMOTE_ADDR') AND $this->server('HTTP_CLIENT_IP'))
		{
			$this->ip_address = $_SERVER['HTTP_CLIENT_IP'];
		}
		elseif ($this->server('REMOTE_ADDR'))
		{
			$this->ip_address = $_SERVER['REMOTE_ADDR'];
		}
		elseif ($this->server('HTTP_CLIENT_IP'))
		{
			$this->ip_address = $_SERVER['HTTP_CLIENT_IP'];
		}
		elseif ($this->server('HTTP_X_FORWARDED_FOR'))
		{
			$this->ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
		}

		if ($this->ip_address === FALSE)
		{
			$this->ip_address = '0.0.0.0';
			return $this->ip_address;
		}

		if (strpos($this->ip_address, ',') !== FALSE)
		{
			$x = explode(',', $this->ip_address);
			$this->ip_address = trim(end($x));
		}

		if ( ! $this->valid_ip($this->ip_address))
		{
			$this->ip_address = '0.0.0.0';
		}

		return $this->ip_address;
	}
	
	/**
	* Validate IPv4 Address
	*
	* Updated version suggested by Geert De Deckere
	*
	* @access	protected
	* @param	string
	* @return	bool
	*/
	protected function _valid_ipv4($ip)
	{
		$ip_segments = explode('.', $ip);

		// Always 4 segments needed
		if (count($ip_segments) !== 4)
		{
			return FALSE;
		}
		// IP can not start with 0
		if ($ip_segments[0][0] == '0')
		{
			return FALSE;
		}

		// Check each segment
		foreach ($ip_segments as $segment)
		{
			// IP segments must be digits and can not be
			// longer than 3 digits or greater then 255
			if ($segment == '' OR preg_match("/[^0-9]/", $segment) OR $segment > 255 OR strlen($segment) > 3)
			{
				return FALSE;
			}
		}

		return TRUE;
	}

	// --------------------------------------------------------------------

	/**
	* Validate IPv6 Address
	*
	* @access	protected
	* @param	string
	* @return	bool
	*/
	protected function _valid_ipv6($str)
	{
		// 8 groups, separated by :
		// 0-ffff per group
		// one set of consecutive 0 groups can be collapsed to ::

		$groups = 8;
		$collapsed = FALSE;

		$chunks = array_filter(
			preg_split('/(:{1,2})/', $str, NULL, PREG_SPLIT_DELIM_CAPTURE)
		);

		// Rule out easy nonsense
		if (current($chunks) == ':' OR end($chunks) == ':')
		{
			return FALSE;
		}

		// PHP supports IPv4-mapped IPv6 addresses, so we'll expect those as well
		if (strpos(end($chunks), '.') !== FALSE)
		{
			$ipv4 = array_pop($chunks);

			if ( ! $this->_valid_ipv4($ipv4))
			{
				return FALSE;
			}

			$groups--;
		}

		while ($seg = array_pop($chunks))
		{
			if ($seg[0] == ':')
			{
				if (--$groups == 0)
				{
					return FALSE;	// too many groups
				}

				if (strlen($seg) > 2)
				{
					return FALSE;	// long separator
				}

				if ($seg == '::')
				{
					if ($collapsed)
					{
						return FALSE;	// multiple collapsed
					}

					$collapsed = TRUE;
				}
			}
			elseif (preg_match("/[^0-9a-f]/i", $seg) OR strlen($seg) > 4)
			{
				return FALSE; // invalid segment
			}
		}

		return $collapsed OR $groups == 1;
	}

	// --------------------------------------------------------------------

	/**
	* User Agent
	*
	* @access	public
	* @return	string
	*/
	function user_agent()
	{
		if ($this->user_agent !== FALSE)
		{
			return $this->user_agent;
		}

		$this->user_agent = ( ! isset($_SERVER['HTTP_USER_AGENT'])) ? FALSE : $_SERVER['HTTP_USER_AGENT'];

		return $this->user_agent;
	}
	
	
		/**
	 * Get Request Header
	 *
	 * Returns the value of a single member of the headers class member
	 *
	 * @param 	string		array key for $this->headers
	 * @param	boolean		XSS Clean or not
	 * @return 	mixed		FALSE on failure, string on success
	 */
	public function get_header($index, $xss_clean = FALSE)
	{
		if (empty($this->headers))
		{
			$this->request_headers();
		}

		if ( ! isset($this->headers[$index]))
		{
			return FALSE;
		}

		if ($xss_clean === TRUE)
		{
			return $this->security->xss_clean($this->headers[$index]);
		}

		return $this->headers[$index];
	}
	/**
	 * Request Headers
	 *
	 * 在Apache可用函数apache_request_headers(), 如果是其他
	 * WEB服务器，没有定义类似函数
	 *
	 * @param	bool XSS cleaning
	 *
	 * @return array
	 */
	public function request_headers($xss_clean = FALSE)
	{
		// Look at Apache go!
		if (function_exists('apache_request_headers'))
		{
			$headers = apache_request_headers();
		}
		else
		{
			$headers['Content-Type'] = (isset($_SERVER['CONTENT_TYPE'])) ? $_SERVER['CONTENT_TYPE'] : @getenv('CONTENT_TYPE');

			foreach ($_SERVER as $key => $val)
			{
				if (strncmp($key, 'HTTP_', 5) === 0)
				{
					$headers[substr($key, 5)] = $this->_fetch_from_array($_SERVER, $key, $xss_clean);
				}
			}
		}

		// take SOME_HEADER and turn it into Some-Header
		foreach ($headers as $key => $val)
		{
			$key = str_replace('_', ' ', strtolower($key));
			$key = str_replace(' ', '-', ucwords($key));

			$this->headers[$key] = $val;
		}

		return $this->headers;
	}
}

