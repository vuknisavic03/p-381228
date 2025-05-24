
import { useState } from 'react';
import { geocodeAddress, validateGeocodingAccuracy } from '@/utils/googleMapsUtils';
import { useToast } from '@/hooks/use-toast';

export function useGeocoding() {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { toast } = useToast();

  const getCoordinates = async (address: string, city: string, country: string) => {
    setIsGeocoding(true);
    
    try {
      console.log(`🎯 Starting pinpoint geocoding for: ${address}, ${city}, ${country}`);
      const result = await geocodeAddress(address, city, country);
      
      if (result) {
        // Validate the pinpoint accuracy of the geocoding result
        const isPinpointAccurate = validateGeocodingAccuracy(result);
        
        if (isPinpointAccurate) {
          console.log(`✅ PINPOINT ACCURACY ACHIEVED:`, {
            address: `${address}, ${city}, ${country}`,
            coordinates: { lat: result.lat, lng: result.lng },
            accuracy: result.accuracy,
            precision: 'Pinpoint accurate (sub-meter)',
            placeId: result.placeId
          });
          
          toast({
            title: "🎯 Pinpoint Location Found",
            description: `Address geocoded with pinpoint accuracy (${getAccuracyDescription(result.accuracy)})`,
            duration: 3000,
          });
          
          return { lat: result.lat, lng: result.lng };
        } else {
          console.warn('⚠️ Geocoding result does not meet pinpoint accuracy standards:', result);
          toast({
            title: "📍 Location Found",
            description: `Coordinates found but may not be pinpoint accurate. Consider verifying the address format.`,
            variant: "destructive"
          });
          return { lat: result.lat, lng: result.lng };
        }
      } else {
        console.error('❌ Pinpoint geocoding failed - no results returned');
        toast({
          title: "❌ Address Not Found",
          description: "Could not locate this address with pinpoint accuracy. Please verify the complete address including house number.",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      console.error('❌ Pinpoint geocoding error:', error);
      toast({
        title: "🚫 Geocoding Service Error",
        description: "Unable to process the address with pinpoint accuracy. Please check your connection and API key.",
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

function getAccuracyDescription(accuracy: string): string {
  switch (accuracy) {
    case 'ROOFTOP_VERIFIED':
      return 'rooftop-level, cross-validated';
    case 'CROSS_VALIDATED':
      return 'cross-validated with multiple APIs';
    case 'PREMIUM_VALIDATED':
      return 'premium address validation';
    case 'PLACE_DETAILS_MAXIMUM':
      return 'maximum precision from Place Details';
    case 'PLACE_DETAILS_HIGH':
      return 'high precision from Place Details';
    case 'ROOFTOP':
      return 'rooftop-level precision';
    case 'RANGE_INTERPOLATED':
      return 'interpolated street-level';
    default:
      return 'standard precision';
  }
}
