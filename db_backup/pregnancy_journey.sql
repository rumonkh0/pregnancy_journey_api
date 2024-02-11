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
INSERT INTO `admin_role` VALUES (1,1),(2,1),(1,2),(1,5),(7,4),(7,3),(7,10);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antenatal_visit`
--

LOCK TABLES `antenatal_visit` WRITE;
/*!40000 ALTER TABLE `antenatal_visit` DISABLE KEYS */;
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
  CONSTRAINT `FK_11` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_breast_pumping`
--

LOCK TABLES `baby_breast_pumping` WRITE;
/*!40000 ALTER TABLE `baby_breast_pumping` DISABLE KEYS */;
INSERT INTO `baby_breast_pumping` VALUES (26,24,48,58,106,'5 minutes','7 minutes','12 minutes','2023-11-28 19:58:40','2023-11-28 19:58:40'),(27,24,38,52,90,'4 minutes','6 minutes','10 minutes','2023-11-28 19:58:40','2023-11-28 19:58:40'),(28,24,42,48,90,'4 minutes','5 minutes','9 minutes','2023-11-28 19:58:40','2023-11-28 19:58:40'),(29,24,52,62,114,'6 minutes','8 minutes','14 minutes','2023-11-28 19:58:40','2023-11-28 19:58:40'),(30,24,58,68,126,'7 minutes','9 minutes','16 minutes','2023-11-28 19:58:40','2023-11-28 19:58:40'),(32,23,58,68,126,'7 minutes','9 minutes','16 minutes','2023-11-28 08:00:00','2023-11-28 17:03:24'),(33,23,58,68,2147483647,'7 minutes','9 minutes','16 minutes','2023-11-28 08:00:00','2023-11-28 17:03:36'),(34,24,58,68,2147483647,'7 minutes','9 minutes','16 minutes','2023-11-28 08:00:00','2023-11-28 17:03:42');
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
  CONSTRAINT `FK_6` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_diaper`
--

LOCK TABLES `baby_diaper` WRITE;
/*!40000 ALTER TABLE `baby_diaper` DISABLE KEYS */;
INSERT INTO `baby_diaper` VALUES (4,24,'mixed','2023-11-28 18:53:46','2023-11-28 18:53:46',1),(8,24,'mixed','2023-11-28 18:53:46','2023-11-28 18:53:46',2),(10,24,'poo','2023-11-28 18:53:46','2023-11-28 18:53:46',3),(12,23,'pee','2023-11-28 16:58:54','2023-11-28 16:58:54',1),(13,24,'pee','2023-11-28 17:09:25','2023-11-28 17:09:25',1),(14,24,'pee','2023-11-28 17:09:43','2023-11-28 17:09:43',2147483647),(15,24,'pee','2023-11-28 17:10:31','2023-11-28 17:10:31',2147483647),(16,27,'pee','2023-11-29 11:46:40','2023-11-29 11:46:40',2147483647);
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
  `let_duration` varchar(255) DEFAULT NULL,
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
  CONSTRAINT `FK_5` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='ml';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_feed`
--

