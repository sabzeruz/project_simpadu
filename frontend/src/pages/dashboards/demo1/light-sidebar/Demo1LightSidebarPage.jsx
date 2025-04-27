import { Fragment, useState } from 'react';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/demo1/toolbar';
import { Demo1LightSidebarContent } from './';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components/keenicons';
import { Breadcrumbs } from '@/layouts/demo1/breadcrumbs';

const Demo1LightSidebarPage = () => {
  return <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading title="SIMPADU" description="Selamat Datang! {{name}}" />
          <Breadcrumbs />
        </Toolbar>
      </Container>
      <Container>
        <Demo1LightSidebarContent />
      </Container>
    </Fragment>;
};
export { Demo1LightSidebarPage };