
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

export function ListingsFilter({
  onDateChange,
  onFilterClick,
}: {
  onDateChange?: (date: Date | undefined) => void;
  onFilterClick?: () => void;
}) {
  const [date, setDate] = useState<Date>();

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    onDateChange?.(newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      <Button 
        variant="outline" 
        size="icon"
        onClick={onFilterClick}
        className="transition-all duration-200 hover:bg-primary/5"
      >
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
}
