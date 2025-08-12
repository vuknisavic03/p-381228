import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserTypeDialog from "./UserTypeDialog";

export default function DesktopLanding() {
  const [email, setEmail] = useState("");
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-2 min-h-screen">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center px-16 py-12">
          <div className="max-w-lg">
            {/* Hero Content */}
            <h1 className="text-5xl font-bold text-black mb-8 leading-tight">
              Ship experiences<br />
              faster, together
            </h1>
            
            {/* Preview Image */}
            <div className="mb-8">
              <img 
                src="/images/1.svg" 
                alt="Product preview" 
                className="w-full max-w-md rounded-lg shadow-sm"
              />
            </div>
            
            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <span className="text-gray-700 text-sm">Generate code for 10+ frameworks</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <span className="text-gray-700 text-sm">Connect your component and tokens</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <span className="text-gray-700 text-sm">Make designs interactive with AI</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <span className="text-gray-700 text-sm">APIs to publish to your live site or app</span>
              </div>
            </div>
            
            {/* Learn More Link */}
            <div>
              <span className="text-gray-600 text-sm">New to Builder? </span>
              <a href="#" className="text-orange-500 text-sm font-medium hover:underline">
                Learn more
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Column - Account Creation */}
        <div className="flex flex-col justify-center px-16 py-12 bg-gray-50">
          <div className="max-w-md">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
              </div>
            </div>
            
            {/* Form Header */}
            <h2 className="text-3xl font-bold text-black mb-2">Create an account</h2>
            <p className="text-gray-600 mb-6">
              Already have an account? 
              <a href="#" className="text-orange-500 font-medium ml-1 hover:underline">Log in</a>
            </p>
            
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button 
                variant="outline" 
                className="w-full py-3 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue With Google
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full py-3 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3 bg-gray-800 text-white hover:bg-gray-700"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue With GitHub
              </Button>
            </div>
            
            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">Or, sign up with your email</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            
            {/* Email Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work email *
                </label>
                <Input
                  type="email"
                  placeholder="stephanie@mycompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Terms */}
            <p className="text-xs text-gray-500 mb-6">
              By creating an account, I agree to Builder's{" "}
              <a href="#" className="text-blue-500 hover:underline">terms of service</a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">privacy policy</a>
            </p>
            
            {/* Submit Button */}
            <Button 
              className="w-full py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors cursor-not-allowed"
              disabled
              onClick={() => setShowUserTypeDialog(true)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      <UserTypeDialog 
        open={showUserTypeDialog} 
        onOpenChange={setShowUserTypeDialog} 
      />
    </div>
  );
}