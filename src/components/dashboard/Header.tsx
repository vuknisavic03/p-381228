
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
  return (
    <div className="flex justify-between items-center bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center gap-4">
        {showViewSelector && activeView && onViewChange && (
          <ViewSelector activeView={activeView} onViewChange={onViewChange} />
        )}
      </div>
      <div className="flex items-center gap-3">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          onPeriodLabelChange={onPeriodLabelChange}
        />
      </div>
    </div>
  );
}
