import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Loader2, Users, UserX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditListingForm } from "./EditListingForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PropertyTypeDisplay, formatPropertyType } from "@/utils/propertyTypeUtils";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { ModernFilter, FilterSection } from "@/components/ui/modern-filter";

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

// Belgrade test listings for accuracy testing
const initialListings = [
  {
    id: 1,
    address: "Knez Mihailova 42",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "commercial_rental",
    category: "retail",
    tenant: {
      name: "Fashion Store Belgrade",
      phone: "+381 11 123 4567",
      email: "info@fashion.rs",
      type: "company"
    },
    notes: "Main pedestrian street"
  },
  {
    id: 2,
    address: "Terazije 23",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "commercial_rental",
    category: "office",
    tenant: {
      name: "Business Center",
      phone: "+381 11 234 5678",
      email: "office@terazije.rs",
      type: "company"
    },
    notes: "Central Belgrade square"
  },
  {
    id: 3,
    address: "Kalemegdan Park 1",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "hospitality",
    category: "hotel",
    tenant: {
      name: "Kalemegdan Restaurant",
      phone: "+381 11 345 6789",
      email: "info@kalemegdan.rs",
      type: "company"
    },
    notes: "Historic fortress area"
  },
  {
    id: 4,
    address: "Skadarlija 29",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "hospitality",
    category: "bed_breakfast",
    tenant: {
      name: "Traditional Serbian Restaurant",
      phone: "+381 11 456 7890",
      email: "contact@skadarlija.rs",
      type: "company"
    },
    notes: "Bohemian quarter"
  },
  {
    id: 5,
    address: "Makedonska 22",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "residential_rental",
    category: "apartment_condo",
    tenant: {
      name: "Marko Petrović",
      phone: "+381 11 567 8901",
      email: "marko@email.rs",
      type: "individual"
    },
    notes: "City center apartment"
  },
  {
    id: 6,
    address: "Bulevar Kralja Aleksandra 73",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "commercial_rental",
    category: "office",
    tenant: {
      name: "Tech Company Serbia",
      phone: "+381 11 678 9012",
      email: "info@tech.rs",
      type: "company"
    },
    notes: "Main boulevard"
  },
  {
    id: 7,
    address: "Nemanjina 4",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "commercial_rental",
    category: "retail",
    tenant: {
      name: "Shopping Mall Unit",
      phone: "+381 11 789 0123",
      email: "shop@nemanjina.rs",
      type: "company"
    },
    notes: "Near train station"
  },
  {
    id: 8,
    address: "Svetogorska 15",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "residential_rental",
    category: "single_family",
    tenant: {
      name: "Ana Jovanović",
      phone: "+381 11 890 1234",
      email: "ana@email.rs",
      type: "individual"
    },
    notes: "Residential area"
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
  listings: any[];
  isLoading: boolean;
}

export function ListingList({ onListingClick, listings, isLoading }: ListingListProps) {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
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
    <div className="h-full flex flex-col overflow-hidden">
      {/* Modern Filter Header */}
      <div className="flex-none p-4 border-b border-border bg-background shadow-sm">
        <ModernFilter
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search by Address, Tenant or ID..."
          filterSections={filterSections}
          activeFilterCount={activeFilterCount}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Scrollable content area */}
      <ScrollArea className="flex-1 h-0">
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading Listings...</span>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => {
                  // For hospitality and vacation rental, don't show occupancy status
                  const shouldShowOccupancy = listing.type !== 'hospitality' && listing.type !== 'vacation_rental';
                  const occupancyStatus = shouldShowOccupancy ? (listing.occupancyStatus || (listing.tenant ? 'occupied' : 'vacant')) : null;
                  
                  return (
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
                          <div className="flex items-center gap-2">
                            {shouldShowOccupancy && (
                              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                occupancyStatus === 'occupied' 
                                  ? 'bg-green-50 text-green-700 border border-green-200'
                                  : 'bg-orange-50 text-orange-700 border border-orange-200'
                              }`}>
                                {occupancyStatus === 'occupied' ? (
                                  <Users className="h-3 w-3" />
                                ) : (
                                  <UserX className="h-3 w-3" />
                                )}
                                <span>{occupancyStatus === 'occupied' ? 'Occupied' : 'Vacant'}</span>
                              </div>
                            )}
                            <PropertyTypeDisplay 
                              type={listing.type as PropertyType} 
                              className="px-2.5 py-1 bg-primary/5 text-primary/80 text-sm rounded-full font-medium"
                            />
                          </div>
                        </div>
                        
                        <div className="h-px bg-[#E4E5EA] mx-4" />
                        
                        <div className="flex items-center justify-between p-4 pt-2">
                          <div className="flex items-center gap-8 text-sm">
                            {/* Only show tenant info for non-hospitality/vacation rental properties */}
                            {shouldShowOccupancy ? (
                              <span className="text-[#9EA3AD] font-medium">
                                {listing.tenant?.name || 'No Tenant'}
                              </span>
                            ) : (
                              <span className="text-[#9EA3AD] font-medium">—</span>
                            )}
                            <div className="flex items-center gap-8">
                              {shouldShowOccupancy && listing.tenant?.phone && (
                                <div className="flex items-center gap-2 transition-all duration-200 hover:text-primary">
                                  <Phone className="h-4 w-4 text-[#9EA3AD]" />
                                  <span>{listing.tenant.phone}</span>
                                </div>
                              )}
                              {shouldShowOccupancy && listing.tenant?.email && (
                                <div className="flex items-center gap-2 transition-all duration-200 hover:text-primary">
                                  <Mail className="h-4 w-4 text-[#9EA3AD]" />
                                  <span>{listing.tenant.email}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground/80 text-sm rounded-full font-medium">
                            {getCategoryLabel(listing.type, listing.category)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })
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
