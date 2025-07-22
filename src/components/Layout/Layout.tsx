import React from 'react';
import { Outlet } from 'react-router-dom';
import { ModernSidebar } from '../Modern/ModernSidebar';
import { ModernHeader } from '../Modern/ModernHeader';

export function Layout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ModernSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ModernHeader />
        <main className="flex-1 overflow-auto p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}