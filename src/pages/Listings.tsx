
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";

export default function Listings() {
  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-[520px] lg:min-w-[520px] bg-white border-b lg:border-r border-[#EBECED] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Add New Listing</h2>
            <ListingForm />
          </div>
        </div>
        <div className="flex-1 bg-[#FAFBFC] overflow-y-auto">
          <ListingList />
        </div>
      </div>
    </DashboardLayout>
  );
}
