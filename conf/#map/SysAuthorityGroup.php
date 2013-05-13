<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'sys_authority_group',
    'primary' => array(
        'name'  =>  'authority_group_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'authority_group_id'    => PARAM_UINT,
        'authority_group_name'  => PARAM_STRING,
        'authority_group_authoritys' => PARAM_STRING,
    )
);