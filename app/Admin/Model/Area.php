<?php
class Admin_Model_Area extends model {
    public function __construct(){
        parent::__construct();
    }

    private $sqls = array(
        'create_city'  => 'insert into `area_city`(`city_name`,`parent_province`,`start_with`,`long_lat`,`created`,`updated`) values([@city_name],[@parent_province],[@start_with],[@long_lat],[@created],[@updated])',
        'update_city'  => 'update `area_city` set `city_name`=[@city_name],`parent_province`=[@parent_province],`start_with`=[@start_with],`long_lat`=[@long_lat],`updated`=[@updated] where `city_id` = [@city_id]',
        'delete_city'  => 'delete from `area_city` where `city_id` = [@city_id]',
        'get_city_page' => 'select `city_id`,`city_name`,`parent_province`,`start_with`,`long_lat`,`created`,`updated` from `area_city` order by `updated` desc limit [@page_index],[@page_size];',
        'get_city_all_count' => 'select count(1) as c from `area_city`;',
        'get_city_by_id'  => 'select `city_id`,`city_name`,`parent_province`,`start_with`,`long_lat` from `area_city` where `city_id` = [@city_id];',
    );

    public $_china_provinces = array(
        '1' => '北京',
        '2' => '上海',
        '3' => '天津',
        '4' => '重庆',
        '5' => '浙江',
        '6' => '广东',
        '7' => '江苏',
        '8' => '山东',
        '9' => '香港',
        '10' => '澳门',
        '11' => '台湾',
        '12' => '河北',
        '13' => '辽宁',
        '14' => '四川',
        '15' => '河南',
        '16' => '湖北',
        '17' => '福建',
        '18' => '湖南',
        '19' => '黑龙江',
        '20' => '山西',
        '21' => '安徽',
        '22' => '内蒙古',
        '23' => '吉林',
        '24' => '广西',
        '25' => '江西',
        '26' => '陕西',
        '27' => '云南',
        '28' => '新疆',
        '29' => '贵州',
        '30' => '甘肃',
        '31' => '海南',
        '32' => '宁夏',
        '33' => '青海',
        '34' => '西藏',
    );

    //添加城市
    public function create_city($data){
        $data['created'] = $data['updated'] = time();
        mysql::execute('area_city', $this->sqls['create_city'], $data);
        return mysql::insertId();
    }

    //更新城市
    public function update_city($data){
        $data['updated'] = time();
        mysql::execute('area_city', $this->sqls['update_city'], $data);
        return true;
    }

    //删除城市
    public function delete_city($city_id){
        mysql::execute('area_city', $this->sqls['delete_city'], array('city_id'=>$city_id));
        return true;
    }

    //获取城市分页
    public function get_city_page($page = 1, $page_size = 30){
        $page_index = ($page>=1)?($page-1)*$page_size:0;
        $r = array();
        $r['list'] = array();
        $r['totalCount'] = 0;
        $r['list'] =  mysql::fetch('area_city', $this->sqls['get_city_page'], array('page_index'=>$page_index, 'page_size'=>$page_size));
        $c = mysql::fetch('area_city', $this->sqls['get_city_all_count'], array());
        if(count($c)) $r['totalCount'] = $c[0]['c'];
        return $r;
    }

    //根据ID获取单个城市
    public function get_city_by_id($city_id){
        $city = mysql::fetch('area_city', $this->sqls['get_city_by_id'], array('city_id'=>$city_id));
        if(count($city))
            return array_shift($city);
        else
            return false;
    }
}