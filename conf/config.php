<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
	// url_rewrite url_default
	'url_method'		    => 'url_rewrite',
    'url_html_subfix'       => '.html',

    'website'               => 'http://www.dinghaochi.com/',
    
    //默认配置
    'app'                   => 'home',
    'controller'            => 'index',
    'action'                => 'index',
    'client'                => 'pc',
    'theme'                 => 'default',

    'app_name'              => 'app',
    'controller_name'       => 'controller',
    'action_name'           => 'action',

    'view_dir_name'         => 'views',
    'compile_dir'           => DHC_ROOT.'c_views'.DS,
    'view_file_subfix'      => '.php',
    'view_complie'          => false,
    'view_complie_expires'  => 3600,


    'cache_start'           => false,
    'default_cache_backend' => 'memory',

    'map_path'              => DHC_CONF.'map'.DS,
    'db_write_validate'     => true,
    'db_where_validate'     => true,

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
    
    //数据库连接字串配置(考虑多个数据库，主从以及读写分离)
    'mysql' => array(
        'master'=> array(
            'one'=> array(
                'connectionString' => 'mysql://root:11112222tq@localhost:3306',
                'database' => 'dhc_demo'
            ),
            'two'=> array(
                'connectionString' => 'mysql://root:11112222tq@localhost:3306',
                'database' => 'dhc_demo'
            ),
        ),
        'slave' =>  array(
            'one'=> array(
                'connectionString' => 'mysql://root:11112222tq@localhost:3306',
                'database' => 'dhc_demo'
            ),
            'two'=> array(
                'connectionString' => 'mysql://root:11112222tq@localhost:3306',
                'database' => 'dhc_demo'
            ),
            'three'=> array(
                'connectionString' => 'mysql://root:11112222tq@localhost:3306',
                'database' => 'dhc_demo'
            ),
        )
    ),
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
