<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'DBType'  => 'mysql',
    'Table'   => 'visit_records',
    'Primary' => 'id',
    'Field'   => array(
        'idtype'  => PARAM_STRING,
        'uid'     => PARAM_UINT,
        'attr'    => PARAM_ARRAY,
        'extra'   => PARAM_ARRAY,
        'adddate' => PARAM_DATETIME
    )
)
