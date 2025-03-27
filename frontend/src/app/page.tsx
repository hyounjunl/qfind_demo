// frontend/src/app/page.tsx
'use client';
import React from 'react';
import Layout from '../components/layout/Layout';
import TrendingKeyword from '../components/trending/TrendingKeyword';
import TrendingTicker from '../components/trending/TrendingTicker';
import TrendingNews from '../components/trending/TrendingNews';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="px-4 py-2 bg-gray-100 rounded-md text-sm">
                Label
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8">
              <option>Category</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Ask Agent"
              className="w-full border border-gray-300 rounded-md py-2 px-4"
            />
            <button className="absolute right-0 top-0 h-full px-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <TrendingKeyword />
        <TrendingTicker />
        <TrendingNews />
      </div>
    </Layout>
  );
}