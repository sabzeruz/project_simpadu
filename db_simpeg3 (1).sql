-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 17, 2025 at 06:57 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

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
-- Table structure for table `aktivitas_kelas`
--

CREATE TABLE `aktivitas_kelas` (
  `id_aktivitas_kelas` int NOT NULL,
  `judul_akt_kelas` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `deskripsi_akt_kelas` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aktivitas_kelas`
--

INSERT INTO `aktivitas_kelas` (`id_aktivitas_kelas`, `judul_akt_kelas`, `deskripsi_akt_kelas`) VALUES
(1, 'Praktikum Manajemen Database', 'Mahasiswa mempelajari manajemen database, termasuk pembuatan user, backup, dan optimasi performa.'),
(2, 'Simulasi Serangan dan Pertahanan Jaringan', 'Diskusi dan praktik tentang firewall, enkripsi data, dan pencegahan serangan jaringan.'),
(3, 'Penerapan Algoritma Kecerdasan Buatan', 'Penerapan algoritma AI seperti decision tree dan neural network pada studi kasus sederhana.'),
(4, 'Penyelesaian Persamaan Numerik', 'Penyelesaian persoalan matematika menggunakan metode numerik seperti bisection dan regula falsi.'),
(5, 'Pengembangan Aplikasi Mobile', 'Pembuatan aplikasi Android menggunakan Android Studio dan bahasa Kotlin.'),
(6, 'Latihan CRUD dalam Web Programming', 'Pengembangan halaman web interaktif menggunakan HTML, CSS, JavaScript, dan PHP.'),
(7, 'Desain Sistem Berbasis OOP', 'Mahasiswa membuat desain perangkat lunak menggunakan prinsip OOP dan UML diagram.');

-- --------------------------------------------------------

--
-- Table structure for table `data_change_requests`
--

CREATE TABLE `data_change_requests` (
  `id` int NOT NULL,
  `id_pegawai` smallint NOT NULL,
  `field_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `requested_value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requested_at` datetime NOT NULL,
  `processed_at` datetime DEFAULT NULL,
  `admin_notes` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `data_change_requests`
--

INSERT INTO `data_change_requests` (`id`, `id_pegawai`, `field_name`, `current_value`, `requested_value`, `reason`, `status`, `requested_at`, `processed_at`, `admin_notes`) VALUES
(1, 1, '-', '-', '-', '-', '-', '2025-05-24 05:01:21', NULL, NULL);

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

--
-- Dumping data for table `presensi`
--

INSERT INTO `presensi` (`id_presensi`, `id_pegawai`, `tanggal`, `status`, `jam_masuk`, `jam_keluar`) VALUES
(1, 1, '2022-08-06', 'Hadir', '07:50:00', NULL),
(2, 2, '2022-08-05', 'Hadir', '07:51:00', NULL),
(3, 3, '2022-08-03', 'Hadir', '07:50:00', NULL),
(4, 4, '2022-08-02', 'Hadir', '07:51:00', NULL),
(5, 1, '2022-08-06', 'Pulang', NULL, '16:09:00'),
(6, 2, '2022-08-05', 'Pulang', NULL, '16:10:00'),
(7, 3, '2022-08-03', 'Pulang', NULL, '16:09:00'),
(8, 4, '2022-08-02', 'Pulang', NULL, '16:10:00');

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_bagian`
--

CREATE TABLE `simpeg_bagian` (
  `id_bagian` tinyint NOT NULL,
  `nama_bagian` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `simpeg_bagian`
--

INSERT INTO `simpeg_bagian` (`id_bagian`, `nama_bagian`) VALUES
(1, 'Jurusan'),
(2, 'Kepegawaian'),
(3, 'Akademik'),
(4, 'Tata Usaha'),
(5, 'Keuangan'),
(6, 'Perencanaan'),
(7, 'UPT TIK'),
(8, 'Akademik dan Kerjasa'),
(9, 'PSI dan Perencanaan'),
(10, 'Perpustakaan'),
(11, 'UP3M'),
(12, 'P3MP'),
(13, 'Lab Bahasa'),
(15, '-');

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_jabatan_fungsional`
--

CREATE TABLE `simpeg_jabatan_fungsional` (
  `id_jabatan_fungsional` int NOT NULL,
  `nama_jabatan_fungsional` varchar(30) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `simpeg_jabatan_fungsional`
--

INSERT INTO `simpeg_jabatan_fungsional` (`id_jabatan_fungsional`, `nama_jabatan_fungsional`) VALUES
(1, 'Calon Tenaga Kerja'),
(2, 'Tenaga Pengajar'),
(3, 'Asisten Ahli'),
(4, 'Lektor'),
(5, 'Lektor Kepala'),
(6, 'Guru Besar'),
(7, '-');

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_jabatan_struktural`
--

CREATE TABLE `simpeg_jabatan_struktural` (
  `id_jabatan_struktural` smallint NOT NULL,
  `id_jurusan` int DEFAULT NULL,
  `nama_jabatan_struktural` varchar(100) COLLATE latin1_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `simpeg_jabatan_struktural`
--

INSERT INTO `simpeg_jabatan_struktural` (`id_jabatan_struktural`, `id_jurusan`, `nama_jabatan_struktural`) VALUES
(1, 10, 'Direktur'),
(2, 10, 'Wakil Direktur I'),
(3, 10, 'Wakil Direktur II'),
(4, 10, 'Wakil Direktur III'),
(5, 10, 'Wakil Direktur IV'),
(6, 10, 'Ketua Jurusan'),
(7, 10, 'Seketaris Jurusan'),
(8, 10, 'Kepala Unit Pelayanan Teknis (UPT)'),
(9, 10, 'Kepala Program Studi'),
(10, 10, 'Kepala Laboratorium'),
(11, 10, 'KABAG UMUM & KEUANGAN'),
(12, 10, 'KASUBAG KEUANGAN'),
(13, 10, 'SEK PRODI'),
(15, 10, 'KASUBAG KEPEGAWAIAN'),
(16, 10, 'KASUBAG TATA USAHA'),
(17, 10, 'KASUBAG AKADEMIK KEMAHASISWAAN'),
(18, 10, 'KASUBAG PERENCANAAN'),
(19, 10, 'KABAG AKADEMIK KEMAHASISWAAN DAN PERENCANAAN'),
(20, NULL, '-\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_level_pendidikan`
--

CREATE TABLE `simpeg_level_pendidikan` (
  `id_level_pendidikan` smallint NOT NULL,
  `nama_level_pendidikan` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `simpeg_level_pendidikan`
--

INSERT INTO `simpeg_level_pendidikan` (`id_level_pendidikan`, `nama_level_pendidikan`) VALUES
(1, 'SD'),
(2, 'SMP'),
(3, 'SMA'),
(4, 'SMK'),
(5, 'D I'),
(6, 'D II'),
(7, 'D III'),
(8, 'D IV'),
(9, 'S1'),
(10, 'S2'),
(11, 'S3'),
(12, 'Post Doctor');

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_pangkat_gol_ruang`
--

CREATE TABLE `simpeg_pangkat_gol_ruang` (
  `id_pangkat_gol_ruang` int NOT NULL,
  `nama_pangkat_gol_ruang` varchar(50) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `simpeg_pangkat_gol_ruang`
--

INSERT INTO `simpeg_pangkat_gol_ruang` (`id_pangkat_gol_ruang`, `nama_pangkat_gol_ruang`) VALUES
(1, 'Juru Muda (I/a)'),
(2, 'Juru Muda Tingkat I (I/b)'),
(3, 'Juru (I/c)'),
(4, 'Juru Tingkat I (I/d)'),
(5, 'Pengatur Muda (II/a)'),
(6, 'Pengatur Muda Tingkat I (II/b)'),
(7, 'Pengatur (II/c)'),
(8, 'Pengatur Tingkat I (II/d)'),
(9, 'Penata Muda (III/a)'),
(10, 'Penata Muda Tingkat I (III/b)'),
(11, 'Penata (III/c)'),
(12, 'Penata Tingkat I (III/d)'),
(13, 'Pembina (IV/a)'),
(14, 'Pembina Tingkat I (IV/b)'),
(15, 'Pembina Utama Muda (IV/c)'),
(16, 'Pembina Utama Madya (IV/d)'),
(17, 'Pembina Utama (IV/e)'),
(19, 'CPNS'),
(20, 'PNS');

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
(2, 'AGUS SETIYO BUDI N, ST, M.KOM', '0011087508', '197508112000121002', '-', '-', '1750186489949.jpg'),
(3, 'SUHADI, A.MD', '-', '19650617199003100', '-', '-', 'blm_ada_foto.jpg'),
(4, 'DRA. HJ. MASNUNAWATI, MM.AP', '-', '196403151988032002', '-', '-', 'blm_ada_foto.jpg'),
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
(714, 'Perrell Laquarius Brown', '4356456456', '546546456456456544', '6786773553245234', 'frsdfdsfdsfsdfsdfsdfsdfsdfasdasdasda', '1750179270578.jpeg'),
(715, 'werewrwer', 'werewrwere', 'rewrewrwerewqweqwe', 'rewrewrwerwerwer', 'werwerwerwerwer', 'blm_ada_foto.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_pendanaan`
--

CREATE TABLE `simpeg_pendanaan` (
  `id_pendanaan` smallint NOT NULL,
  `pendanaan` varchar(50) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `simpeg_pendanaan`
--

INSERT INTO `simpeg_pendanaan` (`id_pendanaan`, `pendanaan`) VALUES
(1, 'Biaya Sendiri'),
(2, 'Biaya Instansi Sendiri'),
(3, 'Lembaga Swasta Kerjasama'),
(4, 'Lembaga Swasta Kompetisi'),
(5, 'Lembaga Pemerintah Kerjasama'),
(6, 'Lembaga Pemerintah Kompetisi'),
(7, 'Lembaga  Internasional');

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_riwayat_pangkat`
--

CREATE TABLE `simpeg_riwayat_pangkat` (
  `id_riwayat_pangkat` int NOT NULL,
  `id_pegawai` smallint NOT NULL,
  `id_pangkat_gol_ruang` int NOT NULL,
  `tmt_pangkat_gol_ruang` date NOT NULL,
  `no_sk` varchar(30) NOT NULL,
  `tgl_sk` date NOT NULL,
  `pejabat_penetap` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `simpeg_riwayat_pangkat`
--

INSERT INTO `simpeg_riwayat_pangkat` (`id_riwayat_pangkat`, `id_pegawai`, `id_pangkat_gol_ruang`, `tmt_pangkat_gol_ruang`, `no_sk`, `tgl_sk`, `pejabat_penetap`) VALUES
(49, 4, 14, '2020-02-07', '47342/A4.2/KP/2012', '2020-02-07', 'Muslikh, S.H'),
(55, 4, 19, '1988-03-01', '33370/A2.I.B/C/1988', '1988-04-28', 'Sihombing, BA'),
(93, 6, 12, '2010-04-01', '347/K16/KP/2010', '2010-05-04', 'Murdjani, ST, M.Pd, MT'),
(94, 6, 19, '1983-03-01', '34116/C/3/1983', '1983-03-31', 'Drs. M. Ibrahim'),
(95, 6, 5, '1984-06-01', '100/PT/10-01.02./C 84', '2017-04-26', 'Drs. H. Rusdi Saleh'),
(142, 1, 12, '2016-06-01', '295/PL18/KP/2016', '2016-05-23', 'H.Edi Yohanes, ST., MT'),
(336, 3, 19, '1990-03-01', '51780/A2.IV.2/C/1990', '1990-06-30', 'Drs. Jonner Pardosi'),
(337, 3, 5, '1990-03-01', '021/PT10.H15.5/C/1992', '1992-01-22', 'S. Muhammad'),
(338, 3, 11, '2015-04-01', '36836/A4.4/KP2015', '2015-05-11', 'Dra. Garti Sri Utami, MED.'),
(461, 2, 9, '2002-06-01', '886/N18.R/KP/2002', '2002-07-01', 'Ir.H.Muhammad Suhaimi'),
(462, 1, 1, '0000-00-00', '', '0000-00-00', ''),
(463, 2, 10, '2004-10-01', '740/N18.R/KP/2004', '2004-12-07', 'Ir.H.Muhammad Suhaimi'),
(464, 2, 11, '2008-10-01', '152/K16/KP/2009', '2009-02-18', 'Murdjani, ST., M.Pd'),
(465, 2, 12, '2011-04-01', '189/K16/KP/2011', '2011-07-01', 'Ir.Darmawani, MT'),
(466, 2, 13, '2016-04-01', '49315/A2.3/KP/2015', '2016-06-30', 'Ari Hendrarto Saleh, S.E.,M.Si.'),
(513, 3, 12, '2017-10-01', '98534/A2.3/KP/2017', '2017-10-05', 'taufan Sudrajat, S.E., M.Si.'),
(514, 7, 12, '2017-10-01', '98535/A2.3/KP/2017', '2017-10-05', 'Taufan Sudrajat, S.E., M.Si.'),
(574, 7, 11, '2015-04-01', '36837/A4.4/KP/2015', '2015-05-11', 'Dra. Garti Sri Utami, M.ED'),
(575, 7, 5, '1992-03-01', '014/PT10.H15.5/C/1994', '1994-01-06', 'S. Muhammad'),
(612, 7, 19, '1992-03-01', '37682/A2.IV.2/C/1992', '1992-07-22', 'Drs. Jonner Pardosi'),
(664, 5, 12, '2017-10-01', '98510/A2.3/KP/2017', '2017-10-05', 'Taufan Sudrajat, S.E., M.Si.'),
(1098, 2, 19, '2000-12-01', '188/N18.R/KP/2001', '2001-04-24', 'Ir.H.Muhammad Suhaimi'),
(1099, 2, 20, '0000-00-00', '683/N18.R/KP/2002', '2002-01-09', 'Ir.H.Muhammad Suhaimi');

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_riwayat_pendidikan`
--

CREATE TABLE `simpeg_riwayat_pendidikan` (
  `id_riwayat_pendidikan` int NOT NULL,
  `id_pegawai` smallint NOT NULL,
  `id_level_pendidikan` smallint NOT NULL,
  `nama_pendidikan` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `total_sks` int NOT NULL,
  `ipk` decimal(4,2) NOT NULL,
  `fakultas_jurusan_prodi` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `tempat` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `nama_pimpinan` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `id_pendanaan` smallint NOT NULL,
  `id_status` smallint NOT NULL,
  `thn_masuk` year NOT NULL,
  `thn_lulus` year NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `simpeg_riwayat_pendidikan`
--

INSERT INTO `simpeg_riwayat_pendidikan` (`id_riwayat_pendidikan`, `id_pegawai`, `id_level_pendidikan`, `nama_pendidikan`, `total_sks`, `ipk`, `fakultas_jurusan_prodi`, `tempat`, `nama_pimpinan`, `id_pendanaan`, `id_status`, `thn_masuk`, `thn_lulus`) VALUES
(7, 2, 2, 'SMPN 3 SIDOARJO', 0, 0.00, '-', 'Kabupaten Sidoarjo', 'Soeharto, BA', 1, 1, '1987', '1990'),
(8, 2, 3, 'SMAN 1 SIDOARJO ', 0, 0.00, '-', 'Buduran Kabupaten Sidoarjo', 'Abdul Mukti, BA', 1, 1, '1990', '1993'),
(9, 2, 1, 'SDN BANGAH', 0, 0.00, '-', 'Gedangan Kabupaten Sidoarjo', 'Warsijadi', 1, 1, '1981', '1987'),
(16, 2, 7, 'PENS-ITS', 0, 0.00, 'Teknik Elektro / Elektronika', '-', 'Ir. Susanto', 1, 1, '0000', '1996'),
(18, 2, 9, 'ITS (Institut Teknologi Sepuluh November)', 0, 0.00, 'Teknik Elektro / Elektonika', '-', 'Prof. Ir. Soegiono', 1, 1, '0000', '2000'),
(19, 2, 10, 'ITS', 0, 0.00, 'FTIF / Teknik Infomatika', '-', 'Prof. Ir. Soegiono', 1, 1, '0000', '2006'),
(102, 4, 10, 'Manajemen Unlam', 0, 0.00, 'Akuntansi Pemerintahan', 'Jl. Brigjend H. Hasan Basri', 'Prof.Ir.H. Muhammad Rasmadi, MS', 1, 1, '2007', '2008'),
(117, 6, 9, 'STIA Bina Banua Banjarmasin', 160, 2.44, 'Ilmu Administrasi Negara', 'Banjarmasin', 'Drs. H. Umar Hamdan', 1, 1, '1993', '1997'),
(137, 1, 10, 'ULM/FKIP', 0, 0.00, 'MANAJEMEN PENDIDIKAN', 'Banjarmasin', 'Prof.Ir. H.Muhammad Rasmadi, MS', 1, 1, '0000', '2006'),
(187, 1, 9, 'Universitas Muhammadiyah Yogyakarta', 0, 0.00, 'Teknik Elektro / Teknik Telekomunikasi', 'Yogyakarta', 'Prof.Dr.H. Achmad Mursyidi, M.Sc', 1, 1, '1994', '2000'),
(213, 3, 7, 'Politeknik Negeri Banjarmasin', 0, 0.00, 'Teknik Elektro', 'Jalan Brigjen H.Hasan Basri Komp ULM Banjarmasin', 'Ir. H. Muhammad Suhaimi', 1, 1, '2000', '2003'),
(252, 1, 10, 'UNIVERSITAS BRAWIJAYA', 0, 0.00, 'TEKNIK ELEKTRO', 'MALANG JAWA TIMUR', 'Prof', 6, 1, '2008', '2011'),
(526, 7, 4, 'Sekolah Teknologi Menengah', 0, 0.00, 'Listrik', '-', 'Haji Indar.A', 1, 1, '1981', '1984');

-- --------------------------------------------------------

--
-- Table structure for table `simpeg_status_pegawai`
--

CREATE TABLE `simpeg_status_pegawai` (
  `id_status_pegawai` tinyint NOT NULL,
  `nama_status_pegawai` varchar(50) COLLATE latin1_general_ci NOT NULL DEFAULT '',
  `aktif` char(1) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `simpeg_status_pegawai`
--

INSERT INTO `simpeg_status_pegawai` (`id_status_pegawai`, `nama_status_pegawai`, `aktif`) VALUES
(1, 'Dosen Tetap', ''),
(2, 'Dosen - CPNS', ''),
(3, 'Dosen Honorer', ''),
(4, 'Administrasi Akademik', ''),
(5, 'Administrasi Umum', ''),
(6, 'PLP (Pranata Laboran Pendidikan)', ''),
(7, 'Teknisi', ''),
(9, 'Prakom', ''),
(10, 'Pustakawan', ''),
(11, 'Pindah (Keluar Poliban)', ''),
(44, 'Pensiun', ''),
(45, 'Tendik-PLP', ''),
(46, 'Tendik-Pranata Komputer', ''),
(47, 'Tendik-Pustakawan', ''),
(48, 'Tendik-Administrasi', ''),
(49, 'Tenaga PPNPN (Honorer)', ''),
(50, 'Meninggal', ''),
(51, 'Berhenti', ''),
(52, 'Dosen Tetap Non PNS', ''),
(53, '-', '');

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
(2, 3, '197508112000121002', 'AGUS197508112000121002', 'AGUS SETIYO BUDI N, ST, M.KOM', NULL, '081256761900', 'Y', 'N', NULL),
(3, 3, '196506171990031003', 'SUHADI196506171990031003', 'SUHADI, A.MD', NULL, NULL, 'Y', 'N', NULL),
(4, 1, '197609212006041002', 'JONI197609212006041002 ', 'JONI RIADI, S.ST., M.T', NULL, '0821 4900 0777', 'Y', 'N', NULL);

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
-- Indexes for table `aktivitas_kelas`
--
ALTER TABLE `aktivitas_kelas`
  ADD PRIMARY KEY (`id_aktivitas_kelas`);

--
-- Indexes for table `data_change_requests`
--
ALTER TABLE `data_change_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pegawai` (`id_pegawai`);

--
-- Indexes for table `presensi`
--
ALTER TABLE `presensi`
  ADD PRIMARY KEY (`id_presensi`),
  ADD KEY `id_pegawai` (`id_pegawai`);

--
-- Indexes for table `simpeg_bagian`
--
ALTER TABLE `simpeg_bagian`
  ADD PRIMARY KEY (`id_bagian`);

--
-- Indexes for table `simpeg_jabatan_fungsional`
--
ALTER TABLE `simpeg_jabatan_fungsional`
  ADD PRIMARY KEY (`id_jabatan_fungsional`);

--
-- Indexes for table `simpeg_jabatan_struktural`
--
ALTER TABLE `simpeg_jabatan_struktural`
  ADD PRIMARY KEY (`id_jabatan_struktural`);

--
-- Indexes for table `simpeg_level_pendidikan`
--
ALTER TABLE `simpeg_level_pendidikan`
  ADD PRIMARY KEY (`id_level_pendidikan`);

--
-- Indexes for table `simpeg_pangkat_gol_ruang`
--
ALTER TABLE `simpeg_pangkat_gol_ruang`
  ADD PRIMARY KEY (`id_pangkat_gol_ruang`);

--
-- Indexes for table `simpeg_pegawai`
--
ALTER TABLE `simpeg_pegawai`
  ADD PRIMARY KEY (`id_pegawai`);

--
-- Indexes for table `simpeg_pendanaan`
--
ALTER TABLE `simpeg_pendanaan`
  ADD PRIMARY KEY (`id_pendanaan`);

--
-- Indexes for table `simpeg_riwayat_pangkat`
--
ALTER TABLE `simpeg_riwayat_pangkat`
  ADD PRIMARY KEY (`id_riwayat_pangkat`),
  ADD KEY `id_pangkat_gol_ruang` (`id_pangkat_gol_ruang`),
  ADD KEY `id_pegawai` (`id_pegawai`);

--
-- Indexes for table `simpeg_riwayat_pendidikan`
--
ALTER TABLE `simpeg_riwayat_pendidikan`
  ADD PRIMARY KEY (`id_riwayat_pendidikan`) USING BTREE,
  ADD KEY `id_level_pendidikan` (`id_level_pendidikan`),
  ADD KEY `id_pendanaan` (`id_pendanaan`),
  ADD KEY `id_pegawai` (`id_pegawai`);

--
-- Indexes for table `simpeg_status_pegawai`
--
ALTER TABLE `simpeg_status_pegawai`
  ADD PRIMARY KEY (`id_status_pegawai`);

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
-- AUTO_INCREMENT for table `aktivitas_kelas`
--
ALTER TABLE `aktivitas_kelas`
  MODIFY `id_aktivitas_kelas` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `data_change_requests`
--
ALTER TABLE `data_change_requests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `presensi`
--
ALTER TABLE `presensi`
  MODIFY `id_presensi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `simpeg_bagian`
--
ALTER TABLE `simpeg_bagian`
  MODIFY `id_bagian` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `simpeg_jabatan_struktural`
--
ALTER TABLE `simpeg_jabatan_struktural`
  MODIFY `id_jabatan_struktural` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `simpeg_level_pendidikan`
--
ALTER TABLE `simpeg_level_pendidikan`
  MODIFY `id_level_pendidikan` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `simpeg_pangkat_gol_ruang`
--
ALTER TABLE `simpeg_pangkat_gol_ruang`
  MODIFY `id_pangkat_gol_ruang` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `simpeg_pegawai`
--
ALTER TABLE `simpeg_pegawai`
  MODIFY `id_pegawai` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=716;

--
-- AUTO_INCREMENT for table `simpeg_pendanaan`
--
ALTER TABLE `simpeg_pendanaan`
  MODIFY `id_pendanaan` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `simpeg_riwayat_pangkat`
--
ALTER TABLE `simpeg_riwayat_pangkat`
  MODIFY `id_riwayat_pangkat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1100;

--
-- AUTO_INCREMENT for table `simpeg_riwayat_pendidikan`
--
ALTER TABLE `simpeg_riwayat_pendidikan`
  MODIFY `id_riwayat_pendidikan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=539;

--
-- AUTO_INCREMENT for table `simpeg_status_pegawai`
--
ALTER TABLE `simpeg_status_pegawai`
  MODIFY `id_status_pegawai` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_level`
--
ALTER TABLE `user_level`
  MODIFY `id_level` tinyint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_change_requests`
--
ALTER TABLE `data_change_requests`
  ADD CONSTRAINT `data_change_requests_ibfk_1` FOREIGN KEY (`id_pegawai`) REFERENCES `simpeg_pegawai` (`id_pegawai`);

--
-- Constraints for table `presensi`
--
ALTER TABLE `presensi`
  ADD CONSTRAINT `presensi_ibfk_1` FOREIGN KEY (`id_pegawai`) REFERENCES `simpeg_pegawai` (`id_pegawai`);

--
-- Constraints for table `simpeg_riwayat_pangkat`
--
ALTER TABLE `simpeg_riwayat_pangkat`
  ADD CONSTRAINT `simpeg_riwayat_pangkat_ibfk_2` FOREIGN KEY (`id_pangkat_gol_ruang`) REFERENCES `simpeg_pangkat_gol_ruang` (`id_pangkat_gol_ruang`),
  ADD CONSTRAINT `simpeg_riwayat_pangkat_ibfk_3` FOREIGN KEY (`id_pegawai`) REFERENCES `simpeg_pegawai` (`id_pegawai`);

--
-- Constraints for table `simpeg_riwayat_pendidikan`
--
ALTER TABLE `simpeg_riwayat_pendidikan`
  ADD CONSTRAINT `simpeg_riwayat_pendidikan_ibfk_2` FOREIGN KEY (`id_level_pendidikan`) REFERENCES `simpeg_level_pendidikan` (`id_level_pendidikan`),
  ADD CONSTRAINT `simpeg_riwayat_pendidikan_ibfk_3` FOREIGN KEY (`id_pendanaan`) REFERENCES `simpeg_pendanaan` (`id_pendanaan`),
  ADD CONSTRAINT `simpeg_riwayat_pendidikan_ibfk_4` FOREIGN KEY (`id_pegawai`) REFERENCES `simpeg_pegawai` (`id_pegawai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
