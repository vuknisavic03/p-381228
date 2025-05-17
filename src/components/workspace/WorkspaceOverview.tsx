
import React, { useState, useEffect } from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";
import { DateRange } from "react-day-picker";
import { startOfMonth, endOfMonth } from 'date-fns';

interface WorkspaceOverviewProps {
  userName?: string;
  workspaceName?: string;
}

export function WorkspaceOverview({ userName = "Kevin", workspaceName = "Kevin's Workspace" }: WorkspaceOverviewProps) {
  // Initialize with current month as default
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
  };

  return (
    <div className="h-full flex flex-col bg-white animate-fade-in">
      <div className="flex-none px-3 sm:px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
        <Header 
          userName={userName} 
          workspaceName={workspaceName} 
          onDateRangeChange={handleDateRangeChange}
          dateRange={dateRange}
        />
      </div>
      <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-10 pb-8 pt-2 md:pt-4">
        <div className="max-w-[1600px] mx-auto">
          <AnalyticsGrid dateRange={dateRange} />
        </div>
      </div>
    </div>
  );
}
