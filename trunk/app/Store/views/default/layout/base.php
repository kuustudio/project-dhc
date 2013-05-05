<!DOCTYPE html> 
<html>
<head>
<meta charset="utf-8">
<title>喵星人 - 找好吃的</title>
<meta name="description" content="" />
<meta name="keywords" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="format-detection" content="telephone=yes" />
<link rel="stylesheet" href="<?php echo MONK::include_css('store-base','/Store/source/styles/base.css',false,true); ?>">
<script type="text/javascript" src="<?php echo MONK::include_js('lbs','/source/scripts/lbs.js',false,true); ?>"></script>
<script type="text/javascript" src="<?php echo MONK::include_js('store-base','/Store/source/scripts/base.js',false,true); ?>"></script>
<!--{contentplaceholderid head}-->
</head>
<body>
<noscript>提示：检测到您的浏览器未开启JavaScript，请开启后刷新页面重试:)</noscript>
<div class="wrapper">
    <div class="page" id="page-<?php echo MONK::getConfig('app'); ?>-<?php echo MONK::getConfig('controller'); ?>-<?php echo MONK::getConfig('action'); ?>">
        <?php if(isset($no_topbar)&&$no_topbar){ ?>
        
        <?php }else{ ?>
        <div class="topbar">
            <h1 class="logo">
                <a href="/" title="返回">喵星人</a>
                <i><a href="/" title="返回">宁波</a></i>
            </h1>
            <div class="account-info">
                <span class="welcome">hi, 沈能洲</span>
                <a href="<?php echo MONK::_url('setting/index')?>" data-method="" rel="nofollow">设置</a>
                <a href="<?php echo MONK::_url('*/logout')?>" data-method="" rel="nofollow">退出</a>
            </div>
        </div>
        <?php } ?>
        <!--{contentplaceholderid content}-->
        <div class="footer">
        © <a href="#">官方微博</a>
        <em>·</em>
        <a href="#">使用帮助</a>
    </div>
</div>
<!--{contentplaceholderid foot}-->
</body>
</html>