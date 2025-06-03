
import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { format, subMonths, startOfMonth, endOfMonth, subDays, startOfYear, startOfQuarter, subYears } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  dateRange?: DateRange;
  className?: string;
}

type PeriodOption = {
  label: string;
  value: string;
  getDateRange: () => DateRange;
};

export function DateRangePicker({ 
  onDateRangeChange,
  dateRange,
  className
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(dateRange);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("this-month");
  
  const periodOptions: PeriodOption[] = [
    {
      label: "Last month",
      value: "last-month",
      getDateRange: () => {
        const lastMonth = subMonths(new Date(), 1);
        return {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth)
        };
      }
    },
    {
      label: "This month",
      value: "this-month",
      getDateRange: () => ({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date())
      })
    },
    {
      label: "Last 3 months",
      value: "last-3-months",
      getDateRange: () => ({
        from: subMonths(new Date(), 3),
        to: new Date()
      })
    },
    {
      label: "This quarter",
      value: "this-quarter",
      getDateRange: () => ({
        from: startOfQuarter(new Date()),
        to: new Date()
      })
    },
    {
      label: "Last quarter",
      value: "last-quarter",
      getDateRange: () => {
        const lastQuarter = subMonths(startOfQuarter(new Date()), 3);
        return {
          from: lastQuarter,
          to: subDays(startOfQuarter(new Date()), 1)
        };
      }
    },
    {
      label: "This year",
      value: "this-year",
      getDateRange: () => ({
        from: startOfYear(new Date()),
        to: new Date()
      })
    },
    {
      label: "Last year",
      value: "last-year",
      getDateRange: () => ({
        from: startOfYear(subYears(new Date(), 1)),
        to: endOfMonth(subMonths(startOfYear(new Date()), 1))
      })
    },
    {
      label: "All time",
      value: "all-time",
      getDateRange: () => ({
        from: subYears(new Date(), 5),
        to: new Date()
      })
    },
    {
      label: "Custom range",
      value: "custom",
      getDateRange: () => date || {
        from: startOfMonth(new Date()),
        to: new Date()
      }
    }
  ];

  useEffect(() => {
    if (!date) {
      const thisMonthRange = periodOptions.find(option => option.value === "this-month")?.getDateRange();
      setDate(thisMonthRange);
      if (onDateRangeChange) {
        onDateRangeChange(thisMonthRange);
      }
    }
  }, []);

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    
    if (value === "custom") {
      return;
    }
    
    const selectedOption = periodOptions.find(option => option.value === value);
    if (selectedOption) {
      const newDateRange = selectedOption.getDateRange();
      setDate(newDateRange);
      
      if (onDateRangeChange) {
        onDateRangeChange(newDateRange);
      }
    }
  };

  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setDate(newDateRange);
    setSelectedPeriod("custom");
    
    if (onDateRangeChange) {
      onDateRangeChange(newDateRange);
    }
  };

  const getDateDisplayString = () => {
    if (!date?.from) return "Select period";
    
    if (date.to) {
      if (selectedPeriod !== "custom") {
        const option = periodOptions.find(o => o.value === selectedPeriod);
        if (option) return option.label;
      }
      
      return `${format(date.from, "MMM d")} - ${format(date.to, "MMM d")}`;
    }
    
    return format(date.from, "MMM d, yyyy");
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 h-10 font-medium transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <CalendarIcon className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-900 hidden sm:inline">
              {getDateDisplayString()}
            </span>
            <span className="text-sm text-gray-900 sm:hidden">
              {selectedPeriod !== "custom" 
                ? periodOptions.find(o => o.value === selectedPeriod)?.label.split(" ")[0] || "Period"
                : "Custom"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white shadow-lg z-50" align="end">
          <div className="flex">
            <div className="w-28 p-1.5 border-r border-gray-100 bg-gray-50">
              <div className="text-xs font-medium text-gray-500 mb-1.5 px-1.5">Period</div>
              <div className="space-y-0.5">
                {periodOptions.map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "w-full text-left px-1.5 py-1 text-xs rounded hover:bg-white transition-colors",
                      selectedPeriod === option.value ? "bg-white font-medium shadow-sm" : "text-gray-600"
                    )}
                    onClick={() => handlePeriodChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-1.5">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={1}
                className="p-0 pointer-events-auto"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
