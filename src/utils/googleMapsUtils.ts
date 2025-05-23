
// Stable libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Function to get API key that can be used across the app
export function getGoogleMapsApiKey(): string {
  return localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE) || "";
}

// Function to save API key
export function saveGoogleMapsApiKey(apiKey: string): void {
  localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE, apiKey);
}

// Function to remove API key
export function removeGoogleMapsApiKey(): void {
  localStorage.removeItem(GOOGLE_MAPS_KEY_STORAGE);
}

// Check if the API key is valid
export function isValidGoogleMapsApiKey(apiKey: string): boolean {
  return apiKey !== undefined && apiKey !== null && apiKey.trim().length > 0;
}

// Create a script ID to prevent duplicate loading
export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';

// Function to load Google Maps script manually (alternative approach)
export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.getElementById(GOOGLE_MAPS_SCRIPT_ID)) {
      console.log("Google Maps script already loaded");
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Define the callback
    window.initMap = () => {
      console.log("Google Maps initialized successfully");
      resolve();
    };

    script.onerror = (error) => {
      console.error("Error loading Google Maps script:", error);
      reject(error);
    };

    document.head.appendChild(script);
  });
};

// Clear existing script before loading new one
export const removeExistingGoogleMapsScript = (): void => {
  const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
  if (existingScript) {
    existingScript.remove();
    // Also clean up the callback
    if (window.google?.maps) {
      delete window.google.maps;
    }
    console.log("Removed existing Google Maps script");
  }
};

// Clean up Google global objects
export const cleanupGoogleMapsObjects = (): void => {
  if (window.google) {
    delete window.google;
  }
  if (window.initMap) {
    delete window.initMap;
  }
};
