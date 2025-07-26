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
  transactionType: 'revenue' | 'expense' | 'all';
  onTypeChange: (type: 'revenue' | 'expense' | 'all') => void;
  onClearFilters: () => void;
  typeOptions?: FilterOption[];
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
  typeOptions = [],
}: TransactionFiltersNewProps) {
  
  const filterSections: FilterSection[] = [
    {
      id: "type",
      title: "Type",
      options: typeOptions.length > 0 ? typeOptions : [
        { value: "all", label: "All", count: 0 },
        { value: "revenue", label: "Revenue", count: 0 },
        { value: "expense", label: "Expense", count: 0 }
      ],
      selectedValues: [transactionType],
      onToggle: (value: string) => onTypeChange(value as 'revenue' | 'expense' | 'all'),
    },
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

  
  
  return (
    <div className="bg-background border-b border-border/30">
      <div className="px-6 py-4">
        <HorizontalFilter
          searchValue={search}
          onSearchChange={onSearchChange}
          searchPlaceholder="Search transactions..."
          filterSections={filterSections}
          activeFilterCount={0}
          onClearFilters={onClearFilters}
          className="border-0 p-0"
        />
      </div>
    </div>
  );
}