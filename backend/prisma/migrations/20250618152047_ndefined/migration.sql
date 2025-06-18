-- CreateTable
CREATE TABLE `simpeg_pegawai` (
    `id_pegawai` SMALLINT NOT NULL AUTO_INCREMENT,
    `nama_pegawai` VARCHAR(60) NOT NULL,
    `nidn` CHAR(10) NOT NULL,
    `nip` CHAR(18) NOT NULL,
    `nuptk` CHAR(16) NOT NULL,
    `alamat` VARCHAR(255) NULL,
    `foto` VARCHAR(255) NULL DEFAULT 'blm_ada_foto.jpg',

    PRIMARY KEY (`id_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_level` (
    `id_level` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
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

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presensi` (
    `id_presensi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pegawai` SMALLINT NOT NULL,
    `tanggal` DATE NOT NULL,
    `status` ENUM('Hadir', 'Pulang') NOT NULL,
    `jam_masuk` VARCHAR(191) NULL,
    `jam_keluar` VARCHAR(191) NULL,

    INDEX `id_pegawai`(`id_pegawai`),
    PRIMARY KEY (`id_presensi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `presensi` ADD CONSTRAINT `presensi_ibfk_1` FOREIGN KEY (`id_pegawai`) REFERENCES `simpeg_pegawai`(`id_pegawai`) ON DELETE NO ACTION ON UPDATE NO ACTION;
