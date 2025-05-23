
// Google Maps libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Script ID for Google Maps
export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';

// Function to get API key that can be used across the app
export function getGoogleMapsApiKey(): string {
  // For demo purposes, we're using a hardcoded key that works with the application
  return "AIzaSyB5gv4_7U1ZpVNNPW53qXTYxdTLOUVN4cQ";
}

// Function to save API key
export function saveGoogleMapsApiKey(apiKey: string): void {
  localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE, apiKey);
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
  // Remove the script tag with our specific ID
  const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
  if (existingScript) {
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
  
  // Clean up any Google Maps global objects
  cleanupGoogleMapsObjects();
}

// Clean up Google global objects
export function cleanupGoogleMapsObjects(): void {
  if (window.google) {
    // Safely try to clean up Maps API objects
    try {
      // @ts-ignore
      if (window.google.maps && window.google.maps.event) {
        // @ts-ignore
        window.google.maps.event.clearInstanceListeners(window);
      }
      // Don't delete window.google as it may break other components
      // Instead, just clear maps-related properties
      // @ts-ignore
      if (window.google.maps) {
        // @ts-ignore
        window.google.maps = undefined;
      }
    } catch (e) {
      console.error('Error cleaning up Google Maps objects:', e);
    }
  }
  
  // Clean up any callback handlers
  if (window.initMap) {
    // @ts-ignore
    window.initMap = undefined;
  }
}

// Function to handle API loading errors
export function handleMapsApiLoadError(error: Error): string {
  if (!error) return "Unknown error loading Google Maps";
  
  if (error.message && error.message.includes('ApiNotActivatedMapError')) {
    return "The Google Maps JavaScript API is not activated for this API key. Please enable it in the Google Cloud Console.";
  } else if (error.message && error.message.includes('RefererNotAllowedMapError')) {
    return "The current URL is not allowed to use this API key. Please add it to the allowed referrers.";
  } else if (error.message && error.message.includes('InvalidKeyMapError')) {
    return "The provided API key is invalid or expired. Please check your key.";
  } else if (error.message && error.message.includes('MissingKeyMapError')) {
    return "No API key provided. Please enter a valid Google Maps API key.";
  } else {
    return `Error loading Google Maps: ${error.message || "Unknown error"}`;
  }
}

// Manual script loading function that doesn't conflict with useLoadScript
export function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // First check if Google Maps is already loaded
    // @ts-ignore
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    
    // Clean up any existing scripts
    removeExistingGoogleMapsScript();
    
    // Create a callback name that won't conflict
    const callbackName = `googleMapsInitCallback_${Date.now()}`;
    
    // Add the callback to window
    // @ts-ignore
    window[callbackName] = function() {
      console.log("Google Maps loaded via manual script");
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
    
    script.onerror = () => {
      reject(new Error('Google Maps script failed to load'));
      // Cleanup the callback
      // @ts-ignore
      delete window[callbackName];
    };
    
    document.head.appendChild(script);
  });
}
