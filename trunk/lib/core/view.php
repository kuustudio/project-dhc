<?php
if (!defined('DHC_VERSION')) exit('Access is no allowed.');

//BigPipe ，页面分段输出
class view{
    private static $method;

    public static init($methodName = 'view'){
        self::$method = '_'.$methodName;
    }

    public static _render($param){
        return (self::$method)($param);
    }

    private static _view($param){

    }

    private static _json($param){

    }

    private static _file($param ){

    }

    private static _error($param){

    }

    public static _content($param){

    }

    public static _script($param){

    }
}
