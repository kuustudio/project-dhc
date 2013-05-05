var Lbs = (function(){
    var hasLbs = !!(navigator.geolocation);
    var getLbs = function(showCallback,errorCallback){
        if(hasLbs){
            navigator.geolocation.getCurrentPosition(showCallback,errorCallback,{enableHighAccuracy:false,timeout:30000,maximumAge:30000});
        }else{
            errorCallback();
        }
    };
//    var showPosition = function(position){
//        latlon = position.coords.latitude + ',' + position.coords.longitude;
//    };
//    var showError = function(error){
//        switch(error.code){
//            case error.PERMISSION_DENIED:
//            case error.POSITION_UNAVAILABLE:
//            case error.TIMEOUT:
//            case error.UNKNOWN_ERROR:
//                errorcode = 1;
//                break;
//        }
//    };
    return {
        getLbs: getLbs
    }
})();