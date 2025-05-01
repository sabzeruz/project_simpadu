const prisma = require('../config/prisma');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log body request
        const {
            username,
            password
        } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username dan password wajib diisi!"
            });
        }

        // Query untuk join tabel users dan user_level
        const user = await prisma.$queryRaw `
            SELECT u.*, ul.nama_level 
            FROM users u
            JOIN user_level ul ON u.level = ul.id_level
            WHERE u.username = ${username} AND u.password = ${password}
        `;
        console.log('User Found:', user); // Log hasil pencarian user

        if (user.length === 0) {
            return res.status(401).json({
                message: "Username atau password salah!"
            });
        }

        const foundUser = user[0]; // Ambil user pertama dari hasil query

        // Generate token JWT
        const token = jwt.sign({
                userId: foundUser.id_user,
                level: foundUser.level
            },
            process.env.JWT_SECRET, {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            message: "Login berhasil!",
            token: token,
            user: {
                id: foundUser.id_user,
                username: foundUser.username,
                email: foundUser.email,
                level: foundUser.nama_level // Nama level dari tabel user_level
            }
        });
    } catch (error) {
        console.error('Error:', error); // Log error
        res.status(500).json({
            message: "Terjadi kesalahan pada server."
        });
    }
};


const getAllUsers = async (req, res) => {
    try {
        // Query untuk mendapatkan semua data pengguna
        const users = await prisma.users.findMany({
            include: {
                levelData: true // Sertakan data dari tabel user_level
            }
        });

        if (users.length === 0) {
            return res.status(404).json({
                message: "Tidak ada pengguna yang ditemukan!"
            });
        }

        res.status(200).json({
            message: "Daftar pengguna berhasil diambil!",
            users: users.map(user => ({
                id: user.id_user,
                username: user.username,
                email: user.email,
                level: user.levelData?.nama_level || "Level tidak ditemukan"
            }))
        });
    } catch (error) {
        console.error('Error:', error); // Log error
        res.status(500).json({
            message: "Terjadi kesalahan pada server."
        });
    }
};


const getSuperAdminProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header Authorization
        if (!token) {
            return res.status(401).json({
                message: "Token tidak ditemukan, akses ditolak!"
            });
        }

        // Verifikasi token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Query untuk join tabel users, user_level, simpeg_pegawai, dan simpeg_status_pegawai
        const user = await prisma.$queryRaw`
            SELECT 
                u.id_user, 
                u.username, 
                u.email, 
                ul.nama_level, 
                sp.nama_pegawai, 
                sp.alamat, 
                sp.telpon, 
                ssp.nama_status_pegawai, 
                ssp.aktif
            FROM users u
            JOIN user_level ul ON u.level = ul.id_level
            LEFT JOIN simpeg_pegawai sp ON u.id_user = sp.id_pegawai
            LEFT JOIN simpeg_status_pegawai ssp ON sp.id_status_pegawai = ssp.id_status_pegawai
            WHERE u.id_user = ${userId}
        `;

        if (user.length === 0) {
            return res.status(404).json({
                message: "Profil tidak ditemukan!"
            });
        }

        res.status(200).json({
            message: "Profil berhasil diambil!",
            profile: user[0] // Ambil data pertama dari hasil query
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Terjadi kesalahan pada server."
        });
    }
};


module.exports = {
    login,
    getAllUsers,
    getSuperAdminProfile
};