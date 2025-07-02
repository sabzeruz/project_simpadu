import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../auth/providers/JWTProvider";
import axios from "axios";
import { FaClock, FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JadwalMengajarCard = () => {
  const { currentUser } = useContext(AuthContext);
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMulai, setLoadingMulai] = useState({});
  const [sudahDimulai, setSudahDimulai] = useState([]); // <-- Tambahkan state

  useEffect(() => {
    const fetchJadwal = async () => {
      if (!currentUser?.id_pegawai) {
        setJadwal([]);
        return;
      }
      try {
        setLoading(true);
        const res = await axios.get(
          `https://ti054d02.agussbn.my.id/api/pegawai/proxy-jadwal/${currentUser.id_pegawai}`
        );
        setJadwal(res.data || []);
      } catch {
        setJadwal([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJadwal();
  }, [currentUser?.id_pegawai]);

  const handleMulai = async (id_kelas_mk) => {
    setLoadingMulai((prev) => ({ ...prev, [id_kelas_mk]: true }));
    try {
      await axios.post("https://ti054d02.agussbn.my.id/api/pegawai/proxy-buka", {
        id_pegawai: currentUser.id_pegawai,
        id_kelas_mk,
      });
      toast.success("Perkuliahan dimulai!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setSudahDimulai((prev) => [...prev, id_kelas_mk]); // Tandai sudah dimulai
    } catch (err) {
      // Tampilkan error detail dari API jika ada
      let message = "Gagal memulai perkuliahan!";
      if (err.response && err.response.data) {
        if (err.response.data.message) {
          message = err.response.data.message;
        } else if (typeof err.response.data === "string") {
          message = err.response.data;
        } else {
          message = JSON.stringify(err.response.data);
        }
      }
      toast.error(message);
    } finally {
      setLoadingMulai((prev) => ({ ...prev, [id_kelas_mk]: false }));
    }
  };

  return (
    <div className="shadow-sm p-7 bg-transparent rounded-xl">
      <ToastContainer />
      <div className="flex items-center mb-4 text-blue-600 dark:text-blue-400 font-semibold text-sm">
        <span className="mr-2">ℹ️</span> Jadwal Mata Kuliah
      </div>
      {loading ? (
        <div className="text-gray-500">Memuat jadwal...</div>
      ) : jadwal.length === 0 ? (
        <div className="text-gray-500">Tidak ada jadwal ditemukan.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jadwal.map((item) => (
            <div
              key={item.id_kelas_mk}
              className="
    border 
    rounded-lg 
    p-4 
    bg-gray-100 
    dark:bg-[#23272f] 
    border-gray-300 
    dark:border-gray-700 
    shadow
  "
            >
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {item.nama_mk}
              </div>
              <div className="text-base text-gray-700 dark:text-white mb-300">
                Kelas: {item.nama_kelas}
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <button
                  className={`flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded transition flex items-center justify-center text-base
                    ${sudahDimulai.includes(item.id_kelas_mk) ? "opacity-60 cursor-not-allowed" : ""}`}
                  onClick={() => handleMulai(item.id_kelas_mk)}
                  disabled={!!loadingMulai[item.id_kelas_mk] || sudahDimulai.includes(item.id_kelas_mk)}
                >
                  <span className="mr-2">▶️</span>
                  {loadingMulai[item.id_kelas_mk]
                    ? "Memulai..."
                    : sudahDimulai.includes(item.id_kelas_mk)
                    ? "Mata kuliah sudah dimulai!"
                    : "Mulai Perkuliahan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JadwalMengajarCard;