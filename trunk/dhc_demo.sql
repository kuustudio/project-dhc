/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : 127.0.0.1:3306
Source Database       : dhc_demo

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2012-11-26 17:02:58
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `category_combo`
-- ----------------------------
DROP TABLE IF EXISTS `category_combo`;
CREATE TABLE `category_combo` (
  `category_combo_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_combo_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `combo_unit` varchar(10) CHARACTER SET utf8 DEFAULT '份',
  `combo_currency` varchar(10) CHARACTER SET utf8 DEFAULT '元',
  `combo_num` int(11) DEFAULT '0',
  `combo_price` decimal(8,2) DEFAULT '0.00',
  `combo_tag` varchar(255) DEFAULT NULL,
  `combo_promotion` decimal(8,2) DEFAULT '0.00',
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of combo
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
  `dish_unit` varchar(10) CHARACTER SET utf8 DEFAULT '份',
  `dish_currency` varchar(10) CHARACTER SET utf8 DEFAULT '元',
  `dish_num` int(11) DEFAULT '0',
  `dish_promotion` decimal(8,2) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `price_group_name` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '默认',
  `price_group_price` decimal(8,2) NOT NULL,
  `price_group_unit` varchar(10) CHARACTER SET utf8 DEFAULT '份',
  `price_group_currency` varchar(10) CHARACTER SET utf8 DEFAULT '元',
  `price_group_num` int(11) DEFAULT '0',
  `price_group_promotion` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`price_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dish_price_group
-- ----------------------------
INSERT INTO `dish_price_group` VALUES ('1', '1', '默认', '999999.99', '份', '元', '0', '1111.00');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of menu
-- ----------------------------

-- ----------------------------
-- Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL,
  `order_user_type` enum('group','custom') DEFAULT 'custom',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for `store`
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_name` varchar(100) NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of store
-- ----------------------------
