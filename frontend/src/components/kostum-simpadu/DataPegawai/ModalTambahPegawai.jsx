/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal } from '../../modal/Modal';
import { ModalHeader } from '../../modal/ModalHeader';
import { ModalTitle } from '../../modal/ModalTitle';
import { ModalBody } from '@/components/modal/ModalBody';
import  { ModalContent } from '../../modal/ModalContent';
import { Input } from '@/components/ui/input';

const ModalTambahPegawai = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    nama_pegawai: '',
    nip: '',
    jabatan: '',
    status: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data pegawai baru:', form);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} className="flex justify-center items-center">
      <ModalContent className="bg-white dark:bg-dark p-6 rounded-lg w-full max-w-2xl">
        <ModalHeader>
          <ModalTitle>Tambah Data Pegawai</ModalTitle>
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
            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500">
                Batal
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">
                Simpan
              </button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalTambahPegawai;
