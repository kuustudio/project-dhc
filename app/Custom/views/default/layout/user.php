<!--{@layout layout='home'}-->
<!--{content pagehead}-->
<link rel="stylesheet" type="text/css" media="all" href="<?php echo MONK::include_css("user-base","/Custom/source/styles/user/base.css",false,true); ?>">
<!--{contentplaceholderid prohead}-->
<!--{/content}-->
<!--{content pagecontent}-->
<div class="utop-wrap">
    <div class="user-info">
        <div class="user-head">
            <div class="avatar"><img src="/Custom/source/uploads/user/160x160/thumb_43eb82660e567c3e73e9e90bc7b1c5bd.jpg" width="160" height="160" /></div>
            <div class="self-disc">今天真是个好天气啊！！！</div>
        </div>
        <div class="container">
            <div class="user-info-wrap">
                <p>
                    <s class="s-man"></s>
                    <span class="name YaHei">无天暗帝</span>
                    <span class="auth">
                        <i class="real-name"></i>
                        <i class="member"></i>
                    </span>
                    <span class="number"><label>喵牌:</label>45845122</span>
                    <span class="medal">
                        <img src="/Custom/source/images/medal/T1DAoIXiBfXXa1YfHb-24-24.png" width="24" height="24" />
                        <span class="medal-list hide">
                            <a href="#"><img src="/Custom/source/images/medal/T1DAoIXiBfXXa1YfHb-24-24.png" /></a>
                            <a href="#"><img src="/Custom/source/images/medal/T1DAoIXiBfXXa1YfHb-24-24.png" /></a>
                            <a href="#"><img src="/Custom/source/images/medal/T1DAoIXiBfXXa1YfHb-24-24.png" /></a>
                            <a href="#"><img src="/Custom/source/images/medal/T1DAoIXiBfXXa1YfHb-24-24.png" /></a>
                            <a href="#"><img src="/Custom/source/images/medal/T1DAoIXiBfXXa1YfHb-24-24.png" /></a>
                            <a href="#"><img src="/Custom/source/images/medal/T1DAoIXiBfXXa1YfHb-24-24.png" /></a>
                        </span>
                    </span>
                </p>
                <p class="action">
                    <a class="btn follow" href="javascript:;"><i>+</i>关注</a>
                    <a class="send-message" href="javascript:;">发私信</a>
                </p>
                <ul class="user-status">
                    <li class="last">
                        <em>2545</em>
                        <span>贡献</span>
                    </li>
                    <li>
                        <em>25345</em>
                        <span>喜欢</span>
                    </li>
                    <li>
                        <em>257775</em>
                        <span>粉丝</span>
                    </li>
                    <li>
                        <em>8458</em>
                        <span>关注</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="user-main container">
    <div class="unav">
        <ul>
            <li<?php if($page_name=='Home'){?> class="active"<?php }?>><a href="<?php echo MONK::_url('user/home',array('uid'=>'YOAYDDNGKA39543JKFDLJA34J3K2J4')); ?>">Ta的首页</a></li>
            <li<?php if($page_name=='Share'){?> class="active"<?php }?>><a href="<?php echo MONK::_url('user/share',array('uid'=>'YOAYDDNGKA39543JKFDLJA34J3K2J4')); ?>">Ta的分享</a></li>
            <li<?php if($page_name=='Follow'){?> class="active"<?php }?>><a href="<?php echo MONK::_url('user/follow',array('uid'=>'YOAYDDNGKA39543JKFDLJA34J3K2J4')); ?>">Ta的喵友</a></li>
            <li<?php if($page_name=='Group'){?> class="active"<?php }?>><a href="<?php echo MONK::_url('user/group',array('uid'=>'YOAYDDNGKA39543JKFDLJA34J3K2J4')); ?>">Ta的圈圈</a></li>
            <li<?php if($page_name=='Info'){?> class="active"<?php }?>><a href="<?php echo MONK::_url('user/info',array('uid'=>'YOAYDDNGKA39543JKFDLJA34J3K2J4')); ?>">Ta的资料</a></li>
        </ul>
    </div>
    <div class="pro-wrap">
        <!--{contentplaceholderid prowrap}-->
    </div>
</div>
<!--{/content}-->
<!--{content pagefoot}-->
<!--{contentplaceholderid profoot}-->
<!--{/content}-->