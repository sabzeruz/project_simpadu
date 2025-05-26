import { useState, useEffect, useContext, useRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box, Tabs, Tab, IconButton, InputLabel, Select, FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '@/utils/axiosInstance';
import { AuthContext } from '@/auth/providers/JWTProvider';

const TABS = [
  { label: 'Data Pribadi', value: 'pribadi' },
  { label: 'Kontak', value: 'kontak' },
  { label: 'Kepegawaian', value: 'kepegawaian' },
  { label: 'Pendidikan', value: 'pendidikan' },
  { label: 'Unit', value: 'unit' },
];

const jenisKelaminList = [
  { label: 'Laki-laki', value: '1' },
  { label: 'Perempuan', value: '2' },
];

const ModalTambahPegawai = ({ isOpen, onClose, onAdded }) => {
  const { auth } = useContext(AuthContext);
  const [tab, setTab] = useState('pribadi');
  const [form, setForm] = useState({
    // id_pegawai: '', // auto increment, tidak perlu diisi manual
    nama_pegawai: '',
    nip: '',
    id_jabatan_struktural: '',
    id_jabatan_fungsional: '',
    id_status_pegawai: '',
    jk: '',
    id_agama: '',
    gol_darah: '',
    tempat_lahir: '',
    tgl_lahir: '',
    no_ktp: '',
    no_kk: '',
    nidn: '',
    id_prov: '',
    id_kabupaten: '',
    id_wil: '',
    // ...field lain...
  });

  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  const [listStruktural, setListStruktural] = useState([]);
  const [listFungsional, setListFungsional] = useState([]);
  const [listStatus, setListStatus] = useState([]);
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKabupaten, setListKabupaten] = useState([]);
  const [listWilayah, setListWilayah] = useState([]);
  const [lastIdPegawai, setLastIdPegawai] = useState('-');

  // Fetch master data dan last ID Pegawai
  useEffect(() => {
    if (!isOpen) return;
    const fetchMaster = async () => {
      const [struktural, fungsional, status, prov, kab, wil, lastId] = await Promise.all([
        api.get('/master/jabatan-struktural', { headers: { Authorization: `Bearer ${auth?.token}` } }),
        api.get('/master/jabatan-fungsional', { headers: { Authorization: `Bearer ${auth?.token}` } }),
        api.get('/master/status-pegawai', { headers: { Authorization: `Bearer ${auth?.token}` } }),
        api.get('/master/provinsi', { headers: { Authorization: `Bearer ${auth?.token}` } }),
        api.get('/master/kabupaten', { headers: { Authorization: `Bearer ${auth?.token}` } }),
        api.get('/master/wilayah', { headers: { Authorization: `Bearer ${auth?.token}` } }),
        api.get('/pegawai/last-id', { headers: { Authorization: `Bearer ${auth?.token}` } }),
      ]);
      setListStruktural(struktural.data);
      setListFungsional(fungsional.data);
      setListStatus(status.data);
      setListProvinsi(prov.data);
      setListKabupaten(kab.data);
      setListWilayah(wil.data);
      setLastIdPegawai(lastId.data?.next_id || '-');
    };
    fetchMaster();
  }, [isOpen, auth]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleTabChange = (event, newValue) => setTab(newValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data pegawai
      const formData = new FormData();
      formData.append('nama_pegawai', form.nama_pegawai);
      formData.append('nip', form.nip);
      formData.append('id_jabatan_struktural', form.id_jabatan_struktural);
      formData.append('id_jabatan_fungsional', form.id_jabatan_fungsional);
      formData.append('id_status_pegawai', form.id_status_pegawai);
      formData.append('jk', form.jk);
      formData.append('id_agama', form.id_agama);
      formData.append('gol_darah', form.gol_darah);
      formData.append('tempat_lahir', form.tempat_lahir);
      formData.append('tgl_lahir', form.tgl_lahir);
      formData.append('no_ktp', form.no_ktp);
      formData.append('no_kk', form.no_kk);
      formData.append('nidn', form.nidn);
      formData.append('id_prov', form.id_prov);
      formData.append('id_kabupaten', form.id_kabupaten);
      formData.append('id_wil', form.id_wil);
      if (foto) formData.append('foto', foto);

      await api.post('/pegawai', formData, {
        headers: { Authorization: `Bearer ${auth?.token}` }
      });
      if (onAdded) onAdded();
      onClose();
    } catch (err) {
      alert('Gagal menambah pegawai: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { bgcolor: 'background.default' } }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" px={3} pt={3}>
        <DialogTitle sx={{ p: 0 }}>Tambah Data Pegawai</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ display: 'flex', minHeight: 500 }}>
        {/* Sidebar Tabs */}
        <Box sx={{ minWidth: 180, borderRight: 1, borderColor: 'divider', pr: 2 }}>
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            sx={{
              '& .MuiTab-root': { alignItems: 'flex-start', textTransform: 'none', fontWeight: 600, mb: 1 },
              '& .Mui-selected': { color: 'primary.main' }
            }}
          >
            {TABS.map(t => (
              <Tab key={t.value} label={t.label} value={t.value} />
            ))}
          </Tabs>
        </Box>
        {/* Form Content */}
        <Box component="form" id="form-tambah-pegawai" onSubmit={handleSubmit} sx={{ flex: 1, pl: 4 }}>
          {tab === 'pribadi' && (
            <Box>
              <Box mb={2} fontWeight={600} fontSize="1.1rem">Data Pribadi</Box>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
                {/* Pas Foto */}
                <Box gridColumn="1 / span 2" display="flex" alignItems="center" gap={2}>
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
                  label="ID Pegawai"
                  name="id_pegawai"
                  value={lastIdPegawai}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  placeholder="(Auto Increment)"
                />
                <TextField
                  label="Nama"
                  name="nama_pegawai"
                  value={form.nama_pegawai}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Masukkan Nama..."
                  required
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="jk-label">Jenis Kelamin</InputLabel>
                  <Select
                    labelId="jk-label"
                    label="Jenis Kelamin"
                    name="jk"
                    value={form.jk}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Pilih Jenis Kelamin...</MenuItem>
                    {jenisKelaminList.map(jk => (
                      <MenuItem key={jk.value} value={jk.value}>{jk.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  select
                  label="Agama"
                  name="id_agama"
                  value={form.id_agama || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Pilih Agama..."
                >
                  <MenuItem value="">Pilih Agama...</MenuItem>
                  {/* Map data agama */}
                </TextField>
                <TextField
                  select
                  label="Golongan Darah"
                  name="gol_darah"
                  value={form.gol_darah || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Pilih Golongan Darah..."
                >
                  <MenuItem value="">Pilih Golongan Darah...</MenuItem>
                  {/* Map data golongan darah */}
                </TextField>
                <TextField
                  label="Tempat Lahir"
                  name="tempat_lahir"
                  value={form.tempat_lahir || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Masukkan Tempat Lahir..."
                />
                <TextField
                  label="Tanggal Lahir"
                  name="tgl_lahir"
                  type="date"
                  value={form.tgl_lahir || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                  placeholder="dd-mm-yy"
                />
                <TextField
                  label="NIK"
                  name="no_ktp"
                  value={form.no_ktp || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Masukkan NIK..."
                />
                <TextField
                  label="No. KK"
                  name="no_kk"
                  value={form.no_kk || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Masukkan No. KK..."
                />
                <TextField
                  label="NIDN"
                  name="nidn"
                  value={form.nidn || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Masukkan NIDN..."
                />
                <TextField
                  label="NIP"
                  name="nip"
                  value={form.nip}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Masukkan NIP..."
                />
                <TextField
                  select
                  label="Provinsi"
                  name="id_prov"
                  value={form.id_prov || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Pilih Provinsi..."
                >
                  <MenuItem value="">Pilih Provinsi...</MenuItem>
                  {listProvinsi.map(prov => (
                    <MenuItem key={prov.id} value={prov.id}>{prov.nama}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Kabupaten"
                  name="id_kabupaten"
                  value={form.id_kabupaten || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Pilih Kabupaten..."
                >
                  <MenuItem value="">Pilih Kabupaten...</MenuItem>
                  {listKabupaten.map(kab => (
                    <MenuItem key={kab.id} value={kab.id}>{kab.nama}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Wilayah"
                  name="id_wil"
                  value={form.id_wil || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  placeholder="Pilih Wilayah..."
                >
                  <MenuItem value="">Pilih Wilayah...</MenuItem>
                  {listWilayah.map(wil => (
                    <MenuItem key={wil.id} value={wil.id}>{wil.nama}</MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          )}
          {tab === 'kontak' && (
            <Box>
              <Box mb={2} fontWeight={600} fontSize="1.1rem">Kontak</Box>
              <Box display="grid" gridTemplateColumns="200px 1fr" gap={2} alignItems="center">
                <Box>Alamat</Box>
                <TextField name="alamat" value={form.alamat || ''} onChange={handleChange} fullWidth placeholder="Masukkan Alamat..." margin="dense" />
                <Box>Kota</Box>
                <TextField name="kota" value={form.kota || ''} onChange={handleChange} fullWidth placeholder="Masukkan Kota..." margin="dense" />
                <Box>Kode Pos</Box>
                <TextField name="kode_pos" value={form.kode_pos || ''} onChange={handleChange} fullWidth placeholder="Masukkan Kode Pos..." margin="dense" />
                <Box>No. Handphone</Box>
                <TextField name="no_hp" value={form.no_hp || ''} onChange={handleChange} fullWidth placeholder="Masukkan No. Handphone..." margin="dense" />
                <Box>E-mail Poliban</Box>
                <TextField name="email_poliban" value={form.email_poliban || ''} onChange={handleChange} fullWidth placeholder="Masukkan E-mail Poliban..." margin="dense" />
              </Box>
            </Box>
          )}
          {tab === 'kepegawaian' && (
            <Box>
              <Box mb={2} fontWeight={600} fontSize="1.1rem">Kepegawaian</Box>
              <Box display="grid" gridTemplateColumns="200px 1fr" gap={2} alignItems="center">
                <Box>Status Hidup</Box>
                <TextField select name="status_hidup" value={form.status_hidup || ''} onChange={handleChange} fullWidth margin="dense" placeholder="Pilih Status Hidup...">
                  <MenuItem value="">Pilih Status Hidup...</MenuItem>
                  <MenuItem value="1">Aktif</MenuItem>
                  <MenuItem value="0">Tidak Aktif</MenuItem>
                </TextField>
                <Box>Status Pegawai</Box>
                <TextField select name="id_status_pegawai" value={form.id_status_pegawai || ''} onChange={handleChange} fullWidth margin="dense" placeholder="Pilih Status Pegawai...">
                  <MenuItem value="">Pilih Status Pegawai...</MenuItem>
                  {listStatus.map(status => (
                    <MenuItem key={status.id} value={status.id}>{status.nama}</MenuItem>
                  ))}
                </TextField>
                <Box>Jabatan Struktural</Box>
                <TextField select name="id_jabatan_struktural" value={form.id_jabatan_struktural || ''} onChange={handleChange} fullWidth margin="dense" placeholder="Pilih Jabatan Struktural...">
                  <MenuItem value="">Pilih Jabatan Struktural...</MenuItem>
                  {listStruktural.map(jab => (
                    <MenuItem key={jab.id} value={jab.id}>{jab.nama}</MenuItem>
                  ))}
                </TextField>
                <Box>Jabatan Fungsional</Box>
                <TextField select name="id_jabatan_fungsional" value={form.id_jabatan_fungsional || ''} onChange={handleChange} fullWidth margin="dense" placeholder="Pilih Jabatan Fungsional...">
                  <MenuItem value="">Pilih Jabatan Fungsional...</MenuItem>
                  {listFungsional.map(jab => (
                    <MenuItem key={jab.id} value={jab.id}>{jab.nama}</MenuItem>
                  ))}
                </TextField>
                <Box>Riwayat Pangkat</Box>
                <TextField name="riwayat_pangkat" value={form.riwayat_pangkat || ''} onChange={handleChange} fullWidth placeholder="Masukkan Riwayat Pangkat..." margin="dense" />
              </Box>
            </Box>
          )}
          {tab === 'pendidikan' && (
            <Box>
              <Box mb={2} fontWeight={600} fontSize="1.1rem">Pendidikan</Box>
              <Box display="grid" gridTemplateColumns="200px 1fr" gap={2} alignItems="center">
                <Box>Pendidikan</Box>
                <TextField name="pendidikan" value={form.pendidikan || ''} onChange={handleChange} fullWidth placeholder="Masukkan Pendidikan..." margin="dense" />
                <Box>Riwayat Pendidikan</Box>
                <TextField name="riwayat_pendidikan" value={form.riwayat_pendidikan || ''} onChange={handleChange} fullWidth placeholder="Masukkan Riwayat Pendidikan..." margin="dense" />
              </Box>
            </Box>
          )}
          {tab === 'unit' && (
            <Box>
              <Box mb={2} fontWeight={600} fontSize="1.1rem">Unit</Box>
              <Box display="grid" gridTemplateColumns="200px 1fr" gap={2} alignItems="center">
                <Box>Unit Kerja</Box>
                <TextField name="unit_kerja" value={form.unit_kerja || ''} onChange={handleChange} fullWidth placeholder="Masukkan Unit Kerja..." margin="dense" />
                <Box>Bagian</Box>
                <TextField name="bagian" value={form.bagian || ''} onChange={handleChange} fullWidth placeholder="Masukkan Bagian..." margin="dense" />
              </Box>
            </Box>
          )}
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
