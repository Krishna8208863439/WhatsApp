import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gray-900/95 border border-brand-500/50 shadow-glow-indigo text-xs font-semibold text-white backdrop-blur-md">
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : toast.type === 'warning' ? (
          <AlertCircle className="w-4 h-4 text-amber-400" />
        ) : (
          <Sparkles className="w-4 h-4 text-cyanGlow" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
