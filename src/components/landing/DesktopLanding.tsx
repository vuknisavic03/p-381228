import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Check, BarChart3, FileText, Map, DollarSign, Users } from "lucide-react";
import UserTypeDialog from "./UserTypeDialog";

export default function DesktopLanding() {
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#accounting" className="text-gray-600 hover:text-black transition-colors text-sm">Accounting</a>
              <Link to="/vision" className="text-gray-600 hover:text-black transition-colors text-sm">Vision</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-black transition-colors text-sm">Log in</button>
            <Button 
              className="bg-black text-white hover:bg-gray-800 transition-colors text-sm px-4 py-2"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-24">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="mb-8">
            <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              ♥ by 3k+ property owners and accountants
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-light text-black leading-tight mb-8">
            Property Management<br />
            Has Evolved.<br />
            <span className="text-gray-600">Have You?</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">
            Stop losing your mind to spreadsheets.<br />
            We'll do everything so you can run for President.
          </p>
          
          <Button 
            className="bg-black text-white text-base px-8 py-3 rounded-md hover:bg-gray-800 transition-colors mb-16"
            onClick={() => setShowUserTypeDialog(true)}
          >
            Sign up
          </Button>

          {/* Feature Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">CSV auto imported with Internet Money, LLC</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Real-time Receipt Matching</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Never $1,000 invoice unmatched</span>
            </div>
          </div>
        </div>
      </section>

      {/* Automate Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-light text-black mb-4">Automate your business life</h2>
          <p className="text-gray-600 mb-16">SQUARE does internal your company as we do ours - 100% clean</p>
          
          {/* Dashboard Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900 font-medium">Live Dashboard</span>
                </div>
                <span className="text-xs text-gray-500 bg-green-50 text-green-700 px-2 py-1 rounded">Live</span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-black mb-1">$84.2K</div>
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-black mb-1">24</div>
                  <div className="text-sm text-gray-500">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-black mb-1">1,247</div>
                  <div className="text-sm text-gray-500">Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-black mb-1">89</div>
                  <div className="text-sm text-gray-500">Active Tenants</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay in Control Section */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-black mb-4">Stay in control of your business</h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Property Overview */}
            <div>
              <h3 className="text-xl font-medium text-black mb-4">All-in-One Property View</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Visualize all your property portfolios with advanced mapping, detailed analytics, and instant access to property performance metrics.
              </p>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-center h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-md mb-4">
                  <Map className="w-12 h-12 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900 mb-1">Interactive Property Map</div>
                  <div className="text-sm text-gray-500">24 properties • $2.4M portfolio</div>
                </div>
              </div>
            </div>

            {/* Expense Tracking */}
            <div>
              <h3 className="text-xl font-medium text-black mb-4">Track and Categorize Expenses</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Automatically categorize transactions, track expenses by property, and generate detailed financial reports with AI-powered insights.
              </p>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-center h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-md mb-4">
                  <BarChart3 className="w-12 h-12 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900 mb-1">Smart Expense Analytics</div>
                  <div className="text-sm text-gray-500">1,247 transactions auto-categorized</div>
                </div>
              </div>
            </div>
          </div>

          {/* Workspace Management */}
          <div className="text-center mb-12">
            <h3 className="text-xl font-medium text-black mb-4">Our Platform - Infinite Workspaces</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you manage one property or hundreds, workspaces help you stay organized and allow you to scale without missing a beat.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="flex items-center justify-center h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md mb-6">
              <div className="text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-600">Workspace Management Dashboard</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-md">
                <div className="text-lg font-semibold text-blue-900">Personal Portfolio</div>
                <div className="text-sm text-blue-600">$125K revenue</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-md">
                <div className="text-lg font-semibold text-green-900">Downtown Commercial</div>
                <div className="text-sm text-green-600">$890K revenue</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-md">
                <div className="text-lg font-semibold text-purple-900">Residential Mgmt</div>
                <div className="text-sm text-purple-600">$445K revenue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
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