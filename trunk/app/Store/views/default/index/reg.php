<!--{@page layout='base'}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('index-reg','/Store/source/styles/index/reg.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="hd">
    <h1 class="logo">喵星人</h1>
    <i><a href="<?php echo MONK::_url('*/selectcity')?>"><?php echo $city_name; ?></a></i>
</div>
<div class="bd">
    <form class="form" action="/users/sign_in" method="post" data-remote="true">
        <div class="form-item">
            <div class="form-field">
                <input type="text" name="store_name" id="store_name" placeholder="星铺名称" autocomplete="off" required=required data-validate="required;length:1,200" data-validate-msg="喵星小铺要有自己的名字哦 ~_~;名字不要太长哦，人家记不住 ~_~">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input type="email" name="email" placeholder="设置一个邮箱作为登陆账号" autocomplete="off" required=required data-validate="required;email;registered" data-validate-msg="邮箱是以后登录的账号了，要填哦 ~_~;邮箱格式不正确 ~_~;这个邮箱已经注册过了哦 ~_~">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input class="password" name="password" type="password" placeholder="设置一个密码" required=required autocomplete="off" data-validate="required;length:6" data-validate-msg="登录密码要填哦，还请牢记 ~_~;密码至少6位，太短容易被别人猜到 ~_~">
            </div>
        </div>
        <div class="form-item">
            <input type="hidden" id="store_type" name="store_type" data-validate="required;" data-validate-msg="哪一类的，选一个吧 ~_~">
            <div class="form-field">
                <div class="select select-store-category">
                    <div class="select-btn"><span class="text">给星铺选择一个分类</span><i>▼</i></div>
                    <div class="list hide">
                        <ul>
                            <?php foreach($store_categorys as $store_category_id=>$store_category_name){ ?>
                            <li data-store-category-id='<?php echo $store_category_id; ?>'><?php echo $store_category_name; ?></li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input type="telephone" name="store_phone" placeholder="设置一个有效的联系电话或手机" autocomplete="off" data-validate="required;phone" data-validate-msg="为了方便联系，填一个吧 ~_~;亲，这个不是手机或电话号码吧 ~_~">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input type="text" name="store_contacts" placeholder="设置联系人姓名" autocomplete="off" data-validate="required" data-validate-msg="为了方便联系，填一个吧 ~_~">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input type="text" name="store_qq" placeholder="设置联系人的QQ号" data-validate="number" data-validate-msg="QQ号要输正确哦 ~_~" autocomplete="off">
            </div>
        </div>
        <div class="form-item">
            <input type="hidden" id="district_id" name="district_id" data-validate="required" data-validate-msg="哪个区域，选一个吧 ~_~">
            <input type="hidden" id="district_latlon" name="district_latlon">
            <div class="form-field">
                <div class="select select-store-area">
                    <div class="select-btn"><span class="text">给星铺选择一个区域</span><i>▼</i></div>
                    <div class="list hide">
                        <ul></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-item address-more hide">
            <div class="form-field">
                <input type="text" name="store_address_more" placeholder="补充详细地址" autocomplete="off" data-validate="required" data-validate-msg="小铺地址，区域以下尽量详细哦 ~_~">
            </div>
        </div>
        <div class="form-item">
            <input type="hidden" id="custom_latlon" name="custom_latlon" data-validate="required" data-validate-msg="选一个中心点吧，不然怎么搜周围呢 ~_~">
            <input type="hidden" id="custom_places" name="custom_places" data-validate="required" data-validate-msg="当前范围内没有可外送地点，搜再远点好吗 ~_~">
            <div class="form-field">
                <div class="select search-area-bar clearfix">
                    <div class="select-btn"><span class="text">选择中心点</span><i>▼</i></div>
                    <div class="search-key"><input type="number" autocomplete="off" data-validate="required;number" data-validate-msg="请填写搜索公里数;公里数必须是数字哦 ^_^" value="1"><em>公里</em></div>
                    <button type="button" class="search-perimeter-area">搜</button>
                    <div class="map hide"></div>
                </div>
                <div class="search-area-result hide">
                    <h3>设置送货范围</h3>
                    <div class="result-list"></div>
                </div>
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <textarea name="store_info" placeholder="写一些星铺的简单介绍" autocomplete="off" data-validate="required" data-validate-msg="请简单介绍一下宝贝星铺吧 ﹥﹏﹤"></textarea>
            </div>
        </div>
        <div class="form-item sign-in-btn">
            <button type="button" id="btn-signup" class="fix-width btn-submit" data-disable-with="正在注册...">注册</button>
            <p class="desc fix-width">点击注册表示您已阅读并同意<a href="/agreement/">《喵星人服务条款》</a></p>
        </div>
    </form>
    <div class="sign-nav fix-width">
        已有帐号？<span><a href="<?php echo MONK::_url('*/login')?>">喵咪登录 →</a></span>
    </div>
</div>
<!--{/content}-->
<!--{content foot}-->
<script type="text/javascript">
var Url = {
    get_city:"<?php echo MONK::_url('*/getcity')?>",
    select_city:"<?php echo MONK::_url('*/selectcity')?>",
    get_districts:"<?php echo MONK::_url('*/getdistricts')?>",
    get_places:"<?php echo MONK::_url('*/getplaces')?>",
    registered:"<?php echo MONK::_url('*/registered')?>",
    reg:"<?php echo MONK::_url('*/reg')?>",
    home:"<?php echo MONK::_url('home/index')?>",
}
</script>
<script type="text/javascript" src="<?php echo MONK::include_js('jquery','/source/scripts/jquery-2.0.0.min.js',false,true); ?>"></script>
<!--<script type="text/javascript" src="<?php echo MONK::include_js('core','/source/scripts/monk/core.js',false,true); ?>"></script>-->
<script type="text/javascript" src="<?php echo MONK::include_js('index-reg','/Store/source/scripts/index/reg.js',false,true); ?>"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<!--{/content}-->