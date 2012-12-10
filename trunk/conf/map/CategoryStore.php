<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'category_store',
    'primary' => array(
        'name'  =>  'category_store_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'category_store_id' => PARAM_UINT,
        'category_store_name' => PARAM_STRING,
    )
);