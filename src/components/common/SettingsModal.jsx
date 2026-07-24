import React from 'react';
import { KeyRound, Sparkles, X, ShieldCheck, Bell, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SettingsModal() {
  const { showSettingsModal, setShowSettingsModal, customApiKey, setCustomApiKey, showToast } = useApp();

  if (!showSettingsModal) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-brand-500/40 rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="font-extrabold text-base text-gray-100 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-brand-400" /> Platform & AI Settings
          </h3>
          <button onClick={() => setShowSettingsModal(false)} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom API Key Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyanGlow" /> OpenAI / Gemini API Key (Optional)
          </label>
          <input
            type="password"
            placeholder="sk-... or AIzaSy..."
            value={customApiKey}
            onChange={(e) => setCustomApiKey(e.target.value)}
            className="w-full p-3 text-xs rounded-xl bg-gray-950 border border-gray-800 text-gray-100 outline-none focus:border-brand-500 font-mono"
          />
          <p className="text-[11px] text-gray-500 leading-normal">
            If left blank, ChatSphere AI uses its zero-latency built-in inference engine.
          </p>
        </div>

        <div className="space-y-3 border-t border-gray-800 pt-3 text-xs text-gray-300">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-950 border border-gray-800">
            <span className="flex items-center gap-2"><Bell className="w-4 h-4 text-brand-400" /> Desktop Notifications</span>
            <input type="checkbox" defaultChecked className="accent-brand-600 w-4 h-4 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-950 border border-gray-800">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Signal Key Auto-Rotation</span>
            <input type="checkbox" defaultChecked className="accent-brand-600 w-4 h-4 cursor-pointer" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
          <button
            onClick={() => {
              showToast('Settings saved successfully!', 'success');
              setShowSettingsModal(false);
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-xs shadow-glow-indigo"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
