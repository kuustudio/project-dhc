(function($){
    var search_from = 0;
    var _render_district = function(city_id){
        $.post(Url.get_districts,{city_id:city_id},function(d){
            if(d.status == 'true'){
                var li_html = '';
                $.each(d.data.districts,function(i,n){
                    li_html += '<li date-district-id="' + n.district_id + '" date-district-latlon="' + n.long_lat + '">' + n.district_name + '</li>'
                });
                $('.select-store-area .list ul').empty();
                $('.select-store-area .list ul').html(li_html);
            }
        },'json')
    };

    /*
    var _render_map = function(){
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false";
        document.head.appendChild(script);

        if (script.readyState){
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    _init_map();
                }
            };
       } else {
          script.onload = function(){
              _init_map();
          };
       }
    };

    */

    var _render_map = function(){
        center_latlon = $('.form').find('#district_latlon').val() || latlon;
        center_latlon_arr = center_latlon.split(',')
        center_point = new google.maps.LatLng(center_latlon_arr[0],center_latlon_arr[1]);
        map = new google.maps.Map($('.map')[0],{
            zoom: 15,
            center: center_point,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var marker = new google.maps.Marker({
            map: map,
            position: center_point,
            draggable: true,
        });
        google.maps.event.addListener(marker, 'position_changed', function() {
            new_postion = marker.getPosition();
            map.setCenter(new_postion);
            $('.form').find('#district_latlon').val(new_postion.lat() + ',' + new_postion.lng());
        });
    };

    if(city_id == '0' || city_name == ''){
        $.getJSON(Url.get_city,function(d){
            if(d.status == 'true'){
                $('.hd i a').text(d.data.city_name);
                _render_district(d.data.city_id);
            }else{
                location.href=Url.select_city;
            }
        })
    }else{
        _render_district(city_id);
    };

    $('.bd').on('click','.select-store-category .select-btn',function(e){
        $('.select-store-category .list').slideDown('slow');
        $('.select-store-category').css('height','auto');
    }).on('click','.select-store-category ul li',function(e){
        $(this).closest('.form').find('#store_type').val($(this).data('store-category-id'));
        $('.select-store-category .list').slideUp('slow');
        $('.select-store-category .text').text($(this).text());
    }).on('click','.select-store-area .select-btn',function(e){
        $('.select-store-area .list').slideDown('slow');
        $('.select-store-area').css('height','auto');
    }).on('click','.select-store-area ul li',function(e){
        $(this).closest('.form').find('#district_id').val($(this).data('district-id'));
        $(this).closest('.form').find('#district_latlon').val($(this).data('district-latlon'));
        console.log($(this).closest('.form').find('#district_latlon').val())
        $('.select-store-area .list').slideUp('slow');
        $('.select-store-area .text').text($(this).text());
        $('.address-more').slideDown('slow');
    }).on('click','.search-perimeter-area',function(e){
        if(search_from){
            if(latlon == ''){
                //无法定位
            }else{
                $.post(Url.get_places,{latlon:latlon,distance:$('.search-key input').val()},function(d){
                    console.log(d);
                },'json');
            }
        }else{
            
        }
        $('.search-area-result').slideDown('slow');
    }).on('click','.search-area-bar .select-btn',function(e){
        _render_map();
        $('.search-area-bar .map').slideDown('slow');
        $('.search-area-bar').css('height','auto');
    }).on('click','.search-area-bar ul li',function(e){
        if($(this).hasClass('from-lbs')){
            search_from = 1;
        }
        $('.search-area-bar .map').slideUp('slow');
        $('.search-area-bar .text').text($(this).text());
    })
})(jQuery);