
import React from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const location = useLocation();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="flex justify-between items-center p-4 bg-white">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
      </div>
      
      <Separator className="w-full" />
      
      <div className="flex-1 overflow-y-auto bg-white p-4">
        <p className="text-gray-600">Profile settings content goes here.</p>
      </div>
    </DashboardLayout>
  );
}
