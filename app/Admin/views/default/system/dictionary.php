<!--{@page layout="layout/base"}-->
<!--{content head}-->
<style type="text/css">
tr{height:30px;}
.list tr.hr{height:1px;}
.bar-header .data-table-list{
    margin-left: 20px;
    float: left;
}
.bar-header .data-table-list .info{
    margin-left: 20px;
    color:red;
}
.list-header{
    border-bottom: 1px solid #ccc;
}
.list-header .field_name{width:280px;}
.list .field{text-align:left;}
.list .field span{float:right;color:red;}
.list-header .name{width:200px;}
.list-header .type{width:100px;}
.list-header .validate_type{width:100px;}
.list-header .len{width:40px;}
.list-header .collation{width:120px;}
.list-header .default{width:40px;}
.list .second{background-color: #eee;}
.list .error{background-color: red;}
.list .hover{background-color: #ddd;}
.list .singleClick{background-color: #ddd;}
.list .doubleClick{background-color: #ccc;}
.bar-footer{border-top:1px solid #ccc;margin:10px 0;padding: 10px 0;}
.bar-footer .operate{float:left;padding: 5px 20px;border-top: 1px solid #ccc;}
.bar-footer .page-info{float:left;margin-left:10px;line-height:30px;}
.bar-footer .page-list{float:right;line-height:30px;margin-right:10px;}
</style>
<!--{/content}--> 
<!--{content body}-->
<div class="content">
    <div class="submenu">
        <a class="current">字段列表</a>
        <a href="#">添加店铺</a>
    </div>
    <div class="bar-header">
        <div class="data-table-list">
            数据表名称：
            <select name="table_name">
                <?php foreach($db_map as $key=>$table){ ?>
                <option <?php if($key == $table_name){echo "selected=selected";}?> value="<?php echo $key; ?>"><?php echo $key; ?> | <?php echo $table; ?></option>
                <?php } ?>
            </select>
            <span class="info">说明：√ 主键；K(索引类型)；↑ 自增；● 非空；○ 空；红色为有误，并说明</span>
        </div>
        供 2445 条记录 | <a href="javascript:;" class="reload">刷新本页</a>
    </div>
    <div class="list">
        <table>
            <tr class="list-header">
                <td class="field_name">字段名</td>
                <td class="name">中文名</td>
                <td class="type">类型</td>
                <td class="validate_type">验证</td>
                <td class="len">长度</td>
                <td class="collation">字符集</td>
                <td class="default">默认</td>
                <td class="info">说明</td>
            </tr>
            <tr class="hr"><td colspan="8"><hr /></td></tr>
            <?php foreach($cols as $k=>$col){ ?>
            <tr class="<?php if($k%2 == 1){echo 'second'; } ?><?php echo $col['errorClass']; ?>">
                <td class="field"><?php echo $col['Field']; ?><span><?php echo $col['tip']; ?></span></td>
                <td><?php echo $col['Comment']; ?></td>
                <td><?php echo $col['s_type']; ?></td>
                <td><?php echo $col['map_type']; ?></td>
                <td><?php echo $col['type_num']; ?></td>
                <td><?php echo $col['Collation']; ?></td>
                <td><?php echo $col['Default']; ?></td>
                <td><?php echo $col['info']; ?></td>
            </tr>
            <?php } ?>
        </table>
    </div>
    <div class="bar-footer none">
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
var get_table_url = "<?php echo DHC::_url('*/*/*'); ?>";

(function(){
    $('.bar-header .reload').on('click',function(){
        location.reload();
    });
    $('.list-header .info').width(window.innerWidth-900);
    $('.list tr').hover(
        function(){
            $(this).addClass('hover');
        },
        function(){
            $(this).removeClass('hover');
        }
    );
    $(".list tr").toggle(
        function(){
            $(this).addClass('singleClick');
        },
        function(){
            $(this).addClass('doubleClick');
        },
        function(){
            $(this).removeClass('singleClick doubleClick');
        }
    );
    $('.data-table-list select').on('change',function(){
        location.href = get_table_url+'?table_name='+$(this).val();
    });
})();
</script>
<!--{/content}-->