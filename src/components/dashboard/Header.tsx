
import React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/shared/DateRangePicker";

interface HeaderProps {
  userName?: string;
  workspaceName?: string;
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  dateRange?: DateRange;
}

export function Header({ 
  userName = "Kevin", 
  workspaceName = "Kevin's Workspace",
  onDateRangeChange,
  dateRange
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
          {greeting}, {userFirstName}
        </h1>
        <p className="text-[24px] md:text-[28px] text-[#9EA3AD] font-medium leading-none">
          Today, {format(new Date(), "MMM dd")}
        </p>
      </div>
      <div className="flex items-center">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
    </div>
  );
}
