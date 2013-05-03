<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('store-category','/Admin/source/styles/store/category.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2>星铺分类</h2>
<div class="main">
    <ul>
        <li class="title"><label><b>ID</b></label><span><b>分类名</b></span></li>
        <?php foreach($categorys as $id=>$name){ ?>
        <li><label><?php echo $id; ?></label><?php echo $name; ?></li>
        <?php } ?>
    </ul>
<div>
<!--{/content}-->