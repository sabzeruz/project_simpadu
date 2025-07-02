import { useState, useContext } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '@/utils/axiosInstance';
import { AuthContext } from '@/auth/providers/JWTProvider';
import { toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';

const ModalTambahPegawai = ({ isOpen, onClose, onAdded }) => {
  const { auth } = useContext(AuthContext);
  const [form, setForm] = useState({
    nama_pegawai: '',
    nidn: '',
    nip: '',
    nuptk: '',
    alamat: '',
    foto: '',
    role: 7 // default Dosen
  });

  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  // Error state untuk validasi panjang input
  const [errors, setErrors] = useState({
    nidn: '',
    nip: '',
    nuptk: ''
  });

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
    // Cek validasi sebelum submit
    if (form.nidn.length > 10 || form.nip.length > 18 || form.nuptk.length > 16) {
      toast.error('Periksa kembali panjang NIDN, NIP, dan NUPTK!');
      return;
    }
    try {
      // Kirim data pegawai
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value);
      });
      if (foto) formData.append('foto', foto);

      await api.post('/pegawai', formData, {
        headers: { Authorization: `Bearer ${auth?.token}` }
      });
      toast.success('Pegawai berhasil ditambahkan!');
      if (onAdded) onAdded();
      onClose();
    } catch (err) {
      toast.error('Gagal menambah pegawai: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: 'background.default' } }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" px={3} pt={3}>
        <DialogTitle sx={{ p: 0 }}>Tambah Data Pegawai</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Box component="form" id="form-tambah-pegawai" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Pas Foto */}
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
                Pilih Foto
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
            placeholder="Masukkan Nama Pegawai..."
            required
          />

          <TextField
            label="NIDN"
            name="nidn"
            value={form.nidn}
            onChange={handleChange}
            fullWidth
            margin="dense"
            placeholder="Masukkan NIDN..."
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
            placeholder="Masukkan NIP..."
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
            placeholder="Masukkan NUPTK..."
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
          <TextField
            select
            label="Role"
            name="role"
            value={form.role || 7}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          >
            <MenuItem value={6}>Admin Pegawai</MenuItem>
            <MenuItem value={7}>Dosen</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 4, pb: 3, justifyContent: 'flex-end' }}>
        <Button onClick={onClose} variant="outlined" color="secondary" sx={{ mr: 2 }}>
          Close
        </Button>
        <Button variant="contained" color="primary" type="submit" form="form-tambah-pegawai">
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTambahPegawai;
