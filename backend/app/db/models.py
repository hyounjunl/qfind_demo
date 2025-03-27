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
    __tablename__ = "news"
    __table_args__ = {'schema': settings.DB_SCHEMA}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    subheading = Column(String)
    content = Column(Text, nullable=True)
    published_time = Column(String)  # Storing as "3hours ago" format
    tag = Column(String, nullable=True)
    timestamp = Column(DateTime(timezone=True), index=True, server_default=func.now())

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