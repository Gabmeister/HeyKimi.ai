from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

#CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  #frontend origin
    allow_credentials=True,
    allow_methods=["*"],  #allow HTTP methods post,get etc
    allow_headers=["*"],  #allow all headers
)

MOCK_USERS = {
    "admin": "password",
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
    if username in MOCK_USERS and MOCK_USERS[username] == password:
        return {"message": "Login successful", "authenticated": True}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")