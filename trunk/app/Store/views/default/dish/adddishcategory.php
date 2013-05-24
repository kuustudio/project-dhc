<!--{@page layout='base'}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('dish-adddishcategory','/Store/source/styles/dish/adddishcategory.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="bd sheet">
    <div class="sheet-header">
        <a class="link-parent-sheet" data-stack="" data-stack-replace="" href="<?php echo MONK::_url('menu/index')?>" data-restore-position="true">菜单管理</a>
    </div>
    <div class="bd sheet sheet-active">
        <div class="page-inner">
            <div class="dialog-new-dish-category">
                <h3>创建新系列</h3>
            </div>
            <form class="form" method="post">
                <div class="form-item">
                    <div class="form-field">
                        <input type="text" name="category_name" placeholder="请填写系列名称">
                    </div>
                    <?php if($name=='category_name'){ ?><div class="error"><i></i><?php echo urldecode($msg); ?></div><?php } ?>
                </div>
                <div class="form-buttons">
                    <button class="btn btn-primary" id="btn-post" type="submit">创建</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!--{/content}-->