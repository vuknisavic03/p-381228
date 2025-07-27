import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, FileText, TrendingUp, Users, Calendar, Building2, CreditCard, Receipt, PieChart, Target } from "lucide-react";
import InteractiveCategorizationDemo from "./InteractiveCategorizationDemo";
import UserTypeDialog from "./UserTypeDialog";
import dashboardHero from "@/assets/dashboard-hero.jpg";
import propertiesShowcase from "@/assets/properties-showcase.jpg";
import transactionsFlow from "@/assets/transactions-flow.jpg";
import workspacesManagement from "@/assets/workspaces-management.jpg";

export default function DesktopLanding() {
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-4 border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-gray-600 text-sm">Accounting</Link>
              <Link to="/vision" className="text-blue-600 text-sm font-medium">Vision</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 text-sm">Log in</button>
            <Button 
              className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Get Square free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto text-center">
          <div className="mb-12 flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center">
              <Building2 className="w-16 h-16 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-8 max-w-4xl mx-auto">
            Property Management Has Evolved. Have You?
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Old tools can't manage a modern portfolio.<br />
            Goodbye spreadsheets. Hello automation.
          </p>
          
          <div className="flex justify-center mb-16">
            <Button 
              className="bg-black text-white text-lg px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Get Square free
            </Button>
          </div>
          
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div className="text-left">
                  <div className="text-gray-900 font-semibold text-left">Live Dashboard</div>
                  <div className="text-gray-600 text-sm text-left">Real-time insights • Categorized transactions • Performance tracking</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 text-sm font-medium">Live Updates</span>
              </div>
            </div>
            <div className="relative">
              <img 
                src={dashboardHero} 
                alt="Property Management Dashboard Interface"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Organization Feature */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Listings
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">All Your Properties. One Interactive View.</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Visualize all your property or business listings in one searchable map. Track occupancy, update availability, and plan with confidence.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-wrap gap-3 mb-4">
                {['All Properties', 'Apartments', 'Office', 'Retail', 'Mixed Use'].map((view, index) => (
                  <div key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${
                    index === 0 ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {view}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">Interactive property management with map view and advanced filtering</div>
            </div>
            <div className="relative">
              <img 
                src={propertiesShowcase} 
                alt="Property Listings Interface with Map View"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Filtering Feature */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Transactions
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">Your Property Cash Flow. Tracked and Categorized.</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              View all income and expenses in one place. Take advantage of real-time updates with trend analysis and growth forecasts.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex gap-3 mb-4">
                <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  All Properties
                </div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">Income & Expenses</div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">Auto-Categorized</div>
              </div>
              <div className="text-sm text-gray-600">Automated transaction categorization with real-time cash flow tracking</div>
            </div>
            <div className="relative">
              <img 
                src={transactionsFlow} 
                alt="Transaction Management Interface with Categorization"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Manager Feature */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Workspaces
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">One Platform. Infinite Workspaces.</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Whether you manage one property or hundreds, workspaces help you stay organized and allow you to scale.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex gap-3 mb-4">
                <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Personal Portfolio
                </div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">Company Assets</div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">Client Projects</div>
              </div>
              <div className="text-sm text-gray-600">Manage multiple property portfolios with unified analytics and workspace switching</div>
            </div>
            <div className="relative">
              <img 
                src={workspacesManagement} 
                alt="Workspace Management Interface with Multiple Portfolios"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">What people are saying</h2>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll">
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
                  quote: "They really cooked with Square. Especially the AI auto-categorization. Maybe organized books can finally be achieved.",
                  author: "David Kim",
                  handle: "@davidkimdata"
                },
                {
                  quote: "Using @Square is like building filtered views for your finances, but the properties are elements from your transactions. So excited to set this up.",
                  author: "Emily Watson",
                  handle: "@emilywatson"
                },
                {
                  quote: "Square Accounting is finally bringing innovation to property management accounting.",
                  author: "Robert Taylor",
                  handle: "@roberttaylor"
                },
                // Duplicate for seamless loop
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
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 min-w-[350px] flex-shrink-0">
                  <blockquote className="text-gray-900 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-500 text-sm">{testimonial.handle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8">
        <div className="container mx-auto text-center">
          <div className="text-gray-600 text-sm">
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