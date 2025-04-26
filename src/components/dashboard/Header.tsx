
import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface HeaderProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function Header({ dateRange, onDateRangeChange }: HeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-[36px] text-[#1A1A1A] font-semibold leading-tight mb-2">
          Good morning, Kevin
        </h1>
        <p className="text-[28px] text-[#9EA3AD] font-medium leading-none">
          Today, {format(new Date(), "MMM dd")}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-11 px-4 border border-[#E7E8EC] rounded-md hover:bg-[#F6F6F7] transition-colors",
                "flex items-center gap-2.5"
              )}
            >
              <CalendarIcon className="w-4 h-4 text-[#1A1A1A]" />
              <span className="text-sm font-medium text-[#1A1A1A]">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} -{" "}
                      {format(dateRange.to, "LLL dd, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, yyyy")
                  )
                ) : (
                  "Select date range"
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-auto p-0" 
            align="end"
            sideOffset={8}
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
