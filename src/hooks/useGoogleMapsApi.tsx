
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  getGoogleMapsApiKey,
  saveGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  GOOGLE_MAPS_LIBRARIES,
  handleMapsApiLoadError,
  reloadPage
} from '@/utils/googleMapsUtils';
import { useLoadScript } from '@react-google-maps/api';

export function useGoogleMapsApi() {
  const [apiKey, setApiKey] = useState<string>(() => getGoogleMapsApiKey());
  const [shouldReload, setShouldReload] = useState<boolean>(false);
  const { toast } = useToast();
  
  console.log("useGoogleMapsApi: Current API key:", apiKey);
  
  // Load the Google Maps script with the current API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
    preventGoogleFontsLoading: true,
  });

  // Handle page reload when API key changes
  useEffect(() => {
    if (shouldReload) {
      console.log("Reloading page due to API key change");
      toast({
        title: "API Key Updated",
        description: "Refreshing page to apply new API key...",
      });
      
      const timeoutId = setTimeout(() => {
        reloadPage();
      }, 1500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [shouldReload, toast]);
  
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

  // API key setter that handles saving and reload logic
  const setApiKeyAndSave = useCallback((newKey: string) => {
    console.log("Setting new API key:", newKey);
    
    if (newKey !== apiKey) {
      const currentStoredKey = getGoogleMapsApiKey();
      
      // Save the new key
      if (isValidGoogleMapsApiKey(newKey)) {
        saveGoogleMapsApiKey(newKey);
      }
      
      // Only trigger reload if we're changing from one valid key to another
      if (isValidGoogleMapsApiKey(currentStoredKey) && isValidGoogleMapsApiKey(newKey) && currentStoredKey !== newKey) {
        setShouldReload(true);
      } else {
        setApiKey(newKey);
      }
    }
  }, [apiKey]);

  const isApiKeyValid = isValidGoogleMapsApiKey(apiKey);

  return {
    apiKey,
    setApiKey: setApiKeyAndSave,
    isLoaded,
    loadError,
    isLoading: !isLoaded && !loadError && isApiKeyValid,
    isApiKeyValid
  };
}
