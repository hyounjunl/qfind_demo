# backend/app/services/init_service.py
from sqlalchemy.orm import Session
from app.db import models
from app.db.database import engine, SessionLocal
from app.core.config import settings
import datetime

def init_db():
    """Initialize the database with tables"""
    # Create schema if it doesn't exist
    # with engine.connect() as connection:
    #     connection.execute(f"CREATE SCHEMA IF NOT EXISTS {settings.DB_SCHEMA}")
    
    # Create tables
    models.Base.metadata.create_all(bind=engine)
    print(f"Database tables created in schema '{settings.DB_SCHEMA}'.")

def get_or_create_default_data():
    """Add some default data if tables are empty"""
    db = SessionLocal()
    try:
        # Check if we have any stocks
        stock_count = db.query(models.Stock).count()
        if stock_count == 0:
            # Add Tesla as a default stock
            tesla = models.Stock(
                symbol="TSLA",
                name="Tesla, Inc.",
                current_price=361.41,
                market_cap=47968.36,
                business_overview="Tesla, Inc. designs, develops, manufactures, and sells electric vehicles, energy generation and storage systems.",
                market_position="Tesla is a leading manufacturer of electric vehicles with a significant market share in the premium EV segment.",
                operating_results="Tesla has shown consistent growth in vehicle deliveries and revenue over the past several quarters.",
                risk_assessment="Key risks include competition in the EV market, supply chain disruptions, and regulatory challenges."
            )
            db.add(tesla)
            db.commit()
            print("Added default stock: Tesla")
            
            # Add trending keywords
            keywords = ["Tesla", "Tesla", "Tesla", "Tesla", "Tesla", "Tesla", "Tesla", "Tesla",
                       "Tesla", "Tesla", "Tesla", "Tesla", "Tesla", "Tesla", "Tesla", "Tesla"]
            
            for i, keyword in enumerate(keywords):
                trending_keyword = models.TrendingKeyword(
                    keyword=keyword,
                    rank=i+1,
                    timestamp=datetime.datetime.now()
                )
                db.add(trending_keyword)
            
            db.commit()
            print("Added trending keywords")
            
            # Add trending tickers
            tickers = [
                {"symbol": "DJI", "name": "Dow Jones", "last_price": 42803.72, "change": 222.64, "change_percent": 0.52},
                {"symbol": "SPX", "name": "S&P 500", "last_price": 5770.20, "change": 31.68, "change_percent": 0.55},
                {"symbol": "COMP", "name": "Nasdaq", "last_price": 18195.22, "change": 126.97, "change_percent": 0.70},
                {"symbol": "RUT", "name": "Small Cap 2000", "last_price": 2074.10, "change": 7.55, "change_percent": 0.37},
                {"symbol": "VIX", "name": "S&P 500 VIX", "last_price": 23.37, "change": -1.50, "change_percent": -6.03},
                {"symbol": "FTSE", "name": "S&P/TSX", "last_price": 24756.76, "change": 174.72, "change_percent": 0.71},
                {"symbol": "BVP", "name": "Bovespa", "last_price": 125.035, "change": 1.677, "change_percent": 1.36},
                {"symbol": "MXX", "name": "S&P/BMV IPC", "last_price": 52839.63, "change": 23.20, "change_percent": 0.04},
                {"symbol": "GDOW", "name": "MSCI World", "last_price": 3739.62, "change": -0.75, "change_percent": -0.02},
                {"symbol": "DAX", "name": "DAX", "last_price": 23008.94, "change": -10.54, "change_percent": -1.20},
            ]
            
            for ticker_data in tickers:
                ticker = models.TrendingTicker(
                    symbol=ticker_data["symbol"],
                    name=ticker_data["name"],
                    last_price=ticker_data["last_price"],
                    change=ticker_data["change"],
                    change_percent=ticker_data["change_percent"],
                    timestamp=datetime.datetime.now()
                )
                db.add(ticker)
            
            db.commit()
            print("Added trending tickers")
            
            # Add news items
            for i in range(10):
                news = models.News(
                    title="Header",
                    subheading="Subhead before 3hours",
                    published_time="3hours",
                    tag="Tag",
                    timestamp=datetime.datetime.now()
                )
                db.add(news)
            
            db.commit()
            print("Added news items")
            
            # Add macro indicators
            indicators = [
                {"name": "ISM PMI", "value": 52.7, "previous_value": 51.5, "change": 1.2, "change_percent": 2.33},
                {"name": "ADP Nonfarm", "value": 184.0, "previous_value": 177.0, "change": 7.0, "change_percent": 3.95},
                {"name": "Nonfarm Payrolls", "value": 236.0, "previous_value": 223.0, "change": 13.0, "change_percent": 5.83},
                {"name": "Unemployment Rate", "value": 3.7, "previous_value": 3.8, "change": -0.1, "change_percent": -2.63},
                {"name": "CPI", "value": 3.1, "previous_value": 3.2, "change": -0.1, "change_percent": -3.12},
                {"name": "Core CPI", "value": 3.8, "previous_value": 3.9, "change": -0.1, "change_percent": -2.56},
                {"name": "GDP", "value": 3.4, "previous_value": 3.2, "change": 0.2, "change_percent": 6.25}
            ]
            
            for indicator_data in indicators:
                indicator = models.MacroIndicator(
                    name=indicator_data["name"],
                    value=indicator_data["value"],
                    previous_value=indicator_data["previous_value"],
                    change=indicator_data["change"],
                    change_percent=indicator_data["change_percent"],
                    timestamp=datetime.datetime.now()
                )
                db.add(indicator)
            
            db.commit()
            print("Added macro indicators")
            
    finally:
        db.close()