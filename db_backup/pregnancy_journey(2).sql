-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2023 at 08:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pregnancy_journey`
--

-- --------------------------------------------------------

--
-- Table structure for table `baby_breast_pumping`
--

CREATE TABLE `baby_breast_pumping` (
  `id` int(11) NOT NULL,
  `baby_id` int(10) UNSIGNED DEFAULT NULL,
  `right_milk_amount` int(11) DEFAULT NULL,
  `left_milk_amount` int(11) DEFAULT NULL,
  `total_milk` int(11) DEFAULT NULL,
  `left_duration` varchar(255) DEFAULT NULL,
  `right_duration` varchar(255) DEFAULT NULL,
  `total_duration` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `baby_breast_pumping`
--

INSERT INTO `baby_breast_pumping` (`id`, `baby_id`, `right_milk_amount`, `left_milk_amount`, `total_milk`, `left_duration`, `right_duration`, `total_duration`, `createdAt`, `updatedAt`) VALUES
(26, 24, 48, 58, 106, '5 minutes', '7 minutes', '12 minutes', '2023-11-28 19:58:40', '2023-11-28 19:58:40'),
(27, 24, 38, 52, 90, '4 minutes', '6 minutes', '10 minutes', '2023-11-28 19:58:40', '2023-11-28 19:58:40'),
(28, 24, 42, 48, 90, '4 minutes', '5 minutes', '9 minutes', '2023-11-28 19:58:40', '2023-11-28 19:58:40'),
(29, 24, 52, 62, 114, '6 minutes', '8 minutes', '14 minutes', '2023-11-28 19:58:40', '2023-11-28 19:58:40'),
(30, 24, 58, 68, 126, '7 minutes', '9 minutes', '16 minutes', '2023-11-28 19:58:40', '2023-11-28 19:58:40'),
(32, 23, 58, 68, 126, '7 minutes', '9 minutes', '16 minutes', '2023-11-28 08:00:00', '2023-11-28 17:03:24'),
(33, 23, 58, 68, 2147483647, '7 minutes', '9 minutes', '16 minutes', '2023-11-28 08:00:00', '2023-11-28 17:03:36'),
(34, 24, 58, 68, 2147483647, '7 minutes', '9 minutes', '16 minutes', '2023-11-28 08:00:00', '2023-11-28 17:03:42');

-- --------------------------------------------------------

--
-- Table structure for table `baby_diaper`
--

CREATE TABLE `baby_diaper` (
  `id` int(11) NOT NULL,
  `baby_id` int(10) UNSIGNED NOT NULL,
  `status` enum('clean','poo','pee','mixed') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `number` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `baby_diaper`
--

INSERT INTO `baby_diaper` (`id`, `baby_id`, `status`, `createdAt`, `updatedAt`, `number`) VALUES
(4, 24, 'mixed', '2023-11-28 18:53:46', '2023-11-28 18:53:46', 1),
(8, 24, 'mixed', '2023-11-28 18:53:46', '2023-11-28 18:53:46', 2),
(10, 24, 'poo', '2023-11-28 18:53:46', '2023-11-28 18:53:46', 3),
(12, 23, 'pee', '2023-11-28 16:58:54', '2023-11-28 16:58:54', 1),
(13, 24, 'pee', '2023-11-28 17:09:25', '2023-11-28 17:09:25', 1),
(14, 24, 'pee', '2023-11-28 17:09:43', '2023-11-28 17:09:43', 2147483647),
(15, 24, 'pee', '2023-11-28 17:10:31', '2023-11-28 17:10:31', 2147483647),
(16, 27, 'pee', '2023-11-29 11:46:40', '2023-11-29 11:46:40', 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `baby_feed`
--

CREATE TABLE `baby_feed` (
  `id` int(11) NOT NULL,
  `baby_id` int(10) UNSIGNED NOT NULL,
  `feed_type` enum('breast','bottle','solid') NOT NULL,
  `let_duration` varchar(255) DEFAULT NULL,
  `right_duration` varchar(255) DEFAULT NULL,
  `total_duration` varchar(255) DEFAULT NULL,
  `bottle_amount` double DEFAULT NULL,
  `solid_name` varchar(255) DEFAULT NULL,
  `solid_amount` double DEFAULT NULL COMMENT 'gram',
  `feed_time` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='ml';

--
-- Dumping data for table `baby_feed`
--

INSERT INTO `baby_feed` (`id`, `baby_id`, `feed_type`, `let_duration`, `right_duration`, `total_duration`, `bottle_amount`, `solid_name`, `solid_amount`, `feed_time`, `createdAt`, `updatedAt`) VALUES
(24, 24, 'solid', NULL, NULL, NULL, NULL, 'rice cereal', 50, '2023-11-28 16:43:40', '2023-11-28 16:43:40', '2023-11-28 16:43:40'),
(27, 24, 'breast', '6 minutes', NULL, NULL, NULL, NULL, NULL, '2023-11-28 16:43:40', '2023-11-28 16:43:40', '2023-11-28 16:43:40'),
(28, 24, 'solid', NULL, NULL, NULL, NULL, 'mashed banana', 60, '2023-11-28 16:43:40', '2023-11-28 16:43:40', '2023-11-28 16:43:40'),
(29, 25, 'breast', '10 minutes', NULL, NULL, NULL, NULL, NULL, '2023-11-28 16:43:40', '2023-11-28 16:43:40', '2023-11-28 16:43:40'),
(30, 25, 'bottle', NULL, NULL, NULL, 80, NULL, NULL, '2023-11-28 16:43:40', '2023-11-28 16:43:40', '2023-11-28 16:43:40'),
(32, 23, 'breast', '100 minutes', NULL, NULL, 100, NULL, NULL, '2023-11-28 08:00:00', '2023-11-28 08:00:00', '2023-11-28 16:57:45'),
(33, 23, 'breast', '100 minutes', NULL, NULL, 100, NULL, NULL, '2023-11-28 08:00:00', '2023-11-28 08:00:00', '2023-11-28 16:58:04'),
(34, 23, 'breast', '100 minutes', NULL, NULL, 100, NULL, NULL, '2023-11-28 08:00:00', '2023-11-28 16:59:17', '2023-11-28 16:59:17'),
(35, 23, 'breast', '10000000000000000000000000000 minutes', NULL, NULL, 100, NULL, NULL, '2023-11-28 08:00:00', '2023-11-28 17:02:13', '2023-11-28 17:02:13'),
(36, 24, 'breast', '10000000000000000000000000000 minutes', NULL, NULL, 100, NULL, NULL, '2023-11-28 08:00:00', '2023-11-28 17:02:36', '2023-11-28 17:02:36'),
(37, 24, 'breast', '10000000000000000000000000000 minutes', NULL, NULL, 100, NULL, NULL, '2023-11-28 08:00:00', '2023-11-28 17:03:49', '2023-11-28 17:03:49'),
(38, 24, 'breast', '10000000000000000000000000000 minutes', NULL, NULL, 100, NULL, NULL, '2023-11-28 08:00:00', '2023-11-29 11:46:02', '2023-11-29 11:46:02'),
(39, 27, 'breast', '10000000000000000000000000000 minutes', NULL, NULL, 100, NULL, NULL, '2023-11-28 08:00:00', '2023-11-29 11:47:08', '2023-11-29 11:47:08');

-- --------------------------------------------------------

--
-- Table structure for table `baby_gallery`
--

CREATE TABLE `baby_gallery` (
  `id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  `baby_id` int(10) UNSIGNED DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_title` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `baby_gallery`
--

INSERT INTO `baby_gallery` (`id`, `file_id`, `baby_id`, `image`, `image_title`, `updatedAt`, `createdAt`) VALUES
(1, 5, 27, 'public\\uploads\\baby\\file-1701281545638.jpg', '{ \"bn\": \"amara\", \"en\": \"hello\"}', '2023-11-29 18:12:25', '2023-11-29 18:12:25'),
(2, 1, 27, 'public\\uploads\\baby\\file-1701281616470.jpg', 'first photo', '2023-11-29 18:13:36', '2023-11-29 18:13:36'),
(3, 5, 27, 'public\\uploads\\baby\\file-1701281617905.jpg', 'first photo', '2023-11-29 18:13:37', '2023-11-29 18:13:37'),
(4, 1, 27, 'public\\uploads\\baby\\file-1701281619081.jpg', 'first photo', '2023-11-29 18:13:39', '2023-11-29 18:13:39'),
(5, 5, 27, 'public\\uploads\\baby\\file-1701428051879.png', 'first photo', '2023-12-01 10:54:11', '2023-12-01 10:54:11'),
(6, 0, 27, 'public\\uploads\\baby\\file-1701715188194.png', 'first photo', '2023-12-04 18:39:48', '2023-12-04 18:39:48');

-- --------------------------------------------------------

--
-- Table structure for table `baby_list`
--

CREATE TABLE `baby_list` (
  `id` int(10) UNSIGNED NOT NULL,
  `mother_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `baby_serial` int(11) DEFAULT NULL,
  `gender` varchar(45) NOT NULL COMMENT 'male=1 female=2',
  `birth_date` datetime DEFAULT NULL,
  `first_move` datetime DEFAULT NULL,
  `first_heartbeat` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `baby_list`
