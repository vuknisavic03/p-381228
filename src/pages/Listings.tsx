
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { ListingMap } from "@/components/listings/ListingMap";
import { GoogleMapsApiInput, getGoogleMapsApiKey } from "@/components/listings/GoogleMapsApiInput";
import { Button } from "@/components/ui/button";
import { Plus, List as ListIcon, MapPin } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { EditListingForm } from "@/components/listings/EditListingForm";
import { useToast } from "@/hooks/use-toast";

export default function Listings() {
  const location = useLocation();
  const { toast } = useToast();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };
  
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>("");
  const [sharedListingData, setSharedListingData] = useState<any[]>([]);

  // Load the API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = getGoogleMapsApiKey();
    setGoogleMapsApiKey(savedApiKey);
    
    // If no API key is available, ensure we stay in list view
    if (!savedApiKey && viewMode === "map") {
      setViewMode("list");
      toast({
        title: "Map view unavailable",
        description: "Please set a Google Maps API key to use the map view."
      });
    }
  }, []);

  // Handle listing selection from map view
  const handleListingClick = (listing: any) => {
    setSelectedListing(listing);
    setIsEditSheetOpen(true);
  };

  // Handle receiving listing data from ListingList component
  const handleListingsData = (listings: any[]) => {
    setSharedListingData(listings);
  };

  // Handle API key submission from GoogleMapsApiInput
  const handleApiKeySubmit = (apiKey: string) => {
    setGoogleMapsApiKey(apiKey);
    
    // If API key was removed, switch to list view
    if (!apiKey && viewMode === "map") {
      setViewMode("list");
    }
  };

  // Handle tab change with validation
  const handleViewModeChange = (value: string) => {
    if (value === "map" && !googleMapsApiKey) {
      toast({
        title: "API Key Required",
        description: "Please set a Google Maps API key to use the map view."
      });
      return;
    }
    
    setViewMode(value as "list" | "map");
  };

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Fixed header section */}
        <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Listings</h1>
            <div className="ml-4 flex items-center px-3 py-1 bg-primary/5 rounded-full">
              <span className="text-xs text-gray-500 mr-1.5">Total:</span>
              <span className="text-sm font-medium text-gray-800">{sharedListingData.length} properties</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Tabs 
              value={viewMode} 
              onValueChange={handleViewModeChange}
              className="mr-2"
            >
              <TabsList className="bg-gray-100 p-0.5">
                <TabsTrigger 
                  value="list" 
                  className="gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3 py-1.5"
                >
                  <ListIcon className="h-3.5 w-3.5" />
                  List
                </TabsTrigger>
                <TabsTrigger 
                  value="map" 
                  className="gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3 py-1.5"
                  disabled={!googleMapsApiKey}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Map
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              onClick={() => setIsAddFormOpen(true)}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 h-9 transition-colors text-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Listing
            </Button>
          </div>
        </div>
        
        {/* Main content container */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {viewMode === "list" ? (
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
                  onListingsData={handleListingsData}
                />
              </motion.div>
            ) : (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                {googleMapsApiKey ? (
                  <ListingMap 
                    listings={sharedListingData}
                    onListingClick={handleListingClick}
                    apiKey={googleMapsApiKey}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full p-6 bg-gray-50/80">
                    <GoogleMapsApiInput onApiKeySubmit={handleApiKeySubmit} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Add Listing Sheet */}
        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent 
            side="right" 
            className="w-[480px] sm:w-[540px] p-0 border-l shadow-2xl bg-white"
          >
            <ListingForm 
              onClose={() => setIsAddFormOpen(false)} 
              onListingAdded={() => {
                setIsAddFormOpen(false);
              }}
            />
          </SheetContent>
        </Sheet>
        
        {/* Edit Listing Sheet */}
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
                  // Update the listing in the shared data
                  const updatedListings = sharedListingData.map(l => 
                    l.id === updatedListing.id ? updatedListing : l
                  );
                  setSharedListingData(updatedListings);
                  setIsEditSheetOpen(false);
                }}
              />
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
