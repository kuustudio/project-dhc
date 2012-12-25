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
        <a class="current">店铺分类列表</a>
        <a href="<?php echo DHC::_url('*/*/addcategory'); ?>">添加店铺分类</a>
    </div>
    <div class="bar-header"><?php if(!empty($result)){ ?><span class="<?php echo $result; ?>"><?php echo $message; ?></span><?php } ?><a href="javascript:;" class="reload">刷新本页</a></div>
    <div class="list">
        <table>
            <tr class="list-header">
                <td class="checkbox">多选</td>
                <td class="category_id">ID</td>
                <td class="category_name">分类名称</td>
                <td class="operation text-left">操作</td>
            </tr>
            <tr class="hr"><td colspan="4"><hr /></td></tr>
            <?php foreach($store_categorys as $k=>$store_category){ ?>
            <tr class="<?php if($k%2 == 1){echo 'second'; } ?>">
                <td class="checkbox"><input id="store_category_id" type="checkbox" name="store_category_id[]" /></td>
                <td class="category_id"><?php echo $store_category['category_store_id']; ?></td>
                <td class="text-left"><?php echo $store_category['category_store_name']; ?></td>
                <td class="operation text-left">
                    <a href="<?php echo DHC::_url('*/*/editCategory',array('category_store_id'=>$store_category['category_store_id'])); ?>">编辑</a> | 
                    <a href="<?php echo DHC::_url('*/*/deleteCategory',array('category_store_id'=>$store_category['category_store_id'])); ?>">删除</a>
                </td>
            </tr>
            <?php } ?>
        </table>
    </div>
    <div class="bar-footer">
        <button class="operate">操作<span class="symbol">▲</span></button>
        <div class="operate-list">
            <ul>
                <li class="delete">删除</li>
            </ul>
        </div>
    </div>
</div>
<script type="text/javascript">
seajs.use('default.store.category');
</script>
<!--{/content}-->