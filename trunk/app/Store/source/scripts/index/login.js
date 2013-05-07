(function($){
    if($.cookie('city_id') == undefined || $.cookie('city_name') == undefined){
        $.getJSON(Url.get_city,function(d){
            if(d.status == 'true'){
                $('.hd i a').text(d.data.city_name);
            }else{
                location.href=Url.select_city;
            }
        })
    }
})(jQuery);