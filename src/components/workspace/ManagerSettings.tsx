import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, LifeBuoy, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function ManagerSettings() {
  const navigate = useNavigate();

  const handleResetPassword = () => {
    console.log("Reset Password clicked");
  };

  const handleSupport = () => {
    console.log("Support clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    navigate('/');
  };

  return (
    <div className="space-y-6">
      {/* Reset Password Section */}
      <div className="bg-gray-50 p-4 rounded-md">
        <div className="font-medium mb-1 text-gray-900">Reset Password</div>
        <div className="text-sm text-gray-500 mb-3">Change your account password</div>
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center bg-white border-gray-200 hover:bg-gray-50" 
          onClick={handleResetPassword}
        >
          <span>Reset Password</span>
          <Key className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Support Section */}
      <div className="bg-gray-50 p-4 rounded-md">
        <div className="font-medium mb-1 text-gray-900">Support</div>
        <div className="text-sm text-gray-500 mb-3">Get help with your account</div>
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center bg-white border-gray-200 hover:bg-gray-50" 
          onClick={handleSupport}
        >
          <span>Contact Support</span>
          <LifeBuoy className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Logout Section */}
      <div className="bg-gray-50 p-4 rounded-md">
        <div className="font-medium mb-1 text-gray-900">Log Out</div>
        <div className="text-sm text-gray-500 mb-3">Sign out from your account</div>
        <Button 
          variant="outline"
          className="w-full flex justify-between items-center text-red-500 hover:text-red-600 hover:border-red-200 bg-white" 
          onClick={handleLogout}
        >
          <span>Log Out</span>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}