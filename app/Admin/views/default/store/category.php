<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('store-category','/Admin/source/styles/store/category.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2>星铺分类</h2>
<div class="main">
    <dl class="list">
        <dt>
            <ul>
                <li class="category-id">ID</li>
                <li class="category-name">分类名</li>
            </ul>
        </dt>
        <?php foreach($categorys as $id=>$name){ ?>
        <dd>
            <ul>
                <li class="category-id"><?php echo $id; ?></li>
                <li class="category-name"><?php echo $name; ?></li>
            </ul>
        </dd>
        <?php } ?>
    </dl>
<div>
<!--{/content}-->