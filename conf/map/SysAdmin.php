<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'sys_admin',
    'primary' => array(
        'name'  =>  'admin_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'admin_id'      => PARAM_UINT,
        'account_id'    => PARAM_UINT,
        'admin_name'    => PARAM_STRING,
        'admin_group_id'=> PARAM_UINT,
        'created'       => PARAM_UINT,
    )
);