<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

interface Imodel{
    public static function init(){}
    public function validator(){}
    public function validateAttribute($attrName, $typeName){}
}

interface Idb{
    public static function init(){}

}

