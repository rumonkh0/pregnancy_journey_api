-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Linux (x86_64)
--
-- Host: sql.freedb.tech    Database: freedb_pregnancy_journey
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_role`
--

DROP TABLE IF EXISTS `admin_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_role` (
  `admin_id` int NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_role`
--

LOCK TABLES `admin_role` WRITE;
/*!40000 ALTER TABLE `admin_role` DISABLE KEYS */;
INSERT INTO `admin_role` VALUES (1,1),(2,1),(1,2),(1,5),(7,4),(7,3),(7,10),(7,11),(7,7),(8,1),(8,2),(8,3),(8,4),(8,5);
/*!40000 ALTER TABLE `admin_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `photo` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `admins_ibfk_1` (`photo`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`photo`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'rumonkh',NULL,NULL,'rummankh0@gmail.com','$2a$12$MdFpsfQjuDZXv0QOglil/.nkExSVTboZWX./nAZ9f4B6mjLKBfemu',64,'2024-02-07 19:54:34','2024-02-08 15:30:31'),(2,'armankhan',NULL,NULL,'armanakt@gmail.com','$2a$12$MdFpsfQjuDZXv0QOglil/.nkExSVTboZWX./nAZ9f4B6mjLKBfemu',NULL,'2024-02-07 19:55:13','2024-02-08 15:11:02'),(7,'selim',NULL,NULL,'selim@mail.com','$2b$10$LBiZU472IiMZtegEpnnKx.hTF.qYWSGpSHGZ0kNi1RQnQTmifBMem',NULL,'2024-02-10 20:07:08','2024-02-10 20:07:08'),(8,'admin',NULL,NULL,'admin@mail.com','$2b$10$BAULN3KdcWXmmJUeebDxmO00jki9xB5qw9YjGUfZgJhOWIOsYCq/m',NULL,'2024-03-04 14:49:36','2024-03-04 14:49:36'),(9,'nandfasdf','notun','admin','selimrezaibsnal@gmail.com','$2b$10$LAz7Ur4QLL95Bla3QPxMpumVhKjqG31tx.wGxWyvQbTUI/piuIS02',NULL,'2024-03-11 17:23:33','2024-03-11 17:23:33');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `antenatal_visit`
--

DROP TABLE IF EXISTS `antenatal_visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `antenatal_visit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `visit_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `doctor_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `visit_no` int NOT NULL,
  `hospital_address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `receptionist` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mobile` int NOT NULL,
  `visit_date` datetime NOT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `antenatal_visit_ibfk_1` (`user_id`),
  CONSTRAINT `antenatal_visit_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antenatal_visit`
--

LOCK TABLES `antenatal_visit` WRITE;
/*!40000 ALTER TABLE `antenatal_visit` DISABLE KEYS */;
INSERT INTO `antenatal_visit` VALUES (4,12,'Regular checkup58fdfkdngdfbg b  ','Dr. Arman',1,'123 Medical Center, Main Street, City','Receptionist Name',1234567890,'2024-03-12 00:00:00','Patient is doing well, no complications.','2024-04-02 17:24:34','2024-02-24 16:47:50');
/*!40000 ALTER TABLE `antenatal_visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_breast_pumping`
--

DROP TABLE IF EXISTS `baby_breast_pumping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_breast_pumping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `baby_id` int unsigned DEFAULT NULL,
  `right_milk_amount` int DEFAULT NULL,
  `left_milk_amount` int DEFAULT NULL,
  `total_milk` int DEFAULT NULL,
  `left_duration` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `right_duration` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total_duration` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_11` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_breast_pumping`
--

LOCK TABLES `baby_breast_pumping` WRITE;
/*!40000 ALTER TABLE `baby_breast_pumping` DISABLE KEYS */;
INSERT INTO `baby_breast_pumping` VALUES (32,23,58,68,126,'7 minutes','9 minutes','16 minutes','2023-11-28 08:00:00','2023-11-28 17:03:24'),(33,23,58,68,2147483647,'7 minutes','9 minutes','16 minutes','2023-11-28 08:00:00','2023-11-28 17:03:36');
/*!40000 ALTER TABLE `baby_breast_pumping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_diaper`
--

DROP TABLE IF EXISTS `baby_diaper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_diaper` (
  `id` int NOT NULL AUTO_INCREMENT,
  `baby_id` int unsigned NOT NULL,
  `status` enum('clean','poo','pee','mixed') COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `number` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_6` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_diaper`
--

LOCK TABLES `baby_diaper` WRITE;
/*!40000 ALTER TABLE `baby_diaper` DISABLE KEYS */;
INSERT INTO `baby_diaper` VALUES (12,23,'pee','2023-11-28 16:58:54','2023-11-28 16:58:54',1),(16,27,'pee','2023-11-29 11:46:40','2023-11-29 11:46:40',2147483647),(17,27,'pee','2024-04-02 17:22:12','2024-04-02 17:22:12',2147483647);
/*!40000 ALTER TABLE `baby_diaper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_feed`
--

DROP TABLE IF EXISTS `baby_feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_feed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `baby_id` int unsigned NOT NULL,
  `feed_type` enum('breast','bottle','solid') COLLATE utf8mb4_general_ci NOT NULL,
  `left_duration` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `right_duration` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total_duration` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bottle_amount` double DEFAULT NULL,
  `solid_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `solid_amount` double DEFAULT NULL COMMENT 'gram',
  `feed_time` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2` (`baby_id`),
  CONSTRAINT `FK_5` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='ml';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_feed`
--

LOCK TABLES `baby_feed` WRITE;
/*!40000 ALTER TABLE `baby_feed` DISABLE KEYS */;
INSERT INTO `baby_feed` VALUES (32,23,'breast','100 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 08:00:00','2023-11-28 16:57:45'),(33,23,'breast','100 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 08:00:00','2023-11-28 16:58:04'),(34,23,'breast','100 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 16:59:17','2023-11-28 16:59:17'),(35,23,'breast','10000000000000000000000000000 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 17:02:13','2023-11-28 17:02:13'),(39,27,'breast','10000000000000000000000000000 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-29 11:47:08','2023-11-29 11:47:08'),(40,27,'breast','10000000000000000000000000000 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2024-02-24 18:13:48','2024-02-24 18:13:48'),(41,27,'breast','10000000000000000000000000000 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2024-02-24 18:19:11','2024-02-24 18:19:11'),(42,27,'breast','10000000000000000000000000000 minutes',NULL,'232 minutes',100,NULL,NULL,'2023-11-28 08:00:00','2024-02-24 18:20:26','2024-02-24 18:20:26');
/*!40000 ALTER TABLE `baby_feed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_gallery`
--

DROP TABLE IF EXISTS `baby_gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_id` int NOT NULL,
  `baby_id` int unsigned DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_2` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_gallery`
--

LOCK TABLES `baby_gallery` WRITE;
/*!40000 ALTER TABLE `baby_gallery` DISABLE KEYS */;
INSERT INTO `baby_gallery` VALUES (1,5,27,'public\\uploads\\baby\\file-1701281545638.jpg','{ \"bn\": \"amara\", \"en\": \"hello\"}','2023-11-29 18:12:25','2023-11-29 18:12:25'),(2,1,27,'public\\uploads\\baby\\file-1701281616470.jpg','first photo','2023-11-29 18:13:36','2023-11-29 18:13:36'),(3,5,27,'public\\uploads\\baby\\file-1701281617905.jpg','first photo','2023-11-29 18:13:37','2023-11-29 18:13:37'),(4,1,27,'public\\uploads\\baby\\file-1701281619081.jpg','first photo','2023-11-29 18:13:39','2023-11-29 18:13:39'),(5,5,27,'public\\uploads\\baby\\file-1701428051879.png','first photo','2023-12-01 10:54:11','2023-12-01 10:54:11'),(6,0,27,'public\\uploads\\baby\\file-1701715188194.png','first photo','2023-12-04 18:39:48','2023-12-04 18:39:48'),(20,15,27,'public\\uploads\\baby\\baby_Image_file-shapla-1704273230102.jpg','with core and multipart','2024-01-03 09:13:50','2024-01-03 09:13:50'),(21,16,27,'public\\uploads\\baby\\baby_Image_file-shapla-1704303883116.jpg','with core and multipart','2024-01-03 17:44:43','2024-01-03 17:44:43'),(22,17,23,'public\\uploads\\baby\\baby_Image_file-shapla-1704305675654.jpg','with core and multipart','2024-01-03 18:14:35','2024-01-03 18:14:35');
/*!40000 ALTER TABLE `baby_gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_growth_weekly`
--

DROP TABLE IF EXISTS `baby_growth_weekly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_growth_weekly` (
  `id` int NOT NULL AUTO_INCREMENT,
  `baby_size_image` int DEFAULT NULL,
  `week_number` int NOT NULL,
  `day` int NOT NULL,
  `weight` text COLLATE utf8mb4_general_ci NOT NULL,
  `size` text COLLATE utf8mb4_general_ci NOT NULL,
  `body_change` text COLLATE utf8mb4_general_ci,
  `baby_details` text COLLATE utf8mb4_general_ci,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_growth_weekly`
--

LOCK TABLES `baby_growth_weekly` WRITE;
/*!40000 ALTER TABLE `baby_growth_weekly` DISABLE KEYS */;
