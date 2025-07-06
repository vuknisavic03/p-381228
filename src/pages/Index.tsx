
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopLanding from "@/components/landing/DesktopLanding";
import MobileLanding from "@/components/landing/MobileLanding";

export default function Index() {
  const isMobile = useIsMobile();
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    // Small delay to ensure mobile detection is complete
    const timer = setTimeout(() => setIsInitialized(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
      </div>
    );
  }

  return isMobile ? <MobileLanding /> : <DesktopLanding />;
}
