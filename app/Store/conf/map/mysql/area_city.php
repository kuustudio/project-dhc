<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'table' => 'area_city',
    'field'   => array(
        'city_id'   => PARAM_UINT,
        'city_name' => PARAM_STRING,
        'parent_province' => PARAM_UINT,
        'start_with'=> PARAM_STRING,
        'long_lat'  => PARAM_STRING,
        'created'   => PARAM_DATETIME,
        'updated'   => PARAM_DATETIME,
    )
);