
// Google Maps libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Script ID for Google Maps
export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';

// Function to get API key that can be used across the app
export function getGoogleMapsApiKey(): string {
  // For now, let's hardcode the API key that was working
  const hardcodedKey = "AIzaSyB5gv4_7U1ZpVNNPW53qXTYxdTLOUVN4cQ";
  return hardcodedKey || localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE) || "";
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
      delete window.google;
    } catch (e) {
      console.error('Error cleaning up Google Maps objects:', e);
    }
  }
  
  // Clean up any callback handlers
  if (window.initMap) {
    delete window.initMap;
  }
}

// Function to handle API loading errors
export function handleMapsApiLoadError(error: Error): string {
  if (error.message.includes('ApiNotActivatedMapError')) {
    return "The Google Maps JavaScript API is not activated for this API key. Please enable it in the Google Cloud Console.";
  } else if (error.message.includes('RefererNotAllowedMapError')) {
    return "The current URL is not allowed to use this API key. Please add it to the allowed referrers.";
  } else if (error.message.includes('InvalidKeyMapError')) {
    return "The provided API key is invalid or expired. Please check your key.";
  } else if (error.message.includes('MissingKeyMapError')) {
    return "No API key provided. Please enter a valid Google Maps API key.";
  } else {
    return `Error loading Google Maps: ${error.message}`;
  }
}

// Function to ensure we only have one instance of the script loading
let scriptPromise: Promise<void> | null = null;
export function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (scriptPromise) return scriptPromise;
  
  scriptPromise = new Promise((resolve, reject) => {
    // First ensure any existing scripts are cleaned up
    removeExistingGoogleMapsScript();
    
    // Create a new script element
    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Define the callback that will be called when the script loads
    window.initMap = function() {
      resolve();
      // Don't delete initMap here as it might be needed by other components
    };
    
    // Define error handler
    script.onerror = () => {
      reject(new Error('Google Maps script failed to load.'));
      scriptPromise = null;
    };
    
    // Append the script to the document
    document.head.appendChild(script);
  });
  
  return scriptPromise;
}
