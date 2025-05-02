import React from "react";
import { DataGrid } from "@/components/data-grid";

const EditAccountRequests = () => {
  const data = [
    { id: 1, nama: "pegawai1" },
    { id: 2, nama: "pegawai2" },
    { id: 3, nama: "pegawai3" },
    { id: 4, nama: "pegawai4" },
  ];

  const columns = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "nama",
      header: "Nama",
    },
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button className="bg-black  text-white  dark:text-white text-xs px-3 py-1.5 rounded hover:bg-blue-500 hover:text-white hover dark:hover:bg-blue-500 transition">
            👁️ Tinjau
          </button>
          <button className=" bg-black  text-white text-xs px-3 py-1.5 rounded hover:bg-red-700 hover:text-white dark:hover:bg-red-700 transition">
            🗑️ Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="shadow-sm p-7">
  <div className="flex items-center mb-4 text-blue-600 dark:text-blue-400 font-semibold text-sm">
    <span className="mr-2">ℹ️</span> Permintaan Penyuntingan Akun
  </div>
  <DataGrid data={data} columns={columns} />
</div>

  );
};

export default EditAccountRequests;
