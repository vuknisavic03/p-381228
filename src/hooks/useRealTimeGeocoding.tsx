
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
      toast({
        title: "No API Key",
        description: "Google Maps API key is required for accurate geocoding",
        variant: "destructive"
      });
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
        // Request highest precision
        location_type: 'ROOFTOP',
        result_type: 'street_address',
        // Prefer exact address matches
        language: 'en',
        region: getCountryCode(country).toLowerCase()
      });

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params}`
      );
      
      const data = await response.json();
      console.log('🔍 Geocoding API response:', data);

      if (data.status === 'OK' && data.results.length > 0) {
        // Get the most precise result
        const result = data.results.find(r => 
          r.geometry.location_type === 'ROOFTOP'
        ) || data.results[0];

        const location = result.geometry.location;
        const locationType = result.geometry.location_type;
        
        console.log(`✅ Geocoded successfully:`, {
          address: fullAddress,
          coordinates: location,
          locationType,
          formatted_address: result.formatted_address
        });

        toast({
          title: "✅ Address Located",
          description: `Found precise coordinates for ${address}`,
          duration: 2000,
        });

        return {
          lat: location.lat,
          lng: location.lng,
          accuracy: locationType,
          formatted_address: result.formatted_address
        };
      } else {
        console.error('❌ Geocoding failed:', data.status, data.error_message);
        toast({
          title: "Address Not Found",
          description: `Could not locate "${address}, ${city}". Please verify the address.`,
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      console.error('❌ Geocoding error:', error);
      toast({
        title: "Geocoding Error",
        description: "Failed to geocode address. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGeocoding(false);
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
