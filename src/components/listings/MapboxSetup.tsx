
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getMapboxToken, setMapboxToken, isTokenValid } from "@/config/mapbox";
import { AlertCircle } from "lucide-react";

interface MapboxSetupProps {
  onTokenSet: () => void;
}

export function MapboxSetup({ onTokenSet }: MapboxSetupProps) {
  const [token, setToken] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSaveToken = () => {
    if (!isTokenValid(token)) {
      toast({
        title: "Invalid Token",
        description: "Please enter a valid Mapbox public token. It should start with 'pk.'",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Store token and notify user
    setMapboxToken(token);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Token Saved",
        description: "Your Mapbox token has been saved. You can now use the map!",
      });
      onTokenSet();
    }, 500);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-sm border">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium">Mapbox Setup</h3>
          <p className="text-sm text-muted-foreground">
            To use the map feature, you need to provide a Mapbox public token.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="token" className="text-sm font-medium">
              Mapbox Public Token
            </label>
            <div className="mt-1">
              <Input
                id="token"
                placeholder="Enter your Mapbox public token (starts with pk.)"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            className="w-full"
            onClick={handleSaveToken}
            disabled={!token || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Token"}
          </Button>
        </div>
        
        <div className="flex items-start gap-2 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p>You can get a Mapbox token by signing up at <a href="https://mapbox.com" className="underline" target="_blank" rel="noreferrer">mapbox.com</a> and navigating to the Access Tokens section.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
