<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
	// url_rewrite url_default
	'url_method'			=> 'url_rewrite',
    //默认配置
    'default_app'           => 'home',
    'default_controller'    => 'index',
    'default_action'        => 'index',
    'default_client'        => 'pc',
    
    'cache_start'           => false,
    'default_cache_backend' => 'memory',
    
);
