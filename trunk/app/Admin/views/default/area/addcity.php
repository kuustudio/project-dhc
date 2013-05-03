<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('area-addcity','/Admin/source/styles/area/addcity.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2>添加城市</h2>
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
                <option value="1">北京</option>
                <option value="2">上海</option>
                <option value="3">天津</option>
                <option value="4">重庆</option>
                <option value="5">浙江</option>
                <option value="6">广东</option>
                <option value="7">江苏</option>
                <option value="8">山东</option>
                <option value="9">香港</option>
                <option value="10">澳门</option>
                <option value="11">台湾</option>
                <option value="12">河北</option>
                <option value="13">辽宁</option>
                <option value="14">四川</option>
                <option value="15">河南</option>
                <option value="16">湖北</option>
                <option value="17">福建</option>
                <option value="18">湖南</option>
                <option value="19">黑龙江</option>
                <option value="20">山西</option>
                <option value="21">安徽</option>
                <option value="22">内蒙古</option>
                <option value="23">吉林</option>
                <option value="24">广西</option>
                <option value="25">江西</option>
                <option value="26">陕西</option>
                <option value="27">云南</option>
                <option value="28">新疆</option>
                <option value="29">贵州</option>
                <option value="30">甘肃</option>
                <option value="31">海南</option>
                <option value="32">宁夏</option>
                <option value="33">青海</option>
                <option value="34">西藏</option>
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
            <label>经纬度：</label>
            <input type="text" name="long_lat" />
        </dd>
        <dd>
            <button type="submit">提交</button>
        </dd>
    </dl>
    </form>
<div>
<!--{/content}-->