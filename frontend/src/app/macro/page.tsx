'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

// Helper function to format dates instead of using date-fns
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options);
};

// Dummy data for macro analysis
const macroAnalysisData = {
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
  // Find the most recent date in the data
  const mostRecentDate = macroAnalysisData.dates[0].date;
  
  // State for selected date
  const [selectedDate, setSelectedDate] = useState(mostRecentDate);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Find the data for the selected date
  const selectedDateData = macroAnalysisData.dates.find(d => d.date === selectedDate) || macroAnalysisData.dates[0];
  
  // Available dates for selection
  const availableDates = macroAnalysisData.dates.map(d => d.date);
  
  // Function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };
  
  // Function to go to previous or next date
  const navigateDate = (direction) => {
    const currentIndex = availableDates.indexOf(selectedDate);
    if (direction === 'prev' && currentIndex < availableDates.length - 1) {
      setSelectedDate(availableDates[currentIndex + 1]);
    } else if (direction === 'next' && currentIndex > 0) {
      setSelectedDate(availableDates[currentIndex - 1]);
    }
  };
  
  // Active economic indicator tab
  const [activeIndicator, setActiveIndicator] = useState('ismPMI');
  
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
              value={formatMonthYear(selectedDate)}
              onChange={(e) => {
                // Find the first date in the selected month
                const [month, year] = e.target.value.split(' ');
                const matchingDate = macroAnalysisData.dates.find(date => {
                  const d = new Date(date.date);
                  return d.getFullYear() === parseInt(year) && 
                         d.toLocaleString('en-US', { month: 'long' }) === month;
                });
                if (matchingDate) {
                  setSelectedDate(matchingDate.date);
                }
              }}
            >
              {/* Create unique month-year options */}
              {[...new Set(macroAnalysisData.dates.map(d => formatMonthYear(d.date)))].map(monthYear => (
                <option key={monthYear} value={monthYear}>
                  {monthYear}
                </option>
              ))}
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
            const indicator = selectedDateData.economicIndicators[activeIndicator];
            const indicatorNames = {
              ismPMI: "ISM Manufacturing PMI",
              adpNonfarm: "ADP Nonfarm Employment Change",
              nonfarmPayrolls: "Nonfarm Payrolls",
              unemploymentRate: "Unemployment Rate",
              cpi: "Consumer Price Index (YoY)",
              coreCPI: "Core Consumer Price Index (YoY)",
              gdp: "GDP Growth Rate (QoQ)"
            };
            
            const formatValue = (key, value) => {
              if (key === 'unemploymentRate' || key === 'cpi' || key === 'coreCPI' || key === 'gdp') {
                return `${value}%`;
              } else if (key === 'adpNonfarm' || key === 'nonfarmPayrolls') {
                return `${value.toLocaleString()}`;
              }
              return value;
            };
            
            const formatChange = (value) => {
              if (value > 0) {
                return <span className="text-green-600">+{value}</span>;
              } else if (value < 0) {
                return <span className="text-red-600">{value}</span>;
              }
              return <span className="text-gray-600">0</span>;
            };
            
            return (
              <div>
                <h3 className="text-xl font-semibold mb-3">{indicatorNames[activeIndicator]}</h3>
                <div className="flex items-baseline mb-4">
                  <div className="text-3xl font-bold mr-3">{formatValue(activeIndicator, indicator.value)}</div>
                  <div className="text-sm font-medium">
                    Change: {formatChange(indicator.change)}
                  </div>
                </div>
                <p className="text-gray-700">{indicator.description}</p>
                
                {/* Placeholder for chart */}
                <div className="mt-6 bg-gray-100 h-64 rounded-md flex items-center justify-center">
                  <div className="text-gray-500">Chart visualization would appear here</div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
      
      {/* Date selector - Now below the Economic Indicators */}
      <div className="mb-6 pt-6 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Analysis</h2>
        
        <div className="flex items-center mb-4">
          <div className="mr-2 text-gray-600">Date:</div>
          <div className="relative">
            <button 
              className="flex items-center bg-white border rounded-md px-3 py-1 text-gray-700 hover:bg-gray-50"
              onClick={() => setCalendarOpen(!calendarOpen)}
            >
              {formatDate(selectedDate)}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {calendarOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border z-10">
                <div className="p-2">
                  <div className="flex justify-between mb-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm"
                      onClick={() => setCalendarOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {availableDates.map(date => (
                      <button
                        key={date}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                          date === selectedDate ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
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
              className="px-2 py-1 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-600"
              onClick={() => navigateDate('prev')}
              disabled={availableDates.indexOf(selectedDate) === availableDates.length - 1}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button 
              className="px-2 py-1 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-600"
              onClick={() => navigateDate('next')}
              disabled={availableDates.indexOf(selectedDate) === 0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Positive Factors Section */}
      <div className="mb-8">
        <div className="bg-green-50 border-l-4 border-green-500 rounded-md p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Positive Factors</h2>
          <ul className="space-y-2">
            {selectedDateData.positiveFactors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-700">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Risk Factors Section */}
      <div className="mb-8">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Risk Factors</h2>
          <ul className="space-y-2">
            {selectedDateData.riskFactors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mixed Signals Section */}
      <div className="mb-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-md p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Mixed Signals & Contradictions</h2>
          <ul className="space-y-2">
            {selectedDateData.mixedSignals.map((signal, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-gray-700">{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Related News Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Related News</h2>
          <Link href="/news" className="text-blue-600 hover:underline text-sm">View All</Link>
        </div>
        
        <div className="space-y-4">
          {macroAnalysisData.relatedNews.map(news => (
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

export default MacroPage;