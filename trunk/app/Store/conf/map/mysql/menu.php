<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'table' => 'menu',
    'field'   => array(
        'account_id'=> PARAM_STRING,
        'is_online' => PARAM_BOOL,
        'created'   => PARAM_DATETIME,
        'updated'   => PARAM_DATETIME,
    )
);