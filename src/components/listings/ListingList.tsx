
import { useState, useEffect } from "react";
import { Search, MapPin, Phone, Mail, Loader2, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditListingForm } from "./EditListingForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      email: "alex@example.com",
      type: "individual"
    },
    payment: {
      revenue: "2500",
      expenses: "500",
      revenueCategories: ["rent", "facility"],
      expensesCategories: ["maintenance", "utilities"]
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
      email: "sarah@example.com",
      type: "individual"
    },
    payment: {
      revenue: "3500",
      expenses: "800",
      revenueCategories: ["rent"],
      expensesCategories: ["maintenance", "taxes"]
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
      email: "watson@example.com",
      type: "company"
    },
    payment: {
      revenue: "4200",
      expenses: "1200",
      revenueCategories: ["rent", "optional"],
      expensesCategories: ["utilities", "taxes"]
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
      email: "marie@example.com",
      type: "company"
    },
    payment: {
      revenue: "5000",
      expenses: "1500",
      revenueCategories: ["rent", "facility"],
      expensesCategories: ["maintenance", "marketing"]
    }
  },
  {
    id: 5,
    address: "Tokyo, Shibuya Crossing",
    city: "Tokyo",
    country: "Japan",
    type: "Commercial",
    category: "Restaurant",
    tenant: null,
    payment: {
      revenue: "0",
      expenses: "500",
      revenueCategories: [],
      expensesCategories: ["maintenance"]
    }
  }
];

export function ListingList() {
  const [listings, setListings] = useState<any[]>(mockListings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    tenantType: "",
    country: "",
    city: "",
  });
  
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
  
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      type: "",
      category: "",
      tenantType: "",
      country: "",
      city: "",
    });
  };
  
  const hasActiveFilters = Object.values(filters).some(value => value !== "");
  
  // Extract unique values for filter options
  const types = Array.from(new Set(listings.map(item => item.type))).filter(Boolean);
  const categories = Array.from(new Set(listings.map(item => item.category))).filter(Boolean);
  const countries = Array.from(new Set(listings.map(item => item.country))).filter(Boolean);
  const cities = Array.from(new Set(listings.map(item => item.city))).filter(Boolean);

  const filteredListings = listings.filter(listing => {
    // Search term filtering
    const matchesSearch = 
      listing.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.tenant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(listing.id).includes(searchTerm);
    
    // Additional filters
    const matchesType = filters.type === "" || listing.type === filters.type;
    const matchesCategory = filters.category === "" || listing.category === filters.category;
    const matchesTenantType = filters.tenantType === "" || listing.tenant?.type === filters.tenantType;
    const matchesCountry = filters.country === "" || listing.country === filters.country;
    const matchesCity = filters.city === "" || listing.city === filters.city;
    
    return matchesSearch && matchesType && matchesCategory && matchesTenantType && matchesCountry && matchesCity;
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
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant={hasActiveFilters ? "default" : "outline"}
                size="sm"
                className={`relative min-w-[80px] transition-all duration-200 ${
                  hasActiveFilters 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/5"
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {hasActiveFilters && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Object.values(filters).filter(Boolean).length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Filters</h3>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs h-7 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={clearFilters}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear all
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select 
                    value={filters.type} 
                    onValueChange={(value) => handleFilterChange("type", value)}
                  >
                    <SelectTrigger className="w-full h-9">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    <SelectTrigger className="w-full h-9">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tenant Type</label>
                  <Select 
                    value={filters.tenantType} 
                    onValueChange={(value) => handleFilterChange("tenantType", value)}
                  >
                    <SelectTrigger className="w-full h-9">
                      <SelectValue placeholder="Select tenant type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All tenant types</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Select 
                    value={filters.country} 
                    onValueChange={(value) => handleFilterChange("country", value)}
                  >
                    <SelectTrigger className="w-full h-9">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All countries</SelectItem>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Select 
                    value={filters.city} 
                    onValueChange={(value) => handleFilterChange("city", value)}
                  >
                    <SelectTrigger className="w-full h-9">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All cities</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              return (
                <div key={key} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs flex items-center">
                  <span>{key}: {value}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-4 w-4 p-0 ml-1 text-primary hover:bg-primary/20"
                    onClick={() => handleFilterChange(key, "")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
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
                {searchTerm || hasActiveFilters ? 'No listings found matching your criteria' : 'No listings available'}
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
