<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('form','/Admin/source/styles/form.css',false,true); ?>">
<link rel="stylesheet" href="<?php echo MONK::include_css('area-adddistrict','/Admin/source/styles/area/adddistrict.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2>添加地点 - <a href="<?php echo MONK::_url('*/place',array('district_id'=>$district_id,'district_name'=>urlencode($district_name),'city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>"><?php echo $district_name; ?>地点列表</a> - <a href="<?php echo MONK::_url('*/district',array('city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>"><?php echo $city_name; ?>区域列表</a> - <a href="<?php echo MONK::_url('*/city'); ?>">城市列表</a></h2>
<div class="main">
    <form method="post">
    <input type="hidden" name="city_id" value="<?php echo $city_id; ?>" />
    <input type="hidden" name="district_id" value="<?php echo $district_id; ?>" />
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
            <label>区域：</label>
            <?php echo $district_name; ?>
        </dd>
        <dd>
            <label>地点名称：</label>
            <input type="text" name="place_name" />
        </dd>
        <dd>
            <label>详细地址：</label>
            <input class="title" type="text" name="place_info" />
        </dd>
        <dd>
            <label>地点类型：</label>
            <select name="place_type">
                <?php foreach($place_types as $v=>$t){ ?>
                <option value="<?php echo $v; ?>"><?php echo $t; ?></option>
                <?php } ?>
            </select>
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