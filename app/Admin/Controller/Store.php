<?php
class Admin_Controller_Store extends Admin_Controller_Base{

    var $model_store_categoray = null;

    public function init(){
        $this->model_store_categoray = MONK::getSingleton('Admin_Model_CategoryStore');
        parent::init();
    }

    public function actionIndex(){
        $this->assign('Title','店铺列表');
        $this->render();
    }

    public function actionAdd(){
        $this->render();
    }

    public function actionCategory(){
        $this->assign('Title','店铺分类列表');
        $this->_setType(array('result'=>PARAM_STRING,'message'=>PARAM_STRING));
        $storeCategorys = $this->model_store_categoray->all(array(),'*',array('category_store_id'=>1));
        $this->assign(array(
            'result'    => $this->_get('result'),
            'message'   => urldecode($this->_get('message'))
        ));
        $this->assign('store_categorys',$storeCategorys);
        $this->render();
    }

    public function actionAddCategory(){
        $this->assign('Title','添加店铺分类');
        $this->_setType(array('result'=>PARAM_STRING,'message'=>PARAM_STRING));
        $this->assign(array(
            'result'=>$this->_get('result'),
            'message'=>urldecode($this->_get('message'))
        ));
        $this->render();
    }

    public function actionAddCategory_POST(){
        $this->assign('Title','添加店铺分类');
        $this->_setType(array('category_store_name'=>PARAM_STRING),'post');
        $category_store_name = $this->_post('category_store_name');
        $_data = array(
            'category_store_name' => $category_store_name,
        );
        $categoryStoreId = $this->model_store_categoray->create($_data);
        if($categoryStoreId){
            $this->redirect(MONK::_url('*/*/AddCategory',array('result'=>'success','message'=>urlencode('店铺分类添加成功，ID:'.$categoryStoreId))));
        }else{
            $this->redirect(MONK::_url('*/*/AddCategory',array('result'=>'fail','message'=>urlencode('店铺分类添加失败'))));
        }
    }    

    public function actionEditCategory(){
        $this->assign('Title','编辑店铺分类');
        $this->_setType(array('category_store_id'=>PARAM_UINT,'result'=>PARAM_STRING,'message'=>PARAM_STRING));
        $categoryStoreId = $this->_get('category_store_id');
        $_where = array(
            'category_store_id' => array('symbol'=>'=','value'=>$categoryStoreId)
        );
        $storeCategory = $this->model_store_categoray->one($_where);
        $this->assign($storeCategory);
        $this->assign(array(
            'result'    => $this->_get('result'),
            'message'   => urldecode($this->_get('message'))
        ));
        $this->render();
    }

    public function actionEditCategory_POST(){
        $this->assign('Title','编辑店铺分类');
        $this->_setType(array('category_store_id'=>PARAM_UINT,'category_store_name'=>PARAM_STRING),'post');
        $categoryStoreId = $this->_post('category_store_id');
        $categoryStoreName = $this->_post('category_store_name');
        $_data = array(
            'category_store_name' => $categoryStoreName
        );
        $ret = $this->model_store_categoray->update($_data,array('category_store_id'=>array('symbol'=>'=','value'=>$categoryStoreId)));
        if($ret){
            $this->redirect(MONK::_url('*/*/EditCategory',array('category_store_id'=>$categoryStoreId,'result'=>'success','message'=>urlencode('店铺分类编辑成功，ID:'.$categoryStoreId))));
        }else{
            $this->redirect(MONK::_url('*/*/EditCategory',array('category_store_id'=>$categoryStoreId,'result'=>'fail','message'=>urlencode('店铺分类编辑失败'))));
        }
    }
    public function actionDeleteCategory(){
        $this->_setType(array('category_store_id'=>PARAM_UINT));
        $categoryStoreId = $this->_get('category_store_id');
        $ret = $this->model_store_categoray->delete(array('category_store_id'=>array('symbol'=>'=','value'=>$categoryStoreId)));
        if($ret){
            $this->redirect(MONK::_url('*/*/category',array('result'=>'success','message'=>urlencode('店铺分类删除成功，ID:'.$categoryStoreId))));
        }else{
            $this->redirect(MONK::_url('*/*/category',array('result'=>'fail','message'=>urlencode('店铺分类编辑失败，ID:'.$categoryStoreId))));
        }
    }

    public function actionDeleteMultCategory_POST(){
        $this->_setType(array('store_category_id'=>array('func'=>PARAM_ARRAY,'argv'=>PARAM_UINT^PARAM_ARRAY)),'post');
        dump($this->_post('store_category_id'));
    }
}