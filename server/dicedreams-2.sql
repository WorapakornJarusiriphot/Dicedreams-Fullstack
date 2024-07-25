-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2024 at 12:18 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dicedreams`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `chat_id` bigint(20) NOT NULL,
  `message` varchar(255) NOT NULL,
  `datetime_chat` varchar(20) NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `post_games_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`chat_id`, `message`, `datetime_chat`, `user_id`, `post_games_id`, `createdAt`, `updatedAt`) VALUES
(0, 'req.body.message555555', '01/04/2567 02:50:00', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', '1f287c54-f8ea-4b62-b143-60cb7361faf6', '2024-03-16 18:21:41', '2024-03-16 18:58:41'),
(56, 'req.body.message33', '01/04/2567 02:50:00', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', '1f287c54-f8ea-4b62-b143-60cb7361faf6', '2024-03-16 18:27:45', '2024-03-16 18:27:45');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(50) NOT NULL,
  `read` tinyint(1) NOT NULL,
  `time` datetime NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `entity_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notification_id`, `type`, `read`, `time`, `user_id`, `entity_id`, `createdAt`, `updatedAt`) VALUES
('2bb8104e-ddda-4cde-928f-a87b4ee77b48', 'participate', 1, '2024-03-16 18:08:32', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', '5ce4c905-53f7-4441-a234-c52810f06f0b', '2024-03-16 18:08:32', '2024-03-20 19:45:25'),
('4048e81b-126e-4226-a640-748dc232612e', 'chat', 0, '2024-03-16 18:21:41', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', 'c5b2587f4c1b4cdc9a75a57bba768f54', '2024-03-16 18:21:41', '2024-03-16 18:21:41'),
('4b5c7fd5-f4a1-4f7e-886f-1d36ca173250', 'chat', 0, '2024-03-16 18:58:41', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', '0', '2024-03-16 18:58:41', '2024-03-16 18:58:41'),
('7621f749-717a-485f-97f6-4a8aee5cd01a', 'chat', 0, '2024-03-16 18:27:46', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', '56d3bae0da0543838af428ff29510f5a', '2024-03-16 18:27:46', '2024-03-16 18:27:46'),
('b6d739ae-dd89-4a21-a0cd-d3af16b65884', 'participate', 0, '2024-03-16 18:12:53', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', '5ce4c905-53f7-4441-a234-c52810f06f0b', '2024-03-16 18:12:53', '2024-03-16 18:12:53');

-- --------------------------------------------------------

--
-- Table structure for table `participate`
--

CREATE TABLE `participate` (
  `part_Id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `participant_apply_datetime` datetime NOT NULL,
  `participant_status` varchar(20) NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `post_games_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `participate`
--

INSERT INTO `participate` (`part_Id`, `participant_apply_datetime`, `participant_status`, `user_id`, `post_games_id`, `createdAt`, `updatedAt`) VALUES
('5ce4c905-53f7-4441-a234-c52810f06f0b', '2567-01-03 19:50:00', 'unActive', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', '1f287c54-f8ea-4b62-b143-60cb7361faf6', '2024-03-16 18:08:32', '2024-03-16 18:12:53');

-- --------------------------------------------------------

--
-- Table structure for table `post_activity`
--

CREATE TABLE `post_activity` (
  `post_activity_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name_activity` varchar(50) NOT NULL,
  `status_post` varchar(20) NOT NULL,
  `creation_date` datetime NOT NULL,
  `detail_post` varchar(255) NOT NULL,
  `date_activity` date NOT NULL,
  `time_activity` time NOT NULL,
  `post_activity_image` varchar(255) DEFAULT NULL,
  `store_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_activity`
--

INSERT INTO `post_activity` (`post_activity_id`, `name_activity`, `status_post`, `creation_date`, `detail_post`, `date_activity`, `time_activity`, `post_activity_image`, `store_id`) VALUES
('52951e92-2409-4b4c-990a-a9111bd03cbc', 'test name activity', 'active', '2567-09-02 23:07:00', 'detail_post activity', '2567-09-03', '06:07:00', 'e68ca845-d6bd-4212-867a-f00ddcb8c631.jpeg', '3594f82f-e3bf-11ee-9efc-30d0422f59c9'),
('da2739e7-5b98-4dc0-84c4-ae385e76e5e7', 'test name activity', 'active', '2567-09-02 23:07:00', 'detail_post activity', '2567-09-03', '06:07:00', '84a92030-0801-43fa-abe3-e4410210b701.png', '3594f82f-e3bf-11ee-9efc-30d0422f59c9');

-- --------------------------------------------------------

--
-- Table structure for table `post_games`
--

CREATE TABLE `post_games` (
  `post_games_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name_games` varchar(50) NOT NULL,
  `detail_post` varchar(255) NOT NULL,
  `num_people` int(11) NOT NULL,
  `date_meet` date NOT NULL,
  `time_meet` time NOT NULL,
  `games_image` varchar(255) DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `status_post` varchar(20) NOT NULL,
  `users_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_games`
--

INSERT INTO `post_games` (`post_games_id`, `name_games`, `detail_post`, `num_people`, `date_meet`, `time_meet`, `games_image`, `creation_date`, `status_post`, `users_id`) VALUES
('1f287c54-f8ea-4b62-b143-60cb7361faf6', 'test name_games activity5', 'detail_post', 2, '2567-09-03', '06:07:00', 'de87361b-2a8a-4b2f-9ed4-e4980ead602d.png', '2567-09-02 23:07:00', 'active', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa'),
('8a2842d0-89ab-433c-9aeb-67724ceb4290', 'test name_games activity5', 'detail_post', 2, '2567-09-03', '06:07:00', '10ee30b4-c806-4857-8c1b-f0e5ec6a15f0.jpeg', '2567-09-02 23:07:00', 'active', '48b0a732-b292-4cf8-bdd2-52156f177587');

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `store_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name_store` varchar(50) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `house_number` varchar(10) DEFAULT NULL,
  `alley` varchar(10) DEFAULT NULL,
  `road` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `sub_district` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `store_image` varchar(255) DEFAULT NULL,
  `users_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`store_id`, `name_store`, `phone_number`, `house_number`, `alley`, `road`, `district`, `sub_district`, `province`, `store_image`, `users_id`, `createdAt`, `updatedAt`) VALUES
('3594f82f-e3bf-11ee-9efc-30d0422f59c9', 'Outcast Gaming', '0623844415', '43/5', 'เทศบาล', 'ถนนราชดำเนิน (ถนนต้นสน)', 'เทศบาลนคร', 'ประตูองค์พระปฐมเจดีย์ฝั่งตลาดโต้รุ่ง ', 'นครปฐม', 'https://scontent.fkdt3-1.fna.fbcdn.net/v/t39.30808-6/304959616_494011612731327_7588110616456801443_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeELOG1jFmdUKJua60XNc9QbNVI4z2rYQkk1UjjPathCSfqVjWfTn6EK29pzpsExLYWyALGVKiRplkoIQorqTI_t&_nc_ohc=IMCVCEi3u', 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', '2024-03-16 18:55:12', '2024-03-16 18:55:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role` enum('user','admin','store') NOT NULL DEFAULT 'user',
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birthday` date DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `role`, `first_name`, `last_name`, `birthday`, `username`, `password`, `email`, `phone_number`, `gender`, `user_image`, `createdAt`, `updatedAt`) VALUES
('1d743394-2297-4043-acad-5cf5da8bf3aa', 'user', 'Worapakorn5', 'Jarusiriphot5', '2003-03-17', 'WOJA5', '$2a$05$aoNV4TgyGzG9vrIysDtZBuYDlIVJZwP8UX7ZD6UETqqRsI/eB29O.', 'Worapakorn5@gmail.com', '0623844415', 'male', '9d728566-624b-4b27-bbb5-6d88b0a06d08.jpeg', '2024-05-02 07:20:18', '2024-05-02 07:20:18'),
('217affca-a63a-429d-abed-c3c34498a1a8', 'user', 'Worapakorn', 'Jarusiriphot', '2024-05-02', 'worapakorn13', '$2a$05$QtKSG5t7FN/OPhg4P5ZNaus6ZU5Qe9eHwNG7QJ8bYLrhqWHbGSB02', 'worapakorn13@gmail.com', '0623844415', 'male', NULL, '2024-05-02 08:05:58', '2024-05-02 08:05:58'),
('3cb8cba9-874c-482e-bb5e-c5d523d77b7a', 'user', 'Worapakorn4', 'Jarusiriphot4', '2003-03-17', 'WOJA4', '$2a$05$utEVv0.UwHxyf4W7.dclk.xuet/gYs5tBXKg7RErPYkrM40Nza1ce', 'Worapakorn4@gmail.com', '0623844415', 'male', '4500b662-e071-40d8-946b-eb31ed2dcf4f.jpeg', '2024-05-01 23:51:51', '2024-05-01 23:51:51'),
('43d2d283-2ed8-45be-a03a-ebf70bc73e9e', 'user', 'Worapakorn16', 'Jarusiriphot16', '2024-05-02', 'worapakorn16', '$2a$05$uxXWaertuvbSvaPMfjniQOjANcqhJRy.DuoBKb8qyud1N4zW9n2GW', 'worapakorn16@gmail.com', '0623844415', 'male', NULL, '2024-05-02 08:12:38', '2024-05-02 08:12:38'),
('48b0a732-b292-4cf8-bdd2-52156f177587', 'user', 'Worapakorn2', 'Jarusiriphot2', '2003-03-17', 'WOJA2', '$2a$05$QBaCeUAZSpMIiIUj0d.Vl.Sdo/upREsHQUftbGrhtjWkjkFtvnkju', 'Worapakorn2@gmail.com', '0623844415', 'male', '7053e83d-15df-4bdb-81ec-103d6f3a5794.jpeg', '2024-03-18 21:10:12', '2024-03-18 21:10:12'),
('5524d38c-ec43-4287-a8a6-f4e369720759', 'user', 'Worapakorn', 'Jarusiriphot', '2024-05-02', 'worapakorn11', '$2a$05$sLT4vNddWbeMLsi0r.ny4Ox2PjxkN.VatY45iZcR8kFj.QAtmDbQK', 'worapakorn11@gmail.com', '0623844415', NULL, NULL, '2024-05-02 07:56:38', '2024-05-02 07:56:38'),
('55bc7bd5-221d-4362-b459-151f08b63d33', 'user', 'Worapakorn17', 'Jarusiriphot17', '2024-05-02', 'worapakorn17', '$2a$05$Scjb3JhCeS1r6vWWCuA4FOafBGCnyy/mbWjZDLtbvOW1uCOxL4YKK', 'worapakorn17@gmail.com', '0623844415', 'female', NULL, '2024-05-02 09:33:01', '2024-05-02 09:33:01'),
('772a42ab-1494-48f6-95aa-aa8419a1b710', 'user', 'Worapakorn15', 'Jarusiriphot15', '2024-05-02', 'worapakorn15', '$2a$05$yLPuTsbMt7mXniYmERxgTe88YRlpDqE31Ub3G4h71YNJHRGwPJkNi', 'worapakorn15@gmail.com', '0623844415', 'male', NULL, '2024-05-02 08:12:11', '2024-05-02 08:12:11'),
('99d0a968-6831-4735-9b34-fdbc6c3f0232', 'user', 'Worapakorn3', 'Jarusiriphot3', '2003-03-17', 'WOJA3', '$2a$05$eEhT3Fk6CPEos0iLbV4BQenKml07D3cpGzxUy5K3d2CCIeZ6EMIoW', 'Worapakorn3@gmail.com', '0623844415', 'male', '74d88d25-58df-4367-a016-b914c68eb594.jpeg', '2024-05-01 23:11:24', '2024-05-01 23:11:24'),
('a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa', 'store', 'John', 'JN', '1545-02-02', 'jn', '$2a$05$5thpelPigab8mxvVrMfYB.pCUqURd/vgBJDm3oiFDBp9CwQXwGpfG', 'jn@gmail.com', '0884525459', 'male', 'c331ca86-df9b-4a09-acd1-41a21de1c812.png', '2024-03-16 16:01:58', '2024-03-16 16:01:58'),
('a9f76e03-0fb7-48bd-b513-2fb5b91f25fb', 'user', 'Worapakorn', 'Jarusiriphot', '2024-05-02', 'worapakorn12', '$2a$05$S/szU0UxlM5S94qsGgOL4OWfkua4KBWMakHz3qoAxZAp3Zrqy77HS', 'worapakorn12@gmail.com', '0623844415', NULL, NULL, '2024-05-02 08:02:43', '2024-05-02 08:02:43'),
('b805acd8-f410-41ca-9961-5a25e8db7ccf', 'user', 'Worapakorn', 'Jarusiriphot', '2024-05-02', 'worapakorn10', '$2a$05$iH3TaMlD5YZqYJY7zr0y8.nMRtOSQJnboirTLrCSPUlxF57s4w4B2', 'worapakorn10@gmail.com', '0623844415', NULL, NULL, '2024-05-02 07:51:26', '2024-05-02 07:51:26'),
('c574677a-f7ea-411d-93c4-da54ac227628', 'user', 'Worapakorn18', 'Jarusiriphot18', '2024-05-03', 'worapakorn18', '$2a$05$2c9xPYKz9RZX18UKQViGueQtT9oOa5tUsr/s4zn/Lp8q9zcMo8.YS', 'worapakorn18@gmail.com', '0623844415', 'male', NULL, '2024-05-02 19:21:27', '2024-05-02 19:21:27'),
('d1a4ace1-596c-41af-bc75-419465123a94', 'user', 'Worapakorn19', 'Jarusiriphot91', '2024-05-03', 'worapakorn19', '$2a$05$GkoXAcTqfl4o6JEs7X9O7eA71kfYTvGFs00nNrmoS8cQELerkfQiu', 'worapakorn19@gmail.com', '0623844415', 'male', NULL, '2024-05-02 19:36:33', '2024-05-02 19:36:33'),
('e297c638-60cb-449a-bbcf-77315f1c00df', 'user', 'Worapakorn', 'Jarusiriphot', '2024-05-02', 'worapakorn14', '$2a$05$Qrdzmk0cbn0lD2B0ZncOhu3urbFfZ3vBFa50VXkwT/5liwWeHugye', 'worapakorn14@gmail.com', '0623844415', 'male', NULL, '2024-05-02 08:07:01', '2024-05-02 08:07:01'),
('eef3e313-05a0-4915-9dfb-94dfbaf0c64d', 'user', 'Worapakorn', 'Jarusiriphot', '1545-02-02', 'WOJA', '$2a$05$be3nKAaBmoS2YFamZoatTezl7tn8Pgj2BjKCU/2bOS8JeYXsmmKAe', 'Worapakorn@gmail.com', '0623844415', 'male', '4f549478-0715-45b7-8aea-04d4f349b6ee.png', '2024-03-16 18:07:13', '2024-03-16 18:07:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_games_id` (`post_games_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `participate`
--
ALTER TABLE `participate`
  ADD PRIMARY KEY (`part_Id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_games_id` (`post_games_id`);

--
-- Indexes for table `post_activity`
--
ALTER TABLE `post_activity`
  ADD PRIMARY KEY (`post_activity_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `post_games`
--
ALTER TABLE `post_games`
  ADD PRIMARY KEY (`post_games_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`post_games_id`) REFERENCES `post_games` (`post_games_id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`);

--
-- Constraints for table `participate`
--
ALTER TABLE `participate`
  ADD CONSTRAINT `participate_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`),
  ADD CONSTRAINT `participate_ibfk_2` FOREIGN KEY (`post_games_id`) REFERENCES `post_games` (`post_games_id`);

--
-- Constraints for table `post_activity`
--
ALTER TABLE `post_activity`
  ADD CONSTRAINT `post_activity_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

--
-- Constraints for table `post_games`
--
ALTER TABLE `post_games`
  ADD CONSTRAINT `post_games_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`);

--
-- Constraints for table `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `store_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
