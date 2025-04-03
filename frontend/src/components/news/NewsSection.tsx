// frontend/src/components/news/NewsSection.tsx
import React from 'react';
import Link from 'next/link';
import NewsCard from './NewsCard';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  url?: string;
  body?: string;
}

interface NewsSectionProps {
  news: NewsItem[];
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
}

const NewsSection: React.FC<NewsSectionProps> = ({ 
  news, 
  title = "Market News", 
  showViewAll = true,
  maxItems = 5
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>

          {/* Animated typing effect indicator */}
          <div className="ml-3 flex text-indigo-600 text-sm items-center">
            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-1 animate-pulse"></div>
            <span>AI Curated</span>
          </div>
        </div>
        
        {showViewAll && (
          <Link href="/news" className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {news.length > 0 ? (
          news.slice(0, maxItems).map(item => (
            <NewsCard key={item.id} item={item} />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>No news articles available for this date</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;