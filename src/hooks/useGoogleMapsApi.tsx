
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  getGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  removeExistingGoogleMapsScript,
  cleanupGoogleMapsObjects,
  handleMapsApiLoadError,
  loadGoogleMapsScript
} from '@/utils/googleMapsUtils';

export function useGoogleMapsApi() {
  const [apiKey, setApiKey] = useState<string>(() => getGoogleMapsApiKey());
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(() => isValidGoogleMapsApiKey(getGoogleMapsApiKey()));
  const { toast } = useToast();

  const loadGoogleMaps = async (key: string) => {
    // Skip if already loading
    if (isLoading) return;
    
    // Skip if already loaded with same key
    if (isLoaded && key === apiKey) return;
    
    setIsLoading(true);
    setLoadError(null);
    
    try {
      await loadGoogleMapsScript(key);
      setIsLoaded(true);
      console.log("Google Maps loaded successfully");
    } catch (error) {
      console.error("Failed to load Google Maps:", error);
      setLoadError(error instanceof Error ? error : new Error(String(error)));
      setIsLoaded(false);
      
      // Show toast with error message
      toast({
        title: "Google Maps Error",
        description: handleMapsApiLoadError(error instanceof Error ? error : new Error(String(error))),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load effect
  useEffect(() => {
    if (isApiKeyValid) {
      loadGoogleMaps(apiKey);
    }
  }, []); // Only run on mount

  // Effect to handle API key changes
  useEffect(() => {
    // Update validity state
    const isValid = isValidGoogleMapsApiKey(apiKey);
    setIsApiKeyValid(isValid);
    
    if (isValid) {
      loadGoogleMaps(apiKey);
    }
  }, [apiKey]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupGoogleMapsObjects();
    };
  }, []);

  return {
    apiKey,
    setApiKey,
    isLoaded,
    isLoading,
    loadError,
    isApiKeyValid
  };
}
