<?php
class Store_Model_Account extends model {

    private $sqls = array(
        'create_account'    => 'insert into `account`(`account_id`,`email`,`paswd`,`is_checked`) values([@account_id],[@email],[@paswd],0);',
        'create_store'  => 'insert into `store`(`account_id`,`store_name`,`store_type`,`store_phone`,`store_contacts`,`store_qq`,`city_id`,`district_id`,`store_address`,`long_lat`,`store_places`,`store_info`,`created`,`updated`) values([@account_id],[@store_name],[@store_type],[@store_phone],[@store_contacts],[@store_qq],[@city_id],[@district_id],[@store_address],[@long_lat],[@store_places],[@store_info],[@created],[@updated]);',
        'find_by_email'  => 'select 1 from `account` where `email` = [@email] limit 1',
        'login' => 'select `account_id`,`is_checked` from `account` where `email` = [@email] and `paswd` = [@paswd] limit 1;',
        'get_store_by_account_id' => 'select * from `store` where `account_id` = [@account_id] limit 1;',
    );

    public function __construct(){
        parent::__construct();
    }

    public function create_store_account($account,$store){
        $_encrypt = MONK::getSingleton('Encrypt');
        $_encrypt->app_key = MONK::getConfig('app_key');
        $account['paswd'] = $_encrypt->passwdEncode($account['paswd']);
        $store['account_id'] = $account['account_id'] = md5($account['paswd'].$store['created'].rand());
        mysql::startTrans();
        mysql::execute('account', $this->sqls['create_account'], $account);
        mysql::execute('store', $this->sqls['create_store'], $store);
        //创建菜单
        mysql::commit();
        return $store['account_id'];
    }

    public function is_registered($email){
        $account = mysql::fetch('account', $this->sqls['find_by_email'], array('email'=>$email));
        return !empty($account);
    }

    public function login($data){
        $_encrypt = MONK::getSingleton('Encrypt');
        $_encrypt->app_key = MONK::getConfig('app_key');
        $data['paswd'] = $_encrypt->passwdEncode($data['paswd']);
        $account = mysql::fetch('account', $this->sqls['login'], $data);
        if(!empty($account)){
            $account = array_shift($account);
            $store = mysql::fetch('store', $this->sqls['get_store_by_account_id'], array('account_id'=>$account['account_id']));
            if(!empty($store)){
                $store = array_shift($store);
                $store['email'] = $data['email'];
                $store['paswd']= $data['paswd'];
                $store['is_checked']=$account['is_checked'];
                return $store;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}