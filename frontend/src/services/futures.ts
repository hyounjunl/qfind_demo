// frontend/src/services/futures.ts
import { dummyMarketData } from '@/data/futuresDummyData';

const BACKEND_API = 'http://10.8.12.8:8889';


const getBasePrice = (symbol: keyof typeof basePrices) => {
    return basePrices[symbol] || 100;
};

// Helper function to generate mock price history data
const generateMockPriceHistory = (symbol: string, days: number = 90) => {
    const basePrice = getBasePrice(symbol as keyof typeof basePrices);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const priceHistory = [];
    let currentPrice = basePrice;
    
    // Generate data for each day
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        // Skip weekends
        if (d.getDay() === 0 || d.getDay() === 6) continue;
        
        // Random daily change (-1% to +1%)
        const dailyChangePercent = (Math.random() * 2 - 1) * 0.01;
        currentPrice = currentPrice * (1 + dailyChangePercent);
        
        // Add some volume
        const volume = Math.floor(Math.random() * 1000000) + 500000;
        
        priceHistory.push({
            date: d.toISOString().split('T')[0],
            price: parseFloat(currentPrice.toFixed(2)),
            volume
        });
    }
    return priceHistory;
};

// Get base price for each symbol
const basePrices = {
    "ES": 5274.25,
    "NQ": 18235.75,
    "YM": 42803.72,
    "CL": 82.35,
    "GC": 2342.80,
    "ZB": 118.06,
    "ZN": 112.50,
    "ZF": 108.75,
    "6E": 1.08,
    "6J": 0.0068
};

// Helper function to format time
function formatTime(date: Date, minutesOffset = 0) {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutesOffset);
    return newDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// Helper function to determine if current month tends to be positive for this asset
function isPositiveMonth(date: Date, symbol: string) {
    // This is a simplification - you could make this more accurate with real seasonal data
    const month = date.getMonth();
    // For equity indices, consider Apr-Jul and Nov-Dec as positive seasons
    if (symbol.includes('ES') || symbol.includes('NQ') || symbol.includes('YM')) {
        return [3, 4, 5, 6, 10, 11].includes(month);
    }
    // For commodities, each has different seasonal patterns
    else if (symbol === 'CL') {
        return [0, 1, 6, 7].includes(month); // Jan-Feb, Jul-Aug for crude
    }
    else if (symbol === 'GC') {
        return [0, 7, 8, 11].includes(month); // Jan, Aug-Sep, Dec for gold
    }
    // Default - random but weighted to be positive
    return Math.random() > 0.4;
}

