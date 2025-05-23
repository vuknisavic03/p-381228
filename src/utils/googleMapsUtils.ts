
// Google Maps libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Script ID for Google Maps
export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';

// Function to get API key that can be used across the app
export function getGoogleMapsApiKey(): string {
  // First try to get from localStorage
  const storedKey = localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE);
  if (storedKey) {
    return storedKey;
  }
  
  // Fallback to a demo API key - this is a restricted demo key that should work for basic usage
  return "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg";
}

// Function to save API key
export function saveGoogleMapsApiKey(apiKey: string): void {
  if (apiKey && apiKey.trim()) {
    localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE, apiKey.trim());
    console.log("API key saved to localStorage");
  }
}

// Function to remove API key
export function removeGoogleMapsApiKey(): void {
  localStorage.removeItem(GOOGLE_MAPS_KEY_STORAGE);
}

// Check if the API key is valid (simple client-side validation)
export function isValidGoogleMapsApiKey(apiKey: string): boolean {
  return Boolean(apiKey && apiKey.trim().length > 0);
}

// Remove existing Google Maps script tags
export function removeExistingGoogleMapsScript(): void {
  const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
  if (existingScript) {
    console.log("Removing existing Google Maps script");
    existingScript.remove();
  }
  
  // Also remove any other Google Maps scripts that might be present
  const allScripts = document.getElementsByTagName('script');
  for (let i = 0; i < allScripts.length; i++) {
    const src = allScripts[i].src;
    if (src && src.includes('maps.googleapis.com/maps/api/js')) {
      allScripts[i].remove();
      i--; // Adjust index after removal
    }
  }
}

// Clean up Google global objects
export function cleanupGoogleMapsObjects(): void {
  // @ts-ignore
  if (window.google) {
    // Safely try to clean up Maps API objects
    try {
      // @ts-ignore
      if (window.google.maps) {
        // Don't delete window.google as it may break other components
        // Just clear maps-related properties
        // @ts-ignore
        window.google.maps = undefined;
      }
    } catch (e) {
      console.error('Error cleaning up Google Maps objects:', e);
    }
  }
  
  // Clean up any callback handlers
  // @ts-ignore
  if (window.initMap) {
    // @ts-ignore
    window.initMap = undefined;
  }
}

// Function to handle API loading errors
export function handleMapsApiLoadError(error: Error | null): string {
  if (!error) return "Unknown error loading Google Maps";
  
  const errorMessage = error.message || "Unknown error";
  
  if (errorMessage.includes('ApiNotActivatedMapError')) {
    return "The Google Maps JavaScript API is not activated for this API key. Please enable it in the Google Cloud Console.";
  } else if (errorMessage.includes('RefererNotAllowedMapError')) {
    return "The current URL is not allowed to use this API key. Please add it to the allowed referrers.";
  } else if (errorMessage.includes('InvalidKeyMapError')) {
    return "The provided API key is invalid or expired. Please check your key.";
  } else if (errorMessage.includes('MissingKeyMapError')) {
    return "No API key provided. Please enter a valid Google Maps API key.";
  } else {
    return `Error loading Google Maps: ${errorMessage}`;
  }
}

// Manual script loading function
export function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("Starting to load Google Maps script");
    
    // First check if Google Maps is already loaded
    // @ts-ignore
    if (window.google && window.google.maps) {
      console.log("Google Maps is already loaded, resolving immediately");
      resolve();
      return;
    }
    
    // Clean up any existing scripts to prevent conflicts
    removeExistingGoogleMapsScript();
    
    // Create a callback name that won't conflict
    const callbackName = `initGoogleMaps_${Date.now()}`;
    
    // Add the callback to window
    // @ts-ignore
    window[callbackName] = function() {
      console.log("Google Maps loaded via callback");
      resolve();
      // Cleanup the callback
      // @ts-ignore
      delete window[callbackName];
    };
    
    // Create and add the script
    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    
    // Add error handling
    script.onerror = (event) => {
      console.error("Google Maps script failed to load", event);
      // Cleanup the callback
      // @ts-ignore
      delete window[callbackName];
      reject(new Error('Google Maps script failed to load'));
    };
    
    // Add to document
    document.head.appendChild(script);
    console.log("Google Maps script added to document.head");
  });
}
