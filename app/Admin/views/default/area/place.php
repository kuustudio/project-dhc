<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('area-place','/Admin/source/styles/area/place.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2><?php echo $district_name; ?>地点列表 - <a href="<?php echo MONK::_url('*/addplace',array('district_id'=>$district_id,'district_name'=>urlencode($district_name),'city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>">添加地点</a> - <a href="<?php echo MONK::_url('*/district',array('city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>"><?php echo $city_name; ?>区域列表</a> - <a href="<?php echo MONK::_url('*/city'); ?>">城市列表</a></h2>
<div class="main">
    <dl class="list">
        <?php if(!empty($status)){ ?>
        <dd>
            <div class="<?php echo $status; ?>"><p><?php echo $message; ?></p><div>
        </dd>
        <?php } ?>
        <dt>
            <ul>
                <li class="place-id">ID</li>
                <li class="place-name">地点名</li>
                <li class="city-name">城市</li>
                <li class="district-name">地区</li>
                <li class="place-type">类型</li>
                <li class="start-with">字母</li>
                <li class="long-lat">经纬度</li>
                <li>操作</li>
            </ul>
        </dt>
        <?php foreach($list as $place){ ?>
        <dd>
            <ul>
                <li class="place-id"><?php echo $place['place_id']; ?></li>
                <li class="place-name"><?php echo $place['place_name']; ?></li>
                <li class="city-name"><?php echo $city_name; ?></li>
                <li class="district-name"><?php echo $district_name; ?></li>
                <li class="place-type"><?php echo $place_types[$place['place_type']]; ?></li>
                <li class="start-with"><?php echo $place['start_with']; ?></li>
                <li class="long-lat"><?php echo $place['long_lat']; ?></li>
                <li><a href="http://api.map.baidu.com/geocoder?location=<?php echo $place['long_lat']; ?>&key=52490bdd2448a23c3e87613df57079a9&output=json">Geo</a> | <a href="<?php echo MONK::_url('*/editplace',array('place_id'=>$place['place_id'],'district_id'=>$place['district_id'],'district_name'=>urlencode($district_name),'city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>">编辑</a> | <a href="<?php echo MONK::_url('*/deleteplace',array('place_id'=>$place['place_id'],'district_id'=>$place['district_id'],'district_name'=>urlencode($district_name),'city_id'=>$city_id,'city_name'=>urlencode($city_name))); ?>">删除</a></li>
            </ul>
        </dd>
        <?php } ?>
    </dl>
    <div class="page-bar"><?php echo $pageBar; ?></div>
<div>
<!--{/content}-->