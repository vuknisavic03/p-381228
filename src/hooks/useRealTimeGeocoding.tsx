
import { useState } from 'react';

export function useRealTimeGeocoding() {
  const [isGeocoding, setIsGeocoding] = useState(false);

  const geocodeAddressRealTime = async (address: string, city: string, country: string) => {
    setIsGeocoding(true);
    
    try {
      // Simple check for Google Maps
      if (!window.google?.maps?.Geocoder) {
        console.log("Google Maps not ready, using fallback");
        setIsGeocoding(false);
        return null;
      }

      const geocoder = new window.google.maps.Geocoder();
      const fullAddress = `${address}, ${city}, ${country}`;
      
      return new Promise<{lat: number, lng: number} | null>((resolve) => {
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          setIsGeocoding(false);
          
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            const coords = {
              lat: location.lat(),
              lng: location.lng()
            };
            console.log(`Geocoded "${fullAddress}":`, coords);
            resolve(coords);
          } else {
            console.log(`Geocoding failed for "${fullAddress}"`);
            resolve(null);
          }
        });
      });
      
    } catch (error) {
      console.error('Geocoding error:', error);
      setIsGeocoding(false);
      return null;
    }
  };

  return {
    geocodeAddressRealTime,
    isGeocoding
  };
}
