
// Google Maps libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Default demo API key
const DEFAULT_DEMO_KEY = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg";

// Function to get API key that can be used across the app
export function getGoogleMapsApiKey(): string {
  try {
    // Try to get from localStorage
    const storedKey = localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE);
    if (storedKey && storedKey.trim()) {
      console.log("Retrieved API key from localStorage");
      return storedKey.trim();
    }
  } catch (error) {
    console.warn("Could not access localStorage:", error);
  }
  
  console.log("Using default demo API key");
  return DEFAULT_DEMO_KEY;
}

// Function to save API key
export function saveGoogleMapsApiKey(apiKey: string): void {
  try {
    if (apiKey && apiKey.trim()) {
      localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE, apiKey.trim());
      console.log("API key saved to localStorage");
    }
  } catch (error) {
    console.error("Could not save API key to localStorage:", error);
  }
}

// Function to remove API key
export function removeGoogleMapsApiKey(): void {
  try {
    localStorage.removeItem(GOOGLE_MAPS_KEY_STORAGE);
    console.log("API key removed from localStorage");
  } catch (error) {
    console.error("Could not remove API key from localStorage:", error);
  }
}

// Check if the API key is valid (simple client-side validation)
export function isValidGoogleMapsApiKey(apiKey: string): boolean {
  return Boolean(apiKey && apiKey.trim().length > 0);
}

// Function to handle API loading errors
export function handleMapsApiLoadError(error: Error | null): string {
  if (!error) return "Unknown error loading Google Maps";
  
  const errorMessage = error.message || "Unknown error";
  console.error("Google Maps error details:", errorMessage);
  
  if (errorMessage.includes('ApiNotActivatedMapError')) {
    return "The Google Maps JavaScript API is not activated for this API key. Please enable it in the Google Cloud Console.";
  } else if (errorMessage.includes('RefererNotAllowedMapError')) {
    return "The current URL is not allowed to use this API key. Please add it to the allowed referrers.";
  } else if (errorMessage.includes('InvalidKeyMapError')) {
    return "The provided API key is invalid or expired. Please check your key.";
  } else if (errorMessage.includes('MissingKeyMapError')) {
    return "No API key provided. Please enter a valid Google Maps API key.";
  } else if (errorMessage.includes('Loader must not be called again')) {
    return "Google Maps is already loading. Please refresh the page if the issue persists.";
  } else {
    return `Error loading Google Maps: ${errorMessage}`;
  }
}

// Geocoding function to convert address to coordinates
export async function geocodeAddress(address: string, city: string, country: string): Promise<{lat: number, lng: number} | null> {
  const fullAddress = `${address}, ${city}, ${country}`;
  const apiKey = getGoogleMapsApiKey();
  
  if (!apiKey) {
    console.error("No API key available for geocoding");
    return null;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      console.log(`Geocoded "${fullAddress}" to:`, location);
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error('Geocoding failed:', data.status, data.error_message);
      return null;
    }
  } catch (error) {
    console.error('Error during geocoding:', error);
    return null;
  }
}
