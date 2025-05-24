import React, { useState, useEffect } from "react";
import { Search, MapPin, Phone, Mail, Loader2, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditListingForm } from "./EditListingForm";
import { Button } from "@/components/ui/button";
import { FilterPopover, FilterGroup } from "@/components/ui/filter-popover";
import { FilterTags } from "@/components/ui/filter-tags";
import { useToast } from "@/hooks/use-toast";
import { PropertyTypeDisplay, formatPropertyType } from "@/utils/propertyTypeUtils";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";

// New test listings with real addresses for accuracy testing
const initialListings = [
  {
    id: 1,
    address: "1600 Pennsylvania Avenue NW",
    city: "Washington",
    country: "United States",
    postalCode: "20500",
    type: "commercial_rental",
    category: "office",
    tenant: {
      name: "Government Office",
      phone: "+1 202-456-1414",
      email: "info@whitehouse.gov",
      type: "company"
    },
    notes: "Historic government building"
  },
  {
    id: 2,
    address: "Times Square",
    city: "New York",
    country: "United States",
    postalCode: "10036",
    type: "commercial_rental",
    category: "retail",
    tenant: {
      name: "Broadway Store",
      phone: "+1 212-768-1560",
      email: "info@broadway.com",
      type: "company"
    },
    notes: "Prime Manhattan location"
  },
  {
    id: 3,
    address: "Big Ben",
    city: "London",
    country: "United Kingdom",
    postalCode: "SW1A 0AA",
    type: "hospitality",
    category: "hotel",
    tenant: {
      name: "Historic Tours Ltd",
      phone: "+44 20 7219 3000",
      email: "tours@parliament.uk",
      type: "company"
    },
    notes: "Iconic London landmark area"
  },
  {
    id: 4,
    address: "Champs-Élysées",
    city: "Paris",
    country: "France",
    postalCode: "75008",
    type: "commercial_rental",
    category: "retail",
    tenant: {
      name: "Paris Fashion Boutique",
      phone: "+33 1 42 65 55 10",
      email: "contact@boutique.fr",
      type: "company"
    },
    notes: "Famous shopping avenue"
  },
  {
    id: 5,
    address: "Brandenburg Gate",
    city: "Berlin",
    country: "Germany",
    postalCode: "10117",
    type: "hospitality",
    category: "hotel",
    tenant: {
      name: "Berlin Heritage Hotel",
      phone: "+49 30 227 91 0",
      email: "info@heritage-berlin.de",
      type: "company"
    },
    notes: "Historic landmark location"
  },
  {
    id: 6,
    address: "Sydney Opera House",
    city: "Sydney",
    country: "Australia",
    postalCode: "2000",
    type: "hospitality",
    category: "hotel",
    tenant: {
      name: "Opera House Tours",
      phone: "+61 2 9250 7111",
      email: "info@sydneyoperahouse.com",
      type: "company"
    },
    notes: "Iconic Australian landmark"
  },
  {
    id: 7,
    address: "CN Tower",
    city: "Toronto",
    country: "Canada", 
    postalCode: "M5V 3E6",
    type: "commercial_rental",
    category: "office",
    tenant: {
      name: "Sky High Offices",
      phone: "+1 416-868-6937",
      email: "info@cntower.ca",
      type: "company"
    },
    notes: "Toronto's iconic tower"
  },
  {
    id: 8,
    address: "Red Square",
    city: "Moscow",
    country: "Russia",
    postalCode: "109012",
    type: "commercial_rental",
    category: "retail",
    tenant: {
      name: "Moscow Heritage Shop",
      phone: "+7 495 692-47-03",
      email: "shop@redsquare.ru",
      type: "company"
    },
    notes: "Historic Moscow center"
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
  const [listings, setListings] = useState<any[]>(initialListings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    categories: [],
    occupancy: [],
    countries: []
  });

  const propertyTypes = ["residential_rental", "commercial_rental", "hospitality", "vacation_rental", "mixed_use", "industrial"];
  const categories = [
    "apartment", "house", "condo", "luxury_apartment", "penthouse",
    "office", "retail", "restaurant", "warehouse", "factory",
    "hotel", "boutique_hotel", "resort", "hostel",
    "retail_office", "residential_commercial"
  ];
  const countries = Array.from(new Set(listings.map(l => l.country).filter(Boolean)));
  const occupancyStatuses = ["Occupied", "Vacant"];

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/listings");
      const data = await res.json();
      if (data && data.length > 0) {
        console.log("Loaded listings from server:", data);
        setListings(data);
      } else {
        console.log("No listings found on server, using new test data");
        setListings(initialListings);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      console.log("Server not available, using new test data with real addresses");
      setListings(initialListings);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
    
    // Listen for new listings being added
    const handleRefresh = () => {
      console.log("Refreshing listings...");
      fetchListings();
    };
    
    window.addEventListener('refresh-listings', handleRefresh);
    return () => window.removeEventListener('refresh-listings', handleRefresh);
  }, []);

  const handleListingClick = (listing: any) => {
    setSelectedListing(listing);
    
    if (onListingClick) {
      onListingClick(listing);
    } else {
      setIsEditSheetOpen(true);
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
    <div className="h-full flex flex-col">
      {/* Header with search and filters */}
      <div className="p-4 border-b bg-white">
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

      {/* Scrollable content area */}
      <ScrollArea className="flex-1">
        <div className="p-4">
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
            </div>
          )}
        </div>
      </ScrollArea>

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
