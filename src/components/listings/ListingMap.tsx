import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import { MapPin, Loader2, Map, Building2, User, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { formatPropertyType } from "@/utils/propertyTypeUtils";
import { handleMapsApiLoadError } from '@/utils/googleMapsUtils';
import { GoogleMapsApiInput } from './GoogleMapsApiInput';
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';
import { useRealTimeGeocoding } from '@/hooks/useRealTimeGeocoding';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Belgrade center coordinates
const defaultCenter = {
  lat: 44.8154,
  lng: 20.4606
};

interface Tenant {
  name: string;
  phone?: string;
  email?: string;
}

interface Listing {
  id: number;
  address: string;
  city: string;
  country: string;
  type: PropertyType;
  category: string;
  tenant: Tenant | null;
  location?: {
    lat: number;
    lng: number;
  };
}

interface ListingMapProps {
  listings: Listing[];
  onListingClick: (listing: Listing) => void;
  onApiKeySubmit?: (apiKey: string) => void;
}

export function ListingMap({ listings, onListingClick, onApiKeySubmit }: ListingMapProps) {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [listingsWithCoords, setListingsWithCoords] = useState<(Listing & { coordinates?: { lat: number; lng: number } })[]>([]);
  const [isProcessingAddresses, setIsProcessingAddresses] = useState(false);
  
  const { apiKey, setApiKey, isLoaded, loadError, isApiKeyValid } = useGoogleMapsApi();
  const { geocodeAddressRealTime } = useRealTimeGeocoding();
  
  console.log("🗺️ ListingMap render - isLoaded:", isLoaded, "isApiKeyValid:", isApiKeyValid, "listings:", listings.length);
  
  const handleApiKeySubmit = useCallback((newApiKey: string) => {
    console.log("🔑 API key received in ListingMap");
    setApiKey(newApiKey);
    
    if (onApiKeySubmit) {
      onApiKeySubmit(newApiKey);
    }
  }, [setApiKey, onApiKeySubmit]);

  const getBelgradeFallbackCoords = useCallback((listingId: number) => {
    // Generate coordinates around Belgrade with small variation
    const baseVariation = (listingId * 0.001) % 0.01;
    const latVariation = baseVariation * (listingId % 2 === 0 ? 1 : -1);
    const lngVariation = baseVariation * (listingId % 3 === 0 ? 1 : -1);
    
    return { 
      lat: defaultCenter.lat + latVariation, 
      lng: defaultCenter.lng + lngVariation 
    };
  }, []);

  // Process listings when map is loaded and listings are available
  useEffect(() => {
    const processListings = async () => {
      if (!listings.length) {
        console.log("📭 No listings to process");
        setListingsWithCoords([]);
        return;
      }

      if (!isLoaded || !isApiKeyValid) {
        console.log("⏸️ Maps not ready yet, waiting...");
        return;
      }

      console.log("🎯 Starting to process", listings.length, "listings for geocoding");
      setIsProcessingAddresses(true);

      try {
        const processedListings = [];
        
        for (let i = 0; i < listings.length; i++) {
          const listing = listings[i];
          console.log(`📍 Processing listing ${i + 1}/${listings.length}: ${listing.address}, ${listing.city}`);

          // Check if we already have coordinates
          if (listing.location?.lat && listing.location?.lng) {
            console.log(`✅ Using existing coordinates for ${listing.address}:`, listing.location);
            processedListings.push({
              ...listing,
              coordinates: listing.location
            });
          } else {
            // Try real geocoding first
            console.log(`🔍 Attempting real geocoding for: ${listing.address}, ${listing.city}, ${listing.country}`);
            
            try {
              const coords = await geocodeAddressRealTime(listing.address, listing.city, listing.country);
              
              if (coords) {
                console.log(`✅ Successfully geocoded ${listing.address}:`, coords);
                processedListings.push({
                  ...listing,
                  coordinates: coords
                });
              } else {
                console.log(`⚠️ Geocoding failed for ${listing.address}, using Belgrade fallback`);
                processedListings.push({
                  ...listing,
                  coordinates: getBelgradeFallbackCoords(listing.id)
                });
              }
            } catch (error) {
              console.error(`❌ Error geocoding ${listing.address}:`, error);
              processedListings.push({
                ...listing,
                coordinates: getBelgradeFallbackCoords(listing.id)
              });
            }
          }

          // Small delay between requests to avoid rate limiting
          if (i < listings.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }

        console.log("✅ Finished processing all listings:", processedListings.length);
        setListingsWithCoords(processedListings);
        
      } catch (error) {
        console.error("❌ Error processing listings:", error);
        // Use fallback for all listings
        const fallbackListings = listings.map(listing => ({
          ...listing,
          coordinates: getBelgradeFallbackCoords(listing.id)
        }));
        setListingsWithCoords(fallbackListings);
      } finally {
        setIsProcessingAddresses(false);
      }
    };

    processListings();
  }, [listings, isLoaded, isApiKeyValid, geocodeAddressRealTime, getBelgradeFallbackCoords]);

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log("🗺️ Map loaded successfully");
    setMapRef(map);
    
    if (listingsWithCoords.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      listingsWithCoords.forEach((listing) => {
        if (listing.coordinates) {
          bounds.extend(listing.coordinates);
        }
      });
      map.fitBounds(bounds, 80);
    }
  }, [listingsWithCoords]);

  const onUnmount = useCallback(() => {
    console.log("🗺️ Map unmounted");
    setMapRef(null);
  }, []);

  const handleMarkerClick = useCallback((listing: Listing) => {
    setSelectedListing(listing);
  }, []);

  const handleInfoClose = useCallback(() => {
    setSelectedListing(null);
  }, []);

  const handleViewListing = useCallback(() => {
    if (selectedListing) {
      onListingClick(selectedListing);
      setSelectedListing(null);
    }
  }, [selectedListing, onListingClick]);

  // Show API key input if needed
  if (!isApiKeyValid) {
    console.log("🔑 Showing API key input - API key not valid");
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <GoogleMapsApiInput onApiKeySubmit={handleApiKeySubmit} />
      </div>
    );
  }

  // Show error state
  if (loadError) {
    console.log("❌ Showing error state - load error:", loadError);
    const errorMessage = handleMapsApiLoadError(loadError);
    
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-6">
        <div className="bg-white p-6 rounded-xl border border-red-200 shadow-lg max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-red-600 font-semibold">Google Maps Error</h3>
          </div>
          <p className="text-gray-700 text-sm mb-4">{errorMessage}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state while processing
  if (!isLoaded || isProcessingAddresses) {
    console.log("⏳ Showing loading state - isLoaded:", isLoaded, "isProcessing:", isProcessingAddresses);
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <span className="text-gray-600 font-medium">
            {isProcessingAddresses 
              ? "Geocoding addresses for accurate positioning..." 
              : "Loading interactive map..."}
          </span>
        </div>
      </div>
    );
  }

  console.log("🗺️ Rendering Google Map with", listingsWithCoords.length, "listings");

  return (
    <div className="h-full w-full relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          controlSize: 32,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "transit",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        {/* Render markers */}
        {listingsWithCoords.map((listing) => {
          if (!listing.coordinates) return null;
          
          const markerColor = getMarkerColor(listing.type);
          
          return (
            <MarkerF
              key={listing.id}
              position={listing.coordinates}
              onClick={() => handleMarkerClick(listing)}
              icon={{
                path: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
                fillColor: markerColor,
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff",
                scale: 1.8,
                anchor: new google.maps.Point(12, 24)
              }}
            />
          );
        })}

        {/* Info Window */}
        {selectedListing && (
          <InfoWindow
            position={listingsWithCoords.find(l => l.id === selectedListing.id)?.coordinates || defaultCenter}
            onCloseClick={handleInfoClose}
            options={{ 
              pixelOffset: new google.maps.Size(0, -35),
              maxWidth: 340
            }}
          >
            <Card className="w-full border-0 shadow-none">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-medium py-1.5 px-2.5 border-primary/30">
                      #{selectedListing.id}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-0 text-xs font-medium py-1.5 px-3">
                      {formatPropertyType(selectedListing.type)}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">{selectedListing.address}</h4>
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedListing.city}, {selectedListing.country}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="capitalize text-gray-700 font-medium">{selectedListing.category.replace(/_/g, ' ')}</span>
                    </div>
                    
                    {selectedListing.tenant && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 font-medium">{selectedListing.tenant.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full mt-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-sm py-2.5 px-4 font-medium"
                    onClick={handleViewListing}
                  >
                    View Property Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {/* Map legend */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-xl border border-gray-100/50">
        <h4 className="text-sm font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <Map className="h-4 w-4 text-primary" />
          Property Categories
        </h4>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="h-4 w-4 rounded-full bg-[#4f46e5] shadow-sm"></span>
            <span className="text-gray-700 font-medium">Residential Rental</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="h-4 w-4 rounded-full bg-[#0891b2] shadow-sm"></span>
            <span className="text-gray-700 font-medium">Commercial Rental</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="h-4 w-4 rounded-full bg-[#059669] shadow-sm"></span>
            <span className="text-gray-700 font-medium">Hospitality</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="h-4 w-4 rounded-full bg-[#d97706] shadow-sm"></span>
            <span className="text-gray-700 font-medium">Vacation Rental</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="h-4 w-4 rounded-full bg-[#9333ea] shadow-sm"></span>
            <span className="text-gray-700 font-medium">Mixed Use</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="h-4 w-4 rounded-full bg-[#dc2626] shadow-sm"></span>
            <span className="text-gray-700 font-medium">Industrial</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMarkerColor(type: PropertyType): string {
  switch (type) {
    case "residential_rental":
      return "#4f46e5"; // Indigo
    case "commercial_rental":
      return "#0891b2"; // Cyan
    case "hospitality":
      return "#059669"; // Emerald
    case "vacation_rental":
      return "#d97706"; // Amber
    case "mixed_use":
      return "#9333ea"; // Purple
    case "industrial":
      return "#dc2626"; // Red
    default:
      return "#6b7280"; // Gray
  }
}
