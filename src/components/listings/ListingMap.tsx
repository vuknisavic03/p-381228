import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import { MapPin, Loader2, Map, Building2, User, AlertTriangle, Phone, Mail, Navigation, X, Eye } from 'lucide-react';
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
      <div className="flex flex-col h-full w-full items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <GoogleMapsApiInput onApiKeySubmit={handleApiKeySubmit} />
        </div>
      </div>
    );
  }

  // Show error state
  if (loadError) {
    const errorMessage = handleMapsApiLoadError(loadError);
    
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-lg border shadow-lg max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-red-700 font-semibold text-lg">Maps Error</h3>
          </div>
          <p className="text-gray-700 text-sm mb-6">{errorMessage}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="w-full border-red-200 hover:bg-red-50"
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
      <div className="flex flex-col h-full w-full items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg border">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
            <span className="text-gray-800 font-semibold text-lg">
              Loading
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
        {mapListings.map((listing, index) => (
          <MarkerF
            key={listing.id}
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
              scale: hoveredListing === listing.id ? 2.6 : 2.4,
              anchor: new google.maps.Point(12, 24),
              labelOrigin: new google.maps.Point(12, 9)
            }}
            label={{
              text: (index + 1).toString(),
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "700"
            }}
            animation={selectedListing?.id === listing.id ? google.maps.Animation.BOUNCE : undefined}
          />
        ))}

        {selectedListing && (
          <InfoWindow
            position={mapListings.find(l => l.id === selectedListing.id)?.coordinates || defaultCenter}
            onCloseClick={handleInfoClose}
            options={{
              pixelOffset: new google.maps.Size(0, -10),
              disableAutoPan: false,
              headerDisabled: true
            }}
          >
            <div className="p-0 m-0 w-[360px]">
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-0">
                  <div className="p-5 space-y-4">
                    {/* Header with close button */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge 
                            variant="outline" 
                            className="text-xs font-medium bg-gray-50 border-gray-200 text-gray-700 px-2 py-1"
                          >
                            #{selectedListing.id}
                          </Badge>
                          <Badge 
                            className="text-xs px-2 py-1 font-medium border bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {formatPropertyType(selectedListing.type)}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-lg leading-tight mb-3">
                          {selectedListing.address}
                        </h4>
                        <div className="flex items-center gap-2 text-gray-700 mb-3">
                          <Navigation className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{selectedListing.city}, {selectedListing.country}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleInfoClose}
                        className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                    
                    {/* Property Category */}
                    <div className="flex items-center gap-3 py-3 px-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Building2 className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-800 capitalize">
                        {selectedListing.category.replace(/_/g, ' ')}
                      </span>
                    </div>
                    
                    {/* Tenant Information */}
                    {selectedListing.tenant && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-900">{selectedListing.tenant.name}</span>
                        </div>
                        
                        <div className="space-y-2">
                          {selectedListing.tenant.phone && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-800 font-medium">{selectedListing.tenant.phone}</span>
                            </div>
                          )}
                          {selectedListing.tenant.email && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-800 font-medium truncate">{selectedListing.tenant.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="pt-2">
                      <Button 
                        className="w-full h-10 bg-blue-600 hover:bg-blue-700 font-medium text-sm shadow-sm"
                        onClick={handleViewListing}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {/* Simple legend */}
      <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg border">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-800">
          <Map className="h-4 w-4 text-gray-600" />
          Property Types
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#4f46e5]"></div>
            <span className="text-sm text-gray-700">Residential</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#0891b2]"></div>
            <span className="text-sm text-gray-700">Commercial</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#059669]"></div>
            <span className="text-sm text-gray-700">Hospitality</span>
          </div>
        </div>
      </div>

      {/* Simple stats overlay */}
      {mapListings.length > 0 && (
        <div className="absolute top-6 right-6 bg-white p-4 rounded-lg shadow-lg border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">{mapListings.length}</div>
              <div className="text-sm text-gray-600">Properties Found</div>
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
