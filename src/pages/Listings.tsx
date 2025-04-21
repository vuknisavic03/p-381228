
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";

export default function Listings() {
  return (
    <DashboardLayout>
      <div className="h-screen flex">
        <div className="w-[380px] min-w-[380px] bg-white border-r border-[#E7E8EC]">
          <ListingForm />
        </div>
        <div className="flex-1 bg-[#F6F6F7]">
          <ListingList />
        </div>
      </div>
    </DashboardLayout>
  );
}
