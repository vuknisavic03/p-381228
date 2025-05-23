
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  getGoogleMapsApiKey,
  saveGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  GOOGLE_MAPS_LIBRARIES,
  loadGoogleMapsScript,
  handleMapsApiLoadError
} from '@/utils/googleMapsUtils';

export function useGoogleMapsApi() {
  const [apiKey, setApiKey] = useState<string>(getGoogleMapsApiKey);
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(isValidGoogleMapsApiKey(getGoogleMapsApiKey()));
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Use memoized libraries array to prevent unnecessary re-renders
  const libraries = useMemo(() => GOOGLE_MAPS_LIBRARIES, []);

  // Update validity state when API key changes
  useEffect(() => {
    const isValid = isValidGoogleMapsApiKey(apiKey);
    setIsApiKeyValid(isValid);
    console.log("API key changed:", isValid ? "Valid key provided" : "No valid key");
    
    // Save valid API keys to localStorage
    if (isValid) {
      saveGoogleMapsApiKey(apiKey);
    }
  }, [apiKey]);

  // Effect to handle API key changes and script loading
  useEffect(() => {
    // Skip if no valid API key
    if (!isApiKeyValid) {
      console.log("No valid API key provided");
      setIsLoaded(false);
      return;
    }

    // Skip loading if already loaded with this API key
    // @ts-ignore
    if (isLoaded && window.google && window.google.maps) {
      console.log("Google Maps already loaded, skipping");
      return;
    }

    // Prevent concurrent loads
    if (isLoading) {
      console.log("Already loading Google Maps, skipping");
      return;
    }

    console.log("Loading Google Maps with key:", apiKey ? "Valid key" : "No key");
    setIsLoading(true);
    setLoadError(null);
    
    // Use our manual loader
    loadGoogleMapsScript(apiKey)
      .then(() => {
        console.log("Google Maps loaded successfully");
        setIsLoaded(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Google Maps load error:", error);
        setLoadError(error);
        setIsLoaded(false);
        setIsLoading(false);
        
        // Show toast with user-friendly error message
        const errorMessage = handleMapsApiLoadError(error);
        toast({
          title: "Google Maps Error",
          description: errorMessage,
          variant: "destructive"
        });
      });
  }, [apiKey, isApiKeyValid, toast]);

  // Custom setter that also saves to localStorage
  const setApiKeyAndSave = (newKey: string) => {
    if (isValidGoogleMapsApiKey(newKey)) {
      saveGoogleMapsApiKey(newKey);
    }
    setApiKey(newKey);
  };

  return {
    apiKey,
    setApiKey: setApiKeyAndSave,
    isLoaded,
    loadError,
    isLoading,
    isApiKeyValid
  };
}
