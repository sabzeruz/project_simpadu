/* eslint-disable no-unused-vars */
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
import LogPresensiMasuk from '@/components/kostum-simpadu/DataPresensi/LogPresensiMasuk';
import LogPresensiPulang from '@/components/kostum-simpadu/DataPresensi/LogPresensiPulang';

const PendataanPresensiPage = () => {
  return <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading title="Data Presensi" description="Pendataan Presensi anda." />
         {/* <ToolbarBreadcrumbs /> */}
        </Toolbar>
            <Container>
                < LogPresensiMasuk />
                < LogPresensiPulang />
            </Container>
      </Container>
      {/* <Container>
        <Demo1LightSidebarContent />
      </Container> */}
    </Fragment>;
};
export { PendataanPresensiPage };