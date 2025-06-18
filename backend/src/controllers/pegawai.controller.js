import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


// Mendapatkan direktori saat ini dalam ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer to use the uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
export { upload };


// Ambil semua pegawai
export const getAllPegawai = async (req, res) => {
  try {
    const pegawaiList = await prisma.simpeg_pegawai.findMany({
      select: {
        id_pegawai: true,
        nama_pegawai: true,
        nidn: true,
        nip: true,
        nuptk: true,
        alamat: true,
        foto: true
      }
    });
    res.json(pegawaiList);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data pegawai',
      error: error.message
    });
  }
};

// Tambah pegawai baru
export const createPegawai = async (req, res) => {
  try {
    const pegawaiData = req.body;
    const foto = req.file ? req.file.filename : undefined;

    // Validasi field wajib
    if (
      !pegawaiData.nama_pegawai ||
      !pegawaiData.nip ||
      !pegawaiData.nidn ||
      !pegawaiData.nuptk
    ) {
      return res.status(400).json({
        message: 'Field wajib: nama_pegawai, nip, nidn, nuptk'
      });
    }

    // Validasi panjang NIP
    if (pegawaiData.nip.length !== 18) {
      return res.status(400).json({ message: 'NIP harus tepat 18 karakter' });
    }
    // Validasi panjang NIDN, NUPTK
    if (pegawaiData.nidn.length > 10) {
      return res.status(400).json({ message: 'NIDN maksimal 10 karakter' });
    }
    if (pegawaiData.nuptk.length > 16) {
      return res.status(400).json({ message: 'NUPTK maksimal 16 karakter' });
    }
    // Validasi alamat
    if (pegawaiData.alamat && pegawaiData.alamat.length > 255) {
      return res.status(400).json({ message: 'Alamat maksimal 255 karakter' });
    }

    // Cek NIP unik
    const existingPegawai = await prisma.simpeg_pegawai.findFirst({
      where: { nip: pegawaiData.nip }
    });
    if (existingPegawai) {
      return res.status(400).json({ message: 'NIP sudah terdaftar' });
    }

    // Siapkan data untuk Prisma
    const dataPegawai = {
      nama_pegawai: pegawaiData.nama_pegawai,
      nidn: pegawaiData.nidn,
      nip: pegawaiData.nip,
      nuptk: pegawaiData.nuptk,
      alamat: pegawaiData.alamat,
      foto: foto || undefined
    };

    const Pegawai = await prisma.simpeg_pegawai.create({
      data: dataPegawai
    });

    res.status(201).json({
      message: 'Pegawai berhasil ditambahkan',
      data: Pegawai
    });

  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambahkan pegawai',
      error: error.message
    });
  }
};

// Ambil detail pegawai berdasarkan ID
export const getPegawaiById = async (req, res) => {
  try {
    const { id } = req.params;
    const idPegawai = parseInt(id);

    if (isNaN(idPegawai)) {
      return res.status(400).json({ message: 'ID Pegawai tidak valid' });
    }

    const pegawai = await prisma.simpeg_pegawai.findUnique({
      where: { id_pegawai: idPegawai },
      select: {
        id_pegawai: true,
        nama_pegawai: true,
        nidn: true,
        nip: true,
        nuptk: true,
        alamat: true,
        foto: true
      }
    });

    if (!pegawai) {
      return res.status(404).json({ message: 'Pegawai tidak ditemukan' });
    }

    return res.json(pegawai);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil detail pegawai',
      error: error.message
    });
  }
};

