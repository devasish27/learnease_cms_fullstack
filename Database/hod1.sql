-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 07:26 PM
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
-- Table structure for table `hod1`
--

CREATE TABLE `hod1` (
  `id` int(225) NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `branch` varchar(225) NOT NULL,
  `phone_number` int(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hod1`
--

INSERT INTO `hod1` (`id`, `name`, `email`, `password`, `branch`, `phone_number`) VALUES
(1, 'AI_ML_HOD', 'aiml_hod@gmail.com', '$2a$10$FAaK4C8Wtg4pjbQWHWehPeb6a9ybtW4NnqaTbOdvlojhatI0R29QW', 'AIML', 911234567),
(2, 'AI_DS_HOD', 'aids_hod@gmail.com', '123456', 'AIDS', 912456754),
(3, 'CSE_HOD', 'cse_hod@gmail.com', '123456', 'CSE', 912345678),
(6, 'CIVIL_HOD', 'civil_hod@gmail.com', '123456', 'CIVIL', 912456754),
(7, 'MECH_HOD', 'mech_hod@gmail.com', '123456', 'MECH', 912345678),
(8, 'ECE_HOD', 'ece_hod@gmail.com', '123456', 'ECE', 76543211),
(9, 'EEE_HOD', 'eee_hod@gmail.com', '123456', 'EEE', 76543218),
(10, 'IT_HOD', 'it_hod@gmail.com', '123456', 'IT', 98765456);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hod1`
--
ALTER TABLE `hod1`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hod1`
--
ALTER TABLE `hod1`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
