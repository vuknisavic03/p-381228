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
    <div className="bg-background border-b border-border">
      <div className="flex items-center gap-4 p-4">
        {/* Transaction Type Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={transactionType === 'revenue' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTypeChange('revenue')}
            className="h-9 text-sm px-4"
          >
            Revenue
          </Button>
          <Button
            variant={transactionType === 'expense' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTypeChange('expense')}
            className="h-9 text-sm px-4"
          >
            Expenses
          </Button>
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