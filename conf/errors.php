<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

define('API_EC_SUCCESS', 0);

/*
 * 一般错误
 */
define('API_EC_UNKNOWN', 1);
define('API_EC_SERVICE', 2);
define('API_EC_METHOD', 3);
define('API_EC_OBJECT', 4);
define('API_EC_TOO_MANY_CALLS', 5);
define('API_EC_BAD_IP', 6);

/*
 * 参数错误
 */
define('API_EC_PARAM', 100);
define('API_EC_PARAM_API_KEY', 101);
define('API_EC_PARAM_SESSION_KEY', 102);
define('API_EC_PARAM_SIGNATURE', 104);
define('API_EC_PARAM_TOO_MANY', 105);
define('API_EC_PARAM_USER_ID', 110);
define('API_EC_PARAM_USER_FIELD', 111);
define('API_EC_PARAM_SOCIAL_FIELD', 112);
define('API_EC_PARAM_SUBCATEGORY', 141);
define('API_EC_PARAM_TITLE', 142);
define('API_EC_PARAM_BAD_JSON', 144);

/*
 * 用户权限错误
 */
define('API_EC_PERMISSION', 200);
define('API_EC_PERMISSION_USER', 210);
define('API_EC_PERMISSION_ALBUM', 220);
define('API_EC_PERMISSION_PHOTO', 221);
define('API_EC_PERMISSION_MESSAGE', 230);
define('API_EC_PERMISSION_MARKUP_OTHER_USER', 240);
define('API_EC_PERMISSION_STATUS_UPDATE', 250);

/*
 * SQL错误
 */
define('FQL_EC_UNKNOWN_ERROR', 600); // 不能发生
define('FQL_EC_PARSER_ERROR', 601);
define('FQL_EC_UNKNOWN_FIELD', 602);
define('FQL_EC_UNKNOWN_TABLE', 603);
define('FQL_EC_NO_INDEX', 604);
define('FQL_EC_UNKNOWN_FUNCTION', 605);
define('FQL_EC_INVALID_PARAM', 606);

/**
 * Ref stuff
 */
define('API_EC_REF_SET_FAILED', 700);

/**
 * 数据存储错误
 */
define('API_EC_DATA_UNKNOWN_ERROR', 800); // 不能发生
define('API_EC_DATA_INVALID_OPERATION', 801);
define('API_EC_DATA_QUOTA_EXCEEDED', 802);
define('API_EC_DATA_OBJECT_NOT_FOUND', 803);
define('API_EC_DATA_OBJECT_ALREADY_EXISTS', 804);
define('API_EC_DATA_DATABASE_ERROR', 805);


/*
 * 应用信息错误
 */
define('API_EC_NO_SUCH_APP', 900);


define('API_EC_BATCH_TOO_MANY_ITEMS', 950);

return array(
    API_EC_SUCCESS             => '成功',
    API_EC_UNKNOWN             => '发生未知错误',
    API_EC_SERVICE             => '服务暂时不可用',
    API_EC_METHOD              => '未知方法',
    API_EC_OBJECT              => '无效对象',
    API_EC_TOO_MANY_CALLS      => '达到应用程序的请求限制',
    API_EC_BAD_IP              => '未经授权的源IP地址',
    API_EC_PARAM               => '无效的参数',
    API_EC_PARAM_API_KEY       => '无效的API key',
    API_EC_PARAM_SESSION_KEY   => '无效或者过期的Session key',
    API_EC_PARAM_SIGNATURE     => '不正确的签名',
    API_EC_PARAM_TOO_MANY      => '该操作的参数过多',
    API_EC_PARAM_USER_ID       => '无效的用户id',
    API_EC_PARAM_USER_FIELD    => '无效的用户info字段',
    API_EC_PARAM_SOCIAL_FIELD  => '无效的用户字段',
    API_EC_PARAM_SUBCATEGORY   => '无效的子分类',
    API_EC_PARAM_TITLE         => '无效的标题',
    API_EC_PARAM_BAD_JSON      => 'JSON字符串异常',
    API_EC_PERMISSION          => '权限错误',
    API_EC_PERMISSION_USER     => '用户不可见',
    API_EC_PERMISSION_ALBUM    => '相册或专辑不可见',
    API_EC_PERMISSION_PHOTO    => '照片不可见',
    API_EC_PERMISSION_MESSAGE  => '不允许发送消息给用户',
);
