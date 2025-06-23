import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@/components/data-grid";
import axios from "axios";
import { AuthContext } from "@/auth/providers/JWTProvider"; // pastikan path sesuai

const LogPresensiMasuk = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser?.id_pegawai) return;
    axios
      .get(`/api/presensi?id_pegawai=${currentUser.id_pegawai}`)
      .then((res) => {
        const masuk = res.data.presensi
          .filter((item) => item.status === "Hadir" || item.status === "Izin")
          .map((item, idx) => ({
            id: item.id_presensi,
            tanggal: item.tanggal
              ? new Date(item.tanggal).toLocaleDateString("id-ID")
              : "",
            status: item.status,
            jamMasuk: item.jam_masuk
              ? new Date(item.jam_masuk).toLocaleTimeString("id-ID", { hour12: false })
              : "-", // hanya jam
            keteranganIzin: item.keterangan_izin || "-",
          }));
        setData(masuk);
      })
      .catch(() => setData([]));
  }, [currentUser]);

  const columns = [
    { accessorKey: "no", header: "No", cell: ({ row }) => row.index + 1 },
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "jamMasuk", header: "Jam Masuk" },
    { accessorKey: "keteranganIzin", header: "Keterangan Izin" }, // Tambah kolom ini
  ];

  return (
    <div className="shadow-sm p-7 h-[350px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-semibold text-sm">
          <span className="mr-2 text-lg leading-none"></span> Log Presensi Masuk
        </div>
      </div>
      <div className="overflow-y-auto flex-1">
        <DataGrid data={data} columns={columns} />
      </div>
    </div>
  );
};

export default LogPresensiMasuk;
