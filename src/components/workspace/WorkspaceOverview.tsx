
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";

export function WorkspaceOverview() {
  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      <div className="flex-none px-6 md:px-8 pt-6 md:pt-8">
        <Header />
      </div>
      <div className="flex-1 pt-6 pb-16 px-4 md:px-8 overflow-auto">
        <div className="mb-8">
          <div className="p-6 bg-white border border-[#E7E8EC] rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-1">Welcome to your dashboard</h2>
            <p className="text-gray-600 text-sm">
              Track your key metrics and analyze your business performance in real-time.
              Use the date picker above to filter data by specific time periods.
            </p>
          </div>
        </div>
        <AnalyticsGrid />
      </div>
    </div>
  );
}
