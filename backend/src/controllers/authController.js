const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

// Login untuk admin dan pegawai
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', username, password);
    
    // Cari user berdasarkan username
    const user = await prisma.users.findUnique({
      where: { username }
    });
    
    console.log('User found:', user);
    
    if (!user) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }
    
    // Verifikasi password (sebaiknya gunakan bcrypt untuk produksi)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }
    
    // Cek apakah user aktif
    if (user.aktif !== 'Y') {
      return res.status(401).json({ message: 'Akun tidak aktif' });
    }
    
    // Cek apakah user diblokir
    if (user.blokir === 'Y') {
      return res.status(401).json({ message: 'Akun diblokir' });
    }
    
    // Cari data pegawai berdasarkan email atau username (NIP)
    let pegawaiData = null;

    // Jika user adalah admin atau pegawai biasa
    if (user.level === 1 || user.level === 2) {
      console.log('Searching pegawai with email:', user.email, 'or nip:', user.username);

      const whereClause = {
        OR: [
          { nip: user.username }
        ]
      };

      // Add email to the where clause only if it's not null
      if (user.email) {
        whereClause.OR.push({ email: user.email });
      }

      pegawaiData = await prisma.simpeg_pegawai.findFirst({
        where: whereClause,
        select: {
          id_pegawai: true,
          nip: true,
          nama_pegawai: true,
          id_jabatan_struktural: true,
          id_status_pegawai: true,
          panggilan: true,
          jk: true,
          id_agama: true,
          tempat_lahir: true,
          nama_ibu: true,
          tgl_lahir: true,
          nidn: true,
          no_ktp: true,
          no_kk: true,
          no_serdos: true,
          no_karpeg: true,
          gol_darah: true,
          tmt_cpns: true,
          tmt_pns: true,
          id_pendidikan: true,
          tmt_pensiun: true,
          id_status_hidup: true,
          alamat: true,
          kota: true,
          kode_pos: true,
          id_wil: true,
          id_kabupaten: true,
          id_prov: true,
          telpon: true,
          handphone: true,
          email: true,
          email_poliban: true,
          website: true,
          id_jabatan_fungsional: true,
          id_jurusan: true,
          id_bagian: true,
          id_prodi: true,
          foto: true,
          foto_ktp: true,
          foto_npwp: true,
          foto_karpeg: true,
          foto_surat_nikah: true,
          foto_taspen: true,
          foto_nip: true
        }
      });

      // Default value
      let jabatan = '-';
      let status = '-';

      // Ambil nama jabatan struktural jika ada dan valid
      if (
        pegawaiData &&
        pegawaiData.id_jabatan_struktural !== null &&
        typeof pegawaiData.id_jabatan_struktural !== 'undefined' &&
        Number(pegawaiData.id_jabatan_struktural) !== 0
      ) {
        const jabatanObj = await prisma.simpeg_jabatan_struktural.findUnique({
          where: { id_jabatan_struktural: Number(pegawaiData.id_jabatan_struktural) }
        });
        if (jabatanObj && jabatanObj.nama_jabatan_struktural) {
          jabatan = jabatanObj.nama_jabatan_struktural;
        }
      }

      // Ambil nama status pegawai jika ada dan valid
      if (
        pegawaiData &&
        pegawaiData.id_status_pegawai !== null &&
        typeof pegawaiData.id_status_pegawai !== 'undefined' &&
        Number(pegawaiData.id_status_pegawai) !== 0
      ) {
        const statusObj = await prisma.simpeg_status_pegawai.findUnique({
          where: { id_status_pegawai: Number(pegawaiData.id_status_pegawai) }
        });
        if (statusObj && statusObj.nama_status_pegawai) {
          status = statusObj.nama_status_pegawai;
        }
      }

      // Tambahkan ke pegawaiData
      if (pegawaiData) {
        pegawaiData.jabatan = jabatan;
        pegawaiData.status = status;
      }

      console.log('Pegawai data found:', pegawaiData);
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id_user, 
        role: user.level,
        pegawaiId: pegawaiData ? pegawaiData.id_pegawai : true,
      },
      process.env.JWT_SECRET || 'rahasia',
      { expiresIn: '1d' }
    );
    
    // Buat pesan selamat datang berdasarkan level user
    let welcomeMessage = 'Login berhasil';
    if (user.level === 1) {
      welcomeMessage = 'Selamat login sebagai Admin Pegawai';
    } else if (user.level === 2) {
      welcomeMessage = 'Selamat Anda login sebagai Pegawai';
    }
    
    // Kirim response dengan data yang diminta
    res.json({
      message: welcomeMessage,
      token,
      user: {
        id: user.id_user,
        username: user.username,
        role: user.level,
        nama: user.nama_lengkap,
        pegawai: pegawaiData ? {
          id: pegawaiData.id_pegawai,
          nip: pegawaiData.nip,
          nama: pegawaiData.nama_pegawai,
          jabatan: pegawaiData.jabatan ,
          status: pegawaiData.status ,
          panggilan: pegawaiData.panggilan ,
          jk: pegawaiData.jk ,
          id_agama: pegawaiData.id_agama ,
          tempat_lahir: pegawaiData.tempat_lahir ,
          nama_ibu: pegawaiData.nama_ibu ,
          tgl_lahir: pegawaiData.tgl_lahir ,
          nidn: pegawaiData.nidn ,
          no_ktp: pegawaiData.no_ktp ,
          no_kk: pegawaiData.no_kk ,
          no_serdos: pegawaiData.no_serdos ,
          no_karpeg: pegawaiData.no_karpeg ,
          gol_darah: pegawaiData.gol_darah ,
          tmt_cpns: pegawaiData.tmt_cpns ,
          tmt_pns: pegawaiData.tmt_pns ,
          id_pendidikan: pegawaiData.id_pendidikan ,
          tmt_pensiun: pegawaiData.tmt_pensiun ,
          id_status_hidup: pegawaiData.id_status_hidup ,
          alamat: pegawaiData.alamat ,
          kota: pegawaiData.kota ,
          kode_pos: pegawaiData.kode_pos ,
          id_wil: pegawaiData.id_wil ,
          id_kabupaten: pegawaiData.id_kabupaten ,
          id_prov: pegawaiData.id_prov ,
          telpon: pegawaiData.telpon ,
          handphone: pegawaiData.handphone ,
          email: pegawaiData.email ,
          email_poliban: pegawaiData.email_poliban ,
          website: pegawaiData.website ,
          id_jabatan_fungsional: pegawaiData.id_jabatan_fungsional ,
          id_jurusan: pegawaiData.id_jurusan ,
          id_bagian: pegawaiData.id_bagian ,
          id_prodi: pegawaiData.id_prodi ,
          foto: pegawaiData.foto ,
          foto_ktp: pegawaiData.foto_ktp ,
          foto_npwp: pegawaiData.foto_npwp ,
          foto_karpeg: pegawaiData.foto_karpeg ,
          foto_surat_nikah: pegawaiData.foto_surat_nikah ,
          foto_taspen: pegawaiData.foto_taspen ,
          foto_nip: pegawaiData.foto_nip 

        } : {
          id: user.id_user,
          nip: user.username,
          nama: user.nama_lengkap,
          jabatan: user.level === 1 ? 'Administrator' : 'Pegawai',
          status: 'Aktif'
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat login', error: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await prisma.users.findUnique({
      where: { id_user: userId },
      select: {
        id_user: true,
        username: true,
        nama_lengkap: true,
        email: true,
        level: true,
        aktif: true,
        blokir: true
      }
    });
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    // Kirim data sesuai kebutuhan frontend
    res.json({
      id: user.id_user,
      username: user.username,
      nama_lengkap: user.nama_lengkap,
      email: user.email,
      role: user.level,
      aktif: user.aktif,
      blokir: user.blokir
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil profile', error: error.message });
  }
};

exports.isAdminPegawai = (req, res, next) => {
  console.log('Role user:', req.user.role); // Debug
  if (![99, 102].includes(req.user.role)) {
    return res.status(403).json({ message: 'Akses ditolak. Hanya Super Admin dan Admin Pegawai yang diizinkan.' });
  }
  next();
};