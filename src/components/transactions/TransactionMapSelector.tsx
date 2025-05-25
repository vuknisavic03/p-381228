
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
  const [processedListings, setProcessedListings] = useState<(Listing & { coordinates: { lat: number; lng: number } })[]>([]);

  console.log("TransactionMapSelector - isLoaded:", isLoaded);
  console.log("TransactionMapSelector - listings count:", listings.length);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) {
      console.log("Map not ready - isLoaded:", isLoaded, "mapRef:", !!mapRef.current);
      return;
    }

    console.log("Initializing Google Map...");
    const mapInstance = new google.maps.Map(mapRef.current, {
      zoom: 13,
      center: { lat: 44.8154, lng: 20.4606 }, // Belgrade center
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      disableDefaultUI: true,
      gestureHandling: 'greedy',
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

  // Process listings to get coordinates
  useEffect(() => {
    if (!map || !isLoaded || listings.length === 0) {
      console.log("Cannot process listings - map:", !!map, "isLoaded:", isLoaded, "listings:", listings.length);
      return;
    }

    console.log("Starting to process", listings.length, "listings");

    const processListings = async () => {
      const processed = [];
      
      for (let i = 0; i < listings.length; i++) {
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
          console.log("Geocoding:", listing.address, listing.city, listing.country);
          const coords = await geocodeAddressRealTime(listing.address, listing.city, listing.country);
          
          if (coords) {
            processed.push({
              ...listing,
              coordinates: coords
            });
            console.log("Geocoded successfully:", coords);
          } else {
            // Use fallback coordinates
            const fallback = { 
              lat: 44.8154 + (i * 0.005), 
              lng: 20.4606 + (i * 0.005) 
            };
            processed.push({
              ...listing,
              coordinates: fallback
            });
          }
        } catch (error) {
          console.error("Error geocoding listing:", error);
          const fallback = { 
            lat: 44.8154 + (i * 0.005), 
            lng: 20.4606 + (i * 0.005) 
          };
          processed.push({
            ...listing,
            coordinates: fallback
          });
        }

        // Small delay to prevent rate limiting
        if (i < listings.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      console.log("Finished processing listings:", processed.length);
      setProcessedListings(processed);
    };

    processListings();
  }, [map, isLoaded, listings, geocodeAddressRealTime]);

  // Create markers from processed listings
  useEffect(() => {
    if (!map || !isLoaded || processedListings.length === 0) {
      console.log("Cannot create markers - map:", !!map, "isLoaded:", isLoaded, "processedListings:", processedListings.length);
      return;
    }

    console.log("Creating markers for", processedListings.length, "processed listings");

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers: google.maps.Marker[] = [];
    const bounds = new google.maps.LatLngBounds();

    processedListings.forEach((listing, index) => {
      const isSelected = listing.id === selectedListingId;
      
      console.log("Creating marker for:", listing.name, "at position:", listing.coordinates, "selected:", isSelected);
      
      const marker = new google.maps.Marker({
        position: listing.coordinates,
        map,
        title: listing.name,
        icon: {
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
          fillColor: getMarkerColor(listing.type),
          fillOpacity: isSelected ? 1 : 0.9,
          strokeWeight: isSelected ? 3 : 2,
          strokeColor: "#ffffff",
          scale: isSelected ? 2.6 : 2.4,
          anchor: new google.maps.Point(12, 24),
          labelOrigin: new google.maps.Point(12, 9)
        },
        label: {
          text: (index + 1).toString(),
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: "700"
        },
        animation: isSelected ? google.maps.Animation.BOUNCE : undefined
      });

      console.log("Marker created successfully for:", listing.name);

      marker.addListener('click', () => {
        console.log("Marker clicked for listing:", listing.name);
        
        const content = `
          <div class="p-0 m-0 w-[300px]">
            <div class="p-4 space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      #${listing.id}
                    </span>
                    <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      ${formatPropertyType(listing.type)}
                    </span>
                  </div>
                  <h4 class="font-semibold text-gray-900 text-sm leading-tight mb-2">
                    ${listing.name}
                  </h4>
                  <div class="flex items-center gap-1 text-gray-600 mb-3">
                    <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="text-xs font-medium">${listing.city}, ${listing.country}</span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-2 py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                <div class="p-1.5 bg-white rounded-lg shadow-sm">
                  <svg class="h-3 w-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <span class="text-xs font-medium text-gray-800">${listing.address}</span>
              </div>
              
              ${listing.tenant && listing.tenant.name !== "No Tenant" ? `
                <div class="space-y-2 pt-1">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
                      <svg class="h-3 w-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <span class="text-xs font-semibold text-gray-900">${listing.tenant.name}</span>
                  </div>
                  
                  ${listing.tenant.phone ? `
                    <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <span class="text-xs text-gray-700 font-medium">${listing.tenant.phone}</span>
                    </div>
                  ` : ''}
                  
                  ${listing.tenant.email ? `
                    <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-xs text-gray-700 font-medium truncate">${listing.tenant.email}</span>
                    </div>
                  ` : ''}
                </div>
              ` : ''}
              
              <div class="pt-2">
                <button 
                  onclick="window.selectListing('${listing.id}')"
                  class="w-full h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md shadow-sm flex items-center justify-center gap-1.5"
                >
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  Select Property
                </button>
              </div>
            </div>
          </div>
        `;
        
        if (infoWindow) {
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        }
      });

      newMarkers.push(marker);
      bounds.extend(listing.coordinates);
    });

    console.log("Created", newMarkers.length, "markers total");

    if (newMarkers.length > 0) {
      console.log("Fitting map to bounds...");
      map.fitBounds(bounds, 50);
      
      // Adjust zoom if too close
      google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
        const zoom = map.getZoom();
        if (zoom && zoom > 16) {
          map.setZoom(16);
        }
      });
    } else {
      console.log("No markers created, keeping default view");
    }

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
  }, [map, processedListings, selectedListingId, isLoaded, onListingSelect, infoWindow]);

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
      
      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg border">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-800">
          <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
          </svg>
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

      {/* Stats overlay */}
      {processedListings.length > 0 && (
        <div className="absolute top-6 right-6 bg-white p-4 rounded-lg shadow-lg border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">{processedListings.length}</div>
              <div className="text-sm text-gray-600">Properties Found</div>
            </div>
          </div>
        </div>
      )}
      
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
