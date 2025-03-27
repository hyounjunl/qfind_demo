// frontend/src/components/trending/TrendingTicker.tsx
import React from 'react';

const TrendingTicker = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Trending Ticker</h2>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(9).fill(0).map((_, i) => (
          <div key={i} className="bg-purple-50 rounded-lg p-4 flex items-center">
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center mr-3">
              A
            </div>
            <div>
              <p className="font-medium">Header</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTicker;