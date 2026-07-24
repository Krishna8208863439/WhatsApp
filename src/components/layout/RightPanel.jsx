import React, { useState } from 'react';
import { ShieldCheck, Lock, Clock, QrCode, Image as ImageIcon, FileText, Sparkles, X, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useChat } from '../../context/ChatContext';
import { generateFingerprint, getSessionKeyInfo } from '../../services/encryptionService';
import { generateAIResponse } from '../../services/aiService';

export default function RightPanel() {
  const { showRightPanel, setShowRightPanel, currentUser, showToast } = useApp();
  const { activeChat, toggleDisappearingMessages } = useChat();
  const [activeTab, setActiveTab] = useState('crypto'); // 'crypto' | 'media' | 'summary'
  const [aiSummary, setAiSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  if (!showRightPanel) return null;

  const fingerprint = generateFingerprint(activeChat.id, currentUser.id);
  const keyInfo = getSessionKeyInfo(activeChat.name);

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    const summary = await generateAIResponse('summarize this chat thread', 'direct');
    setAiSummary(summary);
    setLoadingSummary(false);
  };

  return (
    <aside className="w-80 bg-[#0d1322] border-l border-gray-800/80 flex flex-col h-full z-20 overflow-y-auto animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-gray-800/80 flex items-center justify-between">
        <h3 className="font-bold text-sm text-gray-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Chat & Encryption Details
        </h3>
        <button
          onClick={() => setShowRightPanel(false)}
          className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="p-5 flex flex-col items-center border-b border-gray-800/80 text-center">
        <img
          src={activeChat.avatar}
          alt={activeChat.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-brand-500/40 shadow-glow-indigo mb-3"
        />
        <h4 className="font-bold text-base text-gray-100">{activeChat.name}</h4>
        <p className="text-xs text-gray-400 mb-2">{activeChat.isOnline ? 'Online Now' : 'Last seen recently'}</p>
        {activeChat.badge && (
          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-brand-600/30 text-brand-300 border border-brand-500/30">
            {activeChat.badge}
          </span>
        )}
      </div>

      {/* Segment Tabs */}
      <div className="flex border-b border-gray-800/80 p-1 bg-gray-900/60">
        {[
          { id: 'crypto', label: 'E2E Security' },
          { id: 'media', label: 'Shared Media' },
          { id: 'summary', label: 'AI Summary' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 space-y-4 flex-1">
        {activeTab === 'crypto' && (
          <div className="space-y-4">
            {/* E2E Card */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Lock className="w-4 h-4" />
                Signal Double-Ratchet Encrypted
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Messages and calls are end-to-end encrypted. No third party or ChatSphere server can read or listen to them.
              </p>
            </div>

            {/* Safety Fingerprint */}
            <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
                <span className="flex items-center gap-1.5"><QrCode className="w-4 h-4 text-cyanGlow" /> Safety Number Fingerprint</span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3 h-3"/> Verified</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/60 font-mono text-[10px] text-cyan-300 text-center tracking-wider break-all border border-gray-800">
                {fingerprint}
              </div>
            </div>

            {/* Disappearing Messages Settings */}
            <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-400" /> Disappearing Messages</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[
                  { label: 'Off', days: 0 },
                  { label: '24 Hours', days: 1 },
                  { label: '7 Days', days: 7 }
                ].map(opt => (
                  <button
                    key={opt.days}
                    onClick={() => toggleDisappearingMessages(activeChat.id, opt.days)}
                    className={`py-1.5 text-[11px] font-semibold rounded-lg border transition-all ${
                      activeChat.disappearingDays === opt.days
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-gray-800/40 text-gray-400 border-gray-700/50 hover:bg-gray-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-3">
            <h5 className="text-xs font-semibold text-gray-400">Photos & Attachments (4)</h5>
            <div className="grid grid-cols-2 gap-2">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80" alt="media" className="rounded-lg border border-gray-800 object-cover h-24 w-full" />
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80" alt="media" className="rounded-lg border border-gray-800 object-cover h-24 w-full" />
            </div>
            <div className="p-3 rounded-lg bg-gray-900/80 border border-gray-800 flex items-center justify-between text-xs text-gray-300">
              <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-brand-400" /> Security_Audit_Report.pdf</span>
              <span className="text-[10px] text-gray-500">2.4 MB</span>
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-3">
            <button
              onClick={handleGenerateSummary}
              disabled={loadingSummary}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-semibold text-xs shadow-glow-indigo flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              {loadingSummary ? 'SphereAI Analyzing...' : 'Generate Live Thread Summary'}
            </button>

            {aiSummary && (
              <div className="p-3.5 rounded-xl bg-gray-900/90 border border-brand-500/30 text-xs leading-relaxed text-gray-200 space-y-2">
                <div className="font-bold text-brand-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> AI Executive Summary
                </div>
                <div className="whitespace-pre-line text-[11px] text-gray-300">{aiSummary}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