LOCK TABLES `baby_feed` WRITE;
/*!40000 ALTER TABLE `baby_feed` DISABLE KEYS */;
INSERT INTO `baby_feed` VALUES (24,24,'solid',NULL,NULL,NULL,NULL,'rice cereal',50,'2023-11-28 16:43:40','2023-11-28 16:43:40','2023-11-28 16:43:40'),(27,24,'breast','6 minutes',NULL,NULL,NULL,NULL,NULL,'2023-11-28 16:43:40','2023-11-28 16:43:40','2023-11-28 16:43:40'),(28,24,'solid',NULL,NULL,NULL,NULL,'mashed banana',60,'2023-11-28 16:43:40','2023-11-28 16:43:40','2023-11-28 16:43:40'),(29,25,'breast','10 minutes',NULL,NULL,NULL,NULL,NULL,'2023-11-28 16:43:40','2023-11-28 16:43:40','2023-11-28 16:43:40'),(30,25,'bottle',NULL,NULL,NULL,80,NULL,NULL,'2023-11-28 16:43:40','2023-11-28 16:43:40','2023-11-28 16:43:40'),(32,23,'breast','100 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 08:00:00','2023-11-28 16:57:45'),(33,23,'breast','100 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 08:00:00','2023-11-28 16:58:04'),(34,23,'breast','100 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 16:59:17','2023-11-28 16:59:17'),(35,23,'breast','10000000000000000000000000000 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 17:02:13','2023-11-28 17:02:13'),(36,24,'breast','10000000000000000000000000000 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 17:02:36','2023-11-28 17:02:36'),(37,24,'breast','10000000000000000000000000000 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-28 17:03:49','2023-11-28 17:03:49'),(38,24,'breast','10000000000000000000000000000 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-29 11:46:02','2023-11-29 11:46:02'),(39,27,'breast','10000000000000000000000000000 minutes',NULL,NULL,100,NULL,NULL,'2023-11-28 08:00:00','2023-11-29 11:47:08','2023-11-29 11:47:08');
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
  CONSTRAINT `FK_2` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_gallery`
--

LOCK TABLES `baby_gallery` WRITE;
/*!40000 ALTER TABLE `baby_gallery` DISABLE KEYS */;
INSERT INTO `baby_gallery` VALUES (1,5,27,'public\\uploads\\baby\\file-1701281545638.jpg','{ \"bn\": \"amara\", \"en\": \"hello\"}','2023-11-29 18:12:25','2023-11-29 18:12:25'),(2,1,27,'public\\uploads\\baby\\file-1701281616470.jpg','first photo','2023-11-29 18:13:36','2023-11-29 18:13:36'),(3,5,27,'public\\uploads\\baby\\file-1701281617905.jpg','first photo','2023-11-29 18:13:37','2023-11-29 18:13:37'),(4,1,27,'public\\uploads\\baby\\file-1701281619081.jpg','first photo','2023-11-29 18:13:39','2023-11-29 18:13:39'),(5,5,27,'public\\uploads\\baby\\file-1701428051879.png','first photo','2023-12-01 10:54:11','2023-12-01 10:54:11'),(6,0,27,'public\\uploads\\baby\\file-1701715188194.png','first photo','2023-12-04 18:39:48','2023-12-04 18:39:48'),(8,3,30,'public\\uploads\\baby\\file-jinia-1704258886978.jpg','awew','2024-01-03 05:14:47','2024-01-03 05:14:47'),(9,4,30,'public\\uploads\\baby\\file-jinia-1704259079187.jpg','awew','2024-01-03 05:17:59','2024-01-03 05:17:59'),(10,5,30,'public\\uploads\\baby\\file-jinia-1704259520777.jpg','upload from vs code ','2024-01-03 05:25:20','2024-01-03 05:25:20'),(11,6,30,'public\\uploads\\baby\\file-jinia-1704261011626.jpg','with core and multipart','2024-01-03 05:50:11','2024-01-03 05:50:11'),(12,7,30,'public\\uploads\\baby\\file-jinia-1704261599570.jpg','with core and multipart','2024-01-03 05:59:59','2024-01-03 05:59:59'),(13,8,30,'public\\uploads\\baby\\file-jinia-1704261610054.jpg','with core and multipart','2024-01-03 06:00:10','2024-01-03 06:00:10'),(14,9,30,'public\\uploads\\baby\\file-jinia-1704262294542.jpg','with core and multipart','2024-01-03 06:11:34','2024-01-03 06:11:34'),(15,10,30,'public\\uploads\\baby\\Image_file_name-jinia-1704262786612.jpg','with core and multipart','2024-01-03 06:19:46','2024-01-03 06:19:46'),(16,11,30,'public\\uploads\\baby\\baby_Image_file-jinia-1704262930242.jpg','with core and multipart','2024-01-03 06:22:10','2024-01-03 06:22:10'),(17,12,30,'public\\uploads\\baby\\baby_Image_file-jinia-1704263026742.jpg','upload from vs code ','2024-01-03 06:23:46','2024-01-03 06:23:46'),(18,13,30,'public\\uploads\\baby\\baby_Image_file-jinia-1704263803360.jpg','upload from vs code ','2024-01-03 06:36:43','2024-01-03 06:36:43'),(19,14,30,'public\\uploads\\baby\\baby_Image_file-jinia-1704263824189.jpg','upload from vs code ','2024-01-03 06:37:04','2024-01-03 06:37:04'),(20,15,27,'public\\uploads\\baby\\baby_Image_file-shapla-1704273230102.jpg','with core and multipart','2024-01-03 09:13:50','2024-01-03 09:13:50'),(21,16,27,'public\\uploads\\baby\\baby_Image_file-shapla-1704303883116.jpg','with core and multipart','2024-01-03 17:44:43','2024-01-03 17:44:43'),(22,17,23,'public\\uploads\\baby\\baby_Image_file-shapla-1704305675654.jpg','with core and multipart','2024-01-03 18:14:35','2024-01-03 18:14:35');
/*!40000 ALTER TABLE `baby_gallery` ENABLE KEYS */;
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
  `photo` varchar(255) DEFAULT NULL,
  `baby_serial` int(11) DEFAULT NULL,
  `gender` varchar(45) NOT NULL COMMENT 'male=1 female=2',
  `birth_date` datetime DEFAULT NULL,
  `first_move` datetime DEFAULT NULL,
  `first_heartbeat` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`mother_id`),
  CONSTRAINT `FK_1` FOREIGN KEY (`mother_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_list`
--

LOCK TABLES `baby_list` WRITE;
/*!40000 ALTER TABLE `baby_list` DISABLE KEYS */;
INSERT INTO `baby_list` VALUES (21,1,'Baby1','baby1.jpg',1,'male','2023-01-10 00:00:00','2023-01-20 00:00:00','2023-02-01 00:00:00','2023-02-01 00:00:00',NULL),(22,1,'Baby2','baby2.jpg',2,'female','2023-03-15 00:00:00','2023-03-25 00:00:00','2023-04-05 00:00:00','2023-02-01 00:00:00',NULL),(23,12,'Baby3','baby3.jpg',1,'male','2023-05-20 00:00:00','2023-06-01 00:00:00','2023-06-15 00:00:00','2023-02-01 00:00:00',NULL),(24,12,'Baby4','baby4.jpg',2,'female','2023-07-25 00:00:00','2023-08-05 00:00:00','2023-08-20 00:00:00','2023-02-01 00:00:00',NULL),(25,13,'Baby5','baby5.jpg',1,'male','2023-09-30 00:00:00','2023-10-15 00:00:00','2023-10-30 00:00:00','2023-02-01 00:00:00',NULL),(27,12,'arman baby','baby1.jpg',1,'male','2023-01-10 00:00:00','2023-01-20 00:00:00','2023-02-01 00:00:00','2023-11-29 11:44:06','2023-11-29 11:44:06'),(30,40,'arman baby 1',NULL,1,'male','2023-01-10 00:00:00',NULL,NULL,'2024-01-03 05:08:30','2024-01-03 05:08:30'),(31,40,'arman baby 2',NULL,1,'male','2023-01-10 00:00:00',NULL,NULL,'2024-01-03 05:08:40','2024-01-03 05:08:40'),(32,52,'arman baby 2',NULL,1,'male','2023-01-10 00:00:00',NULL,NULL,'2024-02-11 13:43:04','2024-02-11 13:43:04');
/*!40000 ALTER TABLE `baby_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_medications`
--

DROP TABLE IF EXISTS `baby_medications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_medications` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dose` varchar(25) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `baby_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_19` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_medications`
--

LOCK TABLES `baby_medications` WRITE;
/*!40000 ALTER TABLE `baby_medications` DISABLE KEYS */;
/*!40000 ALTER TABLE `baby_medications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_notes`
--

DROP TABLE IF EXISTS `baby_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_notes` (
  `id` int(11) NOT NULL,
  `baby_id` int(10) unsigned NOT NULL,
  `note_title` varchar(255) DEFAULT NULL,
  `note_description` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_13` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_notes`
--

LOCK TABLES `baby_notes` WRITE;
/*!40000 ALTER TABLE `baby_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `baby_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baby_progress_timeline`
--

