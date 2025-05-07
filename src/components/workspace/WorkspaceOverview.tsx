
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";

export function WorkspaceOverview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 pt-8">
        <Header />
      </div>
      <div className="flex-1 py-2 pb-16 overflow-auto">
        <AnalyticsGrid />
      </div>
    </div>
  );
}
