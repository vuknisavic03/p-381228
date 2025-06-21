import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Search, Filter, ChevronDown, Check, X, Building2, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  isUnit?: boolean;
  parentListing?: string;
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
  const [filterSearch, setFilterSearch] = useState<{[key: string]: string}>({});

  const handleFilterSearch = (sectionId: string, value: string) => {
    setFilterSearch(prev => ({
      ...prev,
      [sectionId]: value
    }));
  };

  const getFilteredOptions = (section: FilterSection) => {
    const searchTerm = filterSearch[section.id]?.toLowerCase() || '';
    if (!searchTerm) return section.options;
    
    return section.options.filter(option => 
      option.label.toLowerCase().includes(searchTerm) ||
      (option.parentListing && option.parentListing.toLowerCase().includes(searchTerm))
    );
  };

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

      {/* Clear Filters Button */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-600 hover:text-gray-800 border-gray-200"
        >
          Clear ({activeFilterCount})
        </Button>
      )}

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
                  <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {section.selectedValues.length}
                  </span>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="start" className="w-80 p-0 shadow-lg border bg-white z-50 rounded-lg">
              <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
                <DropdownMenuLabel className="text-sm font-semibold text-gray-900 p-0 mb-2">
                  {section.title}
                </DropdownMenuLabel>
                
                {/* Search within filter */}
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={`Search ${section.title.toLowerCase()}...`}
                    value={filterSearch[section.id] || ''}
                    onChange={(e) => handleFilterSearch(section.id, e.target.value)}
                    className="pl-7 h-8 text-xs border-gray-200 bg-white"
                  />
                </div>
              </div>
              
              <div className="max-h-64 overflow-y-auto p-1">
                {getFilteredOptions(section).map((option) => {
                  const isSelected = section.selectedValues.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      onClick={() => section.onToggle(option.value)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 cursor-pointer rounded-md mx-1 transition-colors hover:bg-gray-50 text-gray-700",
                        option.isUnit && "ml-6 border-l-2 border-gray-200 pl-4"
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-4 h-4 flex items-center justify-center">
                          {isSelected && (
                            <Check className="h-3 w-3 text-blue-600" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {option.isUnit ? (
                            <Home className="h-3 w-3 text-gray-400" />
                          ) : (
                            <Building2 className="h-3 w-3 text-gray-500" />
                          )}
                          
                          <div className="flex flex-col">
                            <span className="text-sm">{option.label}</span>
                            {option.isUnit && option.parentListing && (
                              <span className="text-xs text-gray-400">{option.parentListing}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {option.count !== undefined && option.count > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full ml-2 bg-gray-100 text-gray-600 font-medium">
                          {option.count}
                        </span>
                      )}
                    </div>
                  );
                })}
                {getFilteredOptions(section).length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500 text-center">
                    No options found
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  );
}
