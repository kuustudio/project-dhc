<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'custom_book_address',
    'primary' => array(
        'name'  =>  'book_address_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'book_address_id'   => PARAM_UINT,
        'custom_id'         => PARAM_UINT,
        'geogroup_id'       => PARAM_UINT,
        'additional_address'=> PARAM_STRING,
        'created'           => PARAM_UINT,
    )
);