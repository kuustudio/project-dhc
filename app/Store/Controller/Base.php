<?php
class Store_Controller_Base extends controller {

    public $city_id,$city_name,$latlon,$custom_latlon;

    public function init(){
        $this->_setType(array('city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING,'latlon'=>PARAM_STRING,'custom_latlon'=>PARAM_STRING),'cookie');
        $this->city_id = $this->_cookie('city_id');
        $this->city_name = $this->_cookie('city_name');
        $this->latlon = $this->_cookie('latlon');
        $this->custom_latlon = $this->_cookie('custom_latlon');
        $this->assign('city_id',$this->city_id?$this->city_id:0);
        $this->assign('city_name',$this->city_name?$this->city_name:'城市');
        $this->assign('latlon',$this->latlon?$this->latlon:null);
        $this->assign('custom_latlon',$this->custom_latlon?$this->custom_latlon:null);
        parent::init();
    }

    protected function _json_return($data,$status = true){
        if($status){
            echo json_encode(array('status'=>'true','data'=>$data));
        }else{
            echo json_encode(array('status'=>'false'));
        }
    }
}