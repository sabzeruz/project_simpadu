-- CreateTable
CREATE TABLE `data_change_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pegawai_id` SMALLINT NOT NULL,
    `field_name` VARCHAR(191) NOT NULL,
    `current_value` TEXT NOT NULL,
    `requested_value` TEXT NOT NULL,
    `reason` TEXT NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `requested_at` DATETIME(3) NOT NULL,
    `processed_at` DATETIME(3) NULL,
    `admin_notes` TEXT NULL,

    INDEX `data_change_requests_pegawai_id_fkey`(`pegawai_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_agama` (
    `id_agama` TINYINT NOT NULL DEFAULT 0,
    `nama_agama` VARCHAR(100) NOT NULL,
    `id_feeder` TINYINT NULL,

    PRIMARY KEY (`id_agama`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_darah` (
    `id_darah` SMALLINT NOT NULL AUTO_INCREMENT,
    `nama_darah` TEXT NOT NULL,

    PRIMARY KEY (`id_darah`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_jk` (
    `id_jk` SMALLINT NOT NULL AUTO_INCREMENT,
    `nama_jk` TEXT NOT NULL,
    `ket` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id_jk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_jurusan` (
    `id_jurusan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jurusan` VARCHAR(100) NULL,

    PRIMARY KEY (`id_jurusan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_kabupaten` (
    `id_kabupaten` CHAR(10) NOT NULL,
    `nama_kabupaten` VARCHAR(50) NULL,
    `id_provinsi` CHAR(2) NULL,

    PRIMARY KEY (`id_kabupaten`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_pendidikan` (
    `id_pendidikan` CHAR(2) NOT NULL,
    `nama_pendidikan` VARCHAR(50) NULL,

    PRIMARY KEY (`id_pendidikan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_prodi` (
    `id_prodi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jurusan` INTEGER NULL,
    `nama_prodi` VARCHAR(100) NULL,
    `singkatan` VARCHAR(100) NULL,

    INDEX `id_jurusan`(`id_jurusan`),
    PRIMARY KEY (`id_prodi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_provinsi` (
    `id_prov` CHAR(2) NOT NULL,
    `nama_prov` TINYTEXT NOT NULL,

    PRIMARY KEY (`id_prov`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_status_hidup` (
    `id_status_hidup` CHAR(1) NOT NULL DEFAULT '',
    `nama_status_hidup` VARCHAR(50) NULL,

    PRIMARY KEY (`id_status_hidup`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kol_wilayah` (
    `id_wil` CHAR(8) NOT NULL,
    `nm_wil` VARCHAR(50) NOT NULL,
    `id_induk_wilayah` VARCHAR(50) NULL,
    `id_level_wil` INTEGER NOT NULL,

    INDEX `id_induk_wilayah`(`id_induk_wilayah`),
    INDEX `id_wil`(`id_wil`),
    PRIMARY KEY (`id_wil`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permintaan_perubahan_data` (
    `id_permintaan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pegawai` INTEGER NOT NULL,
    `tanggal_permintaan` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status_permintaan` ENUM('pending', 'approved', 'rejected') NULL DEFAULT 'pending',
    `tanggal_persetujuan` DATETIME(0) NULL,
    `id_admin` INTEGER NULL,
    `data_lama` LONGTEXT NULL,
    `data_baru` LONGTEXT NULL,
    `keterangan` TEXT NULL,

    PRIMARY KEY (`id_permintaan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siap_dosen` (
    `id_dosen` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kelas_mk` INTEGER NULL,
    `id_pegawai` SMALLINT NULL DEFAULT 0,
    `no` BOOLEAN NULL DEFAULT false,
    `ket` TEXT NULL,
    `pembagi` TINYINT NULL DEFAULT 16,

    INDEX `id_kelas_mk`(`id_kelas_mk`),
    INDEX `id_pegawai`(`id_pegawai`),
    PRIMARY KEY (`id_dosen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `simpeg_bagian` (
    `id_bagian` TINYINT NOT NULL,
    `nama_bagian` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_bagian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `simpeg_jabatan_fungsional` (
    `id_jabatan_fungsional` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jabatan_fungsional` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id_jabatan_fungsional`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `simpeg_jabatan_fungsional_kependidikan` (
    `id_jabatan_fungsional` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jabatan_fungsional` VARCHAR(30) NOT NULL,
    `tingkat` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_jabatan_fungsional`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `simpeg_jabatan_struktural` (
    `id_jabatan_struktural` SMALLINT NOT NULL AUTO_INCREMENT,
    `id_jurusan` INTEGER NULL,
    `nama_jabatan_struktural` VARCHAR(100) NOT NULL DEFAULT '',

    PRIMARY KEY (`id_jabatan_struktural`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `simpeg_pangkat_gol_ruang` (
    `id_pangkat_gol_ruang` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pangkat_gol_ruang` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_pangkat_gol_ruang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `simpeg_pegawai` (
    `id_pegawai` SMALLINT NOT NULL AUTO_INCREMENT,
    `nama_pegawai` VARCHAR(60) NULL,
    `panggilan` VARCHAR(150) NULL,
    `jk` CHAR(1) NOT NULL,
    `id_agama` TINYINT NOT NULL,
    `tempat_lahir` VARCHAR(40) NULL,
    `nama_ibu` VARCHAR(60) NULL,
    `tgl_lahir` DATE NULL,
    `nidn` CHAR(10) NOT NULL,
    `nip` VARCHAR(50) NOT NULL,
    `no_ktp` VARCHAR(20) NOT NULL,
    `no_kk` VARCHAR(20) NOT NULL,
    `no_serdos` VARCHAR(15) NULL,
    `no_karpeg` VARCHAR(20) NOT NULL,
    `gol_darah` CHAR(2) NOT NULL,
    `tmt_cpns` DATE NULL,
    `tmt_pns` DATE NULL,
    `id_pendidikan` CHAR(1) NOT NULL,
    `tmt_pensiun` DATE NULL,
    `id_status_hidup` CHAR(1) NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `kota` VARCHAR(100) NULL,
    `kode_pos` VARCHAR(6) NOT NULL,
    `id_wil` CHAR(8) NOT NULL,
    `id_kabupaten` CHAR(10) NOT NULL,
    `id_prov` CHAR(2) NOT NULL,
    `telpon` VARCHAR(13) NOT NULL,
    `handphone` VARCHAR(20) NOT NULL DEFAULT '',
    `email` VARCHAR(255) NOT NULL,
    `email_poliban` VARCHAR(100) NOT NULL,
    `website` VARCHAR(30) NOT NULL,
    `id_jabatan_fungsional` SMALLINT NOT NULL,
    `id_jabatan_struktural` SMALLINT NOT NULL,
    `id_status_pegawai` VARCHAR(4) NOT NULL,
    `id_jurusan` INTEGER NULL,
    `id_bagian` TINYINT NOT NULL,
    `id_prodi` INTEGER NULL,
    `foto` VARCHAR(25) NOT NULL,
    `foto_ktp` VARCHAR(100) NOT NULL,
    `foto_npwp` VARCHAR(100) NOT NULL,
    `foto_karpeg` VARCHAR(100) NOT NULL,
    `foto_surat_nikah` VARCHAR(100) NOT NULL,
    `foto_taspen` VARCHAR(100) NOT NULL,
    `foto_nip` VARCHAR(100) NOT NULL,
    `status_update` BOOLEAN NOT NULL DEFAULT false,
    `status_10_th` BOOLEAN NOT NULL DEFAULT true,
    `status_20_th` BOOLEAN NOT NULL DEFAULT true,
    `status_30_th` BOOLEAN NOT NULL DEFAULT true,

    INDEX `simpeg_pegawai_id_jabatan_struktural_fkey`(`id_jabatan_struktural`),
    INDEX `simpeg_pegawai_id_kabupaten_fkey`(`id_kabupaten`),
    INDEX `simpeg_pegawai_id_prov_fkey`(`id_prov`),
    INDEX `simpeg_pegawai_id_status_pegawai_fkey`(`id_status_pegawai`),
    PRIMARY KEY (`id_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `simpeg_status_pegawai` (
    `id_status_pegawai` TINYINT NOT NULL AUTO_INCREMENT,
    `nama_status_pegawai` VARCHAR(50) NOT NULL DEFAULT '',
    `aktif` CHAR(1) NOT NULL,

    PRIMARY KEY (`id_status_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_level` (
    `id_level` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_level` CHAR(20) NOT NULL,

    PRIMARY KEY (`id_level`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `level` SMALLINT NOT NULL,
    `username` CHAR(35) NOT NULL,
    `password` VARCHAR(100) NULL,
    `nama_lengkap` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `no_telp` VARCHAR(100) NULL,
    `aktif` ENUM('Y', 'N') NOT NULL,
    `blokir` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
    `ket` VARCHAR(255) NULL,

    UNIQUE INDEX `username`(`username`),
    INDEX `users_level_fkey`(`level`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kol_prodi` ADD CONSTRAINT `kol_prodi_ibfk_1` FOREIGN KEY (`id_jurusan`) REFERENCES `kol_jurusan`(`id_jurusan`) ON DELETE RESTRICT ON UPDATE RESTRICT;
