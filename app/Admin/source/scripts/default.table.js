define(function(require, exports, module){
    require('jquery');
    (function(){
        $('.bar-header .reload').on('click',function(){
            location.reload();
        });
        $('.list tr').hover(
            function(){
                $(this).addClass('hover');
            },
            function(){
                $(this).removeClass('hover');
            }
        );
		$('.list .value button.submit').on('click',function(){
			do_submit();
		});
        $('.list .value button.back').on('click',function(){
            history.go(-1);
        });
        $('.bar-footer .operate').toggle(function(){
            $('.bar-footer ul').show();
        },function(){
            $('.bar-footer ul').hide();
        });
    })();
});