
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
        <div className="flex justify-between items-center p-8 border-b border-[#E7E8EC]">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Listings</h1>
          <Button className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/90">
            <Plus className="w-4 h-4 mr-2" />
            Add listing
          </Button>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[600px]">
            <ListingForm />
          </div>
          <div className="flex-1">
            <ListingList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
