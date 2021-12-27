-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-12-2021 a las 18:08:55
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `datawarehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `id` tinyint(4) NOT NULL,
  `country_id` tinyint(4) DEFAULT NULL,
  `city_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id`, `country_id`, `city_name`) VALUES
(1, 1, 'Ciudad De Nueva York'),
(2, 1, 'Los Angeles'),
(3, 2, 'Ottawa'),
(4, 3, 'Cordoba'),
(5, 3, 'Buenos Aires'),
(6, 4, 'Medellin'),
(7, 5, 'Santiago de Chile'),
(8, 6, 'Madrid'),
(9, 6, 'Barcelona'),
(10, 7, 'Paris'),
(11, 7, 'Lyon'),
(12, 1, 'Salem Center'),
(13, 8, 'New Delhi'),
(20, 6, 'Toledo'),
(21, 9, 'Sydney'),
(23, 9, 'Melbourne'),
(24, 16, 'Munich'),
(26, 17, 'Ciudad de Mexico'),
(27, 3, 'Santa Fe'),
(29, 1, 'San Francisco'),
(30, 20, 'Punta Del Este'),
(31, 17, 'Tulum'),
(32, 21, 'For Ever');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `company`
--

CREATE TABLE `company` (
  `id` smallint(6) NOT NULL,
  `city_id` tinyint(4) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `company`
--

INSERT INTO `company` (`id`, `city_id`, `company_name`, `company_address`, `phone`) VALUES
(1, 6, 'La Liga de La justicia', 'La serranita 423', '123-223-5463'),
(2, 4, 'Los Vengadores .inc', 'La casilla 325', '123-223-5783'),
(3, 12, 'X-Men Corp', 'Charles House', '123-223-4532'),
(10, 1, 'Specter, Litt & Zane', '8va and fifth', '645-789-9900'),
(11, 31, 'The Inhumans', 'tolotolo 123', '3256788899');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `job_position` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `company_id` smallint(6) DEFAULT NULL,
  `region_id` tinyint(4) DEFAULT NULL,
  `country_id` tinyint(4) DEFAULT NULL,
  `city_id` tinyint(4) DEFAULT NULL,
  `contact_address` varchar(255) DEFAULT NULL,
  `interest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contact`
--

INSERT INTO `contact` (`id`, `first_name`, `last_name`, `job_position`, `email`, `company_id`, `region_id`, `country_id`, `city_id`, `contact_address`, `interest`) VALUES
(1, 'jhonn', 'jhonn', 'Detective', 'iamnot@marcianmanhunter.com', 1, 1, 1, 1, 'los cercos 27', 75),
(2, 'Tony ', 'Stark', 'Philantropist', 'iam@ironman.com', 2, 1, 1, 2, 'rute 66 mile 18', 100),
(4, 'Logan', 'Sanders', 'Leader', 'iamnot@wolverine.com', 3, 1, 1, 12, 'Charles Home', 50),
(5, 'Charles', 'Xavier', 'Founder', 'iamnot@profesorx.com', 3, 1, 1, 12, 'Charles Home', 25),
(8, 'Clark', 'Kent', 'Reporter', 'iamnot@superman.com', 1, 1, 1, 1, 'los pirineos 243', 75),
(28, 'Ryan', 'Reynolds', 'tech support', 'perro@10.com', 1, 3, 16, 24, 'Laranita 123', 75),
(29, 'Robert', 'Baratheon', 'king', 'king@drinks.com', 3, 10, 21, 32, 'Laranita 123', 50),
(30, 'guy', 'that', 'boy', 'guy@free.com', 1, 1, 1, 1, 'los pirineos 243', 50),
(32, 'Jose', 'Servio', 'Diseñador', 'yodiseño@ver.com', 10, 1, 1, 12, 'los perros 12', 75),
(35, 'Medusa', 'met', 'Second', 'medu@sa.com', 11, 4, 8, 13, 'haggdja', 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact_channel`
--

