<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'table' => 'account',
    'field'   => array(
        'account_id'=> PARAM_STRING,
        'email'     => PARAM_EMAIL,
        'paswd'     => PARAM_STRING,
        'is_checked'=> PARAM_BOOL,
    )
);