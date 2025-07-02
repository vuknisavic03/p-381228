
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import images as modules
import dashboard from "/images/1.svg";
import listings from "/images/2.svg";
import transactions from "/images/3.svg";
import workspaces from "/images/4.svg";

export default function Index() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/70 backdrop-blur-[10px] border-b border-gray-200">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center">
            <img 
              className="w-10 h-10" 
              src="https://placehold.co/40x40" 
              alt="Logo" 
            />
          </div>
          
          <nav className="flex items-center gap-8">
            <Link 
              to="/vision" 
              className="text-black text-base font-semibold hover:text-gray-600 transition-colors"
            >
              Vision
            </Link>
            <button className="text-black text-base font-semibold hover:text-gray-600 transition-colors">
              Log in
            </button>
            <Button 
              variant="secondary" 
              className="bg-gray-100 text-black font-bold hover:bg-gray-200"
            >
              Sign up
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-stone-900 leading-[65px] mb-6 max-w-[809px] mx-auto">
            Break free from the old way
          </h1>
          <p className="text-2xl font-medium text-stone-900 leading-loose mb-12 max-w-[591px] mx-auto">
            Personalized to your work and beautifully designed. Solution that makes your life simpler.
          </p>
          
          {/* Email Signup */}
          <div className="max-w-96 mx-auto relative">
            <div className="flex bg-white rounded-2xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] shadow-[0px_0px_0px_1px_rgba(227,226,224,0.50)] overflow-hidden">
              <Input 
                type="email" 
                placeholder="Email" 
                className="flex-1 border-0 bg-transparent text-base font-medium placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="bg-black text-white font-medium hover:bg-gray-800 rounded-md m-2">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Feature Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="relative max-w-[1064px] mx-auto">
            <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-2xl outline outline-[0.20px] outline-gray-200 h-[613px] relative overflow-hidden">
              <div className="absolute inset-4 bg-gradient-to-br from-gray-400/10 to-gray-400/10 rounded-tl-2xl rounded-br-2xl blur-lg"></div>
              <img 
                className="absolute left-[35px] top-[34px] w-[1029px] h-[579px] rounded-tl-2xl rounded-br-2xl object-cover" 
                src={dashboard}
                alt="Dashboard preview" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-12">
            <span className="inline-block bg-gray-100 rounded px-4 py-2 text-gray-400 text-base font-medium mb-6">
              Listings
            </span>
            <h2 className="text-5xl font-bold text-stone-900 leading-[49px] mb-6 max-w-[809px]">
              Map your listings with precision
            </h2>
            <p className="text-base text-stone-700 leading-snug tracking-tight max-w-[703px]">
              Visualize all your property or business listings on an interactive map. Manage availability, get insights, and plan with confidence.
            </p>
          </div>
          
          <div className="relative max-w-[1064px] mx-auto">
            <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-2xl outline outline-[0.20px] outline-gray-200 h-[513px] relative overflow-hidden">
              <div className="absolute left-[14px] top-[10px] w-[1036px] h-[503px] bg-gradient-to-br from-gray-400/10 to-gray-400/10 rounded-tl-2xl rounded-tr-2xl blur-lg"></div>
              <img 
                className="absolute left-[21px] top-[21px] w-[1022px] h-[492px] rounded-tl-2xl rounded-tr-2xl object-cover" 
                src={listings}
                alt="Listings map" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transactions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-12">
            <span className="inline-block bg-gray-100 rounded px-4 py-2 text-gray-400 text-base font-medium mb-6">
              Transactions
            </span>
            <h2 className="text-5xl font-bold text-stone-900 leading-[49px] mb-6 max-w-[809px]">
              A place to get all transactions tracked
            </h2>
            <p className="text-base text-stone-700 leading-snug tracking-tight max-w-[703px]">
              Get real-time visibility into all your transactions in one powerful dashboard. Analyze trends, identify gaps, and grow confidently.
            </p>
          </div>
          
          <div className="relative max-w-[1064px] mx-auto">
            <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-2xl outline outline-[0.20px] outline-gray-200 h-[513px] relative overflow-hidden">
              <div className="absolute left-[14px] top-[10px] w-[1036px] h-[503px] bg-gradient-to-br from-gray-400/10 to-gray-400/10 rounded-tl-2xl rounded-tr-2xl blur-lg"></div>
              <img 
                className="absolute left-[21px] top-[21px] w-[1022px] h-[492px] rounded-tl-2xl rounded-tr-2xl object-cover" 
                src={transactions}
                alt="Transactions dashboard" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Workspaces Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-12">
            <span className="inline-block bg-gray-100 rounded px-4 py-2 text-gray-400 text-base font-medium mb-6">
              Workspaces
            </span>
            <h2 className="text-5xl font-bold text-stone-900 leading-[49px] mb-6 max-w-[993px]">
              Workspaces built for managers and individuals
            </h2>
            <p className="text-base text-stone-700 leading-snug tracking-tight max-w-[703px]">
              Switch effortlessly between workspaces. Keep data organized and see performance across them all.
            </p>
          </div>
          
          <div className="relative max-w-[1064px] mx-auto">
            <div className="bg-gradient-to-br from-neutral-50 to-slate-200 rounded-2xl outline outline-[0.20px] outline-gray-200 h-[513px] relative overflow-hidden">
              <div className="absolute left-[14px] top-[10px] w-[1036px] h-[503px] bg-gradient-to-br from-gray-400/10 to-gray-400/10 rounded-tl-2xl rounded-tr-2xl blur-lg"></div>
              <img 
                className="absolute left-[21px] top-[21px] w-[1022px] h-[492px] rounded-tl-2xl rounded-tr-2xl object-cover" 
                src={workspaces}
                alt="Workspaces interface" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-stone-900 leading-[49px] mb-4 max-w-[619px] mx-auto">
            Solution that is built for you
          </h2>
          <p className="text-5xl font-bold text-gray-400 leading-[49px] mb-16">
            Use for free
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-300 py-8 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-zinc-900 text-base font-medium">
            Privacy Policy
          </div>
          <div className="text-zinc-900 text-base font-medium">
            © 2025 SquareLabs
          </div>
        </div>
      </footer>
    </div>
  );
}
