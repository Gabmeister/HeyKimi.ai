from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  #frontend origin
    allow_credentials=True,
    allow_methods=["*"],  #allow HTTP methods post,get etc
    allow_headers=["*"],  #allow all headers
)

@app.get("/api")
def read_root():
    return {"message": "Welcome to the Backend..."}