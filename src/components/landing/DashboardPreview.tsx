import React from "react";

export default function DashboardPreview({ className }: { className?: string }) {
  return (
    <svg 
      width="1029" 
      height="579" 
      viewBox="0 0 1029 579" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect x="0" y="0" width="1029" height="579" rx="15" fill="#f8fafc"/>
      
      {/* Header */}
      <rect x="0" y="0" width="1029" height="60" rx="15" fill="#1f2937"/>
      <circle cx="30" cy="30" r="8" fill="#10b981"/>
      <rect x="50" y="20" width="80" height="20" rx="4" fill="#374151"/>
      <rect x="950" y="20" width="60" height="20" rx="4" fill="#374151"/>
      
      {/* Main Content Area */}
      <rect x="30" y="90" width="969" height="459" rx="8" fill="white"/>
      
      {/* Analytics Cards */}
      <rect x="60" y="120" width="280" height="120" rx="8" fill="#f3f4f6"/>
      <rect x="80" y="140" width="60" height="8" rx="4" fill="#6b7280"/>
      <rect x="80" y="160" width="120" height="16" rx="4" fill="#111827"/>
      <rect x="80" y="185" width="80" height="8" rx="4" fill="#10b981"/>
      
      <rect x="370" y="120" width="280" height="120" rx="8" fill="#f3f4f6"/>
      <rect x="390" y="140" width="80" height="8" rx="4" fill="#6b7280"/>
      <rect x="390" y="160" width="140" height="16" rx="4" fill="#111827"/>
      <rect x="390" y="185" width="60" height="8" rx="4" fill="#3b82f6"/>
      
      <rect x="680" y="120" width="280" height="120" rx="8" fill="#f3f4f6"/>
      <rect x="700" y="140" width="70" height="8" rx="4" fill="#6b7280"/>
      <rect x="700" y="160" width="100" height="16" rx="4" fill="#111827"/>
      <rect x="700" y="185" width="90" height="8" rx="4" fill="#8b5cf6"/>
      
      {/* Chart Area */}
      <rect x="60" y="270" width="600" height="250" rx="8" fill="#f9fafb"/>
      <rect x="80" y="290" width="40" height="8" rx="4" fill="#6b7280"/>
      
      {/* Mock Chart Bars */}
      <rect x="100" y="450" width="40" height="50" rx="4" fill="#3b82f6"/>
      <rect x="160" y="420" width="40" height="80" rx="4" fill="#10b981"/>
      <rect x="220" y="440" width="40" height="60" rx="4" fill="#f59e0b"/>
      <rect x="280" y="400" width="40" height="100" rx="4" fill="#ef4444"/>
      <rect x="340" y="430" width="40" height="70" rx="4" fill="#8b5cf6"/>
      <rect x="400" y="410" width="40" height="90" rx="4" fill="#06b6d4"/>
      <rect x="460" y="450" width="40" height="50" rx="4" fill="#84cc16"/>
      <rect x="520" y="420" width="40" height="80" rx="4" fill="#f97316"/>
      
      {/* Sidebar */}
      <rect x="690" y="270" width="270" height="250" rx="8" fill="#f9fafb"/>
      <rect x="710" y="290" width="60" height="8" rx="4" fill="#6b7280"/>
      
      {/* Sidebar Items */}
      <rect x="710" y="320" width="230" height="30" rx="4" fill="white"/>
      <circle cx="725" cy="335" r="6" fill="#10b981"/>
      <rect x="740" y="330" width="120" height="8" rx="4" fill="#111827"/>
      <rect x="870" y="330" width="40" height="8" rx="4" fill="#10b981"/>
      
      <rect x="710" y="360" width="230" height="30" rx="4" fill="white"/>
      <circle cx="725" cy="375" r="6" fill="#3b82f6"/>
      <rect x="740" y="370" width="100" height="8" rx="4" fill="#111827"/>
      <rect x="870" y="370" width="50" height="8" rx="4" fill="#3b82f6"/>
      
      <rect x="710" y="400" width="230" height="30" rx="4" fill="white"/>
      <circle cx="725" cy="415" r="6" fill="#8b5cf6"/>
      <rect x="740" y="410" width="110" height="8" rx="4" fill="#111827"/>
      <rect x="870" y="410" width="35" height="8" rx="4" fill="#8b5cf6"/>
    </svg>
  );
}