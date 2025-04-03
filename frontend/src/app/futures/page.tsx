
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

const formatNumber = (num: number, symbol: string) => {
    const fxSymbols = ['E6', 'J6'];
    const maxDigits = symbol && fxSymbols.includes(symbol) ? 5 : 2;

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: maxDigits
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
        { symbol: 'E6', name: 'Euro FX', exchange: 'CME' },
        { symbol: 'J6', name: 'Japanese Yen', exchange: 'CME' }
    ], []);

    // Dummy market data - would be replaced with API data
    const dummyMarketData = useMemo(() => ({
        ES: {
            currentPrice: 5657.75,
            dailyChange: -17.25,
            dailyChangePercent: -0.30,
            volume: 105640,
            openInterest: 2100000,
            volatility: 1.37,
            support: [5608.22, 5563.19, 5518.16],
            resistance: [5698.28, 5743.31, 5788.34],
            sentiment: 0.44, // Scale from -1 (bearish) to 1 (bullish)
            aiAnalysis: {
                summary: "The E-mini S&P 500 futures are currently trading at 5657.75, showing a slight decline (-0.30%). The current price is moving between the first resistance level (5698.28) and the first support level (5608.22). Recent price action indicates a short-term consolidation pattern around the 5650 level, with the market seemingly waiting for a catalyst to determine the next directional move.",
                keyLevels: "A key level to watch is the primary resistance at 5698.28, where a breakthrough could trigger additional upside movement toward 5743.31. On the downside, 5608.22 serves as an important first support level, and if broken, could lead to a decline toward 5563.19.",
                unusualActivity: "Significant options activity has been detected near the 5700 strike price for the current month expiration, suggesting this price zone is an important psychological level in the short term. There's also increasing put option positioning around 5600, creating a dual support/resistance zone.",
                correlations: {
                    strengthening: ["NQ", "YM"],
                    weakening: ["GC", "ZB"],
                    anomalies: "Unusually weak correlation with the VIX index compared to historical patterns."
                },
                riskAssessment: {
                    overnightGapRisk: "Moderate",
                    volatilityOutlook: "Expected to remain within 13-16 range",
                    eventRisks: ["Maintaining a Freeze on Interest Rates", "Possible mention of inflation concerns"]
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
                { time: "10:35 AM", price: 5640.50, volume: 1245, note: "Rejected at resistance" },
                { time: "10:15 AM", price: 5677.75, volume: 3421, note: "High volume test of 5670" },
                { time: "9:45 AM", price: 5655.00, volume: 2145, note: "Support bounce" },
                { time: "9:30 AM", price: 5650.25, volume: 4532, note: "Opening range" },
            ]
        },
        NQ: {
            currentPrice: 19526.75,
            dailyChange: -86.50,
            dailyChangePercent: -0.43,
            volume: 52840,
            openInterest: 248720,
            volatility: 1.7,
            support: [19242.94, 19046.39, 18849.83],
            resistance: [19636.06, 19832.61, 20029.17],
            sentiment: 0.78,
            aiAnalysis: {
                summary: "E-mini Nasdaq-100 futures are trading at 19526.75, down 0.43% (-86.50 points) for the session. Despite the slight pullback, the contract is holding within a defined range between the first support (19242.94) and first resistance (19636.06) levels. Recent technology sector price action suggests traders are evaluating current valuations after the extended rally.",
                keyLevels: "The immediate resistance to watch is at 19636.06, with a breakthrough potentially opening the path toward the 19832.61 level. On the downside, initial support at 19242.94 will be critical to maintain the current structure, with deeper support at 19046.39 serving as a secondary cushion.",
                unusualActivity: "Notable options activity has been observed around the 19500 strike price, indicating traders are positioning for near-term volatility. Recent volume patterns suggest institutional hedging ahead of upcoming technology sector earnings announcements.",
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
                { time: "10:35 AM", price: 19536.50, volume: 845, note: "Testing session high" },
                { time: "10:15 AM", price: 19456.75, volume: 1421, note: "Bounce from VWAP" },
                { time: "9:45 AM", price: 19333.50, volume: 1045, note: "Consolidation" },
                { time: "9:30 AM", price: 19433.25, volume: 2532, note: "Opening range" },
            ]
        },
        YM: {
            currentPrice: 42145,
            dailyChange: -94,
            dailyChangePercent: -0.22,
            volume: 12540,
            openInterest: 74400,
            volatility: 1.7,
            support: [41946, 41633, 41320],
            resistance: [42572, 42885, 43198],
            sentiment: 0.78,
            aiAnalysis: {
                summary: "E-mini Dow Futures are currently trading at 42145, down slightly by 0.22% (-94 points) in the session. The contract is positioned between immediate support at 41946 and resistance at 42572, showing consolidation after recent market movements. Trading volume remains consistent with 30-day averages, suggesting balanced institutional participation.",
                keyLevels: "Primary resistance at 42572 is the key level to watch for potential breakout momentum. A move above this level could target 42885. On the downside, initial support at 41946 needs to hold to maintain the current structure, with the next significant level at 41633 if selling pressure increases.",
                unusualActivity: "Recent options flow shows increased activity around the 42000 strike price, indicating this psychological level is attracting trader attention. Open interest patterns suggest potential hedging activity ahead of upcoming economic data releases.",
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
                { time: "10:35 AM", price: 42045.50, volume: 845, note: "Testing session high" },
                { time: "10:15 AM", price: 42078.75, volume: 1421, note: "Bounce from VWAP" },
                { time: "9:45 AM", price: 42122.50, volume: 1045, note: "Consolidation" },
                { time: "9:30 AM", price: 42200.25, volume: 2532, note: "Opening range" },
            ]
        },
        CL: {
            currentPrice: 71.19,
            dailyChange: -0.01,
            dailyChangePercent: -0.01,
            volume: 33830,
            openInterest: 30745,
            volatility: 24.5,
            support: [70.87, 70.27, 69.66],
            resistance: [72.09, 72.69, 73.30],
            sentiment: -0.15,
            aiAnalysis: {
                summary: "Crude Oil Futures are essentially flat at 71.19, showing minimal change (-0.01%) in today's session. Price action remains contained within a narrow range between immediate support at 70.87 and resistance at 72.09. Recent consolidation reflects market uncertainty regarding global demand forecasts and inventory reports.",
                keyLevels: "The immediate resistance at 72.09 represents a significant hurdle for bulls, with a breakthrough potentially accelerating momentum toward 72.69. On the downside, support at 70.87 is crucial to maintain the current structure; a break below could trigger increased selling pressure toward the 70.27 level.",
                unusualActivity: "Unusual spread trading has been observed between front-month and deferred contracts, suggesting changing market expectations about the future supply-demand balance. Options market activity shows increased put buying near the 70.00 strike, indicating growing downside protection interest among traders.",
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
                { time: "10:35 AM", price: 71.32, volume: 975, note: "Rejected at VWAP" },
                { time: "10:15 AM", price: 70.56, volume: 1245, note: "Failed test of 70.50" },
                { time: "9:45 AM", price: 72.28, volume: 854, note: "Support test" },
                { time: "9:30 AM", price: 69.42, volume: 1532, note: "Opening range" },
            ]
        },
        // Additional futures contracts would be added here
        GC: {
            currentPrice: 3162.8,
            dailyChange: 16.5,
            dailyChangePercent: 0.53,
            volume: 64170,
            openInterest: 402850,
            volatility: 16.8,
            support: [3123.2, 3096.1, 3069.0],
            resistance: [3177.4, 3204.5, 3231.6],
            sentiment: 0.45,
            aiAnalysis: {
                summary: "Gold Futures are showing positive momentum, trading at 3162.8 with a gain of 0.53% (+16.5 points) in the current session. The precious metal is approaching key resistance at 3177.4 while maintaining a comfortable cushion above the nearest support at 3123.2. Recent strength appears driven by inflation concerns and geopolitical tensions supporting safe-haven demand.",
                keyLevels: "The immediate resistance at 3177.4 is critical for continued bullish momentum; a breakthrough could accelerate gains toward the 3204.5 level. On the downside, initial support at 3123.2 should provide a foundation for buyers, with stronger support established at 3096.1 if profit-taking emerges.",
                unusualActivity: "Significant call option activity has been detected at the 3200 strike price for near-term expiration dates, suggesting traders are positioning for potential upside continuation. Open interest has notably increased in the last two sessions, indicating fresh capital entering the gold market.",
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
                { time: "10:35 AM", price: 3043.58, volume: 845, note: "Resistance test" },
                { time: "10:15 AM", price: 3132.66, volume: 1240, note: "20-period EMA bounce" },
                { time: "9:45 AM", price: 3165.42, volume: 965, note: "Support level hold" },
                { time: "9:30 AM", price: 3200.81, volume: 1845, note: "Opening range" },
            ]
        },
        ZB: {
            currentPrice: 118.17,
            dailyChange: -0.02,
            dailyChangePercent: -0.05,
            volume: 69330,
            openInterest: 1840000,
            volatility: 12.3,
            support: [116.28, 116.16, 116.03],
            resistance: [117.22, 118.02, 118.15],
            sentiment: -0.25,
            aiAnalysis: {
                summary: "T-Bond Futures are trading at 118.17, showing minimal change (-0.05%) in the current session. The contract has moved above all identified resistance levels, suggesting strong bullish momentum in the Treasury market. Recent bond strength reflects shifting market expectations regarding the Federal Reserve's monetary policy trajectory and growing concerns about economic growth.",
                keyLevels: "With price currently trading above the listed resistance levels, the 118.15 level now serves as immediate support, followed by 118.02. For potential extended moves higher, traders should watch for psychological resistance at the 119.00 level. The previously established support at 116.28 represents a significant downside cushion.",
                unusualActivity: "Unusual spread trading activity has been observed between the front-month and back-month contracts, potentially indicating changing expectations about the yield curve. Open interest has increased notably in recent sessions despite relatively tight trading ranges, suggesting accumulation rather than speculative positioning.",
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
        },
        ZN: {
            currentPrice: 111.27,
            dailyChange: 0.02,
            dailyChangePercent: 0.06,
            volume: 489570,
            openInterest: 4890000,
            volatility: 16.8,
            support: [111.03, 110.56, 110.46],
            resistance: [111.25, 111.36, 111.46],
            sentiment: 0.45,
            aiAnalysis: {
                summary: "10 Year T-Note Futures are trading slightly higher at 111.27, up 0.06% (+0.02 points) in the current session. The contract has just broken above immediate resistance at 111.25, potentially signaling further upside momentum. This modest strength comes amid mixed economic data and continued market assessment of the Federal Reserve's policy outlook.",
                keyLevels: "Having just overcome the first resistance level at 111.25, the next hurdle for bulls is at 111.36, which if breached could extend the rally toward 111.46. Immediate support now rests at 111.03, which should hold to maintain the current bullish structure.",
                unusualActivity: "There has been a notable increase in call option activity at the 112.00 strike price, suggesting some traders are positioning for continued yield declines. Trading volumes are above the 20-day average, indicating heightened interest in Treasury futures as market participants reassess interest rate expectations.",
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
                { time: "10:35 AM", price: 111.34, volume: 845, note: "Resistance test" },
                { time: "10:15 AM", price: 111.43, volume: 1240, note: "20-period EMA bounce" },
                { time: "9:45 AM", price: 111.56, volume: 965, note: "Support level hold" },
                { time: "9:30 AM", price: 111.24, volume: 1845, note: "Opening range" },
            ]
        },
        ZF: {
            currentPrice: 108.16,
            dailyChange: 0.01,
            dailyChangePercent: 0.04,
            volume: 244290,
            openInterest: 6520000,
            volatility: 16.8,
            support: [108.007, 107.121, 107.108],
            resistance: [108.033, 108.047, 108.060],
            sentiment: 0.45,
            aiAnalysis: {
                summary: "5-Year T-Note Futures are trading marginally higher at 108.16, showing a slight gain of 0.04% (+0.01 points) in the current session. The contract is trading above all listed resistance levels, indicating strong underlying demand for medium-term Treasuries. This positioning suggests the market is anticipating a more dovish Federal Reserve policy trajectory in the coming months.",
                keyLevels: "Having already cleared the highest listed resistance at 108.060, the next level to watch is the psychological round number at 108.25. Immediate support has formed at 108.033, with more significant support at 108.007, which needs to hold to maintain the current positive momentum.",
                unusualActivity: "A notable increase in trading activity has been observed in calendar spreads between 5-Year and 2-Year futures, suggesting changing expectations about the yield curve shape. Institutional positioning reports indicate increasing long interest in 5-Year futures, potentially reflecting portfolio duration adjustments ahead of upcoming economic data releases.",
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
                { time: "10:35 AM", price: 108.44, volume: 845, note: "Resistance test" },
                { time: "10:15 AM", price: 108.23, volume: 1240, note: "20-period EMA bounce" },
                { time: "9:45 AM", price: 108.24, volume: 965, note: "Support level hold" },
                { time: "9:30 AM", price: 108.34, volume: 1845, note: "Opening range" },
            ]
        },
        E6: {
            currentPrice: 1.08440,
            dailyChange: 0.00115,
            dailyChangePercent: 0.11,
            volume: 46700,
            openInterest: 650590,
            volatility: 16.8,
            support: [1.08059, 1.07497, 1.06936],
            resistance: [1.09181, 1.09743, 1.10304],
            sentiment: 0.45,
            aiAnalysis: {
                summary: "Euro FX Futures are trading slightly higher at 1.08440, up 0.11% (+0.00115) in today's session. The contract is maintaining a position above its immediate support at 1.08059 while remaining below the first resistance level at 1.09181. Recent price action suggests consolidation as markets evaluate diverging monetary policy paths between the European Central Bank and the Federal Reserve.",
                keyLevels: "The immediate resistance at 1.09181 represents a significant barrier that bulls need to overcome for continued upward momentum. On the downside, support at 1.08059 is crucial to watch; a breach could accelerate selling pressure toward the next support level at 1.07497.",
                unusualActivity: "Options market data shows increased activity at the 1.0900 strike price, suggesting traders are positioning for potential near-term volatility around this psychological level. The put/call ratio has declined in recent sessions, indicating a shift toward more bullish sentiment among derivatives traders.",
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
                { time: "10:35 AM", price: 1.08340, volume: 845, note: "Resistance test" },
                { time: "10:15 AM", price: 1.06365, volume: 1240, note: "20-period EMA bounce" },
                { time: "9:45 AM", price: 1.07321, volume: 965, note: "Support level hold" },
                { time: "9:30 AM", price: 1.08455, volume: 1845, note: "Opening range" },
            ]
        },
        J6: {
            currentPrice: 0.0067545,
            dailyChange: 0.0000040,
            dailyChangePercent: 0.06,
            volume: 489570,
            openInterest: 4890000,
            volatility: 16.8,
            support: [0.0066990, 0.0066790, 0.0066591],
            resistance: [0.0067390, 0.0067590, 0.0067790],
            sentiment: 0.45,
            aiAnalysis: {
                summary: "Japanese Yen Futures are trading slightly higher at 0.0067545, up 0.06% in the current session. The contract is trading above its first resistance level at 0.0067390 and approaching the second resistance at 0.0067590. This modest strength comes amid ongoing speculation about potential Bank of Japan policy adjustments and shifting interest rate differentials.",
                keyLevels: "Having overcome the first resistance at 0.0067390, the next hurdle is at 0.0067590, which if breached could extend gains toward 0.0067790. Initial support now sits at 0.0066990, which needs to hold to maintain the current upward bias.",
                unusualActivity: "There has been an increase in futures positioning ahead of upcoming Bank of Japan policy meetings, with speculative accounts reducing short positions. Options market activity shows growing interest in upside protection, potentially reflecting concerns about continued yen strength and its impact on export-oriented Japanese companies.",
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
                { time: "10:35 AM", price: 0.0067523, volume: 845, note: "Resistance test" },
                { time: "10:15 AM", price: 0.0067454, volume: 1240, note: "20-period EMA bounce" },
                { time: "9:45 AM", price: 0.00675434, volume: 965, note: "Support level hold" },
                { time: "9:30 AM", price: 0.0067528, volume: 1845, note: "Opening range" },
            ]
        },
    }), []);

    // Dummy news related to futures - would be replaced with API data
    const dummyNews = useMemo(() => [
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
    ], []);

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
                                            <span className="font-medium">{formatNumber(level, selectedFuture)}</span>
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
                                            <span className="font-medium">{formatNumber(level, selectedFuture)}</span>
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
                                                        {selectedFuture === 'ES' ? '$12133.60' : selectedFuture === 'NQ' ? '$22177.49' : selectedFuture === 'YM' ? '$8713.45' : selectedFuture === 'CL' ? '$16510.00' : selectedFuture === 'CL' ? '$22263.81' : selectedFuture === 'ZB' ? '$5839.10' : selectedFuture === 'ZN' ? '$2914.54' : selectedFuture === 'ZF' ? '$1855.38' : selectedFuture === 'E6' ? '$4266.29' : '$3795'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Maintenance Margin</span>
                                                    <span className="font-bold text-gray-900">
                                                        {selectedFuture === 'ES' ? '$10986.50' : selectedFuture === 'NQ' ? '$19909.99' : selectedFuture === 'YM' ? '$7536.90' : 'N/A'}
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