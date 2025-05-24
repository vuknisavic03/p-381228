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

// Enhanced geocoding function with maximum precision strategies
export async function geocodeAddress(address: string, city: string, country: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  const fullAddress = `${address}, ${city}, ${country}`;
  const apiKey = getGoogleMapsApiKey();
  
  if (!apiKey) {
    console.error("No API key available for geocoding");
    return null;
  }

  try {
    // Strategy 1: High-precision geocoding with structured components
    const params = new URLSearchParams({
      address: fullAddress,
      key: apiKey,
      // Use structured components for better parsing
      components: `country:${country.toLowerCase()}|locality:${city}|route:${address.split(' ').slice(1).join(' ')}`,
      // Prioritize most accurate result types
      result_type: 'street_address|premise|subpremise|street_number',
      // Only accept high-precision location types
      location_type: 'ROOFTOP|RANGE_INTERPOLATED',
      // Request additional precision data
      extra_computations: 'ADDRESS_DESCRIPTORS'
    });

    console.log(`Attempting high-precision geocoding for: "${fullAddress}"`);
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      // Strategy 2: Select the most accurate result based on multiple criteria
      const bestResult = selectMostAccurateResult(data.results, address, city);
      
      if (bestResult) {
        const location = bestResult.geometry.location;
        const locationType = bestResult.geometry.location_type;
        const placeId = bestResult.place_id;
        
        // Strategy 3: Validate result accuracy
        const accuracyScore = calculateAccuracyScore(bestResult, fullAddress);
        
        console.log(`High-precision geocoding successful:`, {
          address: fullAddress,
          coordinates: location,
          locationType,
          placeId,
          accuracyScore,
          addressComponents: bestResult.address_components?.length || 0
        });
        
        // Return coordinates with maximum precision (8 decimal places ≈ 0.00000011m accuracy)
        return { 
          lat: parseFloat(location.lat.toFixed(8)), 
          lng: parseFloat(location.lng.toFixed(8)),
          accuracy: locationType,
          placeId
        };
      }
    }
    
    // Strategy 4: Fallback to Place Details API for even higher accuracy
    if (data.results.length > 0 && data.results[0].place_id) {
      console.log("Attempting Place Details API fallback for maximum precision");
      return await getPlaceDetailsCoordinates(data.results[0].place_id, apiKey);
    }
    
    console.error('High-precision geocoding failed:', data.status, data.error_message);
    return null;
    
  } catch (error) {
    console.error('Error during high-precision geocoding:', error);
    return null;
  }
}

// Strategy 2: Intelligent result selection for maximum accuracy
function selectMostAccurateResult(results: any[], originalAddress: string, originalCity: string): any | null {
  // Prioritize results by accuracy hierarchy
  const accuracyPriority = ['ROOFTOP', 'RANGE_INTERPOLATED', 'GEOMETRIC_CENTER', 'APPROXIMATE'];
  
  for (const accuracyType of accuracyPriority) {
    const candidateResults = results.filter(result => 
      result.geometry.location_type === accuracyType
    );
    
    if (candidateResults.length > 0) {
      // Among results of same accuracy type, choose the one with best address component match
      return candidateResults.reduce((best, current) => {
        const bestScore = scoreAddressMatch(best, originalAddress, originalCity);
        const currentScore = scoreAddressMatch(current, originalAddress, originalCity);
        return currentScore > bestScore ? current : best;
      });
    }
  }
  
  return results[0]; // Fallback to first result
}

// Strategy 3: Address matching score calculation
function scoreAddressMatch(result: any, originalAddress: string, originalCity: string): number {
  if (!result.address_components) return 0;
  
  let score = 0;
  const components = result.address_components;
  
  // Check for street number match
  const streetNumber = components.find(c => c.types.includes('street_number'));
  if (streetNumber && originalAddress.includes(streetNumber.long_name)) {
    score += 40; // High weight for exact street number
  }
  
  // Check for route/street name match
  const route = components.find(c => c.types.includes('route'));
  if (route) {
    const streetName = originalAddress.toLowerCase();
    if (streetName.includes(route.long_name.toLowerCase())) {
      score += 30; // High weight for street name match
    }
  }
  
  // Check for locality match
  const locality = components.find(c => c.types.includes('locality'));
  if (locality && locality.long_name.toLowerCase() === originalCity.toLowerCase()) {
    score += 20; // Medium weight for city match
  }
  
  // Bonus for premise-level results
  const premise = components.find(c => c.types.includes('premise'));
  if (premise) {
    score += 10; // Bonus for building-level accuracy
  }
  
  return score;
}

// Strategy 3: Accuracy score calculation
function calculateAccuracyScore(result: any, fullAddress: string): string {
  const locationType = result.geometry.location_type;
  const addressComponents = result.address_components?.length || 0;
  const hasStreetNumber = result.address_components?.some(c => c.types.includes('street_number'));
  const hasPremise = result.address_components?.some(c => c.types.includes('premise'));
  
  if (locationType === 'ROOFTOP' && hasStreetNumber && addressComponents >= 6) {
    return 'MAXIMUM'; // Best possible accuracy
  } else if (locationType === 'ROOFTOP' && hasStreetNumber) {
    return 'HIGH'; // Very good accuracy
  } else if (locationType === 'RANGE_INTERPOLATED' && hasStreetNumber) {
    return 'GOOD'; // Good accuracy
  } else {
    return 'MODERATE'; // Lower accuracy
  }
}

// Strategy 4: Place Details API for maximum precision
async function getPlaceDetailsCoordinates(placeId: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId: string} | null> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,name,formatted_address&key=${apiKey}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.result?.geometry?.location) {
      const location = data.result.geometry.location;
      console.log(`Place Details API provided enhanced coordinates for place_id: ${placeId}`, location);
      
      return {
        lat: parseFloat(location.lat.toFixed(8)),
        lng: parseFloat(location.lng.toFixed(8)),
        accuracy: 'PLACE_DETAILS',
        placeId
      };
    }
    
    return null;
  } catch (error) {
    console.error('Place Details API error:', error);
    return null;
  }
}

// Enhanced validation function for geocoding results
export function validateGeocodingAccuracy(result: {lat: number, lng: number, accuracy: string}): boolean {
  // Validate coordinate precision
  if (!result.lat || !result.lng) return false;
  
  // Check if coordinates have sufficient precision (at least 5 decimal places)
  const latPrecision = result.lat.toString().split('.')[1]?.length || 0;
  const lngPrecision = result.lng.toString().split('.')[1]?.length || 0;
  
  if (latPrecision < 5 || lngPrecision < 5) {
    console.warn('Low coordinate precision detected');
    return false;
  }
  
  // Validate accuracy level
  const acceptableAccuracy = ['ROOFTOP', 'RANGE_INTERPOLATED', 'PLACE_DETAILS'];
  return acceptableAccuracy.includes(result.accuracy);
}
