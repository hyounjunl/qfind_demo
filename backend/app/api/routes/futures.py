# backend/app/api/routes/futures.py
from fastapi import APIRouter, Depends, HTTPException
from typing import Dict
from app.services.futures_service import FuturesService

router = APIRouter()
futures_service = FuturesService()

@router.get("/{symbol}")
def get_futures_data(symbol: str):
    """Get detailed data for a specific futures contract"""
    data = futures_service.get_futures_data(symbol)
    if not data:
        raise HTTPException(status_code=404, detail=f"Futures data for {symbol} not found")
    return data