import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, Building2, CreditCard, TrendingUp, Target } from "lucide-react";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-7 h-7 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-gray-600 text-sm">Accounting</Link>
              <Link to="/vision" className="text-blue-600 text-sm font-medium">Vision</Link>
            </nav>
          </div>
          
          <Button className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800">
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
          
          <h1 className="text-3xl font-bold text-black leading-tight mb-4">
            The dashboard that thinks like you
          </h1>
          
          <p className="text-base text-gray-600 mb-8 leading-relaxed px-4 max-w-md mx-auto">
            Meet Square Accounting, the dashboard that organizes itself, tracks revenue, and manages expenses any way you'd like.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button className="bg-black text-white text-base px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Get Square free
            </Button>
          </div>
        </div>
      </section>

      {/* Auto-Categorization Feature */}
      <section className="px-4 pb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-2">Smart categorization does the work for you</h2>
          <p className="text-sm text-gray-600">
            Tell Square AI what types of transactions are important to track, and it'll automatically label and sort them as they arrive.
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Smart Categories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Rent', 'Maintenance', 'Insurance', 'Utilities'].map((category, index) => (
                  <div key={index} className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                    <div className={`w-2 h-2 rounded-full ${
                      category === 'Rent' ? 'bg-green-500' :
                      category === 'Maintenance' ? 'bg-red-500' :
                      category === 'Insurance' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}></div>
                    <span className="text-xs font-medium text-gray-700">{category}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[
                { desc: "HVAC Repair", amount: "-$850", category: "Maintenance", auto: true },
                { desc: "Rent Collection", amount: "+$2,400", category: "Rent", auto: true },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-900 truncate">{item.desc}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        item.category === 'Rent' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-xs text-gray-600">{item.category}</span>
                      {item.auto && <span className="text-xs bg-blue-100 text-blue-700 px-1 rounded">Auto</span>}
                    </div>
                  </div>
                  <div className={`text-xs font-medium ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Metrics Feature */}
      <section className="px-4 pb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-2">Live metrics that update themselves</h2>
          <p className="text-sm text-gray-600">
            See your portfolio performance in real-time with metrics that refresh automatically.
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { metric: "Revenue", value: "$125K", change: "+12.5%", trend: "up" },
                { metric: "Profit", value: "$36K", change: "+18.7%", trend: "up" },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-gray-700 mb-1">{item.metric}</div>
                  <div className="text-lg font-bold text-gray-900">{item.value}</div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-600">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 py-2 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">Live updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Property Organization Feature */}
      <section className="px-4 pb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-2">Split your portfolio into custom views</h2>
          <p className="text-sm text-gray-600">
            Group properties by type, filter by performance, and focus on what matters most.
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Property Views</span>
              </div>
              <div className="flex gap-2 text-xs">
                <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">All Properties</div>
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Apartments</div>
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Office</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { name: "Sunset Apartments", type: "Apartment", profit: "+$36K", status: "High Performance" },
                { name: "Downtown Office", type: "Office", profit: "+$54K", status: "Excellent" },
              ].map((property, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-900 truncate">{property.name}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-gray-600">{property.type}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-1 rounded">{property.status}</span>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-green-600">{property.profit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Filtering Feature */}
      <section className="px-4 pb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-2">Group and filter by what you need</h2>
          <p className="text-sm text-gray-600">
            Filter transactions by property, category, or amount—whatever helps you focus.
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">Filter by</span>
              </div>
              <div className="flex gap-2 text-xs">
                <div className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  Property
                </div>
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Category</div>
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Amount</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { desc: "Sunset Apt - HVAC", amount: "-$850", property: "Sunset Apartments" },
                { desc: "Sunset Apt - Rent", amount: "+$2,400", property: "Sunset Apartments" },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-900 truncate">{transaction.desc}</div>
                    <div className="text-xs text-gray-600 mt-1">{transaction.property}</div>
                  </div>
                  <div className={`text-xs font-medium ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Mobile Testimonials Section */}
      <section className="px-4 py-12">
        <div className="space-y-4 mb-8">
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
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
              <blockquote className="text-gray-900 mb-3 text-sm">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-medium text-gray-900 text-sm">{testimonial.author}</div>
                <div className="text-gray-500 text-sm">{testimonial.handle}</div>
              </div>
            </div>
          ))}
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
    </div>
  );
}