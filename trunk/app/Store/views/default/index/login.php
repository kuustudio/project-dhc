<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('store-login','/Store/source/styles/login.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="hd">
    <h1 class="logo">鼎好吃</h1>
</div>
<div class="bd">
    <form class="form" action="/users/sign_in" method="post" data-remote="true" novalidate="">
        <div class="form-item">
            <div class="form-field">
                <input type="email" tabindex="1" name="email" id="email" placeholder="登录邮箱" data-validate="required;email" data-validate-msg="请填写您的登录邮箱">
            </div>
        </div>

        <div class="form-item">
            <div class="form-field">
                <input type="password" tabindex="2" name="password" placeholder="密码" data-validate="required;length:6" data-validate-msg="请填写您的登录密码">
            </div>
        </div>

        <div class="form-item sign-in-btn">
            <button type="submit" tabindex="3" id="btn-signin" class="btn btn-primary btn-submit" data-disable-with="正在登录..." data-goto="/launchpad/">登录</button>
            <div class="desc">
                <label id="label-remember"><input type="checkbox" name="remember_me" id="cb-remember" tabindex="4" checked="1"> 下次自动登录</label>
                <span class="forgot-pw"><a href="/users/forgot_password" tabindex="5">忘记密码了？</a></span>
            </div>
        </div>
        
        
    </form>
    
    <div class="sign-nav">
        没有帐号？<span><a href="<?php echo MONK::_url('*/reg')?>">免费注册 →</a></span>
    </div>
</div>
<!--{/content}-->
<!--{content foot}-->
<!--{/content}-->