
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

// Advanced geocoding with multiple strategies for maximum accuracy
export async function geocodeAddress(address: string, city: string, country: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  const apiKey = getGoogleMapsApiKey();
  
  if (!apiKey) {
    console.error("No API key available for geocoding");
    return null;
  }

  // Strategy 1: Try exact address with structured components
  const result = await tryStructuredGeocoding(address, city, country, apiKey);
  if (result && isHighAccuracy(result)) {
    return result;
  }

  // Strategy 2: Try with Places API for enhanced accuracy
  const placesResult = await tryPlacesTextSearch(address, city, country, apiKey);
  if (placesResult && isHighAccuracy(placesResult)) {
    return placesResult;
  }

  // Strategy 3: Try Address Validation API (if available)
  const validatedResult = await tryAddressValidation(address, city, country, apiKey);
  if (validatedResult && isHighAccuracy(validatedResult)) {
    return validatedResult;
  }

  // Strategy 4: Fallback with the best available result
  return result || placesResult || validatedResult;
}

// Strategy 1: Structured geocoding with precise parameters
async function tryStructuredGeocoding(address: string, city: string, country: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  try {
    const fullAddress = `${address}, ${city}, ${country}`;
    
    // Extract street number and route for better structuring
    const addressParts = address.split(' ');
    const streetNumber = addressParts[0];
    const route = addressParts.slice(1).join(' ');
    
    const params = new URLSearchParams({
      address: fullAddress,
      key: apiKey,
      // Use structured components for maximum precision
      components: `country:${getCountryCode(country)}|locality:${city}|route:${route}|street_number:${streetNumber}`,
      // Only accept most precise location types
      location_type: 'ROOFTOP',
      // Request detailed result types
      result_type: 'street_address|premise|subpremise',
      // Enhanced precision parameters
      language: 'en',
      region: getCountryCode(country).toLowerCase()
    });

    console.log(`Structured geocoding attempt for: "${fullAddress}"`);
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const bestResult = selectBestResult(data.results, address, city);
      
      if (bestResult) {
        const location = bestResult.geometry.location;
        const locationType = bestResult.geometry.location_type;
        const placeId = bestResult.place_id;
        
        console.log(`Structured geocoding successful:`, {
          address: fullAddress,
          coordinates: location,
          locationType,
          accuracy: calculatePrecisionScore(bestResult)
        });
        
        return { 
          lat: parseFloat(location.lat.toFixed(10)), 
          lng: parseFloat(location.lng.toFixed(10)),
          accuracy: locationType,
          placeId
        };
      }
    }
    
    console.warn('Structured geocoding failed:', data.status);
    return null;
    
  } catch (error) {
    console.error('Structured geocoding error:', error);
    return null;
  }
}

// Strategy 2: Places Text Search for enhanced accuracy
async function tryPlacesTextSearch(address: string, city: string, country: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  try {
    const query = `${address}, ${city}, ${country}`;
    
    const params = new URLSearchParams({
      query: query,
      key: apiKey,
      // Bias results to the specified region
      region: getCountryCode(country).toLowerCase(),
      // Request detailed fields
      fields: 'place_id,geometry,formatted_address,address_components,types',
      // Input type for addresses
      inputtype: 'textquery'
    });

    console.log(`Places Text Search for: "${query}"`);
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const bestResult = data.results[0]; // Places API usually returns best match first
      
      if (bestResult.geometry?.location) {
        const location = bestResult.geometry.location;
        
        // Get more precise coordinates using Place Details
        const detailedResult = await getPlaceDetailsCoordinates(bestResult.place_id, apiKey);
        if (detailedResult) {
          return detailedResult;
        }
        
        return { 
          lat: parseFloat(location.lat.toFixed(10)), 
          lng: parseFloat(location.lng.toFixed(10)),
          accuracy: 'PLACES_API',
          placeId: bestResult.place_id
        };
      }
    }
    
    console.warn('Places Text Search failed:', data.status);
    return null;
    
  } catch (error) {
    console.error('Places Text Search error:', error);
    return null;
  }
}

