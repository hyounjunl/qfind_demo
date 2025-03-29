from datetime import date, datetime, timedelta
import json
from typing import List, Optional, Dict
import random
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import extract
from app.db.database import get_db
from app.db.models import MacroAnalysisState, News
from sqlalchemy import func

# Temporary dummy data - replace with database queries later
class MacroService:
    def __init__(self):
        # Generate some sample dates for the last 30 days
        today = datetime.now()
        self.available_dates = [(today - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(90)]
        self.available_months = list(set([d[:7] for d in self.available_dates]))
    
    def get_available_dates(self) -> Dict:
        """Return available dates for macro analysis data"""
        months = []
        for month_year in self.available_months:
            year, month = month_year.split("-")
            month_name = datetime.strptime(month, "%m").strftime("%B")
            months.append(f"{month_name} {year}")
        
        return {
            "dates": self.available_dates,
            "months": sorted(months, reverse=True)
        }
    
    def get_economic_indicators(self, month: Optional[str] = None, db: Session = None) -> Dict:
        """Get economic indicators data for a specific month"""
        # Get the database session
        if db is None:
            db = next(get_db())
        
        try:
            # Handle different month parameter formats
            year = datetime.now().year
            month_num = None
            month_str = None
            
            # Case 1: Month provided as a numeric value (1-12)
            if month and month.isdigit():
                month_num = int(month)
                # Create a datetime object with year and month to get the month name
                month_date = datetime(year, month_num, 1)
                month_str = month_date.strftime("%B %Y")
            
            # Case 2: Month provided as "Month Year" format
            elif month:
                try:
                    month_date = datetime.strptime(month, "%B %Y")
                    year = month_date.year
                    month_num = month_date.month
                    month_str = month
                except ValueError:
                    # Handle invalid format
                    month_date = datetime.now()
                    year = month_date.year
                    month_num = month_date.month
                    month_str = month_date.strftime("%B %Y")
            
            # Case 3: No month provided, use current month
            else:
                month_date = datetime.now()
                year = month_date.year
                month_num = month_date.month
                month_str = month_date.strftime("%B %Y")
            
            # Query using extract for proper date filtering and include final_analysis_results
            result = db.query(
                MacroAnalysisState.id,
                MacroAnalysisState.year_month_date,
                MacroAnalysisState.economic_indicator_values,
                MacroAnalysisState.final_analysis_results
            ).filter(
                extract('year', MacroAnalysisState.year_month_date) == year,
                extract('month', MacroAnalysisState.year_month_date) == month_num,
            ).order_by(MacroAnalysisState.year_month_date.desc()).first()
            
            # Default response if no data found
            if not result:
                return {
                    "month": month,
                    "indicators": {}
                }
            
            # Parse the economic indicator values from JSON field
            # When using query with specific columns, the result is a tuple
            economic_indicator_values = result[2]  # Index 2 corresponds to economic_indicator_values
            final_analysis_results = result[3]  # Index 3 corresponds to final_analysis_results
            
            # Handle None values
            if not economic_indicator_values:
                return {
                    "month": month,
                    "indicators": {}
                }
                
            # Parse economic indicator values
            if isinstance(economic_indicator_values, dict):
                indicator_data = economic_indicator_values
            else:
                try:
                    indicator_data = json.loads(economic_indicator_values)
                except (json.JSONDecodeError, TypeError):
                    print(f"Error parsing JSON economic_indicator_values: {economic_indicator_values}")
                    return {
                        "month": month,
                        "indicators": {},
                        "error": "Unable to parse economic indicators data"
                    }
            
            # Parse final analysis results
            analysis_data = {}
            if final_analysis_results:
                if isinstance(final_analysis_results, dict):
                    analysis_data = final_analysis_results
                else:
                    try:
                        analysis_data = json.loads(final_analysis_results)
                    except (json.JSONDecodeError, TypeError):
                        print(f"Error parsing JSON final_analysis_results: {final_analysis_results}")
                        # Continue without analysis data
                        pass
                
        except Exception as e:
            # Log the error for debugging
            print(f"Error retrieving economic indicators: {e}")
            return {
                "month": month,
                "indicators": {},
                "error": "Unable to retrieve economic indicators data"
            }
        
        # Map indicator names from database to frontend display names
        indicator_mapping = {
            "ISM_Manufacturing_PMI": "ismPMI",
            "ADP_Nonfarm_Employment_Change": "adpNonfarm",
            "Nonfarm_Payrolls": "nonfarmPayrolls",
            "Unemployment_Rate": "unemploymentRate",
            "CPI_(YoY)": "cpi",
            "Core_CPI": "coreCPI",
            "GDP": "gdp"
        }
        
        # Basic descriptions for each indicator (fallback if analysis data is not available)
        base_description_mapping = {
            "ismPMI": "Manufacturing activity index, values above 50 indicate expansion.",
            "adpNonfarm": "Private sector employment change report by ADP.",
            "nonfarmPayrolls": "Total number of paid U.S. workers, excluding farm workers and some other categories.",
            "unemploymentRate": "Percentage of the total labor force that is unemployed but actively seeking employment.",
            "cpi": "Consumer prices year-over-year change, measuring inflation.",
            "coreCPI": "Core inflation, excluding food and energy, year-over-year.",
            "gdp": "Gross Domestic Product growth rate, annualized."
        }
        
        # Process the indicators
        processed_indicators = {}
        for db_name, front_name in indicator_mapping.items():
            if db_name in indicator_data:
                indicator_info = indicator_data[db_name]
                
                # Get the basic description
                base_description = base_description_mapping.get(front_name, "")
                
                # Extract detailed analysis if available
                detailed_description = ""
                if db_name in analysis_data:
                    analysis_info = analysis_data[db_name]
                    
                    # Concatenate the different analysis types
                    analysis_sections = []
                
                    
                    if "interest_rate_final" in analysis_info:
                        analysis_sections.append(f"{analysis_info['interest_rate_final']}\n\n")
                    
                    if "stock_market_final" in analysis_info:
                        analysis_sections.append(f"{analysis_info['stock_market_final']}\n")
                    
                    if analysis_sections:
                        detailed_description = " ".join(analysis_sections)
                
                # Use the detailed description if available, otherwise fall back to basic description
                final_description = detailed_description if detailed_description else base_description
                
                # Ensure numeric values are properly handled
                value = indicator_info.get("actual")
                change = indicator_info.get("change")
                previous = indicator_info.get('previous')
                forecast = indicator_info.get('estimate')
                
                # Convert None to 0.0 or handle according to your needs
                if value is None:
                    value = 0.0
                if change is None:
                    change = 0.0
                if previous is None:
                    previous = 0.0
                if forecast is None:
                    forecast = 0.0
                
                processed_indicators[front_name] = {
                    "value": value,
                    "change": change,
                    "previous": previous,
                    "forecast": forecast,
                    "description": final_description
                }
        
        return {
            "month": month_str,
            "indicators": processed_indicators
        }
    
    def get_daily_analysis(self, date_str: Optional[str] = None) -> Dict:
        """Get daily market analysis for a specific date"""
        # If no date provided, use today's date
        if not date_str:
            date_str = datetime.now().strftime("%Y-%m-%d")
        
        # Example dummy data
        return {
            "date": date_str,
            "positiveFactors": [
                "Consumer spending increased by 0.8% in February, exceeding expectations of 0.5% growth.",
                "Manufacturing activity expanded for the third consecutive month, with the ISM Manufacturing Index at 52.3.",
                "Corporate earnings for Q1 are projected to grow by 6.2% year-over-year, above the previous estimate of 5.7%.",
                "Housing market showed resilience with new home sales increasing 3.2% in February."
            ],
            "riskFactors": [
                "Inflation remains elevated at 2.9% year-over-year, above the Federal Reserve's 2% target.",
                "Federal Reserve indicated it may delay rate cuts until later in the year.",
                "Government debt reached a record high of $34.5 trillion, raising concerns about fiscal sustainability.",
                "Labor market showing signs of cooling with job openings declining for two consecutive months."
            ],
            "mixedSignals": [
                "Oil prices have stabilized around $78 per barrel, but geopolitical tensions create uncertainty.",
                "Consumer sentiment improved slightly but remains below historical averages.",
                "Tech sector showing mixed performance with hardware sales declining while software services grow.",
                "International trade showing growth in exports but widening trade deficits with key partners."
            ]
        }
    
    def get_macro_news(self, date_str: Optional[str] = None, db: Session = None) -> Dict:
        """Get macro-related news for a specific date"""
        # If no date provided, use today's date
        if not date_str:
            date_str = datetime.now().strftime("%Y-%m-%d")

        if db is None:
            db = next(get_db())
        
        news_items = []
        try:
            # Convert date_str to datetime for filtering
            filter_date = datetime.strptime(date_str, "%Y-%m-%d")
            
            # Query news for the specified date
            result = db.query(
                News.id,
                News.date,
                News.category,
                News.headline
            ).filter(
                func.date(News.date) == filter_date.date(),
            ).order_by(News.date.desc())
            
            now = datetime.now()
            
            # Process the results and format dates
            for item in result:
                news_date = item.date
                time_diff = now - news_date
                
                # Format the date string based on how old it is
                if time_diff.days == 0:  # Today
                    if time_diff.seconds < 3600:  # Less than an hour
                        minutes = time_diff.seconds // 60
                        date_formatted = f"{minutes} min ago"
                    else:  # Hours ago
                        hours = time_diff.seconds // 3600
                        date_formatted = f"{hours} hours ago"
                else:  # Days ago
                    date_formatted = f"{time_diff.days} days ago"
                
                # Just create a dictionary with the right structure
                news_items.append({
                    "id": item.id,
                    "title": item.headline,
                    "date": date_formatted,
                    "tag": item.category[0]
                })
                    
        except Exception as e:
            print(f"Error retrieving macro news with error:{e}")
            # Return empty list if there's an error
            news_items = []
        
        # Return formatted response
        return {
            "date": filter_date.date(),  # Return as date object
            "news": news_items
        }