
import React from 'react';
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { GlobalSearch } from "@/components/shared/GlobalSearch";
import { FilterPresets } from "@/components/shared/FilterPresets";
import { ModernFilter, FilterSection } from "@/components/ui/modern-filter";

interface TransactionFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  filterSections: FilterSection[];
  activeFilterCount: number;
  clearFilters: () => void;
  transactionType: 'revenue' | 'expense';
  setTransactionType: (type: 'revenue' | 'expense') => void;
  properties?: any[];
  transactions?: any[];
  tenants?: any[];
}

export const TransactionFilterBar: React.FC<TransactionFilterBarProps> = ({
  search,
  setSearch,
  filterSections,
  activeFilterCount,
  clearFilters,
  transactionType,
  setTransactionType,
  properties = [],
  transactions = [],
  tenants = [],
}) => {
  // Get current filter state for presets
  const getCurrentFilters = () => {
    const filters: any = {
      search,
      transactionType,
      categories: filterSections.find(s => s.id === 'category')?.selectedValues || [],
      paymentMethods: filterSections.find(s => s.id === 'paymentMethod')?.selectedValues || [],
    };
    
    return filters;
  };

  const handlePresetApply = (preset: any) => {
    // Apply the preset filters
    if (preset.filters.search !== undefined) {
      setSearch(preset.filters.search);
    }
    if (preset.filters.transactionType) {
      setTransactionType(preset.filters.transactionType);
    }
    // Note: Other filters would need to be applied through parent component
    // This would require extending the props interface to include setter functions
  };

  const handleGlobalSearchSelect = (result: any) => {
    // Handle global search result selection
    console.log('Global search result selected:', result);
    
    if (result.type === 'transaction') {
      // Could navigate to transaction or apply filters to show it
      setSearch(result.title);
    } else if (result.type === 'property') {
      // Could filter transactions by property
      setSearch(result.title);
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white shadow-sm">
      <div className="px-6 py-4">
        <div className="space-y-4">
          {/* Global Search Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-2xl">
              <GlobalSearch
                properties={properties}
                transactions={transactions}
                tenants={tenants}
                onResultSelect={handleGlobalSearchSelect}
                placeholder="Search across all properties, transactions, and tenants..."
                enableFuzzySearch={true}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <FilterPresets
                currentFilters={getCurrentFilters()}
                onPresetApply={handlePresetApply}
              />
              <TransactionTypeToggle 
                value={transactionType} 
                onChange={setTransactionType} 
                className="h-10"
              />
            </div>
          </div>

          {/* Advanced Filters Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <ModernFilter
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Filter current results..."
                filterSections={filterSections}
                activeFilterCount={activeFilterCount}
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
