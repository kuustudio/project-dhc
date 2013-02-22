<?php
if (!defined('MONK_VERSION')) exit('Access is no allowed.');

return array(
    'table'   => 'test2',
    'primary' => array(
        'name'  =>  'id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'id'            => PARAM_UINT,
        'name'          => PARAM_STRING,
        'created'       => PARAM_UINT,
        'value'         => PARAM_STRING
    )
);