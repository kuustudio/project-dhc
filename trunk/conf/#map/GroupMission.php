<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'group_mission',
    'primary' => array(
        'name'  =>  'mission_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'mission_id'        => PARAM_UINT,
        'geo_id'            => PARAM_UINT,
        'mission_name'      => PARAM_STRING,
        'additional_address'=> PARAM_STRING,
        'created'           => PARAM_UINT
    )
);