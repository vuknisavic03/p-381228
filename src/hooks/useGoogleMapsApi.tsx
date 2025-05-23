
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  getGoogleMapsApiKey,
  saveGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  GOOGLE_MAPS_LIBRARIES,
  handleMapsApiLoadError
} from '@/utils/googleMapsUtils';
import { useLoadScript } from '@react-google-maps/api';

export function useGoogleMapsApi() {
  const [apiKey, setApiKeyState] = useState<string>(() => getGoogleMapsApiKey());
  const { toast } = useToast();
  
  // Only load script once with the initial API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
    preventGoogleFontsLoading: true,
  });

  // Handle load errors
  useEffect(() => {
    if (loadError) {
      console.error("Google Maps load error:", loadError);
      
      const errorMessage = handleMapsApiLoadError(loadError);
      toast({
        title: "Google Maps Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }, [loadError, toast]);

  // API key setter that handles saving and potential reload
  const setApiKey = (newKey: string) => {
    console.log("Setting new API key:", newKey ? "***provided***" : "empty");
    
    if (newKey !== apiKey) {
      // Save the new key
      if (isValidGoogleMapsApiKey(newKey)) {
        saveGoogleMapsApiKey(newKey);
      }
      
      // If we already have maps loaded and we're changing to a different valid key,
      // we need to reload the page since Google Maps doesn't support dynamic key changes
      if (isLoaded && isValidGoogleMapsApiKey(apiKey) && isValidGoogleMapsApiKey(newKey) && apiKey !== newKey) {
        toast({
          title: "API Key Updated",
          description: "Refreshing page to apply new API key...",
        });
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        return;
      }
      
      setApiKeyState(newKey);
    }
  };

  const isApiKeyValid = isValidGoogleMapsApiKey(apiKey);

  return {
    apiKey,
    setApiKey,
    isLoaded,
    loadError,
    isLoading: !isLoaded && !loadError && isApiKeyValid,
    isApiKeyValid
  };
}
