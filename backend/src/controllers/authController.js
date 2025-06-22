import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Login untuk admin dan pegawai
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari user berdasarkan username (pakai findFirst karena username tidak unique di DB)
    const user = await prisma.users.findFirst({
      where: { username }
    });

    if (!user) {
      return res.status(401).json({ message: 'Username tidak ditemukan.' });
    }

    // Cek password (ganti dengan hash compare jika sudah hash)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Password salah.' });
    }

    // Hanya izinkan role 6 (admin pegawai) dan 7 (dosen)
    if (![6, 7].includes(user.level)) {
      return res.status(403).json({ message: 'Akses hanya untuk admin pegawai dan dosen.' });
    }

    // Cari data pegawai (berdasarkan NIP = username)
    const pegawaiData = await prisma.simpeg_pegawai.findFirst({
      where: { nip: user.username }
    });

    // Buat JWT token
    const token = jwt.sign(
      {
        userId: user.id_user,
        role: user.level,
        id_pegawai: pegawaiData ? pegawaiData.id_pegawai : null,
      },
      process.env.JWT_SECRET || 'rahasia',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id_user: user.id_user,
        username: user.username,
        nama_lengkap: user.nama_lengkap,
        level: user.level,
        id_pegawai: pegawaiData ? pegawaiData.id_pegawai : null,
      }
    });
    console.log('User found:', user);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
  }
};

export default { login };