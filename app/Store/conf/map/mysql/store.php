<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'table' => 'store',
    'field'   => array(
        'account_id'    => PARAM_STRING,
        'store_name'    => PARAM_STRING,
        'store_type'    => PARAM_UINT,
        'store_phone'   => PARAM_STRING,
        'store_qq'      => PARAM_STRING,
        'store_contacts'=> PARAM_STRING,
        'city_id'       => PARAM_UINT,
        'district_id'   => PARAM_UINT,
        'store_address' => PARAM_STRING,
        'long_lat'      => PARAM_STRING,
        'store_places'  => PARAM_TEXT,
        'store_info'    => PARAM_TEXT,
        'is_online'     => PARAM_BOOL,
        'category_with_dish' => PARAM_TEXT,
        'created'       => PARAM_DATETIME,
        'updated'       => PARAM_DATETIME,
    )
);