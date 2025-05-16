
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function Listings() {
  const location = useLocation();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };
  
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col">
        {/* Fixed header section */}
        <div className="px-6 py-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
              className="rounded-full w-9 h-9 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">Listings</h1>
          </div>
          <Button 
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700"
          >
            <PlusCircle className="h-4 w-4" />
            Add Listing
          </Button>
        </div>
        
        {/* Horizontal separator line */}
        <Separator className="w-full border-[#E4E5EA]" />
        
        <div className="flex-1 overflow-y-auto bg-white p-4">
          <ListingList />
        </div>
        
        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent 
            side="right" 
            className="w-[480px] sm:w-[540px] p-0 border-l shadow-2xl bg-white"
          >
            <ListingForm onClose={() => setIsAddFormOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Settings Sheet */}
        <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <SheetContent
            side="left"
            className="w-[320px] p-6 border-r shadow-xl bg-white"
          >
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Listings Settings</h2>
              <Separator />
              <div className="space-y-4">
                <div className="bg-[#F6F6F7] p-4 rounded-md cursor-pointer hover:bg-[#EDEDF0] transition-colors">
                  <div className="font-medium mb-1">Property Types</div>
                  <div className="text-sm text-[#9EA3AD]">Manage property types and categories</div>
                </div>
                <div className="bg-[#F6F6F7] p-4 rounded-md cursor-pointer hover:bg-[#EDEDF0] transition-colors">
                  <div className="font-medium mb-1">Custom Fields</div>
                  <div className="text-sm text-[#9EA3AD]">Add custom fields to your listings</div>
                </div>
                <div className="bg-[#F6F6F7] p-4 rounded-md cursor-pointer hover:bg-[#EDEDF0] transition-colors">
                  <div className="font-medium mb-1">Display Options</div>
                  <div className="text-sm text-[#9EA3AD]">Customize how listings appear</div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
