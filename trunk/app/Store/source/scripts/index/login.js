(function($){
    if(city_id == '0' || city_name == ''){
        $.getJSON(Url.get_city,function(d){
            if(d.status == 'true'){
                $('.hd i a').text(d.data.city_name);
            }else{
                location.href=Url.select_city;
            }
        })
    }
})(jQuery);