
import React from "react";
import { Sidebar } from "./navigation/Sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-[280px] min-w-[280px] border-r border-[#E4E5EA]">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