DROP TABLE IF EXISTS `baby_progress_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baby_progress_timeline` (
  `id` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baby_id` int(10) unsigned DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `total_duration` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`baby_id`),
  CONSTRAINT `FK_9` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_sleep`
--

LOCK TABLES `baby_sleep` WRITE;
/*!40000 ALTER TABLE `baby_sleep` DISABLE KEYS */;
INSERT INTO `baby_sleep` VALUES (7,24,'2023-11-01 21:00:00','2023-11-02 04:00:00','7 hours','2023-11-28 21:22:43','2023-11-28 21:22:43'),(8,24,'2023-11-02 22:30:00','2023-11-03 05:30:00','7 hours','2023-11-28 21:22:43','2023-11-28 21:22:43'),(9,24,'2023-11-01 22:00:00','2023-11-02 05:00:00','7 hours','2023-11-28 21:22:43','2023-11-28 21:22:43'),(10,24,'2023-11-03 00:30:00','2023-11-03 07:30:00','7 hours','2023-11-28 21:22:43','2023-11-28 21:22:43'),(14,27,'2023-11-01T20:00:00Z','2023-11-01T22:00:00Z','2 hours','2023-11-29 11:47:21','2023-11-29 11:47:21'),(15,27,'2023-11-01T20:00:00Z','2023-11-01T22:00:00Z','2 hours','2023-12-01 16:52:31','2023-12-01 16:52:31'),(16,23,'2023-11-01T20:00:00Z','2023-11-01T22:00:00Z','2 hours','2023-12-01 16:52:41','2023-12-01 16:52:41'),(17,27,'2023-11-01','2023-11-01','2 hours','2023-12-01 16:53:40','2023-12-01 16:53:40');
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
  CONSTRAINT `FK_7` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_symptoms`
--

LOCK TABLES `baby_symptoms` WRITE;
/*!40000 ALTER TABLE `baby_symptoms` DISABLE KEYS */;
INSERT INTO `baby_symptoms` VALUES (14,'rash','2023-11-28 19:35:39','2023-11-28 19:35:39',24),(15,'sneezing','2023-11-28 19:35:39','2023-11-28 19:35:39',24),(16,'stomach ache','2023-11-28 19:35:39','2023-11-28 19:35:39',24),(17,'headache','2023-11-28 19:35:39','2023-11-28 19:35:39',24),(18,'earache','2023-11-28 19:35:39','2023-11-28 19:35:39',24),(19,'diarrhea','2023-11-28 19:35:39','2023-11-28 19:35:39',24),(24,'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asf ','2023-11-28 17:12:01','2023-11-28 17:12:01',23),(25,'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asfsdfadsfadsf aeafsdf ','2023-11-28 17:12:08','2023-11-28 17:12:08',23),(26,'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asfsdfadsfadsf aeafsdf ','2023-11-28 17:12:14','2023-11-28 17:12:14',24),(27,'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asfsdfadsfadsf aeafsdf ','2023-11-29 11:46:25','2023-11-29 11:46:25',27),(28,'cough adsffsdfadsfadsf aeafsdf ','2023-11-29 11:46:57','2023-11-29 11:46:57',27),(29,'cough adsffsd--------------------fadsfadsf aeafsdf ','2023-11-29 11:47:45','2023-11-29 11:47:45',27);
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
  CONSTRAINT `FK_12` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baby_temperature`
--

LOCK TABLES `baby_temperature` WRITE;
/*!40000 ALTER TABLE `baby_temperature` DISABLE KEYS */;
INSERT INTO `baby_temperature` VALUES (1,32,'37.5','99.5','2024-02-10 08:00:00','2024-02-11 15:06:30'),(2,32,'37.5','50.5','2024-02-11 15:06:57','2024-02-11 15:06:57');
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
  `name` varchar(2555) DEFAULT NULL,
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
INSERT INTO `blog_categories` VALUES (1,1,'pregnancy',NULL,NULL,NULL),(2,1,'health',NULL,'2024-01-09 18:41:44','2024-01-09 18:41:44'),(3,2,'baby',NULL,'2024-01-09 18:42:07',NULL),(4,3,'food',NULL,'2024-01-09 18:42:38',NULL);
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
  `order` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1` (`category`),
  CONSTRAINT `FK_15` FOREIGN KEY (`category`) REFERENCES `blog_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,NULL,'hello',NULL,'this is blog','dfa',NULL,NULL);
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
  CONSTRAINT `FK_21` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_vaccine_remiinders`
--

LOCK TABLES `child_vaccine_remiinders` WRITE;
/*!40000 ALTER TABLE `child_vaccine_remiinders` DISABLE KEYS */;
INSERT INTO `child_vaccine_remiinders` VALUES (1,27,'polio','2023-12-31 00:00:00','Pending','2023-11-30 12:00:00','2023-12-04 13:33:46'),(2,27,'pneumonia','2023-12-31 00:00:00','Pending','2023-12-04 13:40:12','2023-12-04 13:43:29'),(3,27,'polio','2023-12-31 00:00:00','pending','2023-12-04 13:40:30','2023-12-04 13:40:30'),(4,32,'polio','2023-12-31 00:00:00','pending','2024-02-11 13:43:19','2024-02-11 13:43:19'),(5,32,'haam','2023-12-31 00:00:00','pending','2024-02-11 13:57:47','2024-02-11 13:57:47');
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
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_reads`
--

