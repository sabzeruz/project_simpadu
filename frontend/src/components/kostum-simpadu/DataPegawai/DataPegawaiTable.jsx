import React, { useMemo, useState } from 'react';
import { DataGrid } from '@/components/data-grid';
import { Input } from '@/components/ui/input';
import ModalTambahPegawai from '../DataPegawai/ModalTambahPegawai';
import ModalEditPegawai from '../DataPegawai/ModalEditPegawai';
import ModalHapusPegawai from '../DataPegawai/ModalHapusPegawai'; 

const DataPegawaiTable = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false); // Kontrol modal tambah
  const [showModalEdit, setShowModalEdit] = useState(false); // Kontrol modal edit
  const [showModalHapus, setShowModalHapus] = useState(false); // Kontrol modal hapus
  const [pegawaiTerpilih, setPegawaiTerpilih] = useState(null); // Pegawai yang dipilih untuk edit atau hapus

  const data = useMemo(() => [
    { id: 1, nama: 'Nama1', nip: '197812312001', jabatan: 'Dosen Tetap', status: 'Aktif' },
    { id: 2, nama: 'Nama2', nip: '198504152006', jabatan: 'Staf TU', status: 'Aktif' },
    { id: 3, nama: 'Nama3', nip: '198001012004', jabatan: 'Dosen LB', status: 'Nonaktif' },
    { id: 4, nama: 'Nama4', nip: '199001252009', jabatan: 'Dosen Tetap', status: 'Aktif' },
    { id: 5, nama: 'Nama5', nip: '199205202015', jabatan: 'Dosen Tetap', status: 'Aktif' },
    { id: 6, nama: 'Nama6', nip: '198603302007', jabatan: 'Keuangan', status: 'Aktif' },
    { id: 7, nama: 'Nama7', nip: '199205202015', jabatan: 'Dosen Tetap', status: 'Aktif' },
    { id: 8, nama: 'Nama8', nip: '198911282011', jabatan: 'Dosen LB', status: 'Nonaktif' },
    { id: 9, nama: 'Nama9', nip: '197911122000', jabatan: 'Kepala Prodi', status: 'Aktif' },
    { id: 10, nama: 'Nama10', nip: '198911282011', jabatan: 'Dosen LB', status: 'Nonaktif' },
  ], []);

  const filteredData = data.filter(d => d.nama.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => row.index + 1,
    },
    { accessorKey: 'nama', header: 'Nama' },
    { accessorKey: 'nip', header: 'NIP' },
    { accessorKey: 'jabatan', header: 'Jabatan' },
    { accessorKey: 'status', header: 'Status' },
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700 bg-blue-500 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 hover:text-white transition"
            onClick={() => {
              setPegawaiTerpilih(row.original); // Set pegawai yang dipilih untuk edit (DUMMY DATA UNTUK SEKARANG)
              setShowModalEdit(true); // Buka modal edit
            }}
          >
            ✏️ Edit
          </button>
          <button
            className="dark:bg-red-500 dark:text-white dark:hover:bg-red-700 bg-red-500 text-white text-xs px-3 py-1.5 rounded hover:bg-red-700 hover:text-white transition"
            onClick={() => {
              setPegawaiTerpilih(row.original); // Set pegawai yang dipilih untuk hapus (DUMMY DATA UNTUK SEKARANG)
              setShowModalHapus(true); // Buka modal hapus
            }}
          >
            🗑️ Hapus
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    // TODO: Implementasi fungsi hapus data
    console.log('Data pegawai dengan ID', id, 'dihapus.');
  };

  return (
    <>
      <div className="shadow-sm p-7 bg-inherit rounded-md">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
          <button
            onClick={() => setShowModal(true)} // Buka modal tambah
            className="w-full sm:w-auto bg-green-500 text-white dark:bg-white dark:text-black 
              dark:hover:bg-green-600 dark:hover:text-white 
              text-sm px-4 py-2 rounded hover:bg-green-600 transition"
          >
            ➕ Tambah Data Pegawai
          </button>
          <Input
            placeholder="🔍 Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 h-9"
          />
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <DataGrid
            data={filteredData}
            columns={columns}
            pagination={{ size: 10 }}
          />
        </div>
      </div>

      {/* Modal Tambah Pegawai */}
      <ModalTambahPegawai
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* Modal Edit Pegawai */}
      <ModalEditPegawai
        isOpen={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        pegawai={pegawaiTerpilih}
      />

      {/* Modal Hapus Pegawai */}
      <ModalHapusPegawai
        isOpen={showModalHapus}
        onClose={() => setShowModalHapus(false)}
        onDelete={handleDelete}
        pegawai={pegawaiTerpilih}
      />
    </>
  );
};

export default DataPegawaiTable;