--

INSERT INTO `baby_list` (`id`, `mother_id`, `name`, `photo`, `baby_serial`, `gender`, `birth_date`, `first_move`, `first_heartbeat`, `createdAt`, `updatedAt`) VALUES
(21, 1, 'Baby1', 'baby1.jpg', 1, 'male', '2023-01-10 00:00:00', '2023-01-20 00:00:00', '2023-02-01 00:00:00', '2023-02-01 00:00:00', NULL),
(22, 1, 'Baby2', 'baby2.jpg', 2, 'female', '2023-03-15 00:00:00', '2023-03-25 00:00:00', '2023-04-05 00:00:00', '2023-02-01 00:00:00', NULL),
(23, 12, 'Baby3', 'baby3.jpg', 1, 'male', '2023-05-20 00:00:00', '2023-06-01 00:00:00', '2023-06-15 00:00:00', '2023-02-01 00:00:00', NULL),
(24, 12, 'Baby4', 'baby4.jpg', 2, 'female', '2023-07-25 00:00:00', '2023-08-05 00:00:00', '2023-08-20 00:00:00', '2023-02-01 00:00:00', NULL),
(25, 13, 'Baby5', 'baby5.jpg', 1, 'male', '2023-09-30 00:00:00', '2023-10-15 00:00:00', '2023-10-30 00:00:00', '2023-02-01 00:00:00', NULL),
(27, 12, 'arman baby', 'baby1.jpg', 1, 'male', '2023-01-10 00:00:00', '2023-01-20 00:00:00', '2023-02-01 00:00:00', '2023-11-29 11:44:06', '2023-11-29 11:44:06');

