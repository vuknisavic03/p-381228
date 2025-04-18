
import React from "react";
import { Sidebar } from "./navigation/Sidebar";
import { Header } from "./Header";
import { ChartsGrid } from "./charts/ChartsGrid";

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="w-[240px] min-w-[240px] border-r border-[#E4E5EA] overflow-y-auto">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 py-8 xl:px-12 xl:py-[52px]">
          <Header />
        </div>
        <div className="flex-1 px-8 xl:px-12 pb-8 overflow-y-auto">
          <div className="text-[#9EA3AD] text-sm font-semibold mb-8">Edited just now</div>
          <ChartsGrid />
        </div>
      </main>
    </div>
  );
}
