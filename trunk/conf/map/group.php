<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'group',
    'primary' => array(
        'name'  =>  'group_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'group_id'      => PARAM_UINT,
        'geogroup_id'   => PARAM_UINT,
        'group_name'    => PARAM_STRING,
        'group_type'    => PARAM_UINT,
        'additional_address' => PARAM_STRING,
        'created'       => PARAM_UINT,
    )
);