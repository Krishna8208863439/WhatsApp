import React, { useRef, useEffect } from 'react';
import { ShieldCheck, Pin, Sparkles, Clock, Lock } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useApp } from '../../context/AppContext';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

export default function ChatWindow() {
  const { activeChat, isTypingAI } = useChat();
  const { currentUser } = useApp();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages, isTypingAI]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0b0f19] relative overflow-hidden">
      {/* Background Subtle Cyber Glow Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-950/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Pinned / Security Banner */}
      <div className="px-4 py-2 bg-[#0d1322]/80 border-b border-gray-800/80 flex items-center justify-between text-xs text-gray-400 z-10">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] text-gray-300">
            Messages are end-to-end encrypted with Signal Double-Ratchet. No one outside of this chat can read them.
          </span>
        </div>
        {activeChat.disappearingDays > 0 && (
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/30">
            <Clock className="w-3 h-3" /> Disappearing in {activeChat.disappearingDays} days
          </div>
        )}
      </div>

      {/* Chat Messages Stream Stage */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 z-10">
        {activeChat.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMe={msg.senderId === currentUser.id || msg.senderId === 'usr_me'}
          />
        ))}

        {/* AI Typing Indicator */}
        {isTypingAI && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-brand-950/60 border border-brand-800/60 w-48 animate-pulse text-xs text-brand-300">
            <Sparkles className="w-4 h-4 text-cyanGlow animate-spin-slow" />
            <span className="font-semibold">SphereAI is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Container */}
      <MessageInput />
    </div>
  );
}
