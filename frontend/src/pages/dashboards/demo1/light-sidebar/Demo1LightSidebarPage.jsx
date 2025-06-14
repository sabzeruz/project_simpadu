/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect, useContext } from 'react';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/demo1/toolbar';
import { Demo1LightSidebarContent } from './';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components/keenicons';
import { AuthContext } from '@/auth/providers/JWTProvider';
import { Breadcrumbs } from '@/layouts/demo1/breadcrumbs';
import EditAccountRequests from '@/components/kostum-simpadu/Dashboard/EditAccountRequests';
import JadwalMengajarCard from '@/components/kostum-simpadu/Dashboard/JadwalMengajarCard';

const Demo1LightSidebarPage = () => {
  const { currentUser } = useContext(AuthContext);

  // State untuk waktu realtime
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format hari, tanggal, dan jam
  const hari = now.toLocaleDateString('id-ID', { weekday: 'long' });
  const tanggal = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <Fragment>
      <Container>
        <Toolbar>
          <div>
            <ToolbarHeading title="SIMPADU - Sistem Terpadu" />
            {/* Jam, hari, tanggal di bawah Dashboard */}
            <div className="text-sm text-gray-500 font-semibold mt-4">
              {hari}, {tanggal} — {jam}
            </div>
            <div className="text-sm text-blue-400">
              Selamat Datang! {currentUser?.nama_lengkap || 'Pengguna'}
            </div>
          </div>
          <Breadcrumbs />
        </Toolbar>
      </Container>
      <Container>
        <Demo1LightSidebarContent />
        <Container className="mt-5">
          {currentUser?.level === 1 && <EditAccountRequests />}
        < JadwalMengajarCard  />
        </Container>
      </Container>
    </Fragment>
    
  );
};

export { Demo1LightSidebarPage };