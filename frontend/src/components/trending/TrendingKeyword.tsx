// frontend/src/components/trending/TrendingKeyword.tsx
import React from 'react';

const TrendingKeyword = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Trending Keyword</h2>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {Array(16).fill(0).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <span className="text-gray-500">{i + 1}</span>
            <span>Tesla</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingKeyword;