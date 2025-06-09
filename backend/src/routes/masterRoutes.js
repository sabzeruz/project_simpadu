const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');
const { verifyToken } = require('../middlewares/auth');

router.get('/jabatan-struktural', verifyToken, masterController.getJabatanStruktural);
router.get('/jabatan-fungsional', verifyToken, masterController.getJabatanFungsional);
router.get('/status-pegawai', verifyToken, masterController.getStatusPegawai);

module.exports = router;