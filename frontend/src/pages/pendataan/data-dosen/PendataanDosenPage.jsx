import { Fragment, useState } from 'react';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/demo1/toolbar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
// import { addDays, format } from 'date-fns';
// import { cn } from '@/lib/utils';
// import { KeenIcon } from '@/components/keenicons';
const PendataanDosenPage = () => {
  return <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading title="Data Dosen" description="Pendataan Dosen Pegawai Politeknik Negeri Banjarmasin saat ini." />
        
        </Toolbar>
      </Container>

    </Fragment>;
};
export { PendataanDosenPage };