import React, { useMemo, useState, useEffect, useContext } from 'react';
import { DataGrid } from '@/components/data-grid';
import { Input } from '@/components/ui/input';
import ModalTambahPegawai from '../DataPegawai/ModalTambahPegawai';
import ModalEditPegawai from '../DataPegawai/ModalEditPegawai';
import ModalHapusPegawai from '../DataPegawai/ModalHapusPegawai';
import { AuthContext } from '@/auth/providers/JWTProvider';
import axios from 'axios';

const DataPegawaiTable = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalHapus, setShowModalHapus] = useState(false);
  const [pegawaiTerpilih, setPegawaiTerpilih] = useState(null);
  const [data, setData] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchPegawai = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/pegawai', {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        // Map data API ke struktur yang diharapkan DataGrid
        setData(
          res.data.map((p, idx) => ({
            id: p.id_pegawai,
            nama: p.nama_pegawai,
            nip: p.nip,
            jabatan_struktural: p.jabatan_struktural || '-', // pastikan backend mengirim field ini
            jabatan_fungsional: p.jabatan_fungsional || '-', // pastikan backend mengirim field ini
            status: p.status_pegawai || '-',
          }))
        );
      } catch (err) {
        setData([]);
        // Optional: tampilkan error ke user
      }
    };
    if (auth?.token) fetchPegawai();
  }, [auth]);

  const filteredData = data.filter(d => d.nama?.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => row.index + 1,
    },
    { accessorKey: 'nama', header: 'Nama' },
    { accessorKey: 'nip', header: 'NIP' },
    { accessorKey: 'jabatan_struktural', header: 'Jabatan Struktural' },
    { accessorKey: 'jabatan_fungsional', header: 'Jabatan Fungsional' },
    { accessorKey: 'status', header: 'Status' },
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700 bg-blue-500 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 hover:text-white transition"
            onClick={() => {
              setPegawaiTerpilih(row.original);
              setShowModalEdit(true);
            }}
          >
            ✏️ Edit
          </button>
          <button
            className="dark:bg-red-500 dark:text-white dark:hover:bg-red-700 bg-red-500 text-white text-xs px-3 py-1.5 rounded hover:bg-red-700 hover:text-white transition"
            onClick={() => {
              setPegawaiTerpilih(row.original);
              setShowModalHapus(true);
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
            onClick={() => setShowModal(true)}
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
