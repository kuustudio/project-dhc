<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

function dump($mix){
    echo '<pre>';
    var_dump($mix);
    echo '</pre>';
}

/*
* $_GET,$_POST,$_COOKIE,$_SERVER等值的验证依赖函数
* 也可以独立使用
*/
function get_param_exists($value){
	return isset($value);
}

function get_param_hashvar($value){
	//用于验证的哈希值
}

function get_param_raw($value){
	return $value;
}

function get_param_array($arr){
	if(is_array($arr)){
		foreach($arr as $k=>$v){
			//无法支持轮询
		}
	}else{
		return array();
	}
}

function get_param_null($value){
	if($value == '') return null;
}

function get_param_uint($value){
	if(ctype_digit($value) || is_int($value))
}




