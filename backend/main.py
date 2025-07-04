from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from . import models, database

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

# Utility functions
def get_user_by_email(db: Session, email: str, role: str):
    return db.query(models.User).filter(models.User.email == email, models.User.role == role).first()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Signup endpoint
@app.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email, user.role)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists with this email and role")
    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": f"{user.role.capitalize()} signup successful", "user_id": new_user.id}

# Signin endpoint
@app.post("/signin")
def signin(user: UserSignin, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email, user.role)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials or role")
    return {"message": f"{user.role.capitalize()} signin successful", "user_id": db_user.id}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Code Platform API!"}