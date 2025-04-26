
import React, { useState } from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

export function WorkspaceOverview() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    // Here you would typically fetch data based on the new date range
    console.log("Date range changed:", range);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 pt-8">
        <Header />
        <div className="mt-6 mb-2 max-w-sm">
          <DateRangePicker 
            value={dateRange}
            onChange={handleDateRangeChange}
            placeholder="Select date range for analytics"
          />
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Analytics data will be filtered according to the selected date range
        </p>
      </div>
      <div className="flex-1 py-8 pb-16">
        <AnalyticsGrid />
      </div>
    </div>
  );
}
