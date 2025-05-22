import React, { useState, useEffect } from "react";
import { Search, MapPin, Phone, Mail, Loader2, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditListingForm } from "./EditListingForm";
import { Button } from "@/components/ui/button";
import { FilterPopover, FilterGroup } from "@/components/ui/filter-popover";
import { FilterTags } from "@/components/ui/filter-tags";
import { useToast } from "@/hooks/use-toast";
import { PropertyTypeDisplay, formatPropertyType } from "@/utils/propertyTypeUtils";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";

// Mock listings data - same as before
const mockListings = [
  {
    id: 1,
    address: "Belgrade, Dunavska 12",
    city: "Belgrade",
    country: "Serbia",
    type: "commercial_rental",
    category: "retail",
    tenant: {
      name: "Alexander Whitmore",
      phone: "000-000-0000",
      email: "alex@example.com"
    }
  },
  // ... keep existing code (other mock listings)
];

interface FilterState {
  types: string[];
  categories: string[];
  occupancy: string[];
  countries: string[];
}

interface ListingListProps {
  onListingClick?: (listing: any) => void;  // New prop for parent component to handle listing clicks
  onListingsData?: (listings: any[]) => void;  // New prop to share filtered listings data
}

export function ListingList({ onListingClick, onListingsData }: ListingListProps) {
  const [listings, setListings] = useState<any[]>(mockListings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Enhanced filter state
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    categories: [],
    occupancy: [],
    countries: []
  });

  // Keep existing code for filter setup
  const propertyTypes = Array.from(new Set(mockListings.map(l => l.type)));
  const categories = Array.from(new Set(mockListings.map(l => l.category)));
  const countries = Array.from(new Set(mockListings.map(l => l.country)));
  const occupancyStatuses = ["Occupied", "Vacant"];

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/listings");
      const data = await res.json();
      if (data && data.length > 0) {
        setListings(data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      // Keep using mock data on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleListingClick = (listing: any) => {
    setSelectedListing(listing);
    
    // If parent component provided handler, call it
    if (onListingClick) {
      onListingClick(listing);
    } else {
      // Otherwise use internal sheet
      setIsEditSheetOpen(true);
    }
  };

  // Keep existing filter functions
  const toggleFilter = (category: keyof FilterState, value: string) => {
    // ... keep existing code
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
    // ... keep existing code
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

  // Keep existing filter group setup
  const filterGroups: FilterGroup[] = [
    // ... keep existing code (filter groups)
    {
      title: "Property Type",
      options: propertyTypes.map(type => ({
        value: type,
        label: formatPropertyType(type as PropertyType)
      })),
      selectedValues: filters.types,
      onToggle: (value: string) => toggleFilter("types", value),
    },
    {
      title: "Category",
      options: categories.map(category => ({
        value: category,
        label: category.replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
      })),
      selectedValues: filters.categories,
      onToggle: (value: string) => toggleFilter("categories", value),
    },
    {
      title: "Occupancy Status",
      options: occupancyStatuses,
      selectedValues: filters.occupancy,
      onToggle: (value: string) => toggleFilter("occupancy", value),
    },
    {
      title: "Country",
      options: countries,
      selectedValues: filters.countries,
      onToggle: (value: string) => toggleFilter("countries", value),
    },
  ];

  const activeFilterCount = 
    filters.types.length + 
    filters.categories.length + 
    filters.occupancy.length + 
    filters.countries.length;

  // Prepare filter tags - keep existing code
  const filterTags = [
    // ... keep existing code for filter tags
    ...filters.types.map(type => ({
      category: "Type",
      value: formatPropertyType(type as PropertyType),
      onRemove: () => toggleFilter("types", type)
    })),
    ...filters.categories.map(category => ({
      category: "Category",
      value: category.replace(/_/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      onRemove: () => toggleFilter("categories", category)
    })),
    ...filters.occupancy.map(status => ({
      category: "Occupancy",
      value: status,
      onRemove: () => toggleFilter("occupancy", status)
    })),
    ...filters.countries.map(country => ({
      category: "Country",
      value: country,
      onRemove: () => toggleFilter("countries", country)
    })),
  ];

  // Filter listings based on search and filters
  const filteredListings = listings.filter(listing => {
    // ... keep existing code (filtering logic)
    // Text search
    const matchesSearch = listing.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.tenant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(listing.id).includes(searchTerm);
    
    // Filter by property type
    const matchesType = filters.types.length === 0 || 
      filters.types.includes(listing.type);
    
    // Filter by category  
    const matchesCategory = filters.categories.length === 0 || 
      filters.categories.includes(listing.category);
    
    // Filter by country
    const matchesCountry = filters.countries.length === 0 || 
      filters.countries.includes(listing.country);
    
    // Filter by occupancy status
    const matchesOccupancy = filters.occupancy.length === 0 || (
      (filters.occupancy.includes("Occupied") && listing.tenant) ||
      (filters.occupancy.includes("Vacant") && !listing.tenant)
    );

    return matchesSearch && matchesType && matchesCategory && matchesCountry && matchesOccupancy;
  });

  // Share filtered listings data with parent component if callback provided
  useEffect(() => {
    if (onListingsData) {
      onListingsData(filteredListings);
    }
  }, [filteredListings, onListingsData]);

  return (
    <div className="h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by Address, Tenant or ID..." 
              className="pl-8 h-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <FilterPopover 
            groups={filterGroups}
            selectedCount={activeFilterCount}
            onReset={clearFilters}
            trigger={
              <Button variant="outline" className="flex items-center gap-2 h-9">
                <ListFilter className="h-4 w-4" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 ml-1">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            }
          />
        </div>
        
        {/* Show active filter tags */}
        <FilterTags tags={filterTags} onClearAll={clearFilters} />
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading Listings...</span>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <Card 
                  key={listing.id} 
                  className="p-1 hover:bg-gray-50/50 cursor-pointer transition-all duration-200 hover:shadow-sm"
                  onClick={() => handleListingClick(listing)}
                >
                  {/* Keep existing card content */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between p-4 pb-2">
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-[#9EA3AD] font-medium">#{listing.id}</span>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary/80" />
                          <span className="font-medium">{listing.address}</span>
                        </div>
                      </div>
                      <PropertyTypeDisplay 
                        type={listing.type as PropertyType} 
                        className="px-2.5 py-1 bg-primary/5 text-primary/80 text-sm rounded-full font-medium"
                      />
                    </div>
                    
                    <div className="h-px bg-[#E4E5EA] mx-4" />
                    
                    <div className="flex items-center justify-between p-4 pt-2">
                      <div className="flex items-center gap-8 text-sm">
                        <span className="text-[#9EA3AD] font-medium">{listing.tenant?.name || 'No Tenant'}</span>
                        <div className="flex items-center gap-8">
                          {listing.tenant?.phone && (
                            <div className="flex items-center gap-2 transition-all duration-200 hover:text-primary">
                              <Phone className="h-4 w-4 text-[#9EA3AD]" />
                              <span>{listing.tenant.phone}</span>
                            </div>
                          )}
                          {listing.tenant?.email && (
                            <div className="flex items-center gap-2 transition-all duration-200 hover:text-primary">
                              <Mail className="h-4 w-4 text-[#9EA3AD]" />
                              <span>{listing.tenant.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground/80 text-sm rounded-full font-medium">
                        {listing.category?.replace(/_/g, ' ')
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm || activeFilterCount > 0 
                  ? 'No Listings Found Matching Your Filters' 
                  : 'No Listings Available'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Only render the Sheet here if parent hasn't provided a click handler */}
      {!onListingClick && (
        <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <SheetContent 
            side="right" 
            className="w-[480px] sm:w-[540px] p-0 border-l shadow-2xl transition-transform duration-300"
          >
            {selectedListing && (
              <EditListingForm 
                listing={selectedListing} 
                onClose={() => setIsEditSheetOpen(false)}
                onUpdate={(updatedListing) => {
                  setListings(listings.map(l => 
                    l.id === updatedListing.id ? updatedListing : l
                  ));
                  setIsEditSheetOpen(false);
                }}
              />
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
