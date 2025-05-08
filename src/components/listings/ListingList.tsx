
import React, { useState, useEffect } from "react";
import { Search, MapPin, Phone, Mail, Loader2, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditListingForm } from "./EditListingForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const mockListings = [
  {
    id: 1,
    address: "Belgrade, Dunavska 12",
    city: "Belgrade",
    country: "Serbia",
    type: "Commercial",
    category: "Retail",
    tenant: {
      name: "Alexander Whitmore",
      phone: "000-000-0000",
      email: "alex@example.com"
    }
  },
  {
    id: 2,
    address: "New York, 5th Avenue",
    city: "New York",
    country: "USA",
    type: "Residential",
    category: "Apartment",
    tenant: {
      name: "Sarah Johnson",
      phone: "111-222-3333",
      email: "sarah@example.com"
    }
  },
  {
    id: 3,
    address: "London, Baker Street 221B",
    city: "London",
    country: "UK",
    type: "Commercial",
    category: "Office",
    tenant: {
      name: "John Watson",
      phone: "444-555-6666",
      email: "watson@example.com"
    }
  },
  {
    id: 4,
    address: "Paris, Champs-Élysées",
    city: "Paris",
    country: "France",
    type: "Commercial",
    category: "Retail",
    tenant: {
      name: "Marie Dubois",
      phone: "777-888-9999",
      email: "marie@example.com"
    }
  },
  {
    id: 5,
    address: "Tokyo, Shibuya Crossing",
    city: "Tokyo",
    country: "Japan",
    type: "Commercial",
    category: "Restaurant",
    tenant: null
  }
];

interface FilterState {
  types: string[];
}

const propertyTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "retail", label: "Retail" },
  { value: "office", label: "Office" },
  { value: "warehouse", label: "Warehouse" },
  { value: "hotel", label: "Hotel" },
  { value: "mixed", label: "Mixed Use" },
];

export function ListingList() {
  const [listings, setListings] = useState<any[]>(mockListings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    types: []
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    setIsEditSheetOpen(true);
  };

  const handleFilterChange = (value: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated.types.includes(value)) {
        updated.types = updated.types.filter(t => t !== value);
      } else {
        updated.types = [...updated.types, value];
      }
      return updated;
    });
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.tenant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(listing.id).includes(searchTerm);

    const matchesType = filters.types.length === 0 || filters.types.includes(listing.type.toLowerCase());

    return matchesSearch && matchesType;
  });

  return (
    <div className="h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by address, tenant or ID..." 
              className="pl-8 h-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 h-9">
                <ListFilter className="h-4 w-4" />
                <span>Filter</span>
                {filters.types.length > 0 && (
                  <span className="flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 ml-1">
                    {filters.types.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <div className="p-2">
                <DropdownMenuLabel>Property Type</DropdownMenuLabel>
                <div className="space-y-1 mt-1">
                  {propertyTypes.map((type) => (
                    <DropdownMenuItem
                      key={type.value}
                      className="flex items-center justify-between cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault();
                        handleFilterChange(type.value);
                      }}
                    >
                      <span className="text-base py-1">{type.label}</span>
                      {filters.types.includes(type.value) && (
                        <div className="h-3 w-3 rounded-full bg-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading listings...</span>
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
                      <span className="px-2.5 py-1 bg-primary/5 text-primary/80 text-sm rounded-full font-medium">
                        {listing.type}
                      </span>
                    </div>
                    
                    <div className="h-px bg-[#E4E5EA] mx-4" />
                    
                    <div className="flex items-center justify-between p-4 pt-2">
                      <div className="flex items-center gap-8 text-sm">
                        <span className="text-[#9EA3AD] font-medium">{listing.tenant?.name || 'No tenant'}</span>
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
                        {listing.category}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm || filters.types.length > 0 
                  ? 'No listings found matching your filters' 
                  : 'No listings available'}
              </div>
            )}
          </div>
        )}
      </div>

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
    </div>
  );
}
