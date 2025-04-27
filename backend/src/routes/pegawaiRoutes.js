const express = require('express');
const router = express.Router();
const pegawaiController = require('../controllers/pegawaiController');

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
 *               nama:
 *                 type: string
 *                 description: Nama Pegawai
 *               email:
 *                 type: string
 *                 description: Email Pegawai
 *               jabatan:
 *                 type: string
 *                 description: Jabatan Pegawai
 *     responses:
 *       201:
 *         description: Berhasil menambah pegawai 
 */
router.post('/pegawai', pegawaiController.createPegawai);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   put:
 *     summary: memperbarui data pegawai berdasarkan ID
 *     tags: [Pegawai]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pegawai yang bakal diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: Nama pegawai
 *               email:
 *                 type: string
 *                 description: Email pegawai
 *               jabatan:
 *                 type: string
 *                 description: Posisi pegawai
 *     responses:
 *       200:
 *         description: Berhasil memperbarui data pegawai
 */
router.put('/pegawai/:id', pegawaiController.updatePegawai);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   delete:
 *     summary: Menghapus pegawai berdasarkan ID
 *     tags: [Pegawai]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pegawai yang bakal dihapus
 *     responses:
 *       200:
 *         description: Berhasil menghapus pegawai
 */
router.delete('/pegawai/:id', pegawaiController.deletePegawai);

/**
 * @swagger
 * /api/presensi-dosen:
 *   post:
 *     summary: Record lecturer attendance
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
 *                 description: ID of the lecturer
 *               waktu_presensi:
 *                 type: string
 *                 format: date-time
 *                 description: Time of attendance
 *     responses:
 *       201:
 *         description: Successfully recorded lecturer attendance
 */
router.post('/presensi-dosen', pegawaiController.presensiDosen);

module.exports = router;