// Strategy 3: Address Validation API (Premium feature)
async function tryAddressValidation(address: string, city: string, country: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  try {
    const requestBody = {
      address: {
        addressLines: [address],
        locality: city,
        regionCode: getCountryCode(country),
        postalCode: "" // Can be enhanced if postal code is available
      },
      enableUspsCass: true // For US addresses
    };

    console.log(`Address Validation API attempt for: "${address}, ${city}, ${country}"`);
    
    const response = await fetch(
      `https://addressvalidation.googleapis.com/v1:validateAddress?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );
    
    const data = await response.json();
    
    if (data.result?.geocode?.location) {
      const location = data.result.geocode.location;
      const accuracy = data.result.geocode.locationType || 'VALIDATED';
      
      console.log('Address Validation successful:', {
        coordinates: location,
        accuracy: accuracy,
        validationGranularity: data.result.verdict?.validationGranularity
      });
      
      return { 
        lat: parseFloat(location.latitude.toFixed(10)), 
        lng: parseFloat(location.longitude.toFixed(10)),
        accuracy: accuracy,
        placeId: data.result.geocode.placeId
      };
    }
    
    console.warn('Address Validation failed or not available');
    return null;
    
  } catch (error) {
    console.warn('Address Validation API not available or error:', error);
    return null;
  }
}

// Enhanced Place Details API for maximum precision
async function getPlaceDetailsCoordinates(placeId: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId: string} | null> {
  try {
    const params = new URLSearchParams({
      place_id: placeId,
      key: apiKey,
      // Request all relevant fields for accuracy analysis
      fields: 'geometry,address_components,formatted_address,place_id,types,plus_code'
    });
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.result?.geometry?.location) {
      const location = data.result.geometry.location;
      const locationType = data.result.geometry.location_type || 'PLACE_DETAILS';
      
      console.log(`Place Details enhanced coordinates for place_id: ${placeId}`, {
        coordinates: location,
        locationType: locationType,
        plusCode: data.result.plus_code?.global_code
      });
      
      return {
        lat: parseFloat(location.lat.toFixed(10)),
        lng: parseFloat(location.lng.toFixed(10)),
        accuracy: locationType,
        placeId
      };
    }
    
    return null;
  } catch (error) {
    console.error('Place Details API error:', error);
    return null;
  }
}

// Advanced result selection algorithm
function selectBestResult(results: any[], originalAddress: string, originalCity: string): any | null {
  if (!results.length) return null;
  
  // Score each result based on multiple criteria
  const scoredResults = results.map(result => ({
    result,
    score: calculateResultScore(result, originalAddress, originalCity)
  }));
  
  // Sort by score (highest first)
  scoredResults.sort((a, b) => b.score - a.score);
  
  const bestResult = scoredResults[0];
  console.log(`Best result selected with score: ${bestResult.score}`, bestResult.result);
  
  return bestResult.result;
}

// Comprehensive scoring algorithm
function calculateResultScore(result: any, originalAddress: string, originalCity: string): number {
  let score = 0;
  const components = result.address_components || [];
  const locationType = result.geometry?.location_type;
  
  // Location type scoring (highest priority)
  switch (locationType) {
    case 'ROOFTOP': score += 100; break;
    case 'RANGE_INTERPOLATED': score += 80; break;
    case 'GEOMETRIC_CENTER': score += 60; break;
    case 'APPROXIMATE': score += 40; break;
    default: score += 20;
  }
  
  // Address component matching
  const streetNumber = components.find(c => c.types.includes('street_number'));
  if (streetNumber && originalAddress.includes(streetNumber.long_name)) {
    score += 50; // Exact street number match
  }
  
  const route = components.find(c => c.types.includes('route'));
  if (route) {
    const routeMatch = calculateStringMatch(route.long_name.toLowerCase(), originalAddress.toLowerCase());
    score += Math.floor(routeMatch * 30); // Street name similarity
  }
  
  const locality = components.find(c => c.types.includes('locality'));
  if (locality && locality.long_name.toLowerCase() === originalCity.toLowerCase()) {
    score += 20; // City match
  }
  
  // Bonus for specific result types
  const resultTypes = result.types || [];
  if (resultTypes.includes('street_address')) score += 15;
  if (resultTypes.includes('premise')) score += 10;
  if (resultTypes.includes('subpremise')) score += 5;
  
  return score;
}

// String similarity calculation
function calculateStringMatch(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance calculation
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Precision score calculation
function calculatePrecisionScore(result: any): string {
  const locationType = result.geometry?.location_type;
  const addressComponents = result.address_components?.length || 0;
  const hasStreetNumber = result.address_components?.some(c => c.types.includes('street_number'));
  const hasPremise = result.address_components?.some(c => c.types.includes('premise'));
  
  if (locationType === 'ROOFTOP' && hasStreetNumber && addressComponents >= 6) {
    return 'MAXIMUM';
  } else if (locationType === 'ROOFTOP' && hasStreetNumber) {
    return 'HIGH';
  } else if (locationType === 'RANGE_INTERPOLATED' && hasStreetNumber) {
    return 'GOOD';
  } else {
    return 'MODERATE';
  }
}

// High accuracy validation
function isHighAccuracy(result: {lat: number, lng: number, accuracy: string}): boolean {
  const highAccuracyTypes = ['ROOFTOP', 'PLACES_API', 'VALIDATED', 'MAXIMUM', 'HIGH'];
  return highAccuracyTypes.includes(result.accuracy);
}

// Country code mapping for better geocoding
function getCountryCode(country: string): string {
  const countryMap: {[key: string]: string} = {
    'serbia': 'RS',
    'united states': 'US',
    'usa': 'US',
    'united kingdom': 'GB',
    'uk': 'GB',
    'germany': 'DE',
    'france': 'FR',
    'italy': 'IT',
    'spain': 'ES',
    'canada': 'CA',
    'australia': 'AU',
    'japan': 'JP',
    'china': 'CN',
    'brazil': 'BR',
    'india': 'IN',
    'russia': 'RU',
    'netherlands': 'NL',
    'belgium': 'BE',
    'switzerland': 'CH',
    'austria': 'AT',
    'poland': 'PL',
    'sweden': 'SE',
    'norway': 'NO',
    'denmark': 'DK',
    'finland': 'FI',
    'portugal': 'PT',
    'greece': 'GR',
    'turkey': 'TR',
    'mexico': 'MX',
    'argentina': 'AR',
    'chile': 'CL',
    'colombia': 'CO',
    'peru': 'PE',
    'venezuela': 'VE',
    'south africa': 'ZA',
    'egypt': 'EG',
    'israel': 'IL',
    'saudi arabia': 'SA',
    'uae': 'AE',
    'emirates': 'AE',
    'thailand': 'TH',
    'singapore': 'SG',
    'malaysia': 'MY',
    'indonesia': 'ID',
    'philippines': 'PH',
    'vietnam': 'VN',
    'south korea': 'KR',
    'korea': 'KR',
    'taiwan': 'TW',
    'hong kong': 'HK',
    'new zealand': 'NZ'
  };
  
  const normalized = country.toLowerCase().trim();
  return countryMap[normalized] || country.toUpperCase().substring(0, 2);
}

// Enhanced validation function for geocoding results
export function validateGeocodingAccuracy(result: {lat: number, lng: number, accuracy: string}): boolean {
  // Validate coordinate precision (minimum 8 decimal places for maximum accuracy)
  if (!result.lat || !result.lng) return false;
  
  // Check coordinate bounds (valid lat/lng ranges)
  if (result.lat < -90 || result.lat > 90 || result.lng < -180 || result.lng > 180) {
    console.warn('Invalid coordinate bounds detected');
    return false;
  }
  
  // Check precision (at least 8 decimal places for sub-meter accuracy)
  const latPrecision = result.lat.toString().split('.')[1]?.length || 0;
  const lngPrecision = result.lng.toString().split('.')[1]?.length || 0;
  
  if (latPrecision < 8 || lngPrecision < 8) {
    console.warn('Low coordinate precision detected');
    return false;
  }
  
  // Validate accuracy level
  const acceptableAccuracy = ['ROOFTOP', 'RANGE_INTERPOLATED', 'PLACES_API', 'VALIDATED', 'MAXIMUM', 'HIGH', 'GOOD'];
  return acceptableAccuracy.includes(result.accuracy);
}
