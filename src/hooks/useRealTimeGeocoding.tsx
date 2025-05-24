
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getGoogleMapsApiKey } from '@/utils/googleMapsUtils';

export function useRealTimeGeocoding() {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { toast } = useToast();

  const geocodeAddressRealTime = async (address: string, city: string, country: string) => {
    console.log(`🎯 Starting geocoding for: "${address}, ${city}, ${country}"`);
    setIsGeocoding(true);
    
    try {
      const apiKey = getGoogleMapsApiKey();
      
      if (!apiKey) {
        console.warn("❌ No API key available");
        setIsGeocoding(false);
        return null;
      }

      // Check if Google Maps is loaded
      if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
        console.warn("❌ Google Maps not loaded, using fallback");
        setIsGeocoding(false);
        return null;
      }

      console.log("✅ Google Maps API is available, proceeding with geocoding");
      
      const geocoder = new window.google.maps.Geocoder();
      const fullAddress = `${address}, ${city}, ${country}`;
      
      // Create a promise that resolves with geocoding result
      const geocodePromise = new Promise<{lat: number, lng: number} | null>((resolve) => {
        console.log(`📍 Geocoding address: ${fullAddress}`);
        
        geocoder.geocode(
          { 
            address: fullAddress,
            region: getCountryCode(country).toLowerCase()
          },
          (results, status) => {
            console.log(`📊 Geocoding status: ${status}`, results);
            
            if (status === 'OK' && results && results[0]) {
              const location = results[0].geometry.location;
              const coords = {
                lat: location.lat(),
                lng: location.lng()
              };
              console.log(`✅ Geocoding successful:`, coords);
              resolve(coords);
            } else {
              console.warn(`❌ Geocoding failed for ${fullAddress}. Status: ${status}`);
              resolve(null);
            }
          }
        );
      });

      // Add a 5-second timeout
      const timeoutPromise = new Promise<null>((resolve) => {
        setTimeout(() => {
          console.warn("⏰ Geocoding timeout after 5 seconds");
          resolve(null);
        }, 5000);
      });

      // Race between geocoding and timeout
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
