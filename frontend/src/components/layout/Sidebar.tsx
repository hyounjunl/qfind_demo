// frontend/src/components/layout/Sidebar.tsx
import React from 'react';
// import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Qfind</h1>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md">
            New Research
          </button>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
            Research History
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </h2>
          <ul>
            {Array(10).fill(0).map((_, i) => (
              <li key={i} className="py-1 px-2 hover:bg-gray-800 rounded-md">
                Chat History
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;