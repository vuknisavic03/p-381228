
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { formatPropertyType } from "@/utils/propertyTypeUtils";

// Default map settings
const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060 // Default to New York City
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
}

export function ListingMap({ listings, onListingClick }: ListingMapProps) {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  
  // Google Maps API loader
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" // Set your Google Maps API key - we'll prompt for this in the UI
  });

  // Set map reference when loaded
  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
    
    // If we have listings with locations, fit the map to show them all
    if (listings.length > 0 && listings.some(l => l.location)) {
      const bounds = new google.maps.LatLngBounds();
      listings.forEach(listing => {
        if (listing.location) {
          bounds.extend(listing.location);
        }
      });
      map.fitBounds(bounds);
    }
  }, [listings]);

  const onUnmount = useCallback(() => {
    setMapRef(null);
  }, []);

  // Calculate dynamic locations for listings without explicit coordinates
  const getListingCoordinates = (listing: Listing, index: number) => {
    if (listing.location) return listing.location;
    
    // Generate some variation based on listing id and index to spread markers
    const latVariation = (listing.id * 0.01) + (index * 0.005);
    const lngVariation = (listing.id * 0.01) - (index * 0.007);
    
    // Return generated coordinates
    if (listing.city === "New York") {
      return { lat: 40.7128 + latVariation, lng: -74.0060 + lngVariation };
    } else if (listing.city === "London") {
      return { lat: 51.5074 + latVariation, lng: -0.1278 + lngVariation };
    } else if (listing.city === "Paris") {
      return { lat: 48.8566 + latVariation, lng: 2.3522 + lngVariation };
    } else if (listing.city === "Tokyo") {
      return { lat: 35.6762 + latVariation, lng: 139.6503 + lngVariation };
    } else if (listing.city === "Belgrade") {
      return { lat: 44.7866 + latVariation, lng: 20.4489 + lngVariation };
    } else {
      // Default to center and offset by index
      return { 
        lat: defaultCenter.lat + ((index % 5) * 0.02), 
        lng: defaultCenter.lng + ((index % 3) * 0.03) 
      };
    }
  };

  // Handle marker click
  const handleMarkerClick = (listing: Listing) => {
    setSelectedListing(listing);
  };

  // Handle info window close
  const handleInfoClose = () => {
    setSelectedListing(null);
  };

  // Handle view listing details
  const handleViewListing = () => {
    if (selectedListing) {
      onListingClick(selectedListing);
      setSelectedListing(null);
    }
  };

  // Show loading state if map isn't loaded yet
  if (!isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
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
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        {/* Render markers for all listings */}
        {listings.map((listing, index) => {
          const position = getListingCoordinates(listing, index);
          
          return (
            <Marker
              key={listing.id}
              position={position}
              onClick={() => handleMarkerClick(listing)}
              icon={{
                path: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
                fillColor: listing.tenant ? "#1e40af" : "#6b7280", // Blue for occupied, gray for vacant
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: "#ffffff",
                scale: 1.5,
                anchor: new google.maps.Point(12, 24)
              }}
              animation={google.maps.Animation.DROP}
            />
          );
        })}

        {/* Info Window for selected listing */}
        {selectedListing && (
          <InfoWindow
            position={getListingCoordinates(selectedListing, listings.findIndex(l => l.id === selectedListing.id))}
            onCloseClick={handleInfoClose}
            options={{ pixelOffset: new google.maps.Size(0, -30) }}
          >
            <Card className="min-w-[250px] max-w-[300px] border-0 shadow-none">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">#{selectedListing.id}</h4>
                    <span className="text-xs font-medium rounded-full px-2 py-1 bg-primary/5 text-primary/80">
                      {formatPropertyType(selectedListing.type)}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-sm">{selectedListing.address}</span>
                  </div>
                  
                  {selectedListing.tenant && (
                    <div className="text-sm">
                      <span className="text-gray-700 font-medium">Tenant:</span> {selectedListing.tenant.name}
                    </div>
                  )}
                  
                  <button 
                    className="w-full mt-2 bg-gray-900 hover:bg-gray-800 text-white text-xs py-1.5 px-3 rounded-md transition-colors"
                    onClick={handleViewListing}
                  >
                    View Details
                  </button>
                </div>
              </CardContent>
            </Card>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
