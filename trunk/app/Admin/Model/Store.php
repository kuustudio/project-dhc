<?php
class Admin_Model_Store extends model {
    public function __construct(){
        parent::__construct();
    }

    public $_store_categorys = array(
        1   => '快餐',
        2   => '火锅',
        3   => '烧烤',
        4   => '西餐',
        5   => '海鲜',
        6   => '地方菜',
        7   => '烤鱼',
        8   => '麻辣香锅',
        9   => '日韩料理',
        10  => '蛋糕',
        11  => '其他',
    );
}