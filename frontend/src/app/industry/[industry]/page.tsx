'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Dummy data for industry overview
const industryData = {
  name: "Healthcare",
  description: "The healthcare industry encompasses a wide range of services and products designed to treat patients and maintain or restore health through prevention, diagnosis, treatment, and management of illness and disease.",
  marketSize: "$8.45 trillion",
  growthRate: "5.4% CAGR",
  keyDrivers: [
    "Aging global population",
    "Rising prevalence of chronic diseases",
    "Technological advancements in medical devices and treatments",
    "Increasing healthcare expenditure in developing countries"
  ],
  challenges: [
    "Rising healthcare costs",
    "Regulatory complexities",
    "Healthcare workforce shortages",
    "Integration of new technologies"
  ]
};

// Dummy data for top 10 companies
const topCompanies = [
  { 
    id: 1, 
    ticker: "TSLA", 
    name: "Tesla, Inc.", 
    marketCap: "361.41B", 
    price: 361.41, 
    change: 2.5, 
    volume: "24.5M" 
  },
  { 
    id: 2, 
    ticker: "UNH", 
    name: "UnitedHealth Group Inc.", 
    marketCap: "505.32B", 
    price: 542.76, 
    change: -0.8, 
    volume: "3.1M" 
  },
  { 
    id: 3, 
    ticker: "JNJ", 
    name: "Johnson & Johnson", 
    marketCap: "427.15B", 
    price: 155.28, 
    change: 1.2, 
    volume: "6.2M" 
  },
  { 
    id: 4, 
    ticker: "PFE", 
    name: "Pfizer Inc.", 
    marketCap: "159.47B", 
    price: 28.35, 
    change: -1.5, 
    volume: "22.4M" 
  },
  { 
    id: 5, 
    ticker: "ABT", 
    name: "Abbott Laboratories", 
    marketCap: "196.23B", 
    price: 112.47, 
    change: 0.7, 
    volume: "5.3M" 
  },
  { 
    id: 6, 
    ticker: "MRK", 
    name: "Merck & Co., Inc.", 
    marketCap: "315.89B", 
    price: 124.82, 
    change: 0.3, 
    volume: "7.5M" 
  },
  { 
    id: 7, 
    ticker: "TMO", 
    name: "Thermo Fisher Scientific Inc.", 
    marketCap: "223.76B", 
    price: 583.14, 
    change: 1.8, 
    volume: "1.2M" 
  },
  { 
    id: 8, 
    ticker: "LLY", 
    name: "Eli Lilly and Company", 
    marketCap: "787.34B", 
    price: 829.45, 
    change: 2.1, 
    volume: "2.8M" 
  },
  { 
    id: 9, 
    ticker: "DHR", 
    name: "Danaher Corporation", 
    marketCap: "187.45B", 
    price: 252.76, 
    change: 0.9, 
    volume: "1.7M" 
  },
  { 
    id: 10, 
    ticker: "MCK", 
    name: "McKesson Corporation", 
    marketCap: "47.96B", 
    price: 361.41, 
    change: -0.6, 
    volume: "0.8M" 
  }
];

// Dummy news data
const industryNews = [
  {
    id: 1,
    title: "Healthcare Industry Set for Major Digital Transformation",
    date: "3hours ago",
    tag: "Digital Health"
  },
  {
    id: 2,
    title: "New Regulations Impact Pharmaceutical Supply Chains",
    date: "5hours ago",
    tag: "Regulation"
  },
  {
    id: 3,
    title: "Hospital Staffing Shortages Reach Critical Levels",
    date: "8hours ago",
    tag: "Workforce"
  },
  {
    id: 4,
    title: "Healthcare AI Investment Reaches Record High",
    date: "1day ago",
    tag: "AI"
  }
];

const IndustryPage = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const renderTabContent = () => {
    switch(selectedTab) {
      case 'overview':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Industry Overview</h3>
            <p className="text-gray-700 mb-4">{industryData.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-900">Market Size</h4>
                <p className="text-gray-700">{industryData.marketSize}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Growth Rate</h4>
                <p className="text-gray-700">{industryData.growthRate}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Key Drivers</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {industryData.keyDrivers.map((driver, index) => (
                  <li key={index}>{driver}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Challenges</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {industryData.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'companies':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Top Companies</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left">Ticker</th>
                    <th className="py-3 px-4 text-left">Company</th>
                    <th className="py-3 px-4 text-right">Market Cap</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-right">Change</th>
                    <th className="py-3 px-4 text-right">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {topCompanies.map((company) => (
                    <tr key={company.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <Link href={`/industry/stock/${company.ticker}`} className="text-blue-600 hover:underline font-medium">
                          {company.ticker}
                        </Link>
                      </td>
                      <td className="py-3 px-4">{company.name}</td>
                      <td className="py-3 px-4 text-right">${company.marketCap}</td>
                      <td className="py-3 px-4 text-right">${company.price.toFixed(2)}</td>
                      <td className={`py-3 px-4 text-right ${company.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {company.change >= 0 ? '+' : ''}{company.change}%
                      </td>
                      <td className="py-3 px-4 text-right">{company.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'trends':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Industry Trends</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Technology Adoption</h4>
                <p className="text-gray-700">Healthcare providers are increasingly adopting digital health technologies, including telemedicine, AI-assisted diagnostics, and electronic health records to improve care delivery and operational efficiency.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Value-Based Care</h4>
                <p className="text-gray-700">The industry is shifting from fee-for-service to value-based care models that emphasize patient outcomes and cost reduction rather than service volume.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Consolidation</h4>
                <p className="text-gray-700">Healthcare organizations are pursuing mergers and acquisitions to achieve scale, reduce costs, and expand service offerings in an increasingly competitive environment.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Personalized Medicine</h4>
                <p className="text-gray-700">Advances in genomics and data analytics are enabling more personalized treatment approaches tailored to individual patient characteristics.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{industryData.name} Industry</h1>
        <p className="text-gray-600">Comprehensive analysis and data for the healthcare sector</p>
      </div>
      
      {/* Tab navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${selectedTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${selectedTab === 'companies' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedTab('companies')}
        >
          Top Companies
        </button>
        <button
          className={`px-4 py-2 font-medium ${selectedTab === 'trends' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedTab('trends')}
        >
          Trends
        </button>
      </div>
      
      {/* Tab content */}
      {renderTabContent()}
      
      {/* Industry News Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Industry News</h2>
          <Link href="/news" className="text-blue-600 hover:underline text-sm">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {industryNews.map((news) => (
            <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="bg-gray-200 h-40 mb-3 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
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
  );
};

export default IndustryPage;