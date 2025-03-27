// frontend/src/components/trending/TrendingNews.tsx
import React from 'react';

const TrendingNews = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Trending News</h2>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
      <div className="space-y-4">
        {Array(7).fill(0).map((_, i) => (
          <div key={i} className="flex items-start space-x-4">
            <div className="bg-gray-200 w-16 h-16 flex-shrink-0 rounded">
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-medium">Header</h3>
              <p className="text-sm text-gray-600">Subhead before 3hours</p>
              <div className="mt-1">
                <span className="inline-block bg-gray-100 text-xs text-gray-500 px-2 py-1 rounded">Tag</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;