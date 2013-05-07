<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'table' => 'area_place',
    'field'   => array(
        'place_id'      => PARAM_UINT,
        'place_name'    => PARAM_STRING,
        'city_id'       => PARAM_UINT,
        'district_id'   => PARAM_UINT,
        'place_type'    => PARAM_UINT,
        'start_with'    => PARAM_STRING,
        'long_lat'      => PARAM_STRING,
        'latitude'      => PARAM_FLOAT,
        'longitude'     => PARAM_FLOAT,
        'created'       => PARAM_DATETIME,
        'updated'       => PARAM_DATETIME,
    )
);