
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col bg-white">
        {/* Fixed header section - consistent with Transactions page */}
        <div className="px-6 py-4 flex justify-between items-center bg-white">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Listings</h1>
          </div>
          <Button 
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 h-9 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Listing
          </Button>
        </div>
        
        {/* Horizontal separator line */}
        <Separator className="w-full border-[#E4E5EA]" />
        
        {/* Main content container with white background */}
        <div className="flex-1 bg-white">
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
      </div>
    </DashboardLayout>
  );
}
