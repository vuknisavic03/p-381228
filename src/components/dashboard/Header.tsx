
import React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/shared/DateRangePicker";
import { ViewSelector, ViewType } from "@/components/overview/ViewSelector";

interface HeaderProps {
  userName?: string;
  workspaceName?: string;
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  onPeriodLabelChange?: (label: string) => void;
  dateRange?: DateRange;
  activeView?: ViewType;
  onViewChange?: (view: ViewType) => void;
  showViewSelector?: boolean;
}

export function Header({ 
  userName = "Kevin", 
  workspaceName = "Kevin's Workspace",
  onDateRangeChange,
  onPeriodLabelChange,
  dateRange,
  activeView,
  onViewChange,
  showViewSelector = false
}: HeaderProps) {
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  const userFirstName = userName || workspaceName?.split("'")[0] || "User";

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-[32px] md:text-[36px] text-[#1A1A1A] font-semibold leading-tight mb-2">
          {greeting}
        </h1>
        <p className="text-[24px] md:text-[28px] text-[#9EA3AD] font-medium leading-none">
          Today, {format(new Date(), "MMM dd")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {showViewSelector && activeView && onViewChange && (
          <ViewSelector activeView={activeView} onViewChange={onViewChange} />
        )}
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          onPeriodLabelChange={onPeriodLabelChange}
        />
      </div>
    </div>
  );
}
