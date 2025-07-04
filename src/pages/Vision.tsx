import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Vision() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-4 border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-black text-sm font-medium">Accounting</Link>
              <Link to="/vision" className="text-black text-sm font-medium bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 transition-colors">Vision</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 text-sm">Log in</button>
            <Button className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800">
              Get Square free
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vision</h1>
          <p className="text-lg text-gray-600">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}