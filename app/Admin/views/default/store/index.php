<!--{@page layout="layout/base"}-->
<!--{content head}-->
<style type="text/css">
html,body{height:100%;}
.content{height:100%;text-align:center;font-size:30px;}
.content .submenu{
    border-bottom: 1px solid #CCC;
    height: 29px;
}
.content .submenu a{
    height: 18px;
    float: left;
    margin-left: 10px;
    padding: 5px;
    color:black;
    font-size: 14px;
    background-color: #F1F1F1;
    border: 1px solid #CCC;
    border-radius: 5px 5px 0 0;
    text-decoration: none;
}
.content .submenu a.current{
    background-color: black;
    color: white;
}
.content .bar-header{
    padding-right: 20px;
    height:30px;
    text-align:right;
    font-size:14px;
    line-height: 30px;
    background:#f1f1f1; 
    background:-webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#f1f1f1)); 
    background:-moz-linear-gradient(top, #fff, #f1f1f1);  
    background:-o-linear-gradient(top, #fff, #f1f1f1); 
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#fff, endColorstr=#f1f1f1, GradientType=0); 
    position:relative; *zoom:1;
}
.content .bar-header a{
    text-decoration:none;
    color: black;
}
.content .list .list-header{
    height:40px;
}
</style>
<!--{/content}--> 
<!--{content body}-->
<div class="content">
    <div class="submenu">
        <a class="current">店铺列表</a>
        <a href="#">添加店铺</a>
    </div>
    <div class="bar-header">供 2445 条记录 | <a href="#">刷新本页</a></div>
    <div class="list">
        <table>
            <col width="50" />
            <col width="80" />
            <col />
            <col width="200" />
            <col width="180" />
            <tr class="list-header">
                <td>多选</td>
                <td>ID</td>
                <td>店铺名</td>
                <td></td>
                <td></td>
            </tr>

        </table>
    </div>
    <div class="bar-footer"></div>
</div>
<!--{/content}-->