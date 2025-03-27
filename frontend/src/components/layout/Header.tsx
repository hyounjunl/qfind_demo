// frontend/src/components/layout/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Qfind
              </Link>
            </div>
            <nav className="ml-6 flex space-x-4">
              <Link href="/industry" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900">
                Industry
              </Link>
              <Link href="/macro" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900">
                Macro
              </Link>
              <Link href="/news" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900">
                News
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;