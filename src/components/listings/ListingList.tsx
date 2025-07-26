import React, { useState } from "react";
import { MapPin, Phone, Mail, Loader2, Users, UserX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditListingForm } from "./EditListingForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PropertyTypeDisplay } from "@/utils/propertyTypeUtils";
import { PropertyType } from "@/types/property";

// Category mapping for consistent display
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

interface ListingListProps {
  onListingClick?: (listing: any) => void;
  listings: any[];
  isLoading: boolean;
}

export function ListingList({ onListingClick, listings, isLoading }: ListingListProps) {
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleListingClick = (listing: any) => {
    setSelectedListing(listing);
    
    if (onListingClick) {
      onListingClick(listing);
    } else {
      setIsEditSheetOpen(true);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading Listings...</span>
            </div>
          ) : (
            <div className="space-y-2">
              {listings.length > 0 ? (
                listings.map((listing) => {
                  // For hospitality and vacation rental, don't show occupancy status
                  const shouldShowOccupancy = listing.type !== 'hospitality' && listing.type !== 'vacation_rental';
                  const occupancyStatus = shouldShowOccupancy ? (listing.occupancyStatus || (listing.tenant ? 'occupied' : 'vacant')) : null;
                  
                  return (
                    <Card 
                      key={listing.id} 
                      className="p-1 hover:bg-gray-50/50 cursor-pointer transition-all duration-200 hover:shadow-sm"
                      onClick={() => handleListingClick(listing)}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between p-4 pb-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary/80" />
                              <span className="font-medium">{listing.address}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {shouldShowOccupancy && (
                              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                occupancyStatus === 'occupied' 
                                  ? 'bg-green-50 text-green-700 border border-green-200'
                                  : 'bg-orange-50 text-orange-700 border border-orange-200'
                              }`}>
                                {occupancyStatus === 'occupied' ? (
                                  <Users className="h-3 w-3" />
                                ) : (
                                  <UserX className="h-3 w-3" />
                                )}
                                <span>{occupancyStatus === 'occupied' ? 'Occupied' : 'Vacant'}</span>
                              </div>
                            )}
                            <PropertyTypeDisplay 
                              type={listing.type as PropertyType} 
                              className="px-2.5 py-1 bg-primary/5 text-primary/80 text-sm rounded-full font-medium"
                            />
                          </div>
                        </div>
                        
                        <div className="h-px bg-[#E4E5EA] mx-4" />
                        
                        <div className="flex items-center justify-between p-4 pt-2">
                          <div className="flex items-center gap-8 text-sm">
                            {/* Only show tenant info for non-hospitality/vacation rental properties */}
                            {shouldShowOccupancy ? (
                              <span className="text-[#9EA3AD] font-medium">
                                {listing.tenant?.name || 'No Tenant'}
                              </span>
                            ) : (
                              <span className="text-[#9EA3AD] font-medium">—</span>
                            )}
                            <div className="flex items-center gap-8">
                              {shouldShowOccupancy && listing.tenant?.phone && (
                                <div className="flex items-center gap-2 transition-all duration-200 hover:text-primary">
                                  <Phone className="h-4 w-4 text-[#9EA3AD]" />
                                  <span>{listing.tenant.phone}</span>
                                </div>
                              )}
                              {shouldShowOccupancy && listing.tenant?.email && (
                                <div className="flex items-center gap-2 transition-all duration-200 hover:text-primary">
                                  <Mail className="h-4 w-4 text-[#9EA3AD]" />
                                  <span>{listing.tenant.email}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground/80 text-sm rounded-full font-medium">
                            {getCategoryLabel(listing.type, listing.category)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
                  <p className="text-gray-500 mb-4">
                    Start by adding your first property listing with accurate address coordinates
                  </p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Refresh Listings
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Edit listing sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent side="right" className="w-[600px] overflow-y-auto">
          {selectedListing && (
            <EditListingForm
              listing={selectedListing}
              onClose={() => setIsEditSheetOpen(false)}
              onUpdate={(updatedListing) => {
                // Handle listing update here
                setIsEditSheetOpen(false);
                toast({
                  title: "Listing Updated",
                  description: "The listing has been successfully updated.",
                });
              }}
              onDelete={(listingId) => {
                // Handle listing deletion here
                setIsEditSheetOpen(false);
                toast({
                  title: "Listing Deleted",
                  description: "The listing has been successfully deleted.",
                });
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}