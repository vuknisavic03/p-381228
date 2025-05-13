
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
          <AnalyticsGrid />
        </div>
      </div>
    </div>
  );
}
