import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, Users, ArrowRight } from "lucide-react";

interface UserTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserTypeDialog({ open, onOpenChange }: UserTypeDialogProps) {
  const handleUserTypeSelect = (type: 'owner' | 'manager') => {
    // Here you can add navigation or other logic
    console.log(`Selected user type: ${type}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Welcome to Square
          </DialogTitle>
          <p className="text-gray-600 text-center">
            Choose your role to get started with the right experience
          </p>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-gray-50 border-2 hover:border-gray-300 transition-all"
            onClick={() => handleUserTypeSelect('owner')}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 mb-1">Property Owner</div>
              <div className="text-sm text-gray-600">
                Manage your own properties and investments
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-gray-50 border-2 hover:border-gray-300 transition-all"
            onClick={() => handleUserTypeSelect('manager')}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 mb-1">Property Manager</div>
              <div className="text-sm text-gray-600">
                Manage properties for clients and tenants
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
        
        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">
            You can change this later in your account settings
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}