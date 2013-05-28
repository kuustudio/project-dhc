<?php
class Custom_Model_Menu extends model {

    private $sqls = array(
        'get_all_by_place' => 'select *,(ACOS(SIN(([@lat] * 3.1415) / 180 ) *SIN((latitude * 3.1415) / 180 ) +COS(([@lat] * 3.1415) / 180 ) * COS((latitude * 3.1415) / 180 ) *COS(([@lon]* 3.1415) / 180 - (longitude * 3.1415) / 180 ) ) * 6380) as `distance` from `store` where `is_online`=1 and `store_places` like \'%,[@place_id],%\' order by `distance` asc limit [@page_index],[@frame_length];',
    );

    public function __construct(){
        parent::__construct();
    }

    public function get_all_by_place($place_id, $p_lat, $p_lon, $frame = 1, $frame_step = 0.2, $page = 1, $page_size = 100){
        if(empty($place_id) || empty($p_lat) || empty($p_lon)) return false;
        $page_index = ($page>=1)?($page-1)*$page_size:0;
        $frame_length = $page_size*$frame_step;
        $frame_index = ($frame>=1)?($frame-1)*$frame_length:0;
        return mysql::fetch('store', $this->sqls['get_all_by_place'], array('place_id'=>$place_id,'lat'=>$p_lat,'lon'=>$p_lon,'page_index'=>$page_index+$frame_index,'frame_length'=>$frame_length));
    }

}