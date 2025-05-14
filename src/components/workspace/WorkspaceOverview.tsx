
import React from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";

interface WorkspaceOverviewProps {
  userName?: string;
  workspaceName?: string;
  managerName?: string;
}

export function WorkspaceOverview({ 
  userName = "Kevin", 
  workspaceName = "Kevin's Workspace",
  managerName
}: WorkspaceOverviewProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-none px-8 pt-8 pb-4">
        <Header 
          userName={userName} 
          workspaceName={workspaceName} 
          managerName={managerName}
        />
      </div>
      <div className="flex-1 overflow-auto px-8 pb-10 pt-8">
        <div className="max-w-[1600px] mx-auto">
          <AnalyticsGrid />
        </div>
      </div>
    </div>
  );
}
