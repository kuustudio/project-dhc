<!--{@page layout="layout/base"}-->
<!--{content head}-->
<style type="text/css">
.list-header .checkbox{width:40px;}
.list-header .store-id{width:60px;}
.list-header .store-category{width:100px;}
.list-header .store-phone{width:120px;}
.list-header .operation{width:200px;}
</style>
<!--{/content}--> 
<!--{content body}-->
<div class="content">
    <div class="submenu">
        <a class="current">店铺列表</a>
        <a href="<?php echo DHC::_url('*/*/add'); ?>">添加店铺</a>
    </div>
    <div class="bar-header">供 2445 条记录 | <a href="javascript:;" class="reload">刷新本页</a></div>
    <div class="list">
        <table>
            <tr class="list-header">
                <td class="checkbox">多选</td>
                <td class="store-id">ID</td>
                <td class="store-category">分类</td>
                <td class="store-name text-left">店铺名</td>
                <td class="store-phone">联系方式</td>
                <td class="operation text-left">操作</td>
            </tr>
            <tr class="hr"><td colspan="6"><hr /></td></tr>
            <tr>
                <td><input type="checkbox" name="store_id" /></td>
                <td>ID</td>
                <td>分类</td>
                <td class="text-left">店铺名</td>
                <td>12345678901</td>
                <td class="text-left"><a href="<?php echo DHC::_url('*/*/edit',array('store_id'=>1111))?>">编辑</a></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="store_id" /></td>
                <td>ID</td>
                <td>分类</td>
                <td class="text-left">店铺名</td>
                <td>12345678901</td>
                <td class="text-left">操作</td>
            </tr>
        </table>
    </div>
    <div class="bar-footer">
        <button class="operate">操作▲</button>
        <div class="page-info">每页10条，共分4页</div>
        <div class="page-list">
            <a href="#">上一页</a>
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">下一页</a>
        </div>
    </div>
</div>
<script type="text/javascript">
seajs.use('default.store.index');
</script>
<!--{/content}-->