(function($){
    var places_cache = [];

    var required = function(v){
        if(v=='') return false;
    }

    var number = function(v){
        return (/^\d+$/).test(v);
    }

    var _single_validate = function(element){
        var op = $(element).data('validate'),
            v = $(element).val(),
            m = $(element).data('validate-msg'),
            r = true;
        $.each(op.split(';'),function(i,n){
            r = r && n(v);
        });
        return r;
    }

    var _render_district = function(city_id){
        $.post(Url.get_districts,{city_id:city_id},function(d){
            if(d.status == 'true'){
                var li_html = '';
                $.each(d.data.districts,function(i,n){
                    li_html += '<li data-district-id="' + n.district_id + '" data-district-latlon="' + n.long_lat + '">' + n.district_name + '</li>'
                });
                $('.select-store-area .list ul').empty();
                $('.select-store-area .list ul').html(li_html);
            }
        },'json')
    };

    var _toggle_places_cache = function(value){
        var i = false;
        $.each(places_cache,function(j,n){
            if(value==n){
                places_cache.splice(j,1);
                i = true;
            }
        });
        if(!i){
            places_cache.push(value);
        }
        $('.form').find('#custom_places').val(places_cache.join(","));
    }

    var _place_serialize_and_input = function(places){
        place_container = {};
        $.each(places,function(i,n){
            places_cache.push(n.place_id);
            d1_k = 'district_' + n.district_id;
            if(place_container[d1_k] == undefined){
                place_by_district = {};
                place_by_district.distance = {};
                place_by_district.count = 0;
            }else{
                place_by_district = place_container[d1_k];
            }
            place_by_district.district_name = n.district_name;
            place_by_district.count++;
            d2_k = 'd_' + (parseInt(n.distance) + 1);
            if(place_by_district.distance[d2_k] == undefined){
                place_by_district.distance[d2_k] = {};
                place_by_district.distance[d2_k].place = [];
            }
            place_in = {}
            place_in.place_id = n.place_id;
            place_in.place_name = n.place_name;
            place_by_district.distance[d2_k].distance_name = parseInt(n.distance) + 1;
            place_by_district.distance[d2_k].place.push(place_in);
            place_container[d1_k] = place_by_district;
        });
        $('.form').find('#custom_places').val(places_cache.join(","));
        return place_container;
    };

    var _render_place = function(places){
        p_h = '<table cellpadding="0" cellspacing="0"><tbody>';
        $.each(places,function(i,n){
            var l = 1;
            $.each(n.distance,function(j,m){
                p_h += '<tr>';
                p_h += l==1?'<td class="s-district" rowspan="'+n.count+'"><div>'+n.district_name+'</div></td>':'';
                p_h += '<td class="s-distance">'+m.distance_name+'公里</td>';
                p_h += '<td class="s-place"><div>';
                $.each(m.place,function(k,o){
                    p_h += '<span class="checked" data-place-id='+o.place_id+'>'+o.place_name+'<i>x</i></span>';
                });
                p_h += '</div></td>';
                p_h += '</tr>';
                l++;
            });
            p_h += '<tr><td colspan="3"><div class="line">'+n.district_name+'</div></td></tr>';
        });
        p_h += '</tbody></table>';
        _del_loading('.search-area-result .result-list');
        $('.search-area-result .result-list').append(p_h);
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
    
    //生成地图
    var _render_map = function(){
        center_latlon = custom_latlon || latlon || $('.form').find('#district_latlon').val();
        center_latlon_arr = center_latlon.split(',')
        center_point = new google.maps.LatLng(center_latlon_arr[0],center_latlon_arr[1]);
        map = new google.maps.Map($('.map')[0],{
            zoom: 15,
            center: center_point,
            mapTypeControl: false,
            streetViewControl: false,
            overviewMapControl: true,
            ZoomControlStyle: {position:google.maps.ControlPosition.LEFT_TOP,style:google.maps.ZoomControlStyle.SMALL},
            zoomControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var marker = new google.maps.Marker({
            map: map,
            position: center_point,
            draggable: true,
        });

        google.maps.event.addListener(map, 'bounds_changed', function() {
            new_postion = map.getCenter();
            marker.setPosition(new_postion);
            $('.form').find('#custom_latlon').val(new_postion.lat() + ',' + new_postion.lng());
        });

        google.maps.event.addListener(marker, 'position_changed', function() {
            new_postion = marker.getPosition();
            map.setCenter(new_postion);
            $('.form').find('#custom_latlon').val(new_postion.lat() + ',' + new_postion.lng());
        });
    };

    var _add_loading = function(d,t,text){
        $(d).append('<div class="loading" style="margin-top:'+t+'"><i></i>'+text+'</div>');
    }

    var _del_loading = function(d){
        $(d).find('.loading').remove();
    }
    
    //生成区域列表
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
        $('.select-store-category .list').show();
        $('.select-store-category').toggleClass('hover');
    }).on('click','.select-store-category ul li',function(e){
        $(this).closest('.form').find('#store_type').val($(this).data('store-category-id'));
        $('.select-store-category .list').hide();
        $('.select-store-category').toggleClass('hover');
        $('.select-store-category .text').text($(this).text());
    }).on('click','.select-store-area .select-btn',function(e){
        $('.select-store-area .list').show();
        $('.select-store-area').toggleClass('hover');
    }).on('click','.select-store-area ul li',function(e){
        $(this).closest('.form').find('#district_id').val($(this).data('district-id'));
        $(this).closest('.form').find('#district_latlon').val($(this).data('district-latlon'));
        $('.select-store-area .list').hide();
        $('.select-store-area').toggleClass('hover');
        $('.select-store-area .text').text($(this).text());
        $('.address-more').show();
    }).on('click','.search-perimeter-area',function(e){
        $('.search-area-bar .map').hide();
        if(!_single_validate('.search-key input')) return false;
        search_latlon = custom_latlon || $(this).closest('.form').find('#custom_latlon').val() || latlon || $(this).closest('.form').find('#district_latlon').val();
        if(search_latlon && _single_validate('.search-key input')){
            $('.search-area-result .result-list').empty();
            _add_loading('.result-list','0','^_^ 数据查询中...');
            $.post(Url.get_places,{latlon:search_latlon,distance:$('.search-key input').val()},function(d){
                if(d.status == 'true'){
                    places = _place_serialize_and_input(d.data.places);
                    _render_place(places);
                }else{
                    
                }
            },'json');
        }else{
            //请选择中心点
        }
        $('.search-area-result').show();
        $('.search-area-bar').toggleClass('hover');
    }).on('click','.search-area-bar .select-btn',function(e){
        $('.search-area-bar .map').show();
        _add_loading('.search-area-bar .map','117px','^_^ 地图加载中...');
        _render_map();
        $('.search-area-bar').toggleClass('hover');
    }).on('click','.result-list .s-place span',function(e){
        $(this).toggleClass('checked');
        _toggle_places_cache($(this).data('place-id'));
    }).on('submit','.form',function(){
        console.log(111111111);
    })
})(Monk);