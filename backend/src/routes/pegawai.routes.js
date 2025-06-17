// pegawai.routes.js
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fs from 'fs';
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

export default router;