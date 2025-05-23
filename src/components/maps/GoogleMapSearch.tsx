
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MapPin, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GoogleMapSearchProps {
  initialAddress?: string;
  onLocationChange?: (location: { lat: number; lng: number; address: string }) => void;
  height?: string;
}

export function GoogleMapSearch({ 
  initialAddress = '', 
  onLocationChange,
  height = '400px'
}: GoogleMapSearchProps) {
  const [address, setAddress] = useState(initialAddress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  
  const { toast } = useToast();

  // Load the Google Maps API script
  useEffect(() => {
    // Check if the script is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    script.onerror = () => {
      setError('Failed to load Google Maps. Please try again later.');
      toast({
        title: "Map Error",
        description: "Failed to load Google Maps. Please try again later.",
        variant: "destructive"
      });
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up is not necessary as we don't want to remove the script
      // from the DOM once it's loaded to avoid reloading
    };
  }, []);

  // Initialize the map once the API is loaded
  const initializeMap = () => {
    if (!mapRef.current) return;
    
    try {
      // Create a new map instance
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to New York
        zoom: 12,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
        styles: [
          {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
          }
        ]
      };
      
      googleMapRef.current = new window.google.maps.Map(
        mapRef.current,
        mapOptions
      );
      
      // Create geocoder instance
      geocoderRef.current = new window.google.maps.Geocoder();
      
      // Create marker but don't place it yet
      markerRef.current = new window.google.maps.Marker({
        map: googleMapRef.current,
        animation: window.google.maps.Animation.DROP
      });
      
      setMapLoaded(true);
      
      // If we have an initial address, geocode it
      if (initialAddress) {
        geocodeAddress(initialAddress);
      }
    } catch (err) {
      console.error('Error initializing Google Map:', err);
      setError('Failed to initialize the map. Please refresh the page.');
    }
  };

  // Geocode the address to get coordinates
  const geocodeAddress = async (addressToGeocode: string) => {
    if (!geocoderRef.current || !googleMapRef.current || !markerRef.current) {
      setError('Map is not initialized yet.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoderRef.current!.geocode(
          { address: addressToGeocode },
          (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              resolve(results);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          }
        );
      });
      
      // Get the coordinates
      const location = result[0].geometry.location;
      const lat = location.lat();
      const lng = location.lng();
      const formattedAddress = result[0].formatted_address;
      
      // Update map center and marker
      googleMapRef.current.setCenter(location);
      googleMapRef.current.setZoom(14);
      
      markerRef.current.setPosition(location);
      markerRef.current.setTitle(formattedAddress);
      
      // Call the onLocationChange callback if provided
      if (onLocationChange) {
        onLocationChange({
          lat,
          lng,
          address: formattedAddress
        });
      }
      
      toast({
        title: "Address Found",
        description: `Located: ${formattedAddress}`,
      });
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Could not find this address. Please try a different one.');
      
      toast({
        title: "Address Error",
        description: "Could not find this address. Please try a different one.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      geocodeAddress(address);
    } else {
      setError('Please enter an address');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Enter an address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={loading || !mapLoaded}
          className="flex-grow"
        />
        <Button 
          type="submit" 
          disabled={loading || !mapLoaded}
          className="min-w-[100px]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </form>
      
      {error && (
        <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Card className="overflow-hidden">
        {!mapLoaded ? (
          <div 
            className="flex items-center justify-center"
            style={{ height }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div
            ref={mapRef}
            className="w-full rounded-md"
            style={{ height }}
          />
        )}
      </Card>
    </div>
  );
}
