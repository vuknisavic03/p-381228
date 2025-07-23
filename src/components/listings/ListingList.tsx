import React, { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PropertyTypeDisplay, formatPropertyType } from "@/utils/propertyTypeUtils";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { ModernFilter, FilterSection } from "@/components/ui/modern-filter";
import { ListingTable } from "./ListingTable";

// Category mapping from ListingForm - this ensures consistency
const typeToCategoryMap = {
  residential_rental: [
    { value: "single_family", label: "Single-family Home" },
    { value: "multi_family", label: "Multi-family" },
    { value: "apartment_condo", label: "Apartment/Condo" },
  ],
  commercial_rental: [
    { value: "office", label: "Office Space" },
    { value: "retail", label: "Retail Store" },
    { value: "medical", label: "Medical/Professional" },
  ],
  industrial: [
    { value: "warehouse", label: "Warehouse" },
    { value: "distribution", label: "Distribution Facility" },
    { value: "manufacturing", label: "Manufacturing" },
  ],
  hospitality: [
    { value: "hotel", label: "Hotel" },
    { value: "motel", label: "Motel" },
    { value: "bed_breakfast", label: "Bed & Breakfast" },
  ],
  vacation_rental: [
    { value: "short_term", label: "Short-term Rental" },
    { value: "serviced_apartment", label: "Serviced Apartment" },
    { value: "holiday_home", label: "Holiday Home" },
  ],
  mixed_use: [
    { value: "residential_commercial", label: "Residential-Commercial" },
    { value: "live_work", label: "Live-Work Space" },
    { value: "multi_purpose", label: "Multi-Purpose" },
  ],
};

// Helper function to get category label
const getCategoryLabel = (type: string, category: string) => {
  const typeCategories = typeToCategoryMap[type as keyof typeof typeToCategoryMap];
  if (!typeCategories) return category;
  
  const foundCategory = typeCategories.find(cat => cat.value === category);
  return foundCategory ? foundCategory.label : category;
};

// Helper function to get all available categories for filtering
const getAllAvailableCategories = (listings: any[]) => {
  const categoriesSet = new Set<string>();
  listings.forEach(listing => {
    if (listing.category) {
      categoriesSet.add(listing.category);
    }
  });
  return Array.from(categoriesSet);
};

interface FilterState {
  types: string[];
  categories: string[];
  occupancy: string[];
  countries: string[];
}

interface ListingListProps {
  onListingClick?: (listing: any) => void;
  listings: any[];
  isLoading: boolean;
}

export function ListingList({ onListingClick, listings, isLoading }: ListingListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    categories: [],
    occupancy: [],
    countries: []
  });

  const propertyTypes = ["residential_rental", "commercial_rental", "hospitality", "vacation_rental", "mixed_use", "industrial"];
  const categories = getAllAvailableCategories(listings);
  const countries = Array.from(new Set(listings.map(l => l.country).filter(Boolean)));
  const occupancyStatuses = ["occupied", "vacant"];

  const handleListingClick = (listing: any) => {
    if (onListingClick) {
      onListingClick(listing);
    }
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter(v => v !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      categories: [],
      occupancy: [],
      countries: []
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
      duration: 3000,
    });
  };

  // Calculate counts for each filter option
  const getOptionCounts = (filterKey: keyof FilterState, options: string[]) => {
    return options.map(option => {
      let count = 0;
      if (filterKey === 'types') {
        count = listings.filter(l => l.type === option).length;
      } else if (filterKey === 'categories') {
        count = listings.filter(l => l.category === option).length;
      } else if (filterKey === 'countries') {
        count = listings.filter(l => l.country === option).length;
      } else if (filterKey === 'occupancy') {
        count = listings.filter(l => l.occupancyStatus === option || (!l.occupancyStatus && option === 'occupied' && l.tenant) || (!l.occupancyStatus && option === 'vacant' && !l.tenant)).length;
      }
      return { value: option, label: option, count };
    });
  };

  const filterSections: FilterSection[] = [
    {
      id: "types",
      title: "Property Type",
      options: getOptionCounts('types', propertyTypes).map(item => ({
        ...item,
        label: formatPropertyType(item.value as PropertyType)
      })),
      selectedValues: filters.types,
      onToggle: (value: string) => toggleFilter("types", value),
    },
    {
      id: "categories",
      title: "Category",
      options: getOptionCounts('categories', categories).map(item => ({
        ...item,
        label: getCategoryLabel(
          listings.find(l => l.category === item.value)?.type || '',
          item.value
        )
      })),
      selectedValues: filters.categories,
      onToggle: (value: string) => toggleFilter("categories", value),
    },
    {
      id: "occupancy",
      title: "Occupancy Status",
      options: getOptionCounts('occupancy', occupancyStatuses).map(item => ({
        ...item,
        label: item.value.charAt(0).toUpperCase() + item.value.slice(1)
      })),
      selectedValues: filters.occupancy,
      onToggle: (value: string) => toggleFilter("occupancy", value),
    },
    {
      id: "countries",
      title: "Country",
      options: getOptionCounts('countries', countries),
      selectedValues: filters.countries,
      onToggle: (value: string) => toggleFilter("countries", value),
    },
  ];

  const activeFilterCount = 
    filters.types.length + 
    filters.categories.length + 
    filters.occupancy.length + 
    filters.countries.length;

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.tenant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(listing.id).includes(searchTerm);
    
    const matchesType = filters.types.length === 0 || 
      filters.types.includes(listing.type);
    
    const matchesCategory = filters.categories.length === 0 || 
      filters.categories.includes(listing.category);
    
    const matchesCountry = filters.countries.length === 0 || 
      filters.countries.includes(listing.country);
    
    const listingOccupancy = listing.occupancyStatus || (listing.tenant ? 'occupied' : 'vacant');
    const matchesOccupancy = filters.occupancy.length === 0 || 
      filters.occupancy.includes(listingOccupancy);

    return matchesSearch && matchesType && matchesCategory && matchesCountry && matchesOccupancy;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Modern Filter Header */}
      <div className="p-4 border-b border-border bg-background shadow-sm">
        <ModernFilter
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search by Address, Tenant or ID..."
          filterSections={filterSections}
          activeFilterCount={activeFilterCount}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Scrollable content area with fixed table layout */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading Listings...</span>
            </div>
          ) : (
            <>
              {filteredListings.length > 0 ? (
                <ListingTable 
                  listings={filteredListings} 
                  onListingClick={handleListingClick} 
                />
              ) : (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || activeFilterCount > 0 
                      ? 'No listings match your current filters' 
                      : 'Start by adding your first property listing with accurate address coordinates'}
                  </p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Refresh Listings
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}