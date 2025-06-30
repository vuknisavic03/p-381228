
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden">
      {/* Header */}
      <div className="w-full h-20 fixed top-2 left-0 z-50 bg-white/80 backdrop-blur-xl">
        <div className="w-full h-px absolute bottom-0 bg-gray-200"></div>
        <div className="flex items-center justify-between h-full px-12">
          <div className="flex items-center">
            <img className="w-10 h-10" src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=40&h=40&fit=crop&crop=center" alt="Logo" />
            <span className="ml-3 text-lg font-semibold text-gray-900">SquareLabs</span>
          </div>
          <div className="flex items-center gap-8">
            <Link 
              to="/vision" 
              className="text-black text-base font-semibold hover:text-gray-700 transition-colors"
            >
              Vision
            </Link>
            <button className="text-black text-base font-semibold hover:text-gray-700 transition-colors">
              Log in
            </button>
            <Button className="bg-gray-100 hover:bg-gray-200 text-black font-bold rounded-lg px-5 py-2">
              Sign up
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-48 pb-20 px-12 text-center">
        <h1 className="text-6xl font-bold text-stone-900 leading-tight mb-8 max-w-4xl mx-auto">
          Break free from the old way
        </h1>
        <p className="text-2xl font-medium text-stone-900 leading-loose mb-12 max-w-2xl mx-auto">
          Personalized to your work and beautifully designed. Solution that makes your life simpler.
        </p>
        
        {/* Email Signup */}
        <div className="max-w-sm mx-auto mb-8">
          <div className="flex bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Input 
              type="email" 
              placeholder="Email" 
              className="flex-1 border-0 bg-transparent text-base placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
            />
            <Button className="bg-black hover:bg-gray-800 text-white font-medium rounded-lg m-2 px-6 group">
              Sign up
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* First Feature Image */}
      <div className="px-8 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="absolute inset-4 bg-gradient-to-br from-gray-400/10 to-gray-400/10 rounded-2xl blur-lg"></div>
              <div className="relative p-8">
                <img 
                  className="w-full h-96 object-cover rounded-2xl shadow-lg" 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop" 
                  alt="Dashboard preview" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="px-8 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block bg-gray-100 rounded-lg px-4 py-2 text-gray-600 text-base font-medium mb-4">
              Listings
            </span>
            <h2 className="text-5xl font-bold text-stone-900 leading-tight mb-6">
              Map your listings with precision
            </h2>
            <p className="text-base text-stone-700 leading-relaxed max-w-3xl">
              Visualize all your property or business listings on an interactive map. Manage availability, get insights, and plan with confidence.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="absolute inset-4 bg-gradient-to-br from-gray-400/10 to-gray-400/10 rounded-2xl blur-lg"></div>
              <div className="relative p-8">
                <img 
                  className="w-full h-80 object-cover rounded-2xl shadow-lg" 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=500&fit=crop" 
                  alt="Listings map" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="px-8 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block bg-gray-100 rounded-lg px-4 py-2 text-gray-600 text-base font-medium mb-4">
              Transactions
            </span>
            <h2 className="text-5xl font-bold text-stone-900 leading-tight mb-6">
              A place to get all transactions tracked
            </h2>
            <p className="text-base text-stone-700 leading-relaxed max-w-3xl">
              Get real-time visibility into all your transactions in one powerful dashboard. Analyze trends, identify gaps, and grow confidently.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="absolute inset-4 bg-gradient-to-br from-gray-400/10 to-gray-400/10 rounded-2xl blur-lg"></div>
              <div className="relative p-8">
                <img 
                  className="w-full h-80 object-cover rounded-2xl shadow-lg" 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=500&fit=crop" 
                  alt="Transactions dashboard" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workspaces Section */}
      <div className="px-8 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block bg-gray-100 rounded-lg px-4 py-2 text-gray-600 text-base font-medium mb-4">
              Workspaces
            </span>
            <h2 className="text-5xl font-bold text-stone-900 leading-tight mb-6">
              Workspaces built for managers and individuals
            </h2>
            <p className="text-base text-stone-700 leading-relaxed max-w-3xl">
              Switch effortlessly between workspaces. Keep data organized and see performance across them all.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="absolute inset-4 bg-gradient-to-br from-gray-400/10 to-gray-400/10 rounded-2xl blur-lg"></div>
              <div className="relative p-8">
                <img 
                  className="w-full h-80 object-cover rounded-2xl shadow-lg" 
                  src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1200&h=500&fit=crop" 
                  alt="Workspaces interface" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="px-8 py-24 text-center">
        <h2 className="text-5xl font-bold text-stone-900 leading-tight mb-4 max-w-3xl mx-auto">
          Solution that is built for you
        </h2>
        <p className="text-5xl font-bold text-gray-400 leading-tight mb-16">
          Use for free
        </p>
        
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-black hover:bg-gray-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group px-8"
          >
            Get started free
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-12 border-t border-neutral-300">
        <div className="flex items-center justify-between">
          <div className="text-zinc-900 text-base font-medium">
            Privacy Policy
          </div>
          <div className="text-zinc-900 text-base font-medium">
            © 2025 SquareLabs
          </div>
        </div>
      </div>
    </div>
  );
}
