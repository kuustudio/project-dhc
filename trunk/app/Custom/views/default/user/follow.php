<!--{@page layout='user'}-->
<!--{content prohead}-->
<link rel="stylesheet" type="text/css" media="all" href="<?php echo MONK::include_css("user-follow","/Custom/source/styles/user/follow.css",false,true); ?>">
<link rel="stylesheet" type="text/css" media="all" href="<?php echo MONK::include_css("user-subnav","/Custom/source/styles/user/subnav.css",false,true); ?>">
<!--{/content}-->
<!--{content prowrap}-->
<div class="sub-nav">
    <a href="<?php echo MONK::_url('user/follow',array('uid'=>'YOAYDDNGKA39543JKFDLJA34J3K2J4')); ?>" class="active">关注(1621)</a><i></i>
    <a href="<?php echo MONK::_url('user/fans',array('uid'=>'YOAYDDNGKA39543JKFDLJA34J3K2J4')); ?>">粉丝(13456441)</a>
</div>
<div class="user-list-wrap">
    <div class="user-item">
        <a href="<?php echo MONK::_url('*/home',array('uid'=>"YOAYDDNGKA39543JKFDLJA34J3K2J4")); ?>" class="avatar">
            <img src="/Custom/source/uploads/id/thumb_a603c311248ae77f23a42313ee9962a6.jpg" width="80" height="80" />
        </a>
        <p>
            <s class="s-man"></s>
            <span class="name YaHei"><a href="<?php echo MONK::_url('*/home',array('uid'=>"YOAYDDNGKA39543JKFDLJA34J3K2J4")); ?>">无天暗帝</a></span>
            <span class="auth">
                <i class="real-name"></i>
                <i class="member"></i>
            </span>
            <span class="number"><label>喵牌:</label>45845122</span>
        </p>
    </div>
</div>
<!--{/content}-->
<!--{content profoot}-->
<script src="<?php echo MONK::include_js("user-follow","/Custom/source/scripts/user/follow.js",false,true); ?>"></script>
<!--{/content}-->