<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('menu-index','/Store/source/styles/menu/index.css',false,true); ?>">
<!--{/content}-->
<!--{content content}-->
<div class="bd sheet sheet-active">
    <div class="page-inner">
        <div class="menu-header">
            <div class="menu-title">菜单管理</div>
            <div class="menu-desc">设置菜单,管理系列及菜品</div>
            <button class="btn btn-primary menu-o2o offline <?php if($menu['is_online'] == 1){?>hide<?php } ?>" data-to-online="1">菜单上线</button>
            <button class="btn menu-o2o online <?php if($menu['is_online'] == 0){?>hide<?php } ?>" data-to-online="0">已上线 √</button>
        </div>
        <h3 class="dish-head">
            <b>菜品系列</b>
            <a href="javascript:;" class="btn btn-mini">创建新系列</a>
        </h3>
        <div class="dishlists-wrap">
            <div class="dishlist-form create hide">
                <form class="form" method="post" action="<?php echo MONK::_url('dish/adddishcategory')?>">
                    <div class="form-item">
                        <div class="form-field">
                            <input type="text" class="category-name" name="category_name" placeholder="请填写系列名称" data-validate="required;length:1,100" data-validate-msg="名称不能不填哦 ~_~;名称太长了哦 ~_~" />
                        </div>
                    </div>
                    <div class="form-item create-btn">
                        <p>
                          <button type="button" class="btn btn-create-dishlist btn-primary" data-disable-with="正在保存...">保存，开始创建系列</button>
                          <button type="button" class="btn btn-x btn-cancel-dishlist">取消</button>
                        </p>
                    </div>
                </form>
            </div>
            <div class="dishlists">
                <?php foreach($categorys as $category){ ?>
                <div class="dishlist" data-category-id="<?php echo $category['category_id']; ?>" data-category-name="<?php echo $category['category_name']; ?>">
                    <div class="title">
                        <h4><?php echo $category['category_name']; ?></h4> 
                        <a class="edit-dishlist" href="javascript:;">编辑</a> 
                        <a class="delete-dishlist" href="javascript:;">删除</a>
                    </div>
                    <ul class="dishs">
                        <?php foreach($dishs as $dish){ ?>
                            <?php if($dish['category_id'] == $category['category_id']){?>
                            <li class="dish" data-dish-id="<?php echo $dish['dish_id']; ?>" data-dish-name="<?php echo $dish['dish_name']; ?>" data-dish-price="<?php echo $dish['dish_price']; ?>">
                                <div class="dish-wrap">
                                    <span class="dish-content">
                                        <?php echo $dish['dish_name']; ?>
                                    </span>
                                    <em><?php echo $dish['dish_price']; ?></em>
                                </div>
                                <div class="actions">
                                    <a class="label push-dish <?php if($dish['dish_push'] == 1){ ?>on<?php } ?>" data-disable-with="正在执行..." href="javascript:;" data-dish-push="<?php echo $dish['dish_push']; ?>">上架</a>
                                    <a class="label dish-img <?php if(!empty($dish['dish_logo'])){ ?>on<?php } ?>" href="javascript:;" data-dish-img="<?php echo $dish['dish_logo']; ?>">图</a> 
                                    <a class="label dish-info <?php if(!empty($dish['dish_info'])){ ?>on<?php } ?>" href="javascript:;" data-dish-info="<?php echo $dish['dish_info']; ?>">文</a> 
                                    <a class="label edit-dish" href="javascript:;">改</a> 
                                    <a class="label delete-dish" data-disable-with="正在删除..." href="javascript:;">删</a>
                                </div>
                            </li>
                            <?php } ?>
                        <?php } ?>
                    </ul>
                    <ul class="dish-new-wrap">
                        <li class="new-dish">
                            <a href="javascript:;" class="btn btn-mini btn-new-dish">添加新菜品</a>
                        </li>
                        <li class="dish-form hide">
                            <form class="form" action="<?php echo MONK::_url('dish/adddish')?>" method="post">
                                <div class="form-item">
                                    <div class="form-field">
                                        <input type="text" class="dish-name" name="dish_name" placeholder="请填写菜品名称" data-validate="required;length:1,100" data-validate-msg="名称不能不填哦 ~_~;名称太长了哦 ~_~" />
                                    </div>
                                </div>
                                <div class="form-item">
                                    <div class="form-field">
                                        <input type="text" class="dish-price price" name="dish_price" placeholder="门市价" data-validate="required" data-validate-msg="门市价不能不填哦 ~_~" /> 元
                                    </div>
                                </div>
                                <div class="form-item create-btn">
                                    <div class="create-buttons">
                                        <button type="button" class="btn btn-primary btn-create-dish" data-disable-with="正在努力保存...">保存，继续添加</button>
                                        <button type="button" class="btn btn-x btn-cancel-dish">取消</button>
                                    </div>
                                </div>
                            </form>
                        </li>
                    </ul>
                </div>
                <?php } ?>
            </div>
        </div>
    </div>
    <!-- 系列 -->
    <script type="text/tpl" id="tpl-dishlist">
        <div class="dishlist" data-category-id="{category_id}" data-category-name="{category_name}">
            <div class="title">
                <h4>{category_name}</h4>
                <a class="edit-dishlist" href="javascript:;">编辑</a> 
                <a class="delete-dishlist" href="javascript:;">删除</a>
            </div>
            <ul class="dishs">
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
    </script>
    <!-- 系列修改表单 -->
    <script type="text/tpl" id="tpl-update-dishlist-form">
        <div class="dishlist-form edit">
            <form class="form" method="post" action="<?php echo MONK::_url('dish/editdishcategory')?>">
                <input type="text" class="category-name" name="category_name" placeholder="请填写系列名称" value="{category_name}" data-validate="required;length:1,100" data-validate-msg="名称不能不填哦 ~_~;名称太长了哦 ~_~" />
                <p>
                  <button type="button" class="btn btn-update-dishlist btn-primary" data-disable-with="正在保存...">保存</button>
                  <button type="button" class="btn btn-x btn-cancel-dishlist">取消</button>
                </p>
            </form>
        </div>
    </script>
    <!-- 系列删除确认 -->
    <script type="text/tpl" id="tpl-dishlist-delete-form">
        <div class="inner-tip">
            <div class="inr">
                <form class="form" action="<?php echo MONK::_url('dish/deletedishcategory')?>" method="post">
                    <p class="desc">{msg}</p>
                    <button type="button" class="btn btn-x">取消</button>
                    <button type="button" class="btn btn-primary {key}" data-disable-with="删除中">确定</button>
                </form>
            </div>
            <div class="arrow" style="left:{left}px"></div>
        </div>
    </script>
    <!-- 菜品 -->
    <script type="text/tpl" id="tpl-dish">
        <li class="dish" data-dish-id="{dish_id}" data-dish-name="{dish_name}" data-dish-price="{dish_price}">
            <div class="dish-wrap">
                <span class="dish-content">
                    {dish_name}
                </span>
                <em>{dish_price}</em>
            </div>
            <div class="actions">
                <a class="label push-dish" data-disable-with="正在执行..." href="javascript:;" data-dish-push="0">上架</a>
                <a class="label dish-img" href="javascript:;" data-dish-img="">图</a> 
                <a class="label dish-info" href="javascript:;" data-dish-info="">文</a> 
                <a class="label edit-dish" href="javascript:;">改</a> 
                <a class="label delete-dish" data-disable-with="正在删除..." href="javascript:;">删</a>
            </div>
        </li>
    </script>
    <!-- 菜品修改表单 -->
    <script type="text/tpl" id="tpl-dish-update-form">
        <div class="dish-form edit">
            <form class="form" action="<?php echo MONK::_url('dish/editdish')?>" method="post">
                <div class="form-item">
                    <div class="form-field">
                        <input type="text" class="dish-name" name="dish_name" placeholder="请填写菜品名称" value="{dish_name}" data-validate="required;length:1,100" data-validate-msg="名称不能不填哦 ~_~;名称太长了哦 ~_~" />
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-field">
                        <input type="text" class="dish-price price" name="dish_price" placeholder="门市价" value="{dish_price}" data-validate="required" data-validate-msg="门市价不能不填哦 ~_~" /> 元
                    </div>
                </div>
                <div class="form-item update-btn">
                    <div class="update-buttons">
                        <button type="button" class="btn btn-primary btn-update-dish" data-disable-with="正在努力保存...">保存</button>
                        <button type="button" class="btn btn-x btn-cancel-dish">取消</button>
                    </div>
                </div>
            </form>
        </div>
    </script>
    <!-- 图 -->
    <script type="text/tpl" id="tpl-dish-img-upload-form">
        <div class="inner-dialog">
            <h3>菜品图片</h3><i>×</i>
            <div class="inr">
                <form class="form" action="{action}" method="post" enctype="multipart/form-data">
                    <div class="img-placeholder"><span>无图片</span></div>
                    <div class="link-upload">
                        <a id="btn-upload" href="javascript:;">选择图片</a>
                        <input type="file" title="添加图片" name="upload_file">
                    </div>
                    <p class="desc">图片格式gif/png/jpg</p>
                    <p class="desc">图片尺寸120*80</p>
                    <p class="desc">(图片流量大,请谨慎)</p>
                </form>
            </div>
            <div class="arrow img"></div>
        </div>
    </script>
    <!-- 文 -->
    <script type="text/tpl" id="tpl-update-dish-info-form">
        <div class="inner-dialog">
            <h3>菜品简介</h3><i>×</i>
            <div class="inr">
                <form class="form" action="{action}" method="post">
                    <textarea class="dish-info-text">{info}</textarea>
                    <button class="btn btn-primary" data-disable-with="正在保存...">保存</button>
                </form>
            </div>
            <div class="arrow info"></div>
        </div>
    </script>
    <div class="shade <?php if($menu['is_online'] == 0){?>hide<?php } ?>"></div>
</div>
<!--{/content}-->
<!--{content foot}-->
<script type="text/javascript">
var Url = {
    push_online:'<?php echo MONK::_url('*/pushonline'); ?>',
    delete_dish:'<?php echo MONK::_url('dish/deletedish'); ?>',
    push_dish:'<?php echo MONK::_url('dish/pushdish'); ?>',
}
</script>
<script type="text/javascript" src="<?php echo MONK::include_js('jquery','/source/scripts/jquery-2.0.0.min.js',false,true); ?>"></script>
<!--<script type="text/javascript" src="<?php echo MONK::include_js('core','/source/scripts/monk/core.js',false,true); ?>"></script>-->
<script type="text/javascript" src="<?php echo MONK::include_js('menu-index','/Store/source/scripts/menu/index.js',false,true); ?>"></script>
<!--{/content}-->