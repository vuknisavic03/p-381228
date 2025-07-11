
import React from 'react';
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { TransactionFilters } from "./TransactionFilters";
import { SimplePropertyFilter } from "./SimplePropertyFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { FilterSection } from "@/components/ui/modern-filter";

interface Property {
  id: string;
  name: string;
  units?: Array<{ id: string; unitNumber: string }>;
}

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
  // Extract properties from filter sections
  const propertiesSection = filterSections.find(section => section.id === 'listings');
  const properties: Property[] = propertiesSection?.listings || [];
  const selectedProperties = propertiesSection?.selectedValues || [];
  
  // Extract category filters
  const categorySection = filterSections.find(section => section.id === 'category');
  const categoryOptions = categorySection?.options || [];
  const selectedCategories = categorySection?.selectedValues || [];

  const handlePropertyToggle = (propertyId: string) => {
    if (propertiesSection?.onToggle) {
      propertiesSection.onToggle(propertyId);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    if (categorySection?.onToggle) {
      categorySection.onToggle(categoryId);
    }
  };

  const clearPropertyFilters = () => {
    selectedProperties.forEach(property => {
      if (propertiesSection?.onToggle) {
        propertiesSection.onToggle(property);
      }
    });
  };

  const clearCategoryFilters = () => {
    selectedCategories.forEach(category => {
      if (categorySection?.onToggle) {
        categorySection.onToggle(category);
      }
    });
  };

  return (
    <div className="border-b bg-surface-secondary shadow-[var(--shadow-soft)]">
      <div className="px-6 py-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 bg-background border-border"
            />
          </div>

          {/* Property Filter */}
          <SimplePropertyFilter
            properties={properties}
            selectedProperties={selectedProperties}
            onPropertyToggle={handlePropertyToggle}
            onClear={clearPropertyFilters}
          />

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {categoryOptions.map((option) => {
              const isSelected = selectedCategories.includes(option.value);
              return (
                <Button
                  key={option.value}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryToggle(option.value)}
                  className="h-10 text-sm"
                >
                  {option.label}
                  {option.count !== undefined && (
                    <span className="ml-1 opacity-60">({option.count})</span>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Transaction Type Toggle */}
          <TransactionTypeToggle 
            value={transactionType} 
            onChange={setTransactionType} 
            className="h-10"
          />

          {/* Clear All Filters */}
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-10 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All ({activeFilterCount})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
