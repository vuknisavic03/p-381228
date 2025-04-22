
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";

export default function Listings() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Listen for refresh-listings event
    const handleRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
    };
    
    window.addEventListener('refresh-listings', handleRefresh);
    
    return () => {
      window.removeEventListener('refresh-listings', handleRefresh);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="h-screen flex">
        <div className="w-[480px] min-w-[480px] bg-white border-r border-[#EBECED]">
          <ListingForm />
        </div>
        <div className="flex-1 bg-[#FAFBFC] overflow-y-auto">
          <ListingList key={refreshTrigger} />
        </div>
      </div>
    </DashboardLayout>
  );
}
