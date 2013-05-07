(function($){
    var search_from = 0;
    var _render_district = function(city_id){
        $.post(Url.get_districts,{city_id:city_id},function(d){
            if(d.status == 'true'){
                var li_html = '';
                $.each(d.data.districts,function(i,n){
                    li_html += '<li date-district-id="'+ n.district_id +'">'+ n.district_name +'</li>'
                });
                $('.select-store-area .list ul').empty();
                $('.select-store-area .list ul').html(li_html);
            }
        },'json')
    }
    if($.cookie('districts') == undefined){
        if($.cookie('city_id') == undefined || $.cookie('city_name') == undefined){
            $.getJSON(Url.get_city,function(d){
                if(d.status == 'true'){
                    $('.hd i a').text(d.data.city_name);
                    _render_district(d.data.city_id);
                }else{
                    location.href=Url.select_city;
                }
            })
        }else{
            _render_district($.cookie('city_id'));
        }
    };
    $('.bd').on('click','.select-store-category .select-btn',function(e){
        $('.select-store-category .list').slideDown('slow');
        $('.select-store-category').css('height','auto');
    }).on('click','.select-store-category ul li',function(e){
        $('.select-store-category .list').slideUp('slow');
        $('.select-store-category .text').text($(this).text());
    }).on('click','.select-store-area .select-btn',function(e){
        $('.select-store-area .list').slideDown('slow');
        $('.select-store-area').css('height','auto');
    }).on('click','.select-store-area ul li',function(e){
        $('.select-store-area .list').slideUp('slow');
        $('.select-store-area .text').text($(this).text());
        $('.address-more').slideDown('slow');
    }).on('click','.search-perimeter-area',function(e){
        if(search_from){
            if($.cookie('latlon') == undefined){
                //无法定位
            }else{
                $.post(Url.get_places,{latlon:$.cookie('latlon'),distance:$('.search-key input').val()},function(d){
                    console.log(d);
                },'json');
            }
        }else{
            
        }
        $('.search-area-result').slideDown('slow');
    }).on('click','.search-area-bar .select-btn',function(e){
        $('.search-area-bar .list').slideDown('slow');
        $('.search-area-bar').css('height','auto');
    }).on('click','.search-area-bar ul li',function(e){
        if($(this).hasClass('from-lbs')){
            search_from = 1;
        }
        $('.search-area-bar .list').slideUp('slow');
        $('.search-area-bar .text').text($(this).text());
    })
})(jQuery);