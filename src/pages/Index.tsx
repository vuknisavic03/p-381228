
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, TrendingUp, Users } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">SquareLabs</span>
          </div>
          
          <nav className="flex items-center gap-8">
            <Link 
              to="/vision" 
              className="text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors duration-200 relative group"
            >
              Vision
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <button className="text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors duration-200">
              Log in
            </button>
            <Button 
              variant="outline" 
              className="bg-white border-gray-200 text-gray-900 font-medium hover:bg-gray-50 hover:border-gray-300 shadow-sm"
            >
              Sign up
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            Now in beta
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto tracking-tight">
            Break free from the{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              old way
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
            Personalized to your work and beautifully designed. A solution that makes your life simpler and more productive.
          </p>
          
          {/* Enhanced Email Signup */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 border-0 bg-transparent text-base placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-6"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 rounded-xl m-2 px-6 group">
                Start free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-3">No credit card required • Free 14-day trial</p>
          </div>
        </div>
      </section>

      {/* First Feature Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
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
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Listings Feature */}
            <div className="group">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <span className="inline-block bg-green-50 rounded-lg px-3 py-1 text-green-700 text-sm font-medium mb-4">
                    Listings
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    Map your listings with precision
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Visualize all your property or business listings on an interactive map. Manage availability, get insights, and plan with confidence.
                  </p>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                    <img 
                      className="w-full h-48 object-cover rounded-lg shadow-md" 
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop" 
                      alt="Listings map" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions Feature */}
            <div className="group">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="inline-block bg-blue-50 rounded-lg px-3 py-1 text-blue-700 text-sm font-medium mb-4">
                    Transactions
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    Track all transactions
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Get real-time visibility into all your transactions in one powerful dashboard. Analyze trends, identify gaps, and grow confidently.
                  </p>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                    <img 
                      className="w-full h-48 object-cover rounded-lg shadow-md" 
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop" 
                      alt="Transactions dashboard" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Workspaces Feature */}
            <div className="group">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="inline-block bg-purple-50 rounded-lg px-3 py-1 text-purple-700 text-sm font-medium mb-4">
                    Workspaces
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    Built for teams
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Switch effortlessly between workspaces. Keep data organized and see performance across them all with intuitive collaboration tools.
                  </p>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                    <img 
                      className="w-full h-48 object-cover rounded-lg shadow-md" 
                      src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop" 
                      alt="Workspaces interface" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 max-w-3xl mx-auto leading-tight">
            A solution that is{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              built for you
            </span>
          </h2>
          <p className="text-2xl text-gray-500 font-light mb-12">
            Use for free
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
            >
              Get started free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
            >
              Watch demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-900">SquareLabs</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-gray-600">
              <button className="hover:text-gray-900 transition-colors">Privacy Policy</button>
              <button className="hover:text-gray-900 transition-colors">Terms of Service</button>
              <span>© 2025 SquareLabs</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
