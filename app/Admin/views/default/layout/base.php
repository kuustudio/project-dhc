<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>喵星人 - 找好吃的</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <link rel="stylesheet" href="<?php echo MONK::include_css('frame','/Admin/source/styles/frame.css',false,true); ?>">
    <script type="text/javascript" src="<?php echo MONK::include_js('frame','/Admin/source/scripts/frame.js',false,true); ?>"></script>
    <!--{contentplaceholderid head}-->
</head>
<body>
    <div class="left-pos">
        <div class="header">
            <p>欢迎,admin</p>
            <p>
                <a href="#">设置</a>
                <a href="#">退出</a>
            </p>
        </div>
        <div class="menu">
            <ul>
                <?php foreach($menu as $item){ ?>
                    <?php if($item['has_url'] == 1){ ?>
                    <li class="level<?php echo $item['level']; ?>"><a href="<?php echo $item['url']; ?>"><?php echo $item['name']; ?></a></li>
                    <?php }else{ ?>
                    <li class="level<?php echo $item['level']; ?>"><span><?php echo $item['name']; ?></span></li>
                    <?php } ?>
                <?php } ?>
            </ul>
        </div>
        <div class="footer">
            <p>copyright &copy noskycn</p>
            <p>version beta 1.0</p>
        </div>
    </div>
    <div class="right-pos"><!--{contentplaceholderid body}--></div>
<!--{contentplaceholderid foot}-->
</body>
</html>