/*
MySQL Data Transfer
Source Host: localhost
Source Database: dhc_demo
Target Host: localhost
Target Database: dhc_demo
Date: 2013-05-04 0:51:55
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for ##tag_store(移到模型中静态)
-- ----------------------------
CREATE TABLE `##tag_store(移到模型中静态)` (
  `tag_store_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_store_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`tag_store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for account
-- ----------------------------
CREATE TABLE `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '账户ID',
  `account_name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '账户名',
  `account_password` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '账户密码',
  `account_type` tinyint(1) DEFAULT NULL COMMENT '账户类型',
  `created` int(10) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`account_id`),
  KEY `account_name` (`account_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for area
-- ----------------------------
CREATE TABLE `area` (
  `area_id` int(11) NOT NULL AUTO_INCREMENT,
  `area_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `parent_id` int(11) DEFAULT '0',
  `area_fullname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `area_fullids` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `area_latitude` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `area_longitude` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`area_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for area_city
-- ----------------------------
CREATE TABLE `area_city` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `city_name` varchar(20) NOT NULL COMMENT '城市名称',
  `parent_province` tinyint(1) NOT NULL COMMENT '所属省',
  `start_with` varchar(2) NOT NULL COMMENT '以什么字母开头',
  `long_lat` varchar(30) DEFAULT NULL COMMENT '经度',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for category_combo
-- ----------------------------
CREATE TABLE `category_combo` (
  `category_combo_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_combo_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`category_combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for category_dish
-- ----------------------------
CREATE TABLE `category_dish` (
  `category_dish_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_dish_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`category_dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for combo
-- ----------------------------
CREATE TABLE `combo` (
  `combo_id` int(11) NOT NULL AUTO_INCREMENT,
  `combo_item` text CHARACTER SET utf8 NOT NULL COMMENT 'JSON，包含产品以及数量',
  `combo_unit` varchar(10) CHARACTER SET utf8 DEFAULT '份',
  `combo_currency` varchar(10) CHARACTER SET utf8 DEFAULT '元',
  `combo_num` int(11) DEFAULT '0',
  `combo_price` decimal(8,2) DEFAULT '0.00',
  `combo_tag` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `combo_promotion` decimal(8,2) DEFAULT '0.00',
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for custom
-- ----------------------------
CREATE TABLE `custom` (
  `custom_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `created` int(10) DEFAULT NULL,
  `custom_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_truename` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_sex` tinyint(1) DEFAULT NULL,
  `custom_birthday` int(10) DEFAULT NULL,
  `custom_phone` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_mobile` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_alipay` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_qq` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_msn` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_ali` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_mail` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_company` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_occupation` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_position` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_idcardtype` tinyint(1) DEFAULT NULL,
  `custom_idcard` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_zipcode` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_web` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `custom_bio` mediumtext CHARACTER SET utf8,
  `custom_interest` mediumtext CHARACTER SET utf8,
  `custom_born_address` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `custom_stay_address` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for custom_book_address
-- ----------------------------
CREATE TABLE `custom_book_address` (
  `book_address_id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `geogroup_id` int(11) NOT NULL,
  `additional_address` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`book_address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for dish
-- ----------------------------
CREATE TABLE `dish` (
  `dish_id` int(11) NOT NULL AUTO_INCREMENT,
  `dish_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `dish_can_order` tinyint(1) DEFAULT '0',
  `dish_logo` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `dish_info` text CHARACTER SET utf8,
  `dish_tag` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `has_price_group` tinyint(1) DEFAULT '0',
  `dish_price` decimal(8,2) DEFAULT NULL,
  `dish_unit` varchar(10) CHARACTER SET utf8 DEFAULT '份',
  `dish_currency` varchar(10) CHARACTER SET utf8 DEFAULT '元',
  `dish_num` int(11) DEFAULT '0',
  `dish_promotion` decimal(8,2) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for dish_price_group
-- ----------------------------
CREATE TABLE `dish_price_group` (
  `price_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `dish_id` int(11) NOT NULL,
  `price_group_name` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '默认',
  `price_group_price` decimal(8,2) NOT NULL,
  `price_group_unit` varchar(10) CHARACTER SET utf8 DEFAULT '份',
  `price_group_currency` varchar(10) CHARACTER SET utf8 DEFAULT '元',
  `price_group_num` int(11) DEFAULT '0',
  `price_group_promotion` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`price_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for group_chowhound
-- ----------------------------
CREATE TABLE `group_chowhound` (
  `chowhound_id` int(11) NOT NULL AUTO_INCREMENT,
  `chowhound_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`chowhound_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for group_geo
-- ----------------------------
CREATE TABLE `group_geo` (
  `geo_id` int(11) NOT NULL AUTO_INCREMENT,
  `area_id` int(11) NOT NULL,
  `geo_province` smallint(6) NOT NULL,
  `geo_city` smallint(6) NOT NULL,
  `geo_dest` smallint(6) NOT NULL,
  `geo_street` int(11) NOT NULL,
  `geo_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`geo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for group_mission
-- ----------------------------
CREATE TABLE `group_mission` (
  `mission_id` int(11) NOT NULL AUTO_INCREMENT,
  `geo_id` int(11) NOT NULL,
  `mission_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `additional_address` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`mission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `can_order` tinyint(1) DEFAULT '0',
  `menu_content` text CHARACTER SET utf8 NOT NULL COMMENT 'JSON,例如combo_xxx,dish_xxx',
  `can_group_order` tinyint(1) DEFAULT '1',
  `menu_delivery_price` decimal(8,2) DEFAULT '0.00',
  `created` int(10) DEFAULT NULL,
  `menu_start_time` int(10) DEFAULT NULL,
  `menu_end_time` int(10) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) CHARACTER SET utf8 NOT NULL,
  `order_user_type` tinyint(1) NOT NULL,
  `order_user_id` int(11) NOT NULL,
  `order_total` decimal(8,2) DEFAULT '0.00',
  `store_id` int(11) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  `order_status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for store
-- ----------------------------
CREATE TABLE `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '店铺ID',
  `store_name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '店铺名称',
  `store_domain` varchar(100) NOT NULL COMMENT '英文域名',
  `account_id` int(11) NOT NULL COMMENT '账户ID',
  `created` int(10) NOT NULL COMMENT '创建时间',
  `store_address` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '店铺地址',
  `store_phone` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '联系电话',
  `store_business_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '营业时间',
  `store_info` text CHARACTER SET utf8 COMMENT '店铺介绍',
  `tag_store_id` int(11) DEFAULT NULL COMMENT '店铺标记ID',
  PRIMARY KEY (`store_id`),
  KEY `store_name` (`store_name`),
  KEY `store_domain` (`store_domain`),
  KEY `account_id` (`account_id`),
  KEY `created` (`created`),
  KEY `tag_store_id` (`tag_store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sys_admin
-- ----------------------------
CREATE TABLE `sys_admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `admin_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `admin_group_id` tinyint(1) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sys_admin_group
-- ----------------------------
CREATE TABLE `sys_admin_group` (
  `admin_group_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `admin_group_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `admin_group_authoritys` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`admin_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sys_authority
-- ----------------------------
CREATE TABLE `sys_authority` (
  `authority_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `authority_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `authority_app` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `authority_controller` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `authority_action` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`authority_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sys_authority_group
-- ----------------------------
CREATE TABLE `sys_authority_group` (
  `authority_group_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `authority_group_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `authority_group_authoritys` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`authority_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('1', '快餐');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('2', '火锅');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('3', '烧烤');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('4', '西餐');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('5', '海鲜');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('6', '地方菜');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('7', '烤鱼');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('8', '麻辣香锅');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('9', '日韩料理');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('10', '蛋糕');
INSERT INTO `##tag_store(移到模型中静态)` VALUES ('12', '其他');
INSERT INTO `area_city` VALUES ('1', '宁波', '5', 'n', '29.868396,121.543993', '1367588839', '1367588839');
INSERT INTO `dish_price_group` VALUES ('1', '1', '默认', '999999.99', '份', '元', '0', '1111.00');
INSERT INTO `sys_admin` VALUES ('1', '1', 'admin', '1', '1354279261');
