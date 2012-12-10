<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'group_chowhound',
    'primary' => array(
        'name'  =>  'chowhound_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'chowhound_id'  => PARAM_UINT,
        'chowhound_name'=> PARAM_STRING,
        'created'       => PARAM_UINT
    )
);