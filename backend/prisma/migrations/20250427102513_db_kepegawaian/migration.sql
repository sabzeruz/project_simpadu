-- CreateTable
CREATE TABLE `simpeg_pegawai` (
    `id_pegawai` SMALLINT NOT NULL AUTO_INCREMENT,
    `nama_pegawai` VARCHAR(60) NULL,
    `panggilan` VARCHAR(150) NOT NULL,
    `jk` CHAR(1) NOT NULL,
    `tempat_lahir` VARCHAR(40) NULL,
    `nama_ibu` VARCHAR(60) NULL,
    `tgl_lahir` DATE NULL,
    `nip_lama` VARCHAR(25) NULL,
    `nip_baru` VARCHAR(50) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `kota` VARCHAR(100) NULL,
    `kode_pos` VARCHAR(6) NOT NULL,
    `telpon` VARCHAR(13) NOT NULL,
    `handphone` VARCHAR(20) NOT NULL DEFAULT '',
    `email` VARCHAR(255) NOT NULL,
    `email_poliban` VARCHAR(100) NOT NULL,
    `website` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `nip_baru`(`nip_baru`),
    UNIQUE INDEX `email_poliban`(`email_poliban`),
    PRIMARY KEY (`id_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siap_dosen` (
    `id_dosen` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kelas_mk` INTEGER NOT NULL,
    `id_pegawai` SMALLINT NOT NULL,

    INDEX `dosen_kelas_pegawai`(`id_kelas_mk`, `id_pegawai`),
    INDEX `id_pegawai`(`id_pegawai`),
    PRIMARY KEY (`id_dosen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siap_kelas` (
    `id_kelas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kelas` VARCHAR(50) NOT NULL,
    `tahun_ajaran` VARCHAR(9) NOT NULL,

    PRIMARY KEY (`id_kelas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siap_kelas_mk` (
    `id_kelas_mk` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kelas` INTEGER NOT NULL,
    `id_mk` INTEGER NOT NULL,

    INDEX `id_kelas`(`id_kelas`),
    INDEX `id_mk`(`id_mk`),
    PRIMARY KEY (`id_kelas_mk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siap_mhs` (
    `id_mhs` INTEGER NOT NULL AUTO_INCREMENT,
    `nim` VARCHAR(20) NOT NULL,
    `nama_mhs` VARCHAR(100) NOT NULL,
    `id_kelas` INTEGER NOT NULL,

    INDEX `id_kelas`(`id_kelas`),
    PRIMARY KEY (`id_mhs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siap_mk` (
    `id_mk` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_mk` VARCHAR(100) NOT NULL,
    `kode_mk` VARCHAR(10) NOT NULL,
    `sks` INTEGER NOT NULL DEFAULT 3,

    PRIMARY KEY (`id_mk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siap_presensi_mhs` (
    `id_presensi_mhs` INTEGER NOT NULL AUTO_INCREMENT,
    `id_mhs` INTEGER NOT NULL,
    `id_kelas_mk` INTEGER NOT NULL,
    `id_pertemuan` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `tanggal` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_kelas_mk`(`id_kelas_mk`),
    INDEX `id_mhs`(`id_mhs`),
    PRIMARY KEY (`id_presensi_mhs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `siap_dosen` ADD CONSTRAINT `siap_dosen_ibfk_1` FOREIGN KEY (`id_kelas_mk`) REFERENCES `siap_kelas_mk`(`id_kelas_mk`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `siap_dosen` ADD CONSTRAINT `siap_dosen_ibfk_2` FOREIGN KEY (`id_pegawai`) REFERENCES `simpeg_pegawai`(`id_pegawai`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `siap_kelas_mk` ADD CONSTRAINT `siap_kelas_mk_ibfk_1` FOREIGN KEY (`id_kelas`) REFERENCES `siap_kelas`(`id_kelas`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `siap_kelas_mk` ADD CONSTRAINT `siap_kelas_mk_ibfk_2` FOREIGN KEY (`id_mk`) REFERENCES `siap_mk`(`id_mk`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `siap_mhs` ADD CONSTRAINT `siap_mhs_ibfk_1` FOREIGN KEY (`id_kelas`) REFERENCES `siap_kelas`(`id_kelas`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `siap_presensi_mhs` ADD CONSTRAINT `siap_presensi_mhs_ibfk_1` FOREIGN KEY (`id_mhs`) REFERENCES `siap_mhs`(`id_mhs`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `siap_presensi_mhs` ADD CONSTRAINT `siap_presensi_mhs_ibfk_2` FOREIGN KEY (`id_kelas_mk`) REFERENCES `siap_kelas_mk`(`id_kelas_mk`) ON DELETE RESTRICT ON UPDATE RESTRICT;
