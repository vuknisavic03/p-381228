
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";

export default function Listings() {
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-[#E7E8EC] bg-white">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">Listings</h1>
        </div>
        <div className="flex-1 flex overflow-hidden bg-[#F6F6F7]">
          <div className="w-[350px] min-w-[350px] bg-white border-r border-[#E7E8EC] overflow-hidden">
            <ListingForm />
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ListingList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
