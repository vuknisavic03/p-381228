
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function MainNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex space-x-4 p-4 border-b border-[#E4E5EA]">
      <Link
        to="/dashboard"
        className={`px-3 py-2 rounded-md ${
          isActive('/dashboard') ? 'bg-[#F6F6F7] font-semibold' : 'text-[#1A1A1A]'
        }`}
      >
        Overview
      </Link>
      <Link
        to="/listings"
        className={`px-3 py-2 rounded-md ${
          isActive('/listings') ? 'bg-[#F6F6F7] font-semibold' : 'text-[#1A1A1A]'
        }`}
      >
        Listings
      </Link>
      <Link
        to="/transactions"
        className={`px-3 py-2 rounded-md ${
          isActive('/transactions') ? 'bg-[#F6F6F7] font-semibold' : 'text-[#1A1A1A]'
        }`}
      >
        Transactions
      </Link>
    </nav>
  );
}
