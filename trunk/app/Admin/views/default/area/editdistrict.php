<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('form','/Admin/source/styles/form.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2>添加区域 - <a href="<?php echo MONK::_url('*/district',array('city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>"><?php echo $city_name; ?>区域列表</a> - <a href="<?php echo MONK::_url('*/city'); ?>">城市列表</a></h2>
<div class="main">
    <form method="post">
    <input type="hidden" name="district_id" value="<?php echo $district['district_id']?>" />
    <dl>
        <?php if(!empty($status)){ ?>
        <dd>
            <div class="<?php echo $status; ?>"><p><?php echo $message; ?></p><div>
        </dd>
        <?php } ?>
        <dd>
            <label>城市：</label>
            <?php echo $city_name; ?>
        </dd>
        <dd>
            <label>区域名称：</label>
            <input type="text" name="district_name" value="<?php echo $district['district_name']?>" />
        </dd>
        <dd>
            <label>开头字母：</label>
            <input class="num" type="text" name="start_with" value="<?php echo $district['start_with']?>" />
        </dd>
        <dd>
            <label>经纬度：</label>
            <input type="text" name="long_lat" value="<?php echo $district['long_lat']?>" />
        </dd>
        <dd>
            <button type="submit">更新</button>
        </dd>
    </dl>
    </form>
<div>
<!--{/content}-->