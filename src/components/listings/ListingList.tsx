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

// Updated mock listings with ACCURATE Belgrade coordinates
const mockListings = [
  {
    id: 1,
    address: "Dunavska 15, Belgrade",
    city: "Belgrade",
    country: "Serbia", 
    type: "commercial_rental",
    category: "retail",
    tenant: {
      name: "Belgrade Retail Co.",
      phone: "+381 11 123-4567",
      email: "info@belgraderetail.rs"
    },
    location: { lat: 44.8186, lng: 20.4575 } // Accurate Dunavska location
  },
  {
    id: 2,
    address: "Knez Mihailova 42, Belgrade",
    city: "Belgrade", 
    country: "Serbia",
    type: "residential_rental",
    category: "apartment",
    tenant: {
      name: "Marko Petrović",
      phone: "+381 11 234-5678",
      email: "marko.petrovic@example.com"
    },
    location: { lat: 44.8176, lng: 20.4633 } // Main pedestrian street
  },
  {
    id: 3,
    address: "Makedonska 23, Belgrade",
    city: "Belgrade",
    country: "Serbia", 
    type: "hospitality",
    category: "boutique_hotel",
    tenant: {
      name: "Heritage Hotel Belgrade",
      phone: "+381 11 345-6789",
      email: "reservations@heritagehotel.rs"
    },
    location: { lat: 44.8125, lng: 20.4612 } // Stari Grad area
  },
  {
    id: 4,
    address: "Terazije 35, Belgrade",
    city: "Belgrade",
    country: "Serbia",
    type: "vacation_rental",
    category: "luxury_apartment",
    tenant: null,
    location: { lat: 44.8154, lng: 20.4606 } // Central Belgrade square
  },
  {
    id: 5,
    address: "Bulevar kralja Aleksandra 73, Belgrade",
    city: "Belgrade",
    country: "Serbia",
    type: "commercial_rental",
    category: "office",
    tenant: {
      name: "Tech Solutions Belgrade",
      phone: "+381 11 456-7890",
      email: "office@techsolutions.rs"
    },
    location: { lat: 44.8042, lng: 20.4807 } // Vračar municipality
  },
  {
    id: 6,
    address: "Svetogorska 12, Belgrade",
    city: "Belgrade",
    country: "Serbia",
    type: "mixed_use",
    category: "residential_commercial",
    tenant: {
      name: "Dorćol Properties",
      phone: "+381 11 567-8901",
      email: "leasing@dorcol.rs"
    },
    location: { lat: 44.8089, lng: 20.4681 } // Dorćol area
  },
  {
    id: 7,
    address: "Rajićeva 27, Belgrade",
    city: "Belgrade",
    country: "Serbia",
    type: "residential_rental",
    category: "house",
    tenant: {
      name: "Ana Nikolić",
      phone: "+381 11 678-9012",
      email: "ana.nikolic@example.com"
    },
    location: { lat: 44.8168, lng: 20.4598 } // Old town Belgrade
  },
  {
    id: 8,
    address: "Skadarlija 29, Belgrade",
    city: "Belgrade",
    country: "Serbia",
    type: "commercial_rental",
    category: "restaurant",
    tenant: {
      name: "Traditional Serbian Cuisine",
      phone: "+381 11 789-0123",
      email: "info@traditionalcuisine.rs"
    },
    location: { lat: 44.8159, lng: 20.4652 } // Famous bohemian quarter
  },
  {
    id: 9,
    address: "Nemanjina 4, Belgrade",
    city: "Belgrade",
    country: "Serbia",
    type: "industrial",
    category: "warehouse",
    tenant: {
      name: "Belgrade Logistics",
      phone: "+381 11 890-1234",
      email: "operations@belgradelogistics.rs"
    },
    location: { lat: 44.8082, lng: 20.4576 } // Near main railway station
  },
  {
    id: 10,
    address: "Kosančićev venac 19, Belgrade",
    city: "Belgrade",
    country: "Serbia",
    type: "hospitality",
    category: "hotel",
    tenant: {
      name: "Historic Belgrade Hotel",
      phone: "+381 11 901-2345",
      email: "booking@historicbelgrade.rs"
    },
    location: { lat: 44.8203, lng: 20.4535 } // Historic area near Kalemegdan
  },
  {
    id: 11,
    address: "123 Broadway, New York",
    city: "New York",
    country: "USA",
    type: "commercial_rental",
    category: "office",
    tenant: {
      name: "NYC Business Center",
      phone: "+1 (212) 123-4567",
      email: "info@nycbusiness.com"
    },
    location: { lat: 40.7505, lng: -73.9934 }
  },
  {
    id: 12,
    address: "25 Oxford Street, London",
    city: "London",
    country: "UK",
    type: "vacation_rental",
    category: "penthouse",
    tenant: {
      name: "London Premium Stays",
      phone: "+44 20 1234 5678",
      email: "bookings@londonpremium.co.uk"
    },
    location: { lat: 51.5154, lng: -0.1423 }
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
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm || activeFilterCount > 0 
                    ? 'No Listings Found Matching Your Filters' 
                    : 'No Listings Available'}
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
