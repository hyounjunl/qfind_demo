'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

// Dummy data for multiple industries
const industriesData = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Companies providing medical services, equipment, and pharmaceuticals.",
    marketCap: "$8.45T",
    growth: "+5.4%",
    topCompanies: ["UNH", "JNJ", "PFE", "ABT", "MCK"]
  },
  {
    id: "technology",
    name: "Technology",
    description: "Companies involved in the research, development, or distribution of technology-based goods and services.",
    marketCap: "$12.8T",
    growth: "+8.7%",
    topCompanies: ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]
  },
  {
    id: "finance",
    name: "Finance",
    description: "Companies that provide financial services to commercial and retail customers.",
    marketCap: "$7.2T",
    growth: "+3.2%",
    topCompanies: ["JPM", "BAC", "WFC", "C", "GS"]
  },
  {
    id: "energy",
    name: "Energy",
    description: "Companies involved in the production and supply of energy.",
    marketCap: "$4.9T",
    growth: "+2.1%",
    topCompanies: ["XOM", "CVX", "SLB", "COP", "EOG"]
  },
  {
    id: "consumer",
    name: "Consumer Goods",
    description: "Companies involved in producing goods consumed by individuals rather than by industries.",
    marketCap: "$5.3T",
    growth: "+4.5%",
    topCompanies: ["PG", "KO", "PEP", "WMT", "COST"]
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Companies involved in the ownership, development, and management of real estate.",
    marketCap: "$2.8T",
    growth: "+1.8%",
    topCompanies: ["AMT", "PLD", "CCI", "PSA", "EQIX"]
  }
];

// Dummy data for trending companies across all industries
const trendingCompanies = [
  { 
    id: 1, 
    ticker: "TSLA", 
    name: "Tesla, Inc.", 
    industry: "Technology",
    marketCap: "$361.41B", 
    price: 361.41, 
    change: 2.5
  },
  { 
    id: 2, 
    ticker: "NVDA", 
    name: "NVIDIA Corporation", 
    industry: "Technology",
    marketCap: "$1.12T", 
    price: 452.88, 
    change: 3.2
  },
  { 
    id: 3, 
    ticker: "AAPL", 
    name: "Apple Inc.", 
    industry: "Technology",
    marketCap: "$2.85T", 
    price: 182.63, 
    change: -0.5
  },
  { 
    id: 4, 
    ticker: "MCK", 
    name: "McKesson Corporation", 
    industry: "Healthcare",
    marketCap: "$47.96B", 
    price: 361.41, 
    change: -0.6
  },
  { 
    id: 5, 
    ticker: "JPM", 
    name: "JPMorgan Chase & Co.", 
    industry: "Finance",
    marketCap: "$432.15B", 
    price: 148.92, 
    change: 1.3
  },
  { 
    id: 6, 
    ticker: "XOM", 
    name: "Exxon Mobil Corporation", 
    industry: "Energy",
    marketCap: "$387.24B", 
    price: 92.45, 
    change: -1.2
  }
];

// Dummy news data across all industries
const trendingNews = [
  {
    id: 1,
    title: "Healthcare Industry Set for Major Digital Transformation",
    industry: "Healthcare",
    date: "3hours ago",
    tag: "Digital Health"
  },
  {
    id: 2,
    title: "Tech Giants Face New Regulatory Challenges",
    industry: "Technology",
    date: "4hours ago",
    tag: "Regulation"
  },
  {
    id: 3,
    title: "Banking Sector Prepares for Interest Rate Changes",
    industry: "Finance",
    date: "5hours ago",
    tag: "Interest Rates"
  },
  {
    id: 4,
    title: "Renewable Energy Investments Reach All-Time High",
    industry: "Energy",
    date: "6hours ago",
    tag: "Renewables"
  },
  {
    id: 5,
    title: "Consumer Spending Patterns Shift in Post-Pandemic Era",
    industry: "Consumer Goods",
    date: "8hours ago",
    tag: "Consumer Behavior"
  },
  {
    id: 6,
    title: "Commercial Real Estate Faces Challenges in Remote Work Era",
    industry: "Real Estate",
    date: "1day ago",
    tag: "Commercial Property"
  }
];

const IndustryOverviewPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter industries based on active tab
  const filteredIndustries = activeTab === 'all' 
    ? industriesData 
    : industriesData.filter(industry => industry.id === activeTab);

  return (
    <Layout>
        <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Overview</h1>
            <p className="text-gray-600">Explore market data and insights across multiple industries</p>
        </div>
        
        {/* Industry filter tabs */}
        <div className="flex flex-wrap border-b mb-6 overflow-x-auto">
            <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('all')}
            >
            All Industries
            </button>
            {industriesData.map(industry => (
            <button
                key={industry.id}
                className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === industry.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab(industry.id)}
            >
                {industry.name}
            </button>
            ))}
        </div>
        
        {/* Industries grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredIndustries.map(industry => (
            <Link 
                key={industry.id} 
                href={`/industry/${industry.id}`}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
                <h2 className="text-xl font-bold text-gray-900 mb-2">{industry.name}</h2>
                <p className="text-gray-700 mb-4 line-clamp-2">{industry.description}</p>
                
                <div className="flex justify-between mb-4">
                <div>
                    <div className="text-sm text-gray-500">Market Cap</div>
                    <div className="font-medium">{industry.marketCap}</div>
                </div>
                <div>
                    <div className="text-sm text-gray-500">YoY Growth</div>
                    <div className={`font-medium ${industry.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {industry.growth}
                    </div>
                </div>
                </div>
                
                <div>
                <div className="text-sm text-gray-500 mb-1">Top Companies</div>
                <div className="flex flex-wrap gap-2">
                    {industry.topCompanies.map(ticker => (
                    <Link 
                        key={ticker} 
                        href={`/industry/stock/${ticker}`}
                        className="bg-gray-100 text-blue-600 px-2 py-1 rounded text-sm hover:bg-gray-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {ticker}
                    </Link>
                    ))}
                </div>
                </div>
            </Link>
            ))}
        </div>
        
        {/* Trending Companies Section */}
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Trending Companies</h2>
            <Link href="/trending" className="text-blue-600 hover:underline text-sm">View All</Link>
            </div>
            
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left">Ticker</th>
                    <th className="py-3 px-4 text-left">Company</th>
                    <th className="py-3 px-4 text-left">Industry</th>
                    <th className="py-3 px-4 text-right">Market Cap</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-right">Change</th>
                </tr>
                </thead>
                <tbody>
                {trendingCompanies.map((company) => (
                    <tr key={company.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                        <Link href={`/industry/stock/${company.ticker}`} className="text-blue-600 hover:underline font-medium">
                        {company.ticker}
                        </Link>
                    </td>
                    <td className="py-3 px-4">{company.name}</td>
                    <td className="py-3 px-4">{company.industry}</td>
                    <td className="py-3 px-4 text-right">{company.marketCap}</td>
                    <td className="py-3 px-4 text-right">${company.price.toFixed(2)}</td>
                    <td className={`py-3 px-4 text-right ${company.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {company.change >= 0 ? '+' : ''}{company.change}%
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        
        {/* Industry News Section */}
        <div>
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Latest Industry News</h2>
            <Link href="/news" className="text-blue-600 hover:underline text-sm">View All</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingNews.map((news) => (
                <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                    <div className="mb-3 flex justify-between">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {news.industry}
                    </span>
                    <span className="text-gray-500 text-sm">{news.date}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 text-lg">{news.title}</h3>
                    <div className="flex items-center mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{news.tag}</span>
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

export default IndustryOverviewPage;