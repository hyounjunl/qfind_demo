import json
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import os
import random

class FuturesService:
    def __init__(self):
        # Map our futures symbols to data files or external API symbols
        self.symbol_mapping = {
            "ES": "S&P 500 선물",
            "NQ": "나스닥 100 선물",
            "YM": "다우존스 선물",
            "CL": "크루드 오일",
            "GC": "골드",
            "ZB": "30년 국채",
            "ZN": "10년 국채",
            "ZF": "5년 국채",
            "6E": "유로",
            "6J": "일본 엔"
        }
        
        # Attempt to load data from CSV file
        self.data_path = "data/all_financial_data.csv"
        self.price_data = {}
        self._load_data()
    
    def _load_data(self):
        """Load real data if available, otherwise generate mock data"""
        try:
            if os.path.exists(self.data_path):
                df = pd.read_csv(self.data_path)
                df.set_index('Date', inplace=True)
                
                # Convert data to our internal format for each symbol
                for symbol, korean_name in self.symbol_mapping.items():
                    if korean_name in df.columns:
                        prices = df[korean_name].dropna()
                        dates = prices.index.tolist()
                        
                        # Create price history with realistic volume
                        price_history = []
                        for i, (date_str, price) in enumerate(zip(dates, prices.values)):
                            price_history.append({
                                "date": date_str,
                                "price": price,
                                "volume": int(np.random.normal(1000000, 300000))  # Random volume
                            })
                        
                        self.price_data[symbol] = price_history
                print("Loaded real futures data from CSV")
            else:
                # Generate mock data if file doesn't exist
                self._generate_mock_data()
        except Exception as e:
            print(f"Error loading futures data: {e}")
            self._generate_mock_data()
    
    def _generate_mock_data(self):
        """Generate mock price data for futures"""
        print("Generating mock futures data")
        end_date = datetime.now()
        start_date = end_date - timedelta(days=180)
        
        # Generate dates
        date_range = []
        current_date = start_date
        while current_date <= end_date:
            if current_date.weekday() < 5:  # Only weekdays
                date_range.append(current_date)
            current_date += timedelta(days=1)
        
        # Base prices for different symbols
        base_prices = {
            "ES": 5200, "NQ": 18000, "YM": 42000, "CL": 80, 
            "GC": 2300, "ZB": 118, "ZN": 112, "ZF": 108,
            "6E": 1.1, "6J": 0.0068
        }
        
        # Generate random walk price data for each symbol
        for symbol, base_price in base_prices.items():
            price = base_price
            price_history = []
            
            for date in date_range:
                # Random daily change
                daily_change_pct = np.random.normal(0, 0.01)  # Mean 0, std 1%
                price = price * (1 + daily_change_pct)
                
                # Add some volume
                volume = int(np.random.normal(1000000, 300000))
                
                price_history.append({
                    "date": date.strftime("%Y-%m-%d"),
                    "price": price,
                    "volume": volume
                })
            
            self.price_data[symbol] = price_history
    
    def get_futures_data(self, symbol: str) -> Dict:
        """Get complete futures data including price history"""
        if symbol not in self.price_data:
            return None
        
        price_history = self.price_data[symbol]
        
        # Calculate current price and stats from the latest data point
        latest = price_history[-1]
        previous = price_history[-2] if len(price_history) > 1 else {"price": latest["price"]}
        
        daily_change = latest["price"] - previous["price"]
        daily_change_percent = (daily_change / previous["price"]) * 100
        
        # Calculate volatility (standard deviation of daily returns)
        prices = [point["price"] for point in price_history]
        daily_returns = [prices[i]/prices[i-1]-1 for i in range(1, len(prices))]
        volatility = np.std(daily_returns) * 100 * np.sqrt(252)  # Annualized
        
        # Create a complete futures data response
        return {
            "currentPrice": latest["price"],
            "dailyChange": daily_change,
            "dailyChangePercent": daily_change_percent,
            "volume": latest["volume"],
            "openInterest": int(latest["volume"] * 1.5),  # Mock value
            "volatility": round(volatility, 1),
            "priceHistory": price_history,
            # Additional data remains the same as your dummy data
            "support": self._calculate_support_levels(prices),
            "resistance": self._calculate_resistance_levels(prices),
            "sentiment": self._calculate_sentiment(daily_returns),
            # Rest of the data structure remains the same as in your dummy data
        }
    
    def _calculate_support_levels(self, prices):
        """Calculate support levels based on price history"""
        min_price = min(prices)
        max_price = max(prices)
        current = prices[-1]
        
        return [
            round(current * 0.99, 2),
            round(current * 0.97, 2),
            round(current * 0.95, 2)
        ]
    
    def _calculate_resistance_levels(self, prices):
        """Calculate resistance levels based on price history"""
        min_price = min(prices)
        max_price = max(prices)
        current = prices[-1]
        
        return [
            round(current * 1.01, 2),
            round(current * 1.03, 2),
            round(current * 1.05, 2)
        ]
    
    def _calculate_sentiment(self, returns):
        """Calculate sentiment based on recent returns"""
        if not returns:
            return 0
            
        # Weight recent returns more heavily
        weighted_returns = np.array(returns[-10:]) * np.linspace(0.5, 1.0, min(10, len(returns)))
        sentiment = np.mean(weighted_returns) * 20  # Scale to roughly -1 to 1
        return max(min(sentiment, 1.0), -1.0)  # Clamp to [-1, 1]