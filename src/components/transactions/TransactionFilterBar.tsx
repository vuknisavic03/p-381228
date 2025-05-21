
import React from 'react';
import { Search, Calendar as CalendarIcon, Filter as FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FilterPopover, FilterGroup } from "@/components/ui/filter-popover";
import { TransactionTypeToggle } from "./TransactionTypeToggle";

interface TransactionFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  filterGroups: FilterGroup[];
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
  filterGroups,
  activeFilterCount,
  clearFilters,
  transactionType,
  setTransactionType,
}) => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  return (
    <div className="border-b">
      <div className="flex flex-wrap items-center w-full gap-2 p-4">
        {/* Search bar with improved styling */}
        <div className="relative flex-1 max-w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, category or notes..." 
            className="pl-8 h-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-gray-200" 
          />
        </div>
        
        {/* Date Picker with Notion-inspired styling */}
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                "text-sm flex items-center gap-1.5 ml-1 h-9 border-gray-200 bg-white hover:bg-gray-50",
                date ? "bg-primary/10 text-gray-800 border-gray-300" : ""
              )}
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              {date ? format(date, "MMM d, yyyy") : "Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0 border border-gray-200">
            <div className="p-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Select a date</p>
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
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        
        {/* Enhanced Filter Button */}
        <FilterPopover
          groups={filterGroups}
          selectedCount={activeFilterCount}
          onReset={clearFilters}
          trigger={
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "text-sm flex items-center gap-1.5 h-9 border-gray-200 bg-white hover:bg-gray-50",
                activeFilterCount > 0 ? "bg-primary/10 text-gray-800 border-gray-300" : ""
              )}
            >
              <FilterIcon className="h-4 w-4" />
              Filter
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center rounded-full bg-gray-800 text-white text-xs w-5 h-5 ml-1">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          }
        />
        
        {/* Right-aligned transactionType toggle */}
        <div className="flex-1" />
        <TransactionTypeToggle 
          value={transactionType} 
          onChange={setTransactionType} 
          className="h-9"
        />
      </div>
    </div>
  );
};
