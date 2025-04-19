
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";
import { ChartsGrid } from "@/components/dashboard/charts/ChartsGrid";

export function WorkspaceOverview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 pt-8">
        <Header />
      </div>
      <div className="flex-1 p-8">
        <AnalyticsGrid />
      </div>
    </div>
  );
}
