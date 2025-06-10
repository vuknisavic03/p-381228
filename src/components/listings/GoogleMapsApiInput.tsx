
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Map, CheckCircle2, AlertTriangle, Key, Info, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getGoogleMapsApiKey, isValidGoogleMapsApiKey } from "@/utils/googleMapsUtils";

interface GoogleMapsApiInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export function GoogleMapsApiInput({ onApiKeySubmit }: GoogleMapsApiInputProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCustomKeyInput, setShowCustomKeyInput] = useState<boolean>(false);
  const [showSetupInstructions, setShowSetupInstructions] = useState<boolean>(false);
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

  const toggleSetupInstructions = () => {
    setShowSetupInstructions(!showSetupInstructions);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border border-gray-100">
      <CardHeader>
        <div className="flex justify-center mb-2">
          <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
            <Map className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-center">Google Maps Integration</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Alert className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-sm text-red-600">
            <strong>API Not Activated Error:</strong> The Google Maps JavaScript API and Places API need to be enabled for your API key.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <Button 
            variant="outline" 
            onClick={toggleSetupInstructions}
            className="w-full text-left justify-between"
          >
            {showSetupInstructions ? 'Hide' : 'Show'} Setup Instructions
            <ExternalLink className="h-4 w-4" />
          </Button>

          {showSetupInstructions && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-3">
              <h4 className="font-medium text-blue-900">Required Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>
                  Go to the{' '}
                  <a 
                    href="https://console.cloud.google.com/apis/library" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600"
                  >
                    Google Cloud Console API Library
                  </a>
                </li>
                <li>
                  Enable the{' '}
                  <a 
                    href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600"
                  >
                    Maps JavaScript API
                  </a>
                </li>
                <li>
                  Enable the{' '}
                  <a 
                    href="https://console.cloud.google.com/apis/library/places-backend.googleapis.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600"
                  >
                    Places API
                  </a>
                </li>
                <li>
                  Get your API key from{' '}
                  <a 
                    href="https://console.cloud.google.com/apis/credentials" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600"
                  >
                    Google Cloud Credentials
                  </a>
                </li>
                <li>Configure API key restrictions (recommended for security)</li>
              </ol>
            </div>
          )}
        </div>

        {!showCustomKeyInput ? (
          <>
            <p className="text-sm text-gray-500 text-center">
              Click the button below to try activating the map with our demo API key, or use your own properly configured key.
            </p>
            
            <Alert className="bg-amber-50 border-amber-200">
              <Info className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-sm text-amber-600">
                <strong>Note:</strong> Our demo API key has restrictions and may not work. For production use, please set up your own API key with the required APIs enabled.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center">
              <Button 
                variant="link" 
                onClick={toggleCustomKeyInput} 
                className="text-sm text-gray-600"
              >
                <Key className="h-3.5 w-3.5 mr-1" />
                Use my own API key instead
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="api-key">Google Maps API Key</Label>
              <Input
                id="api-key"
                placeholder="Enter your Google Maps API key (e.g., AIzaSy...)"
                value={apiKey}
                onChange={handleKeyChange}
                className="w-full"
              />
              <div className="text-xs text-gray-500 space-y-1">
                <p>• This key must have <strong>Maps JavaScript API</strong> and <strong>Places API</strong> enabled</p>
                <p>• Make sure to configure proper API restrictions for security</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                variant="link" 
                onClick={toggleCustomKeyInput} 
                className="text-sm text-gray-600"
              >
                Try demo API key instead
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
