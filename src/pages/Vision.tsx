
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";

export default function Vision() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-medium text-gray-900">PropertyHub</span>
              </Link>
            </div>
            
            <div className="flex items-center">
              <Link to="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Empty Content Area (for future design) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <Eye className="h-10 w-10 text-gray-500" />
          </div>
          <h1 className="text-3xl font-semibold mb-4">Vision Coming Soon</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            We're Working on Something Special. Check back later for our vision of the future of property management.
          </p>
          <Link to="/">
            <Button>
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
