
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";

export function WorkspaceOverview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 pt-8">
        <Header />
        <div className="my-6">
          <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
          <p className="text-slate-500">
            Track your key performance metrics with real-time updates
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#9b87f5]"></div>
              <span className="text-sm text-slate-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
              <span className="text-sm text-slate-600">Profit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
              <span className="text-sm text-slate-600">Income Ratio</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 py-2 pb-16 overflow-auto">
        <AnalyticsGrid />
      </div>
    </div>
  );
}
