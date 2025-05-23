
import React, { useState, useCallback, useEffect } from 'react';
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

// Default map settings
const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 40.7589,
  lng: -73.9851
};

// Type definitions for listings
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
  
  // Use our custom Maps API hook
  const { apiKey, setApiKey, isLoaded, loadError, isApiKeyValid } = useGoogleMapsApi();
  
  console.log("ListingMap render - isLoaded:", isLoaded, "isApiKeyValid:", isApiKeyValid, "hasError:", !!loadError);
  
  // Handle API key submission from GoogleMapsApiInput
  const handleApiKeySubmit = useCallback((newApiKey: string) => {
    console.log("API key received in ListingMap");
    setApiKey(newApiKey);
    
    if (onApiKeySubmit) {
      onApiKeySubmit(newApiKey);
    }
  }, [setApiKey, onApiKeySubmit]);

  // Real coordinates for credible addresses
  const getListingCoordinates = useCallback((listing: Listing, index: number) => {
    if (listing.location) return listing.location;
    
    // Real coordinates based on actual addresses
    const addressCoordinates: { [key: string]: { lat: number; lng: number } } = {
      "Belgrade, Dunavska 12": { lat: 44.8176, lng: 20.4633 },
      "New York, 5th Avenue 789": { lat: 40.7589, lng: -73.9851 },
      "London, Baker Street 221B": { lat: 51.5238, lng: -0.1585 },
      "Paris, Champs-Élysées 101": { lat: 48.8698, lng: 2.3075 },
      "Tokyo, Shibuya Crossing 1-1": { lat: 35.6598, lng: 139.7006 },
      "Berlin, Brandenburg Gate 1": { lat: 52.5163, lng: 13.3777 },
      "Sydney, Opera House Drive 2": { lat: -33.8568, lng: 151.2153 },
      "Dubai, Burj Khalifa Blvd 1": { lat: 25.1972, lng: 55.2744 },
      "Los Angeles, Hollywood Blvd 6801": { lat: 34.1022, lng: -118.3406 },
      "Toronto, CN Tower Way 290": { lat: 43.6426, lng: -79.3871 }
    };
    
    const coordinates = addressCoordinates[listing.address];
    if (coordinates) {
      return coordinates;
    }
    
    // Fallback for any unlisted addresses
    return { 
      lat: defaultCenter.lat + ((index % 5) * 0.01), 
      lng: defaultCenter.lng + ((index % 3) * 0.01) 
    };
  }, []);

  // Set map reference when loaded
  const onLoad = useCallback((map: google.maps.Map) => {
    console.log("Map loaded successfully");
    setMapRef(map);
    
    if (listings.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      listings.forEach((listing, index) => {
        const position = getListingCoordinates(listing, index);
        bounds.extend(position);
      });
      map.fitBounds(bounds, 50);
    }
  }, [listings, getListingCoordinates]);

  const onUnmount = useCallback(() => {
    console.log("Map unmounted");
    setMapRef(null);
  }, []);

  // Handle marker click
  const handleMarkerClick = useCallback((listing: Listing) => {
    setSelectedListing(listing);
  }, []);

  // Handle info window close
  const handleInfoClose = useCallback(() => {
    setSelectedListing(null);
  }, []);

  // Handle view listing details
  const handleViewListing = useCallback(() => {
    if (selectedListing) {
      onListingClick(selectedListing);
      setSelectedListing(null);
    }
  }, [selectedListing, onListingClick]);

  // Show API key input if we need it
  if (!isApiKeyValid) {
    console.log("Showing API key input - API key not valid");
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gray-50 p-6">
        <GoogleMapsApiInput onApiKeySubmit={handleApiKeySubmit} />
      </div>
    );
  }

  // Show error state if map failed to load
  if (loadError) {
    console.log("Showing error state - load error:", loadError);
    const errorMessage = handleMapsApiLoadError(loadError);
    
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gray-50 p-6">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="text-red-600 font-medium">Google Maps Error</h3>
          </div>
          <p className="text-gray-700 text-sm mb-3">{errorMessage}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="w-full text-sm"
          >
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state if map isn't loaded yet
  if (!isLoaded) {
    console.log("Showing loading state - map not loaded");
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <span className="text-gray-500 font-medium">Loading map...</span>
      </div>
    );
  }

  console.log("Rendering Google Map with", listings.length, "listings");

  return (
    <div className="h-full w-full relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        }}
      >
        {/* Render markers for all listings */}
        {listings.map((listing, index) => {
          const position = getListingCoordinates(listing, index);
          const markerColor = getMarkerColor(listing.type);
          
          return (
            <MarkerF
              key={listing.id}
              position={position}
              onClick={() => handleMarkerClick(listing)}
              icon={{
                path: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
                fillColor: markerColor,
                fillOpacity: 1,
                strokeWeight: 1.5,
                strokeColor: "#ffffff",
                scale: 1.5,
                anchor: new google.maps.Point(12, 24)
              }}
            />
          );
        })}

        {/* Info Window for selected listing */}
        {selectedListing && (
          <InfoWindow
            position={getListingCoordinates(selectedListing, listings.findIndex(l => l.id === selectedListing.id))}
            onCloseClick={handleInfoClose}
            options={{ 
              pixelOffset: new google.maps.Size(0, -30),
              maxWidth: 320
            }}
          >
            <Card className="w-full border-0 shadow-none">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-medium py-1 border-primary/30">
                      #{selectedListing.id}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-0 text-xs font-medium py-1">
                      {formatPropertyType(selectedListing.type)}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedListing.address}</h4>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{selectedListing.city}, {selectedListing.country}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Building2 className="h-3 w-3 text-gray-500" />
                      <span className="capitalize text-gray-700">{selectedListing.category.replace(/_/g, ' ')}</span>
                    </div>
                    
                    {selectedListing.tenant && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <User className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-700">{selectedListing.tenant.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full mt-1 bg-primary hover:bg-primary/90 text-xs py-1.5 px-3"
                    onClick={handleViewListing}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {/* Map overlay with legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-100">
        <h4 className="text-xs font-medium mb-2 text-gray-700 flex items-center gap-1.5">
          <Map className="h-3 w-3" />
          Property Types
        </h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="h-3 w-3 rounded-full bg-[#4f46e5]"></span>
            <span className="text-gray-600">Residential Rental</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="h-3 w-3 rounded-full bg-[#0891b2]"></span>
            <span className="text-gray-600">Commercial Rental</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="h-3 w-3 rounded-full bg-[#059669]"></span>
            <span className="text-gray-600">Hospitality</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="h-3 w-3 rounded-full bg-[#d97706]"></span>
            <span className="text-gray-600">Vacation Rental</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Get marker colors based on property type
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
