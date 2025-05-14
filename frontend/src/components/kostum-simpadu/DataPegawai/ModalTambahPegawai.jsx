import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '@/auth/providers/JWTProvider';

const ModalTambahPegawai = ({ isOpen, onClose, onAdded }) => {
  const { auth } = useContext(AuthContext);
  const [form, setForm] = useState({
    nama_pegawai: '',
    nip: '',
    id_jabatan_struktural: '',
    id_jabatan_fungsional: '',
    id_status_pegawai: '',
  });

  const [listStruktural, setListStruktural] = useState([]);
  const [listFungsional, setListFungsional] = useState([]);
  const [listStatus, setListStatus] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchMaster = async () => {
      const [struktural, fungsional, status] = await Promise.all([
        axios.get('http://localhost:3000/api/master/jabatan-struktural', { headers: { Authorization: `Bearer ${auth?.token}` } }),
        axios.get('http://localhost:3000/api/master/jabatan-fungsional', { headers: { Authorization: `Bearer ${auth?.token}` } }),
        axios.get('http://localhost:3000/api/master/status-pegawai', { headers: { Authorization: `Bearer ${auth?.token}` } }),
      ]);
      setListStruktural(struktural.data);
      setListFungsional(fungsional.data);
      setListStatus(status.data);
    };
    fetchMaster();
  }, [isOpen, auth]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/api/pegawai',
        {
          nama_pegawai: form.nama_pegawai,
          nip: form.nip,
          id_jabatan_struktural: Number(form.id_jabatan_struktural),
          id_jabatan_fungsional: Number(form.id_jabatan_fungsional),
          id_status_pegawai: Number(form.id_status_pegawai),

          // Field wajib backend (isi default/placeholder)
          panggilan: form.nama_pegawai,
          jk: 0,
          id_agama: 0,
          nidn: '-',
          no_ktp: '-',
          no_kk: '-',
          gol_darah: 0,
          id_pendidikan: '-',
          alamat: '-',
          kode_pos: '-',
          id_wil: '-',
          id_kabupaten: '-',
          id_prov: '-',
          telpon: '-',
          email: '-',
          email_poliban: '-',
          website: '-',
          id_riwayat_pangkat: 0,
          id_riwayat_pendidikan: 0,
          id_bagian: 0,
          foto_ktp: '-',
          foto_npwp: '-',
          foto_karpeg: '-',
          foto_surat_nikah: '-',
          foto_taspen: '-',
          foto_nip: '-',

          // Field nullable (boleh null)
          tempat_lahir: null,
          nama_ibu: null,
          tgl_lahir: null,
          tmt_cpns: null,
          tmt_pns: null,
          tmt_pensiun: null,
          id_status_hidup: null,
          kota: null,
          foto: null,
          no_serdos: null,
          no_karpeg: null,
          id_jurusan: null,
          id_prodi: null,
        }
      );
      if (onAdded) onAdded();
      onClose();
    } catch (err) {
      alert('Gagal menambah pegawai: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tambah Data Pegawai</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Nama Pegawai"
              name="nama_pegawai"
              value={form.nama_pegawai}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="NIP"
              name="nip"
              value={form.nip}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              select
              label="Jabatan Struktural"
              name="id_jabatan_struktural"
              value={form.id_jabatan_struktural}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="">Pilih Jabatan Struktural</MenuItem>
              {listStruktural.map(j => (
                <MenuItem key={j.id_jabatan_struktural} value={j.id_jabatan_struktural}>
                  {j.nama_jabatan_struktural}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Jabatan Fungsional"
              name="id_jabatan_fungsional"
              value={form.id_jabatan_fungsional}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="">Pilih Jabatan Fungsional</MenuItem>
              {listFungsional.map(j => (
                <MenuItem key={j.id_jabatan_fungsional} value={j.id_jabatan_fungsional}>
                  {j.nama_jabatan_fungsional}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status Pegawai"
              name="id_status_pegawai"
              value={form.id_status_pegawai}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="">Pilih Status Pegawai</MenuItem>
              {listStatus.map(s => (
                <MenuItem key={s.id_status_pegawai} value={s.id_status_pegawai}>
                  {s.nama_status_pegawai}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Batal
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalTambahPegawai;
