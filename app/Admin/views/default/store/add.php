<!--{@page layout="base"}-->
<!--{content head}-->
<style type="text/css">
.list-header .checkbox{width:40px;}
.list-header .store_id{width:60px;}
.list-header .store_category{width:100px;}
.list-header .store_phone{width:120px;}
.list-header .operation{width:200px;}
</style>
<!--{/content}--> 
<!--{content body}-->
<div class="content">
    <div class="submenu">
        <a href="<?php echo Monk::_url('*/index'); ?>">店铺列表</a>
        <a class="current">添加店铺</a>
    </div>
    <div class="bar-header"><a href="javascript:;" class="reload">刷新本页</a></div>
    <div class="list">
        <table>
            <tr>
                <td class="label">ID</td>
                <td class="input"></td>
            </tr>
            <tr></tr>
        </table>
    </div>
</div>
<script type="text/javascript">
seajs.use('default.store.index');
</script>
<!--{/content}-->