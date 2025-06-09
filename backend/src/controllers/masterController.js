const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getJabatanStruktural = async (req, res) => {
  const data = await prisma.simpeg_jabatan_struktural.findMany({
    select: { id_jabatan_struktural: true, nama_jabatan_struktural: true }
  });
  res.json(data);
};

exports.getJabatanFungsional = async (req, res) => {
  const data = await prisma.simpeg_jabatan_fungsional.findMany({
    select: { id_jabatan_fungsional: true, nama_jabatan_fungsional: true }
  });
  res.json(data);
};

exports.getStatusPegawai = async (req, res) => {
  const data = await prisma.simpeg_status_pegawai.findMany({
    select: { id_status_pegawai: true, nama_status_pegawai: true }
  });
  res.json(data);
};