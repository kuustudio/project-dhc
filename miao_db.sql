/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : 127.0.0.1:3306
Source Database       : miao_db

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2013-05-04 16:57:24
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `##tag_store(移到模型中静态)`
-- ----------------------------
DROP TABLE IF EXISTS `##tag_store(移到模型中静态)`;
CREATE TABLE `##tag_store(移到模型中静态)` (
  `tag_store_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_store_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tag_store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ##tag_store(移到模型中静态)
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

-- ----------------------------
-- Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '账户ID',
  `account_name` varchar(100) NOT NULL COMMENT '账户名',
  `account_password` varchar(100) NOT NULL COMMENT '账户密码',
  `account_type` tinyint(1) DEFAULT NULL COMMENT '账户类型',
  `created` int(10) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`account_id`),
  KEY `account_name` (`account_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------

-- ----------------------------
-- Table structure for `area`
-- ----------------------------
DROP TABLE IF EXISTS `area`;
CREATE TABLE `area` (
  `area_id` int(11) NOT NULL AUTO_INCREMENT,
  `area_name` varchar(255) NOT NULL,
  `parent_id` int(11) DEFAULT '0',
  `area_fullname` varchar(255) DEFAULT NULL,
  `area_fullids` varchar(255) DEFAULT NULL,
  `area_latitude` varchar(20) DEFAULT NULL,
  `area_longitude` varchar(20) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`area_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of area
-- ----------------------------

-- ----------------------------
-- Table structure for `area_city`
-- ----------------------------
DROP TABLE IF EXISTS `area_city`;
CREATE TABLE `area_city` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `city_name` varchar(20) NOT NULL COMMENT '城市名称',
  `parent_province` tinyint(1) NOT NULL COMMENT '所属省',
  `start_with` varchar(2) NOT NULL COMMENT '以什么字母开头',
  `long_lat` varchar(30) DEFAULT NULL COMMENT '经纬度',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of area_city
-- ----------------------------
INSERT INTO `area_city` VALUES ('1', '宁波', '5', 'n', '29.868396,121.543993', '1367588839', '1367588839');

-- ----------------------------
-- Table structure for `area_district`
-- ----------------------------
DROP TABLE IF EXISTS `area_district`;
CREATE TABLE `area_district` (
  `district_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `district_name` varchar(20) NOT NULL COMMENT '区域名称',
  `city_id` tinyint(1) NOT NULL COMMENT '所属城市',
  `start_with` varchar(2) NOT NULL COMMENT '以什么字母开头',
  `long_lat` varchar(30) DEFAULT NULL COMMENT '经纬度',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`district_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of area_district
-- ----------------------------
INSERT INTO `area_district` VALUES ('1', '鄞州', '1', 'y', '29.816296,121.546791', '1367588839', '1367588839');

-- ----------------------------
-- Table structure for `area_place`
-- ----------------------------
DROP TABLE IF EXISTS `area_place`;
CREATE TABLE `area_place` (
  `place_id` int(11) NOT NULL AUTO_INCREMENT,
  `place_name` varchar(20) NOT NULL,
  `city_id` int(11) NOT NULL,
  `district_id` int(11) NOT NULL,
  `place_type` tinyint(1) NOT NULL,
  `start_with` varchar(2) DEFAULT NULL,
  `long_lat` varchar(30) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`place_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of area_place
-- ----------------------------
INSERT INTO `area_place` VALUES ('1', '和邦大厦', '1', '1', '1', 'h', '29.833883,121.553979', '1367645992', '1367645992');
INSERT INTO `area_place` VALUES ('2', '名汇国际', '1', '1', '1', 'm', '29.827886,121.554998', '1367651220', '1367656138');
INSERT INTO `area_place` VALUES ('4', '宁海食府', '1', '1', '5', 'n', '29.816296,121.546791', '1367656749', '1367656749');

-- ----------------------------
-- Table structure for `category_combo`
-- ----------------------------
DROP TABLE IF EXISTS `category_combo`;
CREATE TABLE `category_combo` (
  `category_combo_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_combo_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category_combo
-- ----------------------------

-- ----------------------------
-- Table structure for `category_dish`
-- ----------------------------
DROP TABLE IF EXISTS `category_dish`;
CREATE TABLE `category_dish` (
  `category_dish_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_dish_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category_dish
-- ----------------------------

-- ----------------------------
-- Table structure for `combo`
-- ----------------------------
DROP TABLE IF EXISTS `combo`;
CREATE TABLE `combo` (
  `combo_id` int(11) NOT NULL AUTO_INCREMENT,
  `combo_item` text NOT NULL COMMENT 'JSON，包含产品以及数量',
  `combo_unit` varchar(10) DEFAULT '份',
  `combo_currency` varchar(10) DEFAULT '元',
  `combo_num` int(11) DEFAULT '0',
  `combo_price` decimal(8,2) DEFAULT '0.00',
  `combo_tag` varchar(255) DEFAULT NULL,
  `combo_promotion` decimal(8,2) DEFAULT '0.00',
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of combo
-- ----------------------------

-- ----------------------------
-- Table structure for `custom`
-- ----------------------------
DROP TABLE IF EXISTS `custom`;
CREATE TABLE `custom` (
  `custom_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `created` int(10) DEFAULT NULL,
  `custom_name` varchar(100) DEFAULT NULL,
  `custom_truename` varchar(100) DEFAULT NULL,
  `custom_sex` tinyint(1) DEFAULT NULL,
  `custom_birthday` int(10) DEFAULT NULL,
  `custom_phone` varchar(100) DEFAULT NULL,
  `custom_mobile` varchar(100) DEFAULT NULL,
  `custom_alipay` varchar(100) DEFAULT NULL,
  `custom_qq` varchar(100) DEFAULT NULL,
  `custom_msn` varchar(100) DEFAULT NULL,
  `custom_ali` varchar(100) DEFAULT NULL,
  `custom_mail` varchar(100) DEFAULT NULL,
  `custom_company` varchar(100) DEFAULT NULL,
  `custom_occupation` varchar(100) DEFAULT NULL,
  `custom_position` varchar(100) DEFAULT NULL,
  `custom_idcardtype` tinyint(1) DEFAULT NULL,
  `custom_idcard` varchar(100) DEFAULT NULL,
  `custom_zipcode` varchar(100) DEFAULT NULL,
  `custom_web` varchar(100) DEFAULT NULL,
  `custom_bio` mediumtext,
  `custom_interest` mediumtext,
  `custom_born_address` varchar(255) DEFAULT NULL,
  `custom_stay_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of custom
-- ----------------------------

-- ----------------------------
-- Table structure for `custom_book_address`
-- ----------------------------
DROP TABLE IF EXISTS `custom_book_address`;
CREATE TABLE `custom_book_address` (
  `book_address_id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `geogroup_id` int(11) NOT NULL,
  `additional_address` varchar(255) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`book_address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of custom_book_address
-- ----------------------------

-- ----------------------------
-- Table structure for `dish`
-- ----------------------------
DROP TABLE IF EXISTS `dish`;
CREATE TABLE `dish` (
  `dish_id` int(11) NOT NULL AUTO_INCREMENT,
  `dish_name` varchar(255) NOT NULL,
  `dish_can_order` tinyint(1) DEFAULT '0',
  `dish_logo` varchar(255) DEFAULT NULL,
  `dish_info` text,
  `dish_tag` varchar(255) DEFAULT NULL,
  `has_price_group` tinyint(1) DEFAULT '0',
  `dish_price` decimal(8,2) DEFAULT NULL,
  `dish_unit` varchar(10) DEFAULT '份',
  `dish_currency` varchar(10) DEFAULT '元',
  `dish_num` int(11) DEFAULT '0',
  `dish_promotion` decimal(8,2) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dish
-- ----------------------------

-- ----------------------------
-- Table structure for `dish_price_group`
-- ----------------------------
DROP TABLE IF EXISTS `dish_price_group`;
CREATE TABLE `dish_price_group` (
  `price_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `dish_id` int(11) NOT NULL,
  `price_group_name` varchar(100) NOT NULL DEFAULT '默认',
  `price_group_price` decimal(8,2) NOT NULL,
  `price_group_unit` varchar(10) DEFAULT '份',
  `price_group_currency` varchar(10) DEFAULT '元',
  `price_group_num` int(11) DEFAULT '0',
  `price_group_promotion` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`price_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dish_price_group
-- ----------------------------
INSERT INTO `dish_price_group` VALUES ('1', '1', '默认', '999999.99', '份', '元', '0', '1111.00');

-- ----------------------------
-- Table structure for `group_chowhound`
-- ----------------------------
DROP TABLE IF EXISTS `group_chowhound`;
CREATE TABLE `group_chowhound` (
  `chowhound_id` int(11) NOT NULL AUTO_INCREMENT,
  `chowhound_name` varchar(100) NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`chowhound_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_chowhound
-- ----------------------------

-- ----------------------------
-- Table structure for `group_geo`
-- ----------------------------
DROP TABLE IF EXISTS `group_geo`;
CREATE TABLE `group_geo` (
  `geo_id` int(11) NOT NULL AUTO_INCREMENT,
  `area_id` int(11) NOT NULL,
  `geo_province` smallint(6) NOT NULL,
  `geo_city` smallint(6) NOT NULL,
  `geo_dest` smallint(6) NOT NULL,
  `geo_street` int(11) NOT NULL,
  `geo_name` varchar(100) NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`geo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_geo
-- ----------------------------

-- ----------------------------
-- Table structure for `group_mission`
-- ----------------------------
DROP TABLE IF EXISTS `group_mission`;
CREATE TABLE `group_mission` (
  `mission_id` int(11) NOT NULL AUTO_INCREMENT,
  `geo_id` int(11) NOT NULL,
  `mission_name` varchar(100) NOT NULL,
  `additional_address` varchar(255) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`mission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_mission
-- ----------------------------

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `can_order` tinyint(1) DEFAULT '0',
  `menu_content` text NOT NULL COMMENT 'JSON,例如combo_xxx,dish_xxx',
  `can_group_order` tinyint(1) DEFAULT '1',
  `menu_delivery_price` decimal(8,2) DEFAULT '0.00',
  `created` int(10) DEFAULT NULL,
  `menu_start_time` int(10) DEFAULT NULL,
  `menu_end_time` int(10) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL,
  `order_user_type` tinyint(1) NOT NULL,
  `order_user_id` int(11) NOT NULL,
  `order_total` decimal(8,2) DEFAULT '0.00',
  `store_id` int(11) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  `order_status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for `store`
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '店铺ID',
  `store_name` varchar(100) NOT NULL COMMENT '店铺名称',
  `store_domain` varchar(100) NOT NULL COMMENT '英文域名',
  `account_id` int(11) NOT NULL COMMENT '账户ID',
  `created` int(10) NOT NULL COMMENT '创建时间',
  `store_address` varchar(255) NOT NULL COMMENT '店铺地址',
  `store_phone` varchar(100) NOT NULL COMMENT '联系电话',
  `store_business_time` varchar(255) DEFAULT NULL COMMENT '营业时间',
  `store_info` text COMMENT '店铺介绍',
  `tag_store_id` int(11) DEFAULT NULL COMMENT '店铺标记ID',
  PRIMARY KEY (`store_id`),
  KEY `store_name` (`store_name`),
  KEY `store_domain` (`store_domain`),
  KEY `account_id` (`account_id`),
  KEY `created` (`created`),
  KEY `tag_store_id` (`tag_store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of store
-- ----------------------------

-- ----------------------------
-- Table structure for `sys_admin`
-- ----------------------------
DROP TABLE IF EXISTS `sys_admin`;
CREATE TABLE `sys_admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_group_id` tinyint(1) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_admin
-- ----------------------------
INSERT INTO `sys_admin` VALUES ('1', '1', 'admin', '1', '1354279261');

-- ----------------------------
-- Table structure for `sys_admin_group`
-- ----------------------------
DROP TABLE IF EXISTS `sys_admin_group`;
CREATE TABLE `sys_admin_group` (
  `admin_group_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `admin_group_name` varchar(100) NOT NULL,
  `admin_group_authoritys` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_admin_group
-- ----------------------------

-- ----------------------------
-- Table structure for `sys_authority`
-- ----------------------------
DROP TABLE IF EXISTS `sys_authority`;
CREATE TABLE `sys_authority` (
  `authority_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `authority_name` varchar(100) NOT NULL,
  `authority_app` varchar(100) DEFAULT NULL,
  `authority_controller` varchar(100) DEFAULT NULL,
  `authority_action` varchar(100) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`authority_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_authority
-- ----------------------------

-- ----------------------------
-- Table structure for `sys_authority_group`
-- ----------------------------
DROP TABLE IF EXISTS `sys_authority_group`;
CREATE TABLE `sys_authority_group` (
  `authority_group_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `authority_group_name` varchar(100) DEFAULT NULL,
  `authority_group_authoritys` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`authority_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_authority_group
-- ----------------------------
