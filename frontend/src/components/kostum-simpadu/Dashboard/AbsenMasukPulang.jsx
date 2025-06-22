import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '@/utils/axiosInstance';
import { AuthContext } from '@/auth/providers/JWTProvider';

const AbsenMasukPulang = () => {
  const { currentUser } = useContext(AuthContext);
  const [waktuMasuk, setWaktuMasuk] = useState(null);
  const [waktuPulang, setWaktuPulang] = useState(null);
  const [loadingMasuk, setLoadingMasuk] = useState(false);
  const [loadingPulang, setLoadingPulang] = useState(false);

  // Helper untuk format jam (HH:mm:ss)
  const formatJam = (date) => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Helper untuk format tanggal (YYYY-MM-DD)
  const formatTanggal = (date) => date.toISOString().slice(0, 10);

  // Ambil status presensi hari ini dari database saat komponen mount
  useEffect(() => {
    const fetchPresensi = async () => {
      if (!currentUser?.id_pegawai) return;
      try {
        const today = formatTanggal(new Date());
        const res = await api.get(
          `/presensi?id_pegawai=${currentUser.id_pegawai}`
        );
        // Filter presensi hari ini (untuk check bahwa sudah absen masuk/pulang)
        const todayMasuk = res.data.presensi.find(
          (p) => p.tanggal.slice(0, 10) === today && p.status === 'Hadir'
        );
        const todayPulang = res.data.presensi.find(
          (p) => p.tanggal.slice(0, 10) === today && p.status === 'Pulang'
        );
        setWaktuMasuk(
          todayMasuk ? new Date(`${today}T${todayMasuk.jam_masuk}`) : null
        );
        setWaktuPulang(
          todayPulang ? new Date(`${today}T${todayPulang.jam_keluar}`) : null
        );
      } catch (err) {
        setWaktuMasuk(null);
        setWaktuPulang(null);
      }
    };
    fetchPresensi();
    // eslint-disable-next-line
  }, [currentUser]);

  const handleAbsenMasuk = async () => {
    if (!currentUser?.id_pegawai) {
      toast.error('User tidak valid!');
      return;
    }
    setLoadingMasuk(true);
    const now = new Date();
    try {
      await api.post('/presensi', {
        id_pegawai: currentUser.id_pegawai,
        tanggal: formatTanggal(now),
        status: 'Hadir',
        jam_masuk: formatJam(now),
        jam_keluar: null,
      });
      setWaktuMasuk(now);
      toast.success(`Absen Masuk berhasil! (${formatJam(now)})`);
    } catch (err) {
      toast.error(
        'Absen Masuk gagal! ' +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoadingMasuk(false);
    }
  };

  const handleAbsenPulang = async () => {
    if (!currentUser?.id_pegawai) {
      toast.error('User tidak valid!');
      return;
    }
    setLoadingPulang(true);
    const now = new Date();
    try {
      await api.post('/presensi', {
        id_pegawai: currentUser.id_pegawai,
        tanggal: formatTanggal(now),
        status: 'Pulang',
        jam_masuk: null,
        jam_keluar: formatJam(now),
      });
      setWaktuPulang(now);
      toast.success(`Absen Pulang berhasil! (${formatJam(now)})`);
    } catch (err) {
      toast.error(
        'Absen Pulang gagal! ' +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoadingPulang(false);
    }
  };

  return (
    <div className="w-full flex flex-row justify-between items-center gap-6 my-8">
      {/* Absen Masuk */}
      <button
        onClick={handleAbsenMasuk}
        disabled={!!waktuMasuk || loadingMasuk}
        className={`w-1/3 max-w-xs bg-green-500 hover:bg-green-600 text-white font-bold py-5 rounded-lg shadow-md text-lg transition
          ${waktuMasuk || loadingMasuk ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <span role="img" aria-label="masuk">
          📸
        </span>{' '}
        Absen Masuk
        {waktuMasuk && (
          <div className="text-xs mt-2 font-normal">
            Waktu: {formatJam(waktuMasuk)}
          </div>
        )}
      </button>
      {/* Spacer */}
      <div className="flex-1" />
      {/* Absen Pulang */}
      <button
        onClick={handleAbsenPulang}
        disabled={!waktuMasuk || !!waktuPulang || loadingPulang}
        className={`w-1/3 max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-lg shadow-md text-lg transition
          ${waktuPulang || !waktuMasuk || loadingPulang ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <span role="img" aria-label="pulang">
          🏁
        </span>{' '}
        Absen Pulang
        {waktuPulang && (
          <div className="text-xs mt-2 font-normal">
            Waktu: {formatJam(waktuPulang)}
          </div>
        )}
      </button>
    </div>
  );
};

export default AbsenMasukPulang;