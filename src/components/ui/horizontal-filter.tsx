import React from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

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
}

interface HorizontalFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterSections: FilterSection[];
  activeFilterCount: number;
  onClearFilters: () => void;
  className?: string;
}

export function HorizontalFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterSections,
  activeFilterCount,
  onClearFilters,
  className = ""
}: HorizontalFilterProps) {
  return (
    <div className={`bg-background border-b border-border p-4 ${className}`}>
      <div className="flex items-center gap-4 w-full">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10"
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSearchChange('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3">
          {filterSections.map((section) => (
            <Popover key={section.id}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`gap-2 h-10 ${section.selectedValues.length > 0 ? 'border-primary bg-primary/10' : ''}`}
                >
                  <Filter className="h-4 w-4" />
                  {section.title}
                  {section.selectedValues.length > 0 && (
                    <Badge variant="secondary" className="h-5 text-xs px-2">
                      {section.selectedValues.length}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <div className="p-4 border-b bg-muted/50">
                  <h4 className="font-medium text-sm">{section.title}</h4>
                </div>
                <div className="p-4 space-y-3 max-h-80 overflow-auto">
                  {section.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-muted/50 rounded-md"
                      onClick={() => section.onToggle(option.value)}
                    >
                      <Checkbox
                        id={`${section.id}-${option.value}`}
                        checked={section.selectedValues.includes(option.value)}
                        onChange={() => section.onToggle(option.value)}
                      />
                      <label 
                        htmlFor={`${section.id}-${option.value}`} 
                        className="text-sm flex-1 cursor-pointer font-medium"
                      >
                        {option.label}
                      </label>
                      {option.count !== undefined && (
                        <Badge variant="outline" className="h-5 text-xs px-2">
                          {option.count}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ))}

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <>
              <Separator orientation="vertical" className="h-8" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-10 text-sm text-muted-foreground hover:text-foreground"
              >
                Clear all ({activeFilterCount})
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}