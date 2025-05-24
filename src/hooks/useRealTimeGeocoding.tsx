
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useRealTimeGeocoding() {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { toast } = useToast();

  const geocodeAddressRealTime = async (address: string, city: string, country: string) => {
    console.log(`🎯 Starting real-time geocoding for: "${address}, ${city}, ${country}"`);
    setIsGeocoding(true);
    
    try {
      // Check if Google Maps is loaded and geocoder is available
      if (!window.google?.maps?.Geocoder) {
        console.warn("❌ Google Maps Geocoder not available");
        setIsGeocoding(false);
        return null;
      }

      console.log("✅ Google Maps Geocoder is available, proceeding with geocoding");
      
      const geocoder = new window.google.maps.Geocoder();
      const fullAddress = `${address}, ${city}, ${country}`;
      
      // Create a promise for geocoding
      const geocodePromise = new Promise<{lat: number, lng: number} | null>((resolve) => {
        console.log(`📍 Geocoding: ${fullAddress}`);
        
        geocoder.geocode({
          address: fullAddress,
          region: getCountryCode(country).toLowerCase()
        }, (results, status) => {
          console.log(`📊 Geocoding result - Status: ${status}`, results);
          
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            const coords = {
              lat: location.lat(),
              lng: location.lng()
            };
            console.log(`✅ Successfully geocoded "${fullAddress}":`, coords);
            resolve(coords);
          } else {
            console.warn(`❌ Geocoding failed for "${fullAddress}". Status: ${status}`);
            resolve(null);
          }
        });
      });

      // Add timeout
      const timeoutPromise = new Promise<null>((resolve) => {
        setTimeout(() => {
          console.warn(`⏰ Geocoding timeout for "${fullAddress}"`);
          resolve(null);
        }, 5000);
      });

      const result = await Promise.race([geocodePromise, timeoutPromise]);
      setIsGeocoding(false);
      return result;
      
    } catch (error) {
      console.error('❌ Geocoding error:', error);
      setIsGeocoding(false);
      return null;
    }
  };

  return {
    geocodeAddressRealTime,
    isGeocoding
  };
}

function getCountryCode(country: string): string {
  const countryMap: {[key: string]: string} = {
    'serbia': 'RS',
    'united states': 'US',
    'usa': 'US',
    'united kingdom': 'GB',
    'uk': 'GB',
    'germany': 'DE',
    'france': 'FR',
    'italy': 'IT',
    'spain': 'ES',
    'canada': 'CA',
    'australia': 'AU'
  };
  
  const normalized = country.toLowerCase().trim();
  return countryMap[normalized] || country.toUpperCase().substring(0, 2);
}
