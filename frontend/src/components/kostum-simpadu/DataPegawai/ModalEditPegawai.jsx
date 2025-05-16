import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import { AuthContext } from '@/auth/providers/JWTProvider';
import axios from 'axios';

const ModalEditPegawai = ({ isOpen, onClose, pegawai, onUpdate }) => {
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

  useEffect(() => {
    if (!isOpen || !pegawai?.id) return;
    // Ambil detail pegawai dari API
    const fetchDetail = async () => {
      const res = await axios.get(`http://localhost:3000/api/pegawai/${pegawai.id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` }
      });
      setForm({
        nama_pegawai: res.data.nama_pegawai ?? '',
        nip: res.data.nip ?? '',
        id_jabatan_struktural: res.data.id_jabatan_struktural?.toString() ?? '',
        id_jabatan_fungsional: res.data.id_jabatan_fungsional?.toString() ?? '',
        id_status_pegawai: res.data.id_status_pegawai?.toString() ?? '',
      });
    };
    fetchDetail();
  }, [pegawai, isOpen, auth]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) onUpdate(form);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Data Pegawai</DialogTitle>
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

export default ModalEditPegawai;
