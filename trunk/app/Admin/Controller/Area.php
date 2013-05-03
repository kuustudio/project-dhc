<?php
class Admin_Controller_Area extends Admin_Controller_Base {

    public function actionIndex(){
        $this->render();
    }
    
    public function actionCity(){
        $this->_setType(array('page'=>PARAM_UINT,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $page = $this->_get('page');
        $page = $page?$page:1;
        $model_area = MONK::getSingleton('Admin_Model_Area');
        $citys = $model_area->get_city_page($page);
        $pageBar = $this->getDefaultPageLink($citys['totalCount'],$page);
        $this->assign('china_provinces',$model_area->_china_provinces);
        $this->assign('list',$citys['list']);
        $this->assign('pageBar',$pageBar);
        $this->render();
    }

    public function actionAddcity(){
        $this->_setType(array('status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $this->render();
    }

    public function actionAddcity_POST(){
        $this->_setType(array('parent_province'=>PARAM_UINT,'city_name'=>PARAM_STRING,'start_with'=>PARAM_STRING,'long_lat'=>PARAM_STRING),'post');
        $_data = array();
        $_data['parent_province'] = $this->_post('parent_province');
        $_data['city_name'] = $this->_post('city_name');
        $_data['start_with'] = $this->_post('start_with');
        $_data['long_lat'] = $this->_post('long_lat');
        $model_area = MONK::getSingleton('Admin_Model_Area');
        $id = $model_area->create_city($_data);
        if($id)
            return $this->redirect(MONK::_url('*/Addcity',array('status'=>'success','message'=>urlencode('城市创建成功，ID：'.$id))));
         return $this->redirect(MONK::_url('*/Addcity',array('status'=>'error','message'=>urlencode('城市创建失败。'))));
    }

    public function actionEditcity(){
        $this->_setType(array('city_id'=>PARAM_UINT,'status'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign('status',$this->_get('status'));
        $this->assign('message',urldecode($this->_get('message')));
        $model_area = MONK::getSingleton('Admin_Model_Area');
        $city = $model_area->get_city_by_id($this->_get('city_id'));
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
        $model_area = MONK::getSingleton('Admin_Model_Area');
        $r = $model_area->update_city($_data);
        if($r)
            return $this->redirect(MONK::_url('*/Editcity',array('city_id'=>$_data['city_id'],'status'=>'success','message'=>urlencode('城市更新成功。'))));
        return $this->redirect(MONK::_url('*/Editcity',array('city_id'=>$_data['city_id'],'status'=>'error','message'=>urlencode('城市更新失败。'))));
    }

    public function actionDeletecity(){
        $this->_setType(array('city_id'=>PARAM_UINT));
        $model_area = MONK::getSingleton('Admin_Model_Area');
        $r = $model_area->delete_city($this->_get('city_id'));
        if($r)
            return $this->redirect(MONK::_url('*/city',array('status'=>'success','message'=>urlencode('城市删除成功。'))));
        return $this->redirect(MONK::_url('*/city',array('status'=>'error','message'=>urlencode('城市删除失败。'))));
    }
}