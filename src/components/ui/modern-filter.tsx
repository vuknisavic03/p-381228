
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Search, Filter, ChevronDown, Check, X } from "lucide-react";
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
          className="pl-10 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg shadow-sm"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filter Sections as Individual Dropdowns */}
      <div className="flex items-center gap-2">
        {filterSections.map((section) => (
          <DropdownMenu key={section.id}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className={cn(
                  "gap-2 h-10 border-gray-200 hover:bg-gray-50 bg-white rounded-lg shadow-sm transition-all duration-200",
                  section.selectedValues.length > 0 && "border-blue-500 bg-blue-50 text-blue-700"
                )}
              >
                <span className="text-sm font-medium">{section.title}</span>
                {section.selectedValues.length > 0 && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
                    {section.selectedValues.length}
                  </span>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="start" className="w-64 p-0 shadow-lg border bg-white z-50 rounded-lg">
              <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
                <DropdownMenuLabel className="text-sm font-semibold text-gray-900 p-0">
                  {section.title}
                </DropdownMenuLabel>
              </div>
              
              <div className="max-h-64 overflow-y-auto p-1">
                {section.options.map((option) => {
                  const isSelected = section.selectedValues.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      onClick={() => section.onToggle(option.value)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 cursor-pointer rounded-md mx-1 transition-colors",
                        isSelected 
                          ? "bg-blue-50 text-blue-700" 
                          : "hover:bg-gray-50 text-gray-700"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        {isSelected && (
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        )}
                        <span className="text-sm">{option.label}</span>
                      </div>
                      {option.count !== undefined && (
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full ml-2",
                          isSelected 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-gray-100 text-gray-500"
                        )}>
                          {option.count}
                        </span>
                      )}
                    </div>
                  );
                })}
                {section.options.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500 text-center">
                    No options available
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        {/* Clear All Filters Button */}
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="gap-1 h-10 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-3 w-3" />
            <span className="text-sm">Clear</span>
          </Button>
        )}
      </div>
    </div>
  );
}
