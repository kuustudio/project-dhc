<?php
class Admin_Controller_Area extends Admin_Controller_Base {

    private  $model_area = null;

    public function init(){
       $this->model_area = MONK::getSingleton('Admin_Model_Area');
       parent::init();
    }

    public function actionIndex(){
        $this->render();
    }
    
    public function actionCity(){
        $this->_setType(array('page'=>PARAM_UINT,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $page = $this->_get('page');
        $page = $page?$page:1;
        $citys = $this->model_area->get_city_page($page);
        $pageBar = $this->getDefaultPageLink($citys['totalCount'],$page);
        $this->assign('china_provinces', $this->model_area->_china_provinces);
        $this->assign('list',$citys['list']);
        $this->assign('pageBar',$pageBar);
        $this->render();
    }

    public function actionAddcity(){
        $this->_setType(array('status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $this->assign('china_provinces', $this->model_area->_china_provinces);
        $this->render();
    }

    public function actionAddcity_POST(){
        $this->_setType(array('parent_province'=>PARAM_UINT,'city_name'=>PARAM_STRING,'start_with'=>PARAM_STRING,'long_lat'=>PARAM_STRING),'post');
        $_data = array();
        $_data['parent_province'] = $this->_post('parent_province');
        $_data['city_name'] = $this->_post('city_name');
        $_data['start_with'] = $this->_post('start_with');
        $_data['long_lat'] = $this->_post('long_lat');
//        $model_lbs = MONK::getSingleton('Admin_Model_Lbs');
//        if(in_array($_data['parent_province'],array('1','2','3','4','9','10'))){
//            $_data['long_lat'] = $model_lbs->get_from_address(urlencode($_data['city_name']));
//        }else{
//            $_data['long_lat'] = $model_lbs->get_from_address(urlencode($this->model_area->_china_provinces[$_data['parent_province']].$_data['city_name']));
//        }
        if(strpos($_data['long_lat'],',')){
            list($_data['latitude'],$_data['longitude']) = explode(',',$_data['long_lat']);
        }else{
            $_data['latitude'] = $_data['longitude'] = 0;
        }
        $id = $this->model_area->create_city($_data);
        if($id)
            return $this->redirect(MONK::_url('*/addcity',array('status'=>'success','message'=>urlencode('城市创建成功，ID：'.$id))));
         return $this->redirect(MONK::_url('*/addcity',array('status'=>'error','message'=>urlencode('城市创建失败。'))));
    }

    public function actionEditcity(){
        $this->_setType(array('city_id'=>PARAM_UINT,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $this->assign('china_provinces', $this->model_area->_china_provinces);
        $city = $this->model_area->get_city_by_id($this->_get('city_id'));
        $this->assign('city',$city);
        $this->render();
    }

    public function actionEditcity_POST(){
        $this->_setType(array('city_id'=>PARAM_UINT,'parent_province'=>PARAM_UINT,'city_name'=>PARAM_STRING,'start_with'=>PARAM_STRING,'long_lat'=>PARAM_STRING),'post');
        $_data = array();
        $_data['city_id'] = $this->_post('city_id');
        $_data['parent_province'] = $this->_post('parent_province');
        $_data['city_name'] = $this->_post('city_name');
        $_data['start_with'] = $this->_post('start_with');
        $_data['long_lat'] = $this->_post('long_lat');
//        $model_lbs = MONK::getSingleton('Admin_Model_Lbs');
//        if(in_array($_data['parent_province'],array('1','2','3','4','9','10'))){
//            $_data['long_lat'] = $model_lbs->get_from_address(urlencode($_data['city_name']));
//        }else{
//            $_data['long_lat'] = $model_lbs->get_from_address(urlencode($this->model_area->_china_provinces[$_data['parent_province']].$_data['city_name']));
//        }
        if(strpos($_data['long_lat'],',')){
            list($_data['latitude'],$_data['longitude']) = explode(',',$_data['long_lat']);
        }else{
            $_data['latitude'] = $_data['longitude'] = 0;
        }
        $r = $this->model_area->update_city($_data);
        if($r)
            return $this->redirect(MONK::_url('*/editcity',array('city_id'=>$_data['city_id'],'status'=>'success','message'=>urlencode('城市更新成功。'))));
        return $this->redirect(MONK::_url('*/editcity',array('city_id'=>$_data['city_id'],'status'=>'error','message'=>urlencode('城市更新失败。'))));
    }

    public function actionDeletecity(){
        $this->_setType(array('city_id'=>PARAM_UINT));
        $r = $this->model_area->delete_city($this->_get('city_id'));
        if($r)
            return $this->redirect(MONK::_url('*/city',array('status'=>'success','message'=>urlencode('城市删除成功。'))));
        return $this->redirect(MONK::_url('*/city',array('status'=>'error','message'=>urlencode('城市删除失败。'))));
    }

    public function actionDistrict(){
        $this->_setType(array('city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $city_id = $this->_get('city_id');
        if(empty($city_id)) $this->redirect(MONK::_url('*/city'));
        $this->assign('city_id',$city_id);
        $this->assign('city_name',urldecode($this->_get('city_name')));
        $districts = $this->model_area->get_district_all($city_id);
        $this->assign('districts',$districts);
        $this->render();
    }

    public function actionAdddistrict(){
        $this->_setType(array('city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $this->assign('city_id',$this->_get('city_id'));
        $this->assign('city_name',urldecode($this->_get('city_name')));
        $this->render();
    }

    public function actionAdddistrict_POST(){
        $this->_setType(array('city_name'=>PARAM_STRING));
        $this->_setType(array('city_id'=>PARAM_UINT,'district_name'=>PARAM_STRING,'start_with'=>PARAM_STRING,'long_lat'=>PARAM_STRING),'post');
        $_data = array();
        $_data['city_id'] = $this->_post('city_id');
        $_data['district_name'] = $this->_post('district_name');
        $_data['start_with'] = $this->_post('start_with');
        $_data['long_lat'] = $this->_post('long_lat');
//        $model_lbs = MONK::getSingleton('Admin_Model_Lbs');
//        $_data['long_lat'] = $model_lbs->get_from_address($this->_get('city_name').urlencode($_data['district_name']));
        if(strpos($_data['long_lat'],',')){
            list($_data['latitude'],$_data['longitude']) = explode(',',$_data['long_lat']);
        }else{
            $_data['latitude'] = $_data['longitude'] = 0;
        }
        $id = $this->model_area->create_district($_data);
        if($id)
            return $this->redirect(MONK::_url('*/adddistrict',array('city_id'=>$_data['city_id'],'city_name'=>$this->_get('city_name'),'status'=>'success','message'=>urlencode('区域创建成功，ID：'.$id))));
         return $this->redirect(MONK::_url('*/adddistrict',array('city_id'=>$_data['city_id'],'city_name'=>$this->_get('city_name'),'status'=>'error','message'=>urlencode('区域创建失败。'))));
    }

    public function actionEditdistrict(){
        $this->_setType(array('district_id'=>PARAM_UINT,'city_id'=>PARAM_STRING,'city_name'=>PARAM_STRING,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $this->assign('city_id',$this->_get('city_id'));
        $this->assign('city_name',urldecode($this->_get('city_name')));
        $district = $this->model_area->get_district_by_id($this->_get('district_id'));
        $this->assign('district',$district);
        $this->render();
    }

    public function actionEditdistrict_POST(){
        $this->_setType(array('city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING));
        $this->_setType(array('district_id'=>PARAM_UINT,'district_name'=>PARAM_STRING,'start_with'=>PARAM_STRING,'long_lat'=>PARAM_STRING),'post');
        $_data = array();
        $_data['district_id'] = $this->_post('district_id');
        $_data['district_name'] = $this->_post('district_name');
        $_data['start_with'] = $this->_post('start_with');
        $_data['long_lat'] = $this->_post('long_lat');
//        $model_lbs = MONK::getSingleton('Admin_Model_Lbs');
//        $_data['long_lat'] = $model_lbs->get_from_address($this->_get('city_name').urlencode($_data['district_name']));
        if(strpos($_data['long_lat'],',')){
            list($_data['latitude'],$_data['longitude']) = explode(',',$_data['long_lat']);
        }else{
            $_data['latitude'] = $_data['longitude'] = 0;
        }
        $r = $this->model_area->update_district($_data);
        if($r)
            return $this->redirect(MONK::_url('*/editdistrict',array('district_id'=>$_data['district_id'],'city_id'=>$this->_get('city_id'),'city_name'=>$this->_get('city_name'),'status'=>'success','message'=>urlencode('区域更新成功。'))));
        return $this->redirect(MONK::_url('*/editdistrict',array('district_id'=>$_data['district_id'],'city_id'=>$this->_get('city_id'),'city_name'=>$this->_get('city_name'),'status'=>'error','message'=>urlencode('区域更新失败。'))));
    }

    public function actionDeletedistrict(){
        $this->_setType(array('district_id'=>PARAM_UINT,'city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING));
        $r = $this->model_area->delete_district($this->_get('district_id'));
        if($r)
            return $this->redirect(MONK::_url('*/district',array('city_id'=>$this->_get('city_id'),'city_name'=>$this->_get('city_name'),'status'=>'success','message'=>urlencode('区域删除成功。'))));
        return $this->redirect(MONK::_url('*/district',array('city_id'=>$this->_get('city_id'),'city_name'=>$this->_get('city_name'),'status'=>'error','message'=>urlencode('区域删除失败。'))));
    }

    public function actionPlace(){
        $this->_setType(array('page'=>PARAM_UINT,'district_id'=>PARAM_UINT,'district_name'=>PARAM_STRING,'city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $page = $this->_get('page');
        $page = $page?$page:1;
        $district_id = $this->_get('district_id');
        if(empty($district_id)) $this->redirect(MONK::_url('*/city'));
        $this->assign('district_id',$district_id);
        $this->assign('district_name',urldecode($this->_get('district_name')));
        $this->assign('city_id',$this->_get('city_id'));
        $this->assign('city_name',urldecode($this->_get('city_name')));
        $this->assign('place_types', $this->model_area->_place_types);
        $places = $this->model_area->get_place_page($district_id,$page);
        $pageBar = $this->getDefaultPageLink($places['totalCount'],$page);
        $this->assign('list',$places['list']);
        $this->assign('pageBar',$pageBar);
        $this->render();
    }

    public function actionAddplace(){
        $this->_setType(array('district_id'=>PARAM_UINT,'district_name'=>PARAM_STRING,'city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $this->assign('district_id',$this->_get('district_id'));
        $this->assign('district_name',urldecode($this->_get('district_name')));
        $this->assign('city_id',$this->_get('city_id'));
        $this->assign('city_name',urldecode($this->_get('city_name')));
        $this->assign('place_types', $this->model_area->_place_types);
        $this->render();
    }

    public function actionAddplace_POST(){
        $this->_setType(array('city_name'=>PARAM_STRING,'district_name'=>PARAM_STRING));
        $this->_setType(array('city_id'=>PARAM_UINT,'district_id'=>PARAM_UINT,'place_name'=>PARAM_STRING,'place_info'=>PARAM_STRING,'place_type'=>PARAM_UINT,'start_with'=>PARAM_STRING,'long_lat'=>PARAM_STRING),'post');
        $_data = array();
        $_data['city_id'] = $this->_post('city_id');
        $_data['district_id'] = $this->_post('district_id');
        $_data['district_name'] = $this->_get('district_name');
        $_data['place_name'] = $this->_post('place_name');
        $_data['place_info'] = $this->_post('place_info');
        $_data['place_type'] = $this->_post('place_type');
        $_data['start_with'] = $this->_post('start_with');
        $_data['long_lat'] = $this->_post('long_lat');
//        $model_lbs = MONK::getSingleton('Admin_Model_Lbs');
//        $_data['long_lat'] = $model_lbs->get_from_address($this->_get('district_name').urlencode($this->_post('place_info').$this->_post('place_name')),$this->_get('city_name'));
        if(strpos($_data['long_lat'],',')){
            list($_data['latitude'],$_data['longitude']) = explode(',',$_data['long_lat']);
        }else{
            $_data['latitude'] = $_data['longitude'] = 0;
        }
        $id = $this->model_area->create_place($_data);
        if($id)
            return $this->redirect(MONK::_url('*/addplace',array('district_id'=>$_data['district_id'],'district_name'=>$this->_get('district_name'),'city_id'=>$_data['city_id'],'city_name'=>$this->_get('city_name'),'status'=>'success','message'=>urlencode('地点创建成功，ID：'.$id))));
         return $this->redirect(MONK::_url('*/addplace',array('district_id'=>$_data['district_id'],'district_name'=>$this->_get('district_name'),'city_id'=>$_data['city_id'],'city_name'=>$this->_get('city_name'),'status'=>'error','message'=>urlencode('地点创建失败。'))));
    }

    public function actionEditplace(){
        $this->_setType(array('place_id'=>PARAM_UINT,'district_id'=>PARAM_UINT,'district_name'=>PARAM_STRING,'city_id'=>PARAM_STRING,'city_name'=>PARAM_STRING,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $this->assign('district_id',$this->_get('district_id'));
        $this->assign('district_name',urldecode($this->_get('district_name')));
        $this->assign('city_id',$this->_get('city_id'));
        $this->assign('city_name',urldecode($this->_get('city_name')));
        $this->assign('place_types', $this->model_area->_place_types);
        $place = $this->model_area->get_place_by_id($this->_get('place_id'));
        $this->assign('place',$place);
        $this->render();
    }

    public function actionEditplace_POST(){
        $this->_setType(array('district_id'=>PARAM_UINT,'district_name'=>PARAM_STRING,'city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING));
        $this->_setType(array('place_id'=>PARAM_UINT,'place_name'=>PARAM_STRING,'place_info'=>PARAM_STRING,'place_type'=>PARAM_UINT,'start_with'=>PARAM_STRING,'long_lat'=>PARAM_STRING),'post');
        $_data = array();
        $_data['place_id'] = $this->_post('place_id');
        $_data['place_name'] = $this->_post('place_name');
        $_data['place_info'] = $this->_post('place_info');
        $_data['place_type'] = $this->_post('place_type');
        $_data['start_with'] = $this->_post('start_with');
        $_data['long_lat'] = $this->_post('long_lat');
//        $model_lbs = MONK::getSingleton('Admin_Model_Lbs');
//        $_data['long_lat'] = $model_lbs->get_from_address($this->_get('district_name').urlencode($this->_post('place_info').$this->_post('place_name')),$this->_get('city_name'));
        if(strpos($_data['long_lat'],',')){
            list($_data['latitude'],$_data['longitude']) = explode(',',$_data['long_lat']);
        }else{
            $_data['latitude'] = $_data['longitude'] = 0;
        }
        $r = $this->model_area->update_place($_data);
        if($r)
            return $this->redirect(MONK::_url('*/editplace',array('place_id'=>$_data['place_id'],'district_id'=>$this->_get('district_id'),'district_name'=>$this->_get('district_name'),'city_id'=>$this->_get('city_id'),'city_name'=>$this->_get('city_name'),'status'=>'success','message'=>urlencode('地点更新成功。'))));
        return $this->redirect(MONK::_url('*/editplace',array('place_id'=>$_data['place_id'],'district_id'=>$this->_get('district_id'),'district_name'=>$this->_get('district_name'),'city_id'=>$this->_get('city_id'),'city_name'=>$this->_get('city_name'),'status'=>'error','message'=>urlencode('地点更新失败。'))));
    }

    public function actionDeleteplace(){
        $this->_setType(array('place_id'=>PARAM_UINT,'district_id'=>PARAM_UINT,'district_name'=>PARAM_STRING,'city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING));
        $r = $this->model_area->delete_place($this->_get('place_id'));
        if($r)
            return $this->redirect(MONK::_url('*/place',array('district_id'=>$this->_get('district_id'),'district_name'=>$this->_get('district_name'),'city_id'=>$this->_get('city_id'),'city_name'=>$this->_get('city_name'),'status'=>'success','message'=>urlencode('地点删除成功。'))));
        return $this->redirect(MONK::_url('*/place',array('district_id'=>$this->_get('district_id'),'district_name'=>$this->_get('district_name'),'city_id'=>$this->_get('city_id'),'city_name'=>$this->_get('city_name'),'status'=>'error','message'=>urlencode('地点删除失败。'))));
    }
}