
import React, { useEffect, useRef, useState } from 'react';
import { Compass, AlertCircle, Loader2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getMapboxToken } from "@/config/mapbox";
import { MapboxSetup } from "./MapboxSetup";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  listings: any[];
  onListingSelect: (listing: any) => void;
}

export function MapView({ listings, onListingSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});
  const popupsRef = useRef<{ [key: number]: mapboxgl.Popup }>({});
  
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(!!getMapboxToken());

  // Function to initialize the map
  const initializeMap = () => {
    if (!mapRef.current) return;

    const token = getMapboxToken();
    if (!token) {
      setMapError("No Mapbox token found");
      return;
    }

    try {
      // Configure Mapbox
      mapboxgl.accessToken = token;
      
      // Create map instance
      mapInstance.current = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 20], // Default center
        zoom: 1.5,
      });

      // Add navigation controls
      mapInstance.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Handle map load
      mapInstance.current.on('load', () => {
        setMapLoaded(true);
        toast({
          description: "Map loaded successfully",
        });
        
        // Add markers after map loads
        addMapMarkers();
      });

      // Handle map errors
      mapInstance.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError(`Error loading map: ${e.error?.message || 'Unknown error'}`);
      });
    } catch (err) {
      console.error('Error initializing map:', err);
      setMapError(`Error initializing map: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Function to add markers to the map
  const addMapMarkers = () => {
    if (!mapInstance.current || !listings.length) return;

    // Get bounds object to fit markers
    const bounds = new mapboxgl.LngLatBounds();
    let hasValidCoordinates = false;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
    
    // Clear existing popups
    Object.values(popupsRef.current).forEach(popup => popup.remove());
    popupsRef.current = {};

    // Add markers for each listing
    listings.forEach(listing => {
      // Generate coordinates based on listing id for demo
      // In a real app, you would use actual geocoded coordinates
      const lng = -180 + (listing.id * 30) % 360;
      const lat = -80 + (listing.id * 20) % 160;
      
      // Create popup for this marker
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25,
        className: 'custom-popup',
      }).setHTML(`
        <div class="text-sm font-medium">${listing.address}</div>
        <div class="text-xs text-gray-500">${listing.type} • ${listing.category}</div>
      `);
      
      // Create and add the marker
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
      el.style.cursor = 'pointer';
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapInstance.current);
      
      // Store marker reference
      markersRef.current[listing.id] = marker;
      popupsRef.current[listing.id] = popup;
      
      // Setup event handlers
      el.addEventListener('click', () => {
        handleMarkerClick(listing.id);
      });
      
      // Add coordinates to bounds
      bounds.extend([lng, lat]);
      hasValidCoordinates = true;
    });

    // Fit map to bounds if we have markers
    if (hasValidCoordinates) {
      mapInstance.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12,
        duration: 1000
      });
    }
  };

  // Initialize map on component mount
  useEffect(() => {
    if (hasToken) {
      initializeMap();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [hasToken]);

  // Update markers when listings change
  useEffect(() => {
    if (mapLoaded && mapInstance.current) {
      addMapMarkers();
    }
  }, [listings, mapLoaded]);

  const handleMarkerClick = (id: number) => {
    // Toggle selected state
    const newSelectedId = id === selectedMarker ? null : id;
    setSelectedMarker(newSelectedId);
    
    // Close all popups
    Object.entries(popupsRef.current).forEach(([markerId, popup]) => {
      const marker = markersRef.current[Number(markerId)];
      
      if (Number(markerId) === newSelectedId) {
        // Show popup for selected marker
        marker.getElement().classList.add('marker-active');
        popup.addTo(mapInstance.current!);
      } else {
        // Hide popups for other markers
        marker.getElement().classList.remove('marker-active');
        popup.remove();
      }
    });
    
    // Notify parent component
    const listing = listings.find(l => l.id === id);
    if (listing) {
      onListingSelect(listing);
    }
  };

  const handleRecenter = () => {
    if (!mapInstance.current) return;
    
    // Get all markers and fit them to bounds
    const bounds = new mapboxgl.LngLatBounds();
    let hasValidCoordinates = false;
    
    Object.values(markersRef.current).forEach(marker => {
      bounds.extend(marker.getLngLat());
      hasValidCoordinates = true;
    });
    
    if (hasValidCoordinates) {
      mapInstance.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12,
        duration: 1000
      });
      
      toast({
        description: "Map recentered to show all properties",
      });
    }
  };

  // If no token is available, show the setup component
  if (!hasToken) {
    return <MapboxSetup onTokenSet={() => setHasToken(true)} />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white border-b flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {listings.length} properties on the map
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRecenter}
          className="flex items-center gap-2"
          disabled={!mapLoaded}
        >
          <Compass className="h-4 w-4" />
          Recenter
        </Button>
      </div>
      
      <div className="relative flex-1 bg-slate-100" ref={mapRef}>
        {!mapLoaded && !mapError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading map...</span>
            </div>
          </div>
        ) : mapError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-destructive text-center px-4 max-w-md">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-destructive/80" />
              </div>
              <p className="font-medium mb-2">Error loading map</p>
              <p className="text-sm text-muted-foreground">{mapError}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setMapError(null);
                  setHasToken(false);
                }}
              >
                Configure Mapbox
              </Button>
            </div>
          </div>
        ) : null}
        
        {/* The map will be rendered here by Mapbox */}
      </div>

      <style jsx global>{`
        .marker {
          transition: all 0.2s ease;
          color: hsl(var(--primary));
        }
        
        .marker:hover, .marker-active {
          transform: scale(1.2);
          color: hsl(var(--primary));
          filter: drop-shadow(0 0 0.5rem rgba(0,0,0,0.2));
        }
        
        .custom-popup {
          z-index: 10;
        }
        
        .custom-popup .mapboxgl-popup-content {
          padding: 12px;
          border-radius: 6px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
          border-top-color: #fff;
        }
      `}</style>
    </div>
  );
}
