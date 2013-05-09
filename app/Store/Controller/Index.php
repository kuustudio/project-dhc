<?php
class Store_Controller_Index extends Store_Controller_Base {

    public function actionIndex(){
        $this->assign('no_topbar',true);
        $this->render();
    }

    public function actionHome(){
        $this->render();
    }

    public function actionSelectcity(){
        $this->assign('no_topbar',true);
        $this->render();
    }

    public function actionLogin(){
        $this->assign('no_topbar',true);
        $this->_setType(array('city_name'=>PARAM_STRING),'cookie');
        $city_name = $this->_cookie('city_name');
        $this->assign('city_name',$city_name?$city_name:'城市');
        $this->render();
    }

    public function actionGetcity_AJAX(){
        $this->_setType(array('latlon'=>PARAM_STRING),'cookie');
        $latlon = $this->_cookie('latlon');
        $admin_model_lbs = MONK::getSingleton('Admin_Model_Lbs');
        $admin_model_area = MONK::getSingleton('Admin_Model_Area');
        /* 
        * 通过地图api获取然后去匹配
        */
        $r = $admin_model_lbs->get_from_latlon($latlon);
        if(!empty($r['city'])){
            $city_name = str_replace('市','',$r['city']);
            $city = $admin_model_area->get_city_by_name($city_name);
            if(!empty($city)){
                setcookie('city_name',$city_name,0,'/');
                setcookie('city_id',$city['city_id'],0,'/');
            }else{
                $this->_json_return('',false);
            }
        }else{
            $city_name = '';
            $city['city_id'] = 0;
        }
        
        $this->_json_return(array('city_name'=>$city_name,'city_id'=>$city['city_id']),$city['city_id']);
    }

    public function actionReg(){
        $admin_model_store = MONK::getSingleton('Admin_Model_Store');
        $this->assign('store_categorys',$admin_model_store->_store_categorys);
        $this->assign('no_topbar',true);
        $this->_setType(array('city_name'=>PARAM_STRING,'lat_lon'=>PARAM_STRING),'cookie');
        $city_name = $this->_cookie('city_name');
        $lat_lon = $this->_cookie('lat_lon');
        $this->assign('city_name',$city_name?$city_name:'城市');
        $this->assign('lat_lon',$lat_lon?$lat_lon:'');
        $this->render();
    }

    public function actionGetdistricts_AJAX_POST(){
        $this->_setType(array('city_id'=>PARAM_UINT),'post');
        $city_id = $this->_post('city_id');
        $admin_model_area = MONK::getSingleton('Admin_Model_Area');
        $districts = $admin_model_area->get_district_all($city_id);
        $this->_json_return(array('districts'=>$districts),count($districts));
    }

    public function actionGetplaces_AJAX_POST(){
        $this->_setType(array('latlon'=>PARAM_STRING,'distance'=>PARAM_UINT),'post');
        $latlon = $this->_post('latlon');
        setcookie('custom_latlon',$latlon,0,'/');
        $distance = $this->_post('distance');
        if(strpos($latlon,',')){
            list($lat,$lon) = explode(',',$latlon);
            $admin_model_area = MONK::getSingleton('Admin_Model_Area');
            $places = $admin_model_area->get_place_by_latlon($lat,$lon,$distance);
            $this->_json_return(array('places'=>$places),count($places));
        }else{
            $this->_json_return('',false);
        }
    }

    public function actionLogout(){
        
    }
}
