
import { useState } from 'react';
import { geocodeAddress } from '@/utils/googleMapsUtils';
import { useToast } from '@/hooks/use-toast';

export function useGeocoding() {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { toast } = useToast();

  const getCoordinates = async (address: string, city: string, country: string) => {
    setIsGeocoding(true);
    
    try {
      const coordinates = await geocodeAddress(address, city, country);
      
      if (coordinates) {
        console.log(`Successfully geocoded: ${address}, ${city}, ${country}`, coordinates);
        return coordinates;
      } else {
        toast({
          title: "Geocoding Failed",
          description: "Could not find coordinates for this address. Please check the address and try again.",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast({
        title: "Geocoding Error",
        description: "An error occurred while finding coordinates for this address.",
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
