
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  getGoogleMapsApiKey,
  saveGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  GOOGLE_MAPS_LIBRARIES,
  handleMapsApiLoadError,
  isGoogleMapsLoaded,
  reloadPage
} from '@/utils/googleMapsUtils';
import { useLoadScript } from '@react-google-maps/api';

export function useGoogleMapsApi() {
  // State management
  const [apiKey, setApiKey] = useState<string>(getGoogleMapsApiKey);
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(isValidGoogleMapsApiKey(getGoogleMapsApiKey()));
  const { toast } = useToast();
  
  // Track if API key has changed to trigger a page reload
  const [hasApiKeyChanged, setHasApiKeyChanged] = useState<boolean>(false);

  // Load the Google Maps script with the current API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  // Update validity state when API key changes
  useEffect(() => {
    const isValid = isValidGoogleMapsApiKey(apiKey);
    setIsApiKeyValid(isValid);
    console.log("API key changed:", isValid ? "Valid key provided" : "No valid key");
    
    // Save valid API keys to localStorage
    if (isValid) {
      const currentKey = getGoogleMapsApiKey();
      if (currentKey !== apiKey) {
        setHasApiKeyChanged(true);
        saveGoogleMapsApiKey(apiKey);
      }
    }
  }, [apiKey]);
  
  // Handle API key changes that require page reload
  useEffect(() => {
    if (hasApiKeyChanged) {
      toast({
        title: "API Key Updated",
        description: "Refreshing page to apply new API key...",
      });
      
      // Small delay to ensure the toast is displayed
      const timeoutId = setTimeout(() => {
        reloadPage();
      }, 1500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [hasApiKeyChanged, toast]);
  
  // Handle load errors
  useEffect(() => {
    if (loadError) {
      console.error("Google Maps load error:", loadError);
      
      // Show toast with user-friendly error message
      const errorMessage = handleMapsApiLoadError(loadError);
      toast({
        title: "Google Maps Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }, [loadError, toast]);

  // Custom setter that also triggers the changed flag
  const setApiKeyAndSave = (newKey: string) => {
    if (newKey !== apiKey) {
      setApiKey(newKey);
    }
  };

  return {
    apiKey,
    setApiKey: setApiKeyAndSave,
    isLoaded,
    loadError,
    isLoading: !isLoaded && !loadError && isApiKeyValid,
    isApiKeyValid
  };
}
