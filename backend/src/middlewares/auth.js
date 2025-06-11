import jwt from 'jsonwebtoken';

// Middleware untuk verifikasi token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token tidak ditemukan' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  jwt.verify(token, process.env.JWT_SECRET || 'rahasia', (err, user) => {
    if (err) return res.status(401).json({ message: 'Token tidak valid' });
    req.user = user;
    next();
  });
};

// Middleware untuk memeriksa role admin pegawai
export const isAdminPegawai = (req, res, next) => {
  if (req.user.role !== 1) { // Asumsi role 1 adalah admin pegawai
    return res.status(403).json({ message: 'Akses ditolak. Hanya admin pegawai yang diizinkan.' });
  }
  next();
};


// Middleware untuk memeriksa role pegawai biasa
export const isPegawai = (req, res, next) => {
  if (req.user.role !== 2) {
    return res.status(403).json({ message: 'Akses ditolak. Hanya pegawai yang diizinkan.' });
  }
  next();
};

// Middleware untuk memeriksa apakah user adalah pemilik data
export const isOwner = (req, res, next) => {
  const pegawaiId = parseInt(req.params.id_pegawai || req.params.id);

  if (req.user.role === 1) {
    // Admin boleh akses semua data
    return next();
  }

  if (req.user.id_pegawai === pegawaiId) {
    // Pegawai boleh akses data miliknya sendiri
    return next();
  }

  return res.status(403).json({ message: 'Akses ditolak. Anda tidak memiliki izin untuk data ini.' });
};
