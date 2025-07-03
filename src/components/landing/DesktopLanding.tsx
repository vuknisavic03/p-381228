import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Search, Inbox, Calendar, Tag, BarChart3, Users, TrendingUp, Settings } from "lucide-react";

export default function DesktopLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <nav className="flex items-center gap-6">
              <span className="text-gray-600 text-sm">Square</span>
              <span className="text-black text-sm font-medium bg-blue-100 px-2 py-1 rounded">Analytics</span>
              <span className="text-gray-600 text-sm">Dashboard</span>
              <span className="text-gray-600 text-sm">AI</span>
              <span className="text-gray-600 text-sm">Enterprise</span>
              <span className="text-gray-600 text-sm">Pricing</span>
              <span className="text-gray-600 text-sm">Explore</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 text-sm">Log in</button>
            <Button className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800">
              Get Square free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto text-center">
          {/* Analytics icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-black leading-tight mb-6 max-w-4xl mx-auto">
            The dashboard that thinks like you
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Meet Square Analytics, the dashboard that organizes itself, tracks metrics, and generates insights any way you'd like.
          </p>
          
          <Button className="bg-black text-white text-base px-6 py-3 rounded-md hover:bg-gray-800 mb-16">
            Get Square free
          </Button>
        </div>
      </section>

      {/* Dashboard Interface Mockup */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {/* Top bar */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">S</span>
                </div>
                <span className="text-sm font-medium">Square Analytics</span>
              </div>
              <div className="flex items-center gap-4">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Search</span>
              </div>
            </div>

            <div className="flex min-h-[500px]">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900 mb-3">Views</div>
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-blue-50 text-blue-600 rounded text-sm">
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-purple-100 rounded-sm"></div>
                    <span>Sales</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-pink-100 rounded-sm"></div>
                    <span>Marketing</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-green-100 rounded-sm"></div>
                    <span>Operations</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-orange-100 rounded-sm"></div>
                    <span>Finance</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-900 mb-3">Reports</div>
                  <div className="space-y-1">
                    <div className="px-2 py-1.5 text-gray-600 text-sm">All reports</div>
                    <div className="px-2 py-1.5 text-gray-600 text-sm">Scheduled</div>
                    <div className="px-2 py-1.5 text-gray-600 text-sm">Archived</div>
                  </div>
                </div>
              </div>

              {/* Metrics List */}
              <div className="flex-1">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Auto Filter</span>
                  </div>
                </div>

                {/* Metric Items */}
                <div className="divide-y divide-gray-100">
                  {[
                    { metric: "Revenue Growth", value: "+23.5%", tag: "Sales", color: "purple" },
                    { metric: "Customer Acquisition", value: "+156 users", tag: "Marketing", color: "pink" },
                    { metric: "Conversion Rate", value: "3.2%", tag: "Sales", color: "purple" },
                    { metric: "Churn Rate", value: "-2.1%", tag: "Marketing", color: "pink" },
                    { metric: "Monthly Recurring Revenue", value: "$45,230", tag: "Sales", color: "purple" },
                    { metric: "Customer Lifetime Value", value: "$2,840", tag: "Sales", color: "purple" },
                    { metric: "Cost Per Acquisition", value: "$125", tag: "Marketing", color: "pink" },
                    { metric: "Server Uptime", value: "99.8%", tag: "Operations", color: "green" },
                    { metric: "Support Tickets", value: "23 open", tag: "", color: "" },
                    { metric: "Monthly Active Users", value: "12,450", tag: "Product", color: "blue" },
                  ].map((metric, index) => (
                    <div key={index} className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-900 min-w-0 flex-shrink-0">{metric.metric}</span>
                          <span className="text-sm text-gray-600 truncate">{metric.value}</span>
                        </div>
                      </div>
                      {metric.tag && (
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          metric.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                          metric.color === 'pink' ? 'bg-pink-100 text-pink-700' :
                          metric.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                          metric.color === 'green' ? 'bg-green-100 text-green-700' : ''
                        }`}>
                          {metric.tag}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Square Analytics is finally bringing innovation to something that stayed stagnant for decades.",
                author: "Sarah Chen",
                handle: "@sarahchen"
              },
              {
                quote: "Square let me create a system so customized to the way I work, my metrics, and my business goals that there's no way I could go back.",
                author: "Marcus Johnson",
                handle: "@marcusjohnson"
              },
              {
                quote: "OK: Square Analytics is pretty sick.",
                author: "Alex Rivera",
                handle: "@alexrivera"
              },
              {
                quote: "They really cooked with Square. Especially the AI auto-insights. Maybe data-driven decisions can finally be achieved.",
                author: "David Kim",
                handle: "@davidkimdata"
              },
              {
                quote: "Using @Square is like building filtered views for your business, but the properties are elements from your metrics. So excited to set this up.",
                author: "Emily Watson",
                handle: "@emilywatson"
              },
              {
                quote: "Square Analytics is finally bringing innovation to something that stayed stagnant for decades.",
                author: "Sarah Chen",
                handle: "@sarahchen"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
      </section>

      {/* Footer */}
      <footer className="px-4 py-8">
        <div className="container mx-auto text-center">
          <div className="text-gray-600 text-sm">
            © 2025 SquareLabs
          </div>
        </div>
      </footer>
    </div>
  );
}