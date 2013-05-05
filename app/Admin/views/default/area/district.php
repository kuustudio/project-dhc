<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('area-district','/Admin/source/styles/area/district.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2><?php echo $city_name; ?>区域列表 - <a href="<?php echo MONK::_url('*/adddistrict',array('city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>">添加区域</a> - <a href="<?php echo MONK::_url('*/city'); ?>">城市列表</a></h2>
<div class="main">
    <dl class="list">
        <?php if(!empty($status)){ ?>
        <dd>
            <div class="<?php echo $status; ?>"><p><?php echo $message; ?></p><div>
        </dd>
        <?php } ?>
        <dt>
            <ul>
                <li class="district-id">ID</li>
                <li class="district-name">区域名</li>
                <li class="city-name">城市</li>
                <li class="start-with">字母</li>
                <li class="long-lat">经纬度</li>
                <li>操作</li>
            </ul>
        </dt>
        <?php foreach($districts as $district){ ?>
        <dd>
            <ul>
                <li class="district-id"><?php echo $district['district_id']; ?></li>
                <li class="district-name"><?php echo $district['district_name']; ?></li>
                <li class="city-name"><?php echo $district['city_name']; ?></li>
                <li class="start-with"><?php echo $district['start_with']; ?></li>
                <li class="long-lat"><?php echo $district['long_lat']; ?></li>
                <li><a href="http://api.map.baidu.com/geocoder?location=<?php echo $district['long_lat']; ?>&key=52490bdd2448a23c3e87613df57079a9&output=json">Geo</a> | <a href="<?php echo MONK::_url('*/editdistrict',array('district_id'=>$district['district_id'],'city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>">编辑</a> | <a href="<?php echo MONK::_url('*/deletedistrict',array('district_id'=>$district['district_id'],'city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>">删除</a> | <a href="<?php echo MONK::_url('*/place',array('district_id'=>$district['district_id'],'district_name'=>urlencode($district['district_name']),'city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>">地点</a></li>
            </ul>
        </dd>
        <?php } ?>
    </dl>
<div>
<!--{/content}-->