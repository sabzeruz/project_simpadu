import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ModalHapusPegawai = ({ isOpen, onClose, pegawai, onDelete }) => {
  if (!pegawai) return null;

  const handleDelete = () => {
    onDelete(pegawai);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Hapus Data Pegawai</DialogTitle>
      <DialogContent>
        <Typography>
          Apakah Anda yakin ingin menghapus data pegawai <strong>{pegawai.nama_pegawai}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Batal
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalHapusPegawai;
