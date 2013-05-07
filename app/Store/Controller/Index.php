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
            }
        }else{
            $city_name = '';
            $city['city_id'] = 0;
        }
        
        $this->_json_return(array('city_name'=>$city_name),$city['city_id']);
    }

    public function actionReg(){
        $admin_model_store = MONK::getSingleton('Admin_Model_Store');
        $this->assign('store_categorys',$admin_model_store->_store_categorys);
        $this->assign('no_topbar',true);
        $this->render();
    }

    public function actionLogout(){
        
    }
}
