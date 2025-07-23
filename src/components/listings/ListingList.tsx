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

      {/* Table Content */}
      <ListingTable 
        listings={filteredListings}
        onEdit={handleListingClick}
        isLoading={isLoading}
      />

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
