<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'table' => 'dish_category',
    'field'   => array(
        'category_id'   => PARAM_UINT,
        'category_name' => PARAM_STRING,
        'category_orderby'=> PARAM_UINT,
        'created'       => PARAM_DATETIME,
        'updated'       => PARAM_DATETIME,
    )
);