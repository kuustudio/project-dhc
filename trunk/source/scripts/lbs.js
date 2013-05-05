var Lbs = (function(){
    var hasLbs = !!(navigator.geolocation);
    var latlon = null;
    var errorcode = 0;
    var doGeo = function(){
        if(hasLbs){
            navigator.geolocation.getCurrentPosition(showPosition,showError,{enableHighAccuracy:false,timeout:30000,maximumAge:30000});
        }else{
            errorcode = 1;
        }
    };
    var showPosition = function(position){
        latlon = position.coords.latitude + ',' + position.coords.longitude;
    };
    var showError = function(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
            case error.POSITION_UNAVAILABLE:
            case error.TIMEOUT:
            case error.UNKNOWN_ERROR:
                errorcode = 1;
                break;
        }
    };
    return {
        doGeo:doGeo,
        getLbs: function(){
            return {errorcode:errorcode,latlon:latlon};
        }
    }
})();