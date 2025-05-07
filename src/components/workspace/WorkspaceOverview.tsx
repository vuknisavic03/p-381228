
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";

export function WorkspaceOverview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 pt-6 pb-2">
        <Header />
      </div>
      <div className="flex-1 py-2 pb-16 overflow-auto bg-[#F9FAFB]">
        <div className="max-w-[1400px] mx-auto">
          <div className="px-8 pt-2 pb-4">
            <h2 className="text-xl text-[#1A1A1A] font-medium">Analytics Overview</h2>
            <p className="text-[#6B7280] mt-1">Track your business performance at a glance</p>
          </div>
          <AnalyticsGrid />
        </div>
      </div>
    </div>
  );
}
