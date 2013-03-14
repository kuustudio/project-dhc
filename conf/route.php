<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

define('ARGV_DEFAULT','[^\/]+');
define('ARGV_INT','\d+');
/*
route:
  '/url/<name>' => 'app/controller/action:name'
*/

return array(
    // '/city/index' => 'home/city/index',
    // '/home/(?<tagname>[^\/]+)'  => 'home/content/index:tagname',
    // '/home/index/(?<id>[^\/]+)/(?<foodid>[^\/]+)' => 'home/index/index:id&foodid',
    '/admin' => 'admin/index/index',
);
