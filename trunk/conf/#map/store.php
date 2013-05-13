<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'store',
    'primary' => array(
        'name'  =>  'store_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'store_id'      => PARAM_UINT,
        'account_id'    => PARAM_UINT,
        'store_address' => PARAM_STRING,
        'store_phone'   => PARAM_STRING,
        'store_business_time' => PARAM_STRING,
        'store_info'    => PARAM_STRING,
        'store_name'    => PARAM_STRING,
        'category_store_id' => PARAM_UINT,
        'created'       => PARAM_UINT,
    )
);
