# backend/app/db/database.py
from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.schema import CreateSchema

from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)

# Create the schema if it doesn't exist
@event.listens_for(engine, "connect")
def create_schema(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute(f"CREATE SCHEMA IF NOT EXISTS {settings.DB_SCHEMA}")
    cursor.close()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
# Set the default schema for all tables
Base.metadata.schema = settings.DB_SCHEMA

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()