<!--{@page layout='base'}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('index-login','/Store/source/styles/index/login.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="hd">
    <h1 class="logo">喵星人</h1>
</div>
<div class="bd">
    <form class="form" method="post" data-remote="true">
        <?php if($name=='all'){ ?>
        <div class="form-item">
            <div class="error"><i></i><?php echo urldecode($msg); ?></div>
        </div>
        <?php } ?>
        <div class="form-item">
            <div class="form-field">
                <input type="email" tabindex="1" name="email" id="email" placeholder="登录邮箱">
            </div>
            <?php if($name=='email'){ ?><div class="error"><i></i><?php echo urldecode($msg); ?></div><?php } ?>
        </div>

        <div class="form-item">
            <div class="form-field">
                <input type="password" tabindex="2" name="password" placeholder="密码">
            </div>
            <?php if($name=='password'){ ?><div class="error"><i></i><?php echo urldecode($msg); ?></div><?php } ?>
        </div>

        <div class="form-item sign-in-btn">
            <button type="submit" tabindex="3" id="btn-signin" class="btn-primary btn-submit" data-disable-with="正在登录..." data-goto="/launchpad/">登录</button>
            <div class="desc">
                <label id="label-remember"><input type="checkbox" name="remember_me" id="cb-remember" tabindex="4" checked="1"> 下次自动登录</label>
                <span class="forgot-pw"><a href="/users/forgot_password" tabindex="5">忘记密码了？</a></span>
            </div>
        </div>
    </form>
    
    <div class="sign-nav">
        没有帐号？<span><a href="<?php echo MONK::_url('*/reg')?>">喵咪注册 →</a></span>
    </div>
</div>
<!--{/content}-->