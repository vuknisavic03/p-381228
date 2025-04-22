
import { useState, useEffect } from "react";
import { Search, MapPin, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ListingList() {
  const [listings, setListings] = useState<any[]>([]);

  const fetchListings = async () => {
    try {
      const res = await fetch("http://localhost:5000/listings");
      const data = await res.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-white border-b">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold">Listings</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-8 h-9" />
          </div>
          <Button variant="outline" size="sm">Filter</Button>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-2">
          {listings.map((listing) => (
            <Card 
              key={listing.id} 
              className="p-1 hover:bg-gray-50/50 cursor-pointer transition-colors"
            >
              <div className="flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 pb-2">
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-[#9EA3AD]">#{listing.id}</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{listing.address}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-[#F3F3F6] text-[#9EA3AD] text-sm rounded">
                    {listing.type}
                  </span>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-[#E4E5EA] mx-4" />
                
                {/* Footer */}
                <div className="flex items-center justify-between p-4 pt-2">
                  <div className="flex items-center gap-8 text-sm">
                    <span className="text-[#9EA3AD]">{listing.tenant?.name || 'No tenant'}</span>
                    <div className="flex items-center gap-8">
                      {listing.tenant?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#9EA3AD]" />
                          <span>{listing.tenant.phone}</span>
                        </div>
                      )}
                      {listing.tenant?.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#9EA3AD]" />
                          <span>{listing.tenant.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-[#F3F3F6] text-[#9EA3AD] text-sm rounded">
                    {listing.category}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
