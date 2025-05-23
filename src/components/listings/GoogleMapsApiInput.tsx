
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Map, Key, CheckCircle2, AlertTriangle } from 'lucide-react';
import { 
  getGoogleMapsApiKey, 
  saveGoogleMapsApiKey, 
  removeGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  removeExistingGoogleMapsScript 
} from "@/utils/googleMapsUtils";

// Define our props interface
interface GoogleMapsApiInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export function GoogleMapsApiInput({ onApiKeySubmit }: GoogleMapsApiInputProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [storedKey, setStoredKey] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();
  
  // Check if API key is already stored in local storage
  useEffect(() => {
    const savedApiKey = getGoogleMapsApiKey();
    if (isValidGoogleMapsApiKey(savedApiKey)) {
      setStoredKey(savedApiKey);
      setApiKey(savedApiKey);
      
      // Notify parent component about the API key
      onApiKeySubmit(savedApiKey);
    }
  }, [onApiKeySubmit]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!isValidGoogleMapsApiKey(apiKey)) {
      setErrorMessage("Please enter a valid Google Maps API key");
      toast({
        title: "API Key Required",
        description: "Please enter a valid Google Maps API key."
      });
      return;
    }
    
    // Clean up existing script
    removeExistingGoogleMapsScript();
    
    // Store API key in local storage
    saveGoogleMapsApiKey(apiKey);
    setStoredKey(apiKey);
    
    toast({
      title: "API Key Saved",
      description: "Your Google Maps API key has been saved and activated."
    });
    
    // Notify parent component
    onApiKeySubmit(apiKey);
  };
  
  const handleReset = () => {
    removeGoogleMapsApiKey();
    removeExistingGoogleMapsScript();
    
    setStoredKey(null);
    setApiKey("");
    setErrorMessage("");
    
    toast({
      title: "API Key Removed",
      description: "Your Google Maps API key has been removed."
    });
    
    // Notify parent component
    onApiKeySubmit("");
  };
  
  if (storedKey) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-100">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="bg-green-50 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="font-medium text-base text-gray-900">Google Maps API Key Set</h3>
            <p className="text-sm text-gray-500">
              Your map is ready to use with the saved API key.
            </p>
            <p className="text-xs text-gray-400 mb-2">
              Key: {storedKey.substring(0, 5)}...{storedKey.substring(storedKey.length - 5)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
            <Key className="h-3.5 w-3.5" />
            Reset API Key
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-100">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="space-y-5">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-lg">Google Maps API Key</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                To view listings on the map, please enter your Google Maps API key below.
              </p>
            </div>
            
            <Input
              placeholder="Enter your Google Maps API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={`w-full border-gray-300 ${errorMessage ? 'border-red-300' : ''}`}
            />
            
            {errorMessage && (
              <div className="text-xs text-red-500 flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3" />
                {errorMessage}
              </div>
            )}
            
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
              <p className="mb-1.5 font-medium text-gray-700">Important Information:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>This key will be stored in your browser's local storage.</li>
                <li>You can get a Google Maps API key from the <a href="https://console.cloud.google.com/google/maps-apis/overview" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a>.</li>
                <li>Make sure to enable the Maps JavaScript API and Geocoding API.</li>
                <li>For testing, you can create a key with no restrictions.</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button type="submit" size="default" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Save & Activate Map
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
