<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

interface Imodel{
    public function init(){}
    public function validator(){}
    public function validateAttribute($attrName, $typeName){}
}

