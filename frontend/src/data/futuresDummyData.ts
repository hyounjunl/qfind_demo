export const dummyMarketData = {
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
                eventRisks: ["TSLA 25 Q1 earnings Apr 23", "Fed speakers discussing tech valuations", "Trump's Tariff Policy Announced"]
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
            { time: "10:35 AM", price: 19536.50, volume: 834, note: "Testing session high" },
            { time: "10:15 AM", price: 19456.75, volume: 1521, note: "Bounce from VWAP" },
            { time: "9:45 AM", price: 19333.50, volume: 1145, note: "Consolidation" },
            { time: "9:30 AM", price: 19433.25, volume: 2622, note: "Opening range" },
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
                overnightGapRisk: "Low to Moderate",
                volatilityOutlook: "Medium-term potential for increased volatility due to hedging activity ahead of economic data releases",
                eventRisks: ["Trade and tariff policy developments remain key risk factors", "Options open interest patterns suggest hedging for upcoming economic data releases"]
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
            { time: "10:35 AM", price: 42045.50, volume: 1243, note: "Testing session high" },
            { time: "10:15 AM", price: 42078.75, volume: 1131, note: "Bounce from VWAP" },
            { time: "9:45 AM", price: 42122.50, volume: 945, note: "Consolidation" },
            { time: "9:30 AM", price: 42200.25, volume: 2211, note: "Opening range" },
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
                eventRisks: ["OPEC+ comments", "Weekly EIA and API Crude Oil Inventory Data Announced", "Middle East developments"]
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
                overnightGapRisk: "Moderate to High",
                volatilityOutlook: "Expecting Short-Term Volatility",
                eventRisks: ["Physical Demand Reports", "Inflation concerns", "Geopolitical Tensions"]
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
            { time: "10:35 AM", price: 3043.58, volume: 734, note: "Resistance test" },
            { time: "10:15 AM", price: 3132.66, volume: 1122, note: "20-period EMA bounce" },
            { time: "9:45 AM", price: 3165.42, volume: 987, note: "Support level hold" },
            { time: "9:30 AM", price: 3200.81, volume: 1621, note: "Opening range" },
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
                overnightGapRisk: "Low to Moderate",
                volatilityOutlook: "Low with potential for sporadic increases",
                eventRisks: ["Treasury Auctions", "Fed Monetary Policy", "Fiscal Policy Changes"]
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
            { time: "10:35 AM", price: 118.06, volume: 742, note: "Support test" },
            { time: "10:15 AM", price: 118.12, volume: 812, note: "Resistance rejection" },
            { time: "9:45 AM", price: 118.21, volume: 958, note: "Failed breakout attempt" },
            { time: "9:30 AM", price: 118.15, volume: 1163, note: "Opening range" },
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
                volatilityOutlook: "Low with potential for targeted increases",
                eventRisks: ["Treasury Auctions", "Global Yield Movements", "Fiscal Policy Developments"]
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
            { time: "10:35 AM", price: 111.34, volume: 2344, note: "Resistance test" },
            { time: "10:15 AM", price: 111.43, volume: 1940, note: "20-period EMA bounce" },
            { time: "9:45 AM", price: 111.56, volume: 1965, note: "Support level hold" },
            { time: "9:30 AM", price: 111.24, volume: 1588, note: "Opening range" },
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
                overnightGapRisk: "Low",
                volatilityOutlook: "Low with focus on curve dynamics",
                eventRisks: ["Fed Policy Communications", "Financial Stability Concerns", "International Rate Differentials"]
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
            { time: "10:35 AM", price: 108.44, volume: 3332, note: "Resistance test" },
            { time: "10:15 AM", price: 108.23, volume: 3140, note: "20-period EMA bounce" },
            { time: "9:45 AM", price: 108.24, volume: 2965, note: "Support level hold" },
            { time: "9:30 AM", price: 108.34, volume: 2841, note: "Opening range" },
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
                overnightGapRisk: "Moderate",
                volatilityOutlook: "Expected to decrease after recent price surge",
                eventRisks: ["Central Bank Communications", "Market Sentiment Shifts", "Cross-Currency Influences"]
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
            { time: "10:35 AM", price: 1.08340, volume: 1844, note: "Resistance test" },
            { time: "10:15 AM", price: 1.06365, volume: 1446, note: "20-period EMA bounce" },
            { time: "9:45 AM", price: 1.07321, volume: 1386, note: "Support level hold" },
            { time: "9:30 AM", price: 1.08455, volume: 1218, note: "Opening range" },
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
                overnightGapRisk: "Moderate to High",
                volatilityOutlook: "Moderate with potential spikes",
                eventRisks: ["Bank of Japan Policy Decisions", "Ministry of Finance Intervention"]
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
            { time: "10:35 AM", price: 0.0067523, volume: 2344, note: "Resistance test" },
            { time: "10:15 AM", price: 0.0067454, volume: 2440, note: "20-period EMA bounce" },
            { time: "9:45 AM", price: 0.00675434, volume: 1935, note: "Support level hold" },
            { time: "9:30 AM", price: 0.0067528, volume: 1654, note: "Opening range" },
        ]
    },
};