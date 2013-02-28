<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

return array(
    /*
    *
    * 以下为惯例配置，不允许删除，可修改和增加
    *
    */
    //软件运行模式 debug,released
    'run_model'             => 'debug',
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
    'layout_dir_name'       => 'layout',
    'view_file_subfix'      => '.php',
    'view_complie_expires'  => 3600,

    //缓存相关配置
    'cache_start'           => false,
    'default_cache_backend' => 'memory',

    //数据表字符集及映射表相关配置
    'mysql'                 => 'mysql://root:11112222tq@localhost:3306',
    'dbname'                => 'monk',
    'character_set_connection'  => 'utf8',
    'character_set_results'     => 'utf8',
    'character_set_client'      => 'binary',
    'sql_mode'              => '',
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

    'website'               => 'http://www.dinghaochi.com/',

    'db_map' => array(
        'Account' => '账户表',
        'Area' => '地区表',
        'CategoryCombo' => '套餐分类表',
        'CategoryDish' => '菜品分类表',
        'CategoryStore' => '店铺分类表',
        'Combo' => '套餐表',
        'Custom' => '客户表',
        'CustomBookAddress' => '客户预订地址表',
        'Dish' => '菜品表',
        'DishPriceGroup' => '菜品价格分组表',
        'DroupChowhound' => '吃货圈表',
        'GroupGeo' => '地理圈表',
        'GroupMission' => '团餐圈表',
        'Menu' => '日菜单表',
        'Orders' => '订单表',
        'Store' => '店铺表',
        'SysAdmin' => '管理员表',
        'SysAdminGroup' => '管理员组表',
        'SysAuthority' => '权限表',
        'SysAuthorityGroup' => '权限组表'
    ),
);
