<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'sys_admin_group',
    'primary' => array(
        'name'  =>  'admin_group_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'admin_group_id'    => PARAM_UINT,
        'admin_group_name'  => PARAM_STRING,
        'admin_group_authoritys' => PARAM_STRING,
    )
);