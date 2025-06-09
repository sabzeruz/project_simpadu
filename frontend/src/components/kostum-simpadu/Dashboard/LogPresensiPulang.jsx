import React from "react";
import { DataGrid } from "@/components/data-grid";

const LogPresensiPulang = () => {
  const data = [
    { id: 1, tanggal: "6-8-2022", status: "Pulang", jamPulang: "16:09" },
    { id: 2, tanggal: "5-8-2022", status: "Pulang", jamPulang: "16:10" },
    { id: 3, tanggal: "3-8-2022", status: "Pulang", jamPulang: "16:09" },
    { id: 4, tanggal: "2-8-2022", status: "Pulang", jamPulang: "16:10" },
    { id: 5, tanggal: "1-8-2022", status: "Pulang", jamPulang: "16:09" },
    { id: 6, tanggal: "31-7-2022", status: "Pulang", jamPulang: "16:08" },
    { id: 7, tanggal: "30-7-2022", status: "Pulang", jamPulang: "16:07" },
    { id: 8, tanggal: "29-7-2022", status: "Pulang", jamPulang: "16:06" },
  ];

  const columns = [
    { accessorKey: "no", header: "No", cell: ({ row }) => row.index + 1 },
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "jamPulang", header: "Jam Pulang" },
  ];

  return (
     <div className="shadow-sm p-7 h-[350px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-green-600 dark:text-green-400 font-semibold text-sm">
                    <span className="mr-2 text-lg leading-none"></span> Log Presensi Pulang
                        </div>
                        <button className=" dark:bg-green-500
                         dark:text-white
                          dark:hover:bg-green-700
                           bg-green-500 
                           text-white text-xs px-3 py-1.5
                            rounded 
                            hover:bg-green-700
                             hover:text-white
                              transition">
                            📤 Presensi Pulang
                        </button>
                        </div>
      <div className="overflow-y-auto flex-1">
        <DataGrid data={data} columns={columns} />
      </div>
    </div>
  );
};

export default LogPresensiPulang;
