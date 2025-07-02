import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Search, Inbox, Calendar, Tag } from "lucide-react";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-black text-sm font-medium bg-blue-100 px-2 py-1 rounded">Mail</span>
          </div>
          
          <Button className="bg-black text-white text-xs px-3 py-2 rounded-md hover:bg-gray-800">
            Get free
          </Button>
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section className="px-4 py-12">
        <div className="text-center">
          {/* Paper plane icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <Mail className="w-8 h-8 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-black leading-tight mb-4">
            The inbox that thinks like you
          </h1>
          
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Meet Notion Mail, the inbox that organizes itself, drafts emails, and schedules meetings any way you'd like.
          </p>
          
          <Button className="bg-black text-white text-sm px-6 py-3 rounded-md hover:bg-gray-800 mb-12 w-full max-w-xs">
            Get Notion Mail free
          </Button>
        </div>
      </section>

      {/* Mobile Email Interface Mockup */}
      <section className="px-4 pb-12">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Top bar */}
          <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-medium">D</span>
              </div>
              <span className="text-xs font-medium">Doru</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">Search</span>
            </div>
          </div>

          {/* Header */}
          <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 rounded flex items-center justify-center">
                <Inbox className="w-3 h-3 text-red-600" />
              </div>
              <span className="text-xs font-medium">Inbox</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">Auto Label</span>
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
            ].map((email, index) => (
              <div key={index} className="px-3 py-2 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-900 truncate">{email.from}</div>
                    <div className="text-xs text-gray-600 truncate">{email.subject}</div>
                  </div>
                  {email.tag && (
                    <div className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                      email.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      email.color === 'pink' ? 'bg-pink-100 text-pink-700' : ''
                    }`}>
                      {email.tag}
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