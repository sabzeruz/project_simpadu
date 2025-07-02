// pegawai.routes.js
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fs from 'fs';
import axios from 'axios';
import {
  getAllPegawai,
  createPegawai,
  getPegawaiById,
  updatePegawai,
  deletePegawai,
  getProfilePegawai,
  upload
} from '../controllers/pegawai.controller.js';
import { verifyToken, isAdminPegawai, isPegawai, isOwner } from '../middlewares/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// === CRUD Pegawai (Admin Only) ===
router.post('/', verifyToken, isAdminPegawai, upload.single('foto'), createPegawai);
router.get('/', verifyToken, isAdminPegawai, getAllPegawai);
router.get('/:id', verifyToken, isAdminPegawai, getPegawaiById);
router.put('/:id', verifyToken, isAdminPegawai, upload.single('foto'), updatePegawai);
router.delete('/:id', verifyToken, isAdminPegawai, deletePegawai);

// === Profile Pegawai (Admin & Pegawai/Dosen) ===
router.get('/profile/me', verifyToken, getProfilePegawai);

// === Foto Pegawai (Admin & Pegawai/Dosen) ===
router.get('/profile/foto-pegawai/:filename', verifyToken, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../controllers/uploads', filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'Foto tidak ditemukan' });
    }
  });
});
router.get('/foto-pegawai/:filename', verifyToken, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../controllers/uploads', filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'Foto tidak ditemukan' });
    }
  });
});
router.delete('/foto-pegawai/:filename', verifyToken, isAdminPegawai, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../controllers/uploads', filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'Foto tidak ditemukan' });
    }
    res.status(200).json({ message: 'Foto berhasil dihapus' });
  });
});

// Proxy endpoint untuk jadwal mengajar dosen
router.get('/proxy-jadwal/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `https://ti054d01.agussbn.my.id/api/presensi/matkul-dosen/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: 'Proxy error' });
  }
});
router.post('/proxy-buka', async (req, res) => {
  try {
    const { id_pegawai, id_kelas_mk } = req.body;
    const response = await axios.post(
      'https://ti054d01.agussbn.my.id/api/presensi/buka',
      { id_pegawai, id_kelas_mk }
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: 'Proxy error' });
  }
});
export default router;