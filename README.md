# Compiler Construction Suite

![Project Banner](https://via.placeholder.com/1000x300/0f172a/3b82f6?text=Compiler+Construction+Suite+by+Ahmed+Baloch)

> A comprehensive web-based tool for visualizing and executing core compiler construction concepts. Includes a manual Lexical Analyzer, a Recursive Descent Parser (SDD/SDT), and an integrated AI Professor powered by Google Gemini 2.5 Flash.

## 🚀 Features

### 1. Manual Lexical Analyzer (Scanner)
* **Method:** Implements Finite Automata via Transition Diagrams (State Machine).
* **Functionality:** Scans source code character-by-character without using Regex.
* **Outputs:** Generates a Symbol Table with Tokens (Keywords, IDs, Relational Operators, Numbers).

### 2. Predictive Parser & Translator
* **Method:** Recursive Descent Parsing (Top-Down).
* **Capabilities:**
    * Supports **Syntax Directed Definitions (SDD)** and **Translation Schemes (SDT)**.
    * Converts **Infix to Postfix** and **Infix to Prefix**.
    * **Evaluates** the mathematical result of the converted expression.

### 3. AI Professor (Chatbot)
* **Engine:** Google Gemini 2.5 Flash (Fastest Model).
* **Role:** An expert assistant that answers questions about compiler theory briefly and concisely.
* **UI:** Floating widget with persistent chat history.

---

## 📸 Screenshots

### **1. The Dashboard (Lexer)**
*(Place your Lexer screenshot here, e.g., `screenshots/lexer.png`)*
> Clean interface to input source code and view generated tokens instantly.

### **2. Predictive Parser & Evaluator**
![Parser Output](https://raw.githubusercontent.com/ASK-Baloch/YOUR-REPO-NAME/main/screenshots/parser_output.png)
*(Note: Replace the URL above with the actual path to your image after uploading)*

### **3. AI Chatbot Widget**
*(Place your Chatbot screenshot here)*
> Floating AI assistant ready to explain complex topics like Left Recursion or FIRST/FOLLOW sets.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14 (App Router), Tailwind CSS, Lucide React Icons.
* **Backend:** Python (FastAPI), Google Generative AI (Gemini).
* **Communication:** Axios (REST API).

---

## 📦 Installation & Setup

### Prerequisites
* Node.js & npm
* Python 3.10+

### 1. Clone the Repository
git clone [https://github.com/ASK-Baloch/compiler-construction-suite.git](https://github.com/ASK-Baloch/compiler-construction-suite.git)
cd compiler-construction-suite

### 2. Backend Setup

cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# Server starts at [https://web-compiler-blond.vercel.app](https://web-compiler-blond.vercel.app)

### 3. Frontend Setup
Bash

cd frontend
npm install
npm run dev
# App starts at http://localhost:3000


### 👤 Author
**### Ahmed Baloch**

Role: Software Engineer 

GitHub: @ASK-Baloch

Instagram: @ab_codez

✨ Special Mentions
Dedicated to Sir Nauman Qadeer for his guidance in Compiler Construction.

© 2026 Compiler Construction Suite. All Rights Reserved.

```