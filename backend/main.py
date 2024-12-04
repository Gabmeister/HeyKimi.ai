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

TODAYS_ACCOUNTS = [
    {
        "name": "Arasaka",
        "industry": "Technology",
        "website": "https://www.arasakagonk.com",
        "employees": 150,
        "location": "Cork, IE",
    },
    {
        "name": "Militech",
        "industry": "Defense",
        "website": "https://www.Militechnova.ie",
        "employees": 80,
        "location": "Dublin, IE",
    },
    {
        "name": "PreemEddies",
        "industry": "Finance",
        "website": "https://www.finprime.com",
        "employees": 300,
        "location": "New York, NY",
    },
    {
        "name": "EduSpark",
        "industry": "Education",
        "website": "https://www.eduspark.com",
        "employees": 50,
        "location": "Boston, MA",
    },
    {
        "name": "DavidWillHeal",
        "industry": "Healthcare",
        "website": "https://www.davidthedoctor.com",
        "employees": 200,
        "location": "Berlin, DE",
    },
]

MOCK_USERS = { #dummy data
    "admin": {
        "password": "password",
        "email": "admin@kimideveloper.com",
        "full_name": "Gabriel Plaza",
        "company_name": "HeyKimi.ai",
        "industry": "Technology",
        "subscription_plan": "Pro Plan",
        "account_created": "2024-11-26",
        "emails_sent": 177,
        "replies_received": 42,
        "pending_accounts": len(TODAYS_ACCOUNTS),
    },
    "johndoe1": {
        "password": "password123",
        "email": "john.doe@startup.com",
        "full_name": "John Doe",
        "company_name": "Doe Enterprises",
        "industry": "Finance",
        "subscription_plan": "Free Plan",
        "account_created": "2024-12-02",
        "emails_sent": 69,
        "replies_received": 7,
        "pending_accounts": len(TODAYS_ACCOUNTS),
    },
}


class LoginRequest(BaseModel):
    username: str
    password: str

class UpdateUserRequest(BaseModel):
    full_name: str
    email: str
    
@app.get("/api/todays_accounts")
def get_todays_accounts():
    return {"accounts": TODAYS_ACCOUNTS}
    
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
            "subscription_plan": user_data["subscription_plan"],
            "account_created": user_data["account_created"],
            "emails_sent": user_data["emails_sent"],  
            "replies_received": user_data["replies_received"],  
            "pending_accounts": user_data["pending_accounts"], 
        }
    else:
        raise HTTPException(status_code=404, detail="User not found")   

@app.put("/user/{username}")
def update_user(username: str, data: UpdateUserRequest):
    user = MOCK_USERS.get(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["full_name"] = data.full_name
    user["email"] = data.email
    return {"message": "User updated successfully", "user": user}