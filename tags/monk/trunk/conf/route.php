<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

/*
可根据正则表达式对参数进行类型过滤
route:
  '/url/<name>' => 'app/controller/action:name'
example:
  '/city/index' => 'home/city/index',
  '/home/(?<tagname>[^\/]+)'  => 'home/content/index:tagname',
  '/home/index/(?<id>[^\/]+)/(?<foodid>[^\/]+)' => 'home/index/index:id&foodid',
*/

return array(

);
