
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { GoogleMap, MarkerF, InfoWindow, OverlayView } from '@react-google-maps/api';
import { MapPin, Loader2, Map, Building2, User, AlertTriangle, Phone, Mail, Navigation } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { formatPropertyType } from "@/utils/propertyTypeUtils";
import { handleMapsApiLoadError } from '@/utils/googleMapsUtils';
import { GoogleMapsApiInput } from './GoogleMapsApiInput';
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';

const containerStyle = {
  width: '100%',
  height: '100%'
};

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
  const [mapListings, setMapListings] = useState<(Listing & { coordinates: { lat: number; lng: number } })[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hoveredListing, setHoveredListing] = useState<number | null>(null);
  
  const { apiKey, setApiKey, isLoaded, loadError, isApiKeyValid } = useGoogleMapsApi();
  
  console.log("ListingMap render - isLoaded:", isLoaded, "listings:", listings.length);
  
  const handleApiKeySubmit = useCallback((newApiKey: string) => {
    setApiKey(newApiKey);
    if (onApiKeySubmit) {
      onApiKeySubmit(newApiKey);
    }
  }, [setApiKey, onApiKeySubmit]);

  // Simple geocoding function
  const geocodeAddress = useCallback(async (address: string, city: string, country: string) => {
    if (!window.google?.maps?.Geocoder) {
      console.log("Google Maps Geocoder not available");
      return null;
    }

    const geocoder = new window.google.maps.Geocoder();
    const fullAddress = `${address}, ${city}, ${country}`;
    
    try {
      const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            resolve(results);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });

      if (result[0]) {
        const location = result[0].geometry.location;
        const coords = {
          lat: location.lat(),
          lng: location.lng()
        };
        console.log(`Geocoded "${fullAddress}":`, coords);
        return coords;
      }
    } catch (error) {
      console.log(`Geocoding failed for "${fullAddress}":`, error);
    }
    
    return null;
  }, []);

  // Generate fallback coordinates
  const getFallbackCoordinates = useCallback((index: number) => {
    const variation = index * 0.005;
    return { 
      lat: defaultCenter.lat + (variation % 0.02) - 0.01, 
      lng: defaultCenter.lng + (variation % 0.02) - 0.01 
    };
  }, []);

  // Create a stable key for listings to prevent unnecessary re-processing
  const listingsKey = useMemo(() => {
    return listings.map(l => `${l.id}-${l.address}-${l.city}`).join('|');
  }, [listings]);

  // Process listings only when map is ready and listings change
  useEffect(() => {
    if (!isLoaded || !isApiKeyValid || !listings.length) {
      console.log("Not ready to process listings:", { isLoaded, isApiKeyValid, listingsLength: listings.length });
      return;
    }

    let isCancelled = false;

    const processListings = async () => {
      console.log("Starting to process", listings.length, "listings");
      setIsProcessing(true);

      const processed = [];
      
      for (let i = 0; i < listings.length; i++) {
        if (isCancelled) break;
        
        const listing = listings[i];
        
        // Use existing coordinates if available
        if (listing.location?.lat && listing.location?.lng) {
          processed.push({
            ...listing,
            coordinates: listing.location
          });
          continue;
        }

        // Try to geocode
        try {
          const coords = await geocodeAddress(listing.address, listing.city, listing.country);
          
          if (coords && !isCancelled) {
            processed.push({
              ...listing,
              coordinates: coords
            });
          } else {
            // Use fallback
            processed.push({
              ...listing,
              coordinates: getFallbackCoordinates(i)
            });
          }
        } catch (error) {
          console.error("Error processing listing:", error);
          processed.push({
            ...listing,
            coordinates: getFallbackCoordinates(i)
          });
        }

        // Small delay to prevent rate limiting
        if (i < listings.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      if (!isCancelled) {
        console.log("Finished processing listings:", processed.length);
        setMapListings(processed);
        setIsProcessing(false);
      }
    };

    processListings();

    // Cleanup function to cancel processing if component unmounts or dependencies change
    return () => {
      isCancelled = true;
      setIsProcessing(false);
    };
  }, [isLoaded, isApiKeyValid, listingsKey, geocodeAddress, getFallbackCoordinates]);

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log("Map loaded successfully");
    
    if (mapListings.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      mapListings.forEach((listing) => {
        bounds.extend(listing.coordinates);
      });
      map.fitBounds(bounds, 50);
    }
  }, [mapListings]);

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
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <GoogleMapsApiInput onApiKeySubmit={handleApiKeySubmit} />
      </div>
    );
  }

  // Show error state
  if (loadError) {
    const errorMessage = handleMapsApiLoadError(loadError);
    
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-6">
        <div className="bg-white p-8 rounded-2xl border border-red-200 shadow-lg max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-red-600 font-semibold text-lg">Maps Error</h3>
          </div>
          <p className="text-gray-700 text-sm mb-6 leading-relaxed">{errorMessage}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="w-full h-10 border-red-200 hover:bg-red-50"
          >
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (!isLoaded || isProcessing) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-primary/20"></div>
            </div>
            <span className="text-gray-700 font-medium text-lg mb-2">
              {isProcessing ? "Processing addresses..." : "Loading map..."}
            </span>
            <span className="text-gray-500 text-sm">
              {isProcessing ? "Geocoding locations for accurate positioning" : "Initializing Google Maps"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  console.log("Rendering map with", mapListings.length, "listings");

  return (
    <div className="h-full w-full relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onLoad={onLoad}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
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
        {mapListings.map((listing) => (
          <React.Fragment key={listing.id}>
            <MarkerF
              position={listing.coordinates}
              onClick={() => handleMarkerClick(listing)}
              onMouseOver={() => setHoveredListing(listing.id)}
              onMouseOut={() => setHoveredListing(null)}
              icon={{
                path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                fillColor: getMarkerColor(listing.type),
                fillOpacity: hoveredListing === listing.id ? 1 : 0.9,
                strokeWeight: hoveredListing === listing.id ? 3 : 2,
                strokeColor: "#ffffff",
                scale: hoveredListing === listing.id ? 2.4 : 2.1,
                anchor: new google.maps.Point(12, 24)
              }}
              animation={selectedListing?.id === listing.id ? google.maps.Animation.BOUNCE : undefined}
            />
            
            {/* Listing number overlay */}
            <OverlayView
              position={listing.coordinates}
              mapPaneName="overlayMouseTarget"
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -(height / 2) - 6
              })}
            >
              <div className="bg-white text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white pointer-events-none">
                #{listing.id}
              </div>
            </OverlayView>
          </React.Fragment>
        ))}

        {selectedListing && (
          <InfoWindow
            position={mapListings.find(l => l.id === selectedListing.id)?.coordinates || defaultCenter}
            onCloseClick={handleInfoClose}
            options={{
              pixelOffset: new google.maps.Size(0, -10),
              disableAutoPan: false
            }}
          >
            <div className="p-0 m-0 w-96">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <Badge variant="outline" className="mb-3 text-xs font-medium">
                          #{selectedListing.id}
                        </Badge>
                        <h4 className="font-semibold text-gray-900 text-lg leading-tight mb-3">
                          {selectedListing.address}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Navigation className="h-4 w-4" />
                          <span>{selectedListing.city}, {selectedListing.country}</span>
                        </div>
                      </div>
                      <Badge className="shrink-0 text-xs px-3 py-1.5">
                        {formatPropertyType(selectedListing.type)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700 capitalize">
                          {selectedListing.category.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                    
                    {selectedListing.tenant && (
                      <div className="space-y-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900 text-base">{selectedListing.tenant.name}</span>
                        </div>
                        
                        <div className="space-y-3">
                          {selectedListing.tenant.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 w-full">
                              <Phone className="h-4 w-4 flex-shrink-0" />
                              <span className="flex-1 min-w-0">{selectedListing.tenant.phone}</span>
                            </div>
                          )}
                          {selectedListing.tenant.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 w-full">
                              <Mail className="h-4 w-4 flex-shrink-0" />
                              <span className="flex-1 min-w-0 truncate">{selectedListing.tenant.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full mt-5 h-10 bg-primary hover:bg-primary/90 transition-colors"
                      onClick={handleViewListing}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {/* Enhanced legend */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-800">
          <Map className="h-4 w-4 text-primary" />
          Property Types
        </h4>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="h-3 w-3 rounded-full bg-[#4f46e5] block shadow-sm"></span>
              <span className="absolute inset-0 h-3 w-3 rounded-full bg-[#4f46e5] animate-ping opacity-30"></span>
            </div>
            <span className="text-sm text-gray-700 font-medium">Residential</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="h-3 w-3 rounded-full bg-[#0891b2] block shadow-sm"></span>
              <span className="absolute inset-0 h-3 w-3 rounded-full bg-[#0891b2] animate-ping opacity-30"></span>
            </div>
            <span className="text-sm text-gray-700 font-medium">Commercial</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="h-3 w-3 rounded-full bg-[#059669] block shadow-sm"></span>
              <span className="absolute inset-0 h-3 w-3 rounded-full bg-[#059669] animate-ping opacity-30"></span>
            </div>
            <span className="text-sm text-gray-700 font-medium">Hospitality</span>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      {mapListings.length > 0 && (
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{mapListings.length}</div>
              <div className="text-sm text-gray-500">Properties</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getMarkerColor(type: PropertyType): string {
  switch (type) {
    case "residential_rental":
      return "#4f46e5";
    case "commercial_rental":
      return "#0891b2";
    case "hospitality":
      return "#059669";
    case "vacation_rental":
      return "#d97706";
    case "mixed_use":
      return "#9333ea";
    case "industrial":
      return "#dc2626";
    default:
      return "#6b7280";
  }
}
