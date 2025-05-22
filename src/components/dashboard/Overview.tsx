
import React from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { WorkspaceOverview } from "../workspace/WorkspaceOverview";

interface WorkspaceState {
  name: string;
  owner: string;
  initials: string;
}

export function Overview() {
  const location = useLocation();
  const workspaceData = location.state?.workspace as WorkspaceState || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };
  
  // Extract first name from owner string
  const firstName = workspaceData.owner.split(' ')[0];
  
  return (
    <DashboardLayout 
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <WorkspaceOverview 
        userName={firstName} 
        workspaceName={workspaceData.name}
      />
    </DashboardLayout>
  );
}
