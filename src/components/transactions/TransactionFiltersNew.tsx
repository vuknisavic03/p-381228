import React from "react";
import { HorizontalFilter, FilterSection } from "@/components/ui/horizontal-filter";
import { Button } from "@/components/ui/button";

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
  properties: FilterOption[];
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
  properties,
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
      id: "properties",
      title: "Properties", 
      options: properties,
      selectedValues: selectedProperties,
      onToggle: onPropertyToggle,
    },
  ];

  const activeFiltersCount = selectedCategories.length + selectedProperties.length;
  
  return (
    <div className="bg-background border-b border-border/30">
      <div className="flex items-center gap-6 px-6 py-4">
        {/* Transaction Type Toggle */}
        <div className="flex bg-muted/40 rounded-lg p-0.5 border border-border/30">
          <button
            onClick={() => onTypeChange('revenue')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              transactionType === 'revenue'
                ? 'bg-background text-foreground shadow-sm border border-border/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => onTypeChange('expense')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              transactionType === 'expense'
                ? 'bg-background text-foreground shadow-sm border border-border/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }`}
          >
            Expenses
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