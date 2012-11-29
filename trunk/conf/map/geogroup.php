<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'geogroup',
    'primary' => array(
        'name'  =>  'geogroup_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'geogroup_id'       => PARAM_UINT,
        'geogroup_province' => PARAM_UINT,
        'geogroup_city'     => PARAM_UINT,
        'geogroup_dest'     => PARAM_UINT,
        'geogroup_street'   => PARAM_UINT,
        'geogroup_name'     => PARAM_STRING,
        'created'           => PARAM_UINT,
    )
);