CREATE TABLE `contact_channel` (
  `id` int(11) NOT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `contact_channel_type_id` tinyint(4) DEFAULT NULL,
  `socials_username` varchar(255) DEFAULT NULL,
  `preferences` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contact_channel`
--

INSERT INTO `contact_channel` (`id`, `contact_id`, `contact_channel_type_id`, `socials_username`, `preferences`) VALUES
(1, 1, 1, '453-234-4567', 3),
(3, 2, 4, '@irongod', 0),
(4, 4, 5, 'try@try.com', 0),
(6, 2, 2, '@wolvi12', 0),
(8, 5, 8, 'null', 0),
(11, 4, 4, 'acaEstoy', 1),
(12, 1, 3, 'AcaReEstoy', 2),
(18, 28, 4, '@lordReynolds', 1),
(19, 29, 4, 'Mr.Rogers', 1),
(20, 30, 2, 'acaEstoyoNo', 1),
(21, 32, 2, 'Jose Servio', 1),
(26, 35, 1, '5643453', 1),
(27, 35, 3, 'bvdfgfdghgfh', 2),
(32, 1, 5, 'try@try.com', 1),
(33, 1, 7, '3554616621', 3),
(34, 8, 1, '351552636', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact_channel_type`
--

CREATE TABLE `contact_channel_type` (
  `id` tinyint(4) NOT NULL,
  `channel` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contact_channel_type`
--

INSERT INTO `contact_channel_type` (`id`, `channel`) VALUES
(1, 'Whatsapp'),
(2, 'Facebook'),
(3, 'Pinterest'),
(4, 'Instagram'),
(5, 'Email'),
(6, 'Mensajes'),
(7, 'Llamadas'),
(8, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `country`
--

CREATE TABLE `country` (
  `id` tinyint(4) NOT NULL,
  `redion_id` tinyint(4) DEFAULT NULL,
  `country_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `country`
--

INSERT INTO `country` (`id`, `redion_id`, `country_name`) VALUES
(1, 1, 'Estados Unidos'),
(2, 1, 'Canada'),
(3, 2, 'Argentina'),
(4, 2, 'Colombia'),
(5, 2, 'Chile'),
(6, 3, 'España'),
(7, 3, 'Francia'),
(8, 4, 'India'),
(9, 5, 'Australia'),
(16, 3, 'Alemania'),
(17, 1, 'Mexico'),
(20, 2, 'Uruguay'),
(21, 10, 'Wakanda');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `region`
--

CREATE TABLE `region` (
  `id` tinyint(4) NOT NULL,
  `region_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `region`
--

INSERT INTO `region` (`id`, `region_name`) VALUES
(1, 'Norte America'),
(2, 'America Del Sur'),
(3, 'Europa'),
(4, 'Asia'),
(5, 'Ocenia'),
(10, 'Africa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `user_role` tinyint(4) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_role`, `pass`, `username`, `Email`) VALUES
(1, 'Peter', 'Parker', 1, '$2b$10$4KIdzDlW5y1QcLSiyPpkf.A3MYS9TDBwHbbXl04wueQ1yRTUZKHla', 'cust1', 'peterparker@spider.com'),
(2, 'Bruce', 'wayne', 0, '$2b$10$xjAqAPIlkxL7LyVHy6nRi.Xd27fu.qcusHr8z4jHpjCLbUSBZ.L6S', 'cust2', 'secretid@batman.com'),
(3, 'Hannah', 'Montana', 0, '$2b$10$vwq3cypnrSSH4tblmY8C8ungqpua4zuHX8B0v3owrxFX/9kI9dYzy', 'cust3', 'miley_cyrus@hannah.com'),
(5, 'Thor', 'Odinson', 0, '$2b$10$tZMwQFwIrD6y56/2GJZju.HNqiwiRiH.awa2p6eNnxjehp2/Flu.C', 'cust4', 'StrongestAvenger@pointBreak.com'),
(6, 'Wanda', 'Maximoff', 0, '$2b$10$krLCIBZhDFKnCZ6Qgvxx0eHiEFqLzaVYR0na5OcPNoHoGfOjOosza', 'cust5', 'strongestavenger@witch.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indices de la tabla `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indices de la tabla `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `region_id` (`region_id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indices de la tabla `contact_channel`
--
ALTER TABLE `contact_channel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_id` (`contact_id`),
  ADD KEY `contact_channel_type_id` (`contact_channel_type_id`);

--
-- Indices de la tabla `contact_channel_type`
--
ALTER TABLE `contact_channel_type`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`),
  ADD KEY `redion_id` (`redion_id`);

--
-- Indices de la tabla `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `company`
--
ALTER TABLE `company`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `contact_channel`
--
ALTER TABLE `contact_channel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `contact_channel_type`
--
ALTER TABLE `contact_channel_type`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `country`
--
ALTER TABLE `country`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `region`
--
ALTER TABLE `region`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contact_ibfk_2` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contact_ibfk_3` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contact_ibfk_4` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `contact_channel`
--
ALTER TABLE `contact_channel`
  ADD CONSTRAINT `contact_channel_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`)  ON DELETE CASCADE,
  ADD CONSTRAINT `contact_channel_ibfk_2` FOREIGN KEY (`contact_channel_type_id`) REFERENCES `contact_channel_type` (`id`)  ON DELETE CASCADE;

--
-- Filtros para la tabla `country`
--
ALTER TABLE `country`
  ADD CONSTRAINT `country_ibfk_1` FOREIGN KEY (`redion_id`) REFERENCES `region` (`id`)  ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
