// frontend/src/components/news/NewsCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  url?: string;
  body?: string;
}

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use ordered image selection based on item id
  const placeholders = ['finance.jpg', 'markets.jpg', 'economy.jpg', 'stocks.jpg', 'currency.jpg'];
  // Simple ordered assignment based on the item's id
  const imageIndex = item.id % placeholders.length;
  const placeholderImage = `/images/news-placeholders/${placeholders[imageIndex]}`;
  
  // Create a truncated preview of the body text
  const bodyPreview = item.body ? 
    (item.body.length > 100 ? `${item.body.substring(0, 100)}...` : item.body) : 
    "No preview available";

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-lg shadow-sm overflow-hidden flex hover:shadow-md transition-shadow duration-200 border border-gray-100 cursor-pointer"
      >
        <div className="bg-gray-200 w-24 h-24 flex-shrink-0 overflow-hidden">
          <Image
            src={placeholderImage}
            alt={item.tag}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-1">
          <h3 className="font-medium text-gray-900 mb-1 hover:text-indigo-700 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">{bodyPreview}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.date}
            </span>
            <span className="mx-2">•</span>
            <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">{item.tag}</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-indigo-50 to-blue-50">
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">{item.tag}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-500 text-sm">{item.date}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="bg-gray-100 h-48 w-full rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={placeholderImage}
                    alt={item.tag || "News image"}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.body || "No content available for this news article. You may visit the source website for more information."}
                </p>
              </div>
              
              {item.url && (
                <div className="mt-6">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <span>Read full article</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;