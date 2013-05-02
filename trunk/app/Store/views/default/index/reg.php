<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('store-reg','/Store/source/styles/reg.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="hd">
    <h1 class="logo">鼎好吃</h1>
</div>
<div class="bd">
    <form class="form" action="/users/sign_in" method="post" data-remote="true" novalidate="">
        <div class="form-item">
            <div class="form-field">
                <input type="text" tabindex="1" name="store_name" id="store_name" placeholder="店铺名称" autocomplete="off" data-validate="required" data-validate-msg="请填写店铺的名称">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input type="email" tabindex="2" name="email" placeholder="设置一个邮箱作为登陆账号" autocomplete="off" data-validate="required;email" data-validate-msg="请填写您的邮箱地址">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <input class="password" name="password" type="password" placeholder="设置一个密码" autocomplete="off" data-validate="required;length:6" data-validate-msg="请设置一个登录密码；至少6位">
            </div>
        </div>
        <div class="form-item">
            <div class="form-field">
                <div class="select">
                    <span class="text">给店铺选择一个分类</span><i>▼</i>
                    <div class="store-category">
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
        <div class="form-item sign-in-btn">
            <button type="submit" id="btn-signup" class="btn btn-primary btn-large fix-width btn-submit" data-disable-with="正在注册...">注册</button>
            <p class="desc fix-width">点击注册表示您已阅读并同意<a href="/agreement/">《dhc 服务条款》</a></p>
        </div>
        
        
    </form>
    
    <div class="sign-nav fix-width">
        已有帐号？<span><a href="<?php echo MONK::_url('*/login')?>">立即登录 →</a></span>
    </div>
</div>
<!--{/content}-->
<!--{content foot}-->
<!--{/content}-->