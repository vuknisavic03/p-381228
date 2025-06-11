
import React from "react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/shared/DateRangePicker";

interface DateRangeHeaderProps {
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  dateRange?: DateRange;
}

export function DateRangeHeader({ 
  onDateRangeChange,
  dateRange
}: DateRangeHeaderProps) {
  return (
    <DateRangePicker
      dateRange={dateRange}
      onDateRangeChange={onDateRangeChange}
    />
  );
}
