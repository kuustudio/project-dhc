<!--{@page}-->
<!DOCTYPE html> 
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<style type="text/css">
html,body,h1,h2,h3,h4,h5,h6,dl,dt,dd,ul,ol,li,th,td,p,blockquote,pre,form,fieldset,legend,input,button,textarea,hr,iframe{margin:0; padding:0;}
html,body{font-size:12px; height:100%;overflow: hidden;}
ul,ol{list-style-type: none;}
a{text-decoration:none;}
.menu_title{
    background:#f1f1f1; 
    background:-webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#f1f1f1)); 
    background:-moz-linear-gradient(top, #fff, #f1f1f1);  
    background:-o-linear-gradient(top, #fff, #f1f1f1); 
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#fff, endColorstr=#f1f1f1, GradientType=0); 
    position:relative; cursor:pointer; *zoom:1;
}
.menu_link{padding-left:12px; line-height:30px; color:#333;}
.u {display:inline-block; width:20px; height:20px; margin-bottom:-3px; margin-top:-3px; background:url(/source/images/icons.png) no-repeat;}
.u29 {background-position:-180px -40px;}
.u39 {background-position: -180px -60px;}
.opt_icon{position:absolute; right:10px; top:6px;}
.list_link{display:block; height:24px; line-height:24px; padding-left:25px; margin:2px 2px 0; color:#333;}
.list_link:hover{background-color:#f5f5f5;}
.pl15 {padding-left: 15px;}
.pb5{padding-bottom: 5px;}
.g9 {color: #999;}
</style>
<script type="text/javascript" src="/source/scripts/jquery-1.8.3-mini.js"></script>
</head>
<body>
    <?php foreach(Monk::block('Admin_Block_Menu')->getMenu() as $key=>$menuGroup){ ?>
    <h4 class="menu_title" tabindex="<?php echo $key; ?>" title="收起" data-rel="<?php echo $menuGroup['menuGroupKey']; ?>">
        <u class="u u39 opt_icon"></u>
        <div class="menu_link"><?php echo $menuGroup['menuGroupName']; ?></div>
    </h4>
    <ul id="<?php echo $menuGroup['menuGroupKey']; ?>" class="bbc pb5">
        <?php foreach($menuGroup['list'] as $menu){ ?>
        <li class="list_li">
            <a class="list_link" href="<?php echo $menu['menuUrl']; ?>" target="contentframe"><?php echo $menu['menuName']; ?> <span class="g9">»</span></a>
        </li>
        <?php } ?>
    </ul>
    <?php } ?>
<script type="text/javascript">
(function() {
  var strMenuKey = 'menu_title', eleLeftMenuTit = $(".menu_title");
  
  //存储垂直菜单的展开收起信息
  var funStoreDisplay = function() {
    var arrDisplay = [];
    eleLeftMenuTit.each(function(index) {
      arrDisplay[index] = $(this).data("display") === false? 0: 1;  
    }); 
    
    //存储，IE6~7 cookie 其他浏览器HTML5本地存储
    if (window.localStorage) {
      localStorage.setItem(strMenuKey, arrDisplay); 
    } else {
      Cookie.write(strMenuKey, arrDisplay); 
    }
  };
  
  //默认存储与事件绑定
  eleLeftMenuTit.data("display", true).on("click", function() {
    var eleTarget = $(this).attr("data-rel");
    if (eleTarget) {
      if ($(this).data("display")) {
        $("#"+eleTarget).hide();
        $(this).attr("title", "展开").find(".u").removeClass("u39").addClass("u29");
        $(this).data("display", false);
      } else {
        $("#"+eleTarget).show();
        $(this).attr("title", "收起").find(".u").removeClass("u29").addClass("u39");
        $(this).data("display", true);
      }
      //存储
      funStoreDisplay();
    }
    return false;
  });
  
  //检测触发是否收起
  var strStoreDate = window.localStorage? localStorage.getItem(strMenuKey): Cookie.read(strMenuKey);  
  if (strStoreDate) {
    $.each(strStoreDate.split(","), function(index, display) {
      if (parseInt(display) === 0) {
        $(eleLeftMenuTit[index]).triggerHandler("click");
      }
    }); 
  }
})();
</script>
</body>
</html>