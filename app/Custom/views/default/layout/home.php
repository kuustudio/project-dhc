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
                    <li><a href="<?php echo MONK::_url('home/index'); ?>">主页</a></li>
                    <li><a href="<?php echo MONK::_url('store/list'); ?>">美食单</a></li>
                    <li><a href="<?php echo MONK::_url('friend/list'); ?>">喵友</a></li>
                    <li><a href="<?php echo MONK::_url('group/list'); ?>">圈圈</a></li>
                </ul>
            </div>
            <div class="top-search"><input type="search" x-webkit-grammar="builtin:translate" x-webkit-speech placeholder="美食单/喵友/圈圈" /><i>搜索</i></div>
            <div class="quick-list">
                <ul>
                    <li><a class="logout" data-icon="," href="#"></a></li>
                    <li><a class="setting" data-icon="#" href="#"></a></li>
                    <li><a class="notice" data-icon='"' href="#"></a></li>
                    <li><a class="ihome" data-icon="！" href="#"></a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="middle"><!--{contentplaceholderid pagecontent}--></div>
    <div class="footer">
        <div class="container">
            © <a href="#">官方微博</a><em>·</em><a href="#">使用帮助</a>
        </div>
    </div>
</div>
<!--{contentplaceholderid pagefoot}-->
<!--{/content}-->