
import { useState, useEffect, useRef } from 'react';
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
  // Use a ref to store the initial API key to prevent re-renders
  const initialApiKeyRef = useRef<string>(getGoogleMapsApiKey());
  const [apiKey, setApiKeyState] = useState<string>(initialApiKeyRef.current);
  const { toast } = useToast();
  
  // Load script just once with the initial API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: initialApiKeyRef.current || "",
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
      
      // If changing to a different key, we need a page reload
      if (isLoaded && apiKey !== newKey) {
        toast({
          title: "API Key Updated",
          description: "Refreshing page to apply new API key...",
        });
        
        // Use a timeout to ensure the toast is shown before reload
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
