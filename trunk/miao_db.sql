/*
MySQL Data Transfer
Source Host: localhost
Source Database: miao_db
Target Host: localhost
Target Database: miao_db
Date: 2013-05-29 0:34:17
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for ##area(已分别建表)
-- ----------------------------
CREATE TABLE `##area(已分别建表)` (
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
-- Table structure for ##category_combo(暂时不考虑套餐)
-- ----------------------------
CREATE TABLE `##category_combo(暂时不考虑套餐)` (
  `category_combo_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_combo_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ##combo(暂时不考虑套餐)
-- ----------------------------
CREATE TABLE `##combo(暂时不考虑套餐)` (
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
-- Table structure for ##dish_price_group(暂时不考虑价格组)
-- ----------------------------
CREATE TABLE `##dish_price_group(暂时不考虑价格组)` (
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
-- Table structure for ##menu(暂时合并到store表中)
-- ----------------------------
CREATE TABLE `##menu(暂时合并到store表中)` (
  `account_id` varchar(32) NOT NULL,
  `is_online` tinyint(1) DEFAULT '0',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  `category_with_dish` text,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `account_id` varchar(32) NOT NULL COMMENT '账户ID',
  `email` varchar(64) NOT NULL COMMENT '账户名',
  `paswd` varchar(100) NOT NULL COMMENT '账户密码',
  `is_checked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`account_id`),
  KEY `account_name` (`email`)
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
  `district_name` varchar(20) DEFAULT NULL,
  `place_type` tinyint(1) NOT NULL,
  `start_with` varchar(2) DEFAULT NULL,
  `long_lat` varchar(60) DEFAULT NULL,
  `latitude` double(10,6) DEFAULT NULL COMMENT '纬度',
  `longitude` double(10,6) DEFAULT NULL COMMENT '经度',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`place_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for core_custom
-- ----------------------------
CREATE TABLE `core_custom` (
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
-- Table structure for core_custom_address
-- ----------------------------
CREATE TABLE `core_custom_address` (
  `book_address_id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `geogroup_id` int(11) NOT NULL,
  `additional_address` varchar(255) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`book_address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for core_custom_group_link
-- ----------------------------
CREATE TABLE `core_custom_group_link` (
  `group_id` varchar(32) NOT NULL,
  `custom_id` varchar(32) NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`group_id`,`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for core_group
-- ----------------------------
CREATE TABLE `core_group` (
  `group_id` varchar(32) NOT NULL,
  `group_name` varchar(200) NOT NULL,
  `create_custom_id` varchar(32) NOT NULL,
  `group_info` varchar(255) DEFAULT NULL,
  `group_check` tinyint(1) DEFAULT '0',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for core_group_admin_link
-- ----------------------------
CREATE TABLE `core_group_admin_link` (
  `group_id` varchar(32) NOT NULL,
  `custom_id` varchar(32) NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`group_id`,`custom_id`)
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
  `dish_id` varchar(32) NOT NULL,
  `account_id` varchar(32) DEFAULT NULL,
  `category_id` varchar(32) DEFAULT NULL,
  `dish_name` varchar(255) NOT NULL,
  `dish_push` tinyint(1) DEFAULT '0' COMMENT '上下架',
  `dish_logo` varchar(255) DEFAULT NULL,
  `dish_info` text,
  `dish_price` decimal(8,2) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dish_category
-- ----------------------------
CREATE TABLE `dish_category` (
  `category_id` varchar(32) NOT NULL,
  `account_id` varchar(32) DEFAULT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_orderby` int(11) DEFAULT '0',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `account_id` varchar(32) NOT NULL,
  `is_online` tinyint(1) DEFAULT '0',
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`account_id`)
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
  `account_id` varchar(32) NOT NULL COMMENT '账户ID',
  `store_name` varchar(100) NOT NULL COMMENT '店铺名称',
  `store_type` tinyint(1) DEFAULT NULL COMMENT '店铺类型',
  `store_phone` varchar(100) NOT NULL COMMENT '联系电话',
  `store_qq` varchar(20) DEFAULT NULL,
  `store_contacts` varchar(15) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `store_address` varchar(255) NOT NULL COMMENT '店铺地址',
  `long_lat` varchar(30) DEFAULT NULL COMMENT '店铺经纬度',
  `latitude` double(10,6) DEFAULT NULL,
  `longitude` double(10,6) DEFAULT NULL,
  `store_places` text,
  `store_info` text COMMENT '店铺介绍',
  `is_online` tinyint(1) DEFAULT '0',
  `category_with_dish` text,
  `created` int(10) DEFAULT NULL,
  `updated` int(10) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `store_name` (`store_name`),
  KEY `account_id` (`account_id`),
  KEY `tag_store_id` (`store_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for store_order
-- ----------------------------
CREATE TABLE `store_order` (
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
INSERT INTO `##dish_price_group(暂时不考虑价格组)` VALUES ('1', '1', '默认', '999999.99', '份', '元', '0', '1111.00');
INSERT INTO `##menu(暂时合并到store表中)` VALUES ('26d3fcb43dedde30903d1b9195ab8b9f', '1', '1368415819', '1369717103', '{\"fdd1ff2d66413212f61ae8c962c8e3de\":{\"Dish\":[{\"dish_id\":\"07a3eeaec94bacd6a08e0d61aeb9eb36\",\"account_id\":\"26d3fcb43dedde30903d1b9195ab8b9f\",\"category_id\":\"fdd1ff2d66413212f61ae8c962c8e3de\",\"dish_name\":\"\\u841d\\u535c\\u76d6\\u6d47\\u996d\",\"dish_push\":\"1\",\"dish_logo\":null,\"dish_info\":\"\",\"dish_price\":\"15.00\",\"created\":\"1368858737\",\"updated\":\"1369716870\"}]}}');
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
INSERT INTO `account` VALUES ('12e33bef69171ca68397726e424649ea', '', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('19a54558931ae01ff873de4791b01572', '', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('1b7023a963e0079b23ce9020caab994b', '55@cc.com', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('26d3fcb43dedde30903d1b9195ab8b9f', '55@c2.com', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('279588c6a103331c2d3a346c7b41e94e', '222@mail.com', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('3487654b63403f3a6d4b2e5c3bbb2878', '22@cc.om', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('6bf10f53006fe968c406b5cd432ca566', '11@11.com', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('7547285febdb87a4d99fec42ccf3ae61', '45@cc.com', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('8f01f57dc627280f897f4c7bd1c33a7b', '44@cc.com', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('9ff4ff379b3a55feddda3847d0a7acfe', '222@fff.com', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('a1333da477bbcbd1b75425b60698a860', '55con@c2.com', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('a7478d7a484313f286c2b212f160e02a', '', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `account` VALUES ('dc45c515635b7b23791471b001e7b7a7', '', '69b9d7f1b61c986d9d1b00a602bbdcd27a908d5087585eead5f76cd16e63f15d', null);
INSERT INTO `account` VALUES ('e85c66f2d1e036ef43674f3c2c1d2ece', '2@ff.oc', '3c705ee140ca9df8cea3b46f36d470f4ec771846a4bd1b17bd96f2657a168cb4', null);
INSERT INTO `area_city` VALUES ('1', '宁波', '5', 'n', '29.885259,121.579006', '29.885259000000000000000000000', '121.579006000000000000000000000', '1367588839', '1367740237');
INSERT INTO `area_city` VALUES ('2', '绍兴', '5', 's', '30.002365,120.592467', '30.002365000000000000000000000', '120.592467000000000000000000000', '1367730065', '1367740404');
INSERT INTO `area_city` VALUES ('3', '杭州', '5', 'h', '30.259244,120.219375', '30.259244000000000000000000000', '120.219375000000000000000000000', '1367730148', '1367740389');
INSERT INTO `area_city` VALUES ('4', '上海', '2', 's', '31.249162,121.487899', '31.249162000000000000000000000', '121.487899000000000000000000000', '1367730327', '1367740354');
INSERT INTO `area_city` VALUES ('5', '台州', '5', 't', '28.656522,121.420748', '28.656522000000000000000000000', '121.420748000000000000000000000', '1367745353', '1367745353');
INSERT INTO `area_city` VALUES ('6', '温州', '5', 'w', '27.994799,120.699298', '27.994799000000000000000000000', '120.699298000000000000000000000', '1367745417', '1367745784');
INSERT INTO `area_district` VALUES ('1', '鄞州', '1', 'y', '29.785459,121.537835', '29.785459000000000000000000000', '121.537835000000000000000000000', '1367588839', '1367740572');
INSERT INTO `area_district` VALUES ('2', '海曙', '1', 'h', '29.876801,121.535395', '29.876801000000000000000000000', '121.535395000000000000000000000', '1367730721', '1367740551');
INSERT INTO `area_district` VALUES ('3', '新昌', '2', 'x', '29.500872,120.903683', '29.500872000000000000000000000', '120.903683000000000000000000000', '1367746023', '1367746075');
INSERT INTO `area_place` VALUES ('1', '和邦大厦', '', '1', '1', '鄞州', '1', 'h', '29.84021,121.560865', '29.840210', '121.560865', '1367645992', '1367741332');
INSERT INTO `area_place` VALUES ('2', '名汇国际', '锦寓路666号', '1', '1', '鄞州', '1', 'm', '29.834559,121.561365', '29.834559', '121.561365', '1367651220', '1367740885');
INSERT INTO `area_place` VALUES ('4', '南裕新村二期', '泰康中路215号', '1', '1', '鄞州', '2', 'n', '29.812397,121.559455', '29.812397', '121.559455', '1367656749', '1367741307');
INSERT INTO `area_place` VALUES ('5', '南裕新村', '', '1', '1', '鄞州', '2', 'n', '29.785459,121.537835', '29.785459', '121.537835', '1367731177', '1367741356');
INSERT INTO `area_place` VALUES ('6', '银河湾', '它山堰路918', '1', '1', '鄞州', '2', 'y', '29.810971,121.539975', '29.810971', '121.539975', '1367735676', '1367741189');
INSERT INTO `area_place` VALUES ('7', '宁海食府(四明中路店)', '鄞州区四明中路613号(近锦寓路)', '1', '1', '鄞州', '5', 'n', '29.832867,121.561698', '29.832867', '121.561698', '1367739859', '1367740651');
INSERT INTO `area_place` VALUES ('8', '宁波博物馆', '首南中路1000号', '1', '1', '鄞州', '6', 'n', '29.814425, 121.544843', '29.814425', '121.544843', '1367746397', '1367746437');
INSERT INTO `dish` VALUES ('07a3eeaec94bacd6a08e0d61aeb9eb36', '26d3fcb43dedde30903d1b9195ab8b9f', 'fdd1ff2d66413212f61ae8c962c8e3de', '萝卜盖浇饭', '1', null, '', '15.00', '1368858737', '1369716870');
INSERT INTO `dish_category` VALUES ('fdd1ff2d66413212f61ae8c962c8e3de', '26d3fcb43dedde30903d1b9195ab8b9f', '盖浇饭系列', '0', '1368855135', '1368855135');
INSERT INTO `menu` VALUES ('26d3fcb43dedde30903d1b9195ab8b9f', '0', '1368415819', '1368853137');
INSERT INTO `store` VALUES ('12e33bef69171ca68397726e424649ea', '555', '7', '11111', '11', '11', '1', '1', '22', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '555', null, null, '1368415363', '1368415363');
INSERT INTO `store` VALUES ('19a54558931ae01ff873de4791b01572', '11', '2', '777777', '3333', 'fff', '1', '2', 'ffff', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '4444', null, null, '1368413236', '1368413236');
INSERT INTO `store` VALUES ('1b7023a963e0079b23ce9020caab994b', '555', '1', '1111', '11', '11', '1', '1', '11', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '455', null, null, '1368415724', '1368415724');
INSERT INTO `store` VALUES ('26d3fcb43dedde30903d1b9195ab8b9f', '555', '1', '222', '2', '22', '1', '1', '22', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '555', '0', '{\"fdd1ff2d66413212f61ae8c962c8e3de\":{\"Dish\":[{\"dish_id\":\"07a3eeaec94bacd6a08e0d61aeb9eb36\",\"account_id\":\"26d3fcb43dedde30903d1b9195ab8b9f\",\"category_id\":\"fdd1ff2d66413212f61ae8c962c8e3de\",\"dish_name\":\"\\u841d\\u535c\\u76d6\\u6d47\\u996d\",\"dish_push\":\"1\",\"dish_logo\":null,\"dish_info\":\"\",\"dish_price\":\"15.00\",\"created\":\"1368858737\",\"updated\":\"1369716870\"}]}}', '1368415819', '1369729263');
INSERT INTO `store` VALUES ('279588c6a103331c2d3a346c7b41e94e', '11111', '2', '13567893344', '33333', 'ff', '1', '1', '333', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',,', 'hhhhhhhhh', null, null, '1368412644', '1368412644');
INSERT INTO `store` VALUES ('3487654b63403f3a6d4b2e5c3bbb2878', '22', '2', '22222', '22', '22', '1', '2', '222', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', 'ffff', null, null, '1368414743', '1368414743');
INSERT INTO `store` VALUES ('6bf10f53006fe968c406b5cd432ca566', '111', '2', '888888', '', '11', '1', '2', 'dddd', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',,', '55555', null, null, '1368412397', '1368412397');
INSERT INTO `store` VALUES ('7547285febdb87a4d99fec42ccf3ae61', '33', '1', '2222', '22', '22', '1', '1', '33', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '5555', null, null, '1368415265', '1368415265');
INSERT INTO `store` VALUES ('8f01f57dc627280f897f4c7bd1c33a7b', '44', '1', '111111', '11', '11', '1', '1', '111', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '444', null, null, '1368414847', '1368414847');
INSERT INTO `store` VALUES ('9ff4ff379b3a55feddda3847d0a7acfe', '222', '11', '22222', '22', '22', '1', '2', '333', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '455', null, null, '1368414957', '1368414957');
INSERT INTO `store` VALUES ('a1333da477bbcbd1b75425b60698a860', '555', '1', '222', '33', '33', '1', '1', '33', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '555', null, null, '1368415987', '1368415987');
INSERT INTO `store` VALUES ('a7478d7a484313f286c2b212f160e02a', '55', '1', '3333', '33', '33', '1', '1', '33', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '555', null, null, '1368415128', '1368415128');
INSERT INTO `store` VALUES ('dc45c515635b7b23791471b001e7b7a7', '77', '1', '33333', '33', '33', '1', '2', '33', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', '455', null, null, '1368415005', '1368415005');
INSERT INTO `store` VALUES ('e85c66f2d1e036ef43674f3c2c1d2ece', '3f', '2', '888888', '222', 'ff', '1', '2', 'fff', '29.868335999999996,121.5439900', '29.868336', '121.543990', ',1,2,7,8,6,4,5,', 'fdfff', null, null, '1368412764', '1368412764');
INSERT INTO `sys_admin` VALUES ('1', '1', 'admin', '1', '1354279261');