export const fetchFuturesData = async (symbol: string) => {
    try {
        // Try to fetch from API first
        try {
            const response = await fetch(`${BACKEND_API}/api/futures/${symbol}`);
            
            if (response.ok) {
                const data = await response.json();

                if (dummyMarketData[symbol as keyof typeof dummyMarketData]) {
                    const dummyData = dummyMarketData[symbol as keyof typeof dummyMarketData];
                
                
                    // Ensure aiAnalysis exists
                    if (!data.aiAnalysis && dummyData.aiAnalysis) {
                        data.aiAnalysis = JSON.parse(JSON.stringify(dummyData.aiAnalysis));
                    } else if (!data.aiAnalysis) {
                        data.aiAnalysis = {
                            summary: `${symbol} futures are currently showing normal market activity with no significant anomalies detected.`,
                            keyLevels: `Watch key support at ${data.support?.[0] || 'recent lows'} and resistance at ${data.resistance?.[0] || 'recent highs'}.`,
                            unusualActivity: "No unusual activity detected in current trading patterns.",
                            correlations: {
                                strengthening: ["Related index futures"],
                                weakening: ["Safe haven assets"],
                                anomalies: "No significant correlation anomalies detected."
                            },
                            riskAssessment: {
                                overnightGapRisk: "Moderate",
                                volatilityOutlook: "Expected to remain within normal range",
                                eventRisks: ["Upcoming economic data releases"]
                            }
                        };
                    }
                    
                    // Ensure recentActivity exists
                    if (!data.recentActivity && dummyData.recentActivity) {
                        data.recentActivity = JSON.parse(JSON.stringify(dummyData.recentActivity));
                    } else if (!data.recentActivity) {
                        const basePrice = data.currentPrice || 100;
                        const time = new Date();
                        
                        data.recentActivity = [
                            {
                                time: formatTime(time, -60), // 1 hour ago
                                price: basePrice * (1 - 0.001 * Math.random()),
                                volume: Math.floor(Math.random() * 2000) + 500,
                                note: "Normal trading activity"
                            },
                            {
                                time: formatTime(time, -45), // 45 minutes ago
                                price: basePrice * (1 + 0.001 * Math.random()),
                                volume: Math.floor(Math.random() * 2000) + 500,
                                note: "Normal trading activity"
                            },
                            {
                                time: formatTime(time, -30), // 30 minutes ago
                                price: basePrice * (1 - 0.002 * Math.random()),
                                volume: Math.floor(Math.random() * 2000) + 500,
                                note: "Normal trading activity"
                            },
                            {
                                time: formatTime(time, -15), // 15 minutes ago
                                price: basePrice * (1 + 0.002 * Math.random()),
                                volume: Math.floor(Math.random() * 2000) + 500,
                                note: "Normal trading activity"
                            }
                        ];
                    }
                    
                    // Ensure calendarSpreads exists
                    if (!data.calendarSpreads && dummyData.calendarSpreads) {
                        data.calendarSpreads = JSON.parse(JSON.stringify(dummyData.calendarSpreads));
                    } else if (!data.calendarSpreads) {
                        data.calendarSpreads = [
                            { 
                                frontMonth: "Jun 2025", 
                                backMonth: "Sep 2025", 
                                spread: -(data.currentPrice * 0.001).toFixed(2), 
                                zScore: 1.2 
                            },
                            { 
                                frontMonth: "Sep 2025", 
                                backMonth: "Dec 2025", 
                                spread: -(data.currentPrice * 0.0009).toFixed(2), 
                                zScore: 0.3 
                            }
                        ];
                    }
                    
                    // Ensure seasonalPatterns exists
                    if (!data.seasonalPatterns && dummyData.seasonalPatterns) {
                        data.seasonalPatterns = JSON.parse(JSON.stringify(dummyData.seasonalPatterns));
                    } else if (!data.seasonalPatterns) {
                        data.seasonalPatterns = {
                            currentPhase: `Historically ${isPositiveMonth(new Date(), symbol) ? 'strong' : 'neutral'} period`,
                            consistency: `${Math.floor(Math.random() * 30) + 55}% of years show positive returns in this period`,
                            averageReturn: `${isPositiveMonth(new Date(), symbol) ? '+' : ''}${(Math.random() * 3).toFixed(1)}% over next 30 days historically`
                        };
                    }
                }
                
                return data;
            }
        } catch (error) {
            console.log('API not available, falling back to dummy data');
            console.error('Error fetching futures data:', error);
            throw error;
        }

        // If no specific dummy data exists, generate generic mock data
        console.log(`No specific dummy data for ${symbol}, generating generic data`);
        
        const priceHistory = generateMockPriceHistory(symbol);
        const latestPrice = priceHistory[priceHistory.length - 1].price;
        const previousPrice = priceHistory[priceHistory.length - 2].price;
        const dailyChange = latestPrice - previousPrice;
        const dailyChangePercent = (dailyChange / previousPrice) * 100;
        
        // Calculate support and resistance levels
        const support = [
            parseFloat((latestPrice * 0.99).toFixed(2)),
            parseFloat((latestPrice * 0.97).toFixed(2)),
            parseFloat((latestPrice * 0.95).toFixed(2))
        ];
        
        const resistance = [
            parseFloat((latestPrice * 1.01).toFixed(2)),
            parseFloat((latestPrice * 1.03).toFixed(2)),
            parseFloat((latestPrice * 1.05).toFixed(2))
        ];
        
        // Generate generic mock data
        return {
            currentPrice: latestPrice,
            dailyChange,
            dailyChangePercent,
            volume: priceHistory[priceHistory.length - 1].volume,
            openInterest: Math.floor(priceHistory[priceHistory.length - 1].volume * 1.5),
            volatility: 14.2, // Mock value
            priceHistory,
            support,
            resistance,
            sentiment: 0.65, // Mock value between -1 and 1
            aiAnalysis: {
                summary: `${symbol} futures are showing typical market activity. Volume and price action remain within normal ranges.`,
                keyLevels: `Watch key support at ${support[0]} and resistance at ${resistance[0]}.`,
                unusualActivity: "No unusual activity detected in current trading patterns.",
                correlations: {
                    strengthening: ["Related sector futures", "Market indices"],
                    weakening: ["Counter-cyclical assets"],
                    anomalies: "No significant correlation anomalies detected."
                },
                riskAssessment: {
                    overnightGapRisk: "Moderate",
                    volatilityOutlook: "Expected to remain within normal range",
                    eventRisks: ["Upcoming economic data releases"]
                }
            },
            recentActivity: [
                {
                    time: formatTime(new Date(), -60),
                    price: latestPrice * (1 - 0.001 * Math.random()),
                    volume: Math.floor(Math.random() * 2000) + 500,
                    note: "Normal trading activity"
                },
                {
                    time: formatTime(new Date(), -45),
                    price: latestPrice * (1 + 0.001 * Math.random()),
                    volume: Math.floor(Math.random() * 2000) + 500,
                    note: "Normal trading activity"
                },
                {
                    time: formatTime(new Date(), -30),
                    price: latestPrice * (1 - 0.002 * Math.random()),
                    volume: Math.floor(Math.random() * 2000) + 500,
                    note: "Normal trading activity"
                },
                {
                    time: formatTime(new Date(), -15),
                    price: latestPrice * (1 + 0.002 * Math.random()),
                    volume: Math.floor(Math.random() * 2000) + 500,
                    note: "Normal trading activity"
                },
            ],
            calendarSpreads: [
                { 
                    frontMonth: "Jun 2025", 
                    backMonth: "Sep 2025", 
                    spread: -(latestPrice * 0.001).toFixed(2), 
                    zScore: 1.2 
                },
                { 
                    frontMonth: "Sep 2025", 
                    backMonth: "Dec 2025", 
                    spread: -(latestPrice * 0.0009).toFixed(2), 
                    zScore: 0.3 
                }
            ],
            seasonalPatterns: {
                currentPhase: `Historically ${isPositiveMonth(new Date(), symbol) ? 'strong' : 'neutral'} period`,
                consistency: `${Math.floor(Math.random() * 30) + 55}% of years show positive returns in this period`,
                averageReturn: `${isPositiveMonth(new Date(), symbol) ? '+' : ''}${(Math.random() * 3).toFixed(1)}% over next 30 days historically`
            },
        };
    } catch (error) {
        console.error('Error fetching futures data:', error);
        throw error;
    }
};

export const fetchFuturesSentiment = async (symbol: string) => {
    try {
        const response = await fetch(`${BACKEND_API}/api/futures/${symbol}/sentiment`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch futures sentiment data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching futures sentiment:', error);
        throw error;
    }
};

export const fetchMarketNews = async (category: string) => {
    try {
        const response = await fetch(`${BACKEND_API}/api/news?category=${category}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch market news');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching market news:', error);
        throw error;
    }
};