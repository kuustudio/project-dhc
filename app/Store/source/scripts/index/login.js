(function($){
    $.getJSON(Url.get_city,function(d){
        if(d.status == 'true'){
            console.log(d.data.city_name);
        }
    })
})(jQuery);