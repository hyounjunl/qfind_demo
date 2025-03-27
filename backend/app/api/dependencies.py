# backend/app/api/dependencies.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.db.database import get_db

# This would be used for authentication later
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Add more dependencies as needed