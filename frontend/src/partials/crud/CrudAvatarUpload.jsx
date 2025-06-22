import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';
import { ImageInput } from '@/components/image-input';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/auth/providers/JWTProvider';

const CrudAvatarUpload = () => {
  const { currentUser } = useContext(AuthContext);

  // Tentukan nama file foto user, fallback ke blm_ada_foto.jpg jika kosong/null
  const fotoFile = currentUser?.foto && currentUser.foto !== ''
    ? currentUser.foto
    : 'blm_ada_foto.jpg';

  // Path absolut ke backend (tanpa /api di tengah)
  const fotoUrl = `${import.meta.env.VITE_APP_API_URL.replace(/\/api$/, '')}/uploads/${fotoFile}`;

  // Set avatar awal dari user login
  const [avatar, setAvatar] = useState([
    { dataURL: fotoUrl }
  ]);

  // Update avatar jika user berubah (misal setelah login)
  useEffect(() => {
    setAvatar([{ dataURL: fotoUrl }]);
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <ImageInput value={avatar} onChange={selectedAvatar => setAvatar(selectedAvatar)}>
      {({ disable }) => (
        <div className="image-input size-16" onClick={disable}>
          <div
            className="disable image-input-placeholder rounded-full border-2 border-success image-input-empty:border-gray-300"
            style={{
              backgroundImage: `url(${toAbsoluteUrl(`/media/avatars/blank.png`)})`
            }}
          >
            {avatar.length > 0 && (
              <img
                src={avatar[0].dataURL}
                alt="avatar"
                onError={e => { e.target.src = toAbsoluteUrl('/media/avatars/blank.png'); }}
              />
            )}

            
          </div>
        </div>
      )}
    </ImageInput>
  );
};

export { CrudAvatarUpload };