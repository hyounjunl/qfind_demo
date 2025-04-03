// frontend/src/components/news/NewsCard.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showKorean, setShowKorean] = useState(item._forceKorean || false);
  
  // Update showKorean when item._forceKorean changes
  useEffect(() => {
    if (item._forceKorean !== undefined) {
      setShowKorean(item._forceKorean);
    }
  }, [item._forceKorean]);

  // Generate a deterministic placeholder image based on item id
  const placeholders = ['finance.jpg', 'markets.jpg', 'economy.jpg', 'stocks.jpg', 'currency.jpg'];
  const imageIndex = item.id % placeholders.length;
  const placeholderImage = `/images/news-placeholders/${placeholders[imageIndex]}`;
  
  // Create a truncated preview of the body text
  const bodyPreview = item.body ? 
    (item.body.length > 100 ? `${item.body.substring(0, 100)}...` : item.body) : 
    "No preview available";
    
  const korBodyPreview = item.kor_body ? 
    (item.kor_body.length > 100 ? `${item.kor_body.substring(0, 100)}...` : item.kor_body) : 
    "미리보기가 없습니다";

  const handleTranslate = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent opening modal when clicking translate button
    
    if (!showKorean && !isTranslating) {
      setIsTranslating(true);
      setTimeout(() => {
        setShowKorean(true);
        setIsTranslating(false);
      }, 1500); // Simulate translation for 1.5 seconds
    } else {
      setShowKorean(false);
    }
  };

  const hasTranslation = !!item.kor_title && !!item.kor_body;

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
            {showKorean && item.kor_title ? item.kor_title : item.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {showKorean && item.kor_body ? korBodyPreview : bodyPreview}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item.date}
              </span>
              <span className="mx-2">•</span>
              <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">{item.tag}</span>
            </div>
            
            {hasTranslation && (
              <button 
                onClick={(e) => handleTranslate(e)}
                className={`ml-2 text-xs flex items-center px-2 py-1 rounded-full ${showKorean ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} hover:bg-blue-100 hover:text-blue-700 transition-colors`}
                aria-label={showKorean ? "View in English" : "View in Korean"}
              >
                {isTranslating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    번역
                  </>
                ) : showKorean ? '영어' : '한국어'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-indigo-50 to-blue-50">
              <h3 className="text-xl font-bold text-gray-900">
                {showKorean && item.kor_title ? item.kor_title : item.title}
              </h3>
              <div className="flex items-center">
                {hasTranslation && (
                  <button 
                    onClick={handleTranslate}
                    className={`mr-3 text-sm flex items-center px-3 py-1 rounded-full ${showKorean ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} hover:bg-blue-100 hover:text-blue-700 transition-colors`}
                  >
                    {isTranslating ? (
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
                        {showKorean ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            영어로 보기
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            한국어로 보기
                          </>
                        )}
                      </>
                    )}
                  </button>
                )}
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
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
                    alt={item.tag}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {isTranslating ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-blue-600">
                        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-blue-700 font-medium">Qraft AI가 번역 중 입니다...</p>
                  <p className="text-gray-500 text-sm mt-1">잠시만 기다려주세요</p>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {showKorean && item.kor_body 
                      ? item.kor_body 
                      : (item.body || "No content available for this news article. You may visit the source website for more information.")}
                  </p>
                </div>
              )}
              
              {item.url && (
                <div className="mt-6">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <span>{showKorean ? '전체 기사 읽기' : 'Read full article'}</span>
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
                {showKorean ? '닫기' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;