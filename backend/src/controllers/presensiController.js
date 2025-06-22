// src/controller/presensiController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPresensi = async (req, res) => {
  try {
    const { id_pegawai, tanggal, status, jam_masuk, jam_keluar } = req.body;

    // LOG
    console.log('jam_masuk:', jam_masuk, typeof jam_masuk);

    const presensi = await prisma.presensi.create({
      data: {
        id_pegawai: Number(id_pegawai),
        tanggal: new Date(tanggal),
        status,
        jam_masuk: jam_masuk || null,     // HANYA INI!
        jam_keluar: jam_keluar || null,
      }
    });

    res.status(201).json({ message: 'Presensi berhasil', data: presensi });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPresensi = async (req, res) => {
  try {
    const { id_pegawai } = req.query;
    const where = id_pegawai ? { id_pegawai: Number(id_pegawai) } : {};
    const presensi = await prisma.presensi.findMany({ 
      where,
      include: { simpeg_pegawai: true } 
    });
    res.json({ presensi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan.", error });
  }
};

export const getPresensiById = async (req, res) => {
  try {
    const { id } = req.params;

    const presensi = await prisma.presensi.findUnique({ 
      where: { id_presensi: parseInt(id) },
    });

    if (!presensi) return res.status(404).json({ message: "Data Pegawai Tidak Ada" });

    res.json(presensi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
