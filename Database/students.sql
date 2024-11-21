-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 07:27 PM
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
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(225) NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `age` int(100) NOT NULL,
  `gender` text NOT NULL,
  `branch` text NOT NULL,
  `phone_number` int(20) NOT NULL,
  `joindate` varchar(225) NOT NULL,
  `course_duration` int(11) NOT NULL,
  `course_fee` int(11) NOT NULL,
  `total_fee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `password`, `age`, `gender`, `branch`, `phone_number`, `joindate`, `course_duration`, `course_fee`, `total_fee`) VALUES
(28, 'Devasish ', '21341a4237@gmrit.edu.in', '', 23, 'Female', 'AIML', 2147483647, '2024/11/13 12:30:00', 4, 10000, 10000),
(29, 'Jay sri', 'student1@gamil.com', '$2a$10$1aIIRUnD2PVtmB3MgCxfN.Q.nwLEOrRPn535j2VS1ojpIUX7Tn/P2', 20, 'Female', 'AIML', 921474836, '2024/11/18 12:53:40', 4, 10000, 2147483647),
(30, 'Devasish sai Pothumudi', 'devasishsai2004@gmail.com', '$2a$10$xK3qc3zsxHI75UvvJR3qa.3FEz7noAMY6Dgu/3OcawEZb8uKxW/0C', 20, 'Male', 'AIML', 2147483647, '2024/11/19 19:32:25', 4, 10000, 2147483647),
(31, 'John Doe', 'john.doe31@example.com', 'password123', 20, 'Male', 'AIML', 2147483647, '2023-08-01', 4, 50000, 200000),
(32, 'Jane Smith', 'jane.smith32@example.com', 'password456', 22, 'Female', 'CSE', 2147483647, '2022-07-01', 4, 55000, 220000),
(33, 'Alice Johnson', 'alice.johnson33@example.com', 'password789', 21, 'Female', 'ECE', 2147483647, '2021-06-01', 4, 60000, 240000),
(34, 'Bob Brown', 'bob.brown34@example.com', 'password101', 23, 'Male', 'MECH', 2147483647, '2020-05-01', 4, 45000, 180000),
(35, 'Charlie Davis', 'charlie.davis35@example.com', 'password102', 20, 'Male', 'IT', 2147483647, '2023-08-01', 4, 50000, 200000),
(36, 'Diana Prince', 'diana.prince36@example.com', 'password103', 22, 'Female', 'CIVIL', 2147483647, '2022-07-01', 4, 40000, 160000),
(37, 'Ethan Hunt', 'ethan.hunt37@example.com', 'password104', 21, 'Male', 'EEE', 2147483647, '2021-06-01', 4, 55000, 220000),
(39, 'Chris Evans', 'chris.evans39@example.com', 'password123', 19, 'Male', 'CSE', 2147483647, '2022-09-01', 4, 52000, 208000),
(40, 'Emma Watson', 'emma.watson40@example.com', 'password456', 22, 'Female', 'ECE', 2147483647, '2021-08-01', 4, 57000, 228000),
(41, 'Tom Cruise', 'tom.cruise41@example.com', 'password789', 23, 'Male', 'IT', 2147483647, '2023-06-01', 4, 50000, 200000),
(42, 'Scarlett Johansson', 'scarlett.johansson42@example.com', 'password101', 21, 'Female', 'AIDS', 2147483647, '2020-07-01', 4, 60000, 240000),
(43, 'Robert Downey', 'robert.downey43@example.com', 'password102', 22, 'Male', 'MECH', 2147483647, '2021-07-01', 4, 45000, 180000),
(44, 'Natalie Portman', 'natalie.portman44@example.com', 'password103', 20, 'Female', 'CIVIL', 2147483647, '2022-05-01', 4, 42000, 168000),
(45, 'Chris Hemsworth', 'chris.hemsworth45@example.com', 'password104', 19, 'Male', 'EEE', 2147483647, '2023-06-01', 4, 55000, 220000),
(46, 'Gal Gadot', 'gal.gadot46@example.com', 'password105', 23, 'Female', 'CSE', 2147483647, '2020-04-01', 4, 58000, 232000),
(47, 'Henry Cavill', 'henry.cavill47@example.com', 'password123', 21, 'Male', 'IT', 2147483647, '2021-09-01', 4, 52000, 208000),
(48, 'Zendaya Coleman', 'zendaya.coleman48@example.com', 'password456', 20, 'Female', 'ECE', 2147483647, '2022-11-01', 4, 56000, 224000),
(49, 'Tom Holland', 'tom.holland49@example.com', 'password789', 19, 'Male', 'AIML', 2147483647, '2023-10-01', 4, 54000, 216000),
(50, 'Brie Larson', 'brie.larson50@example.com', 'password101', 22, 'Female', 'MECH', 2147483647, '2020-03-01', 4, 45000, 180000),
(51, 'Mark Ruffalo', 'mark.ruffalo51@example.com', 'password102', 23, 'Male', 'CIVIL', 2147483647, '2021-02-01', 4, 43000, 172000),
(52, 'Elizabeth Olsen', 'elizabeth.olsen52@example.com', 'password103', 20, 'Female', 'EEE', 2147483647, '2022-05-01', 4, 60000, 240000),
(53, 'Paul Rudd', 'paul.rudd53@example.com', 'password104', 21, 'Male', 'AIDS', 2147483647, '2023-08-01', 4, 58000, 232000),
(54, 'Evangeline Lilly', 'evangeline.lilly54@example.com', 'password105', 22, 'Female', 'IT', 2147483647, '2020-01-01', 4, 50000, 200000),
(55, 'Sebastian Stan', 'sebastian.stan55@example.com', 'password123', 23, 'Male', 'CSE', 2147483647, '2021-06-01', 4, 52000, 208000),
(56, 'Anthony Mackie', 'anthony.mackie56@example.com', 'password456', 19, 'Male', 'ECE', 2147483647, '2022-04-01', 4, 57000, 228000),
(57, 'Benedict Cumberbatch', 'benedict.cumberbatch57@example.com', 'password789', 22, 'Male', 'AIML', 2147483647, '2023-03-01', 4, 60000, 240000),
(58, 'Chadwick Boseman', 'chadwick.boseman58@example.com', 'password101', 20, 'Male', 'MECH', 2147483647, '2021-07-01', 4, 48000, 192000),
(59, 'Letitia Wright', 'letitia.wright59@example.com', 'password102', 19, 'Female', 'CIVIL', 2147483647, '2020-09-01', 4, 43000, 172000),
(60, 'Danai Gurira', 'danai.gurira60@example.com', 'password103', 21, 'Female', 'EEE', 2147483647, '2022-01-01', 4, 55000, 220000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
