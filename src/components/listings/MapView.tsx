
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface MapViewProps {
  listings: any[];
  onListingSelect: (listing: any) => void;
}

export function MapView({ listings, onListingSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // This is a simple mock map implementation
  // In a real application, you would use a proper map library like Mapbox, Google Maps, or Leaflet
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleMarkerClick = (id: number) => {
    setSelectedMarker(id);
    const listing = listings.find(l => l.id === id);
    if (listing) {
      onListingSelect(listing);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white border-b">
        <div className="text-sm text-muted-foreground">
          Showing {listings.length} properties on the map
        </div>
      </div>
      
      <div className="relative flex-1 bg-slate-100" ref={mapRef}>
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading map...</div>
          </div>
        ) : (
          <>
            {/* Map background */}
            <div className="absolute inset-0 bg-[#e8ecf0] bg-opacity-50">
              {/* Simulated map grid */}
              <div className="h-full w-full grid grid-cols-10 grid-rows-10">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border border-[#d0d8e0] border-opacity-20" />
                ))}
              </div>
            </div>
            
            {/* Map markers */}
            {listings.map((listing) => {
              // Generate pseudo-random positions for demo purposes
              const top = `${20 + (listing.id * 13) % 60}%`;
              const left = `${15 + (listing.id * 17) % 70}%`;
              
              return (
                <div 
                  key={listing.id}
                  className={`absolute transition-all duration-200 z-10 ${
                    selectedMarker === listing.id ? 'z-20 scale-110' : ''
                  }`}
                  style={{ top, left }}
                >
                  <div 
                    className={`flex flex-col items-center cursor-pointer group`}
                    onClick={() => handleMarkerClick(listing.id)}
                  >
                    <MapPin 
                      className={`h-8 w-8 ${
                        selectedMarker === listing.id 
                          ? 'text-primary fill-primary' 
                          : 'text-primary/80 group-hover:text-primary'
                      } drop-shadow-md transition-all duration-200`} 
                    />
                    
                    {selectedMarker === listing.id && (
                      <Card className="absolute top-full mt-2 w-64 p-3 z-30 shadow-lg animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-sm font-medium">{listing.address}</div>
                        <div className="text-xs text-muted-foreground mt-1">{listing.type} • {listing.category}</div>
                        {listing.tenant && (
                          <div className="mt-2 pt-2 border-t text-xs">
                            <div className="font-medium">{listing.tenant.name}</div>
                          </div>
                        )}
                      </Card>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
