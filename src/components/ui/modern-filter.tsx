
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, ChevronDown, Check } from "lucide-react";
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
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-10 h-10"
        />
      </div>

      {/* Filter Dropdown */}
      <Popover open={filterOpen} onOpenChange={setFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2 h-10">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent align="end" className="w-80 p-0 shadow-lg border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50/50">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onClearFilters();
                setFilterOpen(false);
              }}
              className="h-8 px-3 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Clear all
            </Button>
          </div>
          
          {/* Filter Sections */}
          <div className="max-h-96 overflow-y-auto">
            {filterSections.map((section, index) => (
              <div key={section.id} className={cn(
                "px-6 py-5",
                index < filterSections.length - 1 && "border-b border-gray-100"
              )}>
                <h4 className="font-medium text-sm text-gray-900 mb-4">
                  {section.title}
                </h4>
                <div className="space-y-2">
                  {section.options.map((option) => {
                    const isSelected = section.selectedValues.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => section.onToggle(option.value)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-all",
                          "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                          isSelected && "border border-gray-300 bg-gray-50"
                        )}
                      >
                        <span className="text-gray-700">{option.label}</span>
                        <div className="flex items-center gap-3">
                          {option.count !== undefined && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full min-w-[24px] text-center">
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
          <div className="px-6 py-4 border-t bg-gray-50/50">
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
