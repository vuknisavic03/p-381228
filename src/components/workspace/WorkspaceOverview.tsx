
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";

export function WorkspaceOverview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 pt-6 pb-2">
        <Header />
      </div>
      <div className="flex-1 overflow-auto px-6">
        <AnalyticsGrid />
      </div>
    </div>
  );
}
