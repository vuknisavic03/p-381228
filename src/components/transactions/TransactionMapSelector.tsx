
import React, { useEffect, useRef, useState } from 'react';
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';
import { useRealTimeGeocoding } from '@/hooks/useRealTimeGeocoding';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPropertyTypeIcon, formatPropertyType } from '@/utils/propertyTypeUtils';
import { Listing } from './TransactionFormTypes';

interface TransactionMapSelectorProps {
  listings: Listing[];
  selectedListingId?: string;
  onListingSelect: (listing: Listing) => void;
  onClose: () => void;
}

export function TransactionMapSelector({ 
  listings, 
  selectedListingId, 
  onListingSelect, 
  onClose 
}: TransactionMapSelectorProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useGoogleMapsApi();
  const { geocodeAddressRealTime } = useRealTimeGeocoding();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  console.log("TransactionMapSelector - isLoaded:", isLoaded);
  console.log("TransactionMapSelector - listings count:", listings.length);
  console.log("TransactionMapSelector - listings:", listings);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) {
      console.log("Map not ready - isLoaded:", isLoaded, "mapRef:", !!mapRef.current);
      return;
    }

    console.log("Initializing Google Map...");
    const mapInstance = new google.maps.Map(mapRef.current, {
      zoom: 13,
      center: { lat: 44.8154, lng: 20.4606 }, // Belgrade center
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    const infoWindowInstance = new google.maps.InfoWindow();
    setMap(mapInstance);
    setInfoWindow(infoWindowInstance);
    console.log("Google Map initialized successfully");

    return () => {
      markers.forEach(marker => marker.setMap(null));
      infoWindowInstance.close();
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!map || !isLoaded || listings.length === 0) {
      console.log("Cannot create markers - map:", !!map, "isLoaded:", isLoaded, "listings:", listings.length);
      return;
    }

    console.log("Starting marker creation for", listings.length, "listings");

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const newMarkers: google.maps.Marker[] = [];
    const bounds = new google.maps.LatLngBounds();

    const processListings = async () => {
      console.log("Processing listings for markers...");
      
      for (const listing of listings) {
        console.log("Processing listing:", listing.name, "location:", listing.location);
        
        let position = listing.location;
        
        if (!position) {
          console.log("No location found, attempting to geocode:", listing.address);
          try {
            const geocoded = await geocodeAddressRealTime(listing.address, listing.city, listing.country);
            if (geocoded) {
              position = { lat: geocoded.lat, lng: geocoded.lng };
              console.log("Geocoded successfully:", position);
            }
          } catch (error) {
            console.warn(`Failed to geocode ${listing.address}, ${listing.city}, ${listing.country}:`, error);
            continue;
          }
        }

        if (!position) {
          console.log("No position available for listing:", listing.name);
          continue;
        }

        const isSelected = listing.id === selectedListingId;
        console.log("Creating marker for:", listing.name, "at position:", position, "selected:", isSelected);
        
        const marker = new google.maps.Marker({
          position,
          map,
          title: listing.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: isSelected ? 12 : 8,
            fillColor: isSelected ? '#dc2626' : '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          }
        });

        console.log("Marker created successfully for:", listing.name);

        marker.addListener('click', () => {
          console.log("Marker clicked for listing:", listing.name);
          const content = `
            <div class="p-3 max-w-xs">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  ${getPropertyTypeIcon(listing.type) ? `<span class="text-blue-600">${getPropertyTypeIcon(listing.type)}</span>` : '🏢'}
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">${listing.name}</h3>
                  <p class="text-xs text-gray-500">${formatPropertyType(listing.type)}</p>
                </div>
              </div>
              <p class="text-sm text-gray-600 mb-2">${listing.address}</p>
              <p class="text-sm text-gray-600 mb-3">${listing.city}, ${listing.country}</p>
              <div class="border-t pt-2">
                <p class="text-xs text-gray-500 mb-1">Tenant</p>
                <p class="text-sm font-medium text-gray-900">${listing.tenant.name}</p>
                <p class="text-xs text-gray-500">${listing.tenant.type}</p>
              </div>
              <button 
                onclick="window.selectListing('${listing.id}')"
                class="w-full mt-3 bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Select Property
              </button>
            </div>
          `;
          
          if (infoWindow) {
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
          }
        });

        newMarkers.push(marker);
        bounds.extend(position);
      }

      console.log("Created", newMarkers.length, "markers total");

      if (newMarkers.length > 0) {
        console.log("Fitting map to bounds...");
        map.fitBounds(bounds);
        const zoom = map.getZoom();
        if (zoom && zoom > 16) {
          map.setZoom(16);
        }
      } else {
        console.log("No markers created, keeping default view");
      }
    };

    processListings();
    setMarkers(newMarkers);

    // Global function for selecting listing from info window
    (window as any).selectListing = (listingId: string) => {
      console.log("Selecting listing from info window:", listingId);
      const listing = listings.find(l => l.id === listingId);
      if (listing) {
        onListingSelect(listing);
      }
    };

    return () => {
      delete (window as any).selectListing;
    };
  }, [map, listings, selectedListingId, isLoaded, geocodeAddressRealTime, onListingSelect, infoWindow, markers]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black">
      <Button
        onClick={onClose}
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-900 rounded-full w-8 h-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div ref={mapRef} className="w-full h-full" />
      
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <p className="text-sm text-gray-600 text-center">
            Click on a property marker to view details and select it
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            {listings.length} properties • {isLoaded ? 'Map loaded' : 'Loading map...'}
          </p>
        </div>
      </div>
    </div>
  );
}
