<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');
/*
 * 路由匹配规则
 * PATHINFO => 'app/controller/action[:argv1=$1&argv2=$2 ...]'
 * 默认url:'app/controller/action/id/1'
 *
 */
class DHCRouterUri{
    /**
     * 存储url模式
     *
     * @var array
     */
    var $url_method       = 'url_default';

    public static function parse_uri($uri){
        //静态路径匹配
        if(isset($this->routes[$uri]))
        {
            return explode('/', $this->routes[$uri]);
        }

        // 动态路径匹配
        foreach($this->routes as $key => $val)
        {
            //$key = str_replace('', '.+', str_replace(':num', '[0-9]+', $key));

            if(preg_match('#^'.$key.'$#', $uri))
            {
                if(strpos($val, '$') !== FALSE AND strpos($key, '(') !== FALSE)
                {
                    $val = preg_replace('#^'.$key.'$#', $val, $uri);
                }
                $urls = explode(':', $val);
                parse_str($urls[1], $_GET);
                return explode('/', $urls[0]);
            }
        }

    }

    public static function url($option){
        if(!empty($option['app']) && !empty($option['controller']) && !empty($option['action'])){
            if($this->url_method == 'url_rewrite'){
                //URL重写模式下
                $uri = $option['app'].'/'.$option['controller'].'/'.$option['action'];
                $reroutes = array_flip($this->routes);
                //静态路径匹配
                if ($reroutes[$uri]) {
                    return $reroutes[$uri];
                }else{
                    //动态路径匹配
                    foreach($reroutes as $key => $value){
                        $route = explode(':', $key);
                        if ($uri == $route[0]) {
                            $params = explode('&', $route[1]);
                        }
                    }
                }

            }elseif($this->url_method == 'url_default'){
              
            }else{
                Error::logError(CORE_INPUT_EC_NO_URL_METHOD);
            }
        }else{
            Error::logError(CORE_ROUTER_EC_UNABLE_URL);
        }
    }
}