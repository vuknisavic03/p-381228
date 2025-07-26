
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { ListingMap } from "@/components/listings/ListingMap";
import { ListingFilters } from "@/components/listings/ListingFilters";
import { Button } from "@/components/ui/button";
import { List as ListIcon, MapPin, Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { EditListingForm } from "@/components/listings/EditListingForm";
import { useToast } from "@/hooks/use-toast";
import { fetchListings } from "@/services/listingsService";

export default function Listings() {
  const location = useLocation();
  const { toast } = useToast();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };
  
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("map");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [sharedListingData, setSharedListingData] = useState<any[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);

  // Filter states
  const [search, setSearch] = useState("");
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOccupancyStatuses, setSelectedOccupancyStatuses] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  // Fetch listings when component mounts
  useEffect(() => {
    const loadListings = async () => {
      try {
        setIsLoadingListings(true);
        const listings = await fetchListings();
        setSharedListingData(listings);
      } catch (error) {
        console.error("Error loading listings:", error);
        toast({
          title: "Error",
          description: "Failed to load listings",
          variant: "destructive"
        });
      } finally {
        setIsLoadingListings(false);
      }
    };

    loadListings();
  }, [toast]);

  // Filter listings based on current filter state
  const filteredListings = React.useMemo(() => {
    let filtered = sharedListingData;

    // Search filter
    if (search) {
      filtered = filtered.filter(listing =>
        listing.address?.toLowerCase().includes(search.toLowerCase()) ||
        listing.city?.toLowerCase().includes(search.toLowerCase()) ||
        listing.tenant?.name?.toLowerCase().includes(search.toLowerCase()) ||
        listing.id?.toString().includes(search)
      );
    }

    // Property type filter
    if (selectedPropertyTypes.length > 0) {
      filtered = filtered.filter(listing => selectedPropertyTypes.includes(listing.type));
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(listing => selectedCategories.includes(listing.category));
    }

    // Occupancy status filter
    if (selectedOccupancyStatuses.length > 0) {
      filtered = filtered.filter(listing => {
        const isOccupied = listing.tenant || (listing.units && listing.units.some((u: any) => u.occupancyStatus === 'occupied'));
        if (selectedOccupancyStatuses.includes('occupied') && selectedOccupancyStatuses.includes('vacant')) {
          return true; // Both selected, show all
        }
        if (selectedOccupancyStatuses.includes('occupied')) {
          return isOccupied;
        }
        if (selectedOccupancyStatuses.includes('vacant')) {
          return !isOccupied;
        }
        return true;
      });
    }

    // Country filter
    if (selectedCountries.length > 0) {
      filtered = filtered.filter(listing => selectedCountries.includes(listing.country));
    }

    return filtered;
  }, [sharedListingData, search, selectedPropertyTypes, selectedCategories, selectedOccupancyStatuses, selectedCountries]);

  // Handle listing selection from map view or list view
  const handleListingClick = (listing: any) => {
    setSelectedListing(listing);
    setIsEditSheetOpen(true);
  };

  // Handle tab change
  const handleViewModeChange = (value: string) => {
    setViewMode(value as "list" | "map");
  };

  // Handle API key submission from map component
  const handleApiKeySubmit = (apiKey: string) => {
    console.log("API key received in Listings page");
    toast({
      title: "API Key Updated",
      description: "Your Google Maps API key has been saved."
    });
  };

  // Handle when a new listing is added
  const handleListingAdded = () => {
    setIsAddFormOpen(false);
    // Refresh listings
    const loadListings = async () => {
      try {
        const listings = await fetchListings();
        setSharedListingData(listings);
      } catch (error) {
        console.error("Error reloading listings:", error);
      }
    };
    loadListings();
  };

  // Filter helper functions
  const getFilterOptions = () => {
    const propertyTypes = Array.from(new Set(sharedListingData.map(l => l.type).filter(Boolean)));
    const categories = Array.from(new Set(sharedListingData.map(l => l.category).filter(Boolean)));
    const occupancyStatuses = ["occupied", "vacant"];
    const countries = Array.from(new Set(sharedListingData.map(l => l.country).filter(Boolean)));

    return {
      propertyTypes: propertyTypes.map(type => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' '),
        count: sharedListingData.filter(l => l.type === type).length
      })),
      categories: categories.map(category => ({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' '),
        count: sharedListingData.filter(l => l.category === category).length
      })),
      occupancyStatuses: occupancyStatuses.map(status => ({
        value: status,
        label: status.charAt(0).toUpperCase() + status.slice(1),
        count: sharedListingData.filter(l => {
          if (status === 'occupied') return l.tenant || (l.units && l.units.some((u: any) => u.occupancyStatus === 'occupied'));
          return !l.tenant && (!l.units || l.units.every((u: any) => u.occupancyStatus === 'vacant'));
        }).length
      })),
      countries: countries.map(country => ({
        value: country,
        label: country,
        count: sharedListingData.filter(l => l.country === country).length
      }))
    };
  };

  // Filter toggle handlers
  const handlePropertyTypeToggle = (type: string) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleOccupancyStatusToggle = (status: string) => {
    setSelectedOccupancyStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedPropertyTypes([]);
    setSelectedCategories([]);
    setSelectedOccupancyStatuses([]);
    setSelectedCountries([]);
  };

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Single horizontal header with filters, map/list toggle, and add button */}
        <div className="flex-shrink-0 bg-white border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left side - Search and Filters */}
              <div className="flex items-center gap-3 flex-1">
                <ListingFilters
                  search={search}
                  onSearchChange={setSearch}
                  propertyTypes={getFilterOptions().propertyTypes}
                  selectedPropertyTypes={selectedPropertyTypes}
                  onPropertyTypeToggle={handlePropertyTypeToggle}
                  categories={getFilterOptions().categories}
                  selectedCategories={selectedCategories}
                  onCategoryToggle={handleCategoryToggle}
                  occupancyStatuses={getFilterOptions().occupancyStatuses}
                  selectedOccupancyStatuses={selectedOccupancyStatuses}
                  onOccupancyStatusToggle={handleOccupancyStatusToggle}
                  countries={getFilterOptions().countries}
                  selectedCountries={selectedCountries}
                  onCountryToggle={handleCountryToggle}
                  onClearFilters={handleClearFilters}
                  showInline={true}
                />
              </div>
              
              {/* Right side - Map/List Toggle and Add Button */}
              <div className="flex items-center gap-3">
                <Tabs 
                  value={viewMode} 
                  onValueChange={handleViewModeChange}
                >
                  <TabsList className="bg-gray-50 border border-gray-200 p-1 h-10 shadow-none">
                    <TabsTrigger 
                      value="map" 
                      className="gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-sm px-4 py-1.5 h-8 rounded-md font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <MapPin className="h-4 w-4" />
                      Map
                    </TabsTrigger>
                    <TabsTrigger 
                      value="list" 
                      className="gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-sm px-4 py-1.5 h-8 rounded-md font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <ListIcon className="h-4 w-4" />
                      List
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button
                  onClick={() => setIsAddFormOpen(true)}
                  className="flex items-center gap-2 h-10 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Add New Listing
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 relative overflow-hidden bg-white">
          <AnimatePresence mode="wait">
            {viewMode === "map" ? (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <ListingMap 
                  listings={filteredListings}
                  onListingClick={handleListingClick}
                  onApiKeySubmit={handleApiKeySubmit}
                />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <ListingList 
                  onListingClick={handleListingClick}
                  listings={filteredListings}
                  isLoading={isLoadingListings}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Add Listing Sheet - Made much wider */}
        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent 
            side="right" 
            className="w-[800px] sm:w-[900px] max-w-[90vw] p-0 border-l shadow-2xl bg-white"
          >
            <ListingForm 
              onClose={() => setIsAddFormOpen(false)} 
              onListingAdded={handleListingAdded}
            />
          </SheetContent>
        </Sheet>
        
        {/* Edit Listing Sheet - Made much wider */}
        <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <SheetContent 
            side="right" 
            className="w-[800px] sm:w-[900px] max-w-[90vw] p-0 border-l shadow-2xl transition-transform duration-300"
          >
            {selectedListing && (
              <EditListingForm
                listing={selectedListing}
                onClose={() => setIsEditSheetOpen(false)}
                onUpdate={(updatedListing) => {
                  const updatedListings = sharedListingData.map(l => 
                    l.id === updatedListing.id ? updatedListing : l
                  );
                  setSharedListingData(updatedListings);
                  setIsEditSheetOpen(false);
                }}
                onDelete={(deletedListingId) => {
                  const updatedListings = sharedListingData.filter(l => l.id !== deletedListingId);
                  setSharedListingData(updatedListings);
                  setIsEditSheetOpen(false);
                  toast({
                    title: "Listing Deleted",
                    description: "The listing has been successfully removed.",
                  });
                }}
              />
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
