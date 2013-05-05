<?php
class Admin_Model_Lbs extends model {

    private $_baidu_key = '52490bdd2448a23c3e87613df57079a9';

    public function __construct(){
        parent::__construct();
    }

    private $sqls = array(
        
    );
    
    /* $components = 'country:ES|locality:AA'
    */
    private function google_geocode($data, $type = 'latlng', $components = '', $sensor = 'false'){
        if($components) $components = '&components='.$components;
        $json = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?'.$type.'='.$data.$components.'&sensor='.$sensor);
        $arr = json_decode($json,true);
        if($arr['status'] != 'OK') return null;
        $result = array_shift($arr['results']);
        return array('lat'=>$result['geometry']['location']['lat'],'lng'=>$result['geometry']['location']['lng']);
    }

    private function baidu_geocode($data, $type = 'location', $city = '', $output = 'json'){
        if($city) $city = '&city='.$city;
        $json = file_get_contents('http://api.map.baidu.com/geocoder?'.$type.'='.$data.'&key='.$this->_baidu_key.$city.'&output='.$output);
        $arr = json_decode($json,true);
        if($arr['status'] != 'OK') return null;
        return array('lat'=>$arr['result']['location']['lat'],'lng'=>$arr['result']['location']['lng']);
    }

    public function get_from_address($addr,$city = ''){
        $lat_lng = $this->baidu_geocode($addr,'address',$city);
        if($lat_lng){
            return $lat_lng['lat'].','.$lat_lng['lng'];
        }else{
            return null;
        }
    }

}