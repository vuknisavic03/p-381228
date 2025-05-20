
import React from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { WorkspaceOverview } from "../workspace/WorkspaceOverview";

export function PersonalOverview() {
  const location = useLocation();
  const userData = location.state?.user || {
    name: "Personal User", 
    owner: "Personal User", 
    initials: "PU",
    userType: 'personal'
  };
  
  // Extract first name from owner string
  const firstName = userData.owner.split(' ')[0];
  
  return (
    <DashboardLayout 
      workspaceName={userData.name}
      userInitials={userData.initials}
      userType="personal"
    >
      <WorkspaceOverview 
        userName={firstName} 
        workspaceName={userData.name}
      />
    </DashboardLayout>
  );
}
