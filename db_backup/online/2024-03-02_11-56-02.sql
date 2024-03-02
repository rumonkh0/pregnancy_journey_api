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
INSERT INTO `admin_role` VALUES (1,1),(2,1),(1,2),(1,5),(7,4),(7,3),(7,10),(7,11),(7,7);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'rumonkh','rummankh0@gmail.com','$2a$12$MdFpsfQjuDZXv0QOglil/.nkExSVTboZWX./nAZ9f4B6mjLKBfemu',64,'2024-02-07 19:54:34','2024-02-08 15:30:31'),(2,'armankhan','armanakt@gmail.com','$2a$12$MdFpsfQjuDZXv0QOglil/.nkExSVTboZWX./nAZ9f4B6mjLKBfemu',NULL,'2024-02-07 19:55:13','2024-02-08 15:11:02'),(7,'selim','selim@mail.com','$2b$10$LBiZU472IiMZtegEpnnKx.hTF.qYWSGpSHGZ0kNi1RQnQTmifBMem',NULL,'2024-02-10 20:07:08','2024-02-10 20:07:08');
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
INSERT INTO `antenatal_visit` VALUES (3,12,'Regular checkup','Dr. Smith',1,'123 Medical Center, Main Street, City','Receptionist Name',1234567890,'2023-12-21 09:00:00','Patient is doing well, no complications.','2024-02-24 16:47:40','2024-02-24 16:47:40'),(4,12,'Regular checkup','Dr. Arman',1,'123 Medical Center, Main Street, City','Receptionist Name',1234567890,'2023-12-21 09:00:00','Patient is doing well, no complications.','2024-02-24 18:23:50','2024-02-24 16:47:50');
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_breast_pumping`
--

LOCK TABLES `baby_breast_pumping` WRITE;
/*!40000 ALTER TABLE `baby_breast_pumping` DISABLE KEYS */;
INSERT INTO `baby_breast_pumping` VALUES (32,23,58,68,126,'7 minutes','9 minutes','16 minutes','2023-11-28 08:00:00','2023-11-28 17:03:24'),(33,23,58,68,2147483647,'7 minutes','9 minutes','16 minutes','2023-11-28 08:00:00','2023-11-28 17:03:36'),(35,23,1,1,2,'0.00 min','0.00 min','0.00 min','2024-03-01 08:37:21','2024-03-01 08:37:21');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_diaper`
--

