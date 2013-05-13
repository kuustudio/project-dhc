<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'dish',
    'primary' => array(
        'name'  =>  'dish_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'dish_id'           => PARAM_UINT,
        'dish_name'         => PARAM_STRING,
        'dish_can_order'    => PARAM_UINT,
        'dish_logo'         => PARAM_STRING,
        'dish_info'         => PARAM_STRING,
        'dish_tag'          => PARAM_STRING,
        'has_price_group'   => PARAM_UINT,
        'dish_price'        => PARAM_FLOAT,
        'dish_unit'         => PARAM_STRING,
        'dish_currency'     => PARAM_STRING,
        'dish_num'          => PARAM_UINT,
        'dish_promotion'    => PARAM_FLOAT,
        'created'           => PARAM_UINT,
    )
);