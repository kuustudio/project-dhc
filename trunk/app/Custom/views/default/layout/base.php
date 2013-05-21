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
<script type="text/javascript">
var city_id = '<?php echo $city_id; ?>',
    city_name = '<?php echo $city_name; ?>',
    latlon = '<?php echo $latlon; ?>';
    custom_latlon = '<?php echo $custom_latlon; ?>';
</script>
<!--{contentplaceholderid head}-->
</head>
<body>
<noscript>提示：检测到您的浏览器未开启JavaScript，请开启后刷新页面重试:)</noscript>
<div class="wrapper">
    <div class="page" id="page-<?php echo MONK::getConfig('app'); ?>-<?php echo MONK::getConfig('controller'); ?>-<?php echo MONK::getConfig('action'); ?>">
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