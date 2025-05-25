
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, X, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  multiSelect?: boolean;
}

interface ModernFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterSections: FilterSection[];
  activeFilterCount: number;
  onClearFilters: () => void;
  className?: string;
}

export function ModernFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterSections,
  activeFilterCount,
  onClearFilters,
  className
}: ModernFilterProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-10 h-10 bg-white border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      {/* Filter Dropdown */}
      <Popover open={filterOpen} onOpenChange={setFilterOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-10 gap-2 px-4 bg-white border-gray-200 hover:bg-gray-50 transition-all",
              activeFilterCount > 0 && "border-blue-300 bg-blue-50 text-blue-700"
            )}
          >
            <Filter className="h-4 w-4" />
            <span className="font-medium">
              {activeFilterCount > 0 ? `Filtered (${activeFilterCount})` : "Filter"}
            </span>
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent align="end" className="w-72 p-0 shadow-lg border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClearFilters();
                  setFilterOpen(false);
                }}
                className="h-8 px-3 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              >
                Clear all
              </Button>
            )}
          </div>
          
          {/* Filter Sections */}
          <div className="max-h-80 overflow-y-auto">
            {filterSections.map((section) => (
              <div key={section.id} className="p-4 border-b border-gray-50 last:border-b-0">
                <h4 className="font-medium text-sm text-gray-700 mb-3">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.options.map((option) => {
                    const isSelected = section.selectedValues.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => section.onToggle(option.value)}
                        className={cn(
                          "w-full flex items-center justify-between p-2 rounded-lg text-sm transition-all",
                          isSelected 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                        )}
                      >
                        <span className="font-medium">{option.label}</span>
                        <div className="flex items-center gap-2">
                          {option.count !== undefined && (
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                              {option.count}
                            </span>
                          )}
                          {isSelected && (
                            <Check className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <Button
              onClick={() => setFilterOpen(false)}
              className="w-full h-9 bg-gray-900 hover:bg-gray-800 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
