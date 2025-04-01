
const BACKEND_API = 'http://localhost:8889'

export const fetchEconomicIndicators = async (month?: string) => {
    try {
      const params = month ? `?month=${encodeURIComponent(month)}` : '';
      const response = await fetch(`${BACKEND_API}/api/macro/indicators${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch economic indicators');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching economic indicators:', error);
      throw error;
    }
  };

  
  
//   {
//     "month": "March 2025",
//     "indicators": {
//       "ismPMI": {
//         "value": 52.3,
//         "change": 0.7,
//         "description": "Manufacturing activity expanded in March, with new orders and production showing particular strength."
//       },
//       "adpNonfarm": {
//         "value": 185000,
//         "change": -15000,
//         "description": "Private sector employment increased by 185,000 jobs in March, slightly below expectations."
//       },
//       "nonfarmPayrolls": {
//         "value": 207000,
//         "change": -18000,
//         "description": "The economy added 207,000 jobs in March, with the service sector leading growth."
//       },
//       "unemploymentRate": {
//         "value": 3.9,
//         "change": 0.1,
//         "description": "Unemployment rate ticked up to 3.9%, indicating slight cooling in the labor market."
//       },
//       "cpi": {
//         "value": 2.9,
//         "change": -0.1,
//         "description": "Consumer prices rose 2.9% year-over-year, showing modest cooling in inflation."
//       },
//       "coreCPI": {
//         "value": 3.2,
//         "change": -0.1,
//         "description": "Core inflation, excluding food and energy, was 3.2% year-over-year."
//       },
//       "gdp": {
//         "value": 2.4,
//         "change": 0.2,
//         "description": "GDP grew at an annualized rate of 2.4% in Q1 2025, above expectations."
//       }
//     }
//   }

export const fetchDailyAnalysis = async (date?: string) => {
    try {
      const params = date ? `?date=${date}` : '';
      const response = await fetch(`${BACKEND_API}/api/macro/analysis${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch daily analysis');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching daily analysis:', error);
      throw error;
    }
  };

//   {
//     "date": "2025-03-28",
//     "positiveFactors": [
//       "Consumer spending increased by 0.8% in February, exceeding expectations of 0.5% growth.",
//       "Manufacturing activity expanded for the third consecutive month, with the ISM Manufacturing Index at 52.3.",
//       "Corporate earnings for Q1 are projected to grow by 6.2% year-over-year, above the previous estimate of 5.7%.",
//       "Housing market showed resilience with new home sales increasing 3.2% in February."
//     ],
//     "riskFactors": [
//       "Inflation remains elevated at 2.9% year-over-year, above the Federal Reserve's 2% target.",
//       "Federal Reserve indicated it may delay rate cuts until later in the year.",
//       "Government debt reached a record high of $34.5 trillion, raising concerns about fiscal sustainability.",
//       "Labor market showing signs of cooling with job openings declining for two consecutive months."
//     ],
//     "mixedSignals": [
//       "Oil prices have stabilized around $78 per barrel, but geopolitical tensions create uncertainty.",
//       "Consumer sentiment improved slightly but remains below historical averages.",
//       "Tech sector showing mixed performance with hardware sales declining while software services grow.",
//       "International trade showing growth in exports but widening trade deficits with key partners."
//     ]
//   }


// Example implementation in your services/macro.ts file
  export const fetchMacroNews = async (date?: string) => {
    try {
      const params = date ? `?date=${date}` : '';
      const response = await fetch(`${BACKEND_API}/api/macro/news${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch macro news');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching macro news:', error);
      throw error;
    }
  };
  

//   {
//     "date": "2025-03-28",
//     "news": [
//       {
//         "id": 1,
//         "title": "Federal Reserve Signals Patience on Rate Cuts Amid Persistent Inflation",
//         "date": "3hours ago",
//         "tag": "Monetary Policy"
//       },
//       {
//         "id": 2,
//         "title": "Manufacturing Activity Expands for Third Consecutive Month",
//         "date": "5hours ago",
//         "tag": "Manufacturing"
//       },
//       {
//         "id": 3,
//         "title": "Consumer Spending Remains Resilient Despite Inflation Pressures",
//         "date": "7hours ago",
//         "tag": "Consumer Economy"
//       },
//       {
//         "id": 4,
//         "title": "Labor Market Shows Signs of Cooling as Job Openings Decline",
//         "date": "1day ago",
//         "tag": "Employment"
//       }
//     ]
//   }


// Example implementation in your services/macro.ts file
export const fetchAvailableDates = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/api/macro/dates`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch available dates');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching available dates:', error);
      throw error;
    }
  };

//   {
//     "dates": [
//       "2025-03-28",
//       "2025-03-27",
//       "2025-03-26",
//       "2025-03-25",
//       "2025-03-24",
//       "2025-03-21",
//       "2025-03-20"
//     ],
//     "months": [
//       "March 2025",
//       "February 2025",
//       "January 2025"
//     ]
//   }