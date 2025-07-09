import React from "react";
import { Button } from "@/components/ui/button";
import { Monitor, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MobilePostRegistration() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here if needed
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Monitor className="w-8 h-8 text-primary" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome!
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Thank you for registering! Our platform is currently optimized for web browsers. 
            Please visit us on a desktop or laptop computer for the full experience.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Button 
            onClick={handleLogout}
            className="w-full"
            size="lg"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
          
          <p className="text-xs text-muted-foreground">
            We're working on mobile support and will notify you when it's available.
          </p>
        </div>
      </div>
    </div>
  );
}