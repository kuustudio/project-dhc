<!--{@page layout='user'}-->
<!--{content prohead}-->
<link rel="stylesheet" type="text/css" media="all" href="<?php echo MONK::include_css("user-fans","/Custom/source/styles/user/fans.css",false,true); ?>">
<link rel="stylesheet" type="text/css" media="all" href="<?php echo MONK::include_css("user-subnav","/Custom/source/styles/user/subnav.css",false,true); ?>">
<!--{/content}-->
<!--{content prowrap}-->
<div class="sub-nav">
    <a href="<?php echo MONK::_url('user/follow',array('uid'=>'YOAYDDNGKA39543JKFDLJA34J3K2J4')); ?>">关注(1621)</a><i></i>
    <a href="<?php echo MONK::_url('user/fans',array('uid'=>'YOAYDDNGKA39543JKFDLJA34J3K2J4')); ?>" class="active">粉丝(13456441)</a>
</div>
<!--{/content}-->
<!--{content profoot}-->
<script src="<?php echo MONK::include_js("user-fans","/Custom/source/scripts/user/fans.js",false,true); ?>"></script>
<!--{/content}-->