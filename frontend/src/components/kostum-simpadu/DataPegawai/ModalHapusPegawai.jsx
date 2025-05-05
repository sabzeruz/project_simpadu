import { Modal } from '../../modal/Modal';
import { ModalHeader } from '../../modal/ModalHeader';
import { ModalTitle } from '../../modal/ModalTitle';
import { ModalBody } from '@/components/modal/ModalBody';
import { ModalContent } from '../../modal/ModalContent';

const ModalHapusPegawai = ({ isOpen, onClose, pegawai, onDelete }) => {
  // Pastikan pegawai bukan null sebelum mengaksesnya
  if (!pegawai) {
    return null; // Jika pegawai tidak ada, tidak tampilkan modal
  }

  const handleDelete = () => {
    onDelete(pegawai);  // Call onDelete to delete the pegawai data
    onClose();  // Close the modal after deletion
  };

  return (
    <Modal open={isOpen} onClose={onClose} className="flex justify-center items-center">
      <ModalContent className="bg-white dark:bg-dark p-6 rounded-lg w-full max-w-md">
        <ModalHeader>
          <ModalTitle>Hapus Data Pegawai</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>Apakah Anda yakin ingin menghapus data pegawai <strong>{pegawai.nama_pegawai}</strong>?</p>
        </ModalBody>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 pt-4 pb-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalHapusPegawai;
