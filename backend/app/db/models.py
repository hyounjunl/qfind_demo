# backend/app/db/models.py
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey, schema
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base
from app.core.config import settings

class Stock(Base):
    __tablename__ = "stocks"
    __table_args__ = {'schema': settings.DB_SCHEMA}

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    current_price = Column(Float)
    market_cap = Column(Float)
    business_overview = Column(Text)
    market_position = Column(Text)
    operating_results = Column(Text)
    risk_assessment = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class StockPrice(Base):
    __tablename__ = "stock_prices"
    __table_args__ = {'schema': settings.DB_SCHEMA}

    id = Column(Integer, primary_key=True, index=True)
    stock_id = Column(Integer, ForeignKey(f"{settings.DB_SCHEMA}.stocks.id"))
    price = Column(Float)
    volume = Column(Integer)
    timestamp = Column(DateTime(timezone=True), index=True)
    
    stock = relationship("Stock", back_populates="prices")

# Add this relationship to the Stock model
Stock.prices = relationship("StockPrice", back_populates="stock")

class TrendingKeyword(Base):
    __tablename__ = "trending_keywords"
    __table_args__ = {'schema': settings.DB_SCHEMA}

    id = Column(Integer, primary_key=True, index=True)
    keyword = Column(String, index=True)
    rank = Column(Integer)
    timestamp = Column(DateTime(timezone=True), index=True, server_default=func.now())

class MacroIndicator(Base):
    __tablename__ = "macro_indicators"
    __table_args__ = {'schema': settings.DB_SCHEMA}

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    value = Column(Float)
    previous_value = Column(Float)
    change = Column(Float)
    change_percent = Column(Float)
    timestamp = Column(DateTime(timezone=True), index=True)

class News(Base):
    __tablename__ = "market_news"
    __table_args__ = {'schema': settings.DB_AGII}

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime(timezone=True), nullable=False)  
    category = Column(Text, nullable=False)                 
    headline = Column(String(1000), nullable=False)        
    body = Column(Text, nullable=False)                    
    source = Column(String(50), nullable=False)            
    url = Column(String(1000), nullable=True) 
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

class TrendingTicker(Base):
    __tablename__ = "trending_tickers"
    __table_args__ = {'schema': settings.DB_SCHEMA}

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    name = Column(String)
    last_price = Column(Float)
    change = Column(Float)
    change_percent = Column(Float)
    timestamp = Column(DateTime(timezone=True), index=True, server_default=func.now())

class MacroAnalysisState(Base):
    __tablename__ = "macro_analysis_states"
    __table_args__ = {'schema': settings.DB_SCHEMA}

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), index=True, server_default=func.now())
    year_month_date = Column(DateTime(timezone=True), index=True)
    output_report_dir = Column(String)
    news_data_path = Column(String)
    cme_fedwatch_data_path = Column(String)
    remaining_days = Column(Integer)
    
    # JSON fields for complex data structures
    economic_indicator_values = Column(Text)  # Stored as JSON string
    news_items = Column(Text)  # Stored as JSON string
    answer = Column(Text)
    economic_raw_data = Column(Text)  # Stored as JSON string
    economic_analysis = Column(Text)  # Stored as JSON string
    extracted_contents = Column(Text)  # Stored as JSON string
    summarized_contents = Column(Text)  # Stored as JSON string
    filtered_summarized_contents = Column(Text)  # Stored as JSON string
    final_analysis_results = Column(Text)  # Stored as JSON string
    
    # Add timestamps for tracking
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())