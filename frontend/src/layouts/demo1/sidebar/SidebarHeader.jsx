import React, { forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDemo1Layout } from '../';
import { toAbsoluteUrl } from '@/utils';
import { SidebarToggle } from './';
const SidebarHeader = forwardRef((props, ref) => {
  const {
    layout
  } = useDemo1Layout();
  const lightLogo = () => <Fragment>
      <Link to="/" className="dark:hidden">
        <img src={toAbsoluteUrl('/media/app/logo_teks_white.svg')} className="default-logo min-h-[22px] max-w-32" />
        <img src={toAbsoluteUrl('/media/app/mini-logo.png')} className="small-logo min-h-[22px] max-w-8" />
      </Link>
      <Link to="/" className="hidden dark:block">
        <img src={toAbsoluteUrl('/media/app/logo_teks.svg')} className="default-logo min-h-[22px]  max-w-32" />
        <img src={toAbsoluteUrl('/media/app/mini-logo.png')} className="small-logo min-h-[22px] max-w-8" />
      </Link>
    </Fragment>;
  const darkLogo = () => <Link to="/">
      <img src={toAbsoluteUrl('/media/app/default-logo-dark.svg')} className="default-logo min-h-[22px] max-w-32" />
      <img src={toAbsoluteUrl('/media/app/mini-logo.svg')} className="small-logo min-h-[22px] max-w-8" />
    </Link>;
  return <div ref={ref} className="sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0">
      {layout.options.sidebar.theme === 'light' ? lightLogo() : darkLogo()}
      <SidebarToggle />
    </div>;
});
SidebarHeader.displayName = 'SidebarHeader';  
export { SidebarHeader };