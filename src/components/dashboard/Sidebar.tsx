import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  workspaceName: string;
  userInitials: string;
  owner: string;
  className?: string;
}

export function Sidebar({ workspaceName, userInitials, owner, className }: SidebarProps) {
  return (
    <div className={cn("flex flex-col h-full border-r bg-white", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-gray-800 text-white">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm">{workspaceName}</div>
            <div className="text-xs text-gray-500">{owner}</div>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-1 py-3">
        <a href="/dashboard" className="px-4 py-2 rounded-lg text-[1.08rem] font-semibold hover:bg-gray-100 transition">
          Dashboard
        </a>
        <a href="/transactions" className="px-4 py-2 rounded-lg text-[1.08rem] font-semibold hover:bg-gray-100 transition">
          Transactions
        </a>
        <a href="/listings" className="px-4 py-2 rounded-lg text-[1.08rem] font-semibold hover:bg-gray-100 transition">
          Listings
        </a>
        <a href="/profile" className="px-4 py-2 rounded-lg text-[1.08rem] font-semibold hover:bg-gray-100 transition">
          Profile
        </a>
      </nav>
    </div>
  );
}
