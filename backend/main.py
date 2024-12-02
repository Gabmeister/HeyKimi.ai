from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

#CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],#frontend origin
    allow_credentials=True,
    allow_methods=["*"],  #allow HTTP methods post,get etc
    allow_headers=["*"],  #allow all headers
)

MOCK_USERS = { #dummy data
    "admin": {
        "password": "password",
        "email": "admin@kimideveloper.com",
        "full_name": "Gabriel Plaza",
        "company_name": "HeyKimi.ai",
        "industry": "Technology",
    },
    "johndoe1": {
        "password": "password123",
        "email": "john.doe@startup.com",
        "full_name": "John Doe",
        "company_name": "Doe Enterprises",
        "industry": "Finance",
    },
}

class LoginRequest(BaseModel):
    username: str
    password: str

@app.get("/api")
def read_root():
    return {"message": "backend is live.."}

@app.post("/login")
def login(data: LoginRequest):
    username = data.username
    password = data.password
    if username in MOCK_USERS and MOCK_USERS[username]["password"] == password:
        return {"message": "Login successful", "authenticated": True, "username": username}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
@app.get("/user/{username}")
def get_user_details(username: str):
    if username in MOCK_USERS:
        user_data = MOCK_USERS[username]
        return {
            "email": user_data["email"],
            "full_name": user_data["full_name"],
            "company_name": user_data["company_name"],
            "industry": user_data["industry"],
        }
    else:
        raise HTTPException(status_code=404, detail="User not found")   