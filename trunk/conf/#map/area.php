<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'area',
    'primary' => array(
        'name'  =>  'area_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'area_id'       => PARAM_UINT,
        'area_name'     => PARAM_STRING,
        'parent_id'     => PARAM_UINT,
        'area_fullname' => PARAM_STRING,
        'area_fullids'  => PARAM_STRING,
        'area_latitude' => PARAM_FLOAT,
        'area_longitude'=> PARAM_FLOAT,
        'created'       => PARAM_UINT,
    )
);