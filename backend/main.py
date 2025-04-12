from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI # openai==1.52.2

import uvicorn
import json

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dummy data
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@app.get("/api/data")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """
    body = await request.json()
    user_question = body.get("question", "")
    
    # Placeholder logic: echo the question or generate a simple response
    # Replace with real AI logic as desired (e.g., call to an LLM).
    client = OpenAI(
        api_key="up_IBmKFcZA5s80J6FdrL4zwuWPNkhH2",
        base_url="https://api.upstage.ai/v1"
    )
 
    stream = client.chat.completions.create(
        model="solar-mini",
        max_tokens=1000,
        # response_format= {"type": "json_object"},
        messages=[
            {
                "role": "user",
                "content": user_question
            }
        ],
        stream=True,
    )

    for chunk in stream:
        print(chunk)
        if chunk.choices[0].delta.content is not None:
            # print(chunk, end="")
            # return chunk.choices[0].delta.content
            return chunk.choices[0].delta.content
    

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
