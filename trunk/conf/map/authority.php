<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'sys_authority',
    'primary' => array(
        'name'  =>  'authority_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'authority_id'      => PARAM_UINT,
        'authority_name'    => PARAM_STRING,
        'authority_app'     => PARAM_STRING,
        'authority_controller' => PARAM_STRING,
        'authority_action'  => PARAM_STRING,
        'created'           => PARAM_UINT,
    )
);