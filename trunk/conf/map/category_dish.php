<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'category_dish',
    'primary' => array(
        'name'  =>  'category_dish_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'category_dish_id' => PARAM_UINT,
        'category_dish_name' => PARAM_STRING,
    )
);