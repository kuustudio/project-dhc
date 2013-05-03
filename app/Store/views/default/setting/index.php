<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('setting-index','/Store/source/styles/setting/index.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="bd">
    <div class="page-inner">
        <h1>星铺设置</h1>
        <form class="form" method="post" data-remote="true">
            <div class="form-item upload-avatar" data-droppable="">
                <div class="avatar-wrapper">
                    <img class="avatar" src="/Store/source/uploads/thumb_71d4bed6e310e27cbeeedad3d3c129ad.jpg">
                    <div class="loading"></div>
                </div>
                <div class="link-upload" data-url="/members/a81e5af9f0bf4e85a9fa7adec3e24660/avatars/" style="position: relative; overflow: hidden; direction: ltr;">
                  <a id="btn-upload" href="javascript:;">选择新图标</a>
                <input type="file" title="添加附件" name="upload-file" tabindex="-1" style="position: absolute; right: 0px; top: 0px; font-family: Arial; font-size: 118px; margin: 0px; padding: 0px; cursor: pointer; opacity: 0;"></div>
                <p class="desc">你可以选择png/jpg图片(100*100)作为星铺图标</p>
            </div>
            <div class="form-item">
                <div class="form-label">
                    <label for="txt-email">星铺名称</label>
                </div>
                <div class="form-field">
                    <input type="text" name="email" id="txt-email" autocomplete="off" value="小小店铺" data-validate="email" data-validate-msg="请输入一个有效的邮箱地址">
                </div>
            </div>
            <div class="form-item">
                <div class="form-label">
                    <label for="txt-email">邮箱</label>
                </div>
                <div class="form-field">
                    <input type="text" name="email" id="txt-email" autocomplete="off" value="noskycn@vip.qq.com" data-validate="email" data-validate-msg="请输入一个有效的邮箱地址">
                </div>
            </div>
            <div class="form-item">
                <div class="form-label">
                    <label for="txt-nickname">昵称</label>
                </div>
                <div class="form-field">
                    <input type="text" name="nickname" id="txt-nickname" autocomplete="off" value="沈能洲" data-validate="required;length:1,255" data-validate-msg="人在江湖飘，总得有名号;昵称最长255个字符">
                </div>
            </div>
            <div class="form-item">
                <label class="form-label" for="txt-old-password">现有密码</label>
                <div class="form-field">
                    <input type="password" id="txt-old-password" autocomplete="off" data-validate="length:6;custom" 
                        data-validate-msg="登录密码需要至少有6位;" />
                  <p class="desc">不修改密码则不需要填写此项</p>
                </div>
            </div>
            <div class="form-item">
                <label class="form-label" for="txt-password">新密码</label>
                <div class="form-field">
                    <input type="password" id="txt-password" autocomplete="off" data-validate="length:6;custom" 
                        data-validate-msg="登录密码需要至少有6位;" />
                      <p class="desc">修改密码请先输入现有密码，强烈建议密码同时包含字母、数字和标点符号。</p>
                </div>
            </div>
            <div class="form-buttons">
                <button class="btn" id="btn-save" data-disable-with="正在保存..." data-success-text="保存成功">保存</button>
            </div>
        </form>
    </div>
</div>
<!--{/content}-->
<!--{content foot}-->
<!--{/content}-->