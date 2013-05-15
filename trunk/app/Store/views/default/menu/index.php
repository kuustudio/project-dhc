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
            <a href="javascript:;" class="btn btn-mini">创建新系列</a>
        </h3>
        <div class="dishlists-wrap">
            <div class="dishlist-form hide">
                <form class="form" method="post">
                    <input type="text" class="category-name" name="category_name" placeholder="请填写系列名称" data-validate="required;length:1,100" data-validate-msg="名称不能不填哦 ~_~;名称太长了哦 ~_~" />
                    <p>
                      <button type="button" class="btn btn-create-dishlist btn-primary" data-disable-with="正在保存...">保存，开始创建系列</button>
                      <button type="button" class="btn btn-x btn-cancel-dishlist">取消</button>
                    </p>
                </form>
            </div>
            <div class="dishlists">
                <?php foreach($categorys as $category){ ?>
                <div class="dishlist">
                    <div class="title">
                        <h4><?php echo $category['category_name']; ?></h4>
                    </div>
                    <ul class="dishs">
                        <li class="dish">
                            <div class="dish-wrap">
                                <span class="dish-content">
                                    <a href="#">回锅肉盖浇饭</a>
                                </span>
                                <a class="label" href="#" data-stack="">
                                    46.30元
                                </a>
                            </div>
                        </li>
                        <li class="dish">
                            <div class="dish-wrap">
                                <span class="dish-content">
                                    <a href="#">回锅肉盖浇饭</a>
                                </span>
                                <a class="label" href="#" data-stack="">
                                    46.30元
                                </a>
                            </div>
                        </li>
                        <li class="dish">
                            <div class="dish-wrap">
                                <span class="dish-content">
                                    <a href="#">回锅肉盖浇饭</a>
                                </span>
                                <a class="label" href="#" data-stack="">
                                    46.30元
                                </a>
                            </div>
                        </li>
                        <li class="dish">
                            <div class="dish-wrap">
                                <span class="dish-content">
                                    <a href="#">回锅肉盖浇饭</a>
                                </span>
                                <a class="label" href="#" data-stack="">
                                    46.30元
                                </a>
                            </div>
                        </li>
                    </ul>
                    <ul class="dish-new-wrap">
                        <li class="new-dish">
                            <a href="javascript:;" class="btn btn-mini btn-new-dish">添加新菜品</a>
                        </li>
                        <li class="dish-form hide">
                            <form class="form" method="post">
                                <input type="text" class="dish-name" name="dish_name" placeholder="请填写菜品名称" data-validate="required;length:1,100" data-validate-msg="名称不能不填哦 ~_~;名称太长了哦 ~_~" />
                                <input type="text" class="dish-price price" name="dish_price" placeholder="门市价" data-validate="required" data-validate-msg="门市价不能不填哦 ~_~" /> 元
                                <div class="create-buttons">
                                    <button type="button" class="btn btn-primary btn-create-dish" data-disable-with="正在保存...">保存，继续添加</button>
                                    <button type="button" class="btn btn-x btn-cancel-dish">取消</button>
                                </div>
                            </form>
                        </li>
                    </ul>
                </div>
                <?php } ?>
            </div>
        </div>
    </div>
    <script type="text/html" id="tpl-dishlist">
        <li class="dish">
            <div class="dish-wrap">
                <span class="dish-content">
                    <a href="javascript:;">{{dish_name}}</a>
                </span>
                <a class="label" href="javascript:;">
                    {{dish_price}}元
                </a>
            </div>
        </li>
    </script>
    <script type="text/html" id="tpl-dishlist">
        <div class="dishlist">
            <div class="title">
                <h4>{{category_name}}</h4>
            </div>
            <ul class="dishs">
            </ul>
            <ul class="dish-new-wrap">
                <li class="new-dish">
                    <a href="javascript:;" class="btn btn-mini btn-new-dish">添加新菜品</a>
                </li>
                <li class="dish-form hide" style="display: list-item;">
                    <form class="form" method="post">
                        <input type="text" class="dish-name" name="dish_name" placeholder="请填写菜品名称" data-validate="required;length:1,100" data-validate-msg="名称不能不填哦 ~_~;名称太长了哦 ~_~">
                        <input type="text" class="dish-price price" name="dish_price" placeholder="门市价" data-validate="required" data-validate-msg="门市价不能不填哦 ~_~"> 元
                        <div class="create-buttons">
                            <button type="button" class="btn btn-primary btn-create-dish" data-disable-with="正在保存...">保存，继续添加</button>
                            <button type="button" class="btn btn-x btn-cancel-dish">取消</button>
                        </div>
                    </form>
                </li>
            </ul>
        </div>
    </script>
</div>
<!--{/content}-->
<!--{content foot}-->
<script type="text/javascript">
var Url = {
    add_dish_category:"<?php echo MONK::_url('dish/adddishcategory')?>",
}
</script>
<script type="text/javascript" src="<?php echo MONK::include_js('jquery','/source/scripts/jquery-2.0.0.min.js',false,true); ?>"></script>
<!--<script type="text/javascript" src="<?php echo MONK::include_js('core','/source/scripts/monk/core.js',false,true); ?>"></script>-->
<script type="text/javascript" src="<?php echo MONK::include_js('menu-index','/Store/source/scripts/menu/index.js',false,true); ?>"></script>
<!--{/content}-->