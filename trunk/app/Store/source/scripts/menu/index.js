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

    var  _format_template = function(tmpl,data){
        return $.trim(tmpl.replace(/\{([\w\.]*)\}/g, function (str, key) {
            var keys = key.split("."), value = data[keys.shift()];
            while(keys.length>0&&value)
                value=value[keys.shift()];
            return (value === null || value === undefined) ? "" : value;
        }));
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
        var h,_this = $(this),category_name = $(this).closest('.dishlist-form.create').find('.category-name').val();
        if(_single_validate('.dishlist-form.create .category-name')){
            _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
            $.post(_this.closest('form').attr('action'),{category_name:category_name},function(d){
                if(d.status == 'true'){
                    _this.addClass('btn-success');
                    _this.text('创建成功 ^_^');
                    _this.closest('.dishlist-form.create').find('.btn-cancel-dishlist').click();
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
        //点击取消创建系列
        $('.btn-update-dishlist').removeClass('btn-disabled').attr('disabled',false).text('保存');
        $('.dishlist-form.edit').find('.error').remove().end().find('.btn-update-dishlist').removeClass('btn-success').end().hide();
        $(this).closest('.dishlist').find('.title').show();
    }).on('click','.btn-update-dishlist',function(){
        //提交编辑系列
        var _this = $(this),
            category_id = $(this).closest('.dishlist').data('category_id'),
            category_name = $(this).closest('.dishlist-form.edit').find('.category-name').val();
        if(_single_validate('.dishlist-form.edit .category-name')){
            _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
            $.post(_this.closest('form').attr('action'),{category_name:category_name},function(d){
                if(d.status == 'true'){
                    _this.addClass('btn-success');
                    _this.text('创建成功 ^_^');
                    _this.closest('.dishlist-form.create').find('.btn-cancel-dishlist').click();
                    h = _format_template($('#tpl-dishlist').html(),{category_id:d.data.category_id,category_name:category_name});
                    $('.dishlists').prepend(h);
                    $('.dishlists .dishlist').first().find('.btn-new-dish').click();
                }else{
                    _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('失败了，继续编辑吗？ ~_~')
                }
            },'json');
        }
        return false;
    }).on('click','.delete-dishlist',function(){
        //删除系列
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
    }).on('click','.edit-dish',function(e){
        //点击编辑菜品
    }).on('click','.btn-update-dish',function(e){
        //提交编辑菜品
    }).on('click','.delete-dish',function(e){
        //删除菜品
    }).on('click','.push-dish',function(e){
        //菜品上下架
    }).on('click','.dish-img',function(e){
        //图
    }).on('click','.btn-create-dish-img',function(e){
        //点击编辑图
    }).on('click','.dish-info',function(e){
        //文
    }).on('click','.btn-update-dish-info',function(e){
        //点击编辑文
    })
})(jQuery);