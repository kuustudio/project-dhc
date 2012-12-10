<?php
class Admin_Block_Menu extends block{
    public function getMenu(){
        return array(
            array(
                'menuGroupKey'  => 'store_manage',
                'menuGroupName' => '店铺管理',
                'list'  => array(
                    array(
                        'menuName'  => '店铺管理',
                        'menuUrl'   => DHC::_url('*/Store/Index')
                    ),
                    array(
                        'menuName'  => '<span class="pl15">店铺分类</span>',
                        'menuUrl'   => DHC::_url('*/Store/Category')
                    ),
                    array(
                        'menuName'  => '菜品管理',
                        'menuUrl'   => DHC::_url('*/Store/Dish')
                    ),
                    array(
                        'menuName'  => '<span class="pl15">菜品分类</span>',
                        'menuUrl'   => DHC::_url('*/Store/DishCategory')
                    ),
                    array(
                        'menuName'  => '<span class="pl15">价格分组</span>',
                        'menuUrl'   => DHC::_url('*/Store/priceGroup')
                    ),
                    array(
                        'menuName'  => '套餐管理',
                        'menuUrl'   => DHC::_url('*/Store/Combo')
                    ),
                    array(
                        'menuName'  => '<span class="pl15">套餐分类</span>',
                        'menuUrl'   => DHC::_url('*/Store/ComboCategory')
                    ),
                    array(
                        'menuName'  => '菜单管理',
                        'menuUrl'   => DHC::_url('*/Store/Menu')
                    ),
                    array(
                        'menuName'  => '订单管理',
                        'menuUrl'   => DHC::_url('*/Store/Order')
                    )
                )
            ),
            array(
                'menuGroupKey'  => 'account_manage',
                'menuGroupName' => '客户管理',
                'list'  => array(
                    array(
                        'menuName'  => '客户管理',
                        'menuUrl'   => DHC::_url('*/Custom/Index')
                    ),
                    array(
                        'menuName'  => '客户订单地址',
                        'menuUrl'   => DHC::_url('*/Custom/BookAddress')
                    )
                )
            ),
            array(
                'menuGroupKey'  => 'group_manage',
                'menuGroupName' => '圈子管理',
                'list'  => array(
                    array(
                        'menuName'  => '地区管理',
                        'menuUrl'   => DHC::_url('*/Group/Area')
                    ),
                    array(
                        'menuName'  => '地理点管理',
                        'menuUrl'   => DHC::_url('*/Group/Geo')
                    ),
                    array(
                        'menuName'  => '团餐圈管理',
                        'menuUrl'   => DHC::_url('*/Group/Mission')
                    ),
                    array(
                        'menuName'  => '吃货圈管理',
                        'menuUrl'   => DHC::_url('*/Group/Custom')
                    )
                )
            ),
            array(
                'menuGroupKey'  => 'sys_manage',
                'menuGroupName' => '系统管理',
                'list'  => array(
                    array(
                        'menuName'  => '系统配置',
                        'menuUrl'   => DHC::_url('*/System/Config')
                    ),
                    array(
                        'menuName'  => '账户管理',
                        'menuUrl'   => DHC::_url('*/System/Account')
                    ),
                    array(
                        'menuName'  => '管理员',
                        'menuUrl'   => DHC::_url('*/System/Admin')
                    ),
                    array(
                        'menuName'  => '<span class="pl15">管理组</span>',
                        'menuUrl'   => DHC::_url('*/System/AdminGroup')
                    ),
                    array(
                        'menuName'  => '权限管理',
                        'menuUrl'   => DHC::_url('*/System/Authority')
                    ),
                    array(
                        'menuName'  => '<span class="pl15">权限组</span>',
                        'menuUrl'   => DHC::_url('*/System/AuthorityGroup')
                    ),
                    array(
                        'menuName'  => '邮件配置',
                        'menuUrl'   => DHC::_url('*/System/Email')
                    ),
                    array(
                        'menuName'  => '数据字典',
                        'menuUrl'   => DHC::_url('*/System/Dictionary')
                    )
                )
            ),
        );
    }
}