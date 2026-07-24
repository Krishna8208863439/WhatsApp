import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, ShieldCheck, Sparkles, Radio } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AudioCallModal() {
  const { activeCall, endCall } = useApp();
  const [muted, setMuted] = useState(false);
  const [noiseCancel, setNoiseCancel] = useState(true);
  const [callSec, setCallSec] = useState(0);

  useEffect(() => {
    if (!activeCall) return;
    const t = setInterval(() => setCallSec(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [activeCall]);

  if (!activeCall || activeCall.type !== 'audio') return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xl z-50 flex flex-col items-center justify-between p-8 select-none animate-in zoom-in-95 duration-200">
      {/* Security Banner Header */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold shadow-glow-indigo">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        Opus 48kHz HD Audio • Signal Double-Ratchet Encrypted
      </div>

      {/* Main Glowing Soundwave Orb Stage */}
      <div className="flex flex-col items-center text-center my-auto space-y-6">
        <div className="relative flex items-center justify-center">
          {/* Animated Pulsing Sound Ring */}
          <div className="absolute w-48 h-48 rounded-full bg-brand-600/30 animate-ping"></div>
          <div className="absolute w-40 h-40 rounded-full bg-indigo-500/20 animate-pulse"></div>

          <img
            src={activeCall.contactAvatar}
            alt={activeCall.contactName}
            className="w-32 h-32 rounded-full object-cover border-4 border-brand-500/80 shadow-glow-indigo z-10"
          />
        </div>

        <div>
          <h2 className="font-extrabold text-2xl text-gray-100 mb-1">{activeCall.contactName}</h2>
          <p className="text-xs font-mono text-cyan-300">
            0:{callSec < 10 ? '0' + callSec : callSec} • Low Bandwidth Protocol Active
          </p>
        </div>

        {/* Live Audio Spectrum Bar */}
        <div className="flex items-center gap-1 h-8 px-6 py-2 rounded-2xl bg-gray-900/80 border border-gray-800">
          {[40, 80, 50, 100, 30, 75, 90, 45, 85, 60, 95, 35].map((h, i) => (
            <span
              key={i}
              className="w-1.5 bg-brand-400 rounded-full animate-wave"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-gray-900/90 border border-gray-800 backdrop-blur-md">
        <button
          onClick={() => setMuted(!muted)}
          className={`p-4 rounded-2xl border transition-all ${
            muted ? 'bg-rose-600 text-white border-rose-500' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
          }`}
          title="Toggle Mic"
        >
          {muted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={() => setNoiseCancel(!noiseCancel)}
          className={`p-4 rounded-2xl border transition-all ${
            noiseCancel ? 'bg-brand-600 text-white border-brand-500 shadow-glow-indigo' : 'bg-gray-800 text-gray-400'
          }`}
          title="AI Noise Suppression"
        >
          <Radio className="w-6 h-6" />
        </button>

        <button
          onClick={endCall}
          className="p-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg"
          title="End Call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
