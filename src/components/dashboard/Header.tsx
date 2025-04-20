
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
                      {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                    </>
                  ) : (
                    format(date.from, "LLL dd")
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
