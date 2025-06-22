import { useRef, useState, useContext } from 'react';
import { KeenIcon } from '@/components/keenicons';
import { toAbsoluteUrl } from '@/utils';
import { Menu, MenuItem, MenuToggle } from '@/components';
import { DropdownUser } from '@/partials/dropdowns/user';
import { ModalSearch } from '@/partials/modals/search/ModalSearch';
import { useLanguage } from '@/i18n';
import { AuthContext } from '@/auth/providers/JWTProvider';

const HeaderTopbar = () => {
  const { isRTL } = useLanguage();
  const { currentUser } = useContext(AuthContext);

  const itemUserRef = useRef(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Ambil nama file foto user, fallback ke blm_ada_foto.jpg jika kosong/null
  const fotoFile = currentUser?.foto && currentUser.foto !== '' 
    ? currentUser.foto 
    : 'blm_ada_foto.jpg';

  // Path absolut ke backend (tanpa /api di tengah)
  const fotoUrl = `${import.meta.env.VITE_APP_API_URL.replace(/\/api$/, '')}/uploads/${fotoFile}`;

  return (
    <div className="flex items-center gap-2 lg:gap-3.5">
      <ModalSearch open={searchModalOpen} onOpenChange={() => setSearchModalOpen(false)} />

      <Menu>
        <MenuItem ref={itemUserRef} toggle="dropdown" trigger="click" dropdownProps={{
          placement: isRTL() ? 'bottom-start' : 'bottom-end',
          modifiers: [{
            name: 'offset',
            options: { offset: isRTL() ? [-20, 10] : [20, 10] }
          }]
        }}>
          <MenuToggle className="btn btn-icon rounded-full">
            <img
              className="size-9 rounded-full border-2 border-success shrink-0"
              src={fotoUrl}
              alt="User"
              onError={e => { e.target.src = toAbsoluteUrl('/media/avatars/blank.png'); }}
            />
          </MenuToggle>
          {DropdownUser({ menuItemRef: itemUserRef })}
        </MenuItem>
      </Menu>
    </div>
  );
};

export { HeaderTopbar };