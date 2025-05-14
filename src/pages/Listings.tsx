
import React from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";

export default function Listings() {
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
      <div className="h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-[480px] lg:min-w-[480px] bg-white border-b lg:border-r border-[#EBECED] overflow-y-auto">
          <ListingForm />
        </div>
        <div className="flex-1 bg-[#FAFBFC] overflow-y-auto">
          <ListingList />
        </div>
      </div>
    </DashboardLayout>
  );
}
