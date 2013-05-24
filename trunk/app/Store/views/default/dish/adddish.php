<!--{@page layout='base'}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('dish-adddish','/Store/source/styles/dish/adddish.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="bd sheet">
    <div class="sheet-header">
        <a class="link-parent-sheet" data-stack="" data-stack-replace="" href="<?php echo MONK::_url('menu/index')?>" data-restore-position="true">菜单管理</a>
    </div>
    <div class="bd sheet sheet-active">
        <div class="page-inner">
            <div class="dialog-new-dish-category">
                <h3>添加新菜品</h3>
            </div>
            <form class="form" method="post">
                <div class="form-item">
                    <div class="form-field">
                        <input type="text" name="dish_name" placeholder="请填写菜品名称">
                    </div>
                    <?php if($name=='dish_name'){ ?><div class="error"><i></i><?php echo urldecode($msg); ?></div><?php } ?>
                </div>
                <div class="form-item">
                    <div class="form-field">
                        <textarea name="dish_info" placeholder="简单介绍下该菜品"></textarea>
                    </div>
                    <?php if($name=='dish_info'){ ?><div class="error"><i></i><?php echo urldecode($msg); ?></div><?php } ?>
                </div>
                <div class="form-buttons">
                    <button class="btn btn-primary" id="btn-post" type="submit">添加</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!--{/content}-->