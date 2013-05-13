<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'account',
    'primary' => array(
        'name'  =>  'account_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'account_id'    => PARAM_UINT,
        'account_name'  => PARAM_STRING,
        'account_password' => PARAM_STRING,
        'account_type'  => PARAM_UINT,
        'created'       => PARAM_UINT,
    )
);