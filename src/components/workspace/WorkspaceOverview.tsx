
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";

export function WorkspaceOverview() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-none px-8 pt-8 pb-4">
        <Header />
      </div>
      <div className="flex-1 overflow-auto px-8 pb-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-lg font-medium text-gray-800 mb-6 border-b border-[#F5F5F6] pb-4">
            <h2>Workspace Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Performance analytics for Kevin's Workspace</p>
          </div>
          <AnalyticsGrid />
        </div>
      </div>
    </div>
  );
}
