(function($){
    
    /*
    * 验证性的代码 start
    *
    */

    /*字符串字节数获取*/
    String.prototype.getBytes = function() {var cArr = this.match(/[^\x00-\xff]/ig);return this.length + (cArr == null ? 0 : cArr.length);}

    var required = function(v){
        return v==''?false:true;
    }

    var length = function(v,a){
        if(a.indexOf(',') != -1){
            ar = a.split(',');
            return v.getBytes() >= ar[0] && v.getBytes() <= ar[1];
        }else{
            return v.getBytes() >= a;
        }
    }

    var _render_error = function(f,m){
        f.find('.error').remove();
        m=undefined?f.append('<div class="error"><i></i>该字段不正确</div>'):f.append('<div class="error"><i></i>'+m+'</div>');
    }

    var _single_validate = function(element){
        var f = $(element).closest('.form-item'),
            op = $(element).data('validate').split(';'),
            v = $(element).val(),
            m = $(element).data('validate-msg').split(';'),
            r = true;
        
        $.each(op,function(i,n){
            if(n.indexOf(':') != -1){
                var nt = n.split(':');
                var nr = eval(nt[0]+'("'+v+'","'+nt[1]+'")');
            }else{
                var nr = eval(n+'("'+v+'")');
            }
            if(!nr){
                _render_error(f,m[i]);
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

    var  _format_template = function(tmpl,data){
        return $.trim(tmpl.replace(/\{([\w\.]*)\}/g, function (str, key) {
            var keys = key.split("."), value = data[keys.shift()];
            while(keys.length>0&&value)
                value=value[keys.shift()];
            return (value === null || value === undefined) ? "" : value;
        }));
    }

    /*
    * 文件上传相关
    */

    var size = function(t,f,s,m){
        if(f['size']>s){
            _render_error(t.closest('.form-item'),m);
            return false;
        }
        return true;
    }
    
    var ext = function(t,f,e,m){
        if($.inArray(f['type'],e.split(','))=='-1'){
            _render_error(t.closest('.form-item'),m);
            return false;
        }
        return true;
    }

    var filename = function(t,f,m){
        if(f['name'].indexOf("%") > -1){
            _render_error(t.closest('.form-item'),m);
            return false;
        }
        return true;
    }

    $('.bd').on('click','.menu-o2o',function(){
        //菜单上下线
        var _this = $(this),
            to_online = _this.data('to-online');
        $.post(Url.push_online,{is_online:to_online},function(d){
            if(d.status == 'true'){
                _this.hide();
                if(to_online){
                    _this.closest('.menu-header').find('.online').show();
                    $('.bd').append('<div class="shade"></div>');
                    $('.shade').height($('.bd').height());
                }else{
                    _this.closest('.menu-header').find('.offline').show();
                    $('.shade').remove();
                }
            }
        },'json');
    }).on('click','.dish-head .btn',function(e){
        //点击创建系列
        $('.dishlist-form.create').show();
        $('.dishlist-form.create').find('.category-name').focus();
    }).on('click','.dishlist-form.create .btn-cancel-dishlist',function(e){
        //点击取消创建系列
        $('.btn-create-dishlist').removeClass('btn-disabled').attr('disabled',false).text('保存，开始创建系列');
        $('.dishlist-form.create').find('.category-name').val('').end().find('.error').remove().end().find('.btn-create-dishlist').removeClass('btn-success').end().hide();
    }).on('click','.btn-create-dishlist',function(e){
        //提交创建系列
        var h,_this = $(this),d_f_c = _this.closest('.dishlist-form.create'), category_name = d_f_c.find('.category-name').val();
        if(_single_validate(d_f_c.find('.category-name'))){
            _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
            $.post(_this.closest('form').attr('action'),{category_name:category_name},function(d){
                if(d.status == 'true'){
                    _this.addClass('btn-success');
                    _this.text('创建成功 ^_^');
                    d_f_c.find('.btn-cancel-dishlist').click();
                    h = _format_template($('#tpl-dishlist').html(),{category_id:d.data.category_id,category_name:category_name});
                    $('.dishlists').prepend(h);
                    $('.dishlists .dishlist').first().find('.btn-new-dish').click();
                }else{
                    _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('失败了，继续创建吗？ ~_~')
                }
            },'json');
        }
        return false;
    }).on('click','.edit-dishlist',function(){
        //点击编辑系列
        var t = $(this).closest('.title'),
            h = _format_template($('#tpl-update-dishlist-form').html(),{category_name:t.find('h4').text()});
        t.after(h);
        t.hide();
    }).on('click','.dishlist-form.edit .btn-cancel-dishlist',function(e){
        //点击取消编辑系列
        var d_f = $(this).closest('.dishlist-form.edit');
        d_f.closest('.dishlist').find('.title').show();
        d_f.remove();
    }).on('click','.btn-update-dishlist',function(){
        //提交编辑系列
        var _this = $(this),
            t = _this.closest('.dishlist'),
            category_id = t.data('category-id'),
            c = t.find('.dishlist-form.edit .category-name'),
            category_name = c.val();
        if(_single_validate(c)){
            _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
            $.post(_this.closest('form').attr('action'),{category_id:category_id,category_name:category_name},function(d){
                if(d.status == 'true'){
                    _this.addClass('btn-success');
                    _this.text('编辑成功 ^_^');
                    t.find('.title h4').text(category_name);
                    _this.closest('.dishlist-form.edit').remove();
                    t.find('.title').show();
                }else{
                    _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('失败了，继续编辑吗？ ~_~')
                }
            },'json');
        }
        return false;
    }).on('click','.delete-dishlist',function(){
        //删除系列
        var t = $(this).closest('.title'),
            i = $(this).closest('.inner-tip');
        if(!i.data('has-tip')){
            i.data('has-tip',1);
            var h = _format_template($('#tpl-dishlist-delete-form').html(),{msg:'该系列的菜品也将删除',key:'btn-delete-dishlist',left:t.find('h4').width()+50});
            t.after(h);
        }
    }).on('click','.dishlist .inner-tip .btn-x',function(e){
        //取消删除系列
        var i = $(this).closest('.inner-tip');
        i.remove();
        i.data('has-tip',0);
    }).on('click','.inner-tip .btn-delete-dishlist',function(e){
        //确定删除系列
        var _this = $(this),
            t = _this.closest('.dishlist'),
            category_id = t.data('category-id');
        _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
        $.post(_this.closest('form').attr('action'),{category_id:category_id},function(d){
            if(d.status == 'true'){
                t.remove();
            }else{
                _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('失败了')
            }
        },'json');
        return false;
    }).on('click','.btn-new-dish',function(){
        //点击添加菜品
        $(this).closest('.new-dish').hide();
        $(this).closest('.dish-new-wrap').find('.dish-form').show().find('.dish-name').focus();
    }).on('click','.btn-cancel-dish',function(){
        //点击取消添加菜品
        $(this).closest('.dish-form').find('.dish-name').val('').end().find('.dish-price').val('').end().hide();
        $(this).closest('.dish-new-wrap').find('.new-dish').show();
    }).on('click','.btn-create-dish',function(e){
        //提交创建菜品
        var _this = $(this),
            list = _this.closest('.dishlist'),
            form = _this.closest('.form'),
            category_id = list.data('category-id'),
            dish_name = form.find('.dish-name').val(),
            dish_price = form.find('.dish-price').val();
        if(_single_validate(form.find('.dish-name')) && _single_validate(form.find('.dish-price'))){
            _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
            $.post(form.attr('action'),{category_id:category_id,dish_name:dish_name,dish_price:dish_price},function(d){
                if(d.status == 'true'){
                    _this.addClass('btn-success');
                    _this.text('添加成功 ^_^');
                    form.find('.btn-cancel-dish').click();
                    form.find('.dish-name').val('').end().find('.dish-price').val('');
                    _this.removeClass('btn-disabled').removeClass('btn-success').attr('disabled',false).text('保存，继续添加');
                    var h = _format_template($('#tpl-dish').html(),{dish_id:d.data.dish_id,dish_name:d.data.dish_name,dish_price:d.data.dish_price});
                    list.find('.dishs').append(h);
                    list.find('.btn-new-dish').click();
                }else{
                    _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('失败了，继续添加吗？ ~_~')
                }
            },'json');
        }
        return false;
    }).on('click','.dish .edit-dish',function(e){
        //点击编辑菜品
        var d = $(this).closest('.dish'),h = _format_template($('#tpl-dish-update-form').html(),{dish_name:d.find('.dish-wrap .dish-content').text(),dish_price:d.find('.dish-wrap em').text()});
        d.find('.dish-wrap').hide().end().find('.actions').hide().end().append(h);
    }).on('click','.dish-form.edit .btn-cancel-dish',function(){
        //点击取消编辑菜品
        var d_f = $(this).closest('.dish-form.edit');
        d_f.closest('.dish').find('.dish-wrap').show().end().find('.actions').show();
        d_f.remove();
    }).on('click','.dish-form.edit .btn-update-dish',function(e){
        //提交编辑菜品
        var _this = $(this),
            list = _this.closest('.dishlist'),
            dish = _this.closest('.dish'),
            form = _this.closest('.form'),
            dish_id = dish.data('dish-id'),
            category_id = list.data('category-id'),
            dish_name = form.find('.dish-name').val(),
            dish_price = form.find('.dish-price').val();
        if(_single_validate(form.find('.dish-name')) && _single_validate(form.find('.dish-price'))){
            _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
            $.post(form.attr('action'),{dish_id:dish_id,category_id:category_id,dish_name:dish_name,dish_price:dish_price},function(d){
                if(d.status == 'true'){
                    dish.find('.dish-wrap .dish-content').text(dish_name);
                    dish.find('.dish-wrap em').text(dish_price);
                    form.find('.btn-cancel-dish').click();
                }else{
                    _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('失败了，继续添加吗？ ~_~')
                }
            },'json');
        }
        return false;
    }).on('click','.dish .delete-dish',function(e){
        //删除菜品
        var _this = $(this),
            dish = _this.closest('.dish'),
            dish_id = dish.data('dish-id');
        _this.removeClass('delete-dish').text(_this.data('disable-with'));
        $.post(Url.delete_dish,{dish_id:dish_id},function(d){
            if(d.status == 'true'){
                dish.remove();
            }else{
                _this.addClass('delete-dish').addClass('btn-fail').text('删');
            }
        },'json');
        return false;
    }).on('click','.dish .push-dish',function(e){
        //菜品上下架
        var _this = $(this),
            dish = _this.closest('.dish'),
            dish_id = dish.data('dish-id'),
            dish_push = _this.data('dish-push');
        _this.removeClass('push-dish').text(_this.data('disable-with'));
        $.post(Url.push_dish,{dish_id:dish_id,dish_push:dish_push},function(d){
            if(d.status == 'true'){
                if(dish_push==1){
                    _this.data('dish-push','0');
                    _this.addClass('push-dish').removeClass('btn-fail').removeClass('on').text('上架');
                }else{
                    _this.data('dish-push','1');
                    _this.addClass('push-dish').removeClass('btn-fail').addClass('on').text('下架');
                }
            }else{
                _this.addClass('push-dish').addClass('btn-fail');
            }
        },'json');
        return false;
    }).on('click','.dish .dish-img',function(e){
        //图
        var dish = $(this).closest('.dish'),
            dish_id = dish.data('dish-id'),
            img_div = dish.find('.dish-img'),
            dish_img = img_div.data('dish-img');
        if(!dish.data('has-img-d')){
            if(dish.data('has-info-d')){
                dish.find('.inner-dialog').remove();
                dish.data('has-info-d',0);
            }
            var h = _format_template($('#tpl-dish-img-upload-form').html(),{});
            dish.append(h);
            if(img_div.data('dish-img')==''){
                dish.find('.form-item.delete-dish-img').hide();
            }else{
                $('<img>',{src:'/Store/source/uploads/dish/'+dish_id+'/'+dish_img}).appendTo(dish.find('.img-placeholder'));
            }
            dish.data('has-img-d',1);
        }
    }).on('click','.dish .inner-dialog.img i',function(e){
        //取消图
        var dish = $(this).closest('.dish');
        dish.find('.inner-dialog').remove();
        dish.data('has-img-d',0);
    }).on('change','.dish .upload-file',function(e){
        //点击编辑图
        var _this = $(this)
            f = _this[0].files[0],
            dish = _this.closest('.dish'),
            dish_id = dish.data('dish-id'),
            img_div = dish.find('.dish-img'),
            dish_img = img_div.data('dish-img'),
            img_placeholder = dish.find('.img-placeholder');
        if(filename($(this),f,'文件名中不能包含“%” ~_~') && ext($(this),f,'image/jpeg,image/gif,image/png','图片格式不符合哦 ~_~') && size($(this),f,'30720','图片尺寸太大了哦 ~_~')){
            var e = new FormData;
            e.append("upload_file", f);
            e.append("dish_id", dish_id);
            e.append("dish_img", dish_img);
            $.ajax({  
                url:Url.edit_dish_img,
                type:'post',
                processData:false,
                contentType:false,
                headers:{"X-File-Name":encodeURIComponent(f.name)},
                dataType:'json',
                data:e,
                success:function(d){
                    if(d.status == 'true'){
                        img_placeholder.empty();
                        dish.find('.form-item.delete-dish-img').show();
                        img_div.data('dish-img',d.data.dish_img);
                        img_div.addClass('on');
                        $('<img>',{src:'/Store/source/uploads/dish/'+dish_id+'/'+d.data.dish_img}).appendTo(dish.find('.img-placeholder'));
                    }else{
                        _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('失败了，继续保存吗？ ~_~')
                    }
                }
            });
        }
    }).on('click','.dish .btn-delete-dish-img',function(e){
        //删除图
        var _this = $(this),
            dish = _this.closest('.dish'),
            img_div = dish.find('.dish-img'),
            dialog = _this.closest('.inner-dialog.img'),
            dish_id = dish.data('dish-id');
        _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
        $.post(Url.delete_dish_img,{dish_id:dish_id,dish_img:img_div.data('dish-img')},function(d){
            if(d.status == 'true'){
                img_div.data('dish-img','');
                img_div.removeClass('on');
                dialog.remove();
                dish.data('has-img-d',0);
            }else{
                _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('清除图片');
            }
        },'json');
        return false;
    }).on('click','.dish .dish-info',function(e){
        //文
        var dish = $(this).closest('.dish');
        if(!dish.data('has-info-d')){
            if(dish.data('has-img-d')){
                dish.find('.inner-dialog').remove();
                dish.data('has-img-d',0);
            }
            var h = _format_template($('#tpl-update-dish-info-form').html(),{info:$(this).data('dish-info')});
            dish.append(h);
            dish.data('has-info-d',1);
        }
    }).on('click','.dish .inner-dialog.info i',function(e){
        //取消文
        var dish = $(this).closest('.dish');
        dish.find('.inner-dialog').remove();
        dish.data('has-info-d',0);
    }).on('click','.dish .btn-update-dish-info',function(e){
        //点击编辑文
        var _this = $(this),
            dish = _this.closest('.dish'),
            form = _this.closest('.form'),
            info_div = dish.find('.dish-info'),
            dialog = _this.closest('.inner-dialog.info'),
            dish_id = dish.data('dish-id'),
            dish_info = form.find('.dish-info-text').val();
        if(_single_validate(form.find('.dish-info-text'))){
            _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
            $.post(form.attr('action'),{dish_id:dish_id,dish_info:dish_info},function(d){
                if(d.status == 'true'){
                    info_div.data('dish-info',dish_info);
                    info_div.addClass('on');
                    dialog.remove();
                    dish.data('has-info-d',0);
                }else{
                    _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('失败了，继续保存吗？ ~_~')
                }
            },'json');
        }
        return false;
    }).on('click','.dish .btn-delete-dish-info',function(e){
        //删除文
        var _this = $(this),
            dish = _this.closest('.dish'),
            info_div = dish.find('.dish-info'),
            dialog = _this.closest('.inner-dialog.info'),
            dish_id = dish.data('dish-id');
        _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
        $.post(Url.delete_dish_info,{dish_id:dish_id},function(d){
            if(d.status == 'true'){
                info_div.data('dish-info','');
                info_div.removeClass('on');
                dialog.remove();
                dish.data('has-info-d',0);
            }else{
                _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('删除');
            }
        },'json');
        return false;
    })
})(jQuery);