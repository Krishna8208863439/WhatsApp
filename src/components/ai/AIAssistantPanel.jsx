import React, { useState } from 'react';
import { 
  Bot, Sparkles, FileText, Send, CheckCircle2, 
  BrainCircuit, Globe, Calendar, Terminal, Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateAIResponse } from '../../services/aiService';

export default function AIAssistantPanel() {
  const { customApiKey, showToast } = useApp();
  const [prompt, setPrompt] = useState('');
  const [activeMode, setActiveMode] = useState('single'); // 'single' | 'multi_agent' | 'meeting'
  const [history, setHistory] = useState([
    {
      id: 'h1',
      sender: 'ai',
      text: '### 🚀 Welcome to SphereAI Productivity Suite\nSelect a specialized mode or ask any enterprise task:\n\n- **Multi-Agent Room**: Research, Code Audit, Translation & ROI consensus.\n- **Meeting Assistant**: Auto-extract action items & transcript summaries.\n- **Document Analyzer**: Perform OCR & extract structured JSON.'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    const userMsg = { id: `u_${Date.now()}`, sender: 'user', text: prompt };
    setHistory(prev => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    const reply = await generateAIResponse(prompt, activeMode, customApiKey);
    setLoading(false);
    setHistory(prev => [...prev, { id: `a_${Date.now()}`, sender: 'ai', text: reply }]);
  };

  return (
    <div className="flex-1 bg-[#0b0f19] flex flex-col h-full overflow-hidden p-4 lg:p-6 z-10">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyanGlow shadow-glow-indigo">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-gray-100 flex items-center gap-2">
              SphereAI Multi-Agent Productivity Suite
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                GPT-4o / Gemini 1.5 Pro
              </span>
            </h2>
            <p className="text-xs text-gray-400">Autonomous workflow agents & intelligent consensus</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex p-1 rounded-xl bg-gray-900 border border-gray-800">
          {[
            { id: 'single', label: 'SphereAI Core' },
            { id: 'multi_agent', label: 'Multi-Agent Room' },
            { id: 'meeting', label: 'Meeting Assistant' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeMode === m.id
                  ? 'bg-brand-600 text-white shadow-glow-indigo'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Response Stream */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
        {history.map(item => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border ${
              item.sender === 'user'
                ? 'bg-brand-900/40 border-brand-700/60 text-white ml-auto max-w-2xl'
                : 'bg-gray-900/90 border-gray-800 text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-brand-300">
              {item.sender === 'ai' ? <Sparkles className="w-4 h-4 text-cyanGlow" /> : <Terminal className="w-4 h-4" />}
              {item.sender === 'ai' ? 'SphereAI Agent Response' : 'You (Elena)'}
            </div>
            <div className="whitespace-pre-line text-xs lg:text-sm leading-relaxed">
              {item.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="p-4 rounded-2xl bg-gray-900/80 border border-brand-500/30 flex items-center gap-3 text-xs text-brand-300 animate-pulse">
            <Sparkles className="w-5 h-5 text-cyanGlow animate-spin-slow" />
            <span>Orchestrating autonomous agents & generating response...</span>
          </div>
        )}
      </div>

      {/* Input Prompt Controls */}
      <div className="pt-3 border-t border-gray-800 flex gap-2">
        <input
          type="text"
          placeholder="Ask SphereAI to summarize, write code, or review contracts..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
          className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-gray-900 border border-gray-800 focus:border-brand-500 text-gray-100 outline-none"
        />
        <button
          onClick={handleSendPrompt}
          disabled={loading || !prompt.trim()}
          className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow-indigo flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Run Agent
        </button>
      </div>
    </div>
  );
}
