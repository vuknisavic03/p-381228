
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
      <div className="flex-none px-3 sm:px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
        <Header userName={userName} workspaceName={workspaceName} />
      </div>
      <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-10 pb-8 pt-2 md:pt-4"> {/* Increased padding for better spacing */}
        <div className="max-w-[1600px] mx-auto">
          <AnalyticsGrid />
        </div>
      </div>
    </div>
  );
}
