<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');
/*
 * 路由匹配规则
 * PATHINFO => 'app/controller/action[:tag1&tag2&tag3 ...]'
 * 默认url:'app/controller/action/id/1'
 *
 */
class DHCRouterUri{
    /**
     * 存储url模式
     *
     * @var string
     */
    var $url_method       = 'url_default';
    /**
     * 路由表
     *
     * @var array
     */
    var $routes           = array();


    public function __construct($url_method, $routes){
        $this->url_method = $url_method;
        $this->routes = $routes;
    }

    public function parse_uri($uri,$subfix = ''){
		//去掉后缀
        if(!empty($subfix)) $uri = substr($uri,0,-strlen($subfix));
		//添加默认
		$container = array(
			'app'		=> DHC::getConfig('app'),
			'controller'=> DHC::getConfig('controller'),
			'action'	=> DHC::getConfig('action')
		);
        if($this->url_method == 'url_rewrite'){
            //静态路径匹配
            if(isset($this->routes[$uri]))
            {
                list($app,$controller,$action) = explode('/', $this->routes[$uri]);
				$container['app']		= $app;
				$container['controller']= $controller;
				$container['action']	= $action;
                return $container;
            }

            // 动态路径匹配
            foreach($this->routes as $key => $val)
            {
                $key = str_replace('/','\/',$key);
                if(preg_match('#^'.$key.'$#', $uri, $matches))
                {
                    $urls = explode(':', $val);
                    list($app,$controller,$action) = explode('/', $urls[0]);
					$container['app']		= $app;
					$container['controller']= $controller;
					$container['action']	= $action;
                    $querys = explode('&', $urls[1]);
                    foreach ($querys as $value) {
                        $container[$value] = $matches[$value];
                    }
                    return $container;
                }
            }
            $middle_c = explode('/', substr($uri, 1));
            $container['app'] = array_shift($middle_c);
            $container['controller'] = array_shift($middle_c);
            $container['action'] = array_shift($middle_c);
            $param_count = count($middle_c);
            if($param_count%2 == 1) Error::logError(CORE_ROUTER_EC_PARAM_ALIGNMENT, EXCEPTION);
            for ($i=0; $i < $param_count/2; $i++) { 
                $key = array_shift($middle_c);
                $_GET[$key] = array_shift($middle_c);
            }
			return $container;
        }elseif($this->url_method == 'url_default'){
            DHC::$_input->gets(array(
                    DHC::getConfig('app_name')           => array('func'=>PARAM_STRING),
                    DHC::getConfig('controller_name')    => array('func'=>PARAM_STRING),
                    DHC::getConfig('action_name')        => array('func'=>PARAM_STRING)
                )
            );
            parse_str($uri,$output);
            if(isset($output[DHC::getConfig('app_name')])) $container['app'] = $output[DHC::getConfig('app_name')];
            if(isset($output[DHC::getConfig('controller_name')])) $container['controller'] = $output[DHC::getConfig('controller_name')];
            if(isset($output[DHC::getConfig('action_name')])) $container['action'] = $output[DHC::getConfig('action_name')];
            return $container;
        }else{
            Error::logError(CORE_INPUT_EC_NO_URL_METHOD, EXCEPTION);
        }
    }

    public function url($option){
        if(!empty($option['app']) && !empty($option['controller']) && !empty($option['action'])){
            if($this->url_method == 'url_rewrite'){
                //URL重写模式下
                $uri = $option['app'].'/'.$option['controller'].'/'.$option['action'];
                unset($option['app']);
                unset($option['controller']);
                unset($option['action']);
                $reroutes = array_flip($this->routes);
                if(!empty($option))
                    $uri_comp = $uri.':'.implode('&',array_keys($option));
                else
                    $uri_comp = $uri;
                //静态路径匹配
                if (isset($reroutes[$uri_comp])) {
                    if(empty($option)){
                        return $reroutes[$uri_comp];
                    }else{
                        //动态路径匹配
                        $url = $reroutes[$uri_comp];
                        foreach ($option as $key=>$value) {
                            $url = str_replace('(?<'.$key.'>[^\/]+)', $value, $url);
                        }
                        return $url;
                    }
                }else{
                    if(empty($option)){
                        return '/'.$uri;
                    }else{
                        $url = '/'.$uri;
                        foreach ($option as $key => $value) {
                            $url .= '/'.$key.'/'.$value;
                        }
                        return $url;
                    }
                }

            }elseif($this->url_method == 'url_default'){
                $url =  '?'.DHC::getConfig('app_name').'='.$option['app'].
                        '&'.DHC::getConfig('controller_name').'='.$option['controller'].
                        '&'.DHC::getConfig('action_name').'='.$option['action'];
                unset($option['app']);
                unset($option['controller']);
                unset($option['action']);
                $url .= '&'.http_build_query($option);
                return $url;
            }else{
                Error::logError(CORE_ROUTER_EC_NO_URL_METHOD, EXCEPTION);
            }
        }else{
            Error::logError(CORE_ROUTER_EC_UNABLE_URL, EXCEPTION);
        }
    }

    private function _url_rewrite(){

    }
}