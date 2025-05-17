
import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

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
  const [date, setDate] = React.useState<DateRange | undefined>(dateRange || {
    from: new Date(),
    to: new Date(),
  });

  // Get the current hour to determine the greeting
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  // Extract user's first name from workspace name if no userName provided
  const userFirstName = userName || workspaceName?.split("'")[0] || "User";

  // Handle date changes and notify parent component
  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setDate(newDateRange);
    if (onDateRangeChange) {
      onDateRangeChange(newDateRange);
    }
  };

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-[36px] text-[#1A1A1A] font-semibold leading-tight mb-2">
          {greeting}, {userFirstName}
        </h1>
        <p className="text-[28px] text-[#9EA3AD] font-medium leading-none">
          Today, {format(new Date(), "MMM dd")}
        </p>
      </div>
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2.5 border border-[#E7E8EC] rounded-md px-4 py-2.5"
            >
              <CalendarIcon className="w-4 h-4 text-[#1A1A1A]" />
              <span className="text-sm font-medium text-[#1A1A1A]">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "MMM dd")} - {format(date.to, "MMM dd")}
                    </>
                  ) : (
                    format(date.from, "MMM dd")
                  )
                ) : (
                  "Pick dates"
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
