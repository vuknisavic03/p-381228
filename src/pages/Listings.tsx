
import React, { useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Listings() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="h-screen flex">
        <div className="w-[480px] min-w-[480px] bg-white border-r border-[#EBECED] relative">
          <ListingForm />
          <div className="absolute bottom-4 right-4">
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Listing
            </Button>
          </div>
        </div>
        <div className="flex-1 bg-[#FAFBFC] overflow-y-auto">
          <ListingList />
        </div>
      </div>
    </DashboardLayout>
  );
}
