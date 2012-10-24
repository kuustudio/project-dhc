<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

define('ROUTE_TYPE_DEFAULT', ':default');
define('ROUTE_REGEXP_TYPE_ANY', ':any');
define('ROUTE_REGEXP_TYPE_NUM', ':num');

/*
route:
'/url/' => array(
    'app'        => 'home',
    'controller' => 'index',
    'action'     => 'index',
    'client'     => 'pc' //未必使用
)
*/

return array(
    ROUTE_TYPE_DEFAULT => array(
        'app'        => 'home',
        'controller' => 'index',
        'action'     => 'index'
    )
);