-- --------------------------------------------------------

--
-- Table structure for table `baby_medications`
--

CREATE TABLE `baby_medications` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dose` varchar(25) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `baby_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `baby_notes`
--

CREATE TABLE `baby_notes` (
  `id` int(11) NOT NULL,
  `baby_id` int(10) UNSIGNED NOT NULL,
  `note_title` varchar(255) DEFAULT NULL,
  `note_description` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `baby_progress_timeline`
--

CREATE TABLE `baby_progress_timeline` (
  `id` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `baby_sleep`
--

CREATE TABLE `baby_sleep` (
  `id` int(11) NOT NULL,
  `baby_id` int(10) UNSIGNED DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `total_duration` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `baby_sleep`
--

INSERT INTO `baby_sleep` (`id`, `baby_id`, `start_time`, `end_time`, `total_duration`, `createdAt`, `updatedAt`) VALUES
(7, 24, '2023-11-01 21:00:00', '2023-11-02 04:00:00', '7 hours', '2023-11-28 21:22:43', '2023-11-28 21:22:43'),
(8, 24, '2023-11-02 22:30:00', '2023-11-03 05:30:00', '7 hours', '2023-11-28 21:22:43', '2023-11-28 21:22:43'),
(9, 24, '2023-11-01 22:00:00', '2023-11-02 05:00:00', '7 hours', '2023-11-28 21:22:43', '2023-11-28 21:22:43'),
(10, 24, '2023-11-03 00:30:00', '2023-11-03 07:30:00', '7 hours', '2023-11-28 21:22:43', '2023-11-28 21:22:43'),
(14, 27, '2023-11-01T20:00:00Z', '2023-11-01T22:00:00Z', '2 hours', '2023-11-29 11:47:21', '2023-11-29 11:47:21'),
(15, 27, '2023-11-01T20:00:00Z', '2023-11-01T22:00:00Z', '2 hours', '2023-12-01 16:52:31', '2023-12-01 16:52:31'),
(16, 23, '2023-11-01T20:00:00Z', '2023-11-01T22:00:00Z', '2 hours', '2023-12-01 16:52:41', '2023-12-01 16:52:41'),
(17, 27, '2023-11-01', '2023-11-01', '2 hours', '2023-12-01 16:53:40', '2023-12-01 16:53:40');

-- --------------------------------------------------------

--
-- Table structure for table `baby_symptoms`
--

CREATE TABLE `baby_symptoms` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `baby_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `baby_symptoms`
--

INSERT INTO `baby_symptoms` (`id`, `status`, `createdAt`, `updatedAt`, `baby_id`) VALUES
(14, 'rash', '2023-11-28 19:35:39', '2023-11-28 19:35:39', 24),
(15, 'sneezing', '2023-11-28 19:35:39', '2023-11-28 19:35:39', 24),
(16, 'stomach ache', '2023-11-28 19:35:39', '2023-11-28 19:35:39', 24),
(17, 'headache', '2023-11-28 19:35:39', '2023-11-28 19:35:39', 24),
(18, 'earache', '2023-11-28 19:35:39', '2023-11-28 19:35:39', 24),
(19, 'diarrhea', '2023-11-28 19:35:39', '2023-11-28 19:35:39', 24),
(24, 'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asf ', '2023-11-28 17:12:01', '2023-11-28 17:12:01', 23),
(25, 'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asfsdfadsfadsf aeafsdf ', '2023-11-28 17:12:08', '2023-11-28 17:12:08', 23),
(26, 'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asfsdfadsfadsf aeafsdf ', '2023-11-28 17:12:14', '2023-11-28 17:12:14', 24),
(27, 'cough adsf ad adfa dfa ads ads asdf afdaf asdf a af asf asfsdfadsfadsf aeafsdf ', '2023-11-29 11:46:25', '2023-11-29 11:46:25', 27),
(28, 'cough adsffsdfadsfadsf aeafsdf ', '2023-11-29 11:46:57', '2023-11-29 11:46:57', 27),
(29, 'cough adsffsd--------------------fadsfadsf aeafsdf ', '2023-11-29 11:47:45', '2023-11-29 11:47:45', 27);

-- --------------------------------------------------------

--
-- Table structure for table `baby_temperature`
--

CREATE TABLE `baby_temperature` (
  `id` int(11) NOT NULL,
  `baby_id` int(10) UNSIGNED DEFAULT NULL,
  `temp_celsius` varchar(255) DEFAULT NULL,
  `temp_fahrenheit` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `order`, `title`, `category`, `description`, `image`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'hello', NULL, 'this is blog', 'dfa', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` int(11) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `name` varchar(2555) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `child_vaccine_remiinders`
--

CREATE TABLE `child_vaccine_remiinders` (
  `id` int(11) NOT NULL,
  `baby_id` int(10) UNSIGNED NOT NULL,
  `name` varbinary(255) NOT NULL,
  `vaccine_date` datetime NOT NULL,
  `status` varchar(255) DEFAULT 'null',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_vaccine_remiinders`
--

INSERT INTO `child_vaccine_remiinders` (`id`, `baby_id`, `name`, `vaccine_date`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 27, 0x706f6c696f, '2023-12-31 00:00:00', 'Pending', '2023-11-30 12:00:00', '2023-12-04 13:33:46'),
(2, 27, 0x706e65756d6f6e6961, '2023-12-31 00:00:00', 'Pending', '2023-12-04 13:40:12', '2023-12-04 13:43:29'),
(3, 27, 0x706f6c696f, '2023-12-31 00:00:00', 'pending', '2023-12-04 13:40:30', '2023-12-04 13:40:30');

-- --------------------------------------------------------

--
-- Table structure for table `daily_reads`
--

CREATE TABLE `daily_reads` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `daily_tips`
--

CREATE TABLE `daily_tips` (
  `id` int(11) NOT NULL,
  `day` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `drug_reminder`
--

CREATE TABLE `drug_reminder` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dose` varchar(255) NOT NULL,
  `medication_time` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drug_reminder`
--

INSERT INTO `drug_reminder` (`id`, `name`, `dose`, `medication_time`, `created_at`, `user_id`) VALUES
(1, 'Ibuprofen', '200mg', '8:00 AM', '2023-12-04 15:46:14', 12),
(2, 'napa ace', '200mg', '8:00 AM', '2023-12-04 15:47:00', 12);

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lang_code` varchar(11) NOT NULL,
  `lang_country` varchar(11) NOT NULL,
  `flag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `lang_code`, `lang_country`, `flag`) VALUES
(1, 'English', 'en', 'us', '/upload/image.jpg'),
(2, 'bangla', 'bn', 'bd', '/upload');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `uploaded_by` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `mime_type` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `uploaded_by`, `file_name`, `file_path`, `file_type`, `mime_type`, `createdAt`, `updatedAt`) VALUES
(1, 'user', 'asdfas.jpg', 'public/upload/baby/path/image', 'image', 'image/jpg', '2023-12-01 03:28:36', '2023-12-01 12:28:36');

-- --------------------------------------------------------

--
-- Table structure for table `mother_progress_timeline`
--

CREATE TABLE `mother_progress_timeline` (
  `id` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mother_vaccine_reminders`
--

CREATE TABLE `mother_vaccine_reminders` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `vaccine_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mother_vaccine_reminders`
--

INSERT INTO `mother_vaccine_reminders` (`id`, `user_id`, `name`, `vaccine_date`, `createdAt`, `updatedAt`) VALUES
(1, 12, 'Flu Vaccine', '2023-12-20 00:00:00', '2023-12-04 14:33:30', '2023-12-04 14:33:30'),
(2, 12, 'Flu Vaccine', '2023-12-20 00:00:00', '2023-12-04 14:34:03', '2023-12-04 14:34:03'),
(3, 12, 'Flu Vaccine', '2023-12-20 00:00:00', '2023-12-04 14:34:06', '2023-12-04 14:34:06'),
(4, 12, 'Flu Vaccine', '2023-12-20 00:00:00', '2023-12-04 14:34:07', '2023-12-04 14:34:07');

-- --------------------------------------------------------

--
-- Table structure for table `tool_mother_baby_kick_counters`
--

CREATE TABLE `tool_mother_baby_kick_counters` (
  `id` int(11) NOT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `kicks` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tool_mother_contraction_timers`
--

CREATE TABLE `tool_mother_contraction_timers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `start` datetime DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `intensity` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tool_mother_contraction_timers`
--

INSERT INTO `tool_mother_contraction_timers` (`id`, `user_id`, `start`, `duration`, `frequency`, `intensity`, `createdAt`, `updatedAt`) VALUES
(1, 0, '2023-12-01 08:00:00', '30 minutes', 'Irregular', 'Low', '2023-12-04 14:44:26', '2023-12-04 14:44:26'),
(2, 0, '2023-12-01 08:00:00', '30 minutes', 'Irregular', 'high', '2023-12-04 14:44:33', '2023-12-04 14:44:33'),
(3, 0, '2023-12-01 08:00:00', '30 minutes', 'Irregular', 'high', '2023-12-04 14:44:49', '2023-12-04 14:44:49'),
(4, 0, '2023-12-01 08:00:00', '30 minutes', 'Irregular', 'high', '2023-12-04 14:44:50', '2023-12-04 14:44:50'),
(5, 12, '2023-12-01 08:00:00', '30 minutes', 'Irregular', 'high', '2023-12-04 15:00:23', '2023-12-04 15:00:23'),
(6, 12, '2023-12-01 08:00:00', '30 minutes', 'Irregular', 'high', '2023-12-04 15:00:24', '2023-12-04 15:00:24'),
(7, 12, '2023-12-01 08:00:00', '30 minutes', 'Irregular', 'high', '2023-12-04 15:01:51', '2023-12-04 15:01:51'),
(8, 12, '2023-12-01 08:00:00', '30 minutes', 'Irregular', 'high', '2023-12-04 15:01:52', '2023-12-04 15:01:52');

-- --------------------------------------------------------

--
-- Table structure for table `tool_mother_symptoms`
--

CREATE TABLE `tool_mother_symptoms` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `symptom` varchar(255) DEFAULT NULL,
  `intensity` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tool_mother_symptoms`
--

INSERT INTO `tool_mother_symptoms` (`id`, `user_id`, `symptom`, `intensity`, `remarks`, `createdAt`, `updatedAt`) VALUES
(1, 12, 'Headache', 'Mild', 'Had a headache for an hour.', '2023-12-04 15:13:06', '2023-12-04 15:13:06'),
(3, 12, 'Headache', 'so high', 'Had a headache for an hour.', '2023-12-04 15:13:34', '2023-12-04 15:13:34'),
(4, 12, 'Headache', 'so low', 'Had a headache for an hour.', '2023-12-04 15:13:40', '2023-12-04 15:13:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
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
  `baby_already_born` int(11) NOT NULL,
  `login_type` varchar(255) NOT NULL COMMENT 'email=1 google=2 facebook=2 twitter=2',
  `user_type` varchar(255) NOT NULL DEFAULT 'general_user',
  `subscription` varchar(255) NOT NULL DEFAULT 'Free',
  `password_reset_token` varchar(255) DEFAULT NULL,
  `reset_password_expire` varchar(255) DEFAULT NULL,
  `confirm_email_token` varchar(255) DEFAULT NULL,
  `is_email_confirmed` varchar(45) DEFAULT '0',
  `is_profile_complete` int(2) NOT NULL DEFAULT 0,
  `lmp_date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `social_id`, `username`, `first_name`, `last_name`, `age`, `gender`, `photo`, `social_photo`, `child_number`, `edd_date`, `email`, `password`, `language`, `country`, `pregnency_loss`, `baby_already_born`, `login_type`, `user_type`, `subscription`, `password_reset_token`, `reset_password_expire`, `confirm_email_token`, `is_email_confirmed`, `is_profile_complete`, `lmp_date`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'newUser', 'Sam', 'Johnson', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$wKOyz0WONapbY61aUAVfaOMgvDAj54/HxE0YElJBPv8FCH10s09YS', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', '88829178b29618b9947da913fde23b950bec8cef33caa86a1e641390db055ab6', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:05:05', '2023-11-26 13:27:06'),
(4, NULL, 'mahbub', 'mela', 'reza', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', 'newPassword', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:10:11', '2023-11-26 10:10:11'),
(5, NULL, 'mahbub', 'mela', 'reza', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', 'newPassword', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:10:36', '2023-11-26 10:10:36'),
(6, NULL, 'hasan', 'hasu', 'reza', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$g2mg/6jNBgvQQ96abgCK7OY5Q1PlETEDs..p9.hyrbSORi4PmeqEe', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', '$2b$10$anuZk7v.Rbx5CGyV33hMAe1iQzwZG4Nm1mWtOpoWt0pYNrdQUTMje', 'Tue Nov 28 2023 18:27:38 GMT+0600 (Bangladesh Standard Time)600000', NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:11:07', '2023-11-28 12:29:50'),
(7, NULL, 'kamal', 'kalu', 'reza', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$M5LSsfNStlqUq/XHRL5qS.FsRwSZ3Tsgze.569oFqgum5Q2kTbq3S', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', '2f1cbc7873708f75f944e1c39831f55cd37e0d5d4d58f900b63c66c6cfd3b286', 'Sun Nov 26 2023 23:02:41 GMT+0600 (Bangladesh Standard Time)600000', NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:28:12', '2023-11-26 17:03:22'),
(8, NULL, 'salam', 'kalu', 'reza', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$D71ODxKMjsS8cvGgF7i0bOXtQnXUBls8NLdWGJTLoHTXUB.0mIoqW', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', '$2b$10$xArq5CdhaICbny6WmtMtAOK1b0WKzY8eUsnltw4BYF/k2kslRS/HW', 'Tue Nov 28 2023 22:46:03 GMT+0600 (Bangladesh Standard Time)600000', NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:30:17', '2023-11-28 16:46:38'),
(9, NULL, 'mala', 'kalu', 'reza', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '000', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:30:39', '2023-11-26 10:30:39'),
(10, NULL, 'dala', 'kalu', 'reza', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '000', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:33:34', '2023-11-26 10:33:34'),
(11, NULL, 'jala', 'kalu', 'reza', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '000', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:38:54', '2023-11-26 10:38:54'),
(12, NULL, 'shapla', 'shapla', 'jahan', 21, 1, 'user_photo.jpg', NULL, 1, '2023-12-15 00:00:00', 'shapla@email.com', '$2b$10$a.2MqcV5L1XlcROdV2dpDOvzO9in9wMCZX2rEWiAPHP9759PgWQx.', 'Bangla', NULL, NULL, 1, 'email', 'general_user', 'free', '8d216e62a0af344ecb1efb8a6a43f1101da31e2d5c78a012f94e2a0e0dbf62b3', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:41:15', '2023-11-28 17:34:13'),
(13, NULL, 'maria', 'maria', 'haque', 28, 1, 'user_photo.jpg', NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$IXE4yE.8rdVTKsd9WjgMt.mQS6XKm2LDqwl6qCfW8xwKIKYTAVkvm', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 14:11:28', '2023-11-26 14:11:28'),
(14, NULL, 'golu', 'kalu', 'reza', 28, 1, NULL, NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$otm.uhl0i4Nm1F4OrxlY7uOF2u4ZDG566JRiYHLHV.gp1aKSznvFm', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, '337bf1c5d6636747cceb47dd1293ac0959f6e7bcddc93f1855b49ce334fe15df', '0', 0, '2023-01-01 00:00:00', '2023-11-26 16:51:42', '2023-11-26 16:51:42'),
(15, NULL, 'takla', 'kalu', 'reza', 28, 1, NULL, NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$cEaRkVxh1VcybTnI9bJAuullxB7ziH3kqLNao.N63hrtQWxM1/Yvi', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, 'ac5f9f66b8659a180615b5935622497d8f8b8f890e04ccc749ec0e26aca5e762', '0', 0, '2023-01-01 00:00:00', '2023-11-26 17:21:47', '2023-11-26 17:21:47'),
(16, NULL, 'takla', 'kalu', 'reza', 28, 1, NULL, NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$BGaxUfXfFSbR3okQHQuZUe59uEzfjHHSyCZ39KN/6dKpOzRsO0ame', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, '8f0d928115f31c474fa17fd04cc2c5edd0678221bf0e3faac4a253a0b4e12f18', '0', 0, '2023-01-01 00:00:00', '2023-11-26 17:21:56', '2023-11-26 17:21:56'),
(17, NULL, 'takla', 'kalu', 'reza', NULL, 1, NULL, NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$GJbk6atwhOEkjeFsrniS/.V/pqdjjzVyjITuIHLlc25OJIlwwsoHe', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, 'cdea7eb11a7e3ce9a55dd5cf31667260ded52e91a46070b3db8ae890aca2715d', '0', 0, '2023-01-01 00:00:00', '2023-11-26 17:22:59', '2023-11-26 17:22:59'),
(18, NULL, 'golu', 'kalu', 'reza', NULL, NULL, NULL, NULL, NULL, NULL, 'newuser@email.com', '$2b$10$enz9wM3VEupTpJsc3rtMueHYO/mJx20vSMS9Vxs4e7vMY6OCfJdeO', NULL, NULL, NULL, 0, '', 'general_user', 'Free', NULL, NULL, NULL, '0', 0, '0000-00-00 00:00:00', '2023-11-28 17:57:35', '2023-11-28 17:57:35'),
(19, NULL, 'golu', 'kalu', 'reza', NULL, NULL, NULL, NULL, NULL, NULL, 'newuser@email.com', '$2b$10$05Ij2zaoHx4oTbFJAUKu8uI8YFMvPewiL0D9wI9BPu720cVnmXmOi', NULL, NULL, NULL, 0, '', 'general_user', 'Free', NULL, NULL, '888c96b07df8f54fb2e38c4e26ccf98e754a2c66bde0ca7393e79c699db2e9a2', '0', 0, '0000-00-00 00:00:00', '2023-11-28 17:58:20', '2023-11-28 17:58:20'),
(20, NULL, 'arman', 'arman', 'akt', NULL, NULL, NULL, NULL, NULL, NULL, 'newuser@email.com', '$2b$10$SUks2UpGEX5X9n3543kKqeA4MjyDQlID94A2nW4VSLDkOxqBw0rqa', NULL, NULL, NULL, 0, '', 'general_user', 'Free', '$2b$10$HM7sJOwaW3H22wUh8158I.SpWrdGyxUwLXbnOmplr2aNQ4BNvQ.EK', 'Tue Nov 28 2023 23:22:28 GMT+0600 (Bangladesh Standard Time)600000', NULL, '1', 0, '0000-00-00 00:00:00', '2023-11-28 17:22:27', '2023-11-28 17:28:56'),
(21, NULL, 'nasim', 'nasim', 'akt', NULL, NULL, NULL, NULL, NULL, NULL, 'newuser@email.com', '$2b$10$SiCSJNyNkDHhLCrHbkNSnOYj3XtT9rKP.sxHRVRI6k5hYSH5XBq8O', NULL, NULL, NULL, 0, '', 'general_user', 'Free', '$2b$10$rQD/hYiRAz..BR/7zMUHnOB8Ga/Dq36Z8Zj1pGw8rPtBLMnZXQwJy', 'Tue Nov 28 2023 23:31:22 GMT+0600 (Bangladesh Standard Time)600000', NULL, '1', 0, '0000-00-00 00:00:00', '2023-11-28 17:31:22', '2023-11-28 17:32:04'),
(30, '114657009973842993825', '114657009973842993825', 'MD ARMAN', 'KHAN', NULL, NULL, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocJxjv44djn0ndB5-VJnKNwD8YQS8qhqQfi_A3SB9qXgXw=s96-c', NULL, NULL, 'arman.khan.dev@gmail.com', NULL, NULL, NULL, NULL, 0, 'google', 'general_user', 'Free', NULL, NULL, NULL, '0', 0, '0000-00-00 00:00:00', '2023-12-04 18:29:49', '2023-12-04 18:29:49'),
(31, '114579153302679689136', '114579153302679689136', 'Md Rumman', 'Khan', NULL, NULL, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocIaZuf9JaL4l-y0WBvm_9Yc5MW_s2RzumOb1ZmqjT9-bQ=s96-c', NULL, NULL, 'rummankh0@gmail.com', NULL, NULL, NULL, NULL, 0, 'google', 'general_user', 'Free', NULL, NULL, NULL, '0', 0, '0000-00-00 00:00:00', '2023-12-04 18:35:49', '2023-12-04 18:35:49');

-- --------------------------------------------------------

--
-- Table structure for table `warning_signs`
--

CREATE TABLE `warning_signs` (
  `id` int(11) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `weight_logs`
--

CREATE TABLE `weight_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `date` datetime DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `baby_breast_pumping`
--
ALTER TABLE `baby_breast_pumping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`baby_id`);

--
-- Indexes for table `baby_diaper`
--
ALTER TABLE `baby_diaper`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`baby_id`);

--
-- Indexes for table `baby_feed`
--
ALTER TABLE `baby_feed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2` (`baby_id`);

--
-- Indexes for table `baby_gallery`
--
ALTER TABLE `baby_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`baby_id`);

--
-- Indexes for table `baby_list`
--
ALTER TABLE `baby_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`mother_id`);

--
-- Indexes for table `baby_medications`
--
ALTER TABLE `baby_medications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`baby_id`);

--
-- Indexes for table `baby_notes`
--
ALTER TABLE `baby_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`baby_id`);

--
-- Indexes for table `baby_progress_timeline`
--
ALTER TABLE `baby_progress_timeline`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `baby_sleep`
--
ALTER TABLE `baby_sleep`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`baby_id`);

--
-- Indexes for table `baby_symptoms`
--
ALTER TABLE `baby_symptoms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`baby_id`);

--
-- Indexes for table `baby_temperature`
--
ALTER TABLE `baby_temperature`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`baby_id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`category`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `child_vaccine_remiinders`
--
ALTER TABLE `child_vaccine_remiinders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`baby_id`);

--
-- Indexes for table `daily_reads`
--
ALTER TABLE `daily_reads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daily_tips`
--
ALTER TABLE `daily_tips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drug_reminder`
--
ALTER TABLE `drug_reminder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`user_id`);

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mother_progress_timeline`
--
ALTER TABLE `mother_progress_timeline`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mother_vaccine_reminders`
--
ALTER TABLE `mother_vaccine_reminders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`user_id`);

--
-- Indexes for table `tool_mother_baby_kick_counters`
--
ALTER TABLE `tool_mother_baby_kick_counters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tool_mother_contraction_timers`
--
ALTER TABLE `tool_mother_contraction_timers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tool_mother_symptoms`
--
ALTER TABLE `tool_mother_symptoms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `warning_signs`
--
ALTER TABLE `warning_signs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weight_logs`
--
ALTER TABLE `weight_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `baby_breast_pumping`
--
ALTER TABLE `baby_breast_pumping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `baby_diaper`
--
ALTER TABLE `baby_diaper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `baby_feed`
--
ALTER TABLE `baby_feed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `baby_gallery`
--
ALTER TABLE `baby_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `baby_list`
--
ALTER TABLE `baby_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `baby_sleep`
--
ALTER TABLE `baby_sleep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `baby_symptoms`
--
ALTER TABLE `baby_symptoms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `child_vaccine_remiinders`
--
ALTER TABLE `child_vaccine_remiinders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `drug_reminder`
--
ALTER TABLE `drug_reminder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mother_vaccine_reminders`
--
ALTER TABLE `mother_vaccine_reminders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tool_mother_baby_kick_counters`
--
ALTER TABLE `tool_mother_baby_kick_counters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tool_mother_contraction_timers`
--
ALTER TABLE `tool_mother_contraction_timers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tool_mother_symptoms`
--
ALTER TABLE `tool_mother_symptoms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `baby_breast_pumping`
--
ALTER TABLE `baby_breast_pumping`
  ADD CONSTRAINT `FK_11` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `baby_diaper`
--
ALTER TABLE `baby_diaper`
  ADD CONSTRAINT `FK_6` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `baby_feed`
--
ALTER TABLE `baby_feed`
  ADD CONSTRAINT `FK_5` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `baby_gallery`
--
ALTER TABLE `baby_gallery`
  ADD CONSTRAINT `FK_2` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `baby_list`
--
ALTER TABLE `baby_list`
  ADD CONSTRAINT `FK_1` FOREIGN KEY (`mother_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `baby_medications`
--
ALTER TABLE `baby_medications`
  ADD CONSTRAINT `FK_19` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `baby_notes`
--
ALTER TABLE `baby_notes`
  ADD CONSTRAINT `FK_13` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `baby_sleep`
--
ALTER TABLE `baby_sleep`
  ADD CONSTRAINT `FK_9` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `baby_symptoms`
--
ALTER TABLE `baby_symptoms`
  ADD CONSTRAINT `FK_7` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `baby_temperature`
--
ALTER TABLE `baby_temperature`
  ADD CONSTRAINT `FK_12` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `FK_15` FOREIGN KEY (`category`) REFERENCES `blog_categories` (`id`);

--
-- Constraints for table `child_vaccine_remiinders`
--
ALTER TABLE `child_vaccine_remiinders`
  ADD CONSTRAINT `FK_21` FOREIGN KEY (`baby_id`) REFERENCES `baby_list` (`id`);

--
-- Constraints for table `drug_reminder`
--
ALTER TABLE `drug_reminder`
  ADD CONSTRAINT `FK_22_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `mother_vaccine_reminders`
--
ALTER TABLE `mother_vaccine_reminders`
  ADD CONSTRAINT `FK_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `weight_logs`
--
ALTER TABLE `weight_logs`
  ADD CONSTRAINT `FK_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
