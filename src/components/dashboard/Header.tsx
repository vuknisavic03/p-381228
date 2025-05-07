
import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export function Header() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  // Get the time of day for personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-[32px] text-[#1A1A1A] font-semibold leading-tight mb-1">
          {getGreeting()}, Kevin
        </h1>
        <p className="text-lg text-[#9EA3AD] font-medium leading-none">
          Welcome to your dashboard • Today, {format(new Date(), "MMM dd, yyyy")}
        </p>
      </div>
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2.5 border border-[#E7E8EC] rounded-md px-4 py-2.5 hover:bg-gray-50 transition-colors"
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
              onSelect={setDate}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
