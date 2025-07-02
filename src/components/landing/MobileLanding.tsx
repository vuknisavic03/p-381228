import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import images as modules
import dashboard from "/images/1.svg";
import listings from "/images/2.svg";
import transactions from "/images/3.svg";
import workspaces from "/images/4.svg";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="px-4 h-full flex items-center justify-between">
          <img 
            className="w-8 h-8" 
            src="https://placehold.co/32x32" 
            alt="Logo" 
          />
          
          <div className="flex items-center gap-2">
            <Link 
              to="/vision" 
              className="text-black text-sm font-semibold hover:text-gray-600"
            >
              Vision
            </Link>
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-gray-100 text-black font-bold hover:bg-gray-200 text-xs px-3"
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section className="pt-20 pb-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-stone-900 leading-tight mb-4">
            Break free from the old way
          </h1>
          <p className="text-lg font-medium text-stone-900 leading-relaxed mb-8">
            Personalized to your work and beautifully designed.
          </p>
          
          {/* Mobile Email Signup */}
          <div className="max-w-sm mx-auto">
            <div className="flex flex-col gap-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="border-gray-300 text-sm"
              />
              <Button className="bg-black text-white font-medium hover:bg-gray-800 w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Dashboard Preview */}
      <section className="py-8 px-4">
        <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-xl p-3 mx-auto max-w-sm">
          <img 
            className="w-full h-48 rounded-lg object-cover" 
            src={dashboard}
            alt="Dashboard preview" 
          />
        </div>
      </section>

      {/* Mobile Features */}
      <section className="py-8 px-4 space-y-12">
        {/* Listings */}
        <div className="text-center">
          <span className="inline-block bg-gray-100 rounded px-3 py-1 text-gray-500 text-sm font-medium mb-4">
            Listings
          </span>
          <h2 className="text-2xl font-bold text-stone-900 leading-tight mb-3">
            Map your listings with precision
          </h2>
          <p className="text-sm text-stone-700 mb-6 px-2">
            Visualize all your property or business listings on an interactive map.
          </p>
          <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-xl p-3 max-w-sm mx-auto">
            <img 
              className="w-full h-48 rounded-lg object-cover" 
              src={listings}
              alt="Listings map" 
            />
          </div>
        </div>

        {/* Transactions */}
        <div className="text-center">
          <span className="inline-block bg-gray-100 rounded px-3 py-1 text-gray-500 text-sm font-medium mb-4">
            Transactions
          </span>
          <h2 className="text-2xl font-bold text-stone-900 leading-tight mb-3">
            Track all transactions
          </h2>
          <p className="text-sm text-stone-700 mb-6 px-2">
            Get real-time visibility into all your transactions in one dashboard.
          </p>
          <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-xl p-3 max-w-sm mx-auto">
            <img 
              className="w-full h-48 rounded-lg object-cover" 
              src={transactions}
              alt="Transactions dashboard" 
            />
          </div>
        </div>

        {/* Workspaces */}
        <div className="text-center">
          <span className="inline-block bg-gray-100 rounded px-3 py-1 text-gray-500 text-sm font-medium mb-4">
            Workspaces
          </span>
          <h2 className="text-2xl font-bold text-stone-900 leading-tight mb-3">
            Built for teams
          </h2>
          <p className="text-sm text-stone-700 mb-6 px-2">
            Switch effortlessly between workspaces and see performance across them all.
          </p>
          <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-xl p-3 max-w-sm mx-auto">
            <img 
              className="w-full h-48 rounded-lg object-cover" 
              src={workspaces}
              alt="Workspaces interface" 
            />
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
      <section className="py-8 px-4 text-center">
        <h2 className="text-3xl font-bold text-stone-900 leading-tight mb-2">
          Built for you
        </h2>
        <p className="text-2xl font-bold text-gray-400 mb-8">
          Use for free
        </p>
        <Button className="bg-black text-white font-medium hover:bg-gray-800 w-full max-w-sm">
          Get Started Today
        </Button>
      </section>

      {/* Mobile Footer */}
      <footer className="border-t border-neutral-300 py-6 px-4">
        <div className="text-center space-y-3">
          <div className="text-zinc-900 text-sm font-medium">
            Privacy Policy
          </div>
          <div className="text-zinc-900 text-sm font-medium">
            © 2025 SquareLabs
          </div>
        </div>
      </footer>
    </div>
  );
}