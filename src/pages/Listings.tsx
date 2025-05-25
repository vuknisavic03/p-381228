
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingList } from "@/components/listings/ListingList";
import { ListingForm } from "@/components/listings/ListingForm";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Listings() {
  const location = useLocation();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col bg-gray-50/30">
        {/* Modern Page Header */}
        <div className="bg-white border-b border-gray-200/60 shadow-sm">
          <div className="px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Left: Page Title & Subtitle */}
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  Properties
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Manage your rental properties and listings
                </p>
              </div>
              
              {/* Right: Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setIsAddFormOpen(true)}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2.5 h-10 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-2.5"
                >
                  <Plus className="h-4 w-4" />
                  Add Property
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content container */}
        <div className="flex-1 relative overflow-hidden">
          <ListingList />
        </div>

        {/* Add Listing Sheet */}
        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent
            side="right"
            className="w-[480px] sm:w-[540px] p-0 border-l shadow-2xl bg-white"
          >
            <ListingForm onClose={() => setIsAddFormOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
