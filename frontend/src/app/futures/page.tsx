
'use client'
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
// import {
//     fetchEconomicIndicators,
//     fetchFuturesData, // Will be implemented when API is available
//     fetchFuturesSentiment, // Will be implemented when API is available
//     fetchMarketNews
// } from '@/services/api';

// Helper functions
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
};

const FuturesPage = () => {
    // State variables
    const [activeTab, setActiveTab] = useState('market-intelligence');
    const [selectedFuture, setSelectedFuture] = useState('ES');
    const [timeframe, setTimeframe] = useState('daily');
    const [loading, setLoading] = useState(true);
    interface MarketData {
        [key: string]: {
            currentPrice: number;
            dailyChange: number;
            dailyChangePercent: number;
            volume: number;
            openInterest: number;
            volatility: number;
            support: number[];
            resistance: number[];
            sentiment: number;
            aiAnalysis: {
                summary: string;
                keyLevels: string;
                unusualActivity: string;
                correlations: {
                    strengthening: string[];
                    weakening: string[];
                    anomalies: string;
                };
                riskAssessment: {
                    overnightGapRisk: string;
                    volatilityOutlook: string;
                    eventRisks: string[];
                };
            };
            calendarSpreads: {
                frontMonth: string;
                backMonth: string;
                spread: number;
                zScore: number;
            }[];
            seasonalPatterns: {
                currentPhase: string;
                consistency: string;
                averageReturn: string;
            };
            recentActivity: {
                time: string;
                price: number;
                volume: number;
                note: string;
            }[];
        };
    }
    
    interface NewsItem {
        id: number;
        title: string;
        date: string;
        tag: string;
        snippet: string;
    }
    
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [showAiInsights, setShowAiInsights] = useState(true);

    // Dummy data for futures contracts
    const futuresContracts = useMemo(() => [
        { symbol: 'ES', name: 'E-mini S&P 500', exchange: 'CME' },
        { symbol: 'NQ', name: 'E-mini Nasdaq-100', exchange: 'CME' },
        { symbol: 'YM', name: 'E-mini Dow', exchange: 'CBOT' },
        { symbol: 'CL', name: 'Crude Oil', exchange: 'NYMEX' },
        { symbol: 'GC', name: 'Gold', exchange: 'COMEX' },
        { symbol: 'ZB', name: '30-Year U.S. Treasury Bonds', exchange: 'CBOT' },
        { symbol: 'ZN', name: '10-Year U.S. Treasury Notes', exchange: 'CBOT' },
        { symbol: 'ZF', name: '5-Year U.S. Treasury Notes', exchange: 'CBOT' },
        { symbol: '6E', name: 'Euro FX', exchange: 'CME' },
        { symbol: '6J', name: 'Japanese Yen', exchange: 'CME' }
    ], []);

    // Dummy market data - would be replaced with API data
    const dummyMarketData = useMemo(() => ({
        ES: {
            currentPrice: 5274.25,
            dailyChange: 32.50,
            dailyChangePercent: 0.62,
            volume: 1245678,
            openInterest: 2876543,
            volatility: 14.2,
            support: [5220, 5180, 5150],
            resistance: [5300, 5350, 5400],
            sentiment: 0.65, // Scale from -1 (bearish) to 1 (bullish)
            aiAnalysis: {
                summary: "The E-mini S&P 500 futures are showing strong momentum with above-average volume. Recent price action suggests accumulation by institutional investors, with key resistance at 5300 being tested. Economic indicators point to a supportive environment for equity futures in the near term.",
                keyLevels: "Watch for potential breakout above 5300, which could trigger a move toward 5350. Support at 5220 has been reinforced by recent trading patterns.",
                unusualActivity: "Significant options activity detected at the 5300 strike price for the current month expiration.",
                correlations: {
                    strengthening: ["NQ", "YM"],
                    weakening: ["GC", "ZB"],
                    anomalies: "Unusually weak correlation with the VIX index compared to historical patterns."
                },
                riskAssessment: {
                    overnightGapRisk: "Moderate",
                    volatilityOutlook: "Expected to remain within 13-16 range",
                    eventRisks: ["FOMC minutes tomorrow", "CPI data on Thursday"]
                }
            },
            calendarSpreads: [
                { frontMonth: "Jun 2025", backMonth: "Sep 2025", spread: -5.25, zScore: 1.2 },
                { frontMonth: "Sep 2025", backMonth: "Dec 2025", spread: -4.75, zScore: 0.3 }
            ],
            seasonalPatterns: {
                currentPhase: "Historically strong period (Apr-May)",
                consistency: "75% of years show positive returns in this period",
                averageReturn: "+2.3% over next 30 days historically"
            },
            recentActivity: [
                { time: "10:35 AM", price: 5272.50, volume: 1245, note: "Rejected at resistance" },
                { time: "10:15 AM", price: 5281.75, volume: 3421, note: "High volume test of 5280" },
                { time: "9:45 AM", price: 5265.00, volume: 2145, note: "Support bounce" },
                { time: "9:30 AM", price: 5258.25, volume: 4532, note: "Opening range" },
            ]
        },
        NQ: {
            currentPrice: 18235.75,
            dailyChange: 145.50,
            dailyChangePercent: 0.80,
            volume: 987654,
            openInterest: 1876543,
            volatility: 18.7,
            support: [18050, 17900, 17800],
            resistance: [18300, 18450, 18600],
            sentiment: 0.78,
            aiAnalysis: {
                summary: "Nasdaq futures showing relative strength compared to other equity indices. Technology sector earnings have been driving positive sentiment. The current momentum appears sustainable with strong underlying fundamentals.",
                keyLevels: "Critical resistance at 18300 - a breakthrough could accelerate the move. Strong support established at 18050 based on recent consolidation pattern.",
                unusualActivity: "Block trades detected in the last session suggest institutional positioning ahead of major tech earnings.",
                correlations: {
                    strengthening: ["SOX (Semiconductor Index)", "SMH (Semiconductor ETF)"],
                    weakening: ["XLU (Utilities)", "KRE (Regional Banks)"],
                    anomalies: "The NQ/ES ratio is approaching extreme levels, suggesting potential mean reversion."
                },
                riskAssessment: {
                    overnightGapRisk: "Elevated due to tech earnings schedule",
                    volatilityOutlook: "Likely to expand during earnings season",
                    eventRisks: ["NVIDIA earnings next week", "Fed speakers discussing tech valuations"]
                }
            },
            calendarSpreads: [
                { frontMonth: "Jun 2025", backMonth: "Sep 2025", spread: -35.25, zScore: 1.8 },
                { frontMonth: "Sep 2025", backMonth: "Dec 2025", spread: -28.50, zScore: 0.7 }
            ],
            seasonalPatterns: {
                currentPhase: "Historically mixed in late April",
                consistency: "60% positive in this period since 2010",
                averageReturn: "+1.8% over next 30 days historically"
            },
            recentActivity: [
                { time: "10:35 AM", price: 18232.50, volume: 845, note: "Testing session high" },
                { time: "10:15 AM", price: 18198.75, volume: 1421, note: "Bounce from VWAP" },
                { time: "9:45 AM", price: 18176.50, volume: 1045, note: "Consolidation" },
                { time: "9:30 AM", price: 18165.25, volume: 2532, note: "Opening range" },
            ]
        },
        CL: {
            currentPrice: 82.35,
            dailyChange: -1.15,
            dailyChangePercent: -1.38,
            volume: 654321,
            openInterest: 1576543,
            volatility: 24.5,
            support: [81.50, 80.75, 79.80],
            resistance: [83.20, 84.50, 85.75],
            sentiment: -0.15,
            aiAnalysis: {
                summary: "Crude oil futures are experiencing downward pressure due to global demand concerns and higher-than-expected inventory builds. Technical signals suggest a potential consolidation phase before the next directional move.",
                keyLevels: "The 82.00 level represents a psychological support that's being tested. The 200-day moving average at 81.50 provides additional technical support.",
                unusualActivity: "Significant put option activity at the 80.00 strike suggests hedging against further downside.",
                correlations: {
                    strengthening: ["XLE (Energy ETF)", "USD/RUB"],
                    weakening: ["Gold", "Inflation expectations"],
                    anomalies: "Divergence from natural gas prices is at a 6-month extreme."
                },
                riskAssessment: {
                    overnightGapRisk: "High due to EIA inventory report tomorrow",
                    volatilityOutlook: "Expected to remain elevated with geopolitical tensions",
                    eventRisks: ["OPEC+ comments", "EIA inventory data", "Middle East developments"]
                }
            },
            calendarSpreads: [
                { frontMonth: "Jun 2025", backMonth: "Jul 2025", spread: 0.45, zScore: -0.8 },
                { frontMonth: "Jul 2025", backMonth: "Aug 2025", spread: 0.38, zScore: -0.5 }
            ],
            seasonalPatterns: {
                currentPhase: "Approaching seasonal strength period (May-July)",
                consistency: "65% positive in May over last decade",
                averageReturn: "+3.2% in May historically"
            },
            recentActivity: [
                { time: "10:35 AM", price: 82.32, volume: 975, note: "Rejected at VWAP" },
                { time: "10:15 AM", price: 82.56, volume: 1245, note: "Failed test of 82.50" },
                { time: "9:45 AM", price: 82.28, volume: 854, note: "Support test" },
                { time: "9:30 AM", price: 82.42, volume: 1532, note: "Opening range" },
            ]
        },
        // Additional futures contracts would be added here
        GC: {
            currentPrice: 2342.80,
            dailyChange: 15.60,
            dailyChangePercent: 0.67,
            volume: 432567,
            openInterest: 1245678,
            volatility: 16.8,
            support: [2320, 2300, 2275],
            resistance: [2350, 2380, 2400],
            sentiment: 0.45,
            aiAnalysis: {
                summary: "Gold futures continue to find support from economic uncertainty and inflation concerns. Technical picture remains bullish with a series of higher lows forming on the daily chart.",
                keyLevels: "Key resistance at $2350 is being tested - a breakthrough could target the all-time high. Strong support at $2320 from recent consolidation.",
                unusualActivity: "Unusual increase in call option activity at $2400 strike for June expiration.",
                correlations: {
                    strengthening: ["Silver", "Treasury Bonds"],
                    weakening: ["USD Index", "Real Yields"],
                    anomalies: "Correlation with equity markets has turned positive recently, breaking from historical pattern."
                },
                riskAssessment: {
                    overnightGapRisk: "Low to moderate",
                    volatilityOutlook: "Expected to decrease after recent price surge",
                    eventRisks: ["Fed speakers tomorrow", "Employment data Friday"]
                }
            },
            calendarSpreads: [
                { frontMonth: "Jun 2025", backMonth: "Aug 2025", spread: -2.40, zScore: 0.3 },
                { frontMonth: "Aug 2025", backMonth: "Dec 2025", spread: -6.80, zScore: 0.6 }
            ],
            seasonalPatterns: {
                currentPhase: "Historically neutral to slightly positive (Apr-May)",
                consistency: "60% of years show positive returns in this period",
                averageReturn: "+1.1% over next 30 days historically"
            },
            recentActivity: [
                { time: "10:35 AM", price: 2342.50, volume: 845, note: "Resistance test" },
                { time: "10:15 AM", price: 2338.20, volume: 1240, note: "20-period EMA bounce" },
                { time: "9:45 AM", price: 2335.60, volume: 965, note: "Support level hold" },
                { time: "9:30 AM", price: 2336.80, volume: 1845, note: "Opening range" },
            ]
        },
        ZB: {
            currentPrice: 118.06,
            dailyChange: -0.17,
            dailyChangePercent: -0.14,
            volume: 354821,
            openInterest: 964532,
            volatility: 12.3,
            support: [117.80, 117.25, 116.75],
            resistance: [118.50, 119.00, 119.75],
            sentiment: -0.25,
            aiAnalysis: {
                summary: "Treasury bond futures under pressure due to persistent inflation concerns and expectations for fewer Fed rate cuts. Technical picture shows a consolidation pattern after the recent decline.",
                keyLevels: "Immediate support at 117.80 is critical - breaking below could accelerate selling. Resistance at 118.50 has been firm.",
                unusualActivity: "Unusual put/call ratio with elevated volume in July puts.",
                correlations: {
                    strengthening: ["Utility stocks", "Gold"],
                    weakening: ["Financial sector", "Small caps"],
                    anomalies: "The correlation with equities is more negative than usual, suggesting heightened risk-off positioning."
                },
                riskAssessment: {
                    overnightGapRisk: "Moderate",
                    volatilityOutlook: "Expected to increase with upcoming inflation data",
                    eventRisks: ["Treasury auctions this week", "CPI data Thursday"]
                }
            },
            calendarSpreads: [
                { frontMonth: "Jun 2025", backMonth: "Sep 2025", spread: -0.42, zScore: 1.1 },
                { frontMonth: "Sep 2025", backMonth: "Dec 2025", spread: -0.38, zScore: 0.8 }
            ],
            seasonalPatterns: {
                currentPhase: "Historically weak period (Apr-Jun)",
                consistency: "65% of years show negative returns in this period",
                averageReturn: "-1.2% over next 30 days historically"
            },
            recentActivity: [
                { time: "10:35 AM", price: 118.06, volume: 645, note: "Support test" },
                { time: "10:15 AM", price: 118.12, volume: 832, note: "Resistance rejection" },
                { time: "9:45 AM", price: 118.21, volume: 754, note: "Failed breakout attempt" },
                { time: "9:30 AM", price: 118.15, volume: 1243, note: "Opening range" },
            ]
        }
    }), []);

    // Dummy news related to futures - would be replaced with API data
    const dummyNews = [
        {
            id: 1,
            title: "Equity Futures Rally Following Strong Tech Earnings",
            date: "2hours ago",
            tag: "Equity Futures",
            snippet: "S&P 500 and Nasdaq futures climb as major technology companies report better-than-expected quarterly results."
        },
        {
            id: 2,
            title: "Oil Futures Decline on Inventory Build",
            date: "4hours ago",
            tag: "Energy Futures",
            snippet: "Crude oil futures fell after data showed U.S. crude stockpiles increased more than anticipated, raising concerns about demand."
        },
        {
            id: 3,
            title: "Fed Comments Spark Treasury Futures Volatility",
            date: "6hours ago",
            tag: "Treasury Futures",
            snippet: "U.S. Treasury futures experienced increased volatility following Federal Reserve officials' comments on potential interest rate paths."
        },
        {
            id: 4,
            title: "Gold Futures Rise on Safe-Haven Demand",
            date: "8hours ago",
            tag: "Metals Futures",
            snippet: "Gold futures advanced as geopolitical tensions and inflation concerns fueled demand for the safe-haven asset."
        },
        {
            id: 5,
            title: "Agriculture Futures Mixed on Weather Forecasts",
            date: "1day ago",
            tag: "Agriculture Futures",
            snippet: "Corn and soybean futures showed mixed performance as updated weather forecasts presented a varied outlook for key growing regions."
        }
    ];

    // Dummy trading volume data for visualization
    // const volumeData = {
    //     labels: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
    //     datasets: [
    //         {
    //             ESdata: [4532, 3245, 2876, 2145, 3421, 1876, 2345, 1985, 2654, 3123, 3875, 4532, 5421, 6532],
    //             NQdata: [2532, 2145, 1876, 1732, 2421, 1576, 1845, 1585, 1954, 2323, 2675, 3532, 4021, 4832],
    //             CLdata: [1532, 1245, 1276, 1545, 1821, 1376, 1445, 1285, 1454, 1623, 1875, 2032, 2221, 2432],
    //         }
    //     ]
    // };

    // Effect to load initial data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // When API is ready, replace with actual fetch calls
                // const futuresData = await fetchFuturesData(selectedFuture);
                // const sentimentData = await fetchFuturesSentiment(selectedFuture);
                // const newsData = await fetchMarketNews('futures');

                // For now, use dummy data
                setMarketData(dummyMarketData);
                setNews(dummyNews);

                setLoading(false);
            } catch (error) {
                console.error('Error loading futures data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, [selectedFuture, dummyMarketData, dummyNews]); // Added dummyMarketData and dummyNews to the dependency array

    // Get current future data
    const currentFutureData = useMemo(() => {
        if (!marketData || !marketData[selectedFuture]) return null;
        return marketData[selectedFuture];
    }, [marketData, selectedFuture]);

    // Get current contract name
    const currentContractName = useMemo(() => {
        const contract = futuresContracts.find(c => c.symbol === selectedFuture);
        return contract ? contract.name : '';
    }, [selectedFuture, futuresContracts]);

    // Render loading state
    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-200 mb-3"></div>
                            <div className="text-blue-600">Loading futures data...</div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Futures Intelligence</h1>
                    <div className="text-gray-600">AI-powered market analysis for futures traders</div>
                </div>

                {/* Futures selection dropdown and AI insights toggle */}
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <div className="mr-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Futures Contract</label>
                            <select
                                className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={selectedFuture}
                                onChange={(e) => setSelectedFuture(e.target.value)}
                            >
                                {futuresContracts.map((contract) => (
                                    <option key={contract.symbol} value={contract.symbol}>
                                        {contract.symbol} - {contract.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
                            <div className="flex border border-gray-300 rounded-md overflow-hidden">
                                <button
                                    className={`px-3 py-2 text-sm ${timeframe === 'daily' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                    onClick={() => setTimeframe('daily')}
                                >
                                    Daily
                                </button>
                                <button
                                    className={`px-3 py-2 text-sm ${timeframe === 'weekly' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                    onClick={() => setTimeframe('weekly')}
                                >
                                    Weekly
                                </button>
                                <button
                                    className={`px-3 py-2 text-sm ${timeframe === 'monthly' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                                    onClick={() => setTimeframe('monthly')}
                                >
                                    Monthly
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center mr-2">
                            <input
                                id="ai-insights"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={showAiInsights}
                                onChange={() => setShowAiInsights(!showAiInsights)}
                            />
                            <label htmlFor="ai-insights" className="ml-2 text-sm text-gray-700">
                                AI Insights
                            </label>
                        </div>

                        <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
                            <span>Live Analysis</span>
                        </div>
                    </div>
                </div>

                {/* Futures price overview card */}
                {currentFutureData && (
                    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
                        <div className="flex flex-wrap justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">{currentContractName} Futures ({selectedFuture})</h2>
                                <div className="text-sm text-gray-600">
                                    Last updated: {new Date().toLocaleTimeString()} ET | {formatDate(new Date().toISOString())}
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <div className="text-3xl font-bold">{formatNumber(currentFutureData.currentPrice)}</div>
                                <div className={`flex items-center text-${currentFutureData.dailyChange >= 0 ? 'green' : 'red'}-600`}>
                                    <span>
                                        {currentFutureData.dailyChange >= 0 ? '+' : ''}
                                        {formatNumber(currentFutureData.dailyChange)} ({currentFutureData.dailyChange >= 0 ? '+' : ''}
                                        {currentFutureData.dailyChangePercent.toFixed(2)}%)
                                    </span>
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {currentFutureData.dailyChange >= 0 ? (
                                            <path d="M5 15l7-7 7 7"></path>
                                        ) : (
                                            <path d="M19 9l-7 7-7-7"></path>
                                        )}
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="text-sm text-gray-600 mb-1">Volume</div>
                                <div className="font-medium">{currentFutureData.volume.toLocaleString()}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="text-sm text-gray-600 mb-1">Open Interest</div>
                                <div className="font-medium">{currentFutureData.openInterest.toLocaleString()}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="text-sm text-gray-600 mb-1">Volatility</div>
                                <div className="font-medium">{currentFutureData.volatility}%</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="text-sm text-gray-600 mb-1">Sentiment</div>
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                        <div
                                            className={`h-2.5 rounded-full ${currentFutureData.sentiment > 0.2
                                                ? 'bg-green-600'
                                                : currentFutureData.sentiment < -0.2
                                                    ? 'bg-red-600'
                                                    : 'bg-yellow-500'
                                                }`}
                                            style={{
                                                width: `${((currentFutureData.sentiment + 1) / 2) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-sm">
                                        {currentFutureData.sentiment > 0.2
                                            ? 'Bullish'
                                            : currentFutureData.sentiment < -0.2
                                                ? 'Bearish'
                                                : 'Neutral'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Chart placeholder */}
                        <div className="w-full h-72 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-center text-gray-500">
                                <svg
                                    className="w-12 h-12 mx-auto text-gray-400 mb-2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                                </svg>
                                <p>Price chart for {selectedFuture} would appear here</p>
                            </div>
                        </div>

                        {/* Key levels */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Support Levels</h3>
                                <div className="space-y-2">
                                    {currentFutureData.support.map((level, index) => (
                                        <div key={`support-${index}`} className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                            <span className="font-medium">{formatNumber(level)}</span>
                                            {index === 0 && (
                                                <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                                                    Strong
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Resistance Levels</h3>
                                <div className="space-y-2">
                                    {currentFutureData.resistance.map((level, index) => (
                                        <div key={`resistance-${index}`} className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                            <span className="font-medium">{formatNumber(level)}</span>
                                            {index === 0 && (
                                                <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded">
                                                    Critical
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab navigation */}
                <div className="mb-6 border-b">
                    <nav className="flex flex-wrap -mb-px">
                        <button
                            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'market-intelligence'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('market-intelligence')}
                        >
                            Market Intelligence
                        </button>
                        <button
                            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'correlation-matrix'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('correlation-matrix')}
                        >
                            Correlation Matrix
                        </button>
                        <button
                            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'spread-analysis'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('spread-analysis')}
                        >
                            Spread Analysis
                        </button>
                        <button
                            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'risk-assessment'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('risk-assessment')}
                        >
                            Risk Assessment
                        </button>
                        <button
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'seasonal-patterns'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('seasonal-patterns')}
                        >
                            Seasonal Patterns
                        </button>
                    </nav>
                </div>
                {/* Tab content */}
                <div className="mb-8">
                    {/* Market Intelligence Tab */}
                    {activeTab === 'market-intelligence' && currentFutureData && (
                        <div>
                            {/* AI Analysis Section */}
                            {showAiInsights && (
                                <div className="mb-6 relative overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                                    <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center mb-4">
                                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-xl font-bold text-blue-800">AI Market Analysis</h2>

                                            {/* Animated typing effect indicator */}
                                            <div className="ml-3 flex text-blue-600 text-sm items-center">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
                                                <span>Live Intelligence</span>
                                            </div>
                                        </div>

                                        <div className="bg-white bg-opacity-70 rounded-lg p-4 mb-4 border border-blue-100">
                                            <h3 className="font-medium text-blue-800 mb-2">Summary</h3>
                                            <p className="text-gray-800">{currentFutureData.aiAnalysis.summary}</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="bg-white bg-opacity-70 rounded-lg p-4 border border-blue-100">
                                                <h3 className="font-medium text-blue-800 mb-2">Key Price Levels</h3>
                                                <p className="text-gray-800">{currentFutureData.aiAnalysis.keyLevels}</p>
                                            </div>
                                            <div className="bg-white bg-opacity-70 rounded-lg p-4 border border-blue-100">
                                                <h3 className="font-medium text-blue-800 mb-2">Unusual Activity</h3>
                                                <p className="text-gray-800">{currentFutureData.aiAnalysis.unusualActivity}</p>
                                            </div>
                                        </div>

                                        <div className="bg-white bg-opacity-70 rounded-lg p-4 border border-blue-100">
                                            <h3 className="font-medium text-blue-800 mb-2">Correlation Analysis</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-600 mb-1">Strengthening Correlations</h4>
                                                    <ul className="list-disc list-inside text-gray-800 text-sm">
                                                        {currentFutureData.aiAnalysis.correlations.strengthening.map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-600 mb-1">Weakening Correlations</h4>
                                                    <ul className="list-disc list-inside text-gray-800 text-sm">
                                                        {currentFutureData.aiAnalysis.correlations.weakening.map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-600 mb-1">Anomalies</h4>
                                                    <p className="text-gray-800 text-sm">{currentFutureData.aiAnalysis.correlations.anomalies}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Recent Activity */}
                            <div className="mb-6 bg-white rounded-lg shadow p-5">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Price Action</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Time
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Volume
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Note
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentFutureData.recentActivity.map((activity, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.time}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatNumber(activity.price)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.volume.toLocaleString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.note}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Related News */}
                            <div className="bg-white rounded-lg shadow p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-900">Futures Market News</h2>

                                        {/* Animated typing effect indicator */}
                                        <div className="ml-3 flex text-indigo-600 text-sm items-center">
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-1 animate-pulse"></div>
                                            <span>AI Curated</span>
                                        </div>
                                    </div>
                                    <Link href="/news" className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium flex items-center">
                                        View All News
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {news.length > 0 ? (
                                        news.map(item => (
                                            <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{item.snippet}</p>
                                                <div className="flex items-center text-xs text-gray-500">
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
                                        ))
                                    ) : (
                                        <div className="text-center text-gray-500 py-4">No relevant news available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Correlation Matrix Tab */}
                    {activeTab === 'correlation-matrix' && (
                        <div>
                            <div className="bg-white rounded-lg shadow p-5 mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Correlation Heatmap</h2>
                                </div>

                                {/* Correlation matrix placeholder */}
                                <div className="w-full h-96 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
                                    <div className="text-center text-gray-500">
                                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                                        </svg>
                                        <p>Correlation matrix visualization would appear here</p>
                                    </div>
                                </div>

                                {showAiInsights && (
                                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100">
                                        <div className="flex items-center mb-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-medium text-purple-800">AI Correlation Insights</h3>
                                        </div>
                                        <ul className="space-y-2 ml-8">
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-2">•</span>
                                                <span className="text-gray-800">Equity index futures (ES, NQ, YM) are showing stronger-than-usual correlation, suggesting broad market sentiment is the dominant factor.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-2">•</span>
                                                <span className="text-gray-800">Gold futures (GC) and Treasury futures (ZB, ZN) correlation has weakened this week, breaking from the typical safe-haven relationship.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-2">•</span>
                                                <span className="text-gray-800">Euro (6E) and Yen (6J) futures are showing divergent correlations with equity markets, with Euro positively correlated and Yen negatively correlated.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-2">•</span>
                                                <span className="text-gray-800">Crude oil (CL) correlation with equities has strengthened, suggesting market participants are currently viewing oil as a growth indicator rather than an inflation concern.</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-lg shadow p-5">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Correlation Strength Over Time</h2>

                                {/* Correlation chart placeholder */}
                                <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
                                    <div className="text-center text-gray-500">
                                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                                        </svg>
                                        <p>Correlation time series chart would appear here</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Strongest Positive Correlations</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                                <span className="font-medium text-gray-800">ES - NQ: +0.92</span>
                                                <span className="ml-2 text-gray-600 text-sm">S&P 500 - Nasdaq</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                                <span className="font-medium text-gray-800">ZB - ZN: +0.89</span>
                                                <span className="ml-2 text-gray-600 text-sm">30Y - 10Y Treasuries</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                                <span className="font-medium text-gray-800">ES - YM: +0.85</span>
                                                <span className="ml-2 text-gray-600 text-sm">S&P 500 - Dow</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Strongest Negative Correlations</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                                <span className="font-medium text-gray-800">ES - VX: -0.78</span>
                                                <span className="ml-2 text-gray-600 text-sm">S&P 500 - VIX</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                                <span className="font-medium text-gray-800">NQ - ZB: -0.64</span>
                                                <span className="ml-2 text-gray-600 text-sm">Nasdaq - 30Y Treasuries</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                                <span className="font-medium text-gray-800">CL - 6J: -0.52</span>
                                                <span className="ml-2 text-gray-600 text-sm">Crude Oil - Japanese Yen</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Spread Analysis Tab */}
                    {activeTab === 'spread-analysis' && currentFutureData && (
                        <div>
                            <div className="bg-white rounded-lg shadow p-5 mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Calendar Spread Analysis</h2>
                                </div>

                                <div className="overflow-x-auto mb-4">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Front Month
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Back Month
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Spread
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Z-Score
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentFutureData.calendarSpreads.map((spread, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{spread.frontMonth}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spread.backMonth}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(spread.spread)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spread.zScore.toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${Math.abs(spread.zScore) > 1.5
                                                            ? 'bg-red-100 text-red-800'
                                                            : Math.abs(spread.zScore) > 0.8
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-green-100 text-green-800'
                                                            }`}>
                                                            {Math.abs(spread.zScore) > 1.5
                                                                ? 'Extreme'
                                                                : Math.abs(spread.zScore) > 0.8
                                                                    ? 'Notable'
                                                                    : 'Normal'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Term structure chart placeholder */}
                                <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
                                    <div className="text-center text-gray-500">
                                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                                        </svg>
                                        <p>Term structure chart would appear here</p>
                                    </div>
                                </div>

                                {showAiInsights && (
                                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-100">
                                        <div className="flex items-center mb-2">
                                            <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-medium text-teal-800">AI Spread Insights</h3>
                                        </div>
                                        <ul className="space-y-2 ml-8">
                                            <li className="flex items-start">
                                                <span className="text-teal-600 mr-2">•</span>
                                                <span className="text-gray-800">The Jun-Sep spread is showing higher than normal backwardation, which historically has been associated with near-term supply constraints.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-teal-600 mr-2">•</span>
                                                <span className="text-gray-800">Current term structure indicates market expectations for {selectedFuture === 'ES' ? 'continued economic growth' : selectedFuture === 'CL' ? 'potential supply tightness' : 'stable market conditions'} in the near term.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-teal-600 mr-2">•</span>
                                                <span className="text-gray-800">Historical comparison shows the current spread configuration is similar to patterns seen in {selectedFuture === 'ES' ? 'early 2023' : selectedFuture === 'CL' ? 'mid-2022' : 'late 2023'}, which preceded a {selectedFuture === 'ES' ? 'rally' : selectedFuture === 'CL' ? 'price consolidation' : 'period of reduced volatility'}.</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-lg shadow p-5">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Roll Analysis</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Roll Timing Recommendations</h3>

                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                                            <div className="flex items-center mb-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 flex-shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-medium text-gray-800">Optimal Roll Window</h4>
                                            </div>
                                            <p className="text-gray-700 ml-8">For {selectedFuture}, the optimal roll period is typically 5-7 days before expiration. Based on current liquidity and spread conditions, consider rolling positions between May 10-12.</p>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center mb-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 flex-shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-medium text-gray-800">Roll Considerations</h4>
                                            </div>
                                            <ul className="space-y-1 ml-8 text-gray-700">
                                                <li className="flex items-start">
                                                    <span className="text-blue-600 mr-2">•</span>
                                                    <span>Current front month liquidity remains strong</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-blue-600 mr-2">•</span>
                                                    <span>Roll spread is wider than 30-day average by 8%</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-blue-600 mr-2">•</span>
                                                    <span>Back month is showing higher implied volatility</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Historical Roll Performance</h3>

                                        {/* Roll timing chart placeholder */}
                                        <div className="w-full h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
                                            <div className="text-center text-gray-500">
                                                <svg className="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                                                </svg>
                                                <p>Historical roll cost chart would appear here</p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center mb-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 flex-shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-medium text-gray-800">Roll Statistics (Last 12 Months)</h4>
                                            </div>
                                            <div className="space-y-3 ml-8">
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm text-gray-600">Average Roll Cost</span>
                                                        <span className="font-medium text-gray-800">-0.42 points</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm text-gray-600">Best Timing (Days Before Expiry)</span>
                                                        <span className="font-medium text-gray-800">6.3 days</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm text-gray-600">Liquidity Score</span>
                                                        <span className="font-medium text-gray-800">8.4/10</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '84%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Risk Assessment Tab */}
                    {activeTab === 'risk-assessment' && currentFutureData && (
                        <div>
                            <div className="bg-white rounded-lg shadow p-5 mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Risk Assessment</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-2">Overnight Gap Risk</h3>
                                        <div className="flex items-center mb-1">
                                            <span className="text-2xl font-bold mr-2">{currentFutureData.aiAnalysis.riskAssessment.overnightGapRisk}</span>
                                            <div className={`px-2 py-1 text-xs font-semibold rounded-full ${currentFutureData.aiAnalysis.riskAssessment.overnightGapRisk === 'High'
                                                ? 'bg-red-100 text-red-800'
                                                : currentFutureData.aiAnalysis.riskAssessment.overnightGapRisk === 'Moderate'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}>
                                                {currentFutureData.aiAnalysis.riskAssessment.overnightGapRisk}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">Expected max gap: ±0.75%</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-2">Volatility Outlook</h3>
                                        <div className="text-lg font-medium text-gray-800 mb-1">
                                            {currentFutureData.aiAnalysis.riskAssessment.volatilityOutlook}
                                        </div>
                                        <p className="text-sm text-gray-600">Based on options implied volatility and recent price action</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-2">Event Risk Exposure</h3>
                                        <ul className="space-y-1">
                                            {currentFutureData.aiAnalysis.riskAssessment.eventRisks.map((risk, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-red-500 mr-2">•</span>
                                                    <span className="text-gray-800">{risk}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                {/* Risk scenario analysis */}
                                <div className="mb-4">
                                    <h3 className="font-medium text-gray-900 mb-3">Scenario Analysis</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Scenario
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Price Impact
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Probability
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Key Drivers
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bullish Case</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+2.5% to +4.8%</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30%</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        Stronger economic data, dovish Fed pivot, positive earnings surprises
                                                    </td>
                                                </tr>
                                                <tr className="bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Base Case</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">-0.5% to +1.5%</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">55%</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        Mixed economic signals, stable interest rate outlook, in-line earnings
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bearish Case</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">-2.0% to -6.0%</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15%</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        Inflation resurgence, hawkish Fed commentary, deteriorating economic data
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {showAiInsights && (
                                    <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-lg p-4 border border-red-100">
                                        <div className="flex items-center mb-2">
                                            <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-medium text-red-800">AI Risk Insights</h3>
                                        </div>
                                        <ul className="space-y-2 ml-8">
                                            <li className="flex items-start">
                                                <span className="text-red-600 mr-2">•</span>
                                                <span className="text-gray-800">Elevated likelihood of overnight moves due to global market interconnectedness - consider reducing position size by 15-20% for overnight holds.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-red-600 mr-2">•</span>
                                                <span className="text-gray-800">Current implied volatility is underpricing potential event risk from upcoming economic data releases.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-red-600 mr-2">•</span>
                                                <span className="text-gray-800">Margin requirements are likely to increase by 5-10% in the coming weeks based on exchange volatility adjustment patterns.</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-lg shadow p-5">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Margin & Capital Efficiency</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Margin Requirements</h3>

                                        <div className="space-y-4">
                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-gray-700">Initial Margin</span>
                                                    <span className="font-bold text-gray-900">
                                                        {selectedFuture === 'ES' ? '$12,650' : selectedFuture === 'NQ' ? '$17,500' : '$6,900'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Maintenance Margin</span>
                                                    <span className="font-bold text-gray-900">
                                                        {selectedFuture === 'ES' ? '$11,500' : selectedFuture === 'NQ' ? '$15,800' : '$6,250'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-gray-700">30-Day Margin Trend</span>
                                                    <span className={`font-medium ${selectedFuture === 'ES' ? 'text-green-600' : selectedFuture === 'NQ' ? 'text-red-600' : 'text-gray-600'
                                                        }`}>
                                                        {selectedFuture === 'ES' ? '-3.2%' : selectedFuture === 'NQ' ? '+5.6%' : 'Unchanged'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Expected Change (Next 30 Days)</span>
                                                    <span className={`font-medium ${selectedFuture === 'ES' || selectedFuture === 'NQ' ? 'text-yellow-600' : 'text-green-600'
                                                        }`}>
                                                        {selectedFuture === 'ES' || selectedFuture === 'NQ' ? '+4-8%' : 'Stable'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Capital Efficiency Strategies</h3>

                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                                            <div className="flex items-center mb-2">
                                                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-2 flex-shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-medium text-gray-800">Optimized Strategies</h4>
                                            </div>
                                            <ul className="space-y-2 ml-8 text-gray-700">
                                                <li className="flex items-start">
                                                    <span className="text-indigo-600 mr-2">•</span>
                                                    <span>Consider micro futures for smaller position sizing with identical exposure profile</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-indigo-600 mr-2">•</span>
                                                    <span>Calendar spreads require 25-40% less capital than outright positions</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-indigo-600 mr-2">•</span>
                                                    <span>Current margin efficiency ratio: {selectedFuture === 'ES' ? '8.4:1' : selectedFuture === 'NQ' ? '7.2:1' : '9.1:1'}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        {showAiInsights && (
                                            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                                                <div className="flex items-center mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="font-medium text-indigo-800">AI Capital Recommendation</h4>
                                                </div>
                                                <p className="text-gray-700 ml-8">
                                                    For the current market environment, optimal capital allocation for {selectedFuture} positions is 15-20% of total portfolio value to balance opportunity with overnight gap risk.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Seasonal Patterns Tab */}
                    {activeTab === 'seasonal-patterns' && currentFutureData && (
                        <div>
                            <div className="bg-white rounded-lg shadow p-5 mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Seasonal Analysis</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-2">Current Phase</h3>
                                        <div className="text-lg font-medium text-gray-800 mb-1">
                                            {currentFutureData.seasonalPatterns.currentPhase}
                                        </div>
                                        <p className="text-sm text-gray-600">Based on historical performance analysis</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-2">Historical Consistency</h3>
                                        <div className="text-lg font-medium text-gray-800 mb-1">
                                            {currentFutureData.seasonalPatterns.consistency}
                                        </div>
                                        <p className="text-sm text-gray-600">Frequency of expected pattern occurrence</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-2">Expected Performance</h3>
                                        <div className="text-lg font-medium text-gray-800 mb-1">
                                            {currentFutureData.seasonalPatterns.averageReturn}
                                        </div>
                                        <p className="text-sm text-gray-600">Based on seasonal averages</p>
                                    </div>
                                </div>
                                {/* Seasonal pattern chart placeholder */}
                                <div className="w-full h-80 bg-gray-50 rounded-lg flex items-center justify-center mb-6 border border-gray-200">
                                    <div className="text-center text-gray-500">
                                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                                        </svg>
                                        <p>Seasonal pattern chart would appear here</p>
                                    </div>
                                </div>

                                {showAiInsights && (
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                                        <div className="flex items-center mb-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-medium text-purple-800">AI Seasonal Insights</h3>
                                        </div>
                                        <ul className="space-y-2 ml-8">
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-2">•</span>
                                                <span className="text-gray-800">
                                                    {selectedFuture === 'ES'
                                                        ? 'April-May has historically been a strong period for S&P 500 futures, with positive returns in 75% of years since 2000.'
                                                        : selectedFuture === 'NQ'
                                                            ? 'Nasdaq futures tend to experience higher volatility during May compared to other equity indices.'
                                                            : 'Current seasonal patterns for this contract are showing stronger than usual tendencies.'}
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-2">•</span>
                                                <span className="text-gray-800">The current market environment has stronger fundamental drivers than seasonal factors, potentially diminishing seasonal effects.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-600 mr-2">•</span>
                                                <span className="text-gray-800">
                                                    {selectedFuture === 'ES' || selectedFuture === 'NQ'
                                                        ? 'Seasonal patterns in 2025 are showing deviation from historical norms, possibly due to changing monetary policy environment.'
                                                        : selectedFuture === 'CL'
                                                            ? 'Oil futures seasonal patterns are currently aligned with typical spring patterns despite atypical geopolitical factors.'
                                                            : 'This year is tracking close to the 10-year seasonal average with minimal deviations.'}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-lg shadow p-5">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Key Seasonal Events</h2>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date/Period
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Event
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Historical Impact
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Consistency
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">May 1-15</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">&quot;Sell in May&quot; Period</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {selectedFuture === 'ES' || selectedFuture === 'NQ' ? '-0.8% average' : '+1.2% average'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">65% of years</td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">May FOMC Meeting</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fed Rate Decision</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Increased volatility (±1.2%)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">90% of meetings</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">May Expiration Week</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Options Expiration</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+0.4% average weekly gain</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">70% of years</td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Memorial Day</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Holiday Effect</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {selectedFuture === 'CL' ? '+1.8% week after' : '+0.6% week after'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">75% of years</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">End of Quarter (Jun)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Quarter-End Rebalancing</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Increased volatility (±1.5%)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85% of quarters</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-5 mt-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Pattern Similarity Analysis</h2>

                                <div className="mb-4">
                                    <div className="flex items-center mb-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-2 flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h3 className="font-medium text-gray-800">Current Pattern Match</h3>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <p className="text-gray-700 mb-3">
                                            The current price action pattern for {selectedFuture} shows 87% similarity to historical patterns from:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div className="bg-white p-3 rounded border border-gray-200">
                                                <div className="font-medium text-gray-900">May-June 2019</div>
                                                <div className="text-sm text-gray-600">Pattern outcome: <span className="text-green-600">+3.8%</span> in 20 days</div>
                                            </div>
                                            <div className="bg-white p-3 rounded border border-gray-200">
                                                <div className="font-medium text-gray-900">April 2023</div>
                                                <div className="text-sm text-gray-600">Pattern outcome: <span className="text-green-600">+2.2%</span> in 15 days</div>
                                            </div>
                                            <div className="bg-white p-3 rounded border border-gray-200">
                                                <div className="font-medium text-gray-900">March 2021</div>
                                                <div className="text-sm text-gray-600">Pattern outcome: <span className="text-red-600">-1.5%</span> in 12 days</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pattern chart placeholder */}
                                <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                                    <div className="text-center text-gray-500">
                                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                                        </svg>
                                        <p>Pattern similarity chart would appear here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default FuturesPage;


// // When API is available, implement these service functions
// // in your services directory
// const implementFuturesAPI = () => {
//     // Example implementation of fetchFuturesData
//     const fetchFuturesData = async (symbol) => {
//         try {
//             const response = await fetch(`/api/futures/${symbol}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch futures data');
//             }
//             return await response.json();
//         } catch (error) {
//             console.error('Error fetching futures data:', error);
//             return null;
//         }
//     };

//     // Example implementation of fetchFuturesSentiment
//     const fetchFuturesSentiment = async (symbol) => {
//         try {
//             const response = await fetch(`/api/futures/sentiment/${symbol}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch futures sentiment data');
//             }
//             return await response.json();
//         } catch (error) {
//             console.error('Error fetching futures sentiment:', error);
//             return null;
//         }
//     };