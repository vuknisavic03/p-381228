import React from "react";
import { HorizontalFilter, FilterSection } from "@/components/ui/horizontal-filter";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface ListingFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  propertyTypes: FilterOption[];
  selectedPropertyTypes: string[];
  onPropertyTypeToggle: (type: string) => void;
  categories: FilterOption[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  occupancyStatuses: FilterOption[];
  selectedOccupancyStatuses: string[];
  onOccupancyStatusToggle: (status: string) => void;
  countries: FilterOption[];
  selectedCountries: string[];
  onCountryToggle: (country: string) => void;
  onClearFilters: () => void;
  showInline?: boolean;
}

export function ListingFilters({
  search,
  onSearchChange,
  propertyTypes,
  selectedPropertyTypes,
  onPropertyTypeToggle,
  categories,
  selectedCategories,
  onCategoryToggle,
  occupancyStatuses,
  selectedOccupancyStatuses,
  onOccupancyStatusToggle,
  countries,
  selectedCountries,
  onCountryToggle,
  onClearFilters,
  showInline = false,
}: ListingFiltersProps) {
  
  const filterSections: FilterSection[] = [
    {
      id: "property-type",
      title: "Property Type",
      options: propertyTypes,
      selectedValues: selectedPropertyTypes,
      onToggle: onPropertyTypeToggle,
    },
    {
      id: "category",
      title: "Category",
      options: categories,
      selectedValues: selectedCategories,
      onToggle: onCategoryToggle,
    },
    {
      id: "occupancy-status",
      title: "Occupancy Status",
      options: occupancyStatuses,
      selectedValues: selectedOccupancyStatuses,
      onToggle: onOccupancyStatusToggle,
    },
    {
      id: "country",
      title: "Country",
      options: countries,
      selectedValues: selectedCountries,
      onToggle: onCountryToggle,
    },
  ];

  const activeFiltersCount = selectedPropertyTypes.length + selectedCategories.length + selectedOccupancyStatuses.length + selectedCountries.length;
  
  // For inline mode, return just the horizontal filter without wrapper
  if (showInline) {
    return (
      <HorizontalFilter
        searchValue={search}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search by Address, Tenant or ID..."
        filterSections={filterSections}
        activeFilterCount={activeFiltersCount}
        onClearFilters={onClearFilters}
        className="border-0 p-0"
      />
    );
  }
  
  return (
    <div className="bg-background border-b border-border/30">
      <div className="px-6 py-4">
        <HorizontalFilter
          searchValue={search}
          onSearchChange={onSearchChange}
          searchPlaceholder="Search by Address, Tenant or ID..."
          filterSections={filterSections}
          activeFilterCount={activeFiltersCount}
          onClearFilters={onClearFilters}
          className="border-0 p-0"
        />
      </div>
    </div>
  );
}