<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'dish_price_group',
    'primary' => array(
        'name'  =>  'price_group_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'price_group_id'    => PARAM_UINT,
        'dish_id'           => PARAM_UINT,
        'price_group_name'  => PARAM_STRING,
        'price_group_price' => PARAM_FLOAT,
        'price_group_unit'  => PARAM_STRING,
        'price_group_currency' => PARAM_STRING,
        'price_group_num'   => PARAM_UINT,
        'price_group_promotion' => PARAM_FLOAT,
    )
);