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
load_dotenv()
GEMINI_KEY = os.getenv("GEMINI_KEY")
if not GEMINI_KEY:
    raise RuntimeError("GEMINI_KEY not set in environment. Add it to your .env or export it.")
genai.configure(api_key=GEMINI_KEY)
# new api key added

# Using the latest Flash model as per your requirements
model = genai.GenerativeModel("models/gemini-2.0-flash")

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

# --- ADD THESE TO backend/main.py ---

class FixRequest(BaseModel):
    broken_code: str
    error_msg: str

class GenCodeRequest(BaseModel):
    prompt: str

@app.post("/api/ai-fix")
async def fix_code_endpoint(req: FixRequest):
    prompt = f"""
    The following code has a syntax error: "{req.broken_code}"
    The error message was: "{req.error_msg}"
    Please provide ONLY the corrected code snippet. Do not explain.
    """
    response = model.generate_content(prompt)
    return {"fixed_code": response.text.strip()}

@app.post("/api/ai-generate")
async def generate_code_endpoint(req: GenCodeRequest):
    prompt = f"""
    Write a simple C++/Pascal style code snippet for: "{req.prompt}".
    Use only: int, float, if, else, return, identifiers, numbers, and basic operators.
    Do not use markdown formatting. Just the raw code.
    """
    response = model.generate_content(prompt)
    return {"generated_code": response.text.strip()}



@app.post("/api/talk-to-ahmed")
async def ahmed_chat_endpoint(req: ChatRequest):
    prompt = f"""
    You are Ahmed Baloch, a Software Engineer and the creator of this Compiler Construction Suite.
    
    Your Personality:
    - Friendly, professional, but slightly casual.
    - You love Next.js, Python, and teaching .
    - You are humble but confident about your coding skills.
    
    Rules:
    - If asked about the project, explain you built it using a Manual Lexer and Recursive Descent Parser.
    - If asked for contact, mention your Instagram (@ab_codez).
    - Keep answers conversational.
    
    User message: {req.message}
    """
    response = model.generate_content(prompt)
    return {"reply": response.text}