LOCK TABLES `daily_reads` WRITE;
/*!40000 ALTER TABLE `daily_reads` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_reads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_tips`
--

DROP TABLE IF EXISTS `daily_tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_tips` (
  `id` int(11) NOT NULL,
  `day` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
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
  `media` int(11) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
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
INSERT INTO `drug_slider` VALUES (1,'new drug arrival',NULL,'https://www.drugs.com','2024-02-05 14:25:00','2024-02-05 14:25:00'),(2,'new drug arrival 2',NULL,'https://www.drugs.com','2024-02-05 14:25:09','2024-02-05 14:25:09'),(3,'new drug arrival 4',NULL,'https://www.drugs.com','2024-02-05 14:25:13','2024-02-05 14:25:13'),(4,'new drug arrival 8',NULL,'https://www.drugs.com','2024-02-05 14:25:16','2024-02-05 14:25:16'),(5,'with image',NULL,'www.newdrug.com','2024-02-05 14:30:18','2024-02-05 14:30:18');
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
  CONSTRAINT `help_desk_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`),
  CONSTRAINT `help_desk_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help_desk`
--

LOCK TABLES `help_desk` WRITE;
/*!40000 ALTER TABLE `help_desk` DISABLE KEYS */;
INSERT INTO `help_desk` VALUES (1,12,NULL,'hello admin! I need help','2024-02-09 17:40:43','2024-02-09 17:40:43'),(2,12,NULL,'hello admin! are u there','2024-02-09 17:41:32','2024-02-09 17:41:32'),(3,52,NULL,'hello admin! I am rumon khan','2024-02-10 14:29:01','2024-02-10 14:29:01'),(4,52,NULL,'hello admin! are you there admins!','2024-02-10 14:29:32','2024-02-10 14:29:32'),(7,12,7,'yes, i am there hou can i help u','2024-02-11 12:35:53','2024-02-11 12:35:53');
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
  `flag` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'English','en','us','/upload/image.jpg'),(2,'bangla','bn','bd','/upload');
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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'user','asdfas.jpg','public/upload/baby/path/image','image','image/jpg','2023-12-01 03:28:36','2023-12-01 12:28:36'),(2,'jinia','file-jinia-1704258616845.jpg','public\\uploads\\baby\\file-jinia-1704258616845.jpg','jpg','image/jpeg','2024-01-03 05:10:16','2024-01-03 05:10:16'),(3,'jinia','file-jinia-1704258886978.jpg','public\\uploads\\baby\\file-jinia-1704258886978.jpg','jpg','image/jpeg','2024-01-03 05:14:46','2024-01-03 05:14:46'),(4,'jinia','file-jinia-1704259079187.jpg','public\\uploads\\baby\\file-jinia-1704259079187.jpg','jpg','image/jpeg','2024-01-03 05:17:59','2024-01-03 05:17:59'),(14,'jinia','baby_Image_file-jinia-1704263824189.jpg','public\\uploads\\baby\\baby_Image_file-jinia-1704263824189.jpg','jpg','image/jpeg','2024-01-03 06:37:04','2024-01-03 06:37:04'),(15,'shapla','baby_Image_file-shapla-1704273230102.jpg','public\\uploads\\baby\\baby_Image_file-shapla-1704273230102.jpg','jpg','image/jpeg','2024-01-03 09:13:50','2024-01-03 09:13:50'),(32,'shapla','post_images-shapla-1707039363703.jpg','public/uploads/post/post_images-shapla-1707039363703.jpg','jpg','image/jpeg','2024-02-04 09:36:03','2024-02-04 09:36:03'),(33,'shapla','post_images-shapla-1707039363709.jpg','public/uploads/post/post_images-shapla-1707039363709.jpg','jpg','image/jpeg','2024-02-04 09:36:03','2024-02-04 09:36:03'),(34,'shapla','post_images-shapla-1707039363719.jpg','public/uploads/post/post_images-shapla-1707039363719.jpg','jpg','image/jpeg','2024-02-04 09:36:03','2024-02-04 09:36:03'),(35,'shapla','post_images-shapla-1707040910479.jpg','public/uploads/post/post_images-shapla-1707040910479.jpg','jpg','image/jpeg','2024-02-04 10:01:50','2024-02-04 10:01:50'),(36,'shapla','post_images-shapla-1707040910484.jpg','public/uploads/post/post_images-shapla-1707040910484.jpg','jpg','image/jpeg','2024-02-04 10:01:50','2024-02-04 10:01:50'),(37,'shapla','post_images-shapla-1707040910489.jpg','public/uploads/post/post_images-shapla-1707040910489.jpg','jpg','image/jpeg','2024-02-04 10:01:50','2024-02-04 10:01:50'),(38,'shapla','post_images-shapla-1707041157338.jpg','public/uploads/post/post_images-shapla-1707041157338.jpg','jpg','image/jpeg','2024-02-04 10:05:57','2024-02-04 10:05:57'),(39,'shapla','post_images-shapla-1707041157344.jpg','public/uploads/post/post_images-shapla-1707041157344.jpg','jpg','image/jpeg','2024-02-04 10:05:57','2024-02-04 10:05:57'),(40,'shapla','post_images-shapla-1707041157347.jpg','public/uploads/post/post_images-shapla-1707041157347.jpg','jpg','image/jpeg','2024-02-04 10:05:57','2024-02-04 10:05:57'),(41,'shapla','post_images-shapla-1707041157351.jpg','public/uploads/post/post_images-shapla-1707041157351.jpg','jpg','image/jpeg','2024-02-04 10:05:57','2024-02-04 10:05:57'),(42,'shapla','post_images-shapla-1707041232564.jpg','public/uploads/post/post_images-shapla-1707041232564.jpg','jpg','image/jpeg','2024-02-04 10:07:12','2024-02-04 10:07:12'),(43,'shapla','post_images-shapla-1707041232576.jpg','public/uploads/post/post_images-shapla-1707041232576.jpg','jpg','image/jpeg','2024-02-04 10:07:12','2024-02-04 10:07:12'),(44,'shapla','post_images-shapla-1707041232581.jpg','public/uploads/post/post_images-shapla-1707041232581.jpg','jpg','image/jpeg','2024-02-04 10:07:12','2024-02-04 10:07:12'),(45,'shapla','post_images-shapla-1707041232587.jpg','public/uploads/post/post_images-shapla-1707041232587.jpg','jpg','image/jpeg','2024-02-04 10:07:12','2024-02-04 10:07:12'),(46,'shapla','post_images-shapla-1707043721441.jpg','public/uploads/post/post_images-shapla-1707043721441.jpg','jpg','image/jpeg','2024-02-04 10:48:41','2024-02-04 10:48:41'),(47,'shapla','post_images-shapla-1707043721448.jpg','public/uploads/post/post_images-shapla-1707043721448.jpg','jpg','image/jpeg','2024-02-04 10:48:41','2024-02-04 10:48:41'),(48,'rumon0','post_images-rumon0-1707311010381.jpg','public/uploads/post/post_images-rumon0-1707311010381.jpg','jpg','image/jpeg','2024-02-07 13:03:30','2024-02-07 13:03:30'),(49,'rumon0','post_images-rumon0-1707311029552.jpg','public/uploads/post/post_images-rumon0-1707311029552.jpg','jpg','image/jpeg','2024-02-07 13:03:49','2024-02-07 13:03:49'),(50,'rumon0','post_images-rumon0-1707311029564.jpg','public/uploads/post/post_images-rumon0-1707311029564.jpg','jpg','image/jpeg','2024-02-07 13:03:49','2024-02-07 13:03:49'),(51,'rumon0','post_images-rumon0-1707311132468.jpg','public/uploads/post/post_images-rumon0-1707311132468.jpg','jpg','image/jpeg','2024-02-07 13:05:32','2024-02-07 13:05:32'),(52,'rumon0','post_images-rumon0-1707311132488.jpg','public/uploads/post/post_images-rumon0-1707311132488.jpg','jpg','image/jpeg','2024-02-07 13:05:32','2024-02-07 13:05:32'),(53,'rumon0','post_images-rumon0-1707311232121.jpg','public/uploads/post/post_images-rumon0-1707311232121.jpg','jpg','image/jpeg','2024-02-07 13:07:12','2024-02-07 13:07:12'),(54,'rumon0','post_images-rumon0-1707311232127.jpg','public/uploads/post/post_images-rumon0-1707311232127.jpg','jpg','image/jpeg','2024-02-07 13:07:12','2024-02-07 13:07:12'),(55,'rumon0','post_images-rumon0-1707311524163.jpg','public/uploads/post/post_images-rumon0-1707311524163.jpg','jpg','image/jpeg','2024-02-07 13:12:04','2024-02-07 13:12:04'),(56,'rumon0','post_images-rumon0-1707311524170.jpg','public/uploads/post/post_images-rumon0-1707311524170.jpg','jpg','image/jpeg','2024-02-07 13:12:04','2024-02-07 13:12:04'),(57,'rumon0','post_images-rumon0-1707311755073.jpg','public/uploads/post/post_images-rumon0-1707311755073.jpg','jpg','image/jpeg','2024-02-07 13:15:55','2024-02-07 13:15:55'),(58,'rumon0','post_images-rumon0-1707311755078.jpg','public/uploads/post/post_images-rumon0-1707311755078.jpg','jpg','image/jpeg','2024-02-07 13:15:55','2024-02-07 13:15:55'),(64,'rumonkh','admin_image_field-rumonkh-1707406231775.jpg','public/uploads/admin/admin_image_field-rumonkh-1707406231775.jpg','jpg','image/jpeg','2024-02-08 15:30:31','2024-02-08 15:30:31');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
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
INSERT INTO `mother_mood_trackers` VALUES (1,39,'2023-12-21 08:00:00','angry','2023-12-25 11:14:10','2023-12-25 11:15:00'),(2,39,'2023-12-21 08:00:00','sad','2023-12-25 11:15:06','2023-12-25 11:15:06'),(3,39,'2023-12-21 08:00:00','Happy','2023-12-25 11:15:09','2023-12-25 11:15:09'),(4,39,'2023-12-21 08:00:00','anoxious','2023-12-25 11:15:18','2023-12-25 11:15:18'),(5,39,'2023-12-21 08:00:00','vallage na','2023-12-25 11:15:23','2023-12-25 11:15:23'),(6,39,'2023-12-21 08:00:00','vallage','2023-12-25 11:15:27','2023-12-25 11:15:27'),(7,39,'2023-12-21 08:00:00','chill','2023-12-25 11:15:30','2023-12-25 11:15:30'),(8,39,'2023-12-21 08:00:00','urtechi','2023-12-25 11:15:35','2023-12-25 11:15:35'),(9,12,'2023-12-21 08:00:00','urtechi','2023-12-25 11:20:00','2023-12-25 11:20:00'),(10,12,'2023-12-21 08:00:00','vallage','2024-01-07 11:44:45','2024-01-07 11:44:45'),(11,12,'2023-12-21 08:00:00','ura dhura','2024-01-07 11:44:58','2024-01-07 11:44:58'),(12,12,'2023-12-21 08:00:00','lalala','2024-01-07 12:10:58','2024-01-07 12:10:58'),(13,12,'2023-12-21 08:00:00','vallage','2024-01-07 12:16:02','2024-01-07 12:16:02'),(14,12,'2023-12-21 08:00:00','vallage','2024-01-07 12:16:16','2024-01-07 12:16:16'),(15,12,'2024-01-21 08:00:00','vallage','2024-01-07 12:24:01','2024-01-07 12:24:01');
/*!40000 ALTER TABLE `mother_mood_trackers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mother_progress_timeline`
--

DROP TABLE IF EXISTS `mother_progress_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mother_progress_timeline` (
  `id` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
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
INSERT INTO `mother_progress_timeline` VALUES (1,1,'baby develop','baby developing long lext\r\n','',NULL,NULL),(2,2,'baby more develop','baby more develop description','',NULL,NULL);
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
INSERT INTO `notes` VALUES (1,39,'first note','All text goes here.. bye bye long text','2023-12-31 23:59:59',1,'2023-12-25 11:01:47','2023-12-25 11:01:47'),(3,39,'first note','All text goes here.. bye bye long text','2023-12-31 23:59:59',1,'2023-12-25 11:08:07','2023-12-25 11:08:07'),(4,39,'first note','All text goes here.. bye bye long text','2023-12-31 23:59:59',1,'2023-12-25 11:08:08','2023-12-25 11:08:08'),(5,51,'first note','All text goes here.. bye bye long text','2023-12-31 23:59:59',1,'2024-02-05 09:44:04','2024-02-05 09:44:04'),(6,51,'second note','All text goes here.. bye bye long text','2023-12-31 23:59:59',1,'2024-02-05 09:46:29','2024-02-05 09:46:29');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
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
  KEY `media_id` (`media_id`),
  CONSTRAINT `postmedia_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `postmedia_ibfk_2` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postmedia`
--

LOCK TABLES `postmedia` WRITE;
/*!40000 ALTER TABLE `postmedia` DISABLE KEYS */;
INSERT INTO `postmedia` VALUES (21,32),(21,33),(21,34),(23,38),(23,39),(23,40),(23,41),(24,42),(24,43),(24,44),(24,45),(25,46),(25,47),(36,48),(37,49),(37,50),(38,51),(38,52),(39,53),(39,54),(40,55),(40,56),(44,57),(44,58);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postnatal_visit`
--

LOCK TABLES `postnatal_visit` WRITE;
/*!40000 ALTER TABLE `postnatal_visit` DISABLE KEYS */;
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
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,12,'hello i am first title','this is a large content','2023-12-13 17:58:37','2023-12-13 17:58:37'),(3,12,'hello i am another title','this is a large content','2023-12-13 17:59:04','2023-12-13 17:59:04'),(4,12,'hello i am last title','this is a large content','2023-12-13 17:59:09','2023-12-13 17:59:09'),(5,12,'hello i am last title','this is a large content','2024-02-03 17:42:42','2024-02-03 17:42:42'),(6,12,'New develop ment for adding multiple images','this is a large content','2024-02-03 17:43:26','2024-02-03 17:43:26'),(12,12,'new title','large content','2024-02-04 09:20:28','2024-02-04 09:20:28'),(13,12,'new title','large content','2024-02-04 09:20:41','2024-02-04 09:20:41'),(14,12,'new title','large content','2024-02-04 09:23:10','2024-02-04 09:23:10'),(15,12,'new title','large content','2024-02-04 09:23:47','2024-02-04 09:23:47'),(16,12,'new title','large content','2024-02-04 09:28:08','2024-02-04 09:28:08'),(17,12,'new title','large content','2024-02-04 09:28:55','2024-02-04 09:28:55'),(18,12,'new title','large content','2024-02-04 09:29:27','2024-02-04 09:29:27'),(19,12,'new title','large content','2024-02-04 09:31:22','2024-02-04 09:31:22'),(20,12,'new title','large content','2024-02-04 09:33:57','2024-02-04 09:33:57'),(21,12,'new title','large content','2024-02-04 09:36:03','2024-02-04 09:36:03'),(23,12,'new title','large content','2024-02-04 10:05:57','2024-02-04 10:05:57'),(24,12,'creation finished 1','all about my post in the field','2024-02-04 10:07:12','2024-02-04 10:07:12'),(33,52,'photo diye','2 ta photo ache','2024-02-07 12:43:06','2024-02-07 12:43:06'),(34,52,'photo diye','2 ta photo ache','2024-02-07 12:43:36','2024-02-07 12:43:36'),(35,52,'photo diye','2 ta photo ache','2024-02-07 13:03:08','2024-02-07 13:03:08'),(36,52,'photo diye','2 ta photo ache','2024-02-07 13:03:30','2024-02-07 13:03:30'),(37,52,'photo diye','2 ta photo ache','2024-02-07 13:03:49','2024-02-07 13:03:49'),(38,52,'photo diye','2 ta photo ache','2024-02-07 13:05:32','2024-02-07 13:05:32'),(39,52,'photo diye','2 ta photo ache','2024-02-07 13:07:12','2024-02-07 13:07:12'),(40,52,'photo diye','2 ta photo ache','2024-02-07 13:12:04','2024-02-07 13:12:04'),(41,52,'photo diye','2 ta photo ache','2024-02-07 13:12:18','2024-02-07 13:12:18'),(42,52,'photo diye','2 ta photo ache','2024-02-07 13:12:46','2024-02-07 13:12:46'),(43,52,'photo diye','2 ta photo ache','2024-02-07 13:14:08','2024-02-07 13:14:08'),(44,52,'photo diye','2 ta photo ache','2024-02-07 13:15:55','2024-02-07 13:15:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (1,1,12,3,NULL,'2023-12-14 14:41:52','2023-12-14 14:41:52'),(2,1,12,4,NULL,'2023-12-14 14:43:16','2023-12-14 14:43:16'),(4,3,12,1,NULL,'2023-12-14 15:03:26','2023-12-14 15:05:21'),(5,2,12,NULL,1,'2023-12-14 15:24:51','2023-12-14 15:24:59'),(6,3,13,1,NULL,'2023-12-14 15:03:26','2023-12-14 15:05:21');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'superadmin',NULL,'2024-02-07 20:48:32','2024-02-07 20:48:32'),(2,'admin',NULL,'2024-02-07 20:48:32','2024-02-07 20:48:32'),(3,'moderator',NULL,'2024-02-07 20:48:56','2024-02-07 20:48:56'),(4,'editor',NULL,'2024-02-07 20:48:56','2024-02-07 20:48:56'),(5,'help_desk','replies and manipulate help desk messages','2024-02-10 15:07:24','2024-02-10 15:07:24'),(6,'user','manipulate users information','2024-02-11 13:22:23','2024-02-11 13:22:23'),(7,'blog','manipulate blogs','2024-02-11 13:23:20','2024-02-11 13:23:20'),(8,'baby_care','all baby care routes','2024-02-11 14:05:09','2024-02-11 14:05:09'),(9,'baby_temp','baby temp functionality','2024-02-11 14:05:09','2024-02-11 14:05:09'),(10,'baby_vaccine',NULL,'2024-02-11 15:24:54','2024-02-11 15:24:54');
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
  KEY `user_id` (`user_id`),
  CONSTRAINT `tool_mother_baby_kick_counters_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
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
  `photo` varchar(255) DEFAULT NULL,
  `social_photo` varchar(255) DEFAULT NULL,
  `child_number` int(11) DEFAULT NULL,
  `edd_date` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `pregnency_loss` int(11) DEFAULT NULL,
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `social_id` (`social_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'newUser','Sam','Johnson',28,1,'user_photo.jpg',NULL,2,'2023-12-15 00:00:00','newuser@email.com','$2b$10$wKOyz0WONapbY61aUAVfaOMgvDAj54/HxE0YElJBPv8FCH10s09YS','English',NULL,NULL,1,'email','general_user','free','88829178b29618b9947da913fde23b950bec8cef33caa86a1e641390db055ab6',NULL,NULL,'0','0','2023-01-01 00:00:00','2023-11-26 10:05:05','2023-11-26 13:27:06'),(4,NULL,'mahbub','mela','reza',28,1,'user_photo.jpg',NULL,2,'2023-12-15 00:00:00','newuser@email.com1','newPassword','English',NULL,NULL,1,'email','general_user','free','resetToken123',NULL,NULL,'0','0','2023-01-01 00:00:00','2023-11-26 10:10:11','2023-11-26 10:10:11'),(6,NULL,'hasan','hasu','reza',28,1,'user_photo.jpg',NULL,2,'2023-12-15 00:00:00','newuser@1email.com','$2b$10$g2mg/6jNBgvQQ96abgCK7OY5Q1PlETEDs..p9.hyrbSORi4PmeqEe','English',NULL,NULL,1,'email','general_user','free','$2b$10$anuZk7v.Rbx5CGyV33hMAe1iQzwZG4Nm1mWtOpoWt0pYNrdQUTMje','Tue Nov 28 2023 18:27:38 GMT+0600 (Bangladesh Standard Time)600000',NULL,'0','0','2023-01-01 00:00:00','2023-11-26 10:11:07','2023-11-28 12:29:50'),(7,NULL,'kamal','kalu','reza',28,1,'user_photo.jpg',NULL,2,'2023-12-15 00:00:00','new1user@email.com','$2b$10$M5LSsfNStlqUq/XHRL5qS.FsRwSZ3Tsgze.569oFqgum5Q2kTbq3S','English',NULL,NULL,1,'email','general_user','free','2f1cbc7873708f75f944e1c39831f55cd37e0d5d4d58f900b63c66c6cfd3b286','Sun Nov 26 2023 23:02:41 GMT+0600 (Bangladesh Standard Time)600000',NULL,'0','0','2023-01-01 00:00:00','2023-11-26 10:28:12','2023-11-26 17:03:22'),(9,NULL,'mala','kalu','reza',28,1,'user_photo.jpg',NULL,2,'2023-12-15 00:00:00','newuser@email.co1m','000','English',NULL,NULL,1,'email','general_user','free','resetToken123',NULL,NULL,'0','0','2023-01-01 00:00:00','2023-11-26 10:30:39','2023-11-26 10:30:39'),(10,NULL,'dala','kalu','reza',28,1,'user_photo.jpg',NULL,2,'2023-12-15 00:00:00','ne1wuser@email.com','000','English',NULL,NULL,1,'email','general_user','free','resetToken123',NULL,NULL,'0','0','2023-01-01 00:00:00','2023-11-26 10:33:34','2023-11-26 10:33:34'),(11,NULL,'jala','kalu','reza',28,1,'user_photo.jpg',NULL,2,'2023-12-15 00:00:00','n1ewuser@email.com','000','English',NULL,NULL,1,'email','general_user','free','resetToken123',NULL,NULL,'0','0','2023-01-01 00:00:00','2023-11-26 10:38:54','2023-11-26 10:38:54'),(12,NULL,'shapla','shapla','jahan',21,1,'user_photo.jpg',NULL,1,'2023-12-15 00:00:00','shapla@email.com','$2b$10$a.2MqcV5L1XlcROdV2dpDOvzO9in9wMCZX2rEWiAPHP9759PgWQx.','Bangla',NULL,NULL,1,'email','general_user','free','8d216e62a0af344ecb1efb8a6a43f1101da31e2d5c78a012f94e2a0e0dbf62b3',NULL,NULL,'1','0','2023-01-01 00:00:00','2023-11-26 10:41:15','2023-11-28 17:34:13'),(13,NULL,'maria','maria','haque',28,1,'user_photo.jpg',NULL,2,'2023-12-15 00:00:00','new2user@email.com','$2b$10$IXE4yE.8rdVTKsd9WjgMt.mQS6XKm2LDqwl6qCfW8xwKIKYTAVkvm','English',NULL,NULL,1,'email','general_user','free','resetToken123',NULL,NULL,'0','0','2023-01-01 00:00:00','2023-11-26 14:11:28','2023-11-26 14:11:28'),(14,NULL,'golu','kalu','reza',28,1,NULL,NULL,2,'2023-12-15 00:00:00','newus2er@email.com','$2b$10$otm.uhl0i4Nm1F4OrxlY7uOF2u4ZDG566JRiYHLHV.gp1aKSznvFm','English',NULL,NULL,1,'email','general_user','free','resetToken123',NULL,'337bf1c5d6636747cceb47dd1293ac0959f6e7bcddc93f1855b49ce334fe15df','0','0','2023-01-01 00:00:00','2023-11-26 16:51:42','2023-11-26 16:51:42'),(15,NULL,'takla','kalu','reza',28,1,NULL,NULL,2,'2023-12-15 00:00:00','newuser@email.com2','$2b$10$cEaRkVxh1VcybTnI9bJAuullxB7ziH3kqLNao.N63hrtQWxM1/Yvi','English',NULL,NULL,1,'email','general_user','free','resetToken123',NULL,'ac5f9f66b8659a180615b5935622497d8f8b8f890e04ccc749ec0e26aca5e762','0','0','2023-01-01 00:00:00','2023-11-26 17:21:47','2023-11-26 17:21:47'),(20,NULL,'arman','arman','akt',NULL,NULL,NULL,NULL,NULL,NULL,'ne2wuser@email.com','$2b$10$SUks2UpGEX5X9n3543kKqeA4MjyDQlID94A2nW4VSLDkOxqBw0rqa',NULL,NULL,NULL,0,'','general_user','Free','$2b$10$HM7sJOwaW3H22wUh8158I.SpWrdGyxUwLXbnOmplr2aNQ4BNvQ.EK','Tue Nov 28 2023 23:22:28 GMT+0600 (Bangladesh Standard Time)600000',NULL,'1','0','0000-00-00 00:00:00','2023-11-28 17:22:27','2023-11-28 17:28:56'),(21,NULL,'nasim','nasim','akt',NULL,NULL,NULL,NULL,NULL,NULL,'newu3ser@email.com','$2b$10$SiCSJNyNkDHhLCrHbkNSnOYj3XtT9rKP.sxHRVRI6k5hYSH5XBq8O',NULL,NULL,NULL,0,'','general_user','Free','$2b$10$rQD/hYiRAz..BR/7zMUHnOB8Ga/Dq36Z8Zj1pGw8rPtBLMnZXQwJy','Tue Nov 28 2023 23:31:22 GMT+0600 (Bangladesh Standard Time)600000',NULL,'1','0','0000-00-00 00:00:00','2023-11-28 17:31:22','2023-11-28 17:32:04'),(30,'114657009973842993825','114657009973842993825','MD ARMAN','KHAN',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocJxjv44djn0ndB5-VJnKNwD8YQS8qhqQfi_A3SB9qXgXw=s96-c',NULL,NULL,'arman.khan.dev@gmail.com',NULL,NULL,NULL,NULL,0,'google','general_user','Free',NULL,NULL,NULL,'0','0','0000-00-00 00:00:00','2023-12-04 18:29:49','2023-12-04 18:29:49'),(31,'114579153302679689136','114579153302679689136','Md Rumman','Khan',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocIaZuf9JaL4l-y0WBvm_9Yc5MW_s2RzumOb1ZmqjT9-bQ=s96-c',NULL,NULL,'rummankh0@gmail.com',NULL,NULL,NULL,NULL,0,'google','general_user','Free',NULL,NULL,NULL,'0','0','0000-00-00 00:00:00','2023-12-04 18:35:49','2023-12-04 18:35:49'),(35,NULL,'nasuim','nasim','akt',NULL,NULL,NULL,NULL,NULL,NULL,'NASI@email.com','$2b$10$xgNG5Xusu6dH7.QeGCPucOUUw/X.g2N6gYYiIGG1IdlTsOBKmZS9C',NULL,NULL,NULL,0,'email','user','Free','$2b$10$.O.URlmVsuu9syKB3OjukOI2gE0wNK2VsI5EoZmbg0MdIt9FWEZ8a','Mon Dec 25 2023 13:49:30 GMT+0600 (Bangladesh Standard Time)600000',NULL,'0','0','0000-00-00 00:00:00','2023-12-25 07:49:30','2023-12-25 07:49:30'),(39,NULL,'nasussdfsdim','nasim','akt',NULL,NULL,NULL,NULL,NULL,NULL,'NASIs@email.com','$2b$10$JGE0IRsVZp/NVn0FBq4x/OLH3nzcBffUsTz2e6ODGkA5VWrHMVCny',NULL,NULL,NULL,0,'email','user','Free','$2b$10$uOYCYoQLTPhpMdx6BfqqGOz255I1ItT3PXgjyrYvt2Mf4Qd/j4p2W','Mon Dec 25 2023 16:23:02 GMT+0600 (Bangladesh Standard Time)600000',NULL,'0','0','0000-00-00 00:00:00','2023-12-25 10:23:02','2023-12-25 10:23:02'),(40,NULL,'jinia','jinia','banu',NULL,NULL,NULL,NULL,NULL,NULL,'jinia@email.com','$2b$10$9haLO05ClYHrtZa9BKGYoOb.DHncgsDqdCug1RSzgTkXUtL5EBq/m',NULL,NULL,NULL,0,'email','user','Free','$2b$10$RZRVxwooajNtkU6uE2uJ7OlpnD9dWhxlGapyAQsz6EbUHb1yET5QO','Wed Jan 03 2024 10:45:16 GMT+0600 (Bangladesh Standard Time)600000',NULL,'0','0','0000-00-00 00:00:00','2024-01-03 04:45:15','2024-01-03 04:45:16'),(51,NULL,'users','naka','reza',NULL,NULL,NULL,NULL,NULL,NULL,'new@email.com','$2b$10$uDl.6PloPUX96io4FM/YN.x65RmptfWQFnVy1tYXmoAYdDEuJRVam',NULL,NULL,NULL,0,'email','general_user','Free','$2b$10$5rzy8RSd46pm0iZ9B4YZ1uEso7E1A/0mppNhUFZm.Vf6H2l5fUjMS','Sun Feb 04 2024 21:43:21 GMT+0600 (Bangladesh Standard Time)600000',NULL,'0','0',NULL,'2024-02-04 15:36:25','2024-02-04 15:43:21'),(52,NULL,'rumon0','rumon','khan',NULL,NULL,NULL,NULL,NULL,NULL,'213002053@student.green.edu.bd','$2b$10$5K5sg6Q51dsaxzg0ClOAbONeFfbzR4Bk716L06WVaMX.FLDovne2O',NULL,NULL,NULL,0,'email','general_user','Free','$2b$10$VY81X9ZYNGH2ICMmOloMq.lZE6m.jqj9ucr3qBSCc.cXbGcQIzD/m','Wed Feb 07 2024 14:55:46 GMT+0600 (Bangladesh Standard Time)600000',NULL,'1','0',NULL,'2024-02-06 15:30:26','2024-02-07 08:55:46');
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
  `file_id` int(11) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `media` (`file_id`),
  CONSTRAINT `video_ibfk_1` FOREIGN KEY (`file_id`) REFERENCES `media` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'prenatal vitamins',NULL,'','05:30',14,'2024-01-09 16:52:38','0000-00-00 00:00:00'),(2,'exercise during pregnancy',NULL,'','10:55',16,'2024-01-09 16:52:38','0000-00-00 00:00:00');
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
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warning_signs`
--

LOCK TABLES `warning_signs` WRITE;
/*!40000 ALTER TABLE `warning_signs` DISABLE KEYS */;
INSERT INTO `warning_signs` VALUES (1,NULL,'unusual symptom','bla bla','2024-01-09 19:28:51',NULL),(2,NULL,'severe headache','bla bla','2024-01-09 19:28:51',NULL);
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
  KEY `FK_1` (`user_id`),
  CONSTRAINT `FK_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
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

-- Dump completed on 2024-02-11 23:01:28
