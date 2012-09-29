<?php
define('DS', DIRECTORY_SEPARATOR);
define('PS', PATH_SEPARATOR);
define('DHC_VERSIONs', '0.1');
define('DHC_LIB', dirname(dirname(__FILE__)) . DS);
define('DHC_CONF', dirname(dirname(dirname(__FILE__))) . DS . 'conf' . DS);
set_include_path( get_include_path() . PS . DHC_LIB . PS . DHC_CONF);


include( DHC_LIB . 'core/function.php' );

$G = array();

function run(){
    echo 'run';
}
