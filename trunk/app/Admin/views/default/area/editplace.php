<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('form','/Admin/source/styles/form.css',false,true); ?>">
<link rel="stylesheet" href="<?php echo MONK::include_css('area-adddistrict','/Admin/source/styles/area/adddistrict.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2>编辑地点 - <a href="<?php echo MONK::_url('*/place',array('district_id'=>$district_id,'district_name'=>urlencode($district_name),'city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>"><?php echo $district_name; ?>地点列表</a> - <a href="<?php echo MONK::_url('*/district',array('city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>"><?php echo $city_name; ?>区域列表</a> - <a href="<?php echo MONK::_url('*/city'); ?>">城市列表</a></h2>
<div class="main">
    <form method="post">
    <input type="hidden" name="place_id" value="<?php echo $place['place_id']?>" />
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
            <input type="text" name="place_name" value="<?php echo $place['place_name']; ?>" />
        </dd>
        <dd>
            <label>详细地址：</label>
            <input class="title" type="text" name="place_info" value="<?php echo $place['place_info']; ?>" />
        </dd>
        <dd>
            <label>地点类型：</label>
            <select name="place_type">
                <?php foreach($place_types as $v=>$t){ ?>
                <option value="<?php echo $v; ?>" <?php if($place['place_type']==$v) { echo 'selected=selected'; } ?>><?php echo $t; ?></option>
                <?php } ?>
            </select>
        </dd>
        <dd>
            <label>开头字母：</label>
            <input class="num" type="text" name="start_with" value="<?php echo $place['start_with']; ?>" />
        </dd>
        <dd>
            <label>经纬度：</label>
            <input type="text" disabled=disabled name="long_lat" value="<?php echo $place['long_lat']; ?>" />
        </dd>
        <dd>
            <button type="submit">更新</button>
        </dd>
    </dl>
    </form>
<div>
<!--{/content}-->