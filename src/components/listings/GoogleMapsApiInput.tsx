
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface GoogleMapsApiInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export function GoogleMapsApiInput({ onApiKeySubmit }: GoogleMapsApiInputProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [storedKey, setStoredKey] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Check if API key is already stored in local storage
  useEffect(() => {
    const savedApiKey = localStorage.getItem("googleMapsApiKey");
    if (savedApiKey) {
      setStoredKey(savedApiKey);
      onApiKeySubmit(savedApiKey);
    }
  }, [onApiKeySubmit]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a Google Maps API key.",
        variant: "destructive",
      });
      return;
    }
    
    // Store API key in local storage
    localStorage.setItem("googleMapsApiKey", apiKey);
    setStoredKey(apiKey);
    onApiKeySubmit(apiKey);
    
    toast({
      title: "API Key Saved",
      description: "Your Google Maps API key has been saved.",
    });
  };
  
  const handleReset = () => {
    localStorage.removeItem("googleMapsApiKey");
    setStoredKey(null);
    setApiKey("");
    
    toast({
      title: "API Key Removed",
      description: "Your Google Maps API key has been removed.",
    });
  };
  
  if (storedKey) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              Google Maps API key is set.
            </p>
            <p className="text-xs text-gray-400 mb-2">
              Key: {storedKey.substring(0, 4)}...{storedKey.substring(storedKey.length - 4)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset API Key
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-medium text-base">Google Maps API Key Required</h3>
              <p className="text-sm text-gray-500 mt-1">
                To view listings on the map, please enter your Google Maps API key.
              </p>
            </div>
            
            <Input
              placeholder="Enter your Google Maps API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full"
            />
            
            <div className="text-xs text-gray-500">
              <p>You can get a Google Maps API key from the <a href="https://console.cloud.google.com/google/maps-apis/overview" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a>.</p>
              <p className="mt-1">This key will be stored in your browser's local storage.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" size="sm">
            Save Key
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
