const prisma = require('../config/prisma');

// CRUD Pegawai
exports.getAllPegawai = async (req, res) => {
  try {
    const pegawai = await prisma.simpeg_pegawai.findMany();
    res.json(pegawai);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPegawaiById = async (req, res) => {
  const { id } = req.params;
  try {
    const pegawai = await prisma.simpeg_pegawai.findUnique({
      where: { id_pegawai: parseInt(id) },
    });
    if (!pegawai) return res.status(404).json({ message: "Pegawai tidak ditemukan" });
    res.json(pegawai);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPegawai = async (req, res) => {
  try {
    const {
      nama_pegawai,
      panggilan,
      jk,
      tempat_lahir,
      nama_ibu,
      tgl_lahir,
      nip_lama,
      nip_baru,
      alamat,
      kota,
      kode_pos,
      telpon,
      handphone,
      email,
      email_poliban,
      website
    } = req.body;

    const newPegawai = await prisma.simpeg_pegawai.create({
      data: {
        nama_pegawai,
        panggilan,
        jk,
        tempat_lahir,
        nama_ibu,
        tgl_lahir: tgl_lahir ? new Date(tgl_lahir) : null,
        nip_lama,
        nip_baru,
        alamat,
        kota,
        kode_pos,
        telpon,
        handphone,
        email,
        email_poliban,
        website
      }
    });

    res.status(201).json(newPegawai);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePegawai = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      nama_pegawai,
      panggilan,
      jk,
      tempat_lahir,
      nama_ibu,
      tgl_lahir,
      nip_lama,
      nip_baru,
      alamat,
      kota,
      kode_pos,
      telpon,
      handphone,
      email,
      email_poliban,
      website
    } = req.body;

    const updatedPegawai = await prisma.simpeg_pegawai.update({
      where: { id_pegawai: parseInt(id) },
      data: {
        nama_pegawai,
        panggilan,
        jk,
        tempat_lahir,
        nama_ibu,
        tgl_lahir: tgl_lahir ? new Date(tgl_lahir) : undefined,
        nip_lama,
        nip_baru,
        alamat,
        kota,
        kode_pos,
        telpon,
        handphone,
        email,
        email_poliban,
        website
      }
    });

    res.json(updatedPegawai);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePegawai = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.simpeg_pegawai.delete({
      where: { id_pegawai: parseInt(id) },
    });
    res.json({ message: "Pegawai dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Presensi Pegawai (khusus Dosen)
exports.presensiDosen = async (req, res) => {
  const { id_dosen, id_pertemuan, status } = req.body;
  try {
    const presensi = await prisma.siap_presensi_dosen.create({
      data: {
        id_dosen,
        id_pertemuan,
        status,
      },
    });
    res.json(presensi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
