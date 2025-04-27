
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { DateRange } from "react-day-picker";

export default function Listings() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
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
      <div className="h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-[480px] lg:min-w-[480px] bg-white border-b lg:border-r border-[#EBECED] overflow-y-auto">
          <ListingForm />
        </div>
        <div className="flex-1 bg-[#FAFBFC] overflow-y-auto">
          <ListingList key={refreshTrigger} dateRange={dateRange} />
        </div>
      </div>
    </DashboardLayout>
  );
}
