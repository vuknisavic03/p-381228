
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
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <h3 className="font-medium text-gray-900">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 px-3 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Clear all
            </Button>
          </div>
          
          {/* Filter Sections */}
          <div className="max-h-80 overflow-y-auto py-2">
            {filterSections.map((section, index) => (
              <div key={section.id} className="px-6 py-4">
                <h4 className="font-medium text-sm text-gray-800 mb-3">
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
                          "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                          "hover:bg-gray-50 focus:outline-none",
                          isSelected && "outline outline-1 outline-gray-300"
                        )}
                      >
                        <span className="text-gray-700 text-left">{option.label}</span>
                        <div className="flex items-center gap-2">
                          {option.count !== undefined && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full min-w-[20px] text-center">
                              {option.count}
                            </span>
                          )}
                          {isSelected && (
                            <Check className="h-3.5 w-3.5 text-blue-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
