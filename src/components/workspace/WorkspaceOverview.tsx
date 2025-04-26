
import React, { useState } from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

export function WorkspaceOverview() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    console.log("Date range changed:", range);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 pt-8">
        <Header dateRange={dateRange} onDateRangeChange={handleDateRangeChange} />
      </div>
      <div className="flex-1 py-8 pb-16">
        <AnalyticsGrid />
      </div>
    </div>
  );
}
