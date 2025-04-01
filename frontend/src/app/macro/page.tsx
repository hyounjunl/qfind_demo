'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

import {
    fetchEconomicIndicators,
    fetchDailyAnalysis,
    fetchMacroNews,
    fetchAvailableDates
} from '@/services/macro';

// Helper function to format dates instead of using date-fns
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

// Dummy data for macro analysis
type MacroAnalysisData = {
    // 7 days of sample data
    dates: [
        {
            date: '2025-03-28',
            positiveFactors: [
                "Consumer spending increased by 0.8% in February, exceeding expectations of 0.5% growth.",
                "Manufacturing activity expanded for the third consecutive month, with the ISM Manufacturing Index at 52.3.",
                "Corporate earnings for Q1 are projected to grow by 6.2% year-over-year, above the previous estimate of 5.7%.",
                "Housing market showed resilience with new home sales increasing 3.2% in February."
            ],
            riskFactors: [
                "Inflation remains elevated at 2.9% year-over-year, above the Federal Reserve's 2% target.",
                "Federal Reserve indicated it may delay rate cuts until later in the year.",
                "Government debt reached a record high of $34.5 trillion, raising concerns about fiscal sustainability.",
                "Labor market showing signs of cooling with job openings declining for two consecutive months."
            ],
            mixedSignals: [
                "Oil prices have stabilized around $78 per barrel, but geopolitical tensions create uncertainty.",
                "Consumer sentiment improved slightly but remains below historical averages.",
                "Tech sector showing mixed performance with hardware sales declining while software services grow.",
                "International trade showing growth in exports but widening trade deficits with key partners."
            ],
            economicIndicators: {
                ismPMI: {
                    value: 52.3,
                    change: 0.7,
                    description: "Manufacturing activity expanded in March, with new orders and production showing particular strength."
                },
                adpNonfarm: {
                    value: 185000,
                    change: -15000,
                    description: "Private sector employment increased by 185,000 jobs in March, slightly below expectations."
                },
                nonfarmPayrolls: {
                    value: 207000,
                    change: -18000,
                    description: "The economy added 207,000 jobs in March, with the service sector leading growth."
                },
                unemploymentRate: {
                    value: 3.9,
                    change: 0.1,
                    description: "Unemployment rate ticked up to 3.9%, indicating slight cooling in the labor market."
                },
                cpi: {
                    value: 2.9,
                    change: -0.1,
                    description: "Consumer prices rose 2.9% year-over-year, showing modest cooling in inflation."
                },
                coreCPI: {
                    value: 3.2,
                    change: -0.1,
                    description: "Core inflation, excluding food and energy, was 3.2% year-over-year."
                },
                gdp: {
                    value: 2.4,
                    change: 0.2,
                    description: "GDP grew at an annualized rate of 2.4% in Q1 2025, above expectations."
                }
            }
        },
        {
            date: '2025-03-27',
            positiveFactors: [
                "Consumer confidence index increased to 105.2, above the expected 103.5.",
                "Durable goods orders rose 1.2% in February, indicating business investment strength.",
                "Retail sales showed resilience with a 0.6% month-over-month increase.",
                "Technology sector led market gains with a 1.8% increase for the week."
            ],
            riskFactors: [
                "Inflation remains elevated with core PCE at 2.8%, above the Fed's target.",
                "Federal Reserve projected fewer rate cuts in 2025 than previously indicated.",
                "Commercial real estate vacancies continued to rise, particularly in office space.",
                "Manufacturing employment declined for the second consecutive month."
            ],
            mixedSignals: [
                "Housing market showed mixed signals with rising prices but declining sales volume.",
                "Energy sector performance varies widely with renewable energy growing while traditional energy lags.",
                "Regional banking performance diverging with larger banks outperforming smaller institutions.",
                "Consumer spending strong in services but weaker in durable goods."
            ],
            economicIndicators: {
                ismPMI: {
                    value: 51.6,
                    change: -0.3,
                    description: "Manufacturing activity expanded modestly in March, though at a slower pace than February."
                },
                adpNonfarm: {
                    value: 200000,
                    change: 5000,
                    description: "Private sector employment increased by 200,000 jobs in March."
                },
                nonfarmPayrolls: {
                    value: 225000,
                    change: -10000,
                    description: "The economy added 225,000 jobs in March, primarily in services and healthcare."
                },
                unemploymentRate: {
                    value: 3.8,
                    change: 0,
                    description: "Unemployment rate remained stable at 3.8%."
                },
                cpi: {
                    value: 3.0,
                    change: -0.2,
                    description: "Consumer prices rose 3.0% year-over-year, continuing a gradual disinflation trend."
                },
                coreCPI: {
                    value: 3.3,
                    change: -0.1,
                    description: "Core inflation, excluding food and energy, was 3.3% year-over-year."
                },
                gdp: {
                    value: 2.2,
                    change: 0.1,
                    description: "GDP grew at an annualized rate of 2.2% in Q1 2025."
                }
            }
        },
        {
            date: '2025-03-26',
            positiveFactors: [
                "Services sector activity accelerated with ISM Services Index rising to 54.8.",
                "Job openings remained above 8 million, indicating continued labor demand.",
                "Corporate profits reached record levels in Q4 2024, rising 8.3% year-over-year.",
                "Infrastructure spending increased 2.4% year-over-year, supporting construction activity."
            ],
            riskFactors: [
                "Producer Price Index increased 0.3% month-over-month, above expectations.",
                "Global supply chain pressures increased due to shipping disruptions in key routes.",
                "U.S. Dollar strength continued to pressure multinational corporate earnings.",
                "Consumer credit delinquencies rose to 2.8%, the highest level since 2020."
            ],
            mixedSignals: [
                "Small business optimism improved but hiring plans decreased.",
                "Manufacturing new orders increased while inventories also rose.",
                "Wage growth slowed to 4.1% year-over-year while job openings remained elevated.",
                "Healthcare spending increased while consumer discretionary spending moderated."
            ],
            economicIndicators: {
                ismPMI: {
                    value: 51.9,
                    change: 0.5,
                    description: "Manufacturing activity showed modest expansion, with new orders strengthening."
                },
                adpNonfarm: {
                    value: 195000,
                    change: -10000,
                    description: "Private sector employment increased by 195,000 jobs."
                },
                nonfarmPayrolls: {
                    value: 235000,
                    change: -5000,
                    description: "The economy added 235,000 jobs, with broad-based gains across sectors."
                },
                unemploymentRate: {
                    value: 3.8,
                    change: -0.1,
                    description: "Unemployment rate improved slightly to 3.8%."
                },
                cpi: {
                    value: 3.2,
                    change: 0.1,
                    description: "Consumer prices rose 3.2% year-over-year, showing a slight uptick from February."
                },
                coreCPI: {
                    value: 3.4,
                    change: 0,
                    description: "Core inflation remained stable at 3.4% year-over-year."
                },
                gdp: {
                    value: 2.1,
                    change: -0.2,
                    description: "GDP grew at an annualized rate of 2.1% in Q1 2025, slightly below expectations."
                }
            }
        },
        {
            date: '2025-03-25',
            positiveFactors: [
                "Productivity growth accelerated to 2.1% annually in Q4 2024.",
                "Consumer discretionary spending rose 0.7% month-over-month.",
                "Healthcare sector job growth continued to accelerate, adding 52,000 jobs in March.",
                "Building permits for new housing increased 2.3% month-over-month."
            ],
            riskFactors: [
                "Trade deficit widened to $72.4 billion in February, above expectations.",
                "Auto loan delinquencies reached 6.1%, the highest level since 2010.",
                "Commercial real estate prices declined 3.2% year-over-year in major metropolitan areas.",
                "Regional bank lending contracted by 1.7% quarter-over-quarter."
            ],
            mixedSignals: [
                "Tech sector employment showed growth in software but contraction in hardware manufacturing.",
                "Consumer confidence improved overall but decreased among higher-income households.",
                "Manufacturing output increased while capacity utilization decreased.",
                "Retail sales growth varied widely by region with strength in the South but weakness in the Northeast."
            ],
            economicIndicators: {
                ismPMI: {
                    value: 51.4,
                    change: -0.2,
                    description: "Manufacturing activity continued to expand but at a slightly slower pace."
                },
                adpNonfarm: {
                    value: 205000,
                    change: 5000,
                    description: "Private sector employment increased by 205,000 jobs."
                },
                nonfarmPayrolls: {
                    value: 240000,
                    change: 10000,
                    description: "The economy added 240,000 jobs in March, above expectations."
                },
                unemploymentRate: {
                    value: 3.9,
                    change: 0.1,
                    description: "Unemployment rate ticked up to 3.9% despite job growth."
                },
                cpi: {
                    value: 3.1,
                    change: -0.1,
                    description: "Consumer prices rose 3.1% year-over-year."
                },
                coreCPI: {
                    value: 3.4,
                    change: -0.1,
                    description: "Core inflation was 3.4% year-over-year, showing modest improvement."
                },
                gdp: {
                    value: 2.3,
                    change: 0.1,
                    description: "GDP grew at an annualized rate of 2.3% in Q1 2025."
                }
            }
        },
        {
            date: '2025-03-24',
            positiveFactors: [
                "Business investment in equipment increased 3.4% in Q1 2025.",
                "Construction spending rose 1.2% in February, above expectations.",
                "Software and IT services sector revenue grew 8.5% year-over-year in Q1.",
                "Consumer balance sheets remained strong with household debt service ratio at 9.8%."
            ],
            riskFactors: [
                "Housing affordability reached a new low with the median home price rising to 6.2x median income.",
                "Energy prices increased 2.7% month-over-month due to production constraints.",
                "Small business hiring intentions decreased for the third consecutive month.",
                "Corporate bond spreads widened, indicating increased credit risk perception."
            ],
            mixedSignals: [
                "Service sector employment continued to grow while goods-producing employment contracted.",
                "Consumer saving rate increased to 4.7% while spending growth moderated.",
                "Healthcare spending accelerated while manufacturing investment slowed.",
                "Regional economic performance varied widely with strength in the West but weakness in the Midwest."
            ],
            economicIndicators: {
                ismPMI: {
                    value: 51.6,
                    change: 0.3,
                    description: "Manufacturing activity improved slightly from February."
                },
                adpNonfarm: {
                    value: 200000,
                    change: -15000,
                    description: "Private sector employment increased by 200,000 jobs, below expectations."
                },
                nonfarmPayrolls: {
                    value: 230000,
                    change: -10000,
                    description: "The economy added 230,000 jobs in March."
                },
                unemploymentRate: {
                    value: 3.8,
                    change: 0,
                    description: "Unemployment rate remained steady at 3.8%."
                },
                cpi: {
                    value: 3.2,
                    change: 0,
                    description: "Consumer prices rose 3.2% year-over-year, unchanged from February."
                },
                coreCPI: {
                    value: 3.5,
                    change: 0.1,
                    description: "Core inflation ticked up slightly to 3.5% year-over-year."
                },
                gdp: {
                    value: 2.2,
                    change: -0.1,
                    description: "GDP grew at an annualized rate of 2.2% in Q1 2025."
                }
            }
        },
        {
            date: '2025-03-21',
            positiveFactors: [
                "Initial jobless claims decreased to 218,000, below expectations of 230,000.",
                "Retail sales excluding autos rose 0.5% month-over-month in February.",
                "Manufacturing capacity utilization increased to 78.3%, the highest level in 18 months.",
                "S&P 500 companies exceeded earnings expectations by an average of 5.8% in Q1."
            ],
            riskFactors: [
                "Housing starts declined 3.2% month-over-month in February.",
                "Credit card delinquencies rose to 3.2%, continuing an upward trend.",
                "Federal budget deficit widened to $1.9 trillion on a trailing 12-month basis.",
                "Import prices increased 0.4% month-over-month, above expectations."
            ],
            mixedSignals: [
                "Business capital expenditure plans increased while actual spending decreased.",
                "Consumer sentiment varied widely by income level with higher-income consumers more pessimistic.",
                "Healthcare employment growth accelerated while retail employment contracted.",
                "Productivity growth varied widely across sectors with services outperforming manufacturing."
            ],
            economicIndicators: {
                ismPMI: {
                    value: 51.3,
                    change: -0.3,
                    description: "Manufacturing activity expanded at a slightly slower pace in March."
                },
                adpNonfarm: {
                    value: 215000,
                    change: 10000,
                    description: "Private sector employment increased by 215,000 jobs."
                },
                nonfarmPayrolls: {
                    value: 240000,
                    change: 5000,
                    description: "The economy added 240,000 jobs in March."
                },
                unemploymentRate: {
                    value: 3.8,
                    change: -0.1,
                    description: "Unemployment rate improved to 3.8% from 3.9% in February."
                },
                cpi: {
                    value: 3.2,
                    change: -0.1,
                    description: "Consumer prices rose 3.2% year-over-year."
                },
                coreCPI: {
                    value: 3.4,
                    change: -0.2,
                    description: "Core inflation improved to 3.4% year-over-year from 3.6% in February."
                },
                gdp: {
                    value: 2.3,
                    change: 0.2,
                    description: "GDP grew at an annualized rate of 2.3% in Q1 2025, above expectations."
                }
            }
        },
        {
            date: '2025-03-20',
            positiveFactors: [
                "Leading economic indicators increased 0.3% in February, the first increase in six months.",
                "Existing home sales rose 3.1% month-over-month in February, above expectations.",
                "Corporate dividend announcements increased 7.2% year-over-year in Q1.",
                "Healthcare sector revenue grew 6.8% year-over-year in Q4 2024."
            ],
            riskFactors: [
                "Producer prices for intermediate goods increased 0.5% month-over-month.",
                "Commercial real estate vacancy rates reached 18.3% for office space in major metros.",
                "Consumer credit growth slowed to 3.1% year-over-year, the lowest rate since 2020.",
                "Median duration of unemployment increased to 9.8 weeks from 9.2 weeks in February."
            ],
            mixedSignals: [
                "Manufacturing new orders increased while inventory levels also rose.",
                "Service sector pricing power strengthened while manufacturing margins compressed.",
                "Labor force participation increased for prime-age workers but decreased for older workers.",
                "Business investment varied widely by sector with technology strong but industrial weak."
            ],
            economicIndicators: {
                ismPMI: {
                    value: 51.6,
                    change: 0.2,
                    description: "Manufacturing activity showed modest improvement in March."
                },
                adpNonfarm: {
                    value: 205000,
                    change: -10000,
                    description: "Private sector employment increased by 205,000 jobs."
                },
                nonfarmPayrolls: {
                    value: 235000,
                    change: -5000,
                    description: "The economy added 235,000 jobs in March."
                },
                unemploymentRate: {
                    value: 3.9,
                    change: 0,
                    description: "Unemployment rate remained stable at 3.9%."
                },
                cpi: {
                    value: 3.3,
                    change: 0.1,
                    description: "Consumer prices rose 3.3% year-over-year, slightly above February."
                },
                coreCPI: {
                    value: 3.6,
                    change: 0,
                    description: "Core inflation remained at 3.6% year-over-year."
                },
                gdp: {
                    value: 2.1,
                    change: -0.1,
                    description: "GDP grew at an annualized rate of 2.1% in Q1 2025."
                }
            }
        }
    ],
    // Related news
    relatedNews: [
        {
            id: 1,
            title: "Federal Reserve Signals Patience on Rate Cuts Amid Persistent Inflation",
            date: "3hours ago",
            tag: "Monetary Policy"
        },
        {
            id: 2,
            title: "Manufacturing Activity Expands for Third Consecutive Month",
            date: "5hours ago",
            tag: "Manufacturing"
        },
        {
            id: 3,
            title: "Consumer Spending Remains Resilient Despite Inflation Pressures",
            date: "7hours ago",
            tag: "Consumer Economy"
        },
        {
            id: 4,
            title: "Labor Market Shows Signs of Cooling as Job Openings Decline",
            date: "1day ago",
            tag: "Employment"
        }
    ]
};

