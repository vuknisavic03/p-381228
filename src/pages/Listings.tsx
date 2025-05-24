
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { ListingMap } from "@/components/listings/ListingMap";
import { Button } from "@/components/ui/button";
import { Plus, List as ListIcon, MapPin } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { EditListingForm } from "@/components/listings/EditListingForm";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

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
  const [sharedListingData, setSharedListingData] = useState<any[]>([]);

  // Handle listing selection from map view or list view
  const handleListingClick = (listing: any) => {
    setSelectedListing(listing);
    setIsEditSheetOpen(true);
  };

  // Handle receiving listing data from ListingList component
  const handleListingsData = (listings: any[]) => {
    setSharedListingData(listings);
  };

  // Handle tab change
  const handleViewModeChange = (value: string) => {
    setViewMode(value as "list" | "map");
  };

  // Handle API key submission from map component
  const handleApiKeySubmit = (apiKey: string) => {
    console.log("API key received in Listings page");
    // The key is handled by the useGoogleMapsApi hook, we just acknowledge it here
    toast({
      title: "API Key Updated",
      description: "Your Google Maps API key has been saved."
    });
  };

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col bg-white">
        {/* Fixed header section with consistent spacing */}
        <div className="px-6 py-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Edited just now</span>
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
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Map
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              onClick={() => setIsAddFormOpen(true)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 h-9 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Listing
            </Button>
          </div>
        </div>

        {/* Horizontal separator line */}
        <Separator className="w-full border-[#E4E5EA]" />
        
        {/* Main content container */}
        <div className="flex-1 relative overflow-hidden bg-white">
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
                <ListingMap 
                  listings={sharedListingData}
                  onListingClick={handleListingClick}
                  onApiKeySubmit={handleApiKeySubmit}
                />
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
