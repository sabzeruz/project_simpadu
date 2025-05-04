import { Fragment, useState } from 'react';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/demo1/toolbar';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components/keenicons';
import { Breadcrumbs } from '@/layouts/demo1/breadcrumbs';
import { ToolbarBreadcrumbs } from '../../../layouts/demo1/toolbar/ToolbarBreadcrumbs';
import  DatapegawaiTable  from '@/components/kostum-simpadu/DataPegawaiTable';  

const PendataanPegawaiPage = () => {
  return <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading title="Data Pegawai" description="Pendataan Pegawai Politeknik Negeri Banjarmasin saat ini." />
         {/* <ToolbarBreadcrumbs /> */}
        </Toolbar>
            <Container>
                < DatapegawaiTable />
            </Container>
      </Container>
      {/* <Container>
        <Demo1LightSidebarContent />
      </Container> */}
    </Fragment>;
};
export { PendataanPegawaiPage };