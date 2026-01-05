import google.generativeai as genai
from dotenv import load_dotenv
import os
load_dotenv()

try:
    GEMINI_KEY = os.getenv("GEMINI_KEY")   
    if not GEMINI_KEY:
        raise RuntimeError("GEMINI_KEY not set in environment. Add it to your .env or export it.")
    genai.configure(api_key=GEMINI_KEY)

    print("Searching for available models...")
    available_models = []
    
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- Found: {m.name}")
            available_models.append(m.name)
            
    if not available_models:
        print("\nERROR: No models found. Check your API Key permissions.")
    else:
        print("\nSUCCESS! Use one of the names above in your main.py file.")
        
except Exception as e:
    print(f"Error: {e}")