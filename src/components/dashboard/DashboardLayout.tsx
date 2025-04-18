
import React from "react";
import { Sidebar } from "./navigation/Sidebar";
import { Header } from "./Header";
import { ChartsGrid } from "./charts/ChartsGrid";

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-[280px] min-w-[280px] border-r border-[#E4E5EA]">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col">
        <div className="px-10 pt-12">
          <Header />
        </div>
        <div className="flex-1 px-10 pt-8">
          <div className="text-[#9EA3AD] text-sm font-medium">Edited just now</div>
          <div className="mt-6">
            <ChartsGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
