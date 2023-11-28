-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2023 at 05:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
(30, 24, 58, 68, 126, '7 minutes', '9 minutes', '16 minutes', '2023-11-28 19:58:40', '2023-11-28 19:58:40');

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
(10, 24, 'poo', '2023-11-28 18:53:46', '2023-11-28 18:53:46', 3);

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
(30, 25, 'bottle', NULL, NULL, NULL, 80, NULL, NULL, '2023-11-28 16:43:40', '2023-11-28 16:43:40', '2023-11-28 16:43:40');

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
(25, 13, 'Baby5', 'baby5.jpg', 1, 'male', '2023-09-30 00:00:00', '2023-10-15 00:00:00', '2023-10-30 00:00:00', '2023-02-01 00:00:00', NULL);

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
(10, 24, '2023-11-03 00:30:00', '2023-11-03 07:30:00', '7 hours', '2023-11-28 21:22:43', '2023-11-28 21:22:43');

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
(19, 'diarrhea', '2023-11-28 19:35:39', '2023-11-28 19:35:39', 24);

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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `child_number` int(11) DEFAULT NULL,
  `edd_date` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
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

INSERT INTO `users` (`id`, `username`, `first_name`, `last_name`, `age`, `gender`, `photo`, `child_number`, `edd_date`, `email`, `password`, `language`, `country`, `pregnency_loss`, `baby_already_born`, `login_type`, `user_type`, `subscription`, `password_reset_token`, `reset_password_expire`, `confirm_email_token`, `is_email_confirmed`, `is_profile_complete`, `lmp_date`, `createdAt`, `updatedAt`) VALUES
(1, 'newUser', 'Sam', 'Johnson', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$wKOyz0WONapbY61aUAVfaOMgvDAj54/HxE0YElJBPv8FCH10s09YS', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', '88829178b29618b9947da913fde23b950bec8cef33caa86a1e641390db055ab6', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:05:05', '2023-11-26 13:27:06'),
(4, 'mahbub', 'mela', 'reza', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', 'newPassword', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:10:11', '2023-11-26 10:10:11'),
(5, 'mahbub', 'mela', 'reza', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', 'newPassword', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:10:36', '2023-11-26 10:10:36'),
(6, 'hasan', 'hasu', 'reza', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$g2mg/6jNBgvQQ96abgCK7OY5Q1PlETEDs..p9.hyrbSORi4PmeqEe', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', '$2b$10$anuZk7v.Rbx5CGyV33hMAe1iQzwZG4Nm1mWtOpoWt0pYNrdQUTMje', 'Tue Nov 28 2023 18:27:38 GMT+0600 (Bangladesh Standard Time)600000', NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:11:07', '2023-11-28 12:29:50'),
(7, 'kamal', 'kalu', 'reza', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$M5LSsfNStlqUq/XHRL5qS.FsRwSZ3Tsgze.569oFqgum5Q2kTbq3S', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', '2f1cbc7873708f75f944e1c39831f55cd37e0d5d4d58f900b63c66c6cfd3b286', 'Sun Nov 26 2023 23:02:41 GMT+0600 (Bangladesh Standard Time)600000', NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:28:12', '2023-11-26 17:03:22'),
(8, 'salam', 'kalu', 'reza', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$D71ODxKMjsS8cvGgF7i0bOXtQnXUBls8NLdWGJTLoHTXUB.0mIoqW', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', '$2b$10$xArq5CdhaICbny6WmtMtAOK1b0WKzY8eUsnltw4BYF/k2kslRS/HW', 'Tue Nov 28 2023 22:46:03 GMT+0600 (Bangladesh Standard Time)600000', NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:30:17', '2023-11-28 16:46:38'),
(9, 'mala', 'kalu', 'reza', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', '000', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:30:39', '2023-11-26 10:30:39'),
(10, 'dala', 'kalu', 'reza', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', '000', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:33:34', '2023-11-26 10:33:34'),
(11, 'jala', 'kalu', 'reza', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', '000', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:38:54', '2023-11-26 10:38:54'),
(12, 'shapla', 'shapla', 'banu', 21, 1, 'user_photo.jpg', 1, '2023-12-15 00:00:00', 'shapla@email.com', '$2b$10$a.2MqcV5L1XlcROdV2dpDOvzO9in9wMCZX2rEWiAPHP9759PgWQx.', 'Bangla', NULL, NULL, 1, 'email', 'general_user', 'free', '8d216e62a0af344ecb1efb8a6a43f1101da31e2d5c78a012f94e2a0e0dbf62b3', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 10:41:15', '2023-11-26 13:27:56'),
(13, 'maria', 'maria', 'haque', 28, 1, 'user_photo.jpg', 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$IXE4yE.8rdVTKsd9WjgMt.mQS6XKm2LDqwl6qCfW8xwKIKYTAVkvm', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, NULL, '0', 0, '2023-01-01 00:00:00', '2023-11-26 14:11:28', '2023-11-26 14:11:28'),
(14, 'golu', 'kalu', 'reza', 28, 1, NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$otm.uhl0i4Nm1F4OrxlY7uOF2u4ZDG566JRiYHLHV.gp1aKSznvFm', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, '337bf1c5d6636747cceb47dd1293ac0959f6e7bcddc93f1855b49ce334fe15df', '0', 0, '2023-01-01 00:00:00', '2023-11-26 16:51:42', '2023-11-26 16:51:42'),
(15, 'takla', 'kalu', 'reza', 28, 1, NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$cEaRkVxh1VcybTnI9bJAuullxB7ziH3kqLNao.N63hrtQWxM1/Yvi', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, 'ac5f9f66b8659a180615b5935622497d8f8b8f890e04ccc749ec0e26aca5e762', '0', 0, '2023-01-01 00:00:00', '2023-11-26 17:21:47', '2023-11-26 17:21:47'),
(16, 'takla', 'kalu', 'reza', 28, 1, NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$BGaxUfXfFSbR3okQHQuZUe59uEzfjHHSyCZ39KN/6dKpOzRsO0ame', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, '8f0d928115f31c474fa17fd04cc2c5edd0678221bf0e3faac4a253a0b4e12f18', '0', 0, '2023-01-01 00:00:00', '2023-11-26 17:21:56', '2023-11-26 17:21:56'),
(17, 'takla', 'kalu', 'reza', NULL, 1, NULL, 2, '2023-12-15 00:00:00', 'newuser@email.com', '$2b$10$GJbk6atwhOEkjeFsrniS/.V/pqdjjzVyjITuIHLlc25OJIlwwsoHe', 'English', NULL, NULL, 1, 'email', 'general_user', 'free', 'resetToken123', NULL, 'cdea7eb11a7e3ce9a55dd5cf31667260ded52e91a46070b3db8ae890aca2715d', '0', 0, '2023-01-01 00:00:00', '2023-11-26 17:22:59', '2023-11-26 17:22:59');

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `baby_breast_pumping`
--
ALTER TABLE `baby_breast_pumping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `baby_diaper`
--
ALTER TABLE `baby_diaper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `baby_feed`
--
ALTER TABLE `baby_feed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `baby_list`
--
ALTER TABLE `baby_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `baby_sleep`
--
ALTER TABLE `baby_sleep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `baby_symptoms`
--
ALTER TABLE `baby_symptoms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
