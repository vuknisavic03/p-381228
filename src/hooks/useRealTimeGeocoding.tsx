
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getGoogleMapsApiKey } from '@/utils/googleMapsUtils';

export function useRealTimeGeocoding() {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { toast } = useToast();

  const geocodeAddressRealTime = async (address: string, city: string, country: string) => {
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setIsGeocoding(false);
      console.warn('⏰ Geocoding timeout reached');
    }, 10000); // 10 second timeout

    setIsGeocoding(true);
    const apiKey = getGoogleMapsApiKey();
    
    if (!apiKey) {
      console.warn("No API key available, skipping geocoding");
      clearTimeout(timeoutId);
      setIsGeocoding(false);
      return null;
    }

    try {
      console.log(`🎯 Real-time geocoding: "${address}, ${city}, ${country}"`);
      
      // Use the standard Geocoding API with precise parameters
      const fullAddress = `${address}, ${city}, ${country}`;
      const params = new URLSearchParams({
        address: fullAddress,
        key: apiKey,
        language: 'en',
        region: getCountryCode(country).toLowerCase()
      });

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params}`
      );
      
      const data = await response.json();
      console.log('🔍 Geocoding API response status:', data.status);

      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results[0];
        const location = result.geometry.location;
        const locationType = result.geometry.location_type;
        
        console.log(`✅ Geocoded successfully:`, {
          address: fullAddress,
          coordinates: location,
          locationType,
          formatted_address: result.formatted_address
        });

        clearTimeout(timeoutId);
        setIsGeocoding(false);

        return {
          lat: location.lat,
          lng: location.lng,
          accuracy: locationType,
          formatted_address: result.formatted_address
        };
      } else {
        console.warn('❌ Geocoding failed:', data.status, data.error_message);
        clearTimeout(timeoutId);
        setIsGeocoding(false);
        return null;
      }
    } catch (error) {
      console.error('❌ Geocoding error:', error);
      clearTimeout(timeoutId);
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
