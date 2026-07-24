import React, { useState } from 'react';
import { 
  Send, Mic, Image as ImageIcon, Paperclip, Code, BarChart2, 
  MapPin, Sparkles, Smile, X, Clock, StopCircle
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useApp } from '../../context/AppContext';
import { generateSmartReplies } from '../../services/aiService';

export default function MessageInput() {
  const { sendMessage, activeChat } = useChat();
  const { showToast } = useApp();

  const [inputText, setInputText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingTimerId, setRecordingTimerId] = useState(null);
  
  // Modals state
  const [showPollModal, setShowPollModal] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('typescript');
  const [codeContent, setCodeContent] = useState('');

  const lastMsg = activeChat?.messages[activeChat.messages.length - 1]?.text;
  const smartReplies = generateSmartReplies(lastMsg);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage({ text: inputText, type: 'text' });
    setInputText('');
    setShowAttachMenu(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStartVoiceRecording = () => {
    setIsRecordingVoice(true);
    setRecordingTime(0);
    const timer = setInterval(() => setRecordingTime(t => t + 1), 1000);
    setRecordingTimerId(timer);
  };

  const handleStopVoiceRecording = () => {
    clearInterval(recordingTimerId);
    setIsRecordingVoice(false);
    sendMessage({
      type: 'voice',
      audioUrl: 'mock_voice_recording.mp3',
      audioDuration: `0:${recordingTime < 10 ? '0' + recordingTime : recordingTime}`,
      transcription: 'Voice note recorded live in ChatSphere AI session.',
      text: ''
    });
    showToast('Voice note sent! 🎤', 'success');
  };

  const handleSendImageSample = () => {
    sendMessage({
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      caption: 'Enterprise Architecture Blueprint diagram',
      ocrExtractedText: 'ChatSphere High-Availability Architecture:\nEdge Gateway Nodes -> Double Ratchet KEM -> Redis Cluster'
    });
    setShowAttachMenu(false);
    showToast('Image attached!', 'success');
  };

  const handleSendLocation = () => {
    sendMessage({
      type: 'text',
      text: '📍 Sharing Live Location: Nexus Enterprise HQ (37.7749° N, 122.4194° W)',
    });
    setShowAttachMenu(false);
    showToast('Live Location shared!', 'info');
  };

  const handleCreatePollSubmit = () => {
    if (!pollQuestion.trim() || pollOptions.filter(o => o.trim()).length < 2) {
      showToast('Poll requires question and at least 2 options', 'warning');
      return;
    }
    const formattedOptions = pollOptions.filter(o => o.trim()).map(txt => ({
      text: txt,
      votes: 0,
      percentage: 0
    }));
    sendMessage({
      type: 'poll',
      poll: {
        id: `poll_${Date.now()}`,
        question: pollQuestion,
        options: formattedOptions,
        totalVotes: 0,
        userVotedOption: null
      }
    });
    setShowPollModal(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    showToast('Poll published to conversation! 📊', 'success');
  };

  const handleCreateCodeSubmit = () => {
    if (!codeContent.trim()) return;
    sendMessage({
      type: 'text',
      text: `Code snippet (${codeLanguage}):`,
      codeSnippet: {
        language: codeLanguage,
        code: codeContent
      }
    });
    setShowCodeModal(false);
    setCodeContent('');
    showToast('Code block sent!', 'success');
  };

  return (
    <div className="p-3 bg-[#0d1322] border-t border-gray-800/80 relative">
      {/* AI Smart Reply Suggestion Chips */}
      <div className="flex items-center gap-1.5 mb-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-brand-300 flex items-center gap-1 px-1.5 py-0.5 rounded bg-brand-950 border border-brand-800">
          <Sparkles className="w-3 h-3 text-cyanGlow" /> Smart Replies:
        </span>
        {smartReplies.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => {
              sendMessage({ text: chip, type: 'text' });
            }}
            className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-gray-900/80 hover:bg-brand-600/30 text-gray-300 hover:text-white border border-gray-800 transition-all whitespace-nowrap"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Voice Recording Bar */}
      {isRecordingVoice ? (
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 animate-pulse">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>
            <span className="text-xs font-mono font-bold text-rose-200">
              Recording Voice Note: 0:{recordingTime < 10 ? '0' + recordingTime : recordingTime}
            </span>
          </div>

          {/* Simulated Audio Wave Canvas */}
          <div className="flex items-center gap-1 h-6">
            {[40, 70, 90, 50, 80, 60, 95, 30].map((h, i) => (
              <span key={i} className="w-1 bg-rose-400 rounded-full animate-wave" style={{ height: `${h}%` }}></span>
            ))}
          </div>

          <button
            onClick={handleStopVoiceRecording}
            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow-md"
          >
            <StopCircle className="w-4 h-4" /> Send Voice
          </button>
        </div>
      ) : (
        /* Normal Message Input Box */
        <div className="flex items-center gap-2 relative">
          {/* Attachment Menu Button */}
          <button
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className={`p-2.5 rounded-xl border transition-all ${
              showAttachMenu
                ? 'bg-brand-600 text-white border-brand-500'
                : 'bg-gray-900/80 text-gray-400 hover:text-white border-gray-800'
            }`}
            title="Attach Media & Tools"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Attachment Popover Drawer */}
          {showAttachMenu && (
            <div className="absolute bottom-14 left-0 p-2 rounded-2xl bg-gray-900/95 border border-brand-500/30 shadow-glow-indigo grid grid-cols-2 sm:grid-cols-4 gap-2 z-30 backdrop-blur-md w-72 sm:w-96 animate-in slide-in-from-bottom-2">
              <button
                onClick={handleSendImageSample}
                className="p-2.5 rounded-xl bg-gray-800/80 hover:bg-brand-600/30 border border-gray-700/50 flex flex-col items-center gap-1 text-xs font-semibold text-gray-200 transition-all"
              >
                <ImageIcon className="w-5 h-5 text-cyanGlow" /> Photo & OCR
              </button>
              <button
                onClick={() => { setShowPollModal(true); setShowAttachMenu(false); }}
                className="p-2.5 rounded-xl bg-gray-800/80 hover:bg-brand-600/30 border border-gray-700/50 flex flex-col items-center gap-1 text-xs font-semibold text-gray-200 transition-all"
              >
                <BarChart2 className="w-5 h-5 text-purple-400" /> Create Poll
              </button>
              <button
                onClick={() => { setShowCodeModal(true); setShowAttachMenu(false); }}
                className="p-2.5 rounded-xl bg-gray-800/80 hover:bg-brand-600/30 border border-gray-700/50 flex flex-col items-center gap-1 text-xs font-semibold text-gray-200 transition-all"
              >
                <Code className="w-5 h-5 text-emerald-400" /> Code Snippet
              </button>
              <button
                onClick={handleSendLocation}
                className="p-2.5 rounded-xl bg-gray-800/80 hover:bg-brand-600/30 border border-gray-700/50 flex flex-col items-center gap-1 text-xs font-semibold text-gray-200 transition-all"
              >
                <MapPin className="w-5 h-5 text-amber-400" /> Live Location
              </button>
            </div>
          )}

          {/* Text Input Field */}
          <input
            type="text"
            placeholder="Type encrypted message or /ask AI..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-gray-900/90 border border-gray-800 focus:border-brand-500/60 text-gray-100 placeholder-gray-500 outline-none transition-all"
          />

          {/* Voice Record Button */}
          <button
            onClick={handleStartVoiceRecording}
            className="p-2.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 text-gray-400 hover:text-brand-300 border border-gray-800 transition-all"
            title="Hold to Record Voice Note"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold shadow-glow-indigo disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Create Poll Modal */}
      {showPollModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-900 border border-brand-500/40 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="font-bold text-sm text-gray-100 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-400" /> Create Interactive Poll
              </h3>
              <button onClick={() => setShowPollModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Poll Question</label>
              <input
                type="text"
                placeholder="What topic should we vote on?"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-gray-950 border border-gray-800 text-gray-100 outline-none focus:border-brand-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 block">Options</label>
              {pollOptions.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...pollOptions];
                    newOpts[i] = e.target.value;
                    setPollOptions(newOpts);
                  }}
                  className="w-full p-2 text-xs rounded-xl bg-gray-950 border border-gray-800 text-gray-100 outline-none focus:border-brand-500"
                />
              ))}
              <button
                onClick={() => setPollOptions([...pollOptions, ''])}
                className="text-xs font-semibold text-brand-400 hover:underline"
              >
                + Add Another Option
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
              <button onClick={() => setShowPollModal(false)} className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white">
                Cancel
              </button>
              <button onClick={handleCreatePollSubmit} className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-glow-indigo">
                Publish Poll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Code Snippet Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-gray-900 border border-brand-500/40 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="font-bold text-sm text-gray-100 flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" /> Share Formatted Code Snippet
              </h3>
              <button onClick={() => setShowCodeModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Language</label>
              <select
                value={codeLanguage}
                onChange={(e) => setCodeLanguage(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-gray-950 border border-gray-800 text-gray-200 outline-none"
              >
                <option value="typescript">TypeScript</option>
                <option value="python">Python (FastAPI)</option>
                <option value="javascript">JavaScript (React / Node)</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Code</label>
              <textarea
                rows={6}
                placeholder="Paste code here..."
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                className="w-full p-3 font-mono text-xs rounded-xl bg-gray-950 border border-gray-800 text-cyan-300 outline-none focus:border-brand-500 leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
              <button onClick={() => setShowCodeModal(false)} className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white">
                Cancel
              </button>
              <button onClick={handleCreateCodeSubmit} className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-glow-indigo">
                Send Code Block
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
