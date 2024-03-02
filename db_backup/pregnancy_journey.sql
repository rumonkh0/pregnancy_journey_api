-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: pregnancy_journey
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

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
  `admin_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `visit_type` varchar(255) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `visit_no` int(11) NOT NULL,
  `hospital_address` varchar(255) NOT NULL,
  `receptionist` varchar(255) NOT NULL,
  `mobile` int(20) NOT NULL,
  `visit_date` datetime NOT NULL,
  `remarks` varchar(255) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_id` int(10) unsigned DEFAULT NULL,
  `right_milk_amount` int(11) DEFAULT NULL,
  `left_milk_amount` int(11) DEFAULT NULL,
  `total_milk` int(11) DEFAULT NULL,
  `left_duration` varchar(255) DEFAULT NULL,
  `right_duration` varchar(255) DEFAULT NULL,
  `total_duration` varchar(255) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_id` int(10) unsigned NOT NULL,
  `status` enum('clean','poo','pee','mixed') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `number` int(11) DEFAULT 1,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_id` int(10) unsigned NOT NULL,
  `feed_type` enum('breast','bottle','solid') NOT NULL,
  `left_duration` varchar(255) DEFAULT NULL,
  `right_duration` varchar(255) DEFAULT NULL,
  `total_duration` varchar(255) DEFAULT NULL,
  `bottle_amount` double DEFAULT NULL,
  `solid_name` varchar(255) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_id` int(11) NOT NULL,
  `baby_id` int(10) unsigned DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_title` varchar(255) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_size_image` int(11) DEFAULT NULL,
  `week_number` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `weight` text NOT NULL,
  `size` text NOT NULL,
  `body_change` text DEFAULT NULL,
  `baby_details` text DEFAULT NULL,
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
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mother_id` int(10) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `photo` int(11) DEFAULT NULL,
  `baby_serial` int(11) DEFAULT NULL,
  `gender` varchar(45) NOT NULL COMMENT 'male=1 female=2',
  `birth_date` datetime DEFAULT NULL,
  `first_move` datetime DEFAULT NULL,
  `first_heartbeat` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`mother_id`),
  KEY `photo` (`photo`),
  CONSTRAINT `FK_1` FOREIGN KEY (`mother_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `baby_list_ibfk_1` FOREIGN KEY (`photo`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_list`
--

LOCK TABLES `baby_list` WRITE;
/*!40000 ALTER TABLE `baby_list` DISABLE KEYS */;
INSERT INTO `baby_list` VALUES (23,12,'Baby3',76,1,'male','2023-05-20 00:00:00','2023-06-01 00:00:00','2023-06-15 00:00:00','2023-02-01 00:00:00',NULL),(27,12,'arman baby',76,1,'male','2023-01-10 00:00:00','2023-01-20 00:00:00','2023-02-01 00:00:00','2023-11-29 11:44:06','2023-11-29 11:44:06');
/*!40000 ALTER TABLE `baby_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_medications`
--

DROP TABLE IF EXISTS `baby_medications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_medications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `dose` varchar(25) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `baby_id` int(10) unsigned NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_id` int(10) unsigned NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_progress_timeline`
--

LOCK TABLES `baby_progress_timeline` WRITE;
/*!40000 ALTER TABLE `baby_progress_timeline` DISABLE KEYS */;
INSERT INTO `baby_progress_timeline` VALUES (1,1,'{\"en\":\"small baby\",\"bn\":\"picci babu\"}','{\"en\":\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\",\"bn\":\"choto babu\"}','155','2024-03-02 05:24:17','2024-03-02 05:24:17');
/*!40000 ALTER TABLE `baby_progress_timeline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_sleep`
--

DROP TABLE IF EXISTS `baby_sleep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_sleep` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_id` int(10) unsigned DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `total_duration` varchar(255) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `baby_id` int(10) unsigned NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_id` int(10) unsigned DEFAULT NULL,
  `temp_celsius` varchar(255) DEFAULT NULL,
  `temp_fahrenheit` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_12` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_temperature`
--

LOCK TABLES `baby_temperature` WRITE;
/*!40000 ALTER TABLE `baby_temperature` DISABLE KEYS */;
INSERT INTO `baby_temperature` VALUES (3,27,NULL,NULL,'2024-02-27 13:38:41','2024-02-27 13:38:41'),(4,27,'2023-11-01T20:00:00Z','2023-11-01T22:00:00Z','2024-02-27 13:39:13','2024-02-27 13:39:13');
/*!40000 ALTER TABLE `baby_temperature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_categories`
--

DROP TABLE IF EXISTS `blog_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order` int(11) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
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
INSERT INTO `blog_categories` VALUES (1,1,'{ \"en\": \"pregnancy\"}','{ \"en\": \"pregnancy\"}',NULL,NULL,NULL),(2,1,'{ \"en\": \"health\"}','{ \"en\": \"pregnancy\"}',NULL,'2024-01-09 18:41:44','2024-01-09 18:41:44'),(3,2,'{ \"en\": \"baby\"}','{ \"en\": \"pregnancy\"}',NULL,'2024-01-09 18:42:07',NULL),(4,3,'{ \"en\": \"food\"}','{ \"en\": \"pregnancy\"}',NULL,'2024-01-09 18:42:38',NULL);
/*!40000 ALTER TABLE `blog_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order` int(11) DEFAULT 0,
  `title` longtext DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`category`),
  KEY `image` (`image`),
  CONSTRAINT `FK_15` FOREIGN KEY (`category`) REFERENCES `blog_categories` (`id`),
  CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`image`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (2,1,'{\"bn\" : \"eta amar first blog\", \"en\" :\"this is my first blog\"}',2,'{\"bn\" : \"eta amar first blog\", \"en\" :\"this is my first blog\"}',NULL,NULL,NULL),(3,0,'{\"bn\":\"Lorem Ipsum\",\"en\":\"this is english\"}',2,'{\"en\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\",\"bn\":\"eta bangladeshi blog languasge\"}',NULL,'2024-02-17 04:47:45','2024-02-17 04:47:45'),(4,0,'{\"bn\":\"Lorem Ipsum\",\"en\":\"this is english\"}',2,'{\"en\":\"Lorem ipsum dol dolore magna aliqua.\",\"bn\":\"eta bangladeshi blog languasge\"}',NULL,'2024-02-17 04:53:22','2024-02-17 04:53:22'),(5,0,'{\"en\":\"eta english er blog\"}',2,'{\"en\":\"<p>notun blog start</p>\"}',NULL,'2024-02-25 21:04:24','2024-02-27 18:34:23'),(6,0,'{\"en\":\"english er blog\",\"bn\":\"bangla ekta blog\"}',2,'{\"en\":\"<p><strong>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</strong></p>\\n<p>&nbsp;</p>\\n<p><strong><img src=\\\"http://192.168.0.111:5000/uploads/admins/admin_up-admin-1708895159685.jpg\\\" alt=\\\"\\\" width=\\\"600\\\" height=\\\"338\\\"></strong></p>\\n<p>&nbsp;</p>\\n<p><strong>Bisal boro image khubi valo</strong></p>\\n<p>&nbsp;</p>\\n<p><strong><a title=\\\"eta fb er site\\\" href=\\\"https://www.fb.com\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">fb</a> e post</strong></p>\\n<p>&nbsp;</p>\\n<ol>\\n<li><strong>adf</strong></li>\\n<li><strong>adf</strong></li>\\n<li><strong>kola</strong></li>\\n<li><strong>lichu</strong></li>\\n</ol>\\n<table style=\\\"border-collapse: collapse; width: 100%;\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 25%;\\\"><col style=\\\"width: 25%;\\\"><col style=\\\"width: 25%;\\\"><col style=\\\"width: 25%;\\\"></colgroup>\\n<tbody>\\n<tr>\\n<td>title</td>\\n<td>kaldf</td>\\n<td>lkdf</td>\\n<td>lkjla</td>\\n</tr>\\n<tr>\\n<td>llllllllll</td>\\n<td>ldkjalsdfg</td>\\n<td>llksdjfgl</td>\\n<td>jlsdagjl</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n</tbody>\\n</table>\",\"bn\":\"<pre class=\\\" language-markup\\\"><code class=\\\" language-markup\\\"> জীবের মধ্যে সবচেয়ে সম্পূর্ণতা মানুষের। কিন্তু সবচেয়ে অসম্পূর্ণ হয়ে সে জন্মগ্রহণ করে। বাঘ ভালুক তার জীবনযাত্রার পনেরো- আনা মূলধন নিয়ে আসে প্রকৃতির মালখানা থেকে। জীবরঙ্গভূমিতে মানুষ এসে দেখা দেয় দুই শূন্য হাতে মুঠো বেঁধে।\\n   \\n   মানুষ আসবার পূর্বেই জীবসৃষ্টিযজ্ঞে প্রকৃতির ভূরিব্যয়ের পালা শেষ হয়ে এসেছে। বিপুল মাংস, কঠিন বর্ম, প্রকাণ্ড লেজ নিয়ে জলে স্থলে পৃথুল দেহের যে অমিতাচার প্রবল হয়ে উঠেছিল তাতে ধরিত্রীকে দিলে ক্লান্ত করে। প্রমাণ হল আতিশয্যের পরাভব অনিবার্য। পরীক্ষায় এটাও স্থির হয়ে গেল যে, প্রশ্রয়ের পরিমাণ যত বেশি হয় দুর্বলতার বোঝাও তত দুর্বহ হয়ে ওঠে। নূতন পর্বে প্রকৃতি যথাসম্ভব মানুষের বরাদ্দ কম করে দিয়ে নিজে রইল নেপথ্যে।\\n   \\n   মানুষকে দেখতে হল খুব ছোটো, কিন্তু সেটা একটা কৌশল মাত্র। এবারকার জীবযাত্রার পালায় বিপুলতাকে করা হল বহুলতায় পরিণত। মহাকায় জন্তু ছিল প্রকাণ্ড একলা, মানুষ হল দূরপ্রসারিত অনেক।</code></pre>\\n<p><strong>&nbsp;</strong></p>\\n<p><strong><img title=\\\"423455089_1085256732807286_2765756227404869744_n.jpg\\\" src=\\\"http://192.168.0.111:5000/uploads/admins/admin_up-admin-1708895395566.jpg\\\" alt=\\\"\\\" width=\\\"300\\\" height=\\\"667\\\"></strong></p>\\n<p>&nbsp;</p>\\n<p><strong>ses bangla likha</strong></p>\"}',NULL,'2024-02-25 21:10:21','2024-02-25 21:10:21'),(9,0,'{\"en\":\"this is english title\",\"bn\":\"bangla blog\"}',2,'{\"en\":\"<p><strong>english er description.</strong></p>\",\"bn\":\"<p><strong>bangla er description<br></strong></p>\"}',NULL,'2024-02-27 15:25:37','2024-02-27 18:39:41');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bp_trackers`
--

DROP TABLE IF EXISTS `bp_trackers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bp_trackers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `arm` enum('right','left') DEFAULT NULL,
  `systolic` int(11) DEFAULT NULL,
  `diastolic` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `vaccine_date` datetime NOT NULL,
  `status` varchar(255) DEFAULT 'null',
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `day` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_reads`
--

LOCK TABLES `daily_reads` WRITE;
/*!40000 ALTER TABLE `daily_reads` DISABLE KEYS */;
INSERT INTO `daily_reads` VALUES (6,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','{\"bn\": \"গর্ভাবস্থায় অতিরিক্ত ওজন বৃদ্ধি এড়িয়ে চলুন। স্বাস্থ্যকর খাবার খান এবং নিয়মিত ব্যায়াম করুন।\", \"en\": \"Avoid excessive weight gain during pregnancy. Maintain a healthy weight through balanced diet and exercise.\"}','8','2024-02-21 13:25:10',NULL,8),(7,'{\"bn\": \"ধূমপান এবং অ্যালকোহল এড়িয়ে চলুন\", \"en\": \"Avoid smoking and alcohol\"}','{\"bn\": \"ধূমপান এবং অ্যালকোহল গর্ভাবস্থায় আপনার শিশুর জন্য ক্ষতিকর।\", \"en\": \"Smoking and alcohol are harmful to your baby during pregnancy.\"}','9','2024-02-21 13:25:10',NULL,9),(8,'{\"bn\": \"আপনার মনের কথা ডাক্তারের সাথে শেয়ার করুন\", \"en\": \"Share your concerns with your doctor\"}','{\"bn\": \"গর্ভাবস্থায় যেকোনো চিন্তা, শঙ্কা বা অনুভূতি ডাক্তারের সাথে খোলামেলাভাবে আলোচনা করুন।\", \"en\": \"Don\'t hesitate to openly discuss any thoughts, concerns, or feelings you have with your doctor during pregnancy.\"}','10','2024-02-21 13:25:10',NULL,10),(9,'{\"bn\": \"পরিবার ও বন্ধুদের সমর্থন নিন\", \"en\": \"Seek support from family and friends\"}','{\"bn\": \"গর্ভাবস্থায় পরিবার ও বন্ধুদের সমর্থন গুরুত্বপূর্ণ। তাদের সাথে কথা বলুন এবং সাহায্য নিন।\", \"en\": \"Support from family and friends is crucial during pregnancy. Talk to them and seek their help.\"}','11','2024-02-21 13:25:10',NULL,11);
/*!40000 ALTER TABLE `daily_reads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_tips`
--

DROP TABLE IF EXISTS `daily_tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_tips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_tips`
--

LOCK TABLES `daily_tips` WRITE;
/*!40000 ALTER TABLE `daily_tips` DISABLE KEYS */;
INSERT INTO `daily_tips` VALUES (2,2,'{\"en\":\"first daily tips\",\"bn\":\"sadf\"}','{\"en\":\"first description\",\"bn\":\"asdf\"}','150','2024-03-02 04:46:03','2024-03-02 05:08:19'),(3,3,'{\"en\":\"adfadf\",\"bn\":\"notun bangla add\"}','{\"en\":\"adfadsf\",\"bn\":\"adding bangla\"}','151','2024-03-02 04:49:25','2024-03-02 05:09:13');
/*!40000 ALTER TABLE `daily_tips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_token`
--

DROP TABLE IF EXISTS `device_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_token` varchar(255) NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `edd_date` datetime DEFAULT NULL,
  `veg` int(11) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dose` varchar(255) NOT NULL,
  `medication_time` varchar(45) NOT NULL,
  `reminder_info` longtext DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` int(11) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `drug_slider_ibfk_1` (`image`),
  CONSTRAINT `drug_slider_ibfk_1` FOREIGN KEY (`image`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug_slider`
--

LOCK TABLES `drug_slider` WRITE;
/*!40000 ALTER TABLE `drug_slider` DISABLE KEYS */;
INSERT INTO `drug_slider` VALUES (1,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','',NULL,'https://www.drugs.com','2024-02-05 14:25:00','2024-02-05 14:25:00'),(2,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','',NULL,'https://www.drugs.com','2024-02-05 14:25:09','2024-02-05 14:25:09'),(3,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','',NULL,'https://www.drugs.com','2024-02-05 14:25:13','2024-02-05 14:25:13'),(4,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','',NULL,'https://www.drugs.com','2024-02-05 14:25:16','2024-02-05 14:25:16'),(5,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','',NULL,'www.newdrug.com','2024-02-05 14:30:18','2024-02-05 14:30:18');
/*!40000 ALTER TABLE `drug_slider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `SMTP_HOST` varchar(255) NOT NULL,
  `SMTP_PORT` varchar(255) NOT NULL,
  `SMTP_EMAIL` varchar(255) NOT NULL,
  `SMTP_PASSWORD` varchar(255) NOT NULL,
  `FROM_EMAIL` varchar(255) NOT NULL,
  `FROM_NAME` varchar(255) NOT NULL,
  `native_ad` int(11) NOT NULL,
  `banner_ad` int(11) NOT NULL,
  `interstitial_ad` int(11) NOT NULL,
  `rewarded_ad` int(11) NOT NULL,
  `app_link` text NOT NULL,
  `facebook_url` text NOT NULL,
  `youtube_url` text NOT NULL,
  `twitter_url` text NOT NULL,
  `instagram_url` text NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `help_desk_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lang_code` varchar(11) NOT NULL,
  `lang_country` varchar(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `flag` varchar(255) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uploaded_by` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `mime_type` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (51,'rumon0','post_images-rumon0-1707311132468.jpg','public/uploads/post/post_images-rumon0-1707311132468.jpg','jpg','image/jpeg','2024-02-07 13:05:32','2024-02-07 13:05:32'),(52,'rumon0','post_images-rumon0-1707311132488.jpg','public/uploads/post/post_images-rumon0-1707311132488.jpg','jpg','image/jpeg','2024-02-07 13:05:32','2024-02-07 13:05:32'),(53,'rumon0','post_images-rumon0-1707311232121.jpg','public/uploads/post/post_images-rumon0-1707311232121.jpg','jpg','image/jpeg','2024-02-07 13:07:12','2024-02-07 13:07:12'),(54,'rumon0','post_images-rumon0-1707311232127.jpg','public/uploads/post/post_images-rumon0-1707311232127.jpg','jpg','image/jpeg','2024-02-07 13:07:12','2024-02-07 13:07:12'),(55,'rumon0','post_images-rumon0-1707311524163.jpg','public/uploads/post/post_images-rumon0-1707311524163.jpg','jpg','image/jpeg','2024-02-07 13:12:04','2024-02-07 13:12:04'),(56,'rumon0','post_images-rumon0-1707311524170.jpg','public/uploads/post/post_images-rumon0-1707311524170.jpg','jpg','image/jpeg','2024-02-07 13:12:04','2024-02-07 13:12:04'),(57,'rumon0','post_images-rumon0-1707311755073.jpg','public/uploads/post/post_images-rumon0-1707311755073.jpg','jpg','image/jpeg','2024-02-07 13:15:55','2024-02-07 13:15:55'),(58,'rumon0','post_images-rumon0-1707311755078.jpg','public/uploads/post/post_images-rumon0-1707311755078.jpg','jpg','image/jpeg','2024-02-07 13:15:55','2024-02-07 13:15:55'),(64,'rumonkh','admin_image_field-rumonkh-1707406231775.jpg','public/uploads/admin/admin_image_field-rumonkh-1707406231775.jpg','jpg','image/jpeg','2024-02-08 15:30:31','2024-02-08 15:30:31'),(65,'shapla','baby_image_field-shapla-1708508688021.png','public/uploads/user/baby_image_field-shapla-1708508688021.png','png','image/png','2024-02-21 09:44:48','2024-02-21 09:44:48'),(66,'shapla','baby_image_field-shapla-1708508756140.png','public/uploads/user/baby_image_field-shapla-1708508756140.png','png','image/png','2024-02-21 09:45:56','2024-02-21 09:45:56'),(67,'shapla','baby_image_field-shapla-1708508772997.png','public/uploads/user/baby_image_field-shapla-1708508772997.png','png','image/png','2024-02-21 09:46:13','2024-02-21 09:46:13'),(68,'shapla','baby_image_field-shapla-1708508962048.png','public/uploads/user/baby_image_field-shapla-1708508962048.png','png','image/png','2024-02-21 09:49:22','2024-02-21 09:49:22'),(69,'shapla','baby_image_field-shapla-1708509001306.png','public/uploads/user/baby_image_field-shapla-1708509001306.png','png','image/png','2024-02-21 09:50:01','2024-02-21 09:50:01'),(70,'shapla','baby_image_field-shapla-1708509083318.png','public/uploads/user/baby_image_field-shapla-1708509083318.png','png','image/png','2024-02-21 09:51:23','2024-02-21 09:51:23'),(71,'shapla','baby_image_field-shapla-1708509097522.png','public/uploads/user/baby_image_field-shapla-1708509097522.png','png','image/png','2024-02-21 09:51:37','2024-02-21 09:51:37'),(72,'shapla','baby_image_field-shapla-1708509118902.png','public/uploads/user/baby_image_field-shapla-1708509118902.png','png','image/png','2024-02-21 09:51:58','2024-02-21 09:51:58'),(73,'shapla','baby_image_field-shapla-1708509164246.png','public/uploads/user/baby_image_field-shapla-1708509164246.png','png','image/png','2024-02-21 09:52:44','2024-02-21 09:52:44'),(74,'shapla','baby_image_field-shapla-1708509187140.png','public/uploads/user/baby_image_field-shapla-1708509187140.png','png','image/png','2024-02-21 09:53:07','2024-02-21 09:53:07'),(75,'shapla','baby_image_field-shapla-1708509276193.png','public/uploads/user/baby_image_field-shapla-1708509276193.png','png','image/png','2024-02-21 09:54:36','2024-02-21 09:54:36'),(76,'shapla','baby_image_field-shapla-1708509317748.png','public/uploads/user/baby_image_field-shapla-1708509317748.png','png','image/png','2024-02-21 09:55:17','2024-02-21 09:55:17'),(77,'shapla','user_image_field-shapla-1708684609250.png','public/uploads/user/user_image_field-shapla-1708684609250.png','png','image/png','2024-02-23 10:36:49','2024-02-23 10:36:49'),(78,'rumonkh','user_image_field-rumonkh-1708790924434.jpg','public/uploads/user/user_image_field-rumonkh-1708790924434.jpg','jpg','image/jpeg','2024-02-24 16:08:44','2024-02-24 16:08:44'),(79,'rumonkh','user_image_field-rumonkh-1708790978847.jpg','public/uploads/user/user_image_field-rumonkh-1708790978847.jpg','jpg','image/jpeg','2024-02-24 16:09:38','2024-02-24 16:09:38'),(116,NULL,'admin_up-admin-1708895159685.jpg','public/uploads/admins/admin_up-admin-1708895159685.jpg','jpg','image/jpeg','2024-02-25 21:05:59','2024-02-25 21:05:59'),(117,NULL,'admin_up-admin-1708895367609.jpg','public/uploads/admins/admin_up-admin-1708895367609.jpg','jpg','image/jpeg','2024-02-25 21:09:27','2024-02-25 21:09:27'),(118,NULL,'admin_up-admin-1708895395566.jpg','public/uploads/admins/admin_up-admin-1708895395566.jpg','jpg','image/jpeg','2024-02-25 21:09:55','2024-02-25 21:09:55'),(119,'rumonkh','user_image_field-rumonkh-1708950075160.png','public/uploads/user/user_image_field-rumonkh-1708950075160.png','png','image/png','2024-02-26 12:21:15','2024-02-26 12:21:15'),(120,'rumonkh','user_image_field-rumonkh-1708950328705.png','public/uploads/user/user_image_field-rumonkh-1708950328705.png','png','image/png','2024-02-26 12:25:28','2024-02-26 12:25:28'),(121,'rumonkh','user_image_field-rumonkh-1708950381923.png','public/uploads/user/user_image_field-rumonkh-1708950381923.png','png','image/png','2024-02-26 12:26:21','2024-02-26 12:26:21'),(122,'rumonkh','user_image_field-rumonkh-1708950386791.png','public/uploads/user/user_image_field-rumonkh-1708950386791.png','png','image/png','2024-02-26 12:26:26','2024-02-26 12:26:26'),(123,'shapla','baby_Image_file-shapla-1709229442934.jpg','public/uploads/baby/baby_Image_file-shapla-1709229442934.jpg','jpg','image/jpeg','2024-02-29 17:57:22','2024-02-29 17:57:22'),(124,'shapla','baby_Image_file-shapla-1709229570062.jpg','public/uploads/baby/baby_Image_file-shapla-1709229570062.jpg','jpg','image/jpeg','2024-02-29 17:59:30','2024-02-29 17:59:30'),(125,'shapla','baby_Image_file-shapla-1709229715257.jpg','public/uploads/baby/baby_Image_file-shapla-1709229715257.jpg','jpg','image/jpeg','2024-02-29 18:01:55','2024-02-29 18:01:55'),(126,'shapla','baby_Image_file-shapla-1709229748200.jpg','public/uploads/baby/baby_Image_file-shapla-1709229748200.jpg','jpg','image/jpeg','2024-02-29 18:02:28','2024-02-29 18:02:28'),(131,'shapla','post_images-shapla-1709233447435.png','public/uploads/post/post_images-shapla-1709233447435.png','png','image/png','2024-02-29 19:04:07','2024-02-29 19:04:07'),(132,'shapla','post_images-shapla-1709233447437.png','public/uploads/post/post_images-shapla-1709233447437.png','png','image/png','2024-02-29 19:04:07','2024-02-29 19:04:07'),(133,'shapla','post_images-shapla-1709233523482.png','public/uploads/post/post_images-shapla-1709233523482.png','png','image/png','2024-02-29 19:05:23','2024-02-29 19:05:23'),(134,'shapla','post_images-shapla-1709233523482.png','public/uploads/post/post_images-shapla-1709233523482.png','png','image/png','2024-02-29 19:05:23','2024-02-29 19:05:23'),(135,'shapla','post_images-shapla-1709233547565.png','public/uploads/post/post_images-shapla-1709233547565.png','png','image/png','2024-02-29 19:05:47','2024-02-29 19:05:47'),(136,'shapla','post_images-shapla-1709233547566.png','public/uploads/post/post_images-shapla-1709233547566.png','png','image/png','2024-02-29 19:05:47','2024-02-29 19:05:47'),(137,'rumonkh','user_image_field-rumonkh-1709234327556.jpg','public/uploads/user/user_image_field-rumonkh-1709234327556.jpg','jpg','image/jpeg','2024-02-29 19:18:47','2024-02-29 19:18:47'),(138,'rumonkh','user_image_field-rumonkh-1709234774153.jpg','public/uploads/user/user_image_field-rumonkh-1709234774153.jpg','jpg','image/jpeg','2024-02-29 19:26:14','2024-02-29 19:26:14'),(139,'rumonkh','user_image_field-rumonkh-1709312455503.jpg','public/uploads/user/user_image_field-rumonkh-1709312455503.jpg','jpg','image/jpeg','2024-03-01 17:00:55','2024-03-01 17:00:55'),(140,'rumonkh','dailyreads_image-admin-1709312706117.jpg','public/uploads/general/dailyreads_image-admin-1709312706117.jpg','jpg','image/jpeg','2024-03-01 17:05:06','2024-03-01 17:05:06'),(141,'rumonkh','dailyreads_image-admin-1709312734764.jpg','public/uploads/general/dailyreads_image-admin-1709312734764.jpg','jpg','image/jpeg','2024-03-01 17:05:34','2024-03-01 17:05:34'),(142,'rumonkh','dailyreads_image-admin-1709352542868.jpg','public/uploads/general/dailyreads_image-admin-1709352542868.jpg','jpg','image/jpeg','2024-03-02 04:09:02','2024-03-02 04:09:02'),(143,'rumonkh','dailyreads_image-admin-1709352747584.jpg','public/uploads/general/dailyreads_image-admin-1709352747584.jpg','jpg','image/jpeg','2024-03-02 04:12:27','2024-03-02 04:12:27'),(144,'rumonkh','blog_image-admin-1709353064943.jpg','public/uploads/general/blog_image-admin-1709353064943.jpg','jpg','image/jpeg','2024-03-02 04:17:44','2024-03-02 04:17:44'),(145,'rumonkh','blog_image-admin-1709353104324.jpg','public/uploads/general/blog_image-admin-1709353104324.jpg','jpg','image/jpeg','2024-03-02 04:18:24','2024-03-02 04:18:24'),(146,'rumonkh','blog_image-admin-1709353133545.jpg','public/uploads/general/blog_image-admin-1709353133545.jpg','jpg','image/jpeg','2024-03-02 04:18:53','2024-03-02 04:18:53'),(147,'rumonkh','blog_image-admin-1709353134499.jpg','public/uploads/general/blog_image-admin-1709353134499.jpg','jpg','image/jpeg','2024-03-02 04:18:54','2024-03-02 04:18:54'),(148,'rumonkh','dailytips_image-admin-1709354604359.jpg','public/uploads/general/dailytips_image-admin-1709354604359.jpg','jpg','image/jpeg','2024-03-02 04:43:24','2024-03-02 04:43:24'),(149,'rumonkh','dailytips_image-admin-1709354623313.jpg','public/uploads/general/dailytips_image-admin-1709354623313.jpg','jpg','image/jpeg','2024-03-02 04:43:43','2024-03-02 04:43:43'),(150,'rumonkh','dailytips_image-admin-1709354763386.jpg','public/uploads/general/dailytips_image-admin-1709354763386.jpg','jpg','image/jpeg','2024-03-02 04:46:03','2024-03-02 04:46:03'),(151,'rumonkh','dailytips_image-admin-1709354965971.jpg','public/uploads/general/dailytips_image-admin-1709354965971.jpg','jpg','image/jpeg','2024-03-02 04:49:25','2024-03-02 04:49:25'),(152,'rumonkh','motherprogress_image-admin-1709356919816.jpg','public/uploads/general/motherprogress_image-admin-1709356919816.jpg','jpg','image/jpeg','2024-03-02 05:21:59','2024-03-02 05:21:59'),(153,'rumonkh','motherprogress_image-admin-1709356935215.jpg','public/uploads/general/motherprogress_image-admin-1709356935215.jpg','jpg','image/jpeg','2024-03-02 05:22:15','2024-03-02 05:22:15'),(154,'rumonkh','babyprogress_image-admin-1709357032373.jpg','public/uploads/general/babyprogress_image-admin-1709357032373.jpg','jpg','image/jpeg','2024-03-02 05:23:52','2024-03-02 05:23:52'),(155,'rumonkh','babyprogress_image-admin-1709357057383.jpg','public/uploads/general/babyprogress_image-admin-1709357057383.jpg','jpg','image/jpeg','2024-03-02 05:24:17','2024-03-02 05:24:17');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(1) NOT NULL,
  `slug` varchar(255) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `activity` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `mother_activity_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mother_activity`
--

LOCK TABLES `mother_activity` WRITE;
/*!40000 ALTER TABLE `mother_activity` DISABLE KEYS */;
INSERT INTO `mother_activity` VALUES (1,12,'Yoga session','2023-12-25 11:37:27','2023-12-25 11:37:27'),(3,12,'chill','2023-12-25 11:37:47','2023-12-25 11:37:47'),(4,12,'cooking','2023-12-25 11:37:53','2023-12-25 11:37:53'),(5,12,'flying','2023-12-25 11:37:58','2023-12-25 11:37:58'),(6,12,'tour','2023-12-25 11:38:10','2023-12-25 11:38:10'),(7,12,'aldksfjalkdfj','2023-12-25 11:39:05','2023-12-25 11:39:05'),(8,12,'reading','2023-12-25 11:39:26','2023-12-25 11:39:26'),(9,12,'reading','2023-11-21 08:00:00','2023-12-25 11:40:58'),(11,12,'valo','0000-00-00 00:00:00','2023-12-25 11:41:58'),(12,12,'valo','2023-06-21 08:00:00','2023-12-25 11:42:48'),(13,12,'chill','2023-05-21 08:00:00','2023-12-25 11:43:00'),(14,12,'farm','2023-01-21 08:00:00','2023-12-25 11:43:12'),(15,12,'invest','2023-02-21 08:00:00','2023-12-25 11:43:36'),(16,12,'invest','2023-05-21 08:00:00','2023-12-25 11:43:59'),(17,12,'invest','2023-06-21 08:00:00','2023-12-25 11:44:12'),(18,12,'invest','2023-06-21 08:00:00','2023-12-25 11:44:23'),(19,12,'invest','2024-01-07 10:47:57','2024-01-07 10:47:57'),(20,12,'reading','2024-01-07 10:48:02','2024-01-07 10:48:02'),(21,12,'tv','2024-01-07 10:48:09','2024-01-07 10:48:09'),(22,12,'cooking','2024-01-07 10:48:20','2024-01-07 10:48:20'),(23,12,'tour','2024-01-07 10:48:25','2024-01-07 10:48:25');
/*!40000 ALTER TABLE `mother_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mother_mood_trackers`
--

DROP TABLE IF EXISTS `mother_mood_trackers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mother_mood_trackers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `mood_time` datetime NOT NULL,
  `current_mood` varchar(255) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mother_progress_timeline`
--

LOCK TABLES `mother_progress_timeline` WRITE;
/*!40000 ALTER TABLE `mother_progress_timeline` DISABLE KEYS */;
INSERT INTO `mother_progress_timeline` VALUES (1,1,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','',NULL,NULL),(3,3,'{\"en\":\"eat healtry food\",\"bn\":\"sudhu khaben\"}','{\"en\":\"please take healthy food\",\"bn\":\"khete thakun\"}','153','2024-03-02 05:22:15','2024-03-02 05:22:15');
/*!40000 ALTER TABLE `mother_progress_timeline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mother_vaccine_reminders`
--

DROP TABLE IF EXISTS `mother_vaccine_reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mother_vaccine_reminders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `deadline` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` int(11) NOT NULL,
  `description` text NOT NULL,
  `image` int(11) DEFAULT NULL,
  `status` varchar(1) DEFAULT '1',
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
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
  `post_id` int(11) NOT NULL,
  `media_id` int(11) NOT NULL,
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
/*!40000 ALTER TABLE `postmedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postnatal_visit`
--

DROP TABLE IF EXISTS `postnatal_visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postnatal_visit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `visit_type` varchar(255) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `visit_no` int(11) NOT NULL,
  `hospital_address` varchar(255) NOT NULL,
  `receptionist` varchar(255) NOT NULL,
  `mobile` int(20) NOT NULL,
  `visit_date` datetime NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postnatal_visit_ibfk_1` (`user_id`),
  CONSTRAINT `postnatal_visit_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postnatal_visit`
--

LOCK TABLES `postnatal_visit` WRITE;
/*!40000 ALTER TABLE `postnatal_visit` DISABLE KEYS */;
INSERT INTO `postnatal_visit` VALUES (7,12,'Regular checkup','Dr. Smith',1,'123 Medical Center, Main Street, City','Receptionist Name',1234567890,'2023-12-21 09:00:00','Patient is doing well, no complications.','2024-02-24 16:48:28','2024-02-24 16:48:28'),(8,12,'again regular checkup','Dr. Smith',1,'123 Medical Center, Main Street, City','Receptionist Name',1234567890,'2023-12-21 09:00:00','Patient is doing well, no complications.','2024-02-24 16:48:41','2024-02-24 16:48:41');
/*!40000 ALTER TABLE `postnatal_visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `topic` int(11) NOT NULL DEFAULT 1,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `published` int(1) NOT NULL DEFAULT 0,
  `published_date` datetime DEFAULT NULL,
  `total_reaction` int(11) NOT NULL DEFAULT 0,
  `total_comment` int(11) NOT NULL DEFAULT 0,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `topic` (`topic`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,12,1,'hello i am first title','this is a large content',0,NULL,2,0,'2024-02-27 20:27:18','2023-12-13 17:58:37'),(3,12,1,'hello i am another title','this is a large content',0,NULL,0,0,'2023-12-13 17:59:04','2023-12-13 17:59:04'),(4,12,1,'hello i am last title','this is a large content',0,NULL,0,0,'2023-12-13 17:59:09','2023-12-13 17:59:09'),(5,12,1,'hello i am last title','this is a large content',0,NULL,0,0,'2024-02-03 17:42:42','2024-02-03 17:42:42'),(6,12,1,'New develop ment for adding multiple images','this is a large content',0,NULL,0,0,'2024-02-03 17:43:26','2024-02-03 17:43:26'),(12,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:20:28','2024-02-04 09:20:28'),(13,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:20:41','2024-02-04 09:20:41'),(14,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:23:10','2024-02-04 09:23:10'),(15,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:23:47','2024-02-04 09:23:47'),(16,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:28:08','2024-02-04 09:28:08'),(17,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:28:55','2024-02-04 09:28:55'),(18,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:29:27','2024-02-04 09:29:27'),(19,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:31:22','2024-02-04 09:31:22'),(20,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:33:57','2024-02-04 09:33:57'),(21,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 09:36:03','2024-02-04 09:36:03'),(23,12,1,'new title','large content',0,NULL,0,0,'2024-02-04 10:05:57','2024-02-04 10:05:57'),(24,12,1,'creation finished 1','all about my post in the field',0,NULL,0,0,'2024-02-04 10:07:12','2024-02-04 10:07:12'),(33,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 12:43:06','2024-02-07 12:43:06'),(34,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 12:43:36','2024-02-07 12:43:36'),(35,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:03:08','2024-02-07 13:03:08'),(36,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:03:30','2024-02-07 13:03:30'),(37,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:03:49','2024-02-07 13:03:49'),(38,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:05:32','2024-02-07 13:05:32'),(39,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:07:12','2024-02-07 13:07:12'),(40,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:12:04','2024-02-07 13:12:04'),(41,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:12:18','2024-02-07 13:12:18'),(42,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:12:46','2024-02-07 13:12:46'),(43,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:14:08','2024-02-07 13:14:08'),(44,52,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-07 13:15:55','2024-02-07 13:15:55'),(45,12,1,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-29 19:04:07','2024-02-29 19:04:07'),(46,12,3,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-29 19:05:23','2024-02-29 19:05:23'),(47,12,3,'photo diye','2 ta photo ache',0,NULL,0,0,'2024-02-29 19:05:47','2024-02-29 19:05:47');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (1,1,12,3,NULL,'2023-12-14 14:41:52','2023-12-14 14:41:52'),(2,1,12,4,NULL,'2023-12-14 14:43:16','2023-12-14 14:43:16'),(5,2,12,NULL,1,'2023-12-14 15:24:51','2023-12-14 15:24:59'),(6,3,13,1,NULL,'2023-12-14 15:03:26','2023-12-14 15:05:21'),(18,3,12,2,NULL,'2024-02-27 20:21:29','2024-02-27 20:23:50'),(19,3,12,1,NULL,'2024-02-27 20:27:18','2024-02-27 20:27:24');
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactiontypes`
--

DROP TABLE IF EXISTS `reactiontypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reactiontypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactiontypes`
--

LOCK TABLES `reactiontypes` WRITE;
/*!40000 ALTER TABLE `reactiontypes` DISABLE KEYS */;
INSERT INTO `reactiontypes` VALUES (1,'like'),(2,'sad'),(3,'happy'),(4,'angry'),(5,'wow'),(6,'dislike');
/*!40000 ALTER TABLE `reactiontypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `replies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'superadmin',NULL,'2024-02-07 20:48:32','2024-02-07 20:48:32'),(2,'admin',NULL,'2024-02-07 20:48:32','2024-02-07 20:48:32'),(3,'moderator',NULL,'2024-02-07 20:48:56','2024-02-07 20:48:56'),(4,'editor',NULL,'2024-02-07 20:48:56','2024-02-07 20:48:56'),(5,'help_desk','replies and manipulate help desk messages','2024-02-10 15:07:24','2024-02-10 15:07:24'),(6,'user','manipulate users information','2024-02-11 13:22:23','2024-02-11 13:22:23'),(7,'blog','manipulate blogs','2024-02-11 13:23:20','2024-02-11 13:23:20'),(8,'baby_care','all baby care routes','2024-02-11 14:05:09','2024-02-11 14:05:09'),(9,'baby_temp','baby temp functionality','2024-02-11 14:05:09','2024-02-11 14:05:09'),(10,'baby_vaccine',NULL,'2024-02-11 15:24:54','2024-02-11 15:24:54'),(11,'dailyread',NULL,'2024-02-17 06:44:33','2024-02-17 06:44:33');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_mother_baby_kick_counters`
--

DROP TABLE IF EXISTS `tool_mother_baby_kick_counters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tool_mother_baby_kick_counters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `baby_serial` int(11) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `kicks` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_mother_baby_kick_counters`
--

LOCK TABLES `tool_mother_baby_kick_counters` WRITE;
/*!40000 ALTER TABLE `tool_mother_baby_kick_counters` DISABLE KEYS */;
INSERT INTO `tool_mother_baby_kick_counters` VALUES (6,12,NULL,'5',15,'2023-08-01 09:30:00','2024-01-06 13:11:41','2024-01-06 13:11:41'),(7,12,NULL,'5',15,'2023-12-01 09:30:00','2024-01-06 13:11:50','2024-01-06 13:11:50'),(8,12,NULL,'3',5,'2022-12-01 09:30:00','2024-01-06 13:12:00','2024-01-06 13:12:00'),(9,12,NULL,'13',12,'2022-12-01 08:30:00','2024-01-06 13:12:14','2024-01-06 13:12:14');
/*!40000 ALTER TABLE `tool_mother_baby_kick_counters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_mother_contraction_timers`
--

DROP TABLE IF EXISTS `tool_mother_contraction_timers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tool_mother_contraction_timers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `start` datetime DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `intensity` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_mother_contraction_timers`
--

LOCK TABLES `tool_mother_contraction_timers` WRITE;
/*!40000 ALTER TABLE `tool_mother_contraction_timers` DISABLE KEYS */;
INSERT INTO `tool_mother_contraction_timers` VALUES (1,0,'2023-12-01 08:00:00','30 minutes','Irregular','Low','2023-12-04 14:44:26','2023-12-04 14:44:26'),(2,0,'2023-12-01 08:00:00','30 minutes','Irregular','high','2023-12-04 14:44:33','2023-12-04 14:44:33'),(3,0,'2023-12-01 08:00:00','30 minutes','Irregular','high','2023-12-04 14:44:49','2023-12-04 14:44:49'),(4,0,'2023-12-01 08:00:00','30 minutes','Irregular','high','2023-12-04 14:44:50','2023-12-04 14:44:50'),(5,12,'2023-12-01 08:00:00','30 minutes','Irregular','high','2023-12-04 15:00:23','2023-12-04 15:00:23'),(6,12,'2023-12-01 08:00:00','30 minutes','Irregular','high','2023-12-04 15:00:24','2023-12-04 15:00:24'),(7,12,'2023-12-01 08:00:00','30 minutes','Irregular','high','2023-12-04 15:01:51','2023-12-04 15:01:51'),(8,12,'2023-12-01 08:00:00','30 minutes','Irregular','high','2023-12-04 15:01:52','2023-12-04 15:01:52'),(9,12,'2023-12-01 08:00:00','30 minutes','Irregular','high','2024-01-09 16:40:56','2024-01-09 16:40:56');
/*!40000 ALTER TABLE `tool_mother_contraction_timers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_mother_symptoms`
--

DROP TABLE IF EXISTS `tool_mother_symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tool_mother_symptoms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `symptom` varchar(255) DEFAULT NULL,
  `intensity` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_mother_symptoms`
--

LOCK TABLES `tool_mother_symptoms` WRITE;
/*!40000 ALTER TABLE `tool_mother_symptoms` DISABLE KEYS */;
INSERT INTO `tool_mother_symptoms` VALUES (1,12,'Headache','Mild','Had a headache for an hour.','2023-12-04 15:13:06','2023-12-04 15:13:06'),(3,12,'Headache','so high','Had a headache for an hour.','2023-12-04 15:13:34','2023-12-04 15:13:34'),(4,12,'Headache','so low','Had a headache for an hour.','2023-12-04 15:13:40','2023-12-04 15:13:40'),(5,12,'jor','so low','Had a headache for an hour.','2024-01-09 16:31:28','2024-01-09 16:44:18');
/*!40000 ALTER TABLE `tool_mother_symptoms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `social_id` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `photo` int(11) DEFAULT NULL,
  `social_photo` varchar(255) DEFAULT NULL,
  `child_number` int(11) DEFAULT NULL,
  `edd_date` datetime DEFAULT NULL,
  `edd_calculation_type` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `pregnancy_loss` int(11) DEFAULT NULL,
  `pregnancy_loss_date` datetime DEFAULT NULL,
  `baby_already_born` int(11) DEFAULT NULL,
  `login_type` varchar(255) NOT NULL COMMENT 'email=1 google=2 facebook=2 twitter=2',
  `user_type` varchar(255) NOT NULL DEFAULT 'general_user',
  `subscription` varchar(255) NOT NULL DEFAULT 'Free',
  `password_reset_token` varchar(255) DEFAULT NULL,
  `reset_password_expire` varchar(255) DEFAULT NULL,
  `confirm_email_token` varchar(255) DEFAULT NULL,
  `is_email_confirmed` varchar(45) DEFAULT '0',
  `is_profile_complete` varchar(225) NOT NULL DEFAULT '0',
  `lmp_date` datetime DEFAULT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  `deleted_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `social_id` (`social_id`),
  KEY `users_ibfk_1` (`photo`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`photo`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,NULL,'kamal','kalu','reza',28,1,139,NULL,2,'2023-12-15 00:00:00',NULL,'new1user@email.com','$2b$10$M5LSsfNStlqUq/XHRL5qS.FsRwSZ3Tsgze.569oFqgum5Q2kTbq3S','English',NULL,NULL,NULL,1,'email','general_user','Premium','2f1cbc7873708f75f944e1c39831f55cd37e0d5d4d58f900b63c66c6cfd3b286','Sun Nov 26 2023 23:02:41 GMT+0600 (Bangladesh Standard Time)600000',NULL,'0','0','2023-01-01 00:00:00',0,NULL,'2023-11-26 10:28:12','2024-03-01 17:00:55'),(12,NULL,'shapla','shapla','jahan',12,1,77,NULL,1,'2023-12-15 00:00:00',NULL,'shapla@email.com','$2b$10$a.2MqcV5L1XlcROdV2dpDOvzO9in9wMCZX2rEWiAPHP9759PgWQx.','Bangla',NULL,NULL,NULL,1,'email','general_user','free','8d216e62a0af344ecb1efb8a6a43f1101da31e2d5c78a012f94e2a0e0dbf62b3',NULL,NULL,'1','0','2023-01-01 00:00:00',0,NULL,'2023-11-26 10:41:15','2024-02-23 10:36:49'),(108,NULL,'geema','golu','gh',67,NULL,120,NULL,NULL,NULL,NULL,'daf@ddd.com','$2b$10$LVX2lb431ihzEsOtm6x/ROCNQWAP7lsFIhSq8kJl5k1cH2UjOyNAa',NULL,NULL,NULL,NULL,0,'email','general_user','Free',NULL,NULL,NULL,'0','0',NULL,1,'2024-02-29 19:42:25','2024-02-26 12:25:14','2024-02-29 19:42:25'),(109,NULL,'arman','arman','khan',32,NULL,138,NULL,NULL,'2024-01-16 18:00:00',NULL,'arman.khan.dev@gmail.com','$2b$10$a.2MqcV5L1XlcROdV2dpDOvzO9in9wMCZX2rEWiAPHP9759PgWQx.',NULL,NULL,NULL,NULL,0,'email','general_user','Premium',NULL,NULL,NULL,'1','0',NULL,0,NULL,'2024-02-29 19:18:23','2024-02-29 19:26:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `youtube_link` text DEFAULT NULL,
  `image_link` text DEFAULT NULL,
  `file_id` int(11) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `media` (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'{\"bn\": \"ধূমপান এবং অ্যালকোহল গর্ভাবস্থায় আপনার শিশুর জন্য ক্ষতিকর।\", \"en\": \"Smoking and alcohol are harmful to your baby during pregnancy.\"}','{\"bn\": \"ধূমপান এবং অ্যালকোহল গর্ভাবস্থায় আপনার শিশুর জন্য ক্ষতিকর।\", \"en\": \"Smoking and alcohol are harmful to your baby during pregnancy.\"}','','05:30',NULL,NULL,14,'2024-01-09 16:52:38','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warning_signs`
--

DROP TABLE IF EXISTS `warning_signs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warning_signs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `warning_signs_ibfk_1` (`image`),
  CONSTRAINT `warning_signs_ibfk_1` FOREIGN KEY (`image`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warning_signs`
--

LOCK TABLES `warning_signs` WRITE;
/*!40000 ALTER TABLE `warning_signs` DISABLE KEYS */;
INSERT INTO `warning_signs` VALUES (3,1,'{\"bn\": \"স্বাস্থ্যকর ওজন বজায় রাখুন\", \"en\": \"Maintain a healthy weight\"}','{\"bn\": \"গর্ভাবস্থায় অতিরিক্ত ওজন বৃদ্ধি এড়িয়ে চলুন। স্বাস্থ্যকর খাবার খান এবং নিয়মিত ব্যায়াম করুন।\", \"en\": \"Avoid excessive weight gain during pregnancy. Maintain a healthy weight through balanced diet and exercise.\"}',NULL,'2024-02-17 05:33:29','2024-02-17 05:33:29'),(4,1,'{\"bn\": \"ধূমপান এবং অ্যালকোহল এড়িয়ে চলুন\", \"en\": \"Avoid smoking and alcohol\"}','{\"bn\": \"ধূমপান এবং অ্যালকোহল গর্ভাবস্থায় আপনার শিশুর জন্য ক্ষতিকর।\", \"en\": \"Smoking and alcohol are harmful to your baby during pregnancy.\"}',NULL,'2024-02-17 05:35:35','2024-02-17 05:35:35');
/*!40000 ALTER TABLE `warning_signs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weight_logs`
--

DROP TABLE IF EXISTS `weight_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weight_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `date` datetime DEFAULT NULL,
  `weight_kg` double DEFAULT NULL,
  `weight_lbs` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weight_logs`
--

LOCK TABLES `weight_logs` WRITE;
/*!40000 ALTER TABLE `weight_logs` DISABLE KEYS */;
INSERT INTO `weight_logs` VALUES (0,39,NULL,NULL,0,'2023-12-25 10:45:23','2023-12-25 10:45:23');
/*!40000 ALTER TABLE `weight_logs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-02 11:56:03
