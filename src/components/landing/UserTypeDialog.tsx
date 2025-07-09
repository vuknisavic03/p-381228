import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserTypeDialog({ open, onOpenChange }: UserTypeDialogProps) {
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: 'owner' | 'manager') => {
    onOpenChange(false);
    if (type === 'owner') {
      navigate("/dashboard");
    } else if (type === 'manager') {
      navigate("/workspace");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-1">
            Make your account
          </DialogTitle>
          <p className="text-gray-600 text-center text-sm">
            Choose your role to get started
          </p>
        </DialogHeader>
        
        <div className="grid gap-3 py-2">
          <Button
            variant="outline"
            className="h-auto p-4 flex items-center gap-3 hover:bg-gray-50 border-2 hover:border-gray-300 transition-all justify-start"
            onClick={() => handleUserTypeSelect('owner')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-sm">Property Owner</div>
              <div className="text-xs text-gray-600">Manage your own properties</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 flex items-center gap-3 hover:bg-gray-50 border-2 hover:border-gray-300 transition-all justify-start"
            onClick={() => handleUserTypeSelect('manager')}
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-sm">Property Manager</div>
              <div className="text-xs text-gray-600">Manage client properties</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}