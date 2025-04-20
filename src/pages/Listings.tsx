
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Listings() {
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-[#E7E8EC]">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">Listings</h1>
          <Button className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 h-8 text-xs">
            <Plus className="w-3 h-3 mr-1.5" />
            Add listing
          </Button>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[450px] bg-white overflow-hidden">
            <ListingForm />
          </div>
          <div className="flex-1 bg-white overflow-y-auto">
            <ListingList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
