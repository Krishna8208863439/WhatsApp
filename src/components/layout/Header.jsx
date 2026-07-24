import React from 'react';
import { Phone, Video, Search, ShieldCheck, Info, Sparkles, Clock, MoreVertical } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useChat } from '../../context/ChatContext';

export default function Header() {
  const { startCall, showRightPanel, setShowRightPanel, searchQuery, setSearchQuery } = useApp();
  const { activeChat } = useChat();

  return (
    <header className="h-16 px-4 bg-[#0e1424]/90 backdrop-blur-md border-b border-gray-800/80 flex items-center justify-between z-20">
      {/* Active Conversation Info */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative">
          <img
            src={activeChat.avatar}
            alt={activeChat.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-700/80 shadow-md"
          />
          {activeChat.isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-darkBg rounded-full"></span>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-sm lg:text-base text-gray-100 truncate">{activeChat.name}</h2>
            {activeChat.badge && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-sm">
                {activeChat.badge}
              </span>
            )}
            <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-emerald-300 text-[10px] font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Signal E2E
            </span>
          </div>

          <p className="text-xs text-gray-400 truncate flex items-center gap-2">
            <span>{activeChat.isOnline ? 'Active Now' : activeChat.lastTimestamp}</span>
            {activeChat.disappearingDays > 0 && (
              <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800/40">
                <Clock className="w-2.5 h-2.5" /> {activeChat.disappearingDays}d Timer
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search chat history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-44 lg:w-64 pl-9 pr-3 py-1.5 text-xs rounded-xl bg-gray-900/80 border border-gray-800 focus:border-brand-500/60 focus:bg-gray-900 text-gray-200 placeholder-gray-500 outline-none transition-all"
          />
        </div>

        {/* Audio & Video Call Buttons */}
        <button
          onClick={() => startCall(activeChat.name, activeChat.avatar, 'audio', activeChat.type === 'group')}
          className="p-2 rounded-xl bg-gray-800/60 hover:bg-brand-600/20 text-gray-300 hover:text-brand-300 border border-gray-700/50 transition-all shadow-sm"
          title="Start HD Audio Call"
        >
          <Phone className="w-4 h-4" />
        </button>

        <button
          onClick={() => startCall(activeChat.name, activeChat.avatar, 'video', activeChat.type === 'group')}
          className="p-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-glow-indigo transition-all flex items-center gap-1.5 text-xs font-semibold"
          title="Start HD Video Call"
        >
          <Video className="w-4 h-4" />
          <span className="hidden sm:inline">HD Video</span>
        </button>

        {/* Right Panel Toggle */}
        <button
          onClick={() => setShowRightPanel(!showRightPanel)}
          className={`p-2 rounded-xl border transition-all ${
            showRightPanel 
              ? 'bg-brand-600/30 text-brand-300 border-brand-500/50' 
              : 'bg-gray-800/60 text-gray-300 hover:text-white border-gray-700/50'
          }`}
          title="Toggle Details Panel"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
