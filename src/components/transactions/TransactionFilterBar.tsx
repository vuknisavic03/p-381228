
import React from 'react';
import { Search, Calendar as CalendarIcon, Filter } from "lucide-react";
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
    <div className="border-b border-[#E4E5EA] bg-white">
      <div className="flex flex-wrap items-center w-full gap-3 p-4">
        {/* Search bar with Notion-inspired styling */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, category or notes..." 
            className="pl-10 h-9 bg-white border-gray-200 rounded-md" 
          />
        </div>
        
        {/* Date Picker with Notion-inspired styling */}
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                "text-sm flex items-center gap-2 h-9 border-gray-200 bg-white",
                date ? "bg-gray-100 text-gray-800 border-gray-300" : ""
              )}
            >
              <CalendarIcon className="h-4 w-4" />
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
              className="p-3"
            />
          </PopoverContent>
        </Popover>
        
        {/* Filter Button */}
        <FilterPopover
          groups={filterGroups}
          selectedCount={activeFilterCount}
          onReset={clearFilters}
          trigger={
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "text-sm flex items-center gap-2 h-9 border-gray-200 bg-white",
                activeFilterCount > 0 ? "bg-gray-100 text-gray-800 border-gray-300" : ""
              )}
            >
              <Filter className="h-4 w-4" />
              Filter
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center rounded-full bg-gray-800 text-white text-xs w-5 h-5">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          }
        />
        
        {/* Right-aligned transaction type toggle */}
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
