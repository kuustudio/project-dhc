/*
MySQL Data Transfer
Source Host: localhost
Source Database: miao_db
Target Host: localhost
Target Database: miao_db
Date: 2013-05-05 23:02:17
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for ##tag_store(移到模型中静态)
-- ----------------------------
CREATE TABLE `##tag_store(移到模型中静态)` (
  `tag_store_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_store_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tag_store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for account
-- ----------------------------
CREATE TABLE `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '账户ID',
  `email` varchar(100) NOT NULL COMMENT '账户名',
  `paswd` varchar(100) NOT NULL COMMENT '账户密码',
  `created` int(10) DEFAULT NULL COMMENT '创建时间',
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `account_name` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for area_city
-- ----------------------------
CREATE TABLE `area_city` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `city_name` varchar(20) NOT NULL COMMENT '城市名称',
  `parent_province` tinyint(1) NOT NULL COMMENT '所属省',
  `start_with` varchar(2) NOT NULL COMMENT '以什么字母开头',
  `long_lat` varchar(60) DEFAULT NULL COMMENT '经纬度',
  `latitude` double(30,27) DEFAULT NULL COMMENT '纬度',
  `longitude` double(30,27) DEFAULT NULL COMMENT '经度',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for area_district
-- ----------------------------
CREATE TABLE `area_district` (
  `district_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `district_name` varchar(20) NOT NULL COMMENT '区域名称',
  `city_id` tinyint(1) NOT NULL COMMENT '所属城市',
  `start_with` varchar(2) NOT NULL COMMENT '以什么字母开头',
  `long_lat` varchar(60) DEFAULT NULL COMMENT '经纬度',
  `latitude` double(30,27) DEFAULT NULL COMMENT '纬度',
  `longitude` double(30,27) DEFAULT NULL COMMENT '经度',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`district_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for area_place
-- ----------------------------
CREATE TABLE `area_place` (
  `place_id` int(11) NOT NULL AUTO_INCREMENT,
  `place_name` varchar(20) NOT NULL,
  `place_info` varchar(200) DEFAULT NULL,
  `city_id` int(11) NOT NULL,
  `district_id` int(11) NOT NULL,
  `place_type` tinyint(1) NOT NULL,
  `start_with` varchar(2) DEFAULT NULL,
  `long_lat` varchar(60) DEFAULT NULL,
  `latitude` double(30,27) DEFAULT NULL COMMENT '纬度',
  `longitude` double(30,27) DEFAULT NULL COMMENT '经度',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`place_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for category_combo
-- ----------------------------
CREATE TABLE `category_combo` (
  `category_combo_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_combo_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for category_dish
-- ----------------------------
CREATE TABLE `category_dish` (
  `category_dish_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_dish_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for combo
-- ----------------------------
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
-- Table structure for custom
-- ----------------------------
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
-- Table structure for custom_book_address
-- ----------------------------
CREATE TABLE `custom_book_address` (
  `book_address_id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `geogroup_id` int(11) NOT NULL,
  `additional_address` varchar(255) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`book_address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `dish_unit` varchar(10) DEFAULT '份',
  `dish_currency` varchar(10) DEFAULT '元',
  `dish_num` int(11) DEFAULT '0',
  `dish_promotion` decimal(8,2) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dish_price_group
-- ----------------------------
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
-- Table structure for group_chowhound
-- ----------------------------
CREATE TABLE `group_chowhound` (
  `chowhound_id` int(11) NOT NULL AUTO_INCREMENT,
  `chowhound_name` varchar(100) NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`chowhound_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `geo_name` varchar(100) NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`geo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for group_mission
-- ----------------------------
CREATE TABLE `group_mission` (
  `mission_id` int(11) NOT NULL AUTO_INCREMENT,
  `geo_id` int(11) NOT NULL,
  `mission_name` varchar(100) NOT NULL,
  `additional_address` varchar(255) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`mission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
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
-- Table structure for store
-- ----------------------------
CREATE TABLE `store` (
  `account_id` int(11) NOT NULL COMMENT '账户ID',
  `store_name` varchar(100) NOT NULL COMMENT '店铺名称',
  `store_type` tinyint(1) DEFAULT NULL COMMENT '店铺类型',
  `store_phone` varchar(100) NOT NULL COMMENT '联系电话',
  `store_qq` varchar(20) DEFAULT NULL,
  `store_contacts` varchar(15) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `store_address` varchar(255) NOT NULL COMMENT '店铺地址',
  `long_lat` varchar(30) DEFAULT NULL COMMENT '店铺经纬度',
  `store_info` text COMMENT '店铺介绍',
  PRIMARY KEY (`account_id`),
  KEY `store_name` (`store_name`),
  KEY `account_id` (`account_id`),
  KEY `tag_store_id` (`store_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_admin
-- ----------------------------
CREATE TABLE `sys_admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_group_id` tinyint(1) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_admin_group
-- ----------------------------
CREATE TABLE `sys_admin_group` (
  `admin_group_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `admin_group_name` varchar(100) NOT NULL,
  `admin_group_authoritys` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_authority
-- ----------------------------
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
-- Table structure for sys_authority_group
-- ----------------------------
CREATE TABLE `sys_authority_group` (
  `authority_group_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `authority_group_name` varchar(100) DEFAULT NULL,
  `authority_group_authoritys` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`authority_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
INSERT INTO `area_city` VALUES ('1', '宁波', '5', 'n', '29.885259,121.579006', '29.885259000000000000000000000', '121.579006000000000000000000000', '1367588839', '1367740237');
INSERT INTO `area_city` VALUES ('2', '绍兴', '5', 's', '30.002365,120.592467', '30.002365000000000000000000000', '120.592467000000000000000000000', '1367730065', '1367740404');
INSERT INTO `area_city` VALUES ('3', '杭州', '5', 'h', '30.259244,120.219375', '30.259244000000000000000000000', '120.219375000000000000000000000', '1367730148', '1367740389');
INSERT INTO `area_city` VALUES ('4', '上海', '2', 's', '31.249162,121.487899', '31.249162000000000000000000000', '121.487899000000000000000000000', '1367730327', '1367740354');
INSERT INTO `area_city` VALUES ('5', '台州', '5', 't', '28.656522,121.420748', '28.656522000000000000000000000', '121.420748000000000000000000000', '1367745353', '1367745353');
INSERT INTO `area_city` VALUES ('6', '温州', '5', 'w', '27.994799,120.699298', '27.994799000000000000000000000', '120.699298000000000000000000000', '1367745417', '1367745784');
INSERT INTO `area_district` VALUES ('1', '鄞州', '1', 'y', '29.785459,121.537835', '29.785459000000000000000000000', '121.537835000000000000000000000', '1367588839', '1367740572');
INSERT INTO `area_district` VALUES ('2', '海曙', '1', 'h', '29.876801,121.535395', '29.876801000000000000000000000', '121.535395000000000000000000000', '1367730721', '1367740551');
INSERT INTO `area_district` VALUES ('3', '新昌', '2', 'x', '29.500872,120.903683', '29.500872000000000000000000000', '120.903683000000000000000000000', '1367746023', '1367746075');
INSERT INTO `area_place` VALUES ('1', '和邦大厦', '', '1', '1', '1', 'h', '29.84021,121.560865', '29.840210000000000000000000000', '121.560865000000000000000000000', '1367645992', '1367741332');
INSERT INTO `area_place` VALUES ('2', '名汇国际', '锦寓路666号', '1', '1', '1', 'm', '29.834559,121.561365', '29.834559000000000000000000000', '121.561365000000000000000000000', '1367651220', '1367740885');
INSERT INTO `area_place` VALUES ('4', '南裕新村二期', '泰康中路215号', '1', '1', '2', 'n', '29.812397,121.559455', '29.812397000000000000000000000', '121.559455000000000000000000000', '1367656749', '1367741307');
INSERT INTO `area_place` VALUES ('5', '南裕新村', '', '1', '1', '2', 'n', '29.785459,121.537835', '29.785459000000000000000000000', '121.537835000000000000000000000', '1367731177', '1367741356');
INSERT INTO `area_place` VALUES ('6', '银河湾', '它山堰路918', '1', '1', '2', 'y', '29.810971,121.539975', '29.810971000000000000000000000', '121.539975000000000000000000000', '1367735676', '1367741189');
INSERT INTO `area_place` VALUES ('7', '宁海食府(四明中路店)', '鄞州区四明中路613号(近锦寓路)', '1', '1', '5', 'n', '29.832867,121.561698', '29.832867000000000000000000000', '121.561698000000000000000000000', '1367739859', '1367740651');
INSERT INTO `area_place` VALUES ('8', '宁波博物馆', '首南中路1000号', '1', '1', '6', 'n', '29.814425, 121.544843', '29.814425000000000000000000000', '121.544843000000000000000000000', '1367746397', '1367746437');
INSERT INTO `dish_price_group` VALUES ('1', '1', '默认', '999999.99', '份', '元', '0', '1111.00');
INSERT INTO `sys_admin` VALUES ('1', '1', 'admin', '1', '1354279261');
