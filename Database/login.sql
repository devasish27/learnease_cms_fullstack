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
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(225) NOT NULL,
  `userid` int(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `role` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `userid`, `email`, `password`, `role`) VALUES
(1, 3, 'kondurusuryavenkat@gmail.com', '$2a$10$SmV6inGOOa2.6v0j0tNKluJyYnagQckyie12mW9Bf4wYX9Sikffoi', 'admins'),
(7, 28, '21341a4237@gmrit.edu.in', '$2a$10$mIVGoqEqMAP7sRZbOMJXSOuvM1wHNpkXJ5x8pg7UW00BObkZJVmfW', 'students'),
(8, 7, 'faculty1@gmail.com', '$2a$10$297l7EIgL4PSg2FD8Fjdxepg5R3yHXxMvZiUvEO9l22xnMK08Cxpq', 'faculty'),
(9, 29, 'student1@gamil.com', '$2a$10$1aIIRUnD2PVtmB3MgCxfN.Q.nwLEOrRPn535j2VS1ojpIUX7Tn/P2', 'students'),
(10, 1, 'aiml_hod@gmail.com', '$2a$10$FAaK4C8Wtg4pjbQWHWehPeb6a9ybtW4NnqaTbOdvlojhatI0R29QW', 'hod'),
(11, 30, 'devasishsai2004@gmail.com', '$2a$10$xK3qc3zsxHI75UvvJR3qa.3FEz7noAMY6Dgu/3OcawEZb8uKxW/0C', 'students');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
