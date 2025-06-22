import React from "react";
import { FaClock, FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JadwalMengajarCard = ({
  mataKuliah = "mataKuliah1",
  jam = "08.00 - 10.00",
  lokasi = "Ruang1",
  pertemuan = "16 dari 16",
}) => {
  const handleMulai = () => {
    toast.success("Perkuliahan dimulai!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div className="shadow-sm p-7 bg-transparent rounded-xl mt-8">
      <ToastContainer />
      <div className="flex items-center mb-4 text-blue-600 dark:text-blue-400 font-semibold text-sm">
        <span className="mr-2">ℹ️</span> Jadwal Mata Kuliah
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{mataKuliah}</div>
        <div className="flex flex-col md:flex-row gap-6 text-sm">
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-500 dark:text-gray-300" />
            <span className="text-gray-500 dark:text-gray-300">Jam</span>
            <span className="ml-2 font-semibold text-gray-900 dark:text-white">{jam}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500 dark:text-gray-300" />
            <span className="text-gray-500 dark:text-gray-300">Lokasi</span>
            <span className="ml-2 font-semibold text-gray-900 dark:text-white">{lokasi}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBookOpen className="text-gray-500 dark:text-gray-300" />
            <span className="text-gray-500 dark:text-gray-300">Pertemuan</span>
            <span className="ml-2 font-semibold text-gray-900 dark:text-white">{pertemuan}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition flex items-center justify-center text-base"
          onClick={handleMulai}
        >
          <span className="mr-2">▶️</span> Mulai Perkuliahan
        </button>
      </div>
    </div>
  );
};

export default JadwalMengajarCard;