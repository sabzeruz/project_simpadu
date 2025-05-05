import { useState, useEffect } from 'react';
import { Modal } from '../../modal/Modal';
import { ModalHeader } from '../../modal/ModalHeader';
import { ModalTitle } from '../../modal/ModalTitle';
import { ModalBody } from '@/components/modal/ModalBody';
import { ModalContent } from '../../modal/ModalContent';
import { Input } from '@/components/ui/input';

const ModalEditPegawai = ({ isOpen, onClose, pegawai, onUpdate }) => {
  const [form, setForm] = useState({
    nama_pegawai: '',
    nip: '',
    jabatan: '',
    status: '',
  });

  useEffect(() => {
    if (pegawai) {
      setForm(pegawai);  // Set form values to the current pegawai data when modal opens
    }
  }, [pegawai, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);  // Call onUpdate to save the edited data
    onClose();  // Close the modal after submitting
  };

  return (
    <Modal open={isOpen} onClose={onClose} className="flex justify-center items-center">
      <ModalContent className="bg-white dark:bg-dark p-6 rounded-lg w-full max-w-2xl">
        <ModalHeader>
          <ModalTitle>Edit Data Pegawai</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="nama_pegawai"
              value={form.nama_pegawai}
              onChange={handleChange}
              placeholder="Nama Pegawai"
              required
            />
            <Input
              name="nip"
              value={form.nip}
              onChange={handleChange}
              placeholder="NIP"
              required
            />
            <Input
              name="jabatan"
              value={form.jabatan}
              onChange={handleChange}
              placeholder="Jabatan"
            />
            <Input
              name="status"
              value={form.status}
              onChange={handleChange}
              placeholder="Status"
            />
          </form>
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
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Simpan
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditPegawai;
