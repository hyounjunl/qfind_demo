'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
// import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';

const StockDetailPage = () => {
  const params = useParams();
  const ticker = params.ticker as string;
  
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');
  const [selectedSection, setSelectedSection] = useState<keyof typeof mockStockData.qraftAnalysis>('business');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        // Try to fetch data from API
        try {
          const response = await fetch(`/api/stocks/${ticker}`);
          if (response.ok) {
            const data = await response.json();
            setStockData(data);
            setLoading(false);
            return;
          }
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.log('API not available yet, using mock data:', e.message);
          } else {
            console.log('API not available yet, using mock data:', e);
          }
        }
        
        // If we reach here, use mock data instead of showing an error
        console.log('Using mock data for', ticker);
        
        // Use a timeout to simulate loading
        setTimeout(() => {
          setStockData(null); // This will trigger the mockStockData fallback
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchStockData();
  }, [ticker]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading stock data:', error);
    // Don't show error to user, just use mock data
    // Setting error to null to avoid showing the error message
    setTimeout(() => setError(null), 0);
  }

  // Fallback for development/testing when no API is available
  // Define a map of company names based on ticker
  const companyNameMap: Record<string, string> = {
    'TSLA': 'Tesla, Inc.',
    'AAPL': 'Apple Inc.',
    'MSFT': 'Microsoft Corporation',
    'GOOGL': 'Alphabet Inc.',
    'AMZN': 'Amazon.com, Inc.',
    'META': 'Meta Platforms, Inc.',
    'JPM': 'JPMorgan Chase & Co.',
    'UNH': 'UnitedHealth Group',
    'JNJ': 'Johnson & Johnson',
    'PFE': 'Pfizer Inc.',
    'MCK': 'McKesson Corporation',
    'NVDA': 'NVIDIA Corporation',
    'XOM': 'Exxon Mobil Corporation',
    'BAC': 'Bank of America Corp',
    'WFC': 'Wells Fargo & Company',
    'PG': 'Procter & Gamble Co',
    'KO': 'The Coca-Cola Company',
    'PEP': 'PepsiCo, Inc.',
    'WMT': 'Walmart Inc.',
    'COST': 'Costco Wholesale Corporation'
  };

  const mockStockData = {
    ticker: ticker,
    companyName: companyNameMap[ticker] || `${ticker} Corporation`,
    logo: `https://example.com/${ticker.toLowerCase()}-logo.png`,
    qraftAnalysis: {
      business: {
        before: {
          title: "Business Overview",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health..."
        },
        after: {
          title: "Business Overview",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health... [AI enhanced analysis]"
        }
      },
      market: {
        before: {
          title: "Market Position",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health..."
        },
        after: {
          title: "Market Position",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health... [AI enhanced analysis]"
        }
      },
      operating: {
        before: {
          title: "Operating Results",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health..."
        },
        after: {
          title: "Operating Results",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health... [AI enhanced analysis]"
        }
      },
      risk: {
        before: {
          title: "Risk Assessment",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health..."
        },
        after: {
          title: "Risk Assessment",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health... [AI enhanced analysis]"
        }
      },
      competitors: {
        before: {
          title: "Competitors Analysis",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health..."
        },
        after: {
          title: "Competitors Analysis",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health... [AI enhanced analysis]"
        }
      },
      tech: {
        before: {
          title: "Qraft Tech Evaluation",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health..."
        },
        after: {
          title: "Qraft Tech Evaluation",
          content: "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada. The company holds a significant market share, serving major clients like CVS Health... [AI enhanced analysis]"
        }
      }
    },
    technologies: {
      title: "Qraft Technologies",
      koreanText: "이런 애널리스트가 당신의 친구가 되었어요",
      filingDate: "2023-05-01"
    },
    keyData: {
      rating: "hold",
      targetPrice: "Qraft premium Only",
      avgDailyVol: "1.03",
      closingPrice: "361.41",
      marketCap: "47966.36",
      priceRange52W: "302.33 - 388.17",
      bvps: "-10.56"
    },
    charts: {
      performance: "/path/to/performance-chart.svg",
      peEps: "/path/to/pe-eps-chart.svg"
    },
    trendingNews: [
      {
        id: 1,
        title: "McKesson Announces New Healthcare Technology Initiative",
        date: "3hours ago",
        tag: "Technology"
      },
      {
        id: 2,
        title: "Q2 Earnings Beat Analyst Expectations",
        date: "5hours ago",
        tag: "Earnings"
      },
      {
        id: 3,
        title: "McKesson Expands Distribution Network in Southeast",
        date: "1day ago",
        tag: "Expansion"
      }
    ]
  };

  // Use either actual API data or mock data
  const data = stockData || mockStockData;

  const renderAnalysisContent = () => {
    const section = data.qraftAnalysis[selectedSection];
    const content = section[activeTab];
    
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">{content.title}</h3>
        <p className="text-gray-700">{content.content}</p>
        <button className="mt-4 text-blue-600 hover:underline">Read More</button>
      </div>
    );
  };

  return (
    <Layout>
        <div className="container mx-auto px-4 py-6">
        {/* Header with company info */}
        <div className="flex items-center mb-6">
            {/* <div className="mr-4">
            {data.logo ? (
                <Image 
                src={data.logo} 
                alt={`${data.companyName} logo`} 
                width={64}
                height={64}
                className="h-16 w-16"
                />
            ) : (
                <div className="h-16 w-16 bg-gray-200 flex items-center justify-center rounded">
                <span className="text-2xl font-bold text-gray-500">{data.ticker.charAt(0)}</span>
                </div>
            )}
            </div> */}
            <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.companyName} ({data.ticker})</h1>
            </div>
        </div>
        
        {/* Qraft Agent Analysis Section */}
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Qraft Agent Analysis</h2>
            
            {/* Before/After Toggle */}
            <div className="flex border-b mb-4">
            <button
                className={`px-4 py-2 font-medium ${activeTab === 'before' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('before')}
            >
                Before
            </button>
            <button
                className={`px-4 py-2 font-medium ${activeTab === 'after' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('after')}
            >
                After
            </button>
            </div>
            
            {/* Analysis Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <button
                className={`py-2 px-4 rounded ${selectedSection === 'business' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedSection('business')}
            >
                Business Overview
            </button>
            <button
                className={`py-2 px-4 rounded ${selectedSection === 'market' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedSection('market')}
            >
                Market Position
            </button>
            <button
                className={`py-2 px-4 rounded ${selectedSection === 'operating' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedSection('operating')}
            >
                Operating Results
            </button>
            <button
                className={`py-2 px-4 rounded ${selectedSection === 'risk' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedSection('risk')}
            >
                Risk Assessment
            </button>
            <button
                className={`py-2 px-4 rounded ${selectedSection === 'competitors' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedSection('competitors')}
            >
                Competitors Analysis
            </button>
            <button
                className={`py-2 px-4 rounded ${selectedSection === 'tech' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedSection('tech')}
            >
                Qraft Tech Evaluation
            </button>
            </div>
            
            {/* Analysis Content */}
            {renderAnalysisContent()}
        </div>
        
        {/* Technologies and Key Data Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Technologies */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">{data.technologies.title}</h3>
            <p className="text-gray-700 mb-2">{data.technologies.koreanText}</p>
            <p className="text-gray-600">MCK filing date: {data.technologies.filingDate}</p>
            </div>
            
            {/* Key Data */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Key Data</h3>
            <div className="space-y-2">
                <div className="flex justify-between">
                <span className="text-gray-600">Rating</span>
                <span className="font-medium">{data.keyData.rating}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-gray-600">Target Price</span>
                <span className="font-medium">{data.keyData.targetPrice}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-gray-600">6m avg daily vol (USDmn)</span>
                <span className="font-medium">{data.keyData.avgDailyVol}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-gray-600">Closing Price (USD)</span>
                <span className="font-medium">{data.keyData.closingPrice}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-gray-600">Market Cap(USDmn)</span>
                <span className="font-medium">{data.keyData.marketCap}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-gray-600">52 Week Price Range (USD)</span>
                <span className="font-medium">{data.keyData.priceRange52W}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-gray-600">BVPS (USD)</span>
                <span className="font-medium">{data.keyData.bvps}</span>
                </div>
            </div>
            </div>
        </div>
        
        {/* Performance Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Share Performance */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Share Performance</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                {data.charts.performance ? (
                <Image 
                    src={data.charts.performance}
                    alt="Share Performance Chart"
                    width={600}
                    height={400}
                    className="w-full h-full object-contain"
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Chart data not available
                </div>
                )}
            </div>
            </div>
            
            {/* PE & EPS */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">PE & EPS</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                {data.charts.peEps ? (
                <Image 
                    src={data.charts.peEps}
                    alt="PE & EPS Chart"
                    width={600}
                    height={400}
                    className="w-full h-full object-contain"
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Chart data not available
                </div>
                )}
            </div>
            </div>
        </div>
        
        {/* Trending News */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trending News</h2>
            <div className="space-y-4">
            {data.trendingNews.map(news => (
                <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex">
                <div className="bg-gray-200 w-24 h-24 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="p-4 flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{news.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                    <span>{news.date}</span>
                    <span className="mx-2">•</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{news.tag}</span>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </Layout>
  );
};

export default StockDetailPage;