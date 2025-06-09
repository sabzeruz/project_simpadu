import React from "react";
import { DataGrid } from "@/components/data-grid";

const LogPresensiMasuk = () => {
  const data = [
    { id: 1, tanggal: "6-8-2022", status: "Hadir", jamMasuk: "07:50" },
    { id: 2, tanggal: "5-8-2022", status: "Hadir", jamMasuk: "07:51" },
    { id: 3, tanggal: "3-8-2022", status: "Hadir", jamMasuk: "07:50" },
    { id: 4, tanggal: "2-8-2022", status: "Hadir", jamMasuk: "07:51" },
    { id: 5, tanggal: "1-8-2022", status: "Hadir", jamMasuk: "07:51" },
    { id: 6, tanggal: "31-7-2022", status: "Hadir", jamMasuk: "07:50" },
    { id: 7, tanggal: "30-7-2022", status: "Hadir", jamMasuk: "07:51" },
    { id: 8, tanggal: "29-7-2022", status: "Hadir", jamMasuk: "07:52" },
  ];

  const columns = [
    { accessorKey: "no", header: "No", cell: ({ row }) => row.index + 1 },
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "jamMasuk", header: "Jam Masuk" },
  ];

  return (
    <div className="shadow-sm p-7 h-[350px] flex flex-col">
        <div className="flex items-center justify-between mb-4">
      <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-semibold text-sm">
                <span className="mr-2 text-lg leading-none"></span> Log Presensi Masuk
                    </div>
                    <button className=" dark:bg-yellow-500
                     dark:text-white 
                     dark:hover:bg-yellow-700
                      bg-yellow-500 
                      text-white text-xs px-3 py-1.5 
                      rounded 
                      hover:bg-yellow-700
                       hover:text-white 
                       transition">
                        📥 Presensi Masuk
                    </button>
                    </div>

                    
      <div className="overflow-y-auto flex-1">
        <DataGrid data={data} columns={columns} />
      </div>
    </div>
  );
};

export default LogPresensiMasuk;
