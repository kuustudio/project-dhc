define(function(require, exports, module){
    require('default.table');
    (function(){
        $('.list-header .category_name').width(window.innerWidth-108);
        $('.operate-list li').on('click',function(){
            alert(1111111111);
            action = $(this).attr('action');
            $('#store-category-form').attr('action',action);
            $('#store-category-form').submit();
        });
    })();
});