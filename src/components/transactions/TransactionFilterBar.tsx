
import React from 'react';
import { Calendar as CalendarIcon } from "lucide-react";
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
    <div className="border-b border-gray-200 bg-white">
      <div className="p-6">
        {/* Main filter row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Search and Filters */}
          <div className="flex-1 max-w-2xl">
            <ModernFilter
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search transactions..."
              filterSections={filterSections}
              activeFilterCount={activeFilterCount}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3">
            {/* Date Picker */}
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-10 gap-2 px-4 bg-white border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span className="font-medium">
                    {date ? format(date, "MMM d, yyyy") : "Any date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0 border border-gray-200">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Select Date</h4>
                    {date && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-3 text-xs text-gray-600 hover:text-gray-900" 
                        onClick={() => {
                          setDate(undefined);
                          setCalendarOpen(false);
                        }}
                      >
                        Clear
                      </Button>
                    )}
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
                  className="p-4"
                />
              </PopoverContent>
            </Popover>
            
            {/* Transaction Type Toggle */}
            <TransactionTypeToggle 
              value={transactionType} 
              onChange={setTransactionType} 
              className="h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
