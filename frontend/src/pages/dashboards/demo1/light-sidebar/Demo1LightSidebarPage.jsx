/* eslint-disable no-unused-vars */
import { Fragment, useState } from 'react';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/demo1/toolbar';
import { Demo1LightSidebarContent } from './';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components/keenicons';
import { useContext } from 'react';
import { AuthContext } from '@/auth/providers/JWTProvider';
import { Breadcrumbs } from '@/layouts/demo1/breadcrumbs';
import EditAccountRequests from '@/components/kostum-simpadu/Dashboard/EditAccountRequests';
import LogPresensiMasuk from "@/components/kostum-simpadu/Dashboard/LogPresensiMasuk";
import LogPresensiPulang from "@/components/kostum-simpadu/Dashboard/LogPresensiPulang";

const Demo1LightSidebarPage = () => {
   const { currentUser } = useContext(AuthContext); // Ambil data pengguna dari context
  return <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="SIMPADU"
            description={`Selamat Datang! ${currentUser?.nama_lengkap || 'Pengguna'}`} // Tampilkan nama_lengkap
          />
          <Breadcrumbs />
        </Toolbar>
      </Container>
      <Container>
        <Demo1LightSidebarContent />
        <Container className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LogPresensiMasuk />
        <LogPresensiPulang />
        </div>
        <EditAccountRequests />
        </Container>
        
        
      </Container>
    </Fragment>;
};
export { Demo1LightSidebarPage };