// Update pegawai
export const updatePegawai = async (req, res) => {
  try {
    const { id } = req.params;
    let pegawaiData = req.body || {};

    // Validasi awal
    if (!pegawaiData || typeof pegawaiData !== 'object' || Array.isArray(pegawaiData)) {
      return res.status(400).json({ message: 'Data update tidak valid' });
    }

    // Cek apakah pegawai ada
    const existingPegawai = await prisma.simpeg_pegawai.findUnique({
      where: { id_pegawai: parseInt(id) }
    });

    if (!existingPegawai) {
      return res.status(404).json({ message: 'Pegawai tidak ditemukan' });
    }

    // Handle upload foto baru
    if (req.file) {
      // Hapus foto lama jika ada dan bukan blm_ada_foto.jpg
      if (existingPegawai.foto && existingPegawai.foto !== 'blm_ada_foto.jpg') {
        const oldPath = path.join(uploadsDir, existingPegawai.foto);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      pegawaiData.foto = req.file.filename;
    }

    // Validasi panjang NIP, NIDN, NUPTK, alamat
    if (pegawaiData.nip && pegawaiData.nip.length !== 18) {
      return res.status(400).json({ message: 'NIP harus tepat 18 karakter' });
    }
    if (pegawaiData.nidn && pegawaiData.nidn.length > 10) {
      return res.status(400).json({ message: 'NIDN maksimal 10 karakter' });
    }
    if (pegawaiData.nuptk && pegawaiData.nuptk.length > 16) {
      return res.status(400).json({ message: 'NUPTK maksimal 16 karakter' });
    }
    if (pegawaiData.alamat && pegawaiData.alamat.length > 255) {
      return res.status(400).json({ message: 'Alamat maksimal 255 karakter' });
    }

    // Hapus property undefined
    Object.keys(pegawaiData).forEach(key => {
      if (pegawaiData[key] === undefined) {
        delete pegawaiData[key];
      }
    });

    const updatedPegawai = await prisma.simpeg_pegawai.update({
      where: { id_pegawai: parseInt(id) },
      data: pegawaiData
    });

    res.json({
      message: 'Data pegawai berhasil diperbarui',
      data: updatedPegawai
    });

  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat memperbarui data pegawai',
      error: error.message
    });
  }
};

// Delete pegawai
export const deletePegawai = async (req, res) => {
  try {
    const { id } = req.params;
    const idPegawai = parseInt(id);

    // Cek apakah pegawai ada
    const existingPegawai = await prisma.simpeg_pegawai.findUnique({
      where: { id_pegawai: idPegawai }
    });

    if (!existingPegawai) {
      return res.status(404).json({ message: 'Pegawai tidak ditemukan' });
    }

    // Hapus pegawai dari database dulu
    await prisma.simpeg_pegawai.delete({
      where: { id_pegawai: idPegawai }
    });

    // Setelah berhasil dihapus dari database, baru hapus file foto jika bukan blm_ada_foto.jpg
    if (existingPegawai.foto && existingPegawai.foto !== 'blm_ada_foto.jpg') {
      const fotoPath = path.join(uploadsDir, existingPegawai.foto);
      if (fs.existsSync(fotoPath)) {
        fs.unlinkSync(fotoPath);
      }
    }

    res.json({ message: 'Pegawai berhasil dihapus' });
  } catch (error) {
    console.error(error); // tambahkan ini untuk debug
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus pegawai',
      error: error.message
    });
  }
};

// Ambil profil pegawai (untuk /profile/me)
export const getProfilePegawai = async (req, res) => {
  try {
    const id_pegawai = req.user.id_pegawai;
    const userId = req.user.userId; // dari JWT

    if (!id_pegawai || typeof id_pegawai !== "number") {
      return res.status(400).json({ message: "ID Pegawai tidak valid" });
    }

    // Ambil data pegawai
    const pegawai = await prisma.simpeg_pegawai.findUnique({
      where: { id_pegawai },
      select: {
        nama_pegawai: true,
        nidn: true,
        nip: true,
        nuptk: true,
        alamat: true,
        foto: true
      }
    });

    // Ambil data user (untuk ambil level)
    const user = await prisma.users.findUnique({
      where: { id_user: userId },
      select: {
        level: true
      }
    });

    if (!pegawai) {
      return res.status(404).json({ message: 'Pegawai tidak ditemukan' });
    }

    // Gabungkan data pegawai dan level user
    return res.json({
      ...pegawai,
      level: user?.level ?? null
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil detail pegawai', 
      error: error.message 
    });
  }
};

// API ringkas
// API ringkasetAllRingkas = async (req, res) => {
export const getAllRingkas = async (req, res) => {
  try {
    const pegawai = await prisma.simpeg_pegawai.findMany({
      select: {
        id_pegawai: true,
        nama_pegawai: true,
        nip: true,
        nidn: true,
        nuptk: true,
        alamat: true,
        foto: true,
      }
    });
    res.json(pegawai);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllPegawai,
  createPegawai,
  getPegawaiById,
  updatePegawai,
  deletePegawai,
  getProfilePegawai,
  getAllRingkas,
  upload};