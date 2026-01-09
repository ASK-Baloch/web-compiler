"use client";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, User, Terminal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AhmedPage() {
  const [msg, setMsg] = useState('');
  const [history, setHistory] = useState([
    { role: 'bot', text: "Hey! I'm Ahmed's AI Clone. Ask me anything about this project, my tech stack, or just say hi!" }
  ]);
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
      // REPLACE WITH YOUR VERCEL BACKEND URL
      const res = await axios.post('https://web-compiler-backend.vercel.app/api/talk-to-ahmed', { message: msg });
      setHistory([...newHistory, { role: 'bot', text: res.data.reply }]);
    } catch (e) {
      setHistory([...newHistory, { role: 'bot', text: "Server Disconnected. Ahmed is busy coding!" }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col relative overflow-hidden selection:bg-green-900 selection:text-white">
      
      {/* Matrix Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/17/Matrix_code.gif')] bg-cover"></div>

      {/* Header */}
      <div className="p-6 border-b border-green-800 flex items-center justify-between z-10 bg-black/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-green-500 overflow-hidden relative">
            <img src="/avatar.jpg" alt="Ahmed" className="object-cover w-full h-full grayscale contrast-125" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest">AHMED_AI_V1.0</h1>
            <p className="text-xs text-green-700">System Online /// Ready</p>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft size={18} /> Exit Simulation
        </Link>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10" ref={scrollRef}>
        {history.map((h, i) => (
          <div key={i} className={`flex ${h.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 border ${h.role === 'user' ? 'border-green-500 bg-green-900/20' : 'border-green-800 bg-black'}`}>
              <div className="flex items-center gap-2 mb-2 opacity-50 text-xs uppercase">
                {h.role === 'user' ? <User size={12} /> : <Terminal size={12} />}
                {h.role === 'user' ? 'Guest_User' : 'Admin_Ahmed'}
              </div>
              <p className="leading-relaxed">{h.text}</p>
            </div>
          </div>
        ))}
        {loading && <div className="text-xs animate-pulse">Processing Request...</div>}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-green-800 z-10 bg-black">
        <div className="flex gap-4 max-w-4xl mx-auto">
          <span className="text-green-500 py-3">{'>'}</span>
          <input
            className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-800"
            placeholder="Initialize conversation..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            autoFocus
          />
          <button onClick={send} className="text-green-500 hover:text-white">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}