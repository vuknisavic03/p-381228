
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";

export default function Listings() {
  return (
    <DashboardLayout>
      <div className="h-screen flex">
        <div className="w-[480px] min-w-[480px] bg-white border-r border-[#EBECED]">
          <ListingForm />
        </div>
        <div className="flex-1 bg-[#FBFBFC]">
          <ListingList />
        </div>
      </div>
    </DashboardLayout>
  );
}
