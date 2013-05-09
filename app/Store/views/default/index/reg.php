<!--{@page layout="base"}-->
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
        <input type="hidden" id="store_type" name="store_type">
        <input type="hidden" id="district_id" name="district_id">
        <input type="hidden" id="district_latlon" name="district_latlon">
        <input type="hidden" id="custom_latlon" name="custom_latlon">
        <input type="hidden" id="custom_places" name="custom_places">
        <div class="form-item">
            <div class="form-field">
                <input type="text" name="store_name" id="store_name" placeholder="星铺名称" autocomplete="off" required=required data-validate="required" data-validate-msg="请填写星铺的名称">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input type="email" name="email" placeholder="设置一个邮箱作为登陆账号" autocomplete="off" required=required data-validate="required;email" data-validate-msg="请填写您的邮箱地址">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input class="password" name="password" type="password" placeholder="设置一个密码" required=required autocomplete="off" data-validate="required;length:6" data-validate-msg="请设置一个登录密码；至少6位">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <div class="select select-store-category">
                    <div class="select-btn"><span class="text">给店铺选择一个分类</span><i>▼</i></div>
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
                <input type="telephone" name="store_phone" placeholder="设置一个有效的联系电话或手机" autocomplete="off" data-validate="required;phone" data-validate-msg="请填写您有效的联系电话或手机">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input type="text" name="store_contacts" placeholder="设置联系人姓名" autocomplete="off" data-validate="required" data-validate-msg="请填写一个联系人">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input type="text" name="store_qq" placeholder="设置联系人的QQ号" autocomplete="off" data-validate="required" data-validate-msg="请填写一个联系人">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <div class="select select-store-area">
                    <div class="select-btn"><span class="text">给店铺选择一个区域</span><i>▼</i></div>
                    <div class="list hide">
                        <ul></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-item address-more hide">
            <div class="form-field">
                <input type="text" name="store_address_more" placeholder="补充详细地址" autocomplete="off" data-validate="required" data-validate-msg="请填写详细地址">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <div class="select search-area-bar clearfix">
                    <div class="select-btn"><span class="text">选择中心点</span><i>▼</i></div>
                    <div class="search-key"><input type="number" autocomplete="off" data-validate="required;number" data-validate-msg="请填写您有效的联系电话或手机"><em>公里</em></div>
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
                <textarea name="store_info" placeholder="写一些店铺的简单介绍" autocomplete="off" data-validate="required" data-validate-msg="请一些店铺的简单介绍"></textarea>
            </div>
        </div>
        <div class="form-item sign-in-btn">
            <button type="submit" id="btn-signup" class="btn btn-primary btn-large fix-width btn-submit" data-disable-with="正在注册...">注册</button>
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
}
var lat_lon
</script>
<!--<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.0.min.js"></script>-->
<script type="text/javascript" src="<?php echo MONK::include_js('core','/source/scripts/monk/core.js',false,true); ?>"></script>
<script type="text/javascript" src="<?php echo MONK::include_js('index-reg','/Store/source/scripts/index/reg.js',false,true); ?>"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<!--{/content}-->