from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
import models
import database

app = FastAPI(
    title="CodePlatform API",
    description="A modern learning and development platform API",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Configuration
SECRET_KEY = "your-secret-key-here"  # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Dependency to get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic schemas
class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str  # "student" or "lecturer"

class UserSignin(BaseModel):
    email: EmailStr
    password: str
    role: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
    message: str

# Utility functions
def get_user_by_email(db: Session, email: str, role: str):
    return db.query(models.User).filter(models.User.email == email, models.User.role == role).first()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Signup endpoint
@app.post("/signup", response_model=dict)
def signup(user: UserSignup, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = get_user_by_email(db, user.email, user.role)
    if db_user:
        raise HTTPException(
            status_code=400, 
            detail=f"An account with this email already exists for the {user.role} role"
        )
    
    # Validate role
    if user.role not in ["student", "lecturer"]:
        raise HTTPException(status_code=400, detail="Role must be either 'student' or 'lecturer'")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create user account")
    
    return {
        "message": f"{user.role.capitalize()} account created successfully",
        "user_id": new_user.id,
        "success": True
    }

# Signin endpoint
@app.post("/signin", response_model=TokenResponse)
def signin(user: UserSignin, db: Session = Depends(get_db)):
    # Validate role
    if user.role not in ["student", "lecturer"]:
        raise HTTPException(status_code=400, detail="Role must be either 'student' or 'lecturer'")
    
    # Get user from database
    db_user = get_user_by_email(db, user.email, user.role)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"No {user.role} account found with this email address"
        )
    
    # Verify password
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password"
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": db_user.email, "role": db_user.role, "user_id": db_user.id}
    )
    
    # Create user response
    user_response = UserResponse(
        id=db_user.id,
        username=db_user.username,
        email=db_user.email,
        role=db_user.role
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user_response,
        message=f"Welcome back, {db_user.username}!"
    )

@app.get("/")
def read_root():
    return {"message": "Welcome to the Code Platform API!"}