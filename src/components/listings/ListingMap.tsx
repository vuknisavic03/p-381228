
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { MapPin, Loader2, Map as MapIcon, Building2, User, AlertTriangle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { formatPropertyType } from "@/utils/propertyTypeUtils";
import { useToast } from '@/hooks/use-toast';
import { GoogleMapsApiInput } from './GoogleMapsApiInput';

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
  onApiKeySubmit?: (apiKey: string) => void;
}

// Custom map styles
const mapStyles = [
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{"color": "#dedede"}, {"lightness": 21}]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{"visibility": "off"}]
  }
];

export function ListingMap({ listings, onListingClick }: ListingMapProps) {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [markersMap, setMarkersMap] = useState<Map<number, google.maps.Marker>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Initialize Google Maps
  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (!window.google || !window.google.maps) {
      loadGoogleMapsAPI();
    } else {
      initMap();
    }
    
    return () => {
      // Clean up markers
      clearAllMarkers();
    };
  }, []);
  
  // Load the Google Maps API
  const loadGoogleMapsAPI = () => {
    setIsLoading(true);
    setMapError(null);
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Google Maps API loaded successfully');
      initMap();
    };
    
    script.onerror = () => {
      console.error('Failed to load Google Maps API');
      setMapError('Failed to load Google Maps API. Please try again later.');
      setIsLoading(false);
    };
    
    document.head.appendChild(script);
  };
  
  // Initialize the map
  const initMap = () => {
    if (!window.google || !window.google.maps) {
      setMapError('Google Maps API not loaded');
      setIsLoading(false);
      return;
    }
    
    try {
      const mapElement = document.getElementById('google-map');
      if (!mapElement) {
        console.error('Map container not found');
        return;
      }
      
      const map = new window.google.maps.Map(mapElement, {
        center: defaultCenter,
        zoom: 3,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: mapStyles,
      });
      
      setMapRef(map);
      setGeocoder(new window.google.maps.Geocoder());
      
      // Add markers for all listings
      addListingMarkers(map);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Error initializing the map. Please refresh the page.');
      setIsLoading(false);
    }
  };
  
  // Add markers for all listings
  const addListingMarkers = (map: google.maps.Map) => {
    // Clear existing markers first
    clearAllMarkers();
    
    const bounds = new window.google.maps.LatLngBounds();
    const newMarkersMap = new Map<number, google.maps.Marker>();
    
    listings.forEach((listing, index) => {
      const position = getListingCoordinates(listing, index);
      bounds.extend(position);
      
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: listing.address,
        animation: window.google.maps.Animation.DROP,
        icon: {
          path: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
          fillColor: getMarkerColor(listing.type),
          fillOpacity: 1,
          strokeWeight: 1.5,
          strokeColor: "#ffffff",
          scale: 1.5,
          anchor: new window.google.maps.Point(12, 24)
        }
      });
      
      marker.addListener('click', () => {
        handleMarkerClick(listing);
      });
      
      newMarkersMap.set(listing.id, marker);
    });
    
    setMarkersMap(newMarkersMap);
    
    if (listings.length > 0) {
      map.fitBounds(bounds, 50);
    }
  };
  
  // Clear all markers from the map
  const clearAllMarkers = () => {
    markersMap.forEach(marker => {
      marker.setMap(null);
    });
    setMarkersMap(new Map());
  };
  
  // Handle marker click
  const handleMarkerClick = (listing: Listing) => {
    setSelectedListing(listing);
    
    // Create info window
    if (mapRef) {
      const position = getListingCoordinates(listing, listings.findIndex(l => l.id === listing.id));
      
      // Center map on marker
      mapRef.setCenter(position);
      mapRef.setZoom(14);
      
      // Create info window content
      const contentString = `
        <div style="padding: 10px; max-width: 200px;">
          <h4 style="margin: 0 0 5px 0; font-weight: 500;">${listing.address}</h4>
          <div style="font-size: 12px; color: #666;">
            ${listing.city}, ${listing.country}
          </div>
          <div style="margin-top: 8px; font-size: 12px;">
            <strong>${formatPropertyType(listing.type)}</strong>
          </div>
        </div>
      `;
      
      // Create and open the info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: contentString,
        pixelOffset: new window.google.maps.Size(0, -30)
      });
      
      infoWindow.open({
        map: mapRef,
        anchor: markersMap.get(listing.id),
        shouldFocus: true,
      });
      
      // Close info window when clicking elsewhere on map
      window.google.maps.event.addListenerOnce(mapRef, 'click', () => {
        infoWindow.close();
        setSelectedListing(null);
      });
    }
  };
  
  // Search for an address
  const handleSearchAddress = () => {
    if (!geocoder || !mapRef || !searchAddress.trim()) {
      return;
    }
    
    setIsSearching(true);
    
    geocoder.geocode({ address: searchAddress }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        mapRef.setCenter(location);
        mapRef.setZoom(14);
        
        // Create a temporary marker for the search result
        const searchMarker = new window.google.maps.Marker({
          position: location,
          map: mapRef,
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#4f46e5',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 10,
          },
          title: results[0].formatted_address
        });
        
        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px;"><strong>Search Result:</strong><br>${results[0].formatted_address}</div>`,
        });
        
        infoWindow.open({
          map: mapRef,
          anchor: searchMarker,
        });
        
        // Remove marker after 8 seconds
        setTimeout(() => {
          searchMarker.setMap(null);
          infoWindow.close();
        }, 8000);
        
        toast({
          title: "Location Found",
          description: results[0].formatted_address,
        });
      } else {
        toast({
          title: "Search Failed",
          description: "Could not find this address. Please try a different one.",
          variant: "destructive"
        });
      }
      
      setIsSearching(false);
    });
  };
  
  // Calculate coordinates for listings without explicit location data
  const getListingCoordinates = (listing: Listing, index: number) => {
    if (listing.location) return listing.location;
    
    // Generate some variation based on listing id and index to spread markers
    const latVariation = (listing.id * 0.01) + (index * 0.005);
    const lngVariation = (listing.id * 0.01) - (index * 0.007);
    
    // Return generated coordinates based on city
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
  
  // Show loading state if map isn't loaded yet
  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <span className="text-gray-500 font-medium">Loading map...</span>
      </div>
    );
  }
  
  // Show error state if map failed to load
  if (mapError) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center bg-gray-50 p-6">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="text-red-600 font-medium">Google Maps Error</h3>
          </div>
          <p className="text-gray-700 text-sm mb-3">{mapError}</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setMapError(null);
              loadGoogleMapsAPI();
            }}
            className="w-full text-sm"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full relative">
      {/* Search input */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-3">
            <div className="flex gap-2">
              <Input
                placeholder="Search for an address..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchAddress();
                }}
              />
              <Button 
                onClick={handleSearchAddress} 
                disabled={isSearching || !searchAddress.trim()}
                className="min-w-[100px]"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Map container */}
      <div id="google-map" style={containerStyle} />
      
      {/* Property legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-100">
        <h4 className="text-xs font-medium mb-2 text-gray-700 flex items-center gap-1.5">
          <MapIcon className="h-3 w-3" />
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
      
      {/* View details button for selected listing */}
      {selectedListing && (
        <div className="absolute bottom-4 right-4">
          <Button
            onClick={() => onListingClick(selectedListing)}
            className="bg-primary hover:bg-primary/90"
          >
            View Details
          </Button>
        </div>
      )}
    </div>
  );
}

// Get marker colors based on property type
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
