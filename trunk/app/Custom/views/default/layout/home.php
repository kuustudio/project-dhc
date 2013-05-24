<!--{@layout layout='base'}-->
<!--{content head}-->
<link rel="stylesheet" type="text/css" media="all" href="<?php echo MONK::include_css("home","/Custom/source/styles/home.css",false,true); ?>">
<!--{contentplaceholderid pagehead}-->
<!--{/content}-->
<!--{content content}-->
<div class="page" id="page-<?php echo MONK::getConfig('app'); ?>-<?php echo MONK::getConfig('controller'); ?>-<?php echo MONK::getConfig('action'); ?>">
    <div class="header">
        <div class="container">
            <div class="logo">喵星人</div>
            <div class="city"><a href="#">宁波</a></div>
            <div class="nav">
                <ul>
                    <li>主页</li>
                    <li>美食单</li>
                    <li>喵友</li>
                    <li>圈圈</li>
                </ul>
            </div>
            <div class="top-search"><input type="search" x-webkit-grammar="builtin:translate" x-webkit-speech />搜索</div>
            <div class="quick-list">
                <ul>
                    <li>i小窝</li>
                    <li>通知</li>
                    <li>设置</li>
                    <li>退出</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="center"><!--{contentplaceholderid pagecontent}--></div>
    <div class="footer">
        <div class="container">
            © <a href="#">官方微博</a><em>·</em><a href="#">使用帮助</a>
        </div>
    </div>
</div>
<!--{contentplaceholderid pagefoot}-->
<!--{/content}-->