<!--{@page layout="base"}-->
<!--{content head}-->
<script type="text/javascript">
    if(wsd<640){
        document.writeln('<link rel="stylesheet" type="text/css" media="all" href="<?php echo MONK::include_css("index-index-320","/Store/source/styles/index/index/320.css",false,true); ?>">');
    }else if(640<wsd&&wsd<1024){
        document.writeln('<link rel="stylesheet" type="text/css" media="all" href="<?php echo MONK::include_css("index-index-640","/Store/source/styles/index/index/640.css",false,true); ?>">');
    }else{
        document.writeln('<link rel="stylesheet" type="text/css" media="all" href="<?php echo MONK::include_css("index-index-1024","/Store/source/styles/index/index/1024.css",false,true); ?>">');
    }
</script>
<!--{/content}-->
<!--{content content}-->
<div class="hd">
    <div class="hl">
        <h1 class="logo">喵星人</h1>
        <i>&copy 星铺端</i>
        <h3>简单，好用的星铺管理工具</h3>
    </div>
    <div class="hr">
        <ul class="account-links">
            <li><a class="btn-signup" href="<?php echo MONK::_url('*/reg')?>">注册</a></li>
            <li><a class="btn-signin" href="<?php echo MONK::_url('*/login')?>">登录</a></li>
        </ul>
    </div>
</div>
<div class="bd">
    <h2><b>省</b>时间，<b>省</b>成本，<b>快</b>赚钱</h2>
    <div class="section" id="order-menu">
        <h3>让我们选择方便的电子菜单</h3>
        <div class="desc">
            不需要印刷成本，不需要人手去分发，方便的修改，电子菜单让一切变的简单容易。
        </div>
    </div>
    <div class="section" id="order-manage">
        <h3>丢掉手中的笔</h3>
        <div class="desc">
            订单一目了然，运转流程清晰，再也不需要涂涂改改的记笔记了。
        </div>
    </div>
    <div class="section" id="order-progress">
        <h3>让我们最大可能的省时间</h3>
        <div class="desc">
            地点相近的、时间相近的或点同种菜的订单，已经聪明的放在了一起。
        </div>
    </div>
    <div class="feed">
        <dl>
            <dt class="hide"><a href="#">小明</a>在<a href="#">香格里拉</a>点了一份<a href="#">排骨饭</a></dt>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dt><a href="#">小明</a>在<a href="#">香格里拉</a>点了一份<a href="#">排骨饭</a>小明</a>在<a href="#">香格里拉</a>点了一份<a href="#">排骨饭</a>小明</a>在<a href="#">香格里拉</a>点了一份<a href="#">排骨饭</a></dt>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dd class="select" data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dt class="hide"><a href="#">小明</a>在<a href="#">香格里拉</a>点了一份<a href="#">排骨饭</a></dt>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
            <dd data-info="你好"><img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg" /></dd>
        </dl>
    </div>
</div>
<!--{/content}-->
<!--{content foot}-->
<!--{/content}-->