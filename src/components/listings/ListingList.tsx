
import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
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
          <Button size="sm">Add listing</Button>
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
        <div className="grid gap-2">
          {listings.map((listing) => (
            <Card key={listing.id} className="p-3 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">{listing.address}</h3>
                  <p className="text-xs text-gray-500">
                    {listing.city}, {listing.country}
                  </p>
                  <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                    {listing.type}
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
