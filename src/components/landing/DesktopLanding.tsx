import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Search, Inbox, Calendar, Tag } from "lucide-react";

export default function DesktopLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <nav className="flex items-center gap-6">
              <span className="text-gray-600 text-sm">Notion</span>
              <span className="text-black text-sm font-medium bg-blue-100 px-2 py-1 rounded">Mail</span>
              <span className="text-gray-600 text-sm">Calendar</span>
              <span className="text-gray-600 text-sm">AI</span>
              <span className="text-gray-600 text-sm">Enterprise</span>
              <span className="text-gray-600 text-sm">Pricing</span>
              <span className="text-gray-600 text-sm">Explore</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 text-sm">Log in</button>
            <Button className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800">
              Get Notion Mail free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto text-center">
          {/* Paper plane icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <Mail className="w-12 h-12 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-black leading-tight mb-6 max-w-4xl mx-auto">
            The inbox that thinks like you
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Meet Notion Mail, the inbox that organizes itself, drafts emails, and schedules meetings any way you'd like.
          </p>
          
          <Button className="bg-black text-white text-base px-6 py-3 rounded-md hover:bg-gray-800 mb-16">
            Get Notion Mail free
          </Button>
        </div>
      </section>

      {/* Email Interface Mockup */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {/* Top bar */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">D</span>
                </div>
                <span className="text-sm font-medium">Doru</span>
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
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-red-50 text-red-600 rounded text-sm">
                    <Inbox className="w-4 h-4" />
                    <span>Inbox</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Calendar</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-purple-100 rounded-sm"></div>
                    <span>Hiring</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-pink-100 rounded-sm"></div>
                    <span>Support</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-blue-100 rounded-sm"></div>
                    <span>Travel</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-green-100 rounded-sm"></div>
                    <span>Newsletters</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-900 mb-3">Mail</div>
                  <div className="space-y-1">
                    <div className="px-2 py-1.5 text-gray-600 text-sm">All mail</div>
                    <div className="px-2 py-1.5 text-gray-600 text-sm">Sent</div>
                    <div className="px-2 py-1.5 text-gray-600 text-sm">Drafts</div>
                  </div>
                </div>
              </div>

              {/* Email List */}
              <div className="flex-1">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                      <Inbox className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-sm font-medium">Inbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Auto Label</span>
                  </div>
                </div>

                {/* Email Items */}
                <div className="divide-y divide-gray-100">
                  {[
                    { from: "Andrew, Jason", subject: "Next steps", tag: "Hiring", color: "purple" },
                    { from: "Jack Steadman", subject: "Can't find log out button", tag: "Support", color: "pink" },
                    { from: "Bud, Stephanie", subject: "Product design role", tag: "Hiring", color: "purple" },
                    { from: "Natalie", subject: "Dark mode looks off", tag: "Support", color: "pink" },
                    { from: "Kosta B", subject: "Technical interview", tag: "Hiring", color: "purple" },
                    { from: "Sunny, Vaishnavi", subject: "Re: Coffee", tag: "Hiring", color: "purple" },
                    { from: "Enabled MD", subject: "Exciting new role", tag: "Hiring", color: "purple" },
                    { from: "Vicky Soara", subject: "Accelerating your IT", tag: "", color: "" },
                    { from: "CMYK Apparel", subject: "Free lunch?", tag: "", color: "" },
                    { from: "Michai Loutsa", subject: "Pending: Your input on project scope", tag: "Cold email", color: "orange" },
                  ].map((email, index) => (
                    <div key={index} className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-900 min-w-0 flex-shrink-0">{email.from}</span>
                          <span className="text-sm text-gray-600 truncate">{email.subject}</span>
                        </div>
                      </div>
                      {email.tag && (
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          email.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                          email.color === 'pink' ? 'bg-pink-100 text-pink-700' :
                          email.color === 'orange' ? 'bg-orange-100 text-orange-700' : ''
                        }`}>
                          {email.tag}
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
                quote: "Notion Mail is finally bringing innovation to something that stayed stagnant for decades.",
                author: "Deniz Birlikci",
                handle: "@denizbirlikci"
              },
              {
                quote: "Notion Mail let me create a system so customized to the way I work, my relationships, and my tone of voice that there's no way I could go back.",
                author: "Camille Ricketts",
                handle: "@camillericketts"
              },
              {
                quote: "OK: Notion Mail is pretty sick.",
                author: "Aleks",
                handle: "@aleksliving"
              },
              {
                quote: "They really cooked with Notion Mail. Especially the AI auto-filter. Maybe inbox zero can finally be achieved.",
                author: "Arian",
                handle: "@ariancodes"
              },
              {
                quote: "Using @NotionMail is like building filtered views for your databases, but the properties are elements from your emails. So excited to set this up.",
                author: "Hunter Bohn",
                handle: "@TheHunterBohm"
              },
              {
                quote: "Notion Mail is finally bringing innovation to something that stayed stagnant for decades.",
                author: "Deniz Birlikci",
                handle: "@denizbirlikci"
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