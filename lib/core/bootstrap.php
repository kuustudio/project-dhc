<?php
define('DS', DIRECTORY_SEPARATOR);
define('DHC_VERSIONs', '0.1');
define('DHC_LIB', dirname(__FILE__) . DIRECTORY_SEPARATOR);
define('ROOT_DIR', dirname(__FILE__) . DIRECTORY_SEPARATOR);
#define("STATICPATH", dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . "static.tripbe.com" . DIRECTORY_SEPARATOR);

include( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'function.php' );
include( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'controller.php' );
include( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'db.php' );
include( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'pager.php' );
include( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'error.php' );
include( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'PagedList.php' );
include( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'geo.php' );
include( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'httpsqs_client.php' );
include 'dbmapper.php';
include 'dbobject.php';
include( dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . 'dbmapper.php' );
include( dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . 'dbobject.php' );
include( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'FormToken.php' );

set_include_path( MVCPATH );

function run(){
    echo 'run';
}