const MacroPage = () => {
    // State for data
    const [indicators, setIndicators] = useState<Record<keyof MacroAnalysisData['dates'][0]['economicIndicators'], {
        value: number;
        change: number;
        description: string;
        previous: number; 
        forecast: number;
    }> | null>(null);

    const [dailyAnalysis, setDailyAnalysis] = useState({
        positiveFactors: [],
        riskFactors: [],
        mixedSignals: []
    });
    interface NewsItem {
        id: number;
        title: string;
        date: string;
        tag: string;
        url?: string; // Optional if not all news items have a URL
    }
    
    const [news, setNews] = useState<NewsItem[]>([]);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeIndicator, setActiveIndicator] = useState<keyof MacroAnalysisData['dates'][0]['economicIndicators']>('ismPMI');

    
    // Fetch available dates when component mounts
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);

                // Get available dates first
                const datesData = await fetchAvailableDates();
                setAvailableDates(datesData.dates);

                // Set most recent date as default
                const mostRecentDate = datesData.dates[0];
                const mostRecentMonth = mostRecentDate.split('-').slice(0, 2).join(' ');
                setSelectedDate(mostRecentDate);

                // Fetch data for the most recent date
                const [indicatorsData, analysisData, newsData] = await Promise.all([
                    fetchEconomicIndicators(mostRecentMonth),
                    fetchDailyAnalysis(mostRecentDate),
                    fetchMacroNews(mostRecentDate)
                ]);

                setIndicators(indicatorsData.indicators);
                setDailyAnalysis(analysisData);
                setNews(newsData.news);

                setLoading(false);
            } catch (error) {
                console.error('Error loading macro data:', error);
                setLoading(false);
                // You could set some error state here
            }
        };

        loadInitialData();
    }, []);

    // Fetch new data when date changes
    useEffect(() => {
        const updateDataForDate = async () => {
            if (!selectedDate) return;

            try {
                setLoading(true);

                const [analysisData, newsData] = await Promise.all([
                    fetchDailyAnalysis(selectedDate),
                    fetchMacroNews(selectedDate)
                ]);

                setDailyAnalysis(analysisData);
                setNews(newsData.news);

                setLoading(false);
            } catch (error) {
                console.error('Error updating data for date:', error);
                setLoading(false);
            }
        };

        updateDataForDate();
    }, [selectedDate]);


    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setCalendarOpen(false);
    };

    // Function to navigate to next/previous date
    const navigateDate = (direction: string) => {
        const currentIndex = availableDates.indexOf(selectedDate);

        if (direction === 'next' && currentIndex > 0) {
            setSelectedDate(availableDates[currentIndex - 1]);
        } else if (direction === 'prev' && currentIndex < availableDates.length - 1) {
            setSelectedDate(availableDates[currentIndex + 1]);
        }
    };
    if (loading) {
        console.log('Loading...');
    }
    // Enhanced month change handler
    const handleMonthChange = async (monthYear: string) => {
        try {
            setLoading(true);
            const indicatorsData = await fetchEconomicIndicators(monthYear);
            setIndicators(indicatorsData.indicators);

            // Find the first date in this month to update daily analysis too
            const [month, year] = monthYear.split(' ');
            const monthNumber = new Date(`${month} 1, ${year}`).getMonth() + 1;
            const monthPrefix = `${year}-${monthNumber.toString().padStart(2, '0')}`;

            // Find the first date in this month from available dates
            const firstDateInMonth = availableDates.find(date => date.startsWith(monthPrefix));
            if (firstDateInMonth) {
                setSelectedDate(firstDateInMonth);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error updating indicators for month:', error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Macro Analysis</h1>
                </div>

                {/* Economic Indicators Section - Now at the top */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            Economic Indicators
                            <svg className="w-5 h-5 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </h2>

                        {/* Month selector for economic indicators */}
                        <div className="flex items-center">
                            <label className="mr-2 text-gray-600 text-sm">Month:</label>
                            <select
                                className="bg-white border rounded-md px-3 py-1 text-gray-700 text-sm"
                                onChange={(e) => handleMonthChange(e.target.value)}
                            >
                                {availableDates.length > 0 ? (
                                    Array.from(new Set(availableDates.map(date => {
                                        const d = new Date(date);
                                        return `${d.toLocaleString('en-US', { month: 'long' })} ${d.getFullYear()}`;
                                    }))).map(monthYear => (
                                        <option key={monthYear} value={monthYear}>
                                            {monthYear}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Loading...</option>
                                )}
                            </select>
                        </div>
                    </div>

                    {/* Indicator tabs */}
                    <div className="flex flex-wrap border-b mb-6 overflow-x-auto">
                        <button
                            className={`px-4 py-2 font-medium whitespace-nowrap ${activeIndicator === 'ismPMI' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveIndicator('ismPMI')}
                        >
                            ISM PMI
                        </button>
                        <button
                            className={`px-4 py-2 font-medium whitespace-nowrap ${activeIndicator === 'adpNonfarm' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveIndicator('adpNonfarm')}
                        >
                            ADP Nonfarm
                        </button>
                        <button
                            className={`px-4 py-2 font-medium whitespace-nowrap ${activeIndicator === 'nonfarmPayrolls' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveIndicator('nonfarmPayrolls')}
                        >
                            Nonfarm Payrolls
                        </button>
                        <button
                            className={`px-4 py-2 font-medium whitespace-nowrap ${activeIndicator === 'unemploymentRate' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveIndicator('unemploymentRate')}
                        >
                            Unemployment Rate
                        </button>
                        <button
                            className={`px-4 py-2 font-medium whitespace-nowrap ${activeIndicator === 'cpi' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveIndicator('cpi')}
                        >
                            CPI
                        </button>
                        <button
                            className={`px-4 py-2 font-medium whitespace-nowrap ${activeIndicator === 'coreCPI' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveIndicator('coreCPI')}
                        >
                            Core CPI
                        </button>
                        <button
                            className={`px-4 py-2 font-medium whitespace-nowrap ${activeIndicator === 'gdp' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveIndicator('gdp')}
                        >
                            GDP
                        </button>
                    </div>

                    {/* Active indicator content */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        {(() => {
                            const indicator = indicators ? indicators[activeIndicator] : null;
                            const indicatorNames = {
                                ismPMI: "ISM Manufacturing PMI",
                                adpNonfarm: "ADP Nonfarm Employment Change",
                                nonfarmPayrolls: "Nonfarm Payrolls",
                                unemploymentRate: "Unemployment Rate",
                                cpi: "Consumer Price Index (YoY)",
                                coreCPI: "Core Consumer Price Index (YoY)",
                                gdp: "GDP Growth Rate (QoQ)"
                            };

                            const formatValue = (key: keyof MacroAnalysisData['dates'][0]['economicIndicators'], value: number | null) => {
                                if (!value && value !== 0) return 'N/A';

                                if (key === 'unemploymentRate' || key === 'cpi' || key === 'coreCPI' || key === 'gdp') {
                                    return `${value}%`;
                                } else if (key === 'adpNonfarm' || key === 'nonfarmPayrolls') {
                                    return `${value.toLocaleString()}`;
                                }
                                return value;
                            };

                            const formatChange = (value: number | null) => {
                                if (!value && value !== 0) return <span className="text-gray-600">N/A</span>;

                                if (value > 0) {
                                    return <span className="text-green-600">+{value}</span>;
                                } else if (value < 0) {
                                    return <span className="text-red-600">{value}</span>;
                                }
                                return <span className="text-gray-600">0</span>;
                            };

                            return (
                                <div className="p-5 border rounded-lg shadow-md bg-gradient-to-r from-slate-50 to-white">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                                        <span className="text-blue-600 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        {indicatorNames[activeIndicator]}
                                    </h3>

                                    {/* Main indicator value and change - with enhanced styling */}
                                    <div className="flex items-baseline mb-6 bg-white p-4 rounded-lg shadow-sm">
                                        {indicator ? (
                                            <div className="text-4xl font-bold mr-4 text-blue-700">{formatValue(activeIndicator, indicator.value)}</div>
                                        ) : (
                                            <div className="text-4xl font-bold mr-4 text-gray-400">N/A</div>
                                        )}
                                        {indicator ? (
                                            <div className="text-lg">
                                                Change: {formatChange(indicator.change)}
                                            </div>
                                        ) : (
                                            <div className="text-lg">
                                                Change: <span className="text-gray-500">N/A</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Previous and Forecasted Data */}
                                    {indicator && (
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100">
                                                <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Previous</div>
                                                <div className="font-medium text-lg">{formatValue(activeIndicator, indicator.previous)}</div>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100">
                                                <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Forecast</div>
                                                <div className="font-medium text-lg">{formatValue(activeIndicator, indicator.forecast)}</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* AI Analysis with enhanced styling */}
                                    {indicator && (
                                        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100 relative overflow-hidden">
                                            {/* AI 'brain' icon in the corner */}
                                            <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-800">
                                                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A1.5 1.5 0 0 0 6 14.5 1.5 1.5 0 0 0 7.5 16 1.5 1.5 0 0 0 9 14.5 1.5 1.5 0 0 0 7.5 13m9 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                                                </svg>
                                            </div>

                                            <div className="flex items-center mb-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-md font-semibold text-blue-800">Qraft Agent Analysis</h4>
                                            </div>

                                            <div className="pl-11"> {/* Align with the icon above */}
                                                <p className="text-gray-700 leading-relaxed">{indicator.description}</p>

                                                {/* Animated typing effect indicator */}
                                                <div className="flex mt-2 text-blue-600 text-sm items-center">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
                                                    <span>AI Insights</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Chart with better styling */}
                                    <div className="mt-6 bg-white border border-gray-200 h-64 rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                                        {indicator ? (
                                            <div className="text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                </svg>
                                                <p className="text-gray-600">Chart for {indicatorNames[activeIndicator]}</p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No data available for this indicator.</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>

                {/* Daily Analysis - AI Agent Design */}
                <div className="mb-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Daily Market Intelligence</h2>
                    </div>

                    {/* Enhanced Date Selector */}
                    <div className="flex items-center mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow-sm">
                        <div className="mr-2 text-blue-800 font-medium">Analysis Date:</div>
                        <div className="relative">
                            <button
                                className="flex items-center bg-white border border-blue-200 rounded-md px-4 py-2 text-blue-700 hover:bg-blue-50 shadow-sm transition-all duration-200"
                                onClick={() => setCalendarOpen(!calendarOpen)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(selectedDate)}
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {calendarOpen && (
                                <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-md border border-blue-100 z-10 w-64">
                                    <div className="p-3">
                                        <div className="flex justify-between mb-2 border-b pb-2">
                                            <div className="text-blue-800 font-medium">Select Date</div>
                                            <button
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                                onClick={() => setCalendarOpen(false)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto py-1">
                                            {availableDates.map(date => (
                                                <button
                                                    key={date}
                                                    className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${date === selectedDate
                                                        ? 'bg-blue-100 text-blue-800 font-medium'
                                                        : 'hover:bg-gray-50 text-gray-700'
                                                        }`}
                                                    onClick={() => handleDateSelect(date)}
                                                >
                                                    {formatDate(date)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="ml-auto flex">
                            <button
                                className="w-8 h-8 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors mr-1"
                                onClick={() => navigateDate('prev')}
                                disabled={availableDates.indexOf(selectedDate) === availableDates.length - 1}
                                title="Previous day"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                            <button
                                className="w-8 h-8 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                                onClick={() => navigateDate('next')}
                                disabled={availableDates.indexOf(selectedDate) === 0}
                                title="Next day"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* AI Analysis Dashboard */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Positive Factors Section - Enhanced */}
                        <div className="relative overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                            <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-green-800">Positive Factors</h2>
                                </div>
                                <ul className="space-y-3 pl-11">
                                    {dailyAnalysis.positiveFactors && dailyAnalysis.positiveFactors.length > 0 ? (
                                        dailyAnalysis.positiveFactors.map((factor, index) => (
                                            <li key={index} className="flex items-start bg-white bg-opacity-60 p-3 rounded-md border border-green-100 shadow-sm">
                                                <span className="text-green-500 font-bold mr-2">+</span>
                                                <span className="text-gray-800">{factor}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500 bg-white bg-opacity-60 p-3 rounded-md">No positive factors data available</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Risk Factors Section - Enhanced */}
                        <div className="relative overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-red-50 to-rose-50 border border-red-100">
                            <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-red-800">Risk Factors</h2>
                                </div>
                                <ul className="space-y-3 pl-11">
                                    {dailyAnalysis.riskFactors && dailyAnalysis.riskFactors.length > 0 ? (
                                        dailyAnalysis.riskFactors.map((factor, index) => (
                                            <li key={index} className="flex items-start bg-white bg-opacity-60 p-3 rounded-md border border-red-100 shadow-sm">
                                                <span className="text-red-500 font-bold mr-2">-</span>
                                                <span className="text-gray-800">{factor}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500 bg-white bg-opacity-60 p-3 rounded-md">No risk factors data available</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Mixed Signals Section - Enhanced */}
                        <div className="relative overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-amber-50 to-yellow-50 border border-yellow-100">
                            <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-9a1 1 0 011 1v3a1 1 0 01-1 1H7a1 1 0 110-2h2V8a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-yellow-800">Mixed Signals & Contradictions</h2>
                                </div>
                                <ul className="space-y-3 pl-11">
                                    {dailyAnalysis.mixedSignals && dailyAnalysis.mixedSignals.length > 0 ? (
                                        dailyAnalysis.mixedSignals.map((signal, index) => (
                                            <li key={index} className="flex items-start bg-white bg-opacity-60 p-3 rounded-md border border-yellow-100 shadow-sm">
                                                <span className="text-yellow-600 font-bold mr-2">•</span>
                                                <span className="text-gray-800">{signal}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500 bg-white bg-opacity-60 p-3 rounded-md">No mixed signals data available</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related News Section - Enhanced */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Market News</h2>

                            {/* Animated typing effect indicator */}
                            <div className="ml-3 flex text-indigo-600 text-sm items-center">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full mr-1 animate-pulse"></div>
                                <span>AI Curated</span>
                            </div>
                        </div>
                        <Link href="/news" className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium flex items-center">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {news.length > 0 ? (
                            news.slice(0, 5).map(item => {
                                // Generate a random placeholder image based on categories or just random
                                // Option 1: Random selection from all placeholders
                                const placeholders = ['finance.jpg', 'markets.jpg', 'economy.jpg', 'stocks.jpg', 'currency.jpg'];
                                const randomIndex = Math.floor(Math.random() * placeholders.length);
                                const placeholderImage = `/images/news-placeholders/${placeholders[randomIndex]}`;

                                return (
                                    <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex hover:shadow-md transition-shadow duration-200 border border-gray-100">
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
                                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                <h3 className="font-medium text-gray-900 mb-1 hover:text-indigo-700 transition-colors">
                                                    {item.title}
                                                </h3>
                                            </a>
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
                                );
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
                </div>
            </div>
        </Layout>
    );
};

export default MacroPage;