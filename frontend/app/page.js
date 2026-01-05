"use client";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  Terminal, Code, Play, RefreshCw, X, Send, Bot, 
  Github, Instagram, ExternalLink, BrainCircuit 
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('lexer');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Chat State
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', text: 'Hi! Ask me brief questions about Compiler Construction.' }
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      
      {/* --- HEADER --- */}
      <header className="relative bg-slate-950 border-b border-slate-800 p-6 shadow-2xl z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Spacer for centering */}
          <div className="w-12 hidden md:block"></div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              Compiler Construction Suite By Ahmed Baloch
            </h1>
            <p className="text-slate-400 text-xs md:text-base">Manual Lexer & Recursive Descent Parser</p>
          </div>

          {/* Avatar / Profile Section */}
          <div className="relative w-12 flex justify-end">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 hover:border-blue-400 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] active:scale-95"
            >
              {/* Ensure 'avatar.jpg' is in your public folder */}
              <img src="/avatar.jpg" alt="Profile" className="object-cover w-full h-full"/>
            </button>

            {/* Profile Popup */}
            {isProfileOpen && (
              <div className="absolute top-16 right-0 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-5 z-50">
                <div className="flex flex-col items-center mb-4 border-b border-slate-800 pb-3">
                  <span className="font-bold text-white text-lg">Ahmed Baloch</span>
                  <span className="text-xs text-blue-400">Software Engineer</span>
                </div>
                
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Follow Up</h4>
                
                <div className="space-y-2">
                  <a href="https://github.com/ASK-Baloch" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors group">
                    <Github size={18} /> <span className="text-sm font-medium">GitHub</span>
                  </a>
                  <a href="https://www.instagram.com/ab_codez/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors group">
                    <Instagram size={18} /> <span className="text-sm font-medium">Instagram</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow max-w-5xl mx-auto p-6 w-full">
        <div className="flex justify-center space-x-6 mb-8">
          <TabButton id="lexer" icon={<Code size={20}/>} label="Lexical Analyzer" active={activeTab} set={setActiveTab} />
          <TabButton id="parser" icon={<Terminal size={20}/>} label="Predictive Parser" active={activeTab} set={setActiveTab} />
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 min-h-[500px]">
          {activeTab === 'lexer' && <LexerComponent />}
          {activeTab === 'parser' && <ParserComponent />}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-slate-950 border-t border-slate-800 pt-10 pb-8 mt-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Copyright */}
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Compiler Construction Suite. All rights reserved.
          </p>

          {/* Special Mentions Section (Gold Theme) */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">Special Mentions</span>
            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 drop-shadow-sm font-serif py-1">
              Sir Nauman Qadeer
            </h2>
          </div>
        </div>
      </footer>

      {/* --- FLOATING CHATBOT --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        
        {/* Chat Window */}
        {isChatOpen && (
          <div className="w-[350px] h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-2">
                <BrainCircuit size={20} /> {/* AI Icon in header too */}
                <span className="font-bold">CC Professor</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-blue-700 p-1 rounded">
                <X size={18} />
              </button>
            </div>
            <ChatComponent history={chatHistory} setHistory={setChatHistory} />
          </div>
        )}

        {/* Floating Button with AI Brain Icon */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="h-14 w-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
        >
          {isChatOpen ? (
            <X size={28} />
          ) : (
            // The New AI Brain Icon
            <BrainCircuit size={28} className="group-hover:animate-pulse" />
          )}
        </button>
      </div>

      {/* Backdrop for profile popup */}
      {isProfileOpen && <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />}

    </div>
  );
}

// --- SUB COMPONENTS ---

function TabButton({ id, icon, label, active, set }) {
  return (
    <button
      onClick={() => set(id)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all duration-200 ${
        active === id 
        ? 'bg-blue-600 text-white shadow-blue-900/50 shadow-lg scale-105' 
        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function LexerComponent() {
  const [code, setCode] = useState('int count = 10');
  const [tokens, setTokens] = useState([]);

  const analyze = async () => {
    try {
      const res = await axios.post('https://web-compiler-blond.vercel.app/api/lex', { code });
      setTokens(res.data.tokens);
    } catch (e) { alert("Error: Is Backend Running?"); }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col h-full">
        <label className="mb-2 text-sm font-bold text-blue-300 uppercase tracking-wider">Source Code</label>
        <textarea
          className="flex-1 bg-slate-950 border border-slate-600 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-inner"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        />
        <button onClick={analyze} className="mt-4 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95">
          <Play size={18} /> Run Lexer
        </button>
      </div>
      <div className="flex flex-col h-full">
        <label className="mb-2 text-sm font-bold text-blue-300 uppercase tracking-wider">Tokens</label>
        <div className="flex-1 bg-slate-950 rounded-xl border border-slate-700 overflow-hidden flex flex-col">
          <div className="flex bg-slate-900 p-3 text-xs font-bold text-slate-400 border-b border-slate-700">
            <span className="w-1/2">TOKEN TYPE</span>
            <span className="w-1/2 border-l border-slate-700 pl-2">VALUE</span>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {tokens.map((t, i) => (
              <div key={i} className="flex p-2 rounded hover:bg-slate-900/50 font-mono text-sm border-b border-slate-900 last:border-0 transition-colors">
                <span className="w-1/2 text-yellow-400 font-semibold">{t.type}</span>
                <span className="w-1/2 text-slate-200 pl-2">{t.value}</span>
              </div>
            ))}
            {tokens.length === 0 && <div className="h-full flex items-center justify-center text-slate-600 italic">No tokens generated</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function ParserComponent() {
  const [expr, setExpr] = useState('2+3*4');
  const [method, setMethod] = useState('SDD');
  const [mode, setMode] = useState('POSTFIX');
  const [result, setResult] = useState('');

  const parse = async () => {
    try {
      const res = await axios.post('https://web-compiler-blond.vercel.app/api/parse', { expression: expr, mode });
      setResult(res.data.result);
    } catch (e) { alert("Backend Error"); }
  };

  return (
    <div className="flex flex-col items-center h-full py-6 space-y-6">
      <div className="w-full max-w-lg space-y-2">
        <label className="block text-xs font-bold text-blue-300 uppercase tracking-wider text-center">1. Input Expression</label>
        <input
          type="text"
          className="w-full bg-slate-950 border border-slate-600 rounded-xl p-4 font-mono text-xl text-center focus:ring-2 focus:ring-blue-500 outline-none text-white shadow-inner"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
        />
      </div>

      <div className="flex flex-row gap-6 w-full max-w-lg">
        <div className="flex-1 space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider text-center">2. Select Method</label>
          <div className="flex flex-col bg-slate-900 p-1 rounded-xl border border-slate-700">
            {['SDD', 'SDT'].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`py-2 rounded-lg text-sm font-bold transition-all ${method === m ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                {m === 'SDD' ? 'Syntax Directed' : 'Translation Scheme'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider text-center">3. Select Conversion</label>
          <div className="flex flex-col bg-slate-900 p-1 rounded-xl border border-slate-700">
            {['POSTFIX', 'PREFIX'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`py-2 rounded-lg text-sm font-bold transition-all ${mode === m ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                To {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={parse} className="w-full max-w-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-1">
        <RefreshCw size={20} /> <span>Parse Using {method}</span>
      </button>

      {result && (
        <div className={`mt-4 p-6 rounded-xl border w-full max-w-2xl text-center animate-in slide-in-from-bottom-5 duration-300 ${result.includes('Error') ? 'bg-red-950/40 border-red-500/50 text-red-200' : 'bg-green-950/40 border-green-500/50 text-green-200'}`}>
          <h3 className="text-xs font-bold opacity-70 mb-2 uppercase tracking-widest">{result.includes('Error') ? 'Parsing Failed' : 'Parsing Successful'}</h3>
          <p className="font-mono text-lg md:text-xl font-bold break-all">{result}</p>
        </div>
      )}
    </div>
  );
}

function ChatComponent({ history, setHistory }) {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const send = async () => {
    if (!msg.trim()) return;
    const newHistory = [...history, { role: 'user', text: msg }];
    setHistory(newHistory);
    setMsg('');
    setLoading(true);

    try {
      const res = await axios.post('https://web-compiler-blond.vercel.app/api/chat', { message: msg });
      setHistory(prev => [...prev, { role: 'bot', text: res.data.reply }]);
    } catch (e) {
      setHistory(prev => [...prev, { role: 'bot', text: "Error: Could not reach API." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" ref={scrollRef}>
        {history.map((h, i) => (
          <div key={i} className={`flex ${h.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${h.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
              <p>{h.text}</p>
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-slate-500 animate-pulse ml-2">Typing...</div>}
      </div>
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2 shrink-0 z-10">
        <input
          className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          placeholder="Ask..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button onClick={send} className="bg-blue-600 hover:bg-blue-500 h-9 w-9 rounded-full flex items-center justify-center text-white shrink-0">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}