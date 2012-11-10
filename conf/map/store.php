<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'entity_store',
    'primary' => array(
        'name'  =>  'store_id',
        'auto_increment'  =>  true,
    )
    'field'   => array(
        'store_id'      => PARAM_UINT,
        'store_name'    => PARAM_STRING,
        'created'       => PARAM_DATETIME,
    )
)
