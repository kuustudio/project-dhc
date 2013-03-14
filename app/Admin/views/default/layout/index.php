<!--{@page}-->
<!DOCTYPE html> 
<html>
<head>
<meta charset="utf-8">
<title>网站管理后台</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<style type="text/css">
html,body,h1,h2,h3,h4,h5,h6,dl,dt,dd,ul,ol,li,th,td,p,blockquote,pre,form,fieldset,legend,input,button,textarea,hr{margin:0; padding:0;}
ul,ol{list-style-type: none;}
html,body{font-size:12px; height:100%;overflow: hidden;}
a{text-decoration:none;}
.header{
    height:59px; border-bottom:1px solid #CCC;
    background:#f1f1f1;
}
.header .logo{float:left; margin:20px 10px 10px 20px; font-size:20px;}
.header .topstatus{float:left; margin:10px 60px;}
.header .topmenu{float:right; margin:10px 20px;}
.main{position:relative; margin: 0; padding-bottom: 70px;height:auto; }
.menu{float:left; margin:20px; width:178px;height:auto; border:1px solid #CCC;}
.footer{position:absolute; bottom:0; clear:both; height:59px; width:100%; font-family: Georgia; font-size:14px; line-height:20px; text-align: center; background-color: #FFF;}
.content{padding: 20px 0 0 0; margin: 0 20px 0 220px; height:auto;}
</style>
<!--{contentplaceholderid head}-->
</head>
<body>
<div class="header">
    <div class="logo">网站管理后台</div>
    <div class="topstatus">您好，<span class="uname">admin</span>[<a href="#">退出</a>]</div>
    <div class="topmenu">
        <a href="#">Maps</a> | 
        <a href="#">网站首页</a> |
        <a href="#">管理后台</a> |
        <a href="#">帮助中心</a>
    </div>
</div>
<div class="main">
  <div class="menu">
      <!--{block name="menu" uri="admin/menu"}-->
  </div>
  <div class="content">
      <!--{contentplaceholderid body}-->
  </div>
</div>
<div class="footer">
  Copyright &copy; 2012<br />
  Powered by <a href="#" target="_blank">noskycn</a>
</div>
<script type="text/javascript" src="/source/scripts/jquery-1.8.3-mini.js"></script>
<script type="text/javascript">
    (function(){
        $("iframe").height(window.innerHeight - 160);
    })();
</script>
</body>
</html>