
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, isValid, parse } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  placeholder?: string;
  showCompare?: boolean;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Select date range",
  showCompare = false,
}: DateRangePickerProps) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);

  // Format the value for display in the button
  const formatDisplayValue = React.useCallback(() => {
    if (!value?.from) {
      return placeholder;
    }

    if (value.to) {
      return `${format(value.from, "LLL dd, y")} - ${format(value.to, "LLL dd, y")}`;
    }

    return format(value.from, "LLL dd, y");
  }, [value, placeholder]);

  // Handle manual input of the date range
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const parts = inputValue.split("-").map((part) => part.trim());

    if (parts.length === 2) {
      const from = parse(parts[0], "yyyy-MM-dd", new Date());
      const to = parse(parts[1], "yyyy-MM-dd", new Date());

      if (isValid(from) && isValid(to)) {
        onChange({ from, to });
        setIsOpen(false);
      }
    }
  };

  // Predefined date ranges
  const today = new Date();
  const last7Days = {
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
    to: today,
  };
  const last30Days = {
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29),
    to: today,
  };
  const thisMonth = {
    from: new Date(today.getFullYear(), today.getMonth(), 1),
    to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
  };
  const lastMonth = {
    from: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    to: new Date(today.getFullYear(), today.getMonth(), 0),
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full h-10 justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDisplayValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onChange(last7Days)}
            >
              Last 7 days
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onChange(last30Days)}
            >
              Last 30 days
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onChange(thisMonth)}
            >
              This month
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onChange(lastMonth)}
            >
              Last month
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="yyyy-MM-dd - yyyy-MM-dd"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="text-xs h-8"
            />
          </div>
        </div>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
}
