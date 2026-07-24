import React, { useState } from 'react';
import { 
  CheckCheck, Play, Pause, FileText, MapPin, Smile, 
  Trash2, Edit3, Reply, Sparkles, Copy, Languages, CornerDownRight, Volume2, ShieldCheck
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useApp } from '../../context/AppContext';
import { translateText, performOCR } from '../../services/aiService';
import { speakText } from '../../services/audioService';

export default function MessageBubble({ message, isMe }) {
  const { addReaction, votePoll, deleteMessage } = useChat();
  const { showToast } = useApp();
  
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscription, setShowTranscription] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [showOCR, setShowOCR] = useState(false);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    showToast('Code snippet copied to clipboard! 📋', 'success');
  };

  const handleTranslate = (lang) => {
    const res = translateText(message.text, lang);
    setTranslatedText(res);
    showToast(`Translated message to ${lang}`, 'info');
  };

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-3.5 group relative`}>
      {/* Sender Name for group chats */}
      {!isMe && (
        <span className="text-[11px] font-semibold text-brand-300 mb-1 ml-1 flex items-center gap-1">
          {message.senderName}
          {message.senderId.includes('ai') && (
            <span className="text-[9px] bg-brand-900 text-brand-300 px-1 rounded border border-brand-700">AI</span>
          )}
        </span>
      )}

      {/* Main Message Card Container */}
      <div className={`max-w-[85%] lg:max-w-[70%] rounded-2xl p-3.5 shadow-md relative transition-all ${
        isMe
          ? 'bg-gradient-to-r from-brand-700 to-indigo-700 text-white rounded-tr-none border border-brand-500/40'
          : 'bg-[#151c2e] text-gray-100 rounded-tl-none border border-gray-800/90'
      }`}>

        {/* Floating Message Action Toolbar */}
        <div className={`absolute top-2 ${isMe ? '-left-28' : '-right-28'} hidden group-hover:flex items-center gap-1 p-1 rounded-xl bg-gray-900/95 border border-gray-700 shadow-lg z-20 backdrop-blur-md`}>
          {['👍', '❤️', '🔥', '🤖'].map(emoji => (
            <button
              key={emoji}
              onClick={() => addReaction(message.id, emoji)}
              className="hover:scale-125 transition-transform p-1 text-sm"
            >
              {emoji}
            </button>
          ))}
          <button
            onClick={() => handleTranslate('Spanish')}
            className="p-1 text-gray-400 hover:text-cyanGlow"
            title="Translate message"
          >
            <Languages className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => deleteMessage(message.id)}
            className="p-1 text-gray-400 hover:text-rose-400"
            title="Delete message"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Text Message Content */}
        {message.text && (
          <p className="text-xs lg:text-sm leading-relaxed whitespace-pre-line font-medium">
            {message.text}
          </p>
        )}

        {/* Translated Text Drawer */}
        {translatedText && (
          <div className="mt-2 pt-2 border-t border-brand-400/30 text-xs italic text-cyan-200 flex items-start gap-1.5">
            <Languages className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>{translatedText}</span>
          </div>
        )}

        {/* Code Snippet Renderer */}
        {message.codeSnippet && (
          <div className="mt-2 rounded-xl overflow-hidden border border-gray-800 bg-[#0a0f1d]">
            <div className="flex items-center justify-between px-3 py-1.5 bg-gray-900/90 border-b border-gray-800 text-[10px] font-mono text-gray-400">
              <span className="text-brand-300 font-bold uppercase">{message.codeSnippet.language}</span>
              <button
                onClick={() => handleCopyCode(message.codeSnippet.code)}
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <pre className="p-3 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{message.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Image Attachment + OCR Tool */}
        {message.imageUrl && (
          <div className="mt-2 rounded-xl overflow-hidden border border-gray-800 relative group/img">
            <img src={message.imageUrl} alt="attachment" className="w-full max-h-60 object-cover" />
            <div className="p-2 bg-gray-900/90 flex items-center justify-between text-xs">
              <span className="text-gray-300 italic text-[11px] truncate">{message.caption || 'Image attachment'}</span>
              <button
                onClick={() => setShowOCR(!showOCR)}
                className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 flex items-center gap-1 hover:bg-cyan-900"
              >
                <Sparkles className="w-3 h-3 text-cyanGlow" /> AI OCR Extract
              </button>
            </div>

            {showOCR && (
              <div className="p-2.5 bg-gray-950 text-[11px] font-mono text-emerald-300 border-t border-gray-800 whitespace-pre-line">
                {message.ocrExtractedText || performOCR(message.caption)}
              </div>
            )}
          </div>
        )}

        {/* Interactive Voice Note Player */}
        {message.type === 'voice' && (
          <div className="mt-1 p-2 rounded-xl bg-gray-900/60 border border-gray-800 space-y-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="p-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-glow-indigo transition-transform"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              {/* Pulsing Audio Waveform Simulation */}
              <div className="flex-1 flex items-center gap-0.5 h-6">
                {[40, 70, 30, 90, 50, 80, 20, 60, 95, 45, 85, 35, 75, 55, 90, 40].map((h, idx) => (
                  <span
                    key={idx}
                    className={`w-1 rounded-full transition-all ${
                      isPlayingAudio ? 'bg-cyanGlow animate-pulse' : 'bg-brand-500/40'
                    }`}
                    style={{ height: `${isPlayingAudio ? Math.max(20, (h * Math.random()) % 100) : h}%` }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPlaybackRate(playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1)}
                  className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gray-800 text-brand-300 border border-gray-700"
                >
                  {playbackRate}x
                </button>
                <span className="text-[11px] font-mono text-gray-400">{message.audioDuration || '0:24'}</span>
              </div>
            </div>

            {/* AI Auto Transcription Toggle */}
            {message.transcription && (
              <div className="pt-1 border-t border-gray-800">
                <button
                  onClick={() => setShowTranscription(!showTranscription)}
                  className="text-[10px] font-semibold text-brand-300 flex items-center gap-1 hover:underline"
                >
                  <Sparkles className="w-3 h-3 text-cyanGlow" />
                  {showTranscription ? 'Hide AI Transcription' : 'Show AI Transcription'}
                </button>
                {showTranscription && (
                  <p className="mt-1 text-[11px] text-gray-300 bg-gray-950 p-2 rounded-lg border border-gray-800 leading-relaxed italic">
                    "{message.transcription}"
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Interactive Poll Card */}
        {message.poll && (
          <div className="mt-2 p-3 rounded-xl bg-gray-900/90 border border-gray-800 space-y-2.5 min-w-[240px]">
            <h4 className="font-bold text-xs text-gray-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              {message.poll.question}
            </h4>

            <div className="space-y-1.5">
              {message.poll.options.map((opt, idx) => {
                const isSelected = message.poll.userVotedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => votePoll(message.id, idx)}
                    className={`w-full p-2 rounded-lg border text-left relative overflow-hidden transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-950/60'
                        : 'border-gray-800 bg-gray-950/40 hover:bg-gray-800/60'
                    }`}
                  >
                    {/* Vote progress fill bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-brand-600/30 transition-all duration-500"
                      style={{ width: `${opt.percentage}%` }}
                    />
                    <div className="relative flex items-center justify-between text-xs font-medium">
                      <span className="text-gray-200 z-10">{opt.text}</span>
                      <span className="text-[10px] font-bold text-brand-300 z-10">{opt.percentage}% ({opt.votes})</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-gray-500 text-right font-medium">
              Total Votes: {message.poll.totalVotes}
            </div>
          </div>
        )}

        {/* Message Footer: Timestamp, Disappearing status & Read Receipts */}
        <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[10px] opacity-75">
          <span className="font-medium">{message.timestamp}</span>
          {isMe && (
            <CheckCheck className={`w-3.5 h-3.5 ${message.status === 'read' ? 'text-cyanGlow' : 'text-gray-300'}`} />
          )}
        </div>

        {/* Message Reaction Badges */}
        {message.reactions && message.reactions.length > 0 && (
          <div className={`absolute -bottom-2.5 ${isMe ? 'right-2' : 'left-2'} flex items-center gap-1 bg-gray-900 border border-gray-700 px-1.5 py-0.5 rounded-full shadow-md text-[10px]`}>
            {message.reactions.map((r, i) => (
              <span key={i} className="flex items-center gap-0.5">
                <span>{r.emoji}</span>
                <span className="font-bold text-gray-300">{r.count}</span>
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
