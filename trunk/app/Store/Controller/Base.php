<?php
class Store_Controller_Base extends controller {
    protected function _json_return($data,$status = true){
        if($status){
            echo json_encode(array('status'=>'true','data'=>$data));
        }else{
            echo json_encode(array('status'=>'false'));
        }
    }
}