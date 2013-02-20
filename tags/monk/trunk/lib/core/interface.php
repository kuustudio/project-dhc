<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

interface Imodel{
    public function validateAtrribute($attrName, $typeName);
}

interface Idb{
    public static function init($connectionstring,$database);

}

interface Iview{
    
}

