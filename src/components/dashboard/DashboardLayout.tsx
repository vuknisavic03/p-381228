
import React from "react";
import { Sidebar } from "./navigation/Sidebar";
import { Header } from "./Header";
import { ChartsGrid } from "./charts/ChartsGrid";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-[17%] border-r border-[#E4E5EA]">
        <Sidebar />
      </div>
      <main className="flex-1 px-12 py-[52px]">
        <Header />
        <ChartsGrid />
      </main>
    </div>
  );
}
