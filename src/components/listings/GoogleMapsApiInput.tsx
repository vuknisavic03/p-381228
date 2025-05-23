
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Map, CheckCircle2, AlertTriangle, Key, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getGoogleMapsApiKey, isValidGoogleMapsApiKey } from "@/utils/googleMapsUtils";

interface GoogleMapsApiInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export function GoogleMapsApiInput({ onApiKeySubmit }: GoogleMapsApiInputProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCustomKeyInput, setShowCustomKeyInput] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleActivateMap = () => {
    setIsLoading(true);
    
    try {
      const keyToUse = showCustomKeyInput ? apiKey : getGoogleMapsApiKey();
      
      console.log("Activating map with key:", keyToUse ? "***provided***" : "none");
      
      if (isValidGoogleMapsApiKey(keyToUse)) {
        onApiKeySubmit(keyToUse);
        
        toast({
          title: "Map Activated",
          description: "Google Maps has been activated successfully."
        });
      } else {
        toast({
          title: "API Key Error",
          description: "Please enter a valid Google Maps API key.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error activating map:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const toggleCustomKeyInput = () => {
    setShowCustomKeyInput(!showCustomKeyInput);
    if (!showCustomKeyInput) {
      setApiKey("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-100">
      <CardHeader>
        <div className="flex justify-center mb-2">
          <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
            <Map className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-center">Google Maps Integration</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!showCustomKeyInput ? (
          <>
            <p className="text-sm text-gray-500 text-center">
              Click the button below to activate the map with our demo API key or use your own key.
            </p>
            
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-sm text-blue-600">
                We'll use a demo Google Maps API key with restrictions, or you can use your own.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center">
              <Button 
                variant="link" 
                onClick={toggleCustomKeyInput} 
                className="text-sm text-gray-600"
              >
                <Key className="h-3.5 w-3.5 mr-1" />
                Use my own API key
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="api-key">Google Maps API Key</Label>
              <Input
                id="api-key"
                placeholder="Enter your Google Maps API key"
                value={apiKey}
                onChange={handleKeyChange}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                This key must have the Maps JavaScript API and Places API enabled.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                variant="link" 
                onClick={toggleCustomKeyInput} 
                className="text-sm text-gray-600"
              >
                Use demo API key instead
              </Button>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center pb-6">
        <Button 
          onClick={handleActivateMap} 
          disabled={isLoading || (showCustomKeyInput && !isValidGoogleMapsApiKey(apiKey))}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <AlertTriangle className="h-4 w-4 animate-pulse" />
              Activating Map...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Activate Map
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
