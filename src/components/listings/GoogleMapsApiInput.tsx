
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Map, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getGoogleMapsApiKey, isValidGoogleMapsApiKey } from "@/utils/googleMapsUtils";

// Define our props interface
interface GoogleMapsApiInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  isLoading: boolean;
}

export function GoogleMapsApiInput({ onApiKeySubmit, isLoading }: GoogleMapsApiInputProps) {
  const { toast } = useToast();
  
  const handleActivateMap = () => {
    try {
      const apiKey = getGoogleMapsApiKey();
      
      if (isValidGoogleMapsApiKey(apiKey)) {
        // Submit the API key to the parent component
        onApiKeySubmit(apiKey);
        
        toast({
          title: "Map Activation",
          description: "Activating Google Maps..."
        });
      } else {
        toast({
          title: "API Key Error",
          description: "Unable to activate Google Maps. Please check your API key.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-100">
      <CardContent className="pt-6">
        <div className="text-center space-y-3">
          <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <Map className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-medium text-lg">Google Maps Integration</h3>
          <p className="text-sm text-gray-500 mb-4">
            Click the button below to activate the map and view your property listings.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button 
          onClick={handleActivateMap} 
          disabled={isLoading}
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
