
import { useState } from 'react';
import { geocodeAddress, validateGeocodingAccuracy } from '@/utils/googleMapsUtils';
import { useToast } from '@/hooks/use-toast';

export function useGeocoding() {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { toast } = useToast();

  const getCoordinates = async (address: string, city: string, country: string) => {
    setIsGeocoding(true);
    
    try {
      const result = await geocodeAddress(address, city, country);
      
      if (result) {
        // Validate the accuracy of the geocoding result
        const isAccurate = validateGeocodingAccuracy(result);
        
        if (isAccurate) {
          console.log(`High-precision geocoding successful: ${address}, ${city}, ${country}`, {
            coordinates: { lat: result.lat, lng: result.lng },
            accuracy: result.accuracy,
            placeId: result.placeId
          });
          
          // Show success message with accuracy info
          const accuracyMessage = getAccuracyMessage(result.accuracy);
          toast({
            title: "Address Located",
            description: `Coordinates found with ${accuracyMessage} accuracy`,
            duration: 3000,
          });
          
          return { lat: result.lat, lng: result.lng };
        } else {
          toast({
            title: "Low Accuracy Warning",
            description: "Coordinates found but with lower precision. Consider refining the address.",
            variant: "destructive"
          });
          return { lat: result.lat, lng: result.lng };
        }
      } else {
        toast({
          title: "Address Not Found",
          description: "Could not locate this address. Please verify the address format and try again.",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast({
        title: "Geocoding Error",
        description: "An error occurred while locating the address.",
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
    case 'PLACE_DETAILS':
      return 'enhanced (place-verified)';
    case 'ROOFTOP':
      return 'precise (rooftop)';
    case 'RANGE_INTERPOLATED':
      return 'interpolated (street)';
    default:
      return 'standard';
  }
}
