<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'category_combo',
    'primary' => array(
        'name'  =>  'category_combo_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'category_combo_id' => PARAM_UINT,
        'category_combo_name' => PARAM_STRING,
    )
);