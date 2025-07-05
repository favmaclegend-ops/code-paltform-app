from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Use SQLite for development (change to MySQL/PostgreSQL for production)
DATABASE_URL = "sqlite:///./codeplatform.db"

# For MySQL, uncomment and update the line below:
# DATABASE_URL = "mysql+pymysql://username:password@localhost:3306/codeplatform"

# For PostgreSQL, uncomment and update the line below:
# DATABASE_URL = "postgresql://username:password@localhost:5432/codeplatform"

engine = create_engine(
    DATABASE_URL, 
    echo=True,
    # SQLite specific configuration
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
