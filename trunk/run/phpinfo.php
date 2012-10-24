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
function _get($key,$type){
	return get_param_by_type($_GET[$key],$type);
}

function _post($key,$type){
	return get_param_by_type($_POST[$key],$type);
}

function _cookie($key,$type){
	return get_param_by_type($_POST[$key],$type);
}

function get_param_by_type($value,$type){
	global $check_array;
	$func = $check_array[$type];
	return $func($value);
}

function get_param_uint($value){
	if(ctype_digit($value) || is_int($value)){
		return intval($value);
	}else{
		throw new Exception("uint error");
	}
}

echo _get('ok','PARAM_INT'); 