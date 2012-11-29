<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'combo',
    'primary' => array(
        'name'  =>  'combo_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'combo_id'      => PARAM_UINT,
        'combo_item'    => PARAM_STRING,
        'combo_unit'    => PARAM_STRING,
        'combo_currency'=> PARAM_STRING,
        'combo_num'     => PARAM_UINT,
        'combo_price'   => PARAM_FLOAT,
        'combo_tag'     => PARAM_STRING,
        'combo_promotion' => PARAM_FLOAT,
        'created'       => PARAM_UINT,
    )
);