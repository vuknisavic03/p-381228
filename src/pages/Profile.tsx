
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCog } from "lucide-react";

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-[800px]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Account Settings</h1>
          <Button variant="outline" className="gap-2">
            <UserCog className="w-4 h-4" />
            <span>Edit Profile</span>
          </Button>
        </div>

        <Card className="bg-white p-6">
          <div className="flex gap-6 mb-8">
            <Avatar className="w-[72px] h-[72px]">
              <div className="w-full h-full bg-[#F3F3F6] text-[#9EA3AD] font-semibold flex items-center justify-center text-2xl">
                U
              </div>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">User's Space</h2>
              <p className="text-[#9EA3AD] text-sm">user@email.com</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value="username" className="max-w-[400px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value="user@email.com" className="max-w-[400px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="max-w-[400px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input 
                id="timezone" 
                value="Pacific Time - US & Canada (UTC-07:00)" 
                className="max-w-[400px]" 
              />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
