
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ListingsUnitsFilter } from "@/components/transactions/ListingsUnitsFilter";

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
  listings?: any[]; // Add listings data for the special listings filter
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-10 h-10 border-border focus:border-primary focus:ring-primary/20 bg-background rounded-lg shadow-sm transition-all duration-200"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted rounded-full transition-colors duration-200"
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
                  "gap-2 h-10 border-border hover:bg-muted bg-background rounded-lg shadow-sm transition-all duration-200",
                  section.selectedValues.length > 0 && "border-primary bg-primary/5 text-primary"
                )}
              >
                <span className="text-sm font-medium">{section.title}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
              align="start" 
              className={cn(
                "p-0 shadow-lg border bg-background z-50 rounded-lg",
                section.id === 'listings' ? "w-96" : "w-80"
              )}
            >
              <div className="px-4 py-3 border-b bg-muted/50 rounded-t-lg">
                <DropdownMenuLabel className="text-sm font-semibold text-foreground p-0">
                  {section.title}
                </DropdownMenuLabel>
              </div>
              
              <div className="max-h-96 overflow-y-auto p-3">
                {/* Special handling for listings filter */}
                {section.id === 'listings' && section.listings ? (
                  <ListingsUnitsFilter
                    listings={section.listings}
                    selectedValues={section.selectedValues}
                    onToggle={section.onToggle}
                  />
                ) : (
                  // Regular filter options
                  <>
                    {section.options.map((option) => {
                      const isSelected = section.selectedValues.includes(option.value);
                      return (
                        <div
                          key={option.value}
                          onClick={() => section.onToggle(option.value)}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 cursor-pointer rounded-md mx-1 transition-colors hover:bg-muted/50 text-foreground border",
                            isSelected 
                              ? "border-primary bg-primary/5" 
                              : "border-transparent"
                          )}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-sm">{option.label}</span>
                          </div>
                          {option.count !== undefined && (
                            <span className="text-xs px-2 py-0.5 rounded-full ml-2 bg-muted text-muted-foreground">
                              {option.count}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {section.options.length === 0 && (
                      <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                        No options available
                      </div>
                    )}
                  </>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  );
}
