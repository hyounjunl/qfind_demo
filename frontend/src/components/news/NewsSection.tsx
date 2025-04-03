// frontend/src/components/news/NewsSection.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import NewsCard from './NewsCard';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  url?: string;
  body?: string;
  kor_title?: string;
  kor_body?: string;
  _forceKorean?: boolean;
}

interface NewsSectionProps {
  news: NewsItem[];
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
  viewAllLink?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ 
  news, 
  title = "Market News", 
  showViewAll = true,
  maxItems = 5,
  viewAllLink = "/news"
}) => {
  const [showAllNews, setShowAllNews] = useState(false);
  const [isTranslatingAll, setIsTranslatingAll] = useState(false);
  const [showKoreanAll, setShowKoreanAll] = useState(false);

  const visibleNews = showAllNews ? news : news.slice(0, maxItems);
  const hasMoreNews = news.length > maxItems;
  
  // Check if any news has Korean translation
  const hasAnyTranslation = news.some(item => !!item.kor_title && !!item.kor_body);
  
  // If there are no translations available, don't show the toggle
  const showTranslationToggle = hasAnyTranslation;

  const handleTranslateAll = () => {
    if (!showKoreanAll && !isTranslatingAll) {
      setIsTranslatingAll(true);
      setTimeout(() => {
        setShowKoreanAll(true);
        setIsTranslatingAll(false);
      }, 1800); // Simulate translation for 1.8 seconds
    } else {
      setShowKoreanAll(false);
    }
  };

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
        
        <div className="flex items-center">
          {/* Translation toggle button */}
          {showTranslationToggle && (
            <button 
              onClick={handleTranslateAll}
              className={`mr-3 text-sm flex items-center px-3 py-1 rounded-full ${showKoreanAll ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} hover:bg-blue-100 hover:text-blue-700 transition-colors`}
              disabled={isTranslatingAll}
            >
              {isTranslatingAll ? (
                <>
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>번역 중...</span>
                  </div>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {showKoreanAll ? '모두 영어로' : '모두 한국어로'}
                </>
              )}
            </button>
          )}

          {/* View All button/link */}
          {showViewAll && (
            hasMoreNews && !showAllNews ? (
              <button
                onClick={() => setShowAllNews(true)}
                className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium flex items-center"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : showAllNews ? (
              <Link href={viewAllLink} className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium flex items-center">
                More News
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <Link href={viewAllLink} className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium flex items-center">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )
          )}
        </div>
      </div>

      {/* Translation loading animation */}
      {isTranslatingAll && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100 mb-4">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-blue-600">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-blue-700 mb-1">Qraft AI가 모든 뉴스를 번역 중 입니다</h3>
            <p className="text-gray-500">잠시만 기다려주세요...</p>
          </div>
        </div>
      )}

      {/* News items grid */}
      <div className="grid grid-cols-1 gap-4">
        {visibleNews.length > 0 ? (
          visibleNews.map(item => {
            // Apply the global translation state to each news item
            const modifiedItem = {
              ...item,
              _forceKorean: showKoreanAll
            };
            
            return <NewsCard key={item.id} item={modifiedItem} />;
          })
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>No news articles available for this date</p>
          </div>
        )}
      </div>

      {/* Show less button when expanded */}
      {showAllNews && hasMoreNews && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllNews(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsSection;