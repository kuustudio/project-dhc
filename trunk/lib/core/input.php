<?php 
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

class DHCInput{
	
	/**
	 * 通过服务器传送过来的pathinfo
	 *
	 * @var array
	 */
	var $pathinfo				= '';
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
		return ($this->server('HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest') ||
					 ($this->server('x-requested-with') === 'XMLHttpRequest');
	}

	/*
	* 是否post request
	*/
	public function is_post(){
		return ($this->server('REQUEST_METHOD') === 'POST');
	}

	/*
	* 获取当前 website url
	*/
	public function website_url(){
		return $this->http_or_s() . '://' . $this->server('SERVER_NAME');
	}

	private function http_or_s(){
		$scheme = $this->server('HTTPS');
		return (empty($scheme)||($scheme=='off'))?'http':'https';
	}

	/*
	* 当前页地址
	*/
	public function raw_url(){
		return $this->website_url . $this->server('REQUEST_URI');
	}

	/*
	*	获取来源页的地址
	*/
	public function referer(){
		return $this->server('HTTP_REFERER');
	}

	/*
	* $types = array(
	* 'name'	=> PARAM_STRING,
	*	'content'	=> array('func'=>PARAM_STRING,'argv'=>PARAM_TEXT),
	*	'sex'	=> array('func'=>PARAM_STRING)
	* );
	*/
	public function gets($types){
		foreach($types as $key=>$type){
			if(!isset($_GET[$key])) return false;
			$this->gets[$this->get_prefix.$key] = $this->get_param_by_type($_GET[$key],isset($type['func'])?$type['func']:$type,isset($type['argv'])?$type['argv']:'');
		}
	}

	public function posts($types){
		foreach($types as $key=>$type){
			if(!isset($_POST[$key])) return false;
			$this->posts[$this->post_prefix.$key] = $this->get_param_by_type($_POST[$key],isset($type['func'])?$type['func']:$type,isset($type['argv'])?$type['argv']:'');
		}
	}

	public function cookies($types){
		foreach($types as $key=>$type){
			if(!isset($_COOKIE[$key])) return false;
			$this->cookies[$this->cookie_prefix.$key] = $this->get_param_by_type($_COOKIE[$key],isset($type['func'])?$type['func']:$type,isset($type['argv'])?$type['argv']:'');
		}
	}

	public function servers($types){
		foreach($types as $key=>$type){
			if(!isset($_SERVER[$key])) return false;
			$this->servers[$this->server_prefix.$key] = $this->get_param_by_type($_SERVER[$key],isset($type['func'])?$type['func']:$type,isset($type['argv'])?$type['argv']:'');
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
		$func = validator::$function_array[$funckey];
		if(empty($argv)) return validator::$func($value);
		return $func($value,$argv);
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

