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
    
    //已经改变
    var _single_validate = function(element,closest){
        var f = closest?$(element).closest(closest):$(element),
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
                    f.after('<div class="error"><i></i>该字段不正确</div>');
                }else{
                    f.after('<div class="error"><i></i>'+m[i]+'</div>');
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

    $('.bd').on('click','.dish-head .btn',function(e){
        $('.dishlist-form').show();
        $('.dishlist-form').find('.category-name').focus();
    }).on('click','.btn-cancel-dishlist',function(e){
        $('.btn-create-dishlist').removeClass('btn-disabled').attr('disabled',false).text('保存，开始创建系列');
        $('.dishlist-form').find('.category-name').val('').end().find('.error').remove().end().hide();
    }).on('click','.btn-create-dishlist',function(e){
        var _this = $(this);
        if(_single_validate('.dishlist-form .category-name')){
            _this.addClass('btn-disabled').attr('disabled',true).text(_this.data('disable-with'));
            $.post(Url.add_dish_category,{category_name:$(this).closest('.dishlist-form').find('.category-name').val()},function(d){
                console.log(d);
                if(d.status == 'true'){
                    _this.addClass('btn-success');
                    _this.text('注册成功 ^_^');
                    _this.closest('.dishlist-form').find('.btn-cancel-dishlist').click();
                }else{
                    _this.removeClass('btn-disabled').addClass('btn-fail').attr('disabled',false).text('失败了，继续创建吗？ ~_~')
                }
            },'json');
        }
        return false;
    }).on('click','.btn-new-dish',function(){
        $(this).closest('.new-dish').hide();
        $(this).closest('.dish-new-wrap').find('.dish-form').show().find('.dish-name').focus();
    }).on('click','.btn-cancel-dish',function(){
        $(this).closest('.dish-form').find('.dish-name').val('').end().find('.dish-price').val('').end().hide();
        $(this).closest('.dish-new-wrap').find('.new-dish').show();
    })
})(jQuery);