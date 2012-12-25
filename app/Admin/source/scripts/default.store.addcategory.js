define(function(require, exports, module){
    require('default.table');
    var validate = function(){
		if($('.category-store-name').val() == ''){
			alert('请输入商铺分类名称');
			return false;
		}
		return true;
	};
	do_submit = function(){
		if(validate()){
			$('#add-store-category').submit();
		}
	};
});