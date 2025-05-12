
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ClientsList } from "@/components/dashboard/ClientsList";

export function WorkspaceOverview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 pt-6 pb-2">
        <Header />
      </div>
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="max-w-[1200px] mx-auto">
          <RevenueChart />
          <ClientsList />
        </div>
      </div>
    </div>
  );
}
