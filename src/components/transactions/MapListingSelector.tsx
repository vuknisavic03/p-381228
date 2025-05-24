
import React, { useState, useCallback } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { MapPin, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Listing } from "./TransactionFormTypes";
import { formatPropertyType } from "@/utils/propertyTypeUtils";
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';
import { GoogleMapsApiInput } from '../listings/GoogleMapsApiInput';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 44.8154,
  lng: 20.4606
};

interface MapListingSelectorProps {
  listings: Listing[];
  selectedListingId: string;
  onListingSelect: (listingId: string) => void;
  onClose: () => void;
}

function getMarkerColor(type: string): string {
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

export function MapListingSelector({ listings, selectedListingId, onListingSelect, onClose }: MapListingSelectorProps) {
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);
  const { apiKey, setApiKey, isLoaded, loadError, isApiKeyValid } = useGoogleMapsApi();

  const handleApiKeySubmit = useCallback((newApiKey: string) => {
    setApiKey(newApiKey);
  }, [setApiKey]);

  const onLoad = useCallback((map: google.maps.Map) => {
    if (listings.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      listings.forEach((listing) => {
        if (listing.location) {
          bounds.extend(listing.location);
        }
      });
      map.fitBounds(bounds, 50);
    }
  }, [listings]);

  const handleMarkerClick = useCallback((listing: Listing) => {
    onListingSelect(listing.id);
  }, [onListingSelect]);

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

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 animate-pulse text-gray-600" />
          <span className="text-gray-700 text-lg font-medium">Loading Map</span>
        </div>
      </div>
    );
  }

  // Filter listings that have location data
  const mappableListings = listings.filter(listing => listing.location);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Select Property from Map</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Map */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
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
            }}
          >
            {mappableListings.map((listing, index) => (
              <MarkerF
                key={listing.id}
                position={listing.location!}
                onClick={() => handleMarkerClick(listing)}
                onMouseOver={() => setHoveredListing(listing.id)}
                onMouseOut={() => setHoveredListing(null)}
                icon={{
                  path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                  fillColor: getMarkerColor(listing.type),
                  fillOpacity: selectedListingId === listing.id ? 1 : (hoveredListing === listing.id ? 0.9 : 0.7),
                  strokeWeight: selectedListingId === listing.id ? 3 : 2,
                  strokeColor: selectedListingId === listing.id ? "#ffffff" : "#ffffff",
                  scale: selectedListingId === listing.id ? 2.8 : (hoveredListing === listing.id ? 2.6 : 2.4),
                  anchor: new google.maps.Point(12, 24),
                  labelOrigin: new google.maps.Point(12, 9)
                }}
                label={{
                  text: (index + 1).toString(),
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: "700"
                }}
              />
            ))}
          </GoogleMap>
        </CardContent>
      </Card>

      {/* Selected listing info */}
      {selectedListingId && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    #{selectedListingId}
                  </Badge>
                  <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                    {formatPropertyType(listings.find(l => l.id === selectedListingId)?.type || "")}
                  </Badge>
                </div>
                <h4 className="font-medium text-gray-900">
                  {listings.find(l => l.id === selectedListingId)?.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {listings.find(l => l.id === selectedListingId)?.city}, {listings.find(l => l.id === selectedListingId)?.country}
                </p>
              </div>
              <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                Select Property
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <div className="text-center py-2">
        <p className="text-sm text-gray-600">
          Click on any marker to select a property for your transaction
        </p>
      </div>
    </div>
  );
}
