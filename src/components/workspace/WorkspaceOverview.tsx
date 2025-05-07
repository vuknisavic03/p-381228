
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
        </div>
      </div>
      <div className="flex-1 py-2 pb-16 overflow-auto">
        <AnalyticsGrid />
      </div>
    </div>
  );
}
