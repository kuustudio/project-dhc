<?php
/*
*
*
*
*/
$G = array();
$check_array = array(
	'PARAM_INT' => 'get_param_uint'
);
function _get($key,$prefix = 'get_'){
	global $G;
	return $G[$prefix.$key];
}

/*
* $types = array(
*     'name' => 'PARAM_INT'
* );
*/
function gets($types,$prefix = 'get_'){
	global $G;
	foreach($types as $key=>$type){
		$G[$prefix.$key] = get_param_by_type($_GET[$key],$type);
	}
}

function _post($key,$type){
	return get_param_by_type($_POST[$key],$type);
}

function _cookie($key,$type){
	return get_param_by_type($_COOKIE[$key],$type);
}

function get_param_by_type($value,$type){
	global $check_array;
	$func = $check_array[$type];
	return $func($value);
}


gets(array('ok'=>'PARAM_INT'));
var_dump($G);
echo _get('ok'); 