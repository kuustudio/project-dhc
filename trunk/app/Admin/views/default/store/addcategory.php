<!--{@page layout="layout/base"}-->
<!--{content head}-->
<style type="text/css">
.list-header .checkbox{width:40px;}
.list-header .category_id{width:60px;}
.list-header .category_name{text-align:left;padding-left: 20px;}
.list-header .operation{width:200px;}
</style>
<!--{/content}--> 
<!--{content body}-->
<div class="content">
    <div class="submenu">
        <a href="<?php echo DHC::_url('*/*/category'); ?>">店铺分类列表</a>
        <a class="current">添加店铺分类</a>
    </div>
    <div class="bar-header"><?php if(!empty($result)){ ?><span class="<?php echo $result; ?>"><?php echo $message; ?></span><?php } ?><a href="javascript:;" class="reload">刷新本页</a></div>
    <div class="list">
        <form id="add-store-category" name="add_store_category" method="post">
        <table>
            <tr>
                <td class="label">分类名称：</td>
                <td class="value"><input type="txt" class="txt category-store-name" name="category_store_name" /></td>
            </tr>
            <tr>
                <td class="label"></td>
                <td class="value"><button type="button" class="submit">提交</button></td>
            </tr>
        </table>
        </form>
    </div>
</div>
<script type="text/javascript">
seajs.use('default.store.addcategory');
</script>
<!--{/content}-->