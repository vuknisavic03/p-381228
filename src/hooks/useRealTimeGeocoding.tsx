
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getGoogleMapsApiKey } from '@/utils/googleMapsUtils';

export function useRealTimeGeocoding() {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { toast } = useToast();

  const geocodeAddressRealTime = async (address: string, city: string, country: string) => {
    setIsGeocoding(true);
    const apiKey = getGoogleMapsApiKey();
    
    if (!apiKey) {
      console.warn("No API key available, using fallback coordinates");
      setIsGeocoding(false);
      return null;
    }

    try {
      console.log(`🎯 Attempting geocoding: "${address}, ${city}, ${country}"`);
      
      // Create timeout promise that rejects after 3 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Geocoding timeout')), 3000);
      });

      // Use Google's Geocoding service through the Maps JavaScript API
      if (window.google && window.google.maps && window.google.maps.Geocoder) {
        const geocoder = new window.google.maps.Geocoder();
        const fullAddress = `${address}, ${city}, ${country}`;
        
        const geocodePromise = new Promise<{lat: number, lng: number} | null>((resolve) => {
          geocoder.geocode(
            { 
              address: fullAddress,
              region: getCountryCode(country).toLowerCase()
            },
            (results, status) => {
              if (status === 'OK' && results && results[0]) {
                const location = results[0].geometry.location;
                resolve({
                  lat: location.lat(),
                  lng: location.lng()
                });
              } else {
                console.warn(`Geocoding failed for ${fullAddress}:`, status);
                resolve(null);
              }
            }
          );
        });

        // Race between geocoding and timeout
        const result = await Promise.race([geocodePromise, timeoutPromise]);
        setIsGeocoding(false);
        return result as {lat: number, lng: number} | null;
      } else {
        console.warn("Google Maps Geocoder not available");
        setIsGeocoding(false);
        return null;
      }
    } catch (error) {
      console.warn('Geocoding failed, using fallback:', error);
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
