<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'order',
    'primary' => array(
        'name'  =>  'order_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'order_id'          => PARAM_UINT,
        'order_number'      => PARAM_STRING,
        'order_user_type'   => PARAM_UINT,
        'order_user_id'     => PARAM_UINT,
        'order_total'       => PARAM_FLOAT,
        'store_id'          => PARAM_UINT,
        'created'           => PARAM_UINT,
        'order_status'      => PARAM_UINT,
    )
);