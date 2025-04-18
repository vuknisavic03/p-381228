
import React from "react";
import { Sidebar } from "./navigation/Sidebar";
import { Header } from "./Header";
import { ChartsGrid } from "./charts/ChartsGrid";

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="w-[240px] min-w-[240px] border-r border-[#E4E5EA]">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col">
        <div className="px-8 py-8 xl:px-12 xl:py-10">
          <Header />
        </div>
        <div className="flex-1 px-8 xl:px-12">
          <div className="text-[#9EA3AD] text-sm font-semibold mb-5">Edited just now</div>
          <ChartsGrid />
        </div>
      </main>
    </div>
  );
}
