import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Building2, TrendingUp, Target } from "lucide-react";
import UserTypeDialog from "./UserTypeDialog";
import dashboardHero from "@/assets/dashboard-hero.jpg";
import propertiesShowcase from "@/assets/properties-showcase.jpg";
import transactionsFlow from "@/assets/transactions-flow.jpg";
import workspacesManagement from "@/assets/workspaces-management.jpg";

export default function MobileLanding() {
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="px-4 py-3 border-b border-gray-100 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <Link to="/" className="w-7 h-7 bg-black rounded flex items-center justify-center hover:bg-gray-800 transition-colors">
              <span className="text-white font-bold text-sm">S</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/vision" className="text-blue-600 text-sm font-medium bg-blue-100 px-3 py-1.5 rounded hover:bg-blue-200 transition-colors">Vision</Link>
            </nav>
          </div>
          
          <Button 
            className="bg-black text-white text-sm px-3 py-1.5 rounded hover:bg-gray-800 transition-colors"
            onClick={() => setShowUserTypeDialog(true)}
          >
            Get Square free
          </Button>
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section className="px-4 py-12">
        <div className="text-center">
          
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <Building2 className="w-12 h-12 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-black leading-tight mb-4">
            Property Management Has Evolved. Have You?
          </h1>
          
          <p className="text-sm text-gray-600 mb-8 leading-relaxed px-4 max-w-md mx-auto">
            Old tools can't manage a modern portfolio.<br />
            Goodbye spreadsheets. Hello automation.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button 
              className="bg-black text-white text-base px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Get Square free
            </Button>
          </div>
          
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-gray-700" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-900 text-left">Live Dashboard</div>
                      <div className="text-xs text-gray-600 text-left">Real-time insights • Automated tracking</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">Live</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={dashboardHero} 
                  alt="Property Management Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
              </div>
            </div>
        </div>
      </section>

      {/* Property Organization Feature */}
      <section className="px-4 pb-14">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Listings
          </div>
          <h2 className="text-xl font-bold text-black mb-2">All Your Properties. One Interactive View.</h2>
          <p className="text-sm text-gray-600">
            Visualize all your property or business listings in one searchable map. Track occupancy, update availability, and plan with confidence.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-2 text-xs mb-3">
              <div className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium">All Properties</div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Map View</div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Filters</div>
            </div>
            <div className="text-xs text-gray-600">Interactive property management with map view</div>
          </div>
          <div className="relative">
            <img 
              src={propertiesShowcase} 
              alt="Property Listings with Map View"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Transaction Filtering Feature */}
      <section className="px-4 pb-14">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Transactions
          </div>
          <h2 className="text-xl font-bold text-black mb-2">Your Property Cash Flow. Tracked and Categorized.</h2>
          <p className="text-sm text-gray-600">
            View all income and expenses in one place. Take advantage of real-time updates with trend analysis and growth forecasts.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-2 text-xs mb-3">
              <div className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                All Properties
              </div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Auto-categorized</div>
            </div>
            <div className="text-xs text-gray-600">Automated transaction categorization and tracking</div>
          </div>
          <div className="relative">
            <img 
              src={transactionsFlow} 
              alt="Transaction Management Interface"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Workspace Manager Feature */}
      <section className="px-4 pb-14">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Workspaces
          </div>
          <h2 className="text-xl font-bold text-black mb-2">One Platform. Infinite Workspaces.</h2>
          <p className="text-sm text-gray-600">
            Whether you manage one property or hundreds, workspaces help you stay organized and allow you to scale.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-2 text-xs mb-3">
              <div className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                Personal Portfolio
              </div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Company</div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Switch</div>
            </div>
            <div className="text-xs text-gray-600">Multiple workspace management with unified analytics</div>
          </div>
          <div className="relative">
            <img 
              src={workspacesManagement} 
              alt="Workspace Management Interface"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Mobile Testimonials Section */}
      <section className="px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">What people are saying</h2>
          <p className="text-sm text-gray-500">Swipe to see more reviews</p>
        </div>
        
        <div className="relative">
          <div 
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {[
              {
                quote: "Square Accounting is finally bringing innovation to something that stayed stagnant for decades.",
                author: "Sarah Chen",
                handle: "@sarahchen"
              },
              {
                quote: "Square let me create a system so customized to the way I work, my properties, and my financial goals that there's no way I could go back.",
                author: "Marcus Johnson",
                handle: "@marcusjohnson"
              },
              {
                quote: "OK: Square Accounting is pretty sick.",
                author: "Alex Rivera",
                handle: "@alexrivera"
              },
              {
                quote: "The automated categorization saves me hours every week. Game changer for property managers.",
                author: "David Park",
                handle: "@davidpark"
              },
              {
                quote: "Finally, an accounting tool that actually understands real estate workflows.",
                author: "Lisa Zhang",
                handle: "@lisazhang"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm min-w-[290px] max-w-[290px] flex-shrink-0 snap-start">
                <blockquote className="text-gray-900 mb-4 text-base leading-relaxed font-medium">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-100 pt-3">
                  <div className="font-semibold text-gray-900 text-sm">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Footer */}
      <footer className="px-4 py-8">
        <div className="text-center">
          <div className="text-gray-500 text-sm">
            © 2025 SquareLabs
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