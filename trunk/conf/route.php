<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

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
    '/city/index'         => 'home/city/index',
    '/home/(.+)'          => 'home/content/index:tag=&1',
    '/home/index/(.+)'    => 'home/index/index:id=&1'
);
