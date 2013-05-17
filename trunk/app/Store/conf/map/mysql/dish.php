<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'table' => 'dish',
    'field'   => array(
        'dish_id'   => PARAM_STRING,
        'account_id'=> PARAM_STRING,
        'category_id'=> PARAM_STRING,
        'dish_name' => PARAM_STRING,
        'dish_push' => PARAM_BOOL,
        'dish_logo' => PARAM_STRING,
        'dish_info' => PARAM_TEXT,
        'dish_price'=> PARAM_FLOAT,
        'created'   => PARAM_DATETIME,
        'updated'   => PARAM_DATETIME,
    )
);