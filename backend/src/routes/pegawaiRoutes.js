const express = require('express');
const router = express.Router();
const pegawaiController = require('../controllers/pegawaiController');

/**
 * @swagger
 * tags:
 *   - name: Pegawai
 *     description: Manajemen data pegawai
 *   - name: Presensi Dosen
 *     description: Manajemen presensi dosen
 */

/**
 * @swagger
 * /api/pegawai:
 *   get:
 *     summary: Ambil semua daftar pegawai
 *     tags: [Pegawai]
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar pegawai
 */
router.get('/pegawai', pegawaiController.getAllPegawai);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   get:
 *     summary: Ambil satu data pegawai berdasarkan ID
 *     tags: [Pegawai]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dari pegawai
 *     responses:
 *       200:
 *         description: Berhasil mengambil data pegawai
 */
router.get('/pegawai/:id', pegawaiController.getPegawaiById);

/**
 * @swagger
 * /api/pegawai:
 *   post:
 *     summary: Tambah pegawai baru
 *     tags: [Pegawai]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_pegawai:
 *                 type: string
 *                 description: Nama Pegawai
 *               panggilan:
 *                 type: string
 *                 description: Nama panggilan pegawai
 *               jk:
 *                 type: string
 *                 description: Jenis kelamin (L/P)
 *               tempat_lahir:
 *                 type: string
 *                 description: Tempat lahir pegawai
 *               nama_ibu:
 *                 type: string
 *                 description: Nama ibu kandung pegawai
 *               tgl_lahir:
 *                 type: string
 *                 format: date
 *                 description: Tanggal lahir pegawai
 *               nip_lama:
 *                 type: string
 *                 description: NIP lama pegawai
 *               nip_baru:
 *                 type: string
 *                 description: NIP baru pegawai
 *               alamat:
 *                 type: string
 *                 description: Alamat lengkap pegawai
 *               kota:
 *                 type: string
 *                 description: Kota domisili pegawai
 *               kode_pos:
 *                 type: string
 *                 description: Kode pos
 *               telpon:
 *                 type: string
 *                 description: Nomor telepon rumah
 *               handphone:
 *                 type: string
 *                 description: Nomor handphone
 *               email:
 *                 type: string
 *                 description: Email pribadi pegawai
 *               email_poliban:
 *                 type: string
 *                 description: Email Poliban pegawai
 *               website:
 *                 type: string
 *                 description: Website pribadi pegawai
 *     responses:
 *       201:
 *         description: Berhasil menambah pegawai
 */
router.post('/pegawai', pegawaiController.createPegawai);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   put:
 *     summary: Perbarui data pegawai berdasarkan ID
 *     tags: [Pegawai]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pegawai yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_pegawai:
 *                 type: string
 *               panggilan:
 *                 type: string
 *               jk:
 *                 type: string
 *               tempat_lahir:
 *                 type: string
 *               nama_ibu:
 *                 type: string
 *               tgl_lahir:
 *                 type: string
 *                 format: date
 *               nip_lama:
 *                 type: string
 *               nip_baru:
 *                 type: string
 *               alamat:
 *                 type: string
 *               kota:
 *                 type: string
 *               kode_pos:
 *                 type: string
 *               telpon:
 *                 type: string
 *               handphone:
 *                 type: string
 *               email:
 *                 type: string
 *               email_poliban:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       200:
 *         description: Berhasil memperbarui data pegawai
 */
router.put('/pegawai/:id', pegawaiController.updatePegawai);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   delete:
 *     summary: Hapus data pegawai berdasarkan ID
 *     tags: [Pegawai]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pegawai yang akan dihapus
 *     responses:
 *       200:
 *         description: Berhasil menghapus pegawai
 */
router.delete('/pegawai/:id', pegawaiController.deletePegawai);

/**
 * @swagger
 * /api/presensi-dosen:
 *   post:
 *     summary: Rekam presensi dosen
 *     tags: [Presensi Dosen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dosen_id:
 *                 type: string
 *                 description: ID dosen
 *               waktu_presensi:
 *                 type: string
 *                 format: date-time
 *                 description: Waktu presensi
 *     responses:
 *       201:
 *         description: Berhasil merekam presensi dosen
 */
router.post('/presensi-dosen', pegawaiController.presensiDosen);

module.exports = router;
