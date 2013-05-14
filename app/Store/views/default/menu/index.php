<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('menu-index','/Store/source/styles/menu/index.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="bd sheet sheet-active">
    <div class="page-inner">
        <div class="menu-header">
            <div class="menu-title">菜单管理</div>
            <div class="menu-desc">菜品及分类的管理以及菜单设置并发布</div>
        </div>
        <h3 class="dish-head">
            <b>菜品系列</b>
            <a href="<?php echo MONK::_url('dish/adddishcategory')?>" class="btn btn-mini">创建新系列</a>
        </h3>
        <div class="dishlists-wrap">
            <div class="dishlists">
                <div class="dishlist">
                    <div class="title">
                        <h4>盖浇饭洗列</h4>
                    </div>
                    <ul class="dishs">
                        <li class="dish">
                            <div class="dish-wrap">
                                <span class="todo-content">
                                    <a href="#">回锅肉盖浇饭</a>
                                </span>
                                <a class="label" href="#" data-stack="">
                                    2条评论
                                </a>
                            </div>
                        </li>
                        <li class="dish">
                            <div class="dish-wrap">
                                <span class="todo-content">
                                    <a href="#">回锅肉盖浇饭</a>
                                </span>
                                <a class="label" href="#" data-stack="">
                                    2条评论
                                </a>
                            </div>
                        </li>
                        <li class="dish">
                            <div class="dish-wrap">
                                <span class="todo-content">
                                    <a href="#">回锅肉盖浇饭</a>
                                </span>
                                <a class="label" href="#" data-stack="">
                                    2条评论
                                </a>
                            </div>
                        </li>
                        <li class="dish">
                            <div class="dish-wrap">
                                <span class="todo-content">
                                    <a href="#">回锅肉盖浇饭</a>
                                </span>
                                <a class="label" href="#" data-stack="">
                                    2条评论
                                </a>
                            </div>
                        </li>
                    </ul>
                    <ul class="dish-new-wrap">
                        <li>
                            <a href="<?php echo MONK::_url('dish/adddish')?>" class="btn btn-mini btn-new-dish">添加新菜品</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!--{/content}-->
<!--{content foot}-->
<script type="text/javascript">

</script>
<!--{/content}-->