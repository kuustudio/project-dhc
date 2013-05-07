var wsd = window.screen.width;
var wsh = window.screen.height;
if(window.scrollY==0){ 
    window.scrollTo(0, 1);
}
Lbs.getLbs(
    function(p){
        var latlon = p.coords.latitude + ',' + p.coords.longitude;
        document.cookie = 'latlon=' + escape(latlon) + ';path=/';
    },function(e){}
);