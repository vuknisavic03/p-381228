
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, X, ChevronDown } from "lucide-react";
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
    <div className={cn("space-y-3", className)}>
      {/* Search and Filter Row */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-10 h-9 bg-white border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
          />
        </div>

        {/* Filter Button */}
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-9 gap-2 bg-white border-gray-200 hover:bg-gray-50",
                activeFilterCount > 0 && "border-gray-300 bg-gray-50"
              )}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Filters</h4>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="h-8 px-2 text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {filterSections.map((section, index) => (
                <div key={section.id} className="p-4 border-b border-gray-50 last:border-b-0">
                  <h5 className="font-medium text-xs text-gray-600 mb-3 uppercase tracking-wide">
                    {section.title}
                  </h5>
                  <div className="space-y-2">
                    {section.options.map((option) => {
                      const isSelected = section.selectedValues.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className="flex items-center gap-2 cursor-pointer group p-1.5 rounded hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => section.onToggle(option.value)}
                            className="rounded border-gray-300 text-gray-900 focus:ring-gray-200 focus:ring-1"
                          />
                          <span className="text-sm text-gray-700 flex-1 group-hover:text-gray-900">
                            {option.label}
                          </span>
                          {option.count !== undefined && (
                            <span className="text-xs text-gray-400">
                              {option.count}
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
