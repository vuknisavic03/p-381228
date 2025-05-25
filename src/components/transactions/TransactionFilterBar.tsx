
import React from 'react';
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { ModernFilter, FilterSection } from "@/components/ui/modern-filter";
import { DateRange } from "react-day-picker";

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
  dateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
}

export const TransactionFilterBar: React.FC<TransactionFilterBarProps> = ({
  search,
  setSearch,
  filterSections,
  activeFilterCount,
  clearFilters,
  transactionType,
  setTransactionType,
}) => {
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
