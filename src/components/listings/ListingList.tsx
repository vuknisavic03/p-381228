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

// Enhanced mock listings data with real New York addresses
const mockListings = [
  {
    id: 1,
    address: "123 Broadway, New York",
    city: "New York",
    country: "USA",
    type: "commercial_rental",
    category: "retail",
    tenant: {
      name: "Alexander Whitmore",
      phone: "+1 (555) 123-4567",
      email: "alex@example.com"
    }
  },
  {
    id: 2,
    address: "456 5th Avenue, New York",
    city: "New York",
    country: "USA",
    type: "residential_rental",
    category: "apartment",
    tenant: {
      name: "Sarah Johnson",
      phone: "+1 (555) 234-5678",
      email: "sarah.j@example.com"
    }
  },
  {
    id: 3,
    address: "789 Madison Avenue, New York",
    city: "New York",
    country: "USA",
    type: "hospitality",
    category: "hotel",
    tenant: {
      name: "Grand Hotel Management",
      phone: "+1 (555) 345-6789",
      email: "info@grandhotel.com"
    }
  },
  {
    id: 4,
    address: "321 Park Avenue, New York",
    city: "New York",
    country: "USA",
    type: "vacation_rental",
    category: "condo",
    tenant: null
  },
  {
    id: 5,
    address: "25 Wall Street, New York",
    city: "New York",
    country: "USA",
    type: "commercial_rental",
    category: "office",
    tenant: {
      name: "Financial Corp LLC",
      phone: "+1 (555) 456-7890",
      email: "contact@financialcorp.com"
    }
  },
  {
    id: 6,
    address: "100 Times Square, New York",
    city: "New York",
    country: "USA",
    type: "mixed_use",
    category: "retail_office",
    tenant: {
      name: "Times Square Ventures",
      phone: "+1 (555) 567-8901",
      email: "leasing@tsventures.com"
    }
  },
  {
    id: 7,
    address: "200 Central Park West, New York",
    city: "New York",
    country: "USA",
    type: "residential_rental",
    category: "luxury_apartment",
    tenant: {
      name: "Michael Thompson",
      phone: "+1 (555) 678-9012",
      email: "m.thompson@example.com"
    }
  },
  {
    id: 8,
    address: "15 Columbus Circle, New York",
    city: "New York",
    country: "USA",
    type: "commercial_rental",
    category: "restaurant",
    tenant: {
      name: "Gourmet Bistro NYC",
      phone: "+1 (555) 789-0123",
      email: "info@gourmetbistro.com"
    }
  },
  {
    id: 9,
    address: "50 Rockefeller Plaza, New York",
    city: "New York",
    country: "USA",
    type: "commercial_rental",
    category: "office",
    tenant: {
      name: "Media Solutions Inc",
      phone: "+1 (555) 890-1234",
      email: "contact@mediasolutions.com"
    }
  },
  {
    id: 10,
    address: "300 East 42nd Street, New York",
    city: "New York",
    country: "USA",
    type: "industrial",
    category: "warehouse",
    tenant: {
      name: "Logistics Pro",
      phone: "+1 (555) 901-2345",
      email: "operations@logisticspro.com"
    }
  },
  {
    id: 11,
    address: "500 Park Avenue, New York",
    city: "New York",
    country: "USA",
    type: "hospitality",
    category: "boutique_hotel",
    tenant: null
  },
  {
    id: 12,
    address: "1000 2nd Avenue, New York",
    city: "New York",
    country: "USA",
    type: "vacation_rental",
    category: "penthouse",
    tenant: {
      name: "Luxury Stays NYC",
      phone: "+1 (555) 012-3456",
      email: "bookings@luxurystays.com"
    }
  }
];

interface FilterState {
  types: string[];
  categories: string[];
  occupancy: string[];
  countries: string[];
}

interface ListingListProps {
  onListingClick?: (listing: any) => void;
  onListingsData?: (listings: any[]) => void;
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

  // Enhanced property types and categories based on form options
  const propertyTypes = ["residential_rental", "commercial_rental", "hospitality", "vacation_rental", "mixed_use", "industrial"];
  const categories = [
    "apartment", "house", "condo", "luxury_apartment", "penthouse",
    "office", "retail", "restaurant", "warehouse", "factory",
    "hotel", "boutique_hotel", "resort", "hostel",
    "retail_office", "residential_commercial"
  ];
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
    
    if (onListingClick) {
      onListingClick(listing);
    } else {
      setIsEditSheetOpen(true);
    }
  };

  // ... keep existing code (filter functions)
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

  // Enhanced filter groups with all categories
  const filterGroups: FilterGroup[] = [
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

  // ... keep existing code (filter tags and filtered listings logic)
  const filterTags = [
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
    
    const matchesOccupancy = filters.occupancy.length === 0 || (
      (filters.occupancy.includes("Occupied") && listing.tenant) ||
      (filters.occupancy.includes("Vacant") && !listing.tenant)
    );

    return matchesSearch && matchesType && matchesCategory && matchesCountry && matchesOccupancy;
  });

  useEffect(() => {
    if (onListingsData) {
      onListingsData(filteredListings);
    }
  }, [filteredListings, onListingsData]);

  return (
    <div className="h-full">
      {/* ... keep existing code (header with search and filters) */}
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
        
        <FilterTags tags={filterTags} onClearAll={clearFilters} />
      </div>

      {/* ... keep existing code (listing cards and sheet) */}
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
