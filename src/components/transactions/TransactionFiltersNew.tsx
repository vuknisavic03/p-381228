import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

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
  
  const activeFiltersCount = selectedCategories.length + selectedProperties.length;
  
  return (
    <div className="bg-card border-b p-4 space-y-4">
      {/* Top Row: Type Toggle and Search */}
      <div className="flex items-center gap-4">
        {/* Transaction Type Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={transactionType === 'revenue' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTypeChange('revenue')}
            className="h-8 text-xs"
          >
            Revenue
          </Button>
          <Button
            variant={transactionType === 'expense' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTypeChange('expense')}
            className="h-8 text-xs"
          >
            Expenses
          </Button>
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-9"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSearchChange('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Bottom Row: Filters */}
      <div className="flex items-center gap-3">
        {/* Category Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={`gap-2 h-8 ${selectedCategories.length > 0 ? 'border-primary bg-primary/10' : ''}`}
            >
              <Filter className="h-3 w-3" />
              Category
              {selectedCategories.length > 0 && (
                <Badge variant="secondary" className="h-4 text-xs px-1.5">
                  {selectedCategories.length}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <div className="p-3 border-b bg-muted/50">
              <h4 className="font-medium text-sm">Categories</h4>
            </div>
            <div className="p-3 space-y-2 max-h-64 overflow-auto">
              {categories.map((category) => (
                <div
                  key={category.value}
                  className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-muted/50 rounded"
                  onClick={() => onCategoryToggle(category.value)}
                >
                  <Checkbox
                    id={category.value}
                    checked={selectedCategories.includes(category.value)}
                    onChange={() => onCategoryToggle(category.value)}
                  />
                  <label htmlFor={category.value} className="text-sm flex-1 cursor-pointer">
                    {category.label}
                  </label>
                  {category.count !== undefined && (
                    <Badge variant="outline" className="h-4 text-xs px-1.5">
                      {category.count}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Property Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={`gap-2 h-8 ${selectedProperties.length > 0 ? 'border-primary bg-primary/10' : ''}`}
            >
              <Filter className="h-3 w-3" />
              Properties
              {selectedProperties.length > 0 && (
                <Badge variant="secondary" className="h-4 text-xs px-1.5">
                  {selectedProperties.length}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <div className="p-3 border-b bg-muted/50">
              <h4 className="font-medium text-sm">Properties</h4>
            </div>
            <div className="p-3 space-y-2 max-h-64 overflow-auto">
              {properties.map((property) => (
                <div
                  key={property.value}
                  className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-muted/50 rounded"
                  onClick={() => onPropertyToggle(property.value)}
                >
                  <Checkbox
                    id={property.value}
                    checked={selectedProperties.includes(property.value)}
                    onChange={() => onPropertyToggle(property.value)}
                  />
                  <label htmlFor={property.value} className="text-sm flex-1 cursor-pointer">
                    {property.label}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all ({activeFiltersCount})
            </Button>
          </>
        )}
      </div>
    </div>
  );
}