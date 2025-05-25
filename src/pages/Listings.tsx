
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { ListingMap } from "@/components/listings/ListingMap";
import { Button } from "@/components/ui/button";
import { Plus, List as ListIcon, MapPin, LayoutGrid } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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
  const handleViewModeChange = (mode: "list" | "map") => {
    setViewMode(mode);
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
      <div className="h-screen flex flex-col bg-gray-50/30">
        {/* Modern Header */}
        <div className="bg-white border-b border-gray-200/60 backdrop-blur-sm">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  Property Listings
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your property portfolio and tenants
                </p>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center bg-gray-50/80 rounded-lg border border-gray-200/60 p-1">
                  <button
                    onClick={() => handleViewModeChange("list")}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === "list" 
                        ? "bg-white text-gray-900 shadow-sm border border-gray-200/60" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <ListIcon className="h-4 w-4" />
                    List
                  </button>
                  <button
                    onClick={() => handleViewModeChange("map")}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === "map" 
                        ? "bg-white text-gray-900 shadow-sm border border-gray-200/60" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <MapPin className="h-4 w-4" />
                    Map
                  </button>
                </div>
                
                <Button 
                  onClick={() => setIsAddFormOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg shadow-sm font-medium transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Add Listing
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
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
                transition={{ duration: 0 }}
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
