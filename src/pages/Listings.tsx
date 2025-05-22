
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ListingForm } from "@/components/listings/ListingForm";
import { ListingList } from "@/components/listings/ListingList";
import { ListingMap } from "@/components/listings/ListingMap";
import { GoogleMapsApiInput } from "@/components/listings/GoogleMapsApiInput";
import { Button } from "@/components/ui/button";
import { Plus, List, MapPin } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Listings() {
  const location = useLocation();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };
  
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string | null>(null);
  const [sharedListingData, setSharedListingData] = useState<any[]>([]);

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
  };

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col bg-white">
        {/* Fixed header section */}
        <div className="px-6 py-4 flex justify-between items-center bg-white">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Listings</h1>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "map")} className="mr-2">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="list" className="data-[state=active]:bg-white">
                  <List className="h-4 w-4 mr-1" />
                  List
                </TabsTrigger>
                <TabsTrigger value="map" className="data-[state=active]:bg-white">
                  <MapPin className="h-4 w-4 mr-1" />
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
        
        {/* Main content container with white background */}
        <div className="flex-1 relative bg-white overflow-hidden">
          {/* List View */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${viewMode === "list" ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
            <ListingList 
              onListingClick={handleListingClick}
              onListingsData={handleListingsData}
            />
          </div>
          
          {/* Map View */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${viewMode === "map" ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
            {googleMapsApiKey ? (
              <ListingMap 
                listings={sharedListingData}
                onListingClick={handleListingClick}
              />
            ) : (
              <div className="flex items-center justify-center h-full p-6 bg-gray-50">
                <GoogleMapsApiInput onApiKeySubmit={handleApiKeySubmit} />
              </div>
            )}
          </div>
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
        
        {/* Edit Listing Sheet - reused from ListingList */}
        <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <SheetContent 
            side="right" 
            className="w-[480px] sm:w-[540px] p-0 border-l shadow-2xl transition-transform duration-300"
          >
            {selectedListing && (
              <div>
                {/* Listing edit form will be rendered by the EditListingForm component */}
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
