-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 08:24 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learnadmins`
--

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(225) NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `age` int(20) NOT NULL,
  `gender` text NOT NULL,
  `phone_number` int(20) NOT NULL,
  `branch` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `name`, `email`, `password`, `age`, `gender`, `phone_number`, `branch`) VALUES
(7, 'faculty1', 'faculty1@gmail.com', '$2a$10$297l7EIgL4PSg2FD8Fjdxepg5R3yHXxMvZiUvEO9l22xnMK08Cxpq', 53, 'Male', 9876543, 'AIML'),
(8, 'Dr. Fiona Apple', 'fiona.apple8@university.com', 'password105', 35, 'Female', 2147483647, 'AIDS'),
(9, 'Dr. Chris Evans', 'chris.evans9@university.com', 'password123', 43, 'Male', 2147483647, 'CSE'),
(10, 'Dr. Emma Watson', 'emma.watson10@university.com', 'password456', 37, 'Female', 2147483647, 'ECE'),
(11, 'Dr. Tom Cruise', 'tom.cruise11@university.com', 'password789', 41, 'Male', 2147483647, 'MECH'),
(12, 'Dr. Scarlett Johansson', 'scarlett.johansson12@university.com', 'password101', 39, 'Female', 2147483647, 'IT'),
(13, 'Dr. Robert Downey', 'robert.downey13@university.com', 'password102', 44, 'Male', 2147483647, 'CIVIL'),
(14, 'Dr. Natalie Portman', 'natalie.portman14@university.com', 'password103', 49, 'Female', 2147483647, 'EEE'),
(15, 'Dr. Henry Cavill', 'henry.cavill15@university.com', 'password104', 46, 'Male', 2147483647, 'AIDS'),
(16, 'Dr. Diana Prince', 'diana.prince6@university.com', 'password103', 40, 'Female', 2147483647, 'CIVIL'),
(17, 'Dr. Ethan Hunt', 'ethan.hunt7@university.com', 'password104', 48, 'Male', 2147483647, 'EEE'),
(21, 'Dr. John Smith', 'john.smith1@university.com', 'password123', 45, 'Male', 2147483647, 'CSE'),
(22, 'Dr. Jane Doe', 'jane.doe2@university.com', 'password456', 38, 'Female', 2147483647, 'AIML'),
(23, 'Dr. Alice Brown', 'alice.brown3@university.com', 'password789', 50, 'Female', 2147483647, 'ECE'),
(24, 'Dr. Bob Johnson', 'bob.johnson4@university.com', 'password101', 42, 'Male', 2147483647, 'MECH'),
(25, 'Dr. Charlie Wilson', 'charlie.wilson5@university.com', 'password102', 36, 'Male', 2147483647, 'IT');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
