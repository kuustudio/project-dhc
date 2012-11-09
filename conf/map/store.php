<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'entity_store',
    'primary' => 'store_id',
    'field'   => array(
        'store_name'    => PARAM_STRING,
        'created'       => PARAM_DATETIME,
    )
)
