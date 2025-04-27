const express = require('express');
const router = express.Router();
const pegawaiController = require('../controllers/pegawaiController');

/**
 * @swagger
 * /api/pegawai:
 *   get:
 *     summary: Get all employees
 *     tags: [Pegawai]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of employees
 */
router.get('/pegawai', pegawaiController.getAllPegawai);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   get:
 *     summary: Get a single employee by ID
 *     tags: [Pegawai]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee
 *     responses:
 *       200:
 *         description: Successfully retrieved employee
 */
router.get('/pegawai/:id', pegawaiController.getPegawaiById);

/**
 * @swagger
 * /api/pegawai:
 *   post:
 *     summary: Create a new employee
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
 *                 description: Name of the employee
 *               email:
 *                 type: string
 *                 description: Email of the employee
 *               jabatan:
 *                 type: string
 *                 description: Job position of the employee
 *     responses:
 *       201:
 *         description: Successfully created employee
 */
router.post('/pegawai', pegawaiController.createPegawai);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   put:
 *     summary: Update an existing employee by ID
 *     tags: [Pegawai]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: Name of the employee
 *               email:
 *                 type: string
 *                 description: Email of the employee
 *               jabatan:
 *                 type: string
 *                 description: Job position of the employee
 *     responses:
 *       200:
 *         description: Successfully updated employee
 */
router.put('/pegawai/:id', pegawaiController.updatePegawai);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Pegawai]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted employee
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
