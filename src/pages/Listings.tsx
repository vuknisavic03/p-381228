
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { ListingMap } from "@/components/listings/ListingMap";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { List as ListIcon, MapPin } from "lucide-react";
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

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        <PageHeader
          onAddClick={() => setIsAddFormOpen(true)}
          addButtonText="Add New Listing"
        >
          <Tabs 
            value={viewMode} 
            onValueChange={handleViewModeChange}
          >
            <TabsList className="bg-white border border-gray-200 p-1 h-10">
              <TabsTrigger 
                value="map" 
                className="gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 text-sm px-4 py-1.5 h-8 rounded-md font-medium transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Map
              </TabsTrigger>
              <TabsTrigger 
                value="list" 
                className="gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 text-sm px-4 py-1.5 h-8 rounded-md font-medium transition-colors"
              >
                <ListIcon className="h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </PageHeader>
        
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
                  listings={sharedListingData}
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
                  listings={sharedListingData}
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
              />
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
