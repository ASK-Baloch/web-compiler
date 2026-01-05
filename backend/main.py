from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import compiler_logic
import os
from dotenv import load_dotenv

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- GEMINI SETUP ---
# Load environment variables from a local .env (optional)
load_dotenv()
# Read the Gemini API key from the environment
GEMINI_KEY = os.getenv("GEMINI_KEY")
if not GEMINI_KEY:
    raise RuntimeError("GEMINI_KEY not set in environment. Add it to your .env or export it.")
genai.configure(api_key=GEMINI_KEY)

# Using the latest Flash model as per your requirements
model = genai.GenerativeModel("models/gemini-2.5-flash")

# --- DATA MODELS ---
class ChatRequest(BaseModel):
    message: str

class LexerRequest(BaseModel):
    code: str

class ParserRequest(BaseModel):
    expression: str
    mode: str  # "PREFIX" or "POSTFIX"

# --- ENDPOINTS ---

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        # Instruction for concise, expert answers (under 3 sentences)
        prompt = f"You are a Compiler Construction expert. Answer clearly but briefly. Keep response under 3 sentences. User question: {req.message}"
        response = model.generate_content(prompt)
        return {"reply": response.text}
    except Exception as e:
        return {"reply": f"AI Error: {str(e)}"}

@app.post("/api/lex")
async def lex_endpoint(req: LexerRequest):
    # Calls the wrapper in compiler_logic.py
    tokens = compiler_logic.run_lexer(req.code)
    return {"tokens": tokens}

@app.post("/api/parse")
async def parse_endpoint(req: ParserRequest):
    # Calls the wrapper in compiler_logic.py which now returns "Converted... | Evaluated..."
    result = compiler_logic.run_parser(req.expression, req.mode)
    return {"result": result}