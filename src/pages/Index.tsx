
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopLanding from "@/components/landing/DesktopLanding";
import MobileLanding from "@/components/landing/MobileLanding";

export default function Index() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileLanding /> : <DesktopLanding />;
}
