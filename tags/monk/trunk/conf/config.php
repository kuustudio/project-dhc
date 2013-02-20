<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

return array(
    /*
    *
    * 以下为惯例配置，不允许删除，可修改和增加
    *
    */
	//URL模式及后缀 url_rewrite url_default
	'url_method'		    => 'url_rewrite',
    'url_html_subfix'       => '.html',
    
    //默认应用，控制器，行为，客户端类型，风格
    'app'                   => 'home',
    'controller'            => 'index',
    'action'                => 'index',
    'client'                => 'pc',
    'theme'                 => 'default',

    //默认应用，控制器，行为的名称
    'app_name'              => 'app',
    'controller_name'       => 'controller',
    'action_name'           => 'action',

    //视图及视图缓存配置
    'view_dir_name'         => 'views',
    'compile_dir'           => MONK_ROOT.'c_views'.DS,
    'view_file_subfix'      => '.php',
    'view_complie'          => false,
    'view_complie_expires'  => 3600,

    //缓存相关配置
    'cache_start'           => false,
    'default_cache_backend' => 'memory',

    //数据表相关配置
    'map_path'              => MONK_CONF.'map'.DS,

    //验证开关
    'input_param_validate'  => true,
    'db_param_validate'     => true,

    //全局数据验证配置
    'allowed_server_param'  => array(
        'HTTP_USER_AGENT'   => PARAM_STRING,
        'HTTP_HOST'         => PARAM_STRING,
        'PATH_INFO'         => PARAM_STRING,
        'HTTP_X_REQUESTED_WITH' => PARAM_STRING,
        'x-requested-with'  => PARAM_STRING,
        'REQUEST_METHOD'    => PARAM_STRING,
        'SERVER_NAME'       => PARAM_STRING,
        'HTTPS'             => PARAM_STRING,
        'REQUEST_URI'       => PARAM_STRING,
        'HTTP_REFERER'      => PARAM_STRING,
    ),
    
    /*
    *
    * 用户可自定义配置
    */
);
