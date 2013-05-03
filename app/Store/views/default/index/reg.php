<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('index-reg','/Store/source/styles/index/reg.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="hd">
    <h1 class="logo">喵星人</h1>
    <i><a href="#">宁波</a></i>
</div>
<div class="bd">
    <form class="form" action="/users/sign_in" method="post" data-remote="true" novalidate="">
        <div class="form-item">
            <div class="form-field">
                <input type="text" name="store_name" id="store_name" placeholder="星铺名称" autocomplete="off" data-validate="required" data-validate-msg="请填写星铺的名称">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input type="email" name="email" placeholder="设置一个邮箱作为登陆账号" autocomplete="off" data-validate="required;email" data-validate-msg="请填写您的邮箱地址">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input class="password" name="password" type="password" placeholder="设置一个密码" autocomplete="off" data-validate="required;length:6" data-validate-msg="请设置一个登录密码；至少6位">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <div class="select select-store-category">
                    <div class="select-btn"><span class="text">给店铺选择一个分类</span><i>▼</i></div>
                    <div class="list hide">
                        <ul>
                            <li>甬菜</li>
                            <li>日本料理</li>
                            <li>海鲜</li>
                            <li>小吃</li>
                            <li>农家菜</li>
                            <li>中餐</li>
                            <li>快餐</li>
                            <li>东北菜</li>
                            <li>西式快餐</li>
                            <li>家常菜</li>
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
                <input type="text" name="store_contacts" placeholder="设置一个联系人" autocomplete="off" data-validate="required" data-validate-msg="请填写一个联系人">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <div class="select select-store-area">
                    <div class="select-btn"><span class="text">给店铺选择一个区域</span><i>▼</i></div>
                    <div class="list hide">
                        <ul>
                            <li>鄞州</li>
                            <li>海曙</li>
                            <li>江东</li>
                            <li>江北</li>
                            <li>慈溪</li>
                            <li>余姚</li>
                            <li>镇海</li>
                        </ul>
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
                <div class="search-area-bar clearfix">
                    <label>设置送货范围</label>
                    <input type="number" placeholder="范围值" autocomplete="off"> 米
                    <button type="button" class="search-perimeter-area">搜</button>
                </div>
                <div class="search-area-result hide">
                    <div class="result-list">
                        <dl>
                            <dt>鄞州</dt>
                            <dd>
                                <h4>1000米</h4>
                                <ul>
                                    <li>
                                        <label>新四方</label>
                                        <i>x<i>
                                    </li>
                                    <li>
                                        <label>肯德基</label>
                                        <i>x<i>
                                    </li>
                                    <li>
                                        <label>南苑饭店</label>
                                        <i>x<i>
                                    </li>
                                    <li>
                                        <label>来必饱</label>
                                        <i>x<i>
                                    </li>
                                </ul>
                            </dd>
                            <dd>
                                <h4>2000米</h4>
                                <ul>
                                    <li>
                                        <label>台湾美食</label>
                                        <i>x<i>
                                    </li>
                                    <li>
                                        <label>顺旺基</label>
                                        <i>x<i>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        <dl>
                            <dt>江东</dt>
                            <dd>
                                <h4>1000米</h4>
                                <ul>
                                    <li>
                                        <label>南苑饭店</label>
                                        <i>x<i>
                                    </li>
                                    <li>
                                        <label>来必饱</label>
                                        <i>x<i>
                                    </li>
                                    <li>
                                        <label>台湾美食</label>
                                        <i>x<i>
                                    </li>
                                    <li>
                                        <label>顺旺基</label>
                                        <i>x<i>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
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
<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="<?php echo MONK::include_css('index-reg','/Store/source/scripts/index/reg.js',false,true); ?>"></script>
<!--{/content}-->