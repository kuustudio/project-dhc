define(function(require, exports, module){
    require('default.table');
    (function(){
        $('.list-header .info').width(window.innerWidth-898);
        $('.data-table-list select').on('change',function(){
            location.href = get_table_url+'?table_name='+$(this).val();
        });
    })();
});