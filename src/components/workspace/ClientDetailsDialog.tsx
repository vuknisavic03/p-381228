
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ClientDetailsProps {
  client: {
    name: string;
    owner: string;
    initials: string;
  };
  onClose: () => void;
}

export function ClientDetailsDialog({ client, onClose }: ClientDetailsProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Client Details</DialogTitle>
        <DialogDescription>
          Information about {client.name}.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-[#F6F6F7] flex items-center justify-center text-lg font-medium text-[#9EA3AD] mr-4">
            {client.initials}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{client.name}</h3>
            <p className="text-sm text-gray-500">Managed by {client.owner}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Contact Information</h4>
            <p className="text-sm">Email: {client.owner.toLowerCase().replace(' ', '.')}@example.com</p>
            <p className="text-sm">Phone: (555) 123-4567</p>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Workspace Details</h4>
            <p className="text-sm">Created: May 10, 2025</p>
            <p className="text-sm">Properties: 3</p>
            <p className="text-sm">Active Listings: 2</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </>
  );
}
