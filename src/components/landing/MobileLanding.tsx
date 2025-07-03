import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Search, Inbox, Calendar, Tag, BarChart3, TrendingUp } from "lucide-react";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-black text-sm font-medium bg-blue-100 px-2 py-1 rounded">Analytics</span>
          </div>
          
          <Button className="bg-black text-white text-xs px-3 py-2 rounded-md hover:bg-gray-800">
            Get free
          </Button>
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section className="px-4 py-12">
        <div className="text-center">
          {/* Analytics icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-black leading-tight mb-4">
            The dashboard that thinks like you
          </h1>
          
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Meet Square Analytics, the dashboard that organizes itself, tracks metrics, and generates insights any way you'd like.
          </p>
          
          <Button className="bg-black text-white text-sm px-6 py-3 rounded-md hover:bg-gray-800 mb-12 w-full max-w-xs">
            Get Square free
          </Button>
        </div>
      </section>

      {/* Mobile Dashboard Interface Mockup */}
      <section className="px-4 pb-12">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Top bar */}
          <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-medium">S</span>
              </div>
              <span className="text-xs font-medium">Square</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">Search</span>
            </div>
          </div>

          {/* Header */}
          <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                <BarChart3 className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-xs font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">Auto Filter</span>
            </div>
          </div>

          {/* Metric Items */}
          <div className="divide-y divide-gray-100">
            {[
              { metric: "Revenue Growth", value: "+23.5%", tag: "Sales", color: "purple" },
              { metric: "Customer Acquisition", value: "+156 users", tag: "Marketing", color: "pink" },
              { metric: "Conversion Rate", value: "3.2%", tag: "Sales", color: "purple" },
              { metric: "Monthly Recurring Revenue", value: "$45,230", tag: "Sales", color: "purple" },
              { metric: "Monthly Active Users", value: "12,450", tag: "Product", color: "blue" },
            ].map((metric, index) => (
              <div key={index} className="px-3 py-2 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-900 truncate">{metric.metric}</div>
                    <div className="text-xs text-gray-600 truncate">{metric.value}</div>
                  </div>
                  {metric.tag && (
                    <div className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                      metric.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      metric.color === 'pink' ? 'bg-pink-100 text-pink-700' :
                      metric.color === 'blue' ? 'bg-blue-100 text-blue-700' : ''
                    }`}>
                      {metric.tag}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Testimonials */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="space-y-6">
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
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <blockquote className="text-gray-900 mb-3 text-sm">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-medium text-gray-900 text-sm">{testimonial.author}</div>
                <div className="text-gray-500 text-xs">{testimonial.handle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Footer */}
      <footer className="px-4 py-6">
        <div className="text-center">
          <div className="text-gray-600 text-sm">
            © 2025 SquareLabs
          </div>
        </div>
      </footer>
    </div>
  );
}