-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 18, 2025 at 06:20 AM
-- Server version: 8.0.30
-- PHP Version: 8.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_simpeg3`
--

-- --------------------------------------------------------

--
-- Table structure for table `presensi`
--

CREATE TABLE `presensi` (
  `id_presensi` int NOT NULL,
  `id_pegawai` smallint NOT NULL,
  `tanggal` date NOT NULL,
  `status` enum('Hadir','Pulang') COLLATE utf8mb4_general_ci NOT NULL,
  `jam_masuk` time DEFAULT NULL,
  `jam_keluar` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_pegawai`
--

CREATE TABLE `simpeg_pegawai` (
  `id_pegawai` smallint NOT NULL,
  `nama_pegawai` varchar(60) COLLATE latin1_general_ci NOT NULL,
  `nidn` char(10) COLLATE latin1_general_ci NOT NULL,
  `nip` char(18) COLLATE latin1_general_ci NOT NULL,
  `nuptk` char(16) COLLATE latin1_general_ci NOT NULL,
  `alamat` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `foto` varchar(255) COLLATE latin1_general_ci DEFAULT 'blm_ada_foto.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `simpeg_pegawai`
--

INSERT INTO `simpeg_pegawai` (`id_pegawai`, `nama_pegawai`, `nidn`, `nip`, `nuptk`, `alamat`, `foto`) VALUES
(1, 'ARIFIN NOOR ASYIKIN, ST, M.T.', '0002127602', '197612022002121002', '-', '-', '1750186484051.jpg'),
(2, 'AGUS SETIYO BUDI N, ST, M.KOM', '0011087508', '197508112000121002', '-', 'Jl .syngai lulut', '1750186489949.jpg'),
(5, 'HENDRA MARS SETIAWAN, ST', '-', '197903222002121003', '-', '-', 'blm_ada_foto.jpg'),
(6, 'SYAIFUL BACHRI, S.SOS.', '-', '195911171983031001', '-', '-', 'blm_ada_foto.jpg'),
(7, 'SUKARMAN', '-', '196410011992031002', '-', '-', 'blm_ada_foto.jpg'),
(115, 'ZAIYAN AHYADI, ST, M.SC', '-', '198011302003072006', '-', '-', 'blm_ada_foto.jpg'),
(122, 'ISNA WARDIAH, S.PD.,M.PD', '-', '198011302003072006', '-', '-', 'blm_ada_foto.jpg'),
(132, 'M. NOOR', '-', '197412111999032007', '-', '-', 'blm_ada_foto.jpg'),
(136, 'RAHIMI FITRI, S.KOM.,M. KOM', '-', '198207222005012001', '-', '-', 'blm_ada_foto.jpg'),
(146, 'M. HELMY NOOR, S.ST, M.T.', '-', '197505072000121001', '-', '-', 'blm_ada_foto.jpg'),
(150, 'IDA HASTUTI, SST , M.T.', '-', '197609212006041002', '-', '-', 'blm_ada_foto.jpg'),
(157, 'YOENIE INDRASARY, ST.,MT', '-', '198305122005012005', '-', '-', 'blm_ada_foto.jpg'),
(165, 'FUAD SHOLIHIN, S.T., M.KOM.', '-', '197609212006041002', '-', '-', 'blm_ada_foto.jpg'),
(242, 'Dr. REZA ADHI FAJAR, ST, MT', '-', '198407192007012010', '-', '-', 'blm_ada_foto.jpg'),
(245, 'AHMAD RIZANI, ST, MT', '-', '199003172016052006', '-', '-', 'blm_ada_foto.jpg'),
(256, 'RINOVA FIRMAN CAHYANI, S.SI.,M.PD', '-', '199001212015042002', '-', '-', 'blm_ada_foto.jpg'),
(257, 'AUNUR RAFIK, ST, MT', '-', '198706152010121003', '-', '-', 'blm_ada_foto.jpg'),
(264, 'NURFITRIAH, S.PD, MA', '-', '199311102018031005', '-', '-', 'blm_ada_foto.jpg'),
(271, 'MUHAMMAD FIRDAUS, ST, MT', '-', '197903022002121004', '-', '-', 'blm_ada_foto.jpg'),
(272, 'FERRY SOBATNU, ST.,MT', '-', '199008202014072002', '-', '-', 'blm_ada_foto.jpg'),
(273, 'DESSY LESTARI SAPTARINI, ST.,M.ENG', '-', '197810012006042004', '-', '-', 'blm_ada_foto.jpg'),
(275, 'MUHAMMAD AMRIL ASY\'ARI, S.T.,M.ENG', '-', '198609302009122008', '-', '-', 'blm_ada_foto.jpg'),
(276, 'RUSPIANSYAH, S.T, M.T.', '-', '198902212012061007', '-', '-', 'blm_ada_foto.jpg'),
(329, 'AKHMAD RAMDANI, S.H', '-', '199212242019032012', '-', '-', 'blm_ada_foto.jpg'),
(343, 'DR. REZA FAUZAN, S.KOM., M.KOM', '-', '199009092015041001', '-', '-', 'blm_ada_foto.jpg'),
(348, 'TITIES EKOSUSILOWATI, M.SI', '-', '198606302009122006', '-', '-', 'blm_ada_foto.jpg'),
(354, 'USAMA, S.PDI', '-', '198012012000041005', '-', '-', 'blm_ada_foto.jpg'),
(355, 'DRS. H.M.KUSASI, M.SI', '-', '197506232001121006', '-', '-', 'blm_ada_foto.jpg'),
(356, 'R. OTTO KESUMARWANTO, MT', '-', '199405082020071008', '-', '-', 'blm_ada_foto.jpg'),
(603, 'JONI RIADI, S.ST., M.T', '-', '197609212006041002', '-', '-', 'blm_ada_foto.jpg'),
(604, 'DR. SITI KUSTINI, S.PD, M.PD.', '-', '197711092005012001', '-', '-', 'blm_ada_foto.jpg'),
(605, 'AULIA AKHRIAN SYAHIDI, S.PD., M.KOM.', '-', ' 19941116202203100', '-', '-', 'blm_ada_foto.jpg'),
(606, 'RULLY REZKI SAPUTRA, S.PD., M.PD.', '-', '198905282019031009', '-', '-', 'blm_ada_foto.jpg'),
(607, 'HELDA YULIANI, S.PD., M.PD.', '-', '199101232019032021', '-', '-', 'blm_ada_foto.jpg'),
(608, 'WANVY ARIFHA SAPUTRA, M.KOM', '-', '199106262018031001', '-', '-', 'blm_ada_foto.jpg'),
(609, 'EVI WIDIASTUTI, S.ST.', '-', '198108222005012003', '-', '-', 'blm_ada_foto.jpg'),
(610, 'AHMAD YUSUF, S.KOM., M.KOM.', '-', '199803122020121002', '-', '-', 'blm_ada_foto.jpg'),
(611, 'ADE ILYAS, S.ST.', '-', '198902272010121008', '-', '-', 'blm_ada_foto.jpg'),
(711, 'M. Iqbal Harimurti', '0012037804', '198609262015051001', '1547533705700605', 'Jl. Martapura Km.6 Sungai lulut', '1750175967185.jpeg'),
(713, 'Mas Adul', '4354354353', '345345345345345345', '3453453453453453', 'rewrwerwerwerwerwerwerwr', '1750179098949.jpeg'),
(714, 'Perrell Laquarius Brown', '4356456456', '546546456456456544', '6786773553245234', 'Amerika Serikat', '1750179270578.jpeg'),
(715, 'werewrwer', 'werewrwere', 'rewrewrwerewqweqwe', 'rewrewrwerwerwer', 'werwerwerwerwer', 'blm_ada_foto.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `level` smallint NOT NULL,
  `username` char(35) COLLATE latin1_general_ci NOT NULL,
  `password` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `nama_lengkap` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `no_telp` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `aktif` enum('Y','N') COLLATE latin1_general_ci NOT NULL,
  `blokir` enum('Y','N') COLLATE latin1_general_ci NOT NULL DEFAULT 'N',
  `ket` varchar(255) COLLATE latin1_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `level`, `username`, `password`, `nama_lengkap`, `email`, `no_telp`, `aktif`, `blokir`, `ket`) VALUES
(1, 6, '197612022002121002', 'ARIFIN197612022002121002', 'ARIFIN NOOR ASYIKIN, ST, M.T.', NULL, '0816 4569 145', 'Y', 'N', NULL),
(2, 7, '197508112000121002', 'AGUS197508112000121002', 'AGUS SETIYO BUDI N, ST, M.KOM', NULL, '081256761900', 'Y', 'N', NULL),
(3, 3, '196506171990031003', 'SUHADI196506171990031003', 'SUHADI, A.MD', NULL, NULL, 'Y', 'N', NULL),
(4, 1, '197609212006041002', 'JONI197609212006041002 ', 'JONI RIADI, S.ST., M.T', NULL, '0821 4900 0777', 'Y', 'N', NULL),
(5, 6, 'admin', 'admin', 'Administrator', 'admin@admin.com', '08123456789', 'Y', 'N', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_level`
--

CREATE TABLE `user_level` (
  `id_level` tinyint UNSIGNED NOT NULL,
  `nama_level` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_level`
--

  INSERT INTO `user_level` (`id_level`, `nama_level`) VALUES
  (6, 'Admin Pegawai'),
  (7, 'Dosen'),
  (66, 'Keuangan'),
  (99, 'Super Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `presensi`
--
ALTER TABLE `presensi`
  ADD PRIMARY KEY (`id_presensi`),
  ADD KEY `id_pegawai` (`id_pegawai`);

--
-- Indexes for table `simpeg_pegawai`
--
ALTER TABLE `simpeg_pegawai`
  ADD PRIMARY KEY (`id_pegawai`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `user_level`
--
ALTER TABLE `user_level`
  ADD PRIMARY KEY (`id_level`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `presensi`
--
ALTER TABLE `presensi`
  MODIFY `id_presensi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `simpeg_pegawai`
--
ALTER TABLE `simpeg_pegawai`
  MODIFY `id_pegawai` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=716;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_level`
--
ALTER TABLE `user_level`
  MODIFY `id_level` tinyint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `presensi`
--
ALTER TABLE `presensi`
  ADD CONSTRAINT `presensi_ibfk_1` FOREIGN KEY (`id_pegawai`) REFERENCES `simpeg_pegawai` (`id_pegawai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
