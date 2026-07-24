import React from 'react';
import { 
  MessageSquare, Users, Radio, PhoneCall, CircleDot, 
  Bot, ShoppingBag, ShieldCheck, LayoutDashboard, Settings,
  Sparkles, KeyRound
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const { activeTab, setActiveTab, currentUser, setShowSettingsModal } = useApp();

  const navItems = [
    { id: 'chats', label: 'Chats', icon: MessageSquare, badge: 7 },
    { id: 'ai_suite', label: 'SphereAI Suite', icon: Bot, badge: 'AI', isGlow: true },
    { id: 'communities', label: 'Communities', icon: Users, badge: 2 },
    { id: 'channels', label: 'Channels', icon: Radio },
    { id: 'calls', label: 'Calls', icon: PhoneCall },
    { id: 'status', label: 'Status', icon: CircleDot, dot: true },
    { id: 'business', label: 'Business Hub', icon: ShoppingBag },
    { id: 'security', label: 'Security & E2E', icon: ShieldCheck },
    { id: 'admin', label: 'Admin Metrics', icon: LayoutDashboard },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-[#0d1322] border-r border-gray-800/80 flex flex-col justify-between items-center lg:items-stretch p-3 z-30 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-3 mb-2">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-cyanGlow shadow-glow-indigo">
          <Sparkles className="w-5 h-5 text-white animate-pulse-slow" />
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-darkBg rounded-full"></span>
        </div>
        <div className="hidden lg:block">
          <h1 className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
            ChatSphere <span className="text-cyanGlow text-xs font-semibold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 ml-1">AI</span>
          </h1>
          <p className="text-[11px] text-gray-400 font-medium">Enterprise Zero-Trust</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 py-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                isActive
                  ? 'bg-brand-600/20 text-brand-300 border border-brand-500/40 shadow-glow-indigo'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
              title={item.label}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-brand-400' : 'text-gray-400'}`} />
                {item.dot && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-500 rounded-full border-2 border-darkBg"></span>
                )}
              </div>
              <span className="hidden lg:block truncate">{item.label}</span>

              {item.badge && (
                <span className={`hidden lg:inline-flex items-center justify-center ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${
                  item.isGlow 
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-glow-cyan' 
                    : 'bg-brand-600/30 text-brand-300 border border-brand-500/30'
                }`}>
                  {item.badge}
                </span>
              )}

              {/* Tooltip for collapsed view */}
              <div className="lg:hidden absolute left-full ml-2 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50 whitespace-nowrap">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Profile & Settings */}
      <div className="pt-3 border-t border-gray-800/80 space-y-2 w-full">
        <button
          onClick={() => setShowSettingsModal(true)}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-400" />
          <span className="hidden lg:inline">AI & Key Settings</span>
        </button>

        <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-900/60 border border-gray-800/80">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-brand-500/40"
          />
          <div className="hidden lg:block min-w-0 flex-1">
            <h4 className="text-xs font-bold text-gray-200 truncate">{currentUser.name}</h4>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              {currentUser.role}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
