<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'menu',
    'primary' => array(
        'name'  =>  'menu_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'menu_id'           => PARAM_UINT,
        'can_order'         => PARAM_UINT,
        'menu_content'      => PARAM_STRING,
        'can_group_order'   => PARAM_UINT,
        'menu_delivery_price' => PARAM_FLOAT,
        'created'           => PARAM_UINT,
        'menu_start_time'   => PARAM_UINT,
        'menu_end_time'     => PARAM_UINT,
    )
);