LOCK TABLES `baby_diaper` WRITE;
/*!40000 ALTER TABLE `baby_diaper` DISABLE KEYS */;
INSERT INTO `baby_diaper` VALUES (12,23,'pee','2023-11-28 16:58:54','2023-11-28 16:58:54',1),(16,27,'pee','2023-11-29 11:46:40','2023-11-29 11:46:40',2147483647);
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
/*!40000 ALTER TABLE `baby_growth_weekly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_list`
--

DROP TABLE IF EXISTS `baby_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_list` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `mother_id` int unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `photo` int DEFAULT NULL,
  `baby_serial` int DEFAULT NULL,
  `gender` varchar(45) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'male=1 female=2',
  `birth_date` datetime DEFAULT NULL,
  `first_move` datetime DEFAULT NULL,
  `first_heartbeat` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`mother_id`),
  KEY `photo` (`photo`),
  CONSTRAINT `baby_list_ibfk_1` FOREIGN KEY (`photo`) REFERENCES `media` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_1` FOREIGN KEY (`mother_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_list`
--

LOCK TABLES `baby_list` WRITE;
/*!40000 ALTER TABLE `baby_list` DISABLE KEYS */;
INSERT INTO `baby_list` VALUES (23,12,'Baby3',76,1,'male','2023-05-20 00:00:00','2023-06-01 00:00:00','2023-06-15 00:00:00','2023-02-01 00:00:00',NULL),(27,12,'arman b',138,1,'male','2023-01-10 00:00:00','2023-01-20 00:00:00','2023-02-01 00:00:00','2023-11-29 11:44:06','2024-03-01 08:50:53');
/*!40000 ALTER TABLE `baby_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_medications`
--

DROP TABLE IF EXISTS `baby_medications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_medications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dose` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `baby_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_19` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_medications`
--

LOCK TABLES `baby_medications` WRITE;
/*!40000 ALTER TABLE `baby_medications` DISABLE KEYS */;
INSERT INTO `baby_medications` VALUES (1,'napa','1 spoon','2024-02-25 06:58:12','2024-02-25 06:58:12',27),(2,'napa','5 spoon','2024-02-25 06:58:30','2024-02-25 07:11:28',27),(3,'parasitamol','2 spoon','2024-02-25 06:58:43','2024-02-25 06:58:43',27),(5,NULL,NULL,'2024-02-25 17:17:59','2024-02-25 17:17:59',27),(6,'parasitamol 50mg','5 spoon','2024-02-25 17:22:55','2024-02-25 17:22:55',27);
/*!40000 ALTER TABLE `baby_medications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_notes`
--

DROP TABLE IF EXISTS `baby_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `baby_id` int unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_13` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_notes`
--

LOCK TABLES `baby_notes` WRITE;
/*!40000 ALTER TABLE `baby_notes` DISABLE KEYS */;
INSERT INTO `baby_notes` VALUES (1,27,NULL,NULL,'2024-02-25 17:12:13','2024-02-25 17:12:13'),(2,27,NULL,NULL,'2024-02-25 17:12:32','2024-02-25 17:12:32'),(3,27,NULL,NULL,'2024-02-25 20:04:58','2024-02-25 20:04:58'),(4,27,'first note','All text goes here.. bye bye long text','2024-02-25 20:05:45','2024-02-25 20:05:45'),(5,27,'first note','All text goes here.. bye bye long text','2024-02-25 20:07:35','2024-02-25 20:07:35');
/*!40000 ALTER TABLE `baby_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_progress_timeline`
--

DROP TABLE IF EXISTS `baby_progress_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_progress_timeline` (
  `id` int NOT NULL,
  `day` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_progress_timeline`
--

LOCK TABLES `baby_progress_timeline` WRITE;
/*!40000 ALTER TABLE `baby_progress_timeline` DISABLE KEYS */;
/*!40000 ALTER TABLE `baby_progress_timeline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_sleep`
--

DROP TABLE IF EXISTS `baby_sleep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_sleep` (
  `id` int NOT NULL AUTO_INCREMENT,
  `baby_id` int unsigned DEFAULT NULL,
  `start_time` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `end_time` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total_duration` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_9` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_sleep`
--

LOCK TABLES `baby_sleep` WRITE;
/*!40000 ALTER TABLE `baby_sleep` DISABLE KEYS */;
INSERT INTO `baby_sleep` VALUES (14,27,'2023-11-01T20:00:00Z','2023-11-01T22:00:00Z','2 hours','2023-11-29 11:47:21','2023-11-29 11:47:21'),(15,27,'2023-11-01T20:00:00Z','2023-11-01T22:00:00Z','2 hours','2023-12-01 16:52:31','2023-12-01 16:52:31'),(16,23,'2023-11-01T20:00:00Z','2023-11-01T22:00:00Z','2 hours','2023-12-01 16:52:41','2023-12-01 16:52:41'),(17,27,'2023-11-01','2023-11-01','2 hours','2023-12-01 16:53:40','2023-12-01 16:53:40');
/*!40000 ALTER TABLE `baby_sleep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_symptoms`
--

DROP TABLE IF EXISTS `baby_symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_symptoms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `baby_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_7` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_symptoms`
--

LOCK TABLES `baby_symptoms` WRITE;
/*!40000 ALTER TABLE `baby_symptoms` DISABLE KEYS */;
INSERT INTO `baby_symptoms` VALUES (24,'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asf ','2023-11-28 17:12:01','2023-11-28 17:12:01',23),(25,'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asfsdfadsfadsf aeafsdf ','2023-11-28 17:12:08','2023-11-28 17:12:08',23),(27,'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asfsdfadsfadsf aeafsdf ','2023-11-29 11:46:25','2023-11-29 11:46:25',27),(28,'cough adsffsdfadsfadsf aeafsdf ','2023-11-29 11:46:57','2023-11-29 11:46:57',27),(29,'cough adsffsd--------------------fadsfadsf aeafsdf ','2023-11-29 11:47:45','2023-11-29 11:47:45',27);
/*!40000 ALTER TABLE `baby_symptoms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_temperature`
--

DROP TABLE IF EXISTS `baby_temperature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_temperature` (
  `id` int NOT NULL AUTO_INCREMENT,
  `baby_id` int unsigned DEFAULT NULL,
  `temp_celsius` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `temp_fahrenheit` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_12` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_temperature`
--

LOCK TABLES `baby_temperature` WRITE;
/*!40000 ALTER TABLE `baby_temperature` DISABLE KEYS */;
INSERT INTO `baby_temperature` VALUES (3,27,NULL,NULL,'2024-02-27 13:38:41','2024-02-27 13:38:41'),(4,27,'2023-11-01T20:00:00Z','2023-11-01T22:00:00Z','2024-02-27 13:39:13','2024-02-27 13:39:13'),(5,23,'41.2° C','106.1° F','2024-03-01 08:28:28','2024-03-01 08:28:28');
/*!40000 ALTER TABLE `baby_temperature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_categories`
--

DROP TABLE IF EXISTS `blog_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order` int DEFAULT NULL,
  `title` text COLLATE utf8mb4_general_ci,
  `description` text COLLATE utf8mb4_general_ci,
  `image` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_categories`
--

LOCK TABLES `blog_categories` WRITE;
/*!40000 ALTER TABLE `blog_categories` DISABLE KEYS */;
INSERT INTO `blog_categories` VALUES (1,1,'{ \"en\": \"pregnancy\"}',NULL,NULL,NULL,NULL),(2,1,'{ \"en\": \"health\"}',NULL,NULL,'2024-01-09 18:41:44','2024-01-09 18:41:44'),(3,2,'{ \"en\": \"baby\"}',NULL,NULL,'2024-01-09 18:42:07',NULL),(4,3,'{ \"en\": \"food\"}',NULL,NULL,'2024-01-09 18:42:38',NULL);
/*!40000 ALTER TABLE `blog_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order` int DEFAULT '0',
  `title` longtext COLLATE utf8mb4_general_ci,
  `category` int DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_general_ci,
  `image` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`category`),
  KEY `image` (`image`),
  CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`image`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_15` FOREIGN KEY (`category`) REFERENCES `blog_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (2,1,'{\"bn\" : \"eta amar first blog\", \"en\" :\"this is my first blog\"}',2,'{\"bn\" : \"eta amar first blog\", \"en\" :\"this is my first blog\"}',NULL,NULL,NULL),(3,0,'{\"bn\":\"Lorem Ipsum\",\"en\":\"this is english\"}',2,'{\"en\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\",\"bn\":\"eta bangladeshi blog languasge\"}',NULL,'2024-02-17 04:47:45','2024-02-17 04:47:45'),(4,0,'{\"bn\":\"Lorem Ipsum\",\"en\":\"this is english\"}',2,'{\"en\":\"Lorem ipsum dol dolore magna aliqua.\",\"bn\":\"eta bangladeshi blog languasge\"}',NULL,'2024-02-17 04:53:22','2024-02-17 04:53:22'),(5,0,'{\"en\":\"eta english er blog\"}',2,'{\"en\":\"<p>notun blog start</p>\"}',NULL,'2024-02-25 21:04:24','2024-02-27 18:34:23'),(6,0,'{\"en\":\"english er blog\",\"bn\":\"bangla ekta blog\"}',2,'{\"en\":\"<p><strong>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</strong></p>\\n<p>&nbsp;</p>\\n<p><strong><img src=\\\"http://192.168.0.111:5000/uploads/admins/admin_up-admin-1708895159685.jpg\\\" alt=\\\"\\\" width=\\\"600\\\" height=\\\"338\\\"></strong></p>\\n<p>&nbsp;</p>\\n<p><strong>Bisal boro image khubi valo</strong></p>\\n<p>&nbsp;</p>\\n<p><strong><a title=\\\"eta fb er site\\\" href=\\\"https://www.fb.com\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">fb</a> e post</strong></p>\\n<p>&nbsp;</p>\\n<ol>\\n<li><strong>adf</strong></li>\\n<li><strong>adf</strong></li>\\n<li><strong>kola</strong></li>\\n<li><strong>lichu</strong></li>\\n</ol>\\n<table style=\\\"border-collapse: collapse; width: 100%;\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 25%;\\\"><col style=\\\"width: 25%;\\\"><col style=\\\"width: 25%;\\\"><col style=\\\"width: 25%;\\\"></colgroup>\\n<tbody>\\n<tr>\\n<td>title</td>\\n<td>kaldf</td>\\n<td>lkdf</td>\\n<td>lkjla</td>\\n</tr>\\n<tr>\\n<td>llllllllll</td>\\n<td>ldkjalsdfg</td>\\n<td>llksdjfgl</td>\\n<td>jlsdagjl</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n</tbody>\\n</table>\",\"bn\":\"<pre class=\\\" language-markup\\\"><code class=\\\" language-markup\\\"> জীবের মধ্যে সবচেয়ে সম্পূর্ণতা মানুষের। কিন্তু সবচেয়ে অসম্পূর্ণ হয়ে সে জন্মগ্রহণ করে। বাঘ ভালুক তার জীবনযাত্রার পনেরো- আনা মূলধন নিয়ে আসে প্রকৃতির মালখানা থেকে। জীবরঙ্গভূমিতে মানুষ এসে দেখা দেয় দুই শূন্য হাতে মুঠো বেঁধে।\\n   \\n   মানুষ আসবার পূর্বেই জীবসৃষ্টিযজ্ঞে প্রকৃতির ভূরিব্যয়ের পালা শেষ হয়ে এসেছে। বিপুল মাংস, কঠিন বর্ম, প্রকাণ্ড লেজ নিয়ে জলে স্থলে পৃথুল দেহের যে অমিতাচার প্রবল হয়ে উঠেছিল তাতে ধরিত্রীকে দিলে ক্লান্ত করে। প্রমাণ হল আতিশয্যের পরাভব অনিবার্য। পরীক্ষায় এটাও স্থির হয়ে গেল যে, প্রশ্রয়ের পরিমাণ যত বেশি হয় দুর্বলতার বোঝাও তত দুর্বহ হয়ে ওঠে। নূতন পর্বে প্রকৃতি যথাসম্ভব মানুষের বরাদ্দ কম করে দিয়ে নিজে রইল নেপথ্যে।\\n   \\n   মানুষকে দেখতে হল খুব ছোটো, কিন্তু সেটা একটা কৌশল মাত্র। এবারকার জীবযাত্রার পালায় বিপুলতাকে করা হল বহুলতায় পরিণত। মহাকায় জন্তু ছিল প্রকাণ্ড একলা, মানুষ হল দূরপ্রসারিত অনেক।</code></pre>\\n<p><strong>&nbsp;</strong></p>\\n<p><strong><img title=\\\"423455089_1085256732807286_2765756227404869744_n.jpg\\\" src=\\\"http://192.168.0.111:5000/uploads/admins/admin_up-admin-1708895395566.jpg\\\" alt=\\\"\\\" width=\\\"300\\\" height=\\\"667\\\"></strong></p>\\n<p>&nbsp;</p>\\n<p><strong>ses bangla likha</strong></p>\"}',NULL,'2024-02-25 21:10:21','2024-02-25 21:10:21'),(7,0,'{\"en\":\"english blog\",\"bn\":\"nba\"}',2,'{\"en\":\"<p><strong>Input Your Blog Descripton Here.asdf</strong></p>\",\"bn\":\"<p><strong>Input Your Blog Descripton Here. fffffddddddddddddd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ddddd<br></strong></p>\"}',NULL,'2024-02-25 21:25:36','2024-02-25 21:25:36'),(8,0,'{\"en\":\"english blog\",\"bn\":\"bangla\",\"hn\":\"hindi mama\"}',2,'{\"en\":\"<p><strong>Input Your Blog Descripton Here. fffffddddddddddddd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ddddd<br></strong></p>\",\"bn\":\"<p><strong>Input Your Blog Descripton Here. fffffddddddddddddd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ddddd<br></strong></p>\",\"hn\":\"<p><strong>Input Your Blog Descripton Here. fffffddddddddddddd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ddddd<br></strong></p>\"}',NULL,'2024-02-25 21:25:59','2024-02-27 18:19:51'),(9,0,'{\"en\":\"this is english title\",\"bn\":\"bangla blog\"}',2,'{\"en\":\"<p><strong>english er description.</strong></p>\",\"bn\":\"<p><strong>bangla er description<br></strong></p>\"}',NULL,'2024-02-27 15:25:37','2024-02-27 18:39:41');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bp_trackers`
--

DROP TABLE IF EXISTS `bp_trackers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bp_trackers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `arm` enum('right','left') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `systolic` int DEFAULT NULL,
  `diastolic` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`user_id`),
  CONSTRAINT `FK_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bp_trackers`
--

LOCK TABLES `bp_trackers` WRITE;
/*!40000 ALTER TABLE `bp_trackers` DISABLE KEYS */;
INSERT INTO `bp_trackers` VALUES (1,'right',100,80,'2024-01-09 16:42:02','2024-01-09 16:43:53',12),(2,'left',120,80,'2024-01-09 16:42:15','2024-01-09 16:42:15',12);
/*!40000 ALTER TABLE `bp_trackers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_vaccine_remiinders`
--

DROP TABLE IF EXISTS `child_vaccine_remiinders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `child_vaccine_remiinders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `baby_id` int unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `vaccine_date` datetime NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_21` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_vaccine_remiinders`
--

LOCK TABLES `child_vaccine_remiinders` WRITE;
/*!40000 ALTER TABLE `child_vaccine_remiinders` DISABLE KEYS */;
INSERT INTO `child_vaccine_remiinders` VALUES (1,27,'polio','2023-12-31 00:00:00','Pending','2023-11-30 12:00:00','2023-12-04 13:33:46'),(2,27,'pneumonia','2023-12-31 00:00:00','Pending','2023-12-04 13:40:12','2023-12-04 13:43:29'),(3,27,'polio','2023-12-31 00:00:00','pending','2023-12-04 13:40:30','2023-12-04 13:40:30');
/*!40000 ALTER TABLE `child_vaccine_remiinders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `content` text COLLATE utf8mb4_general_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,12,3,'this is a large content','2023-12-14 12:52:57','2023-12-14 12:52:57'),(3,12,3,'this is a last content','2023-12-14 12:53:17','2023-12-14 12:53:17'),(4,12,3,'this is a checking content','2023-12-14 12:55:38','2023-12-14 12:55:38'),(5,12,2,'this is a checking content','2023-12-14 13:20:23','2023-12-14 13:20:23');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_reads`
--

DROP TABLE IF EXISTS `daily_reads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_reads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_general_ci,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `day` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_reads`
--

LOCK TABLES `daily_reads` WRITE;
/*!40000 ALTER TABLE `daily_reads` DISABLE KEYS */;
INSERT INTO `daily_reads` VALUES (6,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','{\"bn\": \"গর্ভাবস্থায় অতিরিক্ত ওজন বৃদ্ধি এড়িয়ে চলুন। স্বাস্থ্যকর খাবার খান এবং নিয়মিত ব্যায়াম করুন।\", \"en\": \"Avoid excessive weight gain during pregnancy. Maintain a healthy weight through balanced diet and exercise.\"}','8','2024-02-21 13:25:10',NULL,8),(7,'{\"bn\": \"ধূমপান এবং অ্যালকোহল এড়িয়ে চলুন\", \"en\": \"Avoid smoking and alcohol\"}','{\"bn\": \"ধূমপান এবং অ্যালকোহল গর্ভাবস্থায় আপনার শিশুর জন্য ক্ষতিকর।\", \"en\": \"Smoking and alcohol are harmful to your baby during pregnancy.\"}','9','2024-02-21 13:25:10',NULL,9),(8,'{\"bn\": \"আপনার মনের কথা ডাক্তারের সাথে শেয়ার করুন\", \"en\": \"Share your concerns with your doctor\"}','{\"bn\": \"গর্ভাবস্থায় যেকোনো চিন্তা, শঙ্কা বা অনুভূতি ডাক্তারের সাথে খোলামেলাভাবে আলোচনা করুন।\", \"en\": \"Don\'t hesitate to openly discuss any thoughts, concerns, or feelings you have with your doctor during pregnancy.\"}','10','2024-02-21 13:25:10',NULL,10),(9,'{\"bn\": \"পরিবার ও বন্ধুদের সমর্থন নিন\", \"en\": \"Seek support from family and friends\"}','{\"bn\": \"গর্ভাবস্থায় পরিবার ও বন্ধুদের সমর্থন গুরুত্বপূর্ণ। তাদের সাথে কথা বলুন এবং সাহায্য নিন।\", \"en\": \"Support from family and friends is crucial during pregnancy. Talk to them and seek their help.\"}','11','2024-02-21 13:25:10',NULL,11),(10,'{\"en\":\"bangla title\",\"bn\":\"bangla title\"}','{\"en\":\"bangla er description\",\"bn\":\"bangla er description\"}',NULL,'2024-02-29 11:27:05','2024-02-29 11:27:05',3),(13,'{\"en\":\"adsfa\"}','{\"en\":\"asdfadf\"}',NULL,'2024-02-29 13:53:42','2024-02-29 13:53:42',3),(14,'{\"en\":\"notun titlee\"}','{\"en\":\"description\"}',NULL,'2024-02-29 13:55:00','2024-02-29 13:55:00',3),(15,'{\"en\":\"adfa\"}','{\"en\":\"adsf\"}',NULL,'2024-02-29 14:01:22','2024-02-29 14:01:22',0),(16,'{\"en\":\"dfadf\"}','{\"en\":\"adfadsf\"}',NULL,'2024-02-29 14:02:10','2024-02-29 14:02:10',55);
/*!40000 ALTER TABLE `daily_reads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_tips`
--

DROP TABLE IF EXISTS `daily_tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_tips` (
  `id` int NOT NULL,
  `day` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_general_ci,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_tips`
--

LOCK TABLES `daily_tips` WRITE;
/*!40000 ALTER TABLE `daily_tips` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_tips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_token`
--

DROP TABLE IF EXISTS `device_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `device_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_token`
--

LOCK TABLES `device_token` WRITE;
/*!40000 ALTER TABLE `device_token` DISABLE KEYS */;
INSERT INTO `device_token` VALUES (6,'41628423748ss9+940994',12,'2024-02-26 12:55:07','2024-02-26 12:57:35');
/*!40000 ALTER TABLE `device_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diet`
--

DROP TABLE IF EXISTS `diet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `admin_id` int DEFAULT NULL,
  `age` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `edd_date` datetime DEFAULT NULL,
  `veg` int DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `BMI` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `diet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `diet_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diet`
--

LOCK TABLES `diet` WRITE;
/*!40000 ALTER TABLE `diet` DISABLE KEYS */;
INSERT INTO `diet` VALUES (1,12,NULL,25,65,'2024-10-01 00:00:00',0,1,'2024-02-26 17:50:04','2024-02-26 17:50:04',22.5);
/*!40000 ALTER TABLE `diet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug_reminder`
--

DROP TABLE IF EXISTS `drug_reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drug_reminder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `dose` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `medication_time` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `reminder_info` longtext COLLATE utf8mb4_general_ci,
  `created_at` datetime NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`user_id`),
  CONSTRAINT `FK_22_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug_reminder`
--

LOCK TABLES `drug_reminder` WRITE;
/*!40000 ALTER TABLE `drug_reminder` DISABLE KEYS */;
INSERT INTO `drug_reminder` VALUES (1,'Ibuprofen','200mg','8:00 AM',NULL,'2023-12-04 15:46:14',12),(2,'napa ace','200mg','8:00 AM',NULL,'2023-12-04 15:47:00',12);
/*!40000 ALTER TABLE `drug_reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug_slider`
--

DROP TABLE IF EXISTS `drug_slider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drug_slider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `media` int DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `drug_slider_ibfk_1` (`media`),
  CONSTRAINT `drug_slider_ibfk_1` FOREIGN KEY (`media`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug_slider`
--

LOCK TABLES `drug_slider` WRITE;
/*!40000 ALTER TABLE `drug_slider` DISABLE KEYS */;
INSERT INTO `drug_slider` VALUES (1,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}',NULL,'https://www.drugs.com','2024-02-05 14:25:00','2024-02-05 14:25:00'),(2,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}',NULL,'https://www.drugs.com','2024-02-05 14:25:09','2024-02-05 14:25:09'),(3,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}',NULL,'https://www.drugs.com','2024-02-05 14:25:13','2024-02-05 14:25:13'),(4,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}',NULL,'https://www.drugs.com','2024-02-05 14:25:16','2024-02-05 14:25:16'),(5,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}',NULL,'www.newdrug.com','2024-02-05 14:30:18','2024-02-05 14:30:18');
/*!40000 ALTER TABLE `drug_slider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercises` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_general_ci,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `general_setting`
--

DROP TABLE IF EXISTS `general_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `general_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `SMTP_HOST` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `SMTP_PORT` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `SMTP_EMAIL` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `SMTP_PASSWORD` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `FROM_EMAIL` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `FROM_NAME` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `native_ad` int NOT NULL,
  `banner_ad` int NOT NULL,
  `interstitial_ad` int NOT NULL,
  `rewarded_ad` int NOT NULL,
  `app_link` text COLLATE utf8mb4_general_ci NOT NULL,
  `facebook_url` text COLLATE utf8mb4_general_ci NOT NULL,
  `youtube_url` text COLLATE utf8mb4_general_ci NOT NULL,
  `twitter_url` text COLLATE utf8mb4_general_ci NOT NULL,
  `instagram_url` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_setting`
--

LOCK TABLES `general_setting` WRITE;
/*!40000 ALTER TABLE `general_setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `general_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `help_desk`
--

DROP TABLE IF EXISTS `help_desk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `help_desk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `message` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `help_desk_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`),
  CONSTRAINT `help_desk_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help_desk`
--

LOCK TABLES `help_desk` WRITE;
/*!40000 ALTER TABLE `help_desk` DISABLE KEYS */;
INSERT INTO `help_desk` VALUES (1,12,NULL,'hello admin! I need help','2024-02-09 17:40:43','2024-02-09 17:40:43'),(2,12,NULL,'hello admin! are u there','2024-02-09 17:41:32','2024-02-09 17:41:32'),(7,12,7,'yes, i am there hou can i help u','2024-02-11 12:35:53','2024-02-11 12:35:53');
/*!40000 ALTER TABLE `help_desk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `lang_code` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `lang_country` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `flag` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'English','en','us','America','/upload/image.jpg'),(2,'bangla','bn','bd','Bangladesh','/upload');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uploaded_by` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mime_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (51,'rumon0','post_images-rumon0-1707311132468.jpg','public/uploads/post/post_images-rumon0-1707311132468.jpg','jpg','image/jpeg','2024-02-07 13:05:32','2024-02-07 13:05:32'),(52,'rumon0','post_images-rumon0-1707311132488.jpg','public/uploads/post/post_images-rumon0-1707311132488.jpg','jpg','image/jpeg','2024-02-07 13:05:32','2024-02-07 13:05:32'),(53,'rumon0','post_images-rumon0-1707311232121.jpg','public/uploads/post/post_images-rumon0-1707311232121.jpg','jpg','image/jpeg','2024-02-07 13:07:12','2024-02-07 13:07:12'),(54,'rumon0','post_images-rumon0-1707311232127.jpg','public/uploads/post/post_images-rumon0-1707311232127.jpg','jpg','image/jpeg','2024-02-07 13:07:12','2024-02-07 13:07:12'),(55,'rumon0','post_images-rumon0-1707311524163.jpg','public/uploads/post/post_images-rumon0-1707311524163.jpg','jpg','image/jpeg','2024-02-07 13:12:04','2024-02-07 13:12:04'),(56,'rumon0','post_images-rumon0-1707311524170.jpg','public/uploads/post/post_images-rumon0-1707311524170.jpg','jpg','image/jpeg','2024-02-07 13:12:04','2024-02-07 13:12:04'),(57,'rumon0','post_images-rumon0-1707311755073.jpg','public/uploads/post/post_images-rumon0-1707311755073.jpg','jpg','image/jpeg','2024-02-07 13:15:55','2024-02-07 13:15:55'),(58,'rumon0','post_images-rumon0-1707311755078.jpg','public/uploads/post/post_images-rumon0-1707311755078.jpg','jpg','image/jpeg','2024-02-07 13:15:55','2024-02-07 13:15:55'),(64,'rumonkh','admin_image_field-rumonkh-1707406231775.jpg','public/uploads/admin/admin_image_field-rumonkh-1707406231775.jpg','jpg','image/jpeg','2024-02-08 15:30:31','2024-02-08 15:30:31'),(65,'shapla','baby_image_field-shapla-1708508688021.png','public/uploads/user/baby_image_field-shapla-1708508688021.png','png','image/png','2024-02-21 09:44:48','2024-02-21 09:44:48'),(66,'shapla','baby_image_field-shapla-1708508756140.png','public/uploads/user/baby_image_field-shapla-1708508756140.png','png','image/png','2024-02-21 09:45:56','2024-02-21 09:45:56'),(67,'shapla','baby_image_field-shapla-1708508772997.png','public/uploads/user/baby_image_field-shapla-1708508772997.png','png','image/png','2024-02-21 09:46:13','2024-02-21 09:46:13'),(68,'shapla','baby_image_field-shapla-1708508962048.png','public/uploads/user/baby_image_field-shapla-1708508962048.png','png','image/png','2024-02-21 09:49:22','2024-02-21 09:49:22'),(69,'shapla','baby_image_field-shapla-1708509001306.png','public/uploads/user/baby_image_field-shapla-1708509001306.png','png','image/png','2024-02-21 09:50:01','2024-02-21 09:50:01'),(70,'shapla','baby_image_field-shapla-1708509083318.png','public/uploads/user/baby_image_field-shapla-1708509083318.png','png','image/png','2024-02-21 09:51:23','2024-02-21 09:51:23'),(71,'shapla','baby_image_field-shapla-1708509097522.png','public/uploads/user/baby_image_field-shapla-1708509097522.png','png','image/png','2024-02-21 09:51:37','2024-02-21 09:51:37'),(72,'shapla','baby_image_field-shapla-1708509118902.png','public/uploads/user/baby_image_field-shapla-1708509118902.png','png','image/png','2024-02-21 09:51:58','2024-02-21 09:51:58'),(73,'shapla','baby_image_field-shapla-1708509164246.png','public/uploads/user/baby_image_field-shapla-1708509164246.png','png','image/png','2024-02-21 09:52:44','2024-02-21 09:52:44'),(74,'shapla','baby_image_field-shapla-1708509187140.png','public/uploads/user/baby_image_field-shapla-1708509187140.png','png','image/png','2024-02-21 09:53:07','2024-02-21 09:53:07'),(75,'shapla','baby_image_field-shapla-1708509276193.png','public/uploads/user/baby_image_field-shapla-1708509276193.png','png','image/png','2024-02-21 09:54:36','2024-02-21 09:54:36'),(76,'shapla','baby_image_field-shapla-1708509317748.png','public/uploads/user/baby_image_field-shapla-1708509317748.png','png','image/png','2024-02-21 09:55:17','2024-02-21 09:55:17'),(77,'shapla','user_image_field-shapla-1708684609250.png','public/uploads/user/user_image_field-shapla-1708684609250.png','png','image/png','2024-02-23 10:36:49','2024-02-23 10:36:49'),(78,'rumonkh','user_image_field-rumonkh-1708790924434.jpg','public/uploads/user/user_image_field-rumonkh-1708790924434.jpg','jpg','image/jpeg','2024-02-24 16:08:44','2024-02-24 16:08:44'),(79,'rumonkh','user_image_field-rumonkh-1708790978847.jpg','public/uploads/user/user_image_field-rumonkh-1708790978847.jpg','jpg','image/jpeg','2024-02-24 16:09:38','2024-02-24 16:09:38'),(116,NULL,'admin_up-admin-1708895159685.jpg','public/uploads/admins/admin_up-admin-1708895159685.jpg','jpg','image/jpeg','2024-02-25 21:05:59','2024-02-25 21:05:59'),(117,NULL,'admin_up-admin-1708895367609.jpg','public/uploads/admins/admin_up-admin-1708895367609.jpg','jpg','image/jpeg','2024-02-25 21:09:27','2024-02-25 21:09:27'),(118,NULL,'admin_up-admin-1708895395566.jpg','public/uploads/admins/admin_up-admin-1708895395566.jpg','jpg','image/jpeg','2024-02-25 21:09:55','2024-02-25 21:09:55'),(119,'rumonkh','user_image_field-rumonkh-1708950075160.png','public/uploads/user/user_image_field-rumonkh-1708950075160.png','png','image/png','2024-02-26 12:21:15','2024-02-26 12:21:15'),(120,'rumonkh','user_image_field-rumonkh-1708950328705.png','public/uploads/user/user_image_field-rumonkh-1708950328705.png','png','image/png','2024-02-26 12:25:28','2024-02-26 12:25:28'),(121,'rumonkh','user_image_field-rumonkh-1708950381923.png','public/uploads/user/user_image_field-rumonkh-1708950381923.png','png','image/png','2024-02-26 12:26:21','2024-02-26 12:26:21'),(122,'rumonkh','user_image_field-rumonkh-1708950386791.png','public/uploads/user/user_image_field-rumonkh-1708950386791.png','png','image/png','2024-02-26 12:26:26','2024-02-26 12:26:26'),(123,'shapla','baby_Image_file-shapla-1709229442934.jpg','public/uploads/baby/baby_Image_file-shapla-1709229442934.jpg','jpg','image/jpeg','2024-02-29 17:57:22','2024-02-29 17:57:22'),(124,'shapla','baby_Image_file-shapla-1709229570062.jpg','public/uploads/baby/baby_Image_file-shapla-1709229570062.jpg','jpg','image/jpeg','2024-02-29 17:59:30','2024-02-29 17:59:30'),(125,'shapla','baby_Image_file-shapla-1709229715257.jpg','public/uploads/baby/baby_Image_file-shapla-1709229715257.jpg','jpg','image/jpeg','2024-02-29 18:01:55','2024-02-29 18:01:55'),(126,'shapla','baby_Image_file-shapla-1709229748200.jpg','public/uploads/baby/baby_Image_file-shapla-1709229748200.jpg','jpg','image/jpeg','2024-02-29 18:02:28','2024-02-29 18:02:28'),(131,'shapla','post_images-shapla-1709233447435.png','public/uploads/post/post_images-shapla-1709233447435.png','png','image/png','2024-02-29 19:04:07','2024-02-29 19:04:07'),(132,'shapla','post_images-shapla-1709233447437.png','public/uploads/post/post_images-shapla-1709233447437.png','png','image/png','2024-02-29 19:04:07','2024-02-29 19:04:07'),(133,'shapla','post_images-shapla-1709233523482.png','public/uploads/post/post_images-shapla-1709233523482.png','png','image/png','2024-02-29 19:05:23','2024-02-29 19:05:23'),(134,'shapla','post_images-shapla-1709233523482.png','public/uploads/post/post_images-shapla-1709233523482.png','png','image/png','2024-02-29 19:05:23','2024-02-29 19:05:23'),(135,'shapla','post_images-shapla-1709233547565.png','public/uploads/post/post_images-shapla-1709233547565.png','png','image/png','2024-02-29 19:05:47','2024-02-29 19:05:47'),(136,'shapla','post_images-shapla-1709233547566.png','public/uploads/post/post_images-shapla-1709233547566.png','png','image/png','2024-02-29 19:05:47','2024-02-29 19:05:47'),(137,'rumonkh','user_image_field-rumonkh-1709234402898.jpg','public/uploads/user/user_image_field-rumonkh-1709234402898.jpg','jpg','image/jpeg','2024-02-29 19:20:03','2024-02-29 19:20:03'),(138,'shapla','baby_image_field-shapla-1709283037465.jpg','public/uploads/baby/baby_image_field-shapla-1709283037465.jpg','jpg','application/octet-stream','2024-03-01 08:50:38','2024-03-01 08:50:38');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(1) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mother_activity`
--

DROP TABLE IF EXISTS `mother_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mother_activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `activity` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `mother_activity_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mother_activity`
--

LOCK TABLES `mother_activity` WRITE;
/*!40000 ALTER TABLE `mother_activity` DISABLE KEYS */;
INSERT INTO `mother_activity` VALUES (42,12,'Relaxing','2024-03-01 20:46:02','2024-03-01 20:46:02'),(43,12,'tour','2024-03-01 20:46:07','2024-03-01 20:46:07');
/*!40000 ALTER TABLE `mother_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mother_mood_trackers`
--

DROP TABLE IF EXISTS `mother_mood_trackers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mother_mood_trackers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `mood_time` datetime NOT NULL,
  `current_mood` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `mother_mood_trackers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mother_mood_trackers`
--

LOCK TABLES `mother_mood_trackers` WRITE;
/*!40000 ALTER TABLE `mother_mood_trackers` DISABLE KEYS */;
INSERT INTO `mother_mood_trackers` VALUES (9,12,'2023-12-21 08:00:00','urtechi','2023-12-25 11:20:00','2023-12-25 11:20:00'),(10,12,'2023-12-21 08:00:00','vallage','2024-01-07 11:44:45','2024-01-07 11:44:45'),(11,12,'2023-12-21 08:00:00','ura dhura','2024-01-07 11:44:58','2024-01-07 11:44:58'),(12,12,'2023-12-21 08:00:00','lalala','2024-01-07 12:10:58','2024-01-07 12:10:58'),(13,12,'2023-12-21 08:00:00','vallage','2024-01-07 12:16:02','2024-01-07 12:16:02'),(14,12,'2023-12-21 08:00:00','vallage','2024-01-07 12:16:16','2024-01-07 12:16:16'),(15,12,'2024-01-21 08:00:00','vallage','2024-01-07 12:24:01','2024-01-07 12:24:01');
/*!40000 ALTER TABLE `mother_mood_trackers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mother_progress_timeline`
--

DROP TABLE IF EXISTS `mother_progress_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mother_progress_timeline` (
  `id` int NOT NULL,
  `day` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mother_progress_timeline`
--

LOCK TABLES `mother_progress_timeline` WRITE;
/*!40000 ALTER TABLE `mother_progress_timeline` DISABLE KEYS */;
INSERT INTO `mother_progress_timeline` VALUES (1,1,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','',NULL,NULL),(2,2,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','',NULL,NULL);
/*!40000 ALTER TABLE `mother_progress_timeline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mother_vaccine_reminders`
--

DROP TABLE IF EXISTS `mother_vaccine_reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mother_vaccine_reminders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vaccine_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`user_id`),
  CONSTRAINT `FK_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mother_vaccine_reminders`
--

LOCK TABLES `mother_vaccine_reminders` WRITE;
/*!40000 ALTER TABLE `mother_vaccine_reminders` DISABLE KEYS */;
INSERT INTO `mother_vaccine_reminders` VALUES (1,12,'Flu Vaccine','2023-12-20 00:00:00','2023-12-04 14:33:30','2023-12-04 14:33:30'),(2,12,'Flu Vaccine','2023-12-20 00:00:00','2023-12-04 14:34:03','2023-12-04 14:34:03'),(3,12,'Flu Vaccine','2023-12-20 00:00:00','2023-12-04 14:34:06','2023-12-04 14:34:06'),(4,12,'Flu Vaccine','2023-12-20 00:00:00','2023-12-04 14:34:07','2023-12-04 14:34:07');
/*!40000 ALTER TABLE `mother_vaccine_reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `deadline` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` int NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `image` int DEFAULT NULL,
  `status` varchar(1) COLLATE utf8mb4_general_ci DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_topic`
--

DROP TABLE IF EXISTS `post_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_topic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image` (`image`),
  CONSTRAINT `post_topic_ibfk_1` FOREIGN KEY (`image`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_topic`
--

LOCK TABLES `post_topic` WRITE;
/*!40000 ALTER TABLE `post_topic` DISABLE KEYS */;
INSERT INTO `post_topic` VALUES (1,'Baby',NULL,122,'2024-02-28 19:32:12',NULL),(2,'Mum',NULL,121,'2024-02-28 19:32:12',NULL),(3,'toodler',NULL,122,'2024-02-28 19:32:34',NULL),(4,'Random Talk',NULL,122,'2024-02-28 19:32:34',NULL);
/*!40000 ALTER TABLE `post_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postmedia`
--

DROP TABLE IF EXISTS `postmedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postmedia` (
  `post_id` int NOT NULL,
  `media_id` int NOT NULL,
  PRIMARY KEY (`post_id`,`media_id`),
  KEY `media_id` (`media_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postmedia`
--

LOCK TABLES `postmedia` WRITE;
/*!40000 ALTER TABLE `postmedia` DISABLE KEYS */;
INSERT INTO `postmedia` VALUES (21,32),(21,33),(21,34),(23,38),(23,39),(23,40),(23,41),(24,42),(24,43),(24,44),(24,45),(25,46),(25,47),(36,48),(37,49),(37,50),(38,51),(38,52),(39,53),(39,54),(40,55),(40,56),(44,57),(44,58),(45,131),(45,132),(46,133),(46,134),(47,135),(47,136);
