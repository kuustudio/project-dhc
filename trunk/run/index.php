<?php
define('DHC_VERSION', '0.1');
include_once('../lib/core/bootstrap.php');

//DHC::run();
$s = array();
include_once('parameter.php');
param_post(array('test'=>$PARAM_ARRAY),'p',$s);
var_dump($s);
?>
<html>
<form method=post>
<input type=text name=test[] value=test1 />
<input type=text name=test[] value=test2 />
<input type=submit value=test>
</html>

