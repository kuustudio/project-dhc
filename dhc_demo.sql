/*
MySQL Data Transfer
Source Host: localhost
Source Database: dhc_demo
Target Host: localhost
Target Database: dhc_demo
Date: 2012/11/27 0:14:12
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for area
-- ----------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for category_combo
-- ----------------------------
CREATE TABLE `category_combo` (
  `category_combo_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_combo_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for category_dish
-- ----------------------------
CREATE TABLE `category_dish` (
  `category_dish_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_dish_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for combo
-- ----------------------------
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
-- Table structure for custom
-- ----------------------------
CREATE TABLE `custom` (
  `custom_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for dish
-- ----------------------------
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
-- Table structure for group
-- ----------------------------
CREATE TABLE `group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  `group_type` enum('') DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
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
-- Table structure for order
-- ----------------------------
CREATE TABLE `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL,
  `order_user_type` enum('group','custom') NOT NULL DEFAULT 'custom',
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
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_name` varchar(100) NOT NULL,
  `created` int(10) DEFAULT NULL,
  `store_address` varchar(255) DEFAULT NULL,
  `store_phone` varchar(100) DEFAULT NULL,
  `store_business_time` varchar(255) DEFAULT NULL,
  `store_info` text,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `dish_price_group` VALUES ('1', '1', '默认', '999999.99', '份', '元', '0', '1111.00');
