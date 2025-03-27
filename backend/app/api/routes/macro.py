# backend/app/api/routes/macro.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.schemas import macro as macro_schemas

router = APIRouter()

@router.get("/indicators", response_model=List[macro_schemas.MacroIndicator])
def get_macro_indicators(db: Session = Depends(get_db)):
    # Mock data for initial implementation
    indicators = [
        {
            "id": 1, 
            "name": "ISM PMI", 
            "value": 52.7, 
            "previous_value": 51.5, 
            "change": 1.2, 
            "change_percent": 2.33,
            "timestamp": "2025-03-26T12:00:00Z"
        },
        {
            "id": 2, 
            "name": "ADP Nonfarm", 
            "value": 184.0, 
            "previous_value": 177.0, 
            "change": 7.0, 
            "change_percent": 3.95,
            "timestamp": "2025-03-26T12:00:00Z"
        },
        {
            "id": 3, 
            "name": "Nonfarm Payrolls", 
            "value": 236.0, 
            "previous_value": 223.0, 
            "change": 13.0, 
            "change_percent": 5.83,
            "timestamp": "2025-03-26T12:00:00Z"
        },
        {
            "id": 4, 
            "name": "Unemployment Rate", 
            "value": 3.7, 
            "previous_value": 3.8, 
            "change": -0.1, 
            "change_percent": -2.63,
            "timestamp": "2025-03-26T12:00:00Z"
        },
        {
            "id": 5, 
            "name": "CPI", 
            "value": 3.1, 
            "previous_value": 3.2, 
            "change": -0.1, 
            "change_percent": -3.12,
            "timestamp": "2025-03-26T12:00:00Z"
        },
        {
            "id": 6, 
            "name": "Core CPI", 
            "value": 3.8, 
            "previous_value": 3.9, 
            "change": -0.1, 
            "change_percent": -2.56,
            "timestamp": "2025-03-26T12:00:00Z"
        },
        {
            "id": 7, 
            "name": "GDP", 
            "value": 3.4, 
            "previous_value": 3.2, 
            "change": 0.2, 
            "change_percent": 6.25,
            "timestamp": "2025-03-26T12:00:00Z"
        }
    ]
    return indicators

@router.get("/analysis", response_model=macro_schemas.MacroAnalysis)
def get_macro_analysis(db: Session = Depends(get_db)):
    # Mock data for initial implementation
    analysis = {
        "id": 1,
        "date": "2025-03-28",
        "positive_factors": "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada.",
        "risk_factors": "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada.",
        "mixed_signals": "McKesson Corporation, established in 1833, is a leading healthcare services provider specializing in pharmaceutical distribution and medical-surgical supply solutions, primarily in the U.S. and Canada."
    }
    return analysis