<?php
class Store_Controller_Base extends controller {

    public $city_id,$city_name,$latlon,$custom_latlon,$store;

    public function init(){
        $this->_setType(array('city_id'=>PARAM_UINT,'city_name'=>PARAM_STRING,'latlon'=>PARAM_STRING,'custom_latlon'=>PARAM_STRING),'cookie');
        $this->city_id = $this->_cookie('city_id');
        $this->city_name = $this->_cookie('city_name');
        $this->latlon = $this->_cookie('latlon');
        $this->custom_latlon = $this->_cookie('custom_latlon');
        $this->assign('city_id',$this->city_id?$this->city_id:0);
        $this->assign('city_name',$this->city_name?$this->city_name:'城市');
        $this->assign('latlon',$this->latlon);
        $this->assign('custom_latlon',$this->custom_latlon);
        parent::init();
    }

    protected function _json_return($status,$data = array(),$code = 404){
        if($status){
            echo json_encode(array('status'=>'true','data'=>$data));
        }else{
            echo json_encode(array('status'=>'false','code'=>$code,'data'=>$data));
        }
    }

    //设置AUTH cookie
    protected function setAuth($auth){
        setcookie(MONK::getConfig('auth_token'),$auth,time() + MONK::getConfig('cookie_expire'),'/');
    }

    //清空AUTH cookie
    protected function clearAuth(){
        setcookie(MONK::getConfig('auth_token'),'',time()-1,'/');
    }

    //启动登陆验证
    protected function isLogin(){
        $this->_setType(array(MONK::getConfig('auth_token')=>PARAM_STRING),'cookie');
        $auth_token = $this->_cookie(MONK::getConfig('auth_token'));
        if($auth_token){
            //解码auth_token得到用户ID，邮箱，密码
            $this->account = array();
            $_encrypt = MONK::getSingleton('Encrypt');
            $_encrypt->app_key = MONK::getConfig('app_key');
            list($account_id,$email,$passwd,$is_checked,$store_name,$store_type,$store_phone,$store_contacts,$store_qq,$city_id,$district_id,$store_address,$long_lat,$store_places,$store_info,$created,$updated) = explode(' ',$_encrypt->authTokenDecode($auth_token));
            //登陆检验，不过会增加数据库连接，在刷新频率比较高的情况下会非常耗资源，如果有比较好的缓存服务器倒是可以尝试，因为这样更安全
            //进行邮箱账号验证
            $is_email = validator::get_param_email($email);
            if($is_email){
                $this->store['account_id'] = $account_id;
                $this->store['email'] = $email;
                $this->store['passwd'] = $passwd;
                $this->store['is_checked'] = $is_checked;
                $this->store['store_name'] = $store_name;
                $this->store['store_type'] = $store_type;
                $this->store['store_phone'] = $store_phone;
                $this->store['store_contacts'] = $store_contacts;
                $this->store['store_qq'] = $store_qq;
                $this->store['city_id'] = $city_id;
                $this->store['district_id'] = $district_id;
                $this->store['store_address'] = $store_address;
                $this->store['long_lat'] = $long_lat;
                $this->store['store_places'] = $store_places;
                $this->store['store_info'] = $store_info;
                $this->store['created'] = $created;
                $this->store['updated'] = $updated;
                return true;
            }else
                return false;
        }else
            return false;
    }
}