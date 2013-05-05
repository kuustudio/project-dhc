<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('form','/Admin/source/styles/form.css',false,true); ?>">
<link rel="stylesheet" href="<?php echo MONK::include_css('area-addcity','/Admin/source/styles/area/addcity.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2>添加城市 - <a href="<?php echo MONK::_url('*/city'); ?>">城市列表</a></h2>
<div class="main">
    <form method="post">
    <dl>
        <?php if(!empty($status)){ ?>
        <dd>
            <div class="<?php echo $status; ?>"><p><?php echo $message; ?></p><div>
        </dd>
        <?php } ?>
        <dd>
            <label>省/直辖市：</label>
            <select class="_parent_province" name="parent_province">
                <?php foreach($china_provinces as $v=>$t){ ?>
                <option value="<?php echo $v; ?>"><?php echo $t; ?></option>
                <?php } ?>
            </select>
        </dd>
        <dd>
            <label>城市名称：</label>
            <input type="text" name="city_name" />
        </dd>
        <dd>
            <label>开头字母：</label>
            <input class="num" type="text" name="start_with" />
        </dd>
        <dd>
            <button type="submit">提交</button>
        </dd>
    </dl>
    </form>
<div>
<!--{/content}-->