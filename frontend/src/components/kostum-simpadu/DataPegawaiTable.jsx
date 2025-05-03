import React, { useMemo, useState } from 'react';
import { DataGrid } from '@/components/data-grid';
import { Input } from '@/components/ui/input';

const DataPegawaiTable = () => {
  const [search, setSearch] = useState('');
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
          <button className="
          dark:bg-blue-500 
          dark:text-white 
          dark:hover:bg-blue-700 
          bg-blue-500
          text-black
          text-xs px-3 py-1.5 rounded
           hover:bg-blue-700
            hover:text-white
            transition">✏️ Edit</button>
          <button className="
          dark:bg-red-500
           dark:text-white 
           bg-red-500
           text-white
           text-xs px-3 py-1.5 rounded
            hover:text-white
           hover:bg-red-700
             dark:hover:bg-red-700
              transition">🗑️ Hapus</button>
        </div>
      ),
    },
  ];

  return (
    <div className="shadow-sm p-7 bg-inherit rounded-md">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-green-500 text-white dark:bg-white dark:text-black 
        dark:hover:bg-green-600 
        dark:hover:text-white 
        text-sm px-4 py-2 rounded 
        hover:bg-green-600 
        transition">
          ➕ Tambah Data Pegawai
        </button>
        <Input
          placeholder="🔍 Cari..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 h-9"
        />
      </div>
      <DataGrid
        data={filteredData}
        columns={columns}
        pagination={{
          size: 10,
        }}
      />
    </div>
  );
};

export default DataPegawaiTable;
