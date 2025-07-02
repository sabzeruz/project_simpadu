import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { AuthContext } from '@/auth/providers/JWTProvider';
import api from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

const ModalEditPegawai = ({ isOpen, onClose, pegawai, onUpdated }) => {
  const { auth } = useContext(AuthContext);
  const [form, setForm] = useState({
    nama_pegawai: '',
    nidn: '',
    nip: '',
    nuptk: '',
    alamat: '',
    foto: '',
  });
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [errors, setErrors] = useState({
    nidn: '',
    nip: '',
    nuptk: ''
  });

  // Fetch detail pegawai saat modal dibuka
  useEffect(() => {
    if (!isOpen || !pegawai?.id) return;
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/pegawai/${pegawai.id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` }
        });
        setForm({
          nama_pegawai: res.data.nama_pegawai ?? '',
          nidn: res.data.nidn ?? '',
          nip: res.data.nip ?? '',
          nuptk: res.data.nuptk ?? '',
          alamat: res.data.alamat ?? '',
          foto: res.data.foto ?? '',
        });
        setFotoPreview(res.data.foto
          ? `${import.meta.env.VITE_APP_API_URL.replace(/\/api$/, '')}/uploads/${res.data.foto}`
          : `${import.meta.env.VITE_APP_API_URL.replace(/\/api$/, '')}/uploads/blm_ada_foto.jpg`
        );
      } catch (err) {
        toast.error('Gagal mengambil detail pegawai');
      }
    };
    fetchDetail();
  }, [pegawai, isOpen, auth]);

  // Handle input change dengan validasi panjang karakter
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMsg = '';

    if (name === 'nidn' && value.length > 10) {
      errorMsg = 'NIDN maksimal 10 karakter';
    }
    if (name === 'nip' && value.length > 18) {
      errorMsg = 'NIP maksimal 18 karakter';
    }
    if (name === 'nuptk' && value.length > 16) {
      errorMsg = 'NUPTK maksimal 16 karakter';
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));

    // Hanya update state jika tidak melebihi batas
    if (
      (name === 'nidn' && value.length <= 10) ||
      (name === 'nip' && value.length <= 18) ||
      (name === 'nuptk' && value.length <= 16) ||
      (name !== 'nidn' && name !== 'nip' && name !== 'nuptk')
    ) {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle foto upload
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi panjang karakter
    if (form.nidn.length > 10 || form.nip.length > 18 || form.nuptk.length > 16) {
      toast.error('Periksa kembali panjang NIDN, NIP, dan NUPTK!');
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value);
      });
      if (foto) formData.append('foto', foto);

      await api.put(`/pegawai/${pegawai.id}`, formData, {
        headers: { Authorization: `Bearer ${auth?.token}` }
      });
      toast.success('Pegawai berhasil diupdate!');
      if (onUpdated) onUpdated(); // <-- ini memanggil fetchPegawai dari parent
      onClose();
    } catch (err) {
      toast.error('Gagal mengupdate pegawai: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Data Pegawai</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Box
              sx={{
                width: 60, height: 60, borderRadius: '50%', bgcolor: 'grey.900',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
              }}
            >
              {fotoPreview ? (
                <img src={fotoPreview} alt="Preview" style={{ width: 60, height: 60, objectFit: 'cover' }} />
              ) : (
                <span role="img" aria-label="foto" style={{ fontSize: 32 }}>👁️</span>
              )}
            </Box>
            <Box>
              <Button variant="outlined" component="label" size="small">
                Ganti Foto
                <input type="file" accept="image/jpeg,image/png" hidden onChange={handleFotoChange} />
              </Button>
              <Box fontSize="0.95em" color="text.secondary">150×150px JPEG, PNG Image</Box>
            </Box>
          </Box>
          <TextField
            label="Nama Pegawai"
            name="nama_pegawai"
            value={form.nama_pegawai}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="NIDN"
            name="nidn"
            value={form.nidn}
            onChange={handleChange}
            fullWidth
            margin="dense"
            inputProps={{ maxLength: 10 }}
            error={!!errors.nidn}
            helperText={errors.nidn}
          />
          <TextField
            label="NIP"
            name="nip"
            value={form.nip}
            onChange={handleChange}
            fullWidth
            margin="dense"
            inputProps={{ maxLength: 18 }}
            error={!!errors.nip}
            helperText={errors.nip}
          />
          <TextField
            label="NUPTK"
            name="nuptk"
            value={form.nuptk}
            onChange={handleChange}
            fullWidth
            margin="dense"
            inputProps={{ maxLength: 16 }}
            error={!!errors.nuptk}
            helperText={errors.nuptk}
          />
          <TextField
            label="Alamat"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            fullWidth
            margin="dense"
            placeholder="Masukkan Alamat..."
            multiline
            inputProps={{ maxLength: 255 }}
            rows={3}
          />
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
