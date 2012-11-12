<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
	// url_rewrite url_default
	'url_method'		    => 'url_rewrite',
    'url_html_subfix'       => '.html',
    
    //默认配置
    'app'                   => 'home',
    'controller'            => 'index',
    'action'                => 'index',
    'client'                => 'pc',

    'app_name'              => 'app',
    'controller_name'       => 'controller',
    'action_name'           => 'action',
    
    'cache_start'           => false,
    'default_cache_backend' => 'memory',

    'map_path'              => DHC_CONF.'map'.DS,
    'db_write_validate'     => true,
    'db_where_validate'     => true,
    
    //数据库连接字串配置(考虑多个数据库，主从以及读写分离)
    'mysql'                 =>  array(
                                    'master'=>  array(
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

);
