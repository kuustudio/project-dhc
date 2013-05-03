<?php
class Admin_Controller_Base extends controller {
    public function init(){
       $this->assign('webSite','http://www.dinghaochi.com');
       $this->assign('Title','web');
       $this->assign('Description','web');
       $this->assign('Keywords','web');
       $this->assign('menu',$this->getMenu());
       parent::init();
    }

    protected function getMenu(){
        return array(
            array(
                'level'     => 1,
                'name'      => '星铺管理',
                'has_url'   => 0,
            ),
            array(
                'level'     => 2,
                'name'      => '星铺列表',
                'has_url'   => 1,
                'url'       => MONK::_url('store/index')
            ),
            array(
                'level'     => 2,
                'name'      => '星铺分类',
                'has_url'   => 1,
                'url'       => MONK::_url('store/category')
            ),
            array(
                'level'     => 1,
                'name'      => '位置管理',
                'has_url'   => 0,
            ),
            array(
                'level'     => 2,
                'name'      => '添加城市',
                'has_url'   => 1,
                'url'       => MONK::_url('area/AddCity')
            ),
            array(
                'level'     => 2,
                'name'      => '城市管理',
                'has_url'   => 1,
                'url'       => MONK::_url('area/city')
            ),
            array(
                'level'     => 1,
                'name'      => '账号管理',
                'has_url'   => 0,
            ),
            array(
                'level'     => 2,
                'name'      => '账号列表',
                'has_url'   => 1,
                'url'       => MONK::_url('account/index')
            ),
            array(
                'level'     => 2,
                'name'      => '星铺账号列表',
                'has_url'   => 1,
                'url'       => MONK::_url('account/store')
            ),
            array(
                'level'     => 2,
                'name'      => '喵咪管理',
                'has_url'   => 1,
                'url'       => MONK::_url('account/custom')
            ),
        );
    }
    
    protected function getDefaultPageLink($totalCount, $page = 1, $indexArr = array(), $pageSize = 30, $uri = '*/*'){
        $pages = ceil($totalCount/$pageSize);
        $p_l = '';
        for($i=1;$i<=$pages;$i++){
            if($i == $page){
                $p_l .= '<span>'.$i.'</span>';
            }else{
                $p_l .= '<a href="'.MONK::_url($uri, $indexArr).'">'.$i.'</a>';
            }
        }
        return $p_l;
    }
}