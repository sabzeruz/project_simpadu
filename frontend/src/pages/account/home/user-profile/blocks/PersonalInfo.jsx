import { KeenIcon } from '@/components';
import { CrudAvatarUpload } from '@/partials/crud';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/auth/providers/JWTProvider';

const GENDER_MAP = { 1: 'Laki-laki', 2: 'Perempuan' };
const GOL_DARAH_MAP = { 1: 'A', 2: 'B', 3: 'AB', 4: 'O' };
const AGAMA_MAP = { 1: 'Islam', 2: 'Kristen', 3: 'Katolik', 4: 'Hindu', 5: 'Buddha', 6: 'Konghucu' };
const STATUS_HIDUP_MAP = { 1: 'Hidup', 2: 'Meninggal' };
const STATUS_PEGAWAI_MAP = { 1: 'PNS', 2: 'PNS Aktif', 3: 'Non PNS' };
// Map lain bisa ditambah sesuai kebutuhan

const PersonalInfo = () => {
  const { currentUser } = useContext(AuthContext);
  const [pegawai, setPegawai] = useState(null);

  // Ambil token dari localStorage, handle jika string JWT atau objek JSON
  const tokenRaw = localStorage.getItem('simpadu_project-auth-v1=1.0.0');
  let token = null;
  if (tokenRaw) {
    try {
      token = JSON.parse(tokenRaw).token;
    } catch {
      token = tokenRaw;
    }
  }

  useEffect(() => {
    if (!token) return;
    fetch('/api/pegawai/profile/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          // console.error('API error:', res.status, text); // opsional: hapus juga jika tidak ingin error di console
          throw new Error('API error');
        }
        const data = await res.json();
        setPegawai(data);
      })
      .catch(err => setPegawai(false));
  }, [currentUser, token]);

  if (!currentUser) return <div>Loading user...</div>;
  if (!token) return <div>Loading token...</div>;
  if (pegawai === null) return <div>Loading...</div>;
  if (pegawai === false) return <div>Data pegawai tidak ditemukan.</div>;

  // Format tanggal lahir
  let tglLahir = '-';
  if (pegawai.tgl_lahir) {
    const date = new Date(pegawai.tgl_lahir);
    tglLahir = date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  return (
    <div className="card min-w-full h-full">
      <div className="card-header">
        <h3 className="card-title">Data Pribadi</h3>
      </div>
      <div className="card-table scrollable-x-auto pb-3">
        <table className="table align-middle text-sm text-gray-500">
          <tbody>
            <tr>
              <td className="py-2 min-w-28 text-gray-600 font-normal">Pas Foto</td>
              <td className="py-2 text-gray700 font-normal min-w-32 text-2sm">
                150x150px JPEG, PNG Image
              </td>
              <td className="py-2 text-center">
                <div className="flex justify-center items-center">
                  <CrudAvatarUpload src={pegawai.foto ? `/uploads/foto/${pegawai.foto}` : undefined} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Nama</td>
              <td className="py-2 text-gray-800 font-normaltext-sm">
                {pegawai.nama_pegawai || '-'}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">NIDN</td>
              <td className="py-2 text-gray-800 font-normaltext-sm">
                {pegawai.nidn || '-'}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">NIP</td>
              <td className="py-2 text-gray-800 font-normaltext-sm">
                {pegawai.nip || '-'}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">NUPTK</td>
              <td className="py-2 text-gray-800 font-normaltext-sm">
                {pegawai.nuptk || '-'}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Alamat</td>
              <td className="py-2 text-gray-800 font-normaltext-sm">
                {pegawai.alamat || '-'}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { PersonalInfo };