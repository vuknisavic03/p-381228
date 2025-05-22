
import React, { useState } from 'react';
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
    <div className="h-full flex flex-col bg-[#FCFCFD] animate-fade-in">
      <div className="flex-none px-4 sm:px-5 md:px-8 pt-6 md:pt-8 pb-3 md:pb-4">
        <Header 
          userName={userName} 
          workspaceName={workspaceName} 
          onDateRangeChange={handleDateRangeChange}
          dateRange={dateRange}
        />
      </div>
      <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-10 pb-10 pt-2 md:pt-4">
        <div className="max-w-[1600px] mx-auto">
          <AnalyticsGrid dateRange={dateRange} />
        </div>
      </div>
    </div>
  );
}
