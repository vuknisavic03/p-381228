import React from "react";
import { HorizontalFilter, FilterSection } from "@/components/ui/horizontal-filter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface TransactionFiltersNewProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: FilterOption[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  listings: any[]; // Add listings data
  selectedProperties: string[];
  onPropertyToggle: (property: string) => void;
  transactionType: 'revenue' | 'expense';
  onTypeChange: (type: 'revenue' | 'expense') => void;
  onClearFilters: () => void;
}

export function TransactionFiltersNew({
  search,
  onSearchChange,
  categories,
  selectedCategories,
  onCategoryToggle,
  listings,
  selectedProperties,
  onPropertyToggle,
  transactionType,
  onTypeChange,
  onClearFilters,
}: TransactionFiltersNewProps) {
  
  const filterSections: FilterSection[] = [
    {
      id: "categories",
      title: "Category",
      options: categories,
      selectedValues: selectedCategories,
      onToggle: onCategoryToggle,
    },
    {
      id: "listings",
      title: "Properties", 
      options: [], // Empty since we use custom component
      selectedValues: selectedProperties,
      onToggle: onPropertyToggle,
      listings: listings, // Pass listings data for hierarchical filter
    },
  ];

  const activeFiltersCount = selectedCategories.length + selectedProperties.length;
  
  return (
    <div className="bg-background border-b border-border/30">
      <div className="flex items-center gap-6 px-6 py-4">
        {/* Transaction Type Toggle */}
        <div className="flex items-center bg-muted/20 rounded-xl p-1 border border-border/30">
          <button
            onClick={() => onTypeChange('revenue')}
            className={cn(
              "px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative",
              transactionType === 'revenue'
                ? 'bg-background text-foreground shadow-sm border border-emerald-200/60 ring-1 ring-emerald-200/40'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            )}
          >
            {transactionType === 'revenue' && (
              <div className="absolute inset-0 bg-emerald-50/30 rounded-lg" />
            )}
            <span className="relative">Revenue</span>
          </button>
          <button
            onClick={() => onTypeChange('expense')}
            className={cn(
              "px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative",
              transactionType === 'expense'
                ? 'bg-background text-foreground shadow-sm border border-red-200/60 ring-1 ring-red-200/40'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            )}
          >
            {transactionType === 'expense' && (
              <div className="absolute inset-0 bg-red-50/30 rounded-lg" />
            )}
            <span className="relative">Expenses</span>
          </button>
        </div>

        {/* Horizontal Filter */}
        <div className="flex-1">
          <HorizontalFilter
            searchValue={search}
            onSearchChange={onSearchChange}
            searchPlaceholder="Search transactions..."
            filterSections={filterSections}
            activeFilterCount={activeFiltersCount}
            onClearFilters={onClearFilters}
            className="border-0 p-0"
          />
        </div>
      </div>
    </div>
  );
}