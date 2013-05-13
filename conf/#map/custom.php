<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

return array(
    'type'  => 'mysql',
    'table'   => 'custom',
    'primary' => array(
        'name'  =>  'custom_id',
        'auto_increment'  =>  true,
    ),
    'field'   => array(
        'custom_id'         => PARAM_UINT,
        'account_id'        => PARAM_UINT,
        'created'           => PARAM_UINT,
        'custom_name'       => PARAM_STRING,
        'custom_truename'   => PARAM_STRING,
        'custom_sex'        => PARAM_UINT,
        'custom_birthday'   => PARAM_UINT,
        'custom_phone'      => PARAM_UINT,
        'custom_mobile'     => PARAM_UINT,
        'custom_alipay'     => PARAM_STRING,
        'custom_qq'         => PARAM_UINT,
        'custom_msn'        => PARAM_STRING,
        'custom_ali'        => PARAM_STRING,
        'custom_mail'       => PARAM_EMAIL,
        'custom_company'    => PARAM_STRING,
        'custom_occupation' => PARAM_STRING,
        'custom_position'   => PARAM_STRING,
        'custom_idcardtype' => PARAM_UINT,
        'custom_idcard'     => PARAM_STRING,
        'custom_zipcode'    => PARAM_UINT,
        'custom_web'        => PARAM_STRING,
        'custom_bio'        => PARAM_STRING,
        'custom_interest'   => PARAM_STRING,
        'custom_born_address' => PARAM_STRING,
        'custom_stay_address' => PARAM_STRING,
    )
);