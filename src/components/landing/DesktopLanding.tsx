import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, ArrowUpRight, Check, X, BarChart3, Map, DollarSign, Users, Calendar, FileText, Zap, Shield, Star } from "lucide-react";
import UserTypeDialog from "./UserTypeDialog";

export default function DesktopLanding() {
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#accounting" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Accounting</a>
              <Link to="/vision" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Vision</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Log in</button>
            <Button 
              className="bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm px-6 py-2"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-32 bg-white pt-24">
        <div className="container mx-auto text-center max-w-4xl">
          <div className={`mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              ♥ by 3k+ property owners and accountants
            </span>
          </div>
          
          <h1 className={`text-6xl md:text-7xl font-light text-gray-900 leading-tight mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            Property Management<br />
            Has Evolved.<br />
            <span className="font-normal">Have You?</span>
          </h1>
          
          <p className={`text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Stop losing your mind to spreadsheets.<br />
            We'll do everything so you can run for President.
          </p>
          
          <div className={`flex justify-center mb-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <Button 
              className="bg-gray-900 text-white text-lg px-8 py-4 rounded-lg hover:bg-gray-800 transition-all hover:scale-105"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Start for free
            </Button>
          </div>

          {/* Feature Checklist */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">CSV auto imported with Internet Money, LLC</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">Real-time Receipt Matching</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">Never $1,000 invoice unmatched</span>
            </div>
          </div>
        </div>
      </section>

      {/* Automate Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Automate your business life</h2>
          <p className="text-lg text-gray-600 mb-16">SQUARE does internal your company as we do ours - 100% clean</p>
          
          {/* 3D Dashboard Preview */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto max-w-5xl animate-float">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
            
            {/* Dashboard Header */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Property Portfolio Dashboard</h3>
                    <p className="text-sm text-gray-500">Real-time overview</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Live</span>
                  <span className="text-gray-500 text-sm">Updated 2min ago</span>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8 space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl animate-glow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-blue-700 font-medium">Revenue</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">$84,200</div>
                  <div className="text-sm text-blue-600">+12% this month</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl animate-glow" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-green-700 font-medium">Properties</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">24</div>
                  <div className="text-sm text-green-600">95% occupied</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl animate-glow" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-purple-700 font-medium">Transactions</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">1,247</div>
                  <div className="text-sm text-purple-600">Auto-categorized</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl animate-glow" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-orange-700 font-medium">Tenants</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">89</div>
                  <div className="text-sm text-orange-600">Active leases</div>
                </div>
              </div>

              {/* Chart Visualization */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-gray-900">Revenue Trends</h4>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 rounded-lg flex items-end justify-between p-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-blue-500 rounded-t animate-pulse-3d" 
                      style={{ 
                        height: `${Math.random() * 80 + 20}%`, 
                        width: '6%',
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay in Control Section */}
      <section className="px-6 py-20 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Stay in control of your business</h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* All-in-One Property View */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">All-in-One Property View</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Visualize all your property portfolios with advanced mapping, detailed analytics, and instant access to property performance metrics.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-slide-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Map className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Interactive Property Map</div>
                      <div className="text-sm text-gray-500">24 properties • $2.4M portfolio value</div>
                    </div>
                    <div className="text-blue-600 font-semibold">View All</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Performance Analytics</div>
                      <div className="text-sm text-gray-500">Real-time ROI tracking</div>
                    </div>
                    <div className="text-green-600 font-semibold">+15.2%</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Market Insights</div>
                      <div className="text-sm text-gray-500">AI-powered predictions</div>
                    </div>
                    <div className="text-purple-600 font-semibold">Trending</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Track and Categorize Expenses */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Track and Categorize Expenses</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Automatically categorize transactions, track expenses by property, and generate detailed financial reports with AI-powered insights.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-slide-right">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Smart Categorization</div>
                      <div className="text-sm text-gray-500">1,247 transactions processed</div>
                    </div>
                    <div className="text-red-600 font-semibold">Auto</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Expense Tracking</div>
                      <div className="text-sm text-gray-500">By property & category</div>
                    </div>
                    <div className="text-orange-600 font-semibold">$47.2K</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Monthly Reports</div>
                      <div className="text-sm text-gray-500">Automated generation</div>
                    </div>
                    <div className="text-yellow-600 font-semibold">Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workspace Management Feature */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Platform - Infinite Workspaces</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Whether you manage one property or hundreds, workspaces help you stay organized and allow you to scale without missing a beat.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow animate-float" style={{ animationDelay: '2s' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="font-semibold text-blue-900">Personal Portfolio</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 mb-2">$125K</div>
                  <div className="text-sm text-blue-600">+8.2% growth</div>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-green-900">Downtown Commercial</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900 mb-2">$890K</div>
                  <div className="text-sm text-green-600">+12.4% growth</div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="font-semibold text-purple-900">Residential Mgmt</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900 mb-2">$445K</div>
                  <div className="text-sm text-purple-600">+6.7% growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-light text-gray-900 mb-8">Ready to evolve your property management?</h2>
          <p className="text-lg text-gray-600 mb-12">
            Join thousands of property owners who have transformed their business with Square
          </p>
          <Button 
            className="bg-gray-900 text-white text-lg px-12 py-4 rounded-lg hover:bg-gray-800 transition-all hover:scale-105"
            onClick={() => setShowUserTypeDialog(true)}
          >
            Start for free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-gray-900 font-medium">Square</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 Square. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <UserTypeDialog 
        open={showUserTypeDialog} 
        onOpenChange={setShowUserTypeDialog} 
      />
    </div>
  );
}