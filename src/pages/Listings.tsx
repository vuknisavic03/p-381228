
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";

export default function Listings() {
  return (
    <DashboardLayout>
      <div className="h-full flex">
        <div className="w-[350px] min-w-[350px] bg-white border-r border-[#E7E8EC]">
          <ListingForm />
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-[#F6F6F7]">
          <ListingList />
        </div>
      </div>
    </DashboardLayout>
  );
}
