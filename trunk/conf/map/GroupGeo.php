<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'group_geo',
    'primary' => array(
        'name'  =>  'geo_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'geo_id'            => PARAM_UINT,
        'area_id'           => PARAM_UINT,
        'geo_province'      => PARAM_UINT,
        'geo_city'          => PARAM_UINT,
        'geo_dest'          => PARAM_UINT,
        'geo_street'        => PARAM_UINT,
        'geo_name'          => PARAM_STRING,
        'created'           => PARAM_UINT,
    )
);