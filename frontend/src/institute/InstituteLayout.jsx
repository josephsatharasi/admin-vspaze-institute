import React from 'react';
import { Outlet } from 'react-router-dom';
import InstituteNavbar from './components/InstituteNavbar';
import InstituteFooter from './components/InstituteFooter';

const InstituteLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <InstituteNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <InstituteFooter />
    </div>
  );
};

export default InstituteLayout;
