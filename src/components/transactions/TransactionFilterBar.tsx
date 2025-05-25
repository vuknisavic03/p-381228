
import React from 'react';
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { SearchBar } from "@/components/shared/SearchBar";
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
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search transactions..."
              filterCount={activeFilterCount}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="flex items-center gap-3">
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
