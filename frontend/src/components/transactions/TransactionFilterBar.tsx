import React from 'react';
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { TransactionFilters } from "./TransactionFilters";
import { FilterSection } from "@/components/ui/modern-filter";

interface TransactionFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  filterSections: FilterSection[];
  activeFilterCount: number;
  clearFilters: () => void;
  transactionType: 'revenue' | 'expense';
  setTransactionType: (type: 'revenue' | 'expense') => void;
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
    <div className="border-b border-gray-200 bg-white shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <TransactionFilters
              search={search}
              setSearch={setSearch}
              filterSections={filterSections}
              activeFilterCount={activeFilterCount}
              clearFilters={clearFilters}
            />
          </div>

          <div className="flex items-center">
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
