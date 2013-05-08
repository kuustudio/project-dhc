<?php
class Admin_Model_Lbs extends model {

    private $_baidu_key = '52490bdd2448a23c3e87613df57079a9';

    public function __construct(){
        parent::__construct();
    }

    private $sqls = array(
        
    );

    private function get_component($key,$address_components){
        if(!empty($address_components)){
            foreach($address_components as $c){
                return in_array($key,$c['types'])?$c['long_name']:''
            }
        }else{
            return '';
        }
    }
    
    /* $components = 'country:ES|locality:AA'
    */
    private function google_geocode($data, $type = 'latlng', $components = '', $sensor = 'false'){
        if($components) $components = '&components='.$components;
        $json = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?'.$type.'='.$data.$components.'&sensor='.$sensor);
        $arr = json_decode($json,true);
        if($arr['status'] != 'OK') return null;
        $result = array_shift($arr['results']);
        return array(
            'lat'=>$result['geometry']['location']['lat'],
            'lng'=>$result['geometry']['location']['lng'],
            'formatted_address'=> $result['formatted_address'],
            'business' => '',
            'province' => $this->get_component('administrative_area_level_1',$result['address_components']),
            'city' => $this->get_component('locality',$result['address_components']),
            'city_code' => '',
            'street' => '',
            'district' => '',
            'street' => '',
            'street_number' => '',
        );
    }

    private function baidu_geocode($data, $type = 'location', $city = '', $output = 'json'){
        if($city) $city = '&city='.$city;
        $json = file_get_contents('http://api.map.baidu.com/geocoder?'.$type.'='.$data.'&key='.$this->_baidu_key.$city.'&output='.$output);
        $arr = json_decode($json,true);
        if($arr['status'] != 'OK') return null;
        return array(
            'lat'=>$arr['result']['location']['lat'],
            'lng'=>$arr['result']['location']['lng'],
            'formatted_address'=> $arr['result']['formatted_address'],
            'business' => $arr['result']['business'],
            'province' => $arr['result']['addressComponent']['province'],
            'city' => $arr['result']['addressComponent']['city'],
            'city_code' => $arr['result']['cityCode'],
            'street' => $arr['result']['addressComponent']['street'],
            'district' => $arr['result']['addressComponent']['district'],
            'street' => $arr['result']['addressComponent']['street'],
            'street_number' => $arr['result']['addressComponent']['street_number'],
        );
    }

    public function get_from_address($addr,$city = ''){
        $lat_lng = $this->baidu_geocode($addr,'address',$city);
        if($lat_lng){
            return $lat_lng['lat'].','.$lat_lng['lng'];
        }else{
            return null;
        }
    }

    public function get_from_latlon($latlon){
        return $this->baidu_geocode($latlon,'location');
    }

    public function get_city_info($geo_city){
        $geo_city = str_replace('市','',$geo_city);
        
    }

}