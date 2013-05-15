(function($){

    /*
    * 验证性的代码 start
    *
    */

    /*字符串字节数获取*/
    String.prototype.getBytes = function() {var cArr = this.match(/[^\x00-\xff]/ig);return this.length + (cArr == null ? 0 : cArr.length);}

    var places_cache = [];

    var required = function(v){
        return v==''?false:true;
    }

    var number = function(v){
        return (/^\d+$/).test(v);
    }

    var email = function(v){
        return (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]+$/).test(v);
    }

    var length = function(v,a){
        if(a.indexOf(',') != -1){
            ar = a.split(',');
            return v.getBytes() >= ar[0] && v.getBytes() <= ar[1];
        }else{
            return v.getBytes() >= a;
        }
    }

    var registered = function(v){
        var r = true;
        $.ajax({
            url:Url.registered,
            type:'post',
            dataType:'json',
            data:{email:v},
            async:false,
            success:function(d){
                if(d.status == 'false') r = false;
            }
        });
        return r;
    }

    var phone = function(v){
        return (/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[34568][0-9]{9}$)/).test(v);
    }

    var _single_validate = function(element){
        var f = $(element).closest('.form-item'),
            op = $(element).data('validate').split(';'),
            v = $(element).val(),
            m = $(element).data('validate-msg').split(';'),
            r = true;
        f.find('.error').remove();
        $.each(op,function(i,n){
            if(n.indexOf(':') != -1){
                var nt = n.split(':');
                var nr = eval(nt[0]+'("'+v+'","'+nt[1]+'")');
            }else{
                var nr = eval(n+'("'+v+'")');
            }
            if(!nr){
                if(m[i] == undefined){
                    f.append('<div class="error"><i></i>该字段不正确</div>');
                }else{
                    f.append('<div class="error"><i></i>'+m[i]+'</div>');
                }
                r = r&&nr;
                return false;
            }
        });
        return r;
    }

    /*
    * 验证性的代码 end
    *
    */

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
        $(this).closest('.form-item').find('.error').remove();
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
        $(this).closest('.form-item').find('.error').remove();
    }).on('click','.search-perimeter-area',function(e){
        $('.search-area-bar .map').hide();
        $('.search-area-result').hide();
        if(!_single_validate('.search-key input')) return false;
        search_latlon = $(this).closest('.form').find('#custom_latlon').val();
        if(search_latlon){
            $('.search-area-result .result-list').empty();
            _add_loading('.result-list','0','^_^ 数据查询中...');
            $.post(Url.get_places,{latlon:search_latlon,distance:$('.search-key input').val()},function(d){
                if(d.status == 'true'){
                    places = _place_serialize_and_input(d.data.places);
                    _render_place(places);
                }else{
                    _del_loading('.result-list');
                    $('.search-area-result .result-list').html($('#custom_places').data('validate-msg'));
                }
            },'json');
        }else{
            $('.search-area-result .result-list').html($('#custom_latlon').data('validate-msg'));
        }
        $('.search-area-result').show();
        $('.search-area-bar').toggleClass('hover');
    }).on('click','.search-area-bar .select-btn',function(e){
        $('.search-area-bar .map').show();
        _add_loading('.search-area-bar .map','117px','^_^ 地图加载中...');
        _render_map();
        $('.search-area-bar').toggleClass('hover');
        $(this).closest('.form-item').find('.error').remove();
    }).on('click','.result-list .s-place span',function(e){
        $(this).toggleClass('checked');
        _toggle_places_cache($(this).data('place-id'));
    }).on('click','#btn-signup',function(){
        var r = true,
            post_ob = {}
            _this = $(this);
        $.each(['store_name','email','password','store_type','store_phone','store_contacts','district_id','store_address_more','custom_latlon','store_info'],function(i,n){
            post_ob[n] = $('[name="'+n+'"]').val();
            nr = _single_validate('[name="'+n+'"]');
            r = r&&nr;
        });
        post_ob['store_qq'] = $('[name="store_qq"]').val();
        post_ob['custom_places'] = $('[name="custom_places"]').val();
        if(r){
            _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
            $.post(Url.reg,post_ob,function(d){
                if(d.status == 'true'){
                    _this.addClass('btn-success');
                    _this.text('注册成功 ^_^');
                    location.href=Url.home;
                }else{
                    _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('注册失败了，继续注册吗？ ~_~')
                }
            },'json');
        }
        return false;
    }).on('focusout','.form input,.form textarea',function(){
        _single_validate($(this));
    })
})(jQuery);