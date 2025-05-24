
import { useState } from 'react';
import { geocodeAddress, validateGeocodingAccuracy } from '@/utils/googleMapsUtils';
import { useToast } from '@/hooks/use-toast';

export function useGeocoding() {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { toast } = useToast();

  const getCoordinates = async (address: string, city: string, country: string) => {
    setIsGeocoding(true);
    
    try {
      console.log(`Starting high-precision geocoding for: ${address}, ${city}, ${country}`);
      const result = await geocodeAddress(address, city, country);
      
      if (result) {
        // Validate the accuracy of the geocoding result
        const isAccurate = validateGeocodingAccuracy(result);
        
        if (isAccurate) {
          console.log(`Maximum precision geocoding successful:`, {
            address: `${address}, ${city}, ${country}`,
            coordinates: { lat: result.lat, lng: result.lng },
            accuracy: result.accuracy,
            precision: 'Sub-meter level',
            placeId: result.placeId
          });
          
          // Show success message with accuracy info
          const accuracyMessage = getAccuracyMessage(result.accuracy);
          toast({
            title: "Precise Location Found",
            description: `Address geocoded with ${accuracyMessage} precision`,
            duration: 3000,
          });
          
          return { lat: result.lat, lng: result.lng };
        } else {
          console.warn('Geocoding result did not meet accuracy requirements:', result);
          toast({
            title: "Location Found",
            description: "Coordinates found but may have reduced precision. Address validation recommended.",
            variant: "destructive"
          });
          return { lat: result.lat, lng: result.lng };
        }
      } else {
        console.error('Geocoding failed - no results returned');
        toast({
          title: "Address Not Found",
          description: "Could not locate this address. Please verify the address format and ensure it exists.",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast({
        title: "Geocoding Service Error",
        description: "Unable to process the address. Please check your internet connection and API key.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGeocoding(false);
    }
  };

  return {
    getCoordinates,
    isGeocoding
  };
}

function getAccuracyMessage(accuracy: string): string {
  switch (accuracy) {
    case 'MAXIMUM':
      return 'maximum (building-level)';
    case 'HIGH':
      return 'high (rooftop-level)';
    case 'GOOD':
      return 'good (street-level)';
    case 'ROOFTOP':
      return 'precise (rooftop)';
    case 'RANGE_INTERPOLATED':
      return 'interpolated (street)';
    case 'PLACES_API':
      return 'enhanced (places-verified)';
    case 'VALIDATED':
      return 'validated (official)';
    default:
      return 'standard';
  }
}
