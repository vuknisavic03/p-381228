
import React from 'react';
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { ModernFilter, FilterSection } from "@/components/ui/modern-filter";

interface TransactionFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  filterSections: FilterSection[];
  activeFilterCount: number;
  clearFilters: () => void;
  transactionType: 'revenue' | 'expense';
  setTransactionType: (type: 'revenue' | 'expense') => void;
}

export const TransactionFilterBar: React.FC<TransactionFilterBarProps> = ({
  search,
  setSearch,
  date,
  setDate,
  filterSections,
  activeFilterCount,
  clearFilters,
  transactionType,
  setTransactionType,
}) => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  return (
    <div className="border-b border-[#E4E5EA] bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          {/* Left side: Modern Filter */}
          <div className="flex-1">
            <ModernFilter
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search by name, category or notes..."
              filterSections={filterSections}
              activeFilterCount={activeFilterCount}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Right side: Date and Transaction Type */}
          <div className="flex items-center gap-3">
            {/* Date Picker */}
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    "h-9 gap-2 bg-white border-gray-200 hover:bg-gray-50",
                    date && "border-gray-300 bg-gray-50"
                  )}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "MMM d, yyyy") : "Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0 border border-gray-200">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Select a Date</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-gray-500" 
                      onClick={() => {
                        setDate(undefined);
                        setCalendarOpen(false);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
            
            {/* Transaction Type Toggle */}
            <TransactionTypeToggle 
              value={transactionType} 
              onChange={setTransactionType} 
              className="h-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
