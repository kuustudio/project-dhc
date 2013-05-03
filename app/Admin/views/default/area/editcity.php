<!--{@page layout="base"}-->
<!--{content head}-->
<link rel="stylesheet" href="<?php echo MONK::include_css('area-addcity','/Admin/source/styles/area/addcity.css',false,true); ?>">
<!--{/content}--> 
<!--{content body}-->
<h2>编辑城市</h2>
<div class="main">
    <form method="post">
    <input type="hidden" name="city_id" value="<?php echo $city['city_id']; ?>" />
    <dl>
        <?php if(!empty($status)){ ?>
        <dd>
            <div class="<?php echo $status; ?>"><p><?php echo $message; ?></p><div>
        </dd>
        <?php } ?>
        <dd>
            <label>省/直辖市：</label>
            <select class="_parent_province" name="parent_province">
                <option value="1" <?php if($city['parent_province']==1) { echo 'selected=selected'; } ?>>北京</option>
                <option value="2" <?php if($city['parent_province']==2) { echo 'selected=selected'; } ?>>上海</option>
                <option value="3" <?php if($city['parent_province']==3) { echo 'selected=selected'; } ?>>天津</option>
                <option value="4" <?php if($city['parent_province']==4) { echo 'selected=selected'; } ?>>重庆</option>
                <option value="5" <?php if($city['parent_province']==5) { echo 'selected=selected'; } ?>>浙江</option>
                <option value="6" <?php if($city['parent_province']==6) { echo 'selected=selected'; } ?>>广东</option>
                <option value="7" <?php if($city['parent_province']==7) { echo 'selected=selected'; } ?>>江苏</option>
                <option value="8" <?php if($city['parent_province']==8) { echo 'selected=selected'; } ?>>山东</option>
                <option value="9" <?php if($city['parent_province']==9) { echo 'selected=selected'; } ?>>香港</option>
                <option value="10" <?php if($city['parent_province']==10) { echo 'selected=selected'; } ?>>澳门</option>
                <option value="11" <?php if($city['parent_province']==11) { echo 'selected=selected'; } ?>>台湾</option>
                <option value="12" <?php if($city['parent_province']==12) { echo 'selected=selected'; } ?>>河北</option>
                <option value="13" <?php if($city['parent_province']==13) { echo 'selected=selected'; } ?>>辽宁</option>
                <option value="14" <?php if($city['parent_province']==14) { echo 'selected=selected'; } ?>>四川</option>
                <option value="15" <?php if($city['parent_province']==15) { echo 'selected=selected'; } ?>>河南</option>
                <option value="16" <?php if($city['parent_province']==16) { echo 'selected=selected'; } ?>>湖北</option>
                <option value="17" <?php if($city['parent_province']==17) { echo 'selected=selected'; } ?>>福建</option>
                <option value="18" <?php if($city['parent_province']==18) { echo 'selected=selected'; } ?>>湖南</option>
                <option value="19" <?php if($city['parent_province']==19) { echo 'selected=selected'; } ?>>黑龙江</option>
                <option value="20" <?php if($city['parent_province']==20) { echo 'selected=selected'; } ?>>山西</option>
                <option value="21" <?php if($city['parent_province']==21) { echo 'selected=selected'; } ?>>安徽</option>
                <option value="22" <?php if($city['parent_province']==22) { echo 'selected=selected'; } ?>>内蒙古</option>
                <option value="23" <?php if($city['parent_province']==23) { echo 'selected=selected'; } ?>>吉林</option>
                <option value="24" <?php if($city['parent_province']==24) { echo 'selected=selected'; } ?>>广西</option>
                <option value="25" <?php if($city['parent_province']==25) { echo 'selected=selected'; } ?>>江西</option>
                <option value="26" <?php if($city['parent_province']==26) { echo 'selected=selected'; } ?>>陕西</option>
                <option value="27" <?php if($city['parent_province']==27) { echo 'selected=selected'; } ?>>云南</option>
                <option value="28" <?php if($city['parent_province']==28) { echo 'selected=selected'; } ?>>新疆</option>
                <option value="29" <?php if($city['parent_province']==29) { echo 'selected=selected'; } ?>>贵州</option>
                <option value="30" <?php if($city['parent_province']==30) { echo 'selected=selected'; } ?>>甘肃</option>
                <option value="31" <?php if($city['parent_province']==31) { echo 'selected=selected'; } ?>>海南</option>
                <option value="32" <?php if($city['parent_province']==32) { echo 'selected=selected'; } ?>>宁夏</option>
                <option value="33" <?php if($city['parent_province']==33) { echo 'selected=selected'; } ?>>青海</option>
                <option value="34" <?php if($city['parent_province']==34) { echo 'selected=selected'; } ?>>西藏</option>
            </select>
        </dd>
        <dd>
            <label>城市名称：</label>
            <input type="text" name="city_name" value="<?php echo $city['city_name']; ?>" />
        </dd>
        <dd>
            <label>开头字母：</label>
            <input class="num" type="text" name="start_with" value="<?php echo $city['start_with']; ?>" />
        </dd>
        <dd>
            <label>经纬度：</label>
            <input type="text" name="long_lat" value="<?php echo $city['long_lat']; ?>" />
        </dd>
        <dd>
            <button type="submit">更新</button>
        </dd>
    </dl>
    </form>
<div>
<!--{/content}-->