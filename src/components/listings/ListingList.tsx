
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
} from "@/components/ui/dropdown-menu";

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
  categories: string[];
}

export function ListingList() {
  const [listings, setListings] = useState<any[]>(mockListings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    categories: []
  });

  const uniqueTypes = Array.from(new Set(mockListings.map(l => l.type)));
  const uniqueCategories = Array.from(new Set(mockListings.map(l => l.category)));

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

  const handleFilterChange = (filterType: 'types' | 'categories', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(t => t !== value)
        : [...prev[filterType], value]
    }));
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.tenant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(listing.id).includes(searchTerm);

    const matchesType = filters.types.length === 0 || filters.types.includes(listing.type);
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(listing.category);

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold">Listings</h1>
        </div>
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
          
          {/* Type Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
              <ListFilter className="h-4 w-4 mr-1" />
              Type {filters.types.length > 0 && `(${filters.types.length})`}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {uniqueTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  className="flex items-center justify-between"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleFilterChange('types', type);
                  }}
                >
                  <span>{type}</span>
                  {filters.types.includes(type) && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
              <ListFilter className="h-4 w-4 mr-1" />
              Category {filters.categories.length > 0 && `(${filters.categories.length})`}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {uniqueCategories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  className="flex items-center justify-between"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleFilterChange('categories', category);
                  }}
                >
                  <span>{category}</span>
                  {filters.categories.includes(category) && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </DropdownMenuItem>
              ))}
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
                {searchTerm || filters.types.length > 0 || filters.categories.length > 0 
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
