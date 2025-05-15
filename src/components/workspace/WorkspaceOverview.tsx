
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";

interface WorkspaceOverviewProps {
  userName?: string;
  workspaceName?: string;
}

export function WorkspaceOverview({ userName = "Kevin", workspaceName = "Kevin's Workspace" }: WorkspaceOverviewProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-none px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-3 md:pb-4">
        <Header userName={userName} workspaceName={workspaceName} />
      </div>
      <div className="flex-1 overflow-auto px-4 sm:px-6 md:px-8 pb-8 pt-4 md:pt-6">
        <div className="max-w-[1600px] mx-auto">
          <AnalyticsGrid />
        </div>
      </div>
    </div>
  );
}
