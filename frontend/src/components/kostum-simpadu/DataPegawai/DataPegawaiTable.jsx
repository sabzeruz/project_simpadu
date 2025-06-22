import React, { useMemo, useState, useEffect, useContext } from 'react';
import { DataGrid } from '@/components/data-grid';
import { Input } from '@/components/ui/input';
import ModalTambahPegawai from '../DataPegawai/ModalTambahPegawai';
import ModalEditPegawai from '../DataPegawai/ModalEditPegawai';
import ModalHapusPegawai from '../DataPegawai/ModalHapusPegawai';
import { AuthContext } from '@/auth/providers/JWTProvider';
import api from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

const DataPegawaiTable = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalHapus, setShowModalHapus] = useState(false);
  const [pegawaiTerpilih, setPegawaiTerpilih] = useState(null);
  const [data, setData] = useState([]);
  const { auth } = useContext(AuthContext);

  const fetchPegawai = async () => {
    try {
      const res = await api.get('/pegawai/', {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setData(
        res.data.map((p) => ({
          id: p.id_pegawai, // id harus id_pegawai
          nama_pegawai: p.nama_pegawai,
          nidn: p.nidn,
          nip: p.nip,
          nuptk: p.nuptk,
          alamat: p.alamat,
          foto: p.foto,
        }))
      );
    } catch (err) {
      setData([]);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchPegawai();
  }, [auth]);

  const filteredData = data.filter(d =>
    d.nama_pegawai?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => row.index + 1,
    }, {
      accessorKey: 'foto',
      header: 'Foto',
      cell: ({ row }) => {
        const fotoFile = row.original.foto ? row.original.foto : 'default_profile.png';
        return (
          <img
            src={`${import.meta.env.VITE_APP_API_URL.replace(/\/api$/, '')}/uploads/${fotoFile}`}
            alt="foto"
            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
          />
        );
      },
    },
    { accessorKey: 'nama_pegawai', header: 'Nama Pegawai' },
    { accessorKey: 'nidn', header: 'NIDN' },
    { accessorKey: 'nip', header: 'NIP' },
    { accessorKey: 'nuptk', header: 'NUPTK' },
    { accessorKey: 'alamat', header: 'Alamat' },
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

  const handleDelete = async (pegawai) => {
    try {
      await api.delete(`/pegawai/${pegawai.id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` }
      });
      toast.success('Pegawai berhasil dihapus!');
      fetchPegawai(); // refresh data
    } catch (err) {
      toast.error('Gagal menghapus pegawai!');
    }
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
