import React, { useState, useEffect } from 'react';
import { UserCheck, Sparkles, Mic, MicOff, Video, VideoOff, MessageSquare, Volume2, ShieldCheck, Layers, Play } from 'lucide-react';
import { getAIAvatarResponse } from '../../services/aiService';
import { useApp } from '../../context/AppContext';

export default function AIAvatarCallView() {
  const { showToast } = useApp();
  const [selectedAvatar, setSelectedAvatar] = useState('nexus_prime');
  const [avatarMood, setAvatarMood] = useState('Professional');
  const [isTalking, setIsTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [liveSubtitles, setLiveSubtitles] = useState("Greetings! I am Nexus Prime, your photorealistic AI Video Avatar. How can I assist your executive meeting today?");
  const [userPromptInput, setUserPromptInput] = useState('');
  const [backgroundEnv, setBackgroundEnv] = useState('Cyberpunk Studio');

  const AVATARS = [
    { id: 'nexus_prime', name: 'Nexus Prime (Executive)', style: 'Photorealistic Male 3D', avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
    { id: 'aria_ai', name: 'Aria AI (Presenter)', style: 'Photorealistic Female 3D', avatarImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80' },
    { id: 'cyber_bot', name: 'Cipher-8 (Tech Specialist)', style: 'Holographic Cybernetic', avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' }
  ];

  const handleSpeakToAvatar = async (e) => {
    e.preventDefault();
    if (!userPromptInput.trim()) return;

    const userText = userPromptInput;
    setUserPromptInput('');
    setIsTalking(true);
    showToast('AI Avatar generating lip-sync video frame sequence...', 'info');

    try {
      const avatarRes = await getAIAvatarResponse(userText);
      setLiveSubtitles(avatarRes.text);
      setAvatarMood(avatarRes.emotion || 'Engaged');
    } catch (err) {
      showToast('Avatar render error', 'error');
    } finally {
      setTimeout(() => setIsTalking(false), 4000);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080b13] text-gray-100 p-6 overflow-y-auto space-y-6 z-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div>
          <h2 className="text-xl font-black text-gray-100 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-400" /> AI Avatar Interactive Video Call Suite
          </h2>
          <p className="text-xs text-gray-400">
            Photorealistic AI Presenters • Real-Time Lip-Sync Neural Engine • 60 FPS Canvas Relay
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Low-Latency WebRTC Stream
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Main Avatar Video Viewport */}
        <div className="lg:col-span-2 relative rounded-3xl bg-gray-950 border border-gray-800 overflow-hidden flex flex-col justify-between shadow-2xl min-h-[420px]">
          {/* Background Canvas Overlay */}
          <div className="absolute inset-0 opacity-40 bg-gradient-to-tr from-brand-950 via-gray-900 to-indigo-950 pointer-events-none" />

          {/* Top Bar Video Indicators */}
          <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-gray-200">LIVE | AI Avatar Video Broadcast</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-gray-900/80 backdrop-blur text-[11px] text-gray-300 border border-gray-700">
                Environment: {backgroundEnv}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-brand-500/20 backdrop-blur text-[11px] font-bold text-brand-300 border border-brand-500/30">
                Mood: {avatarMood}
              </span>
            </div>
          </div>

          {/* Central Avatar Visual Stage */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
            {isVideoOn ? (
              <div className="relative group">
                <div className={`w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 ${isTalking ? 'border-brand-400 shadow-glow-indigo animate-pulse' : 'border-indigo-600/60'} transition-all duration-300 shadow-2xl`}>
                  <img
                    src={AVATARS.find(a => a.id === selectedAvatar)?.avatarImg}
                    alt="AI Avatar"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {isTalking && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-600 text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                    <Volume2 className="w-3 h-3 animate-bounce" /> Lip-Sync Audio Active
                  </div>
                )}
              </div>
            ) : (
              <div className="w-44 h-44 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500">
                <VideoOff className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* Subtitles Overlay */}
          <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <div className="p-3 rounded-2xl bg-gray-900/90 backdrop-blur border border-gray-800 text-center space-y-1">
              <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Subtitle Transcription
              </span>
              <p className="text-xs md:text-sm text-gray-100 font-medium italic">
                "{liveSubtitles}"
              </p>
            </div>
          </div>

          {/* Bottom Call Controls */}
          <div className="relative z-10 p-4 bg-gray-950 border-t border-gray-800/80 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-2xl border transition ${isMuted ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700'}`}
              title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-2xl border transition ${!isVideoOn ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700'}`}
              title={isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
            >
              {!isVideoOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>

            <button
              onClick={() => showToast('Switched AR Background Filter', 'info')}
              className="p-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-indigo-300 border border-gray-700"
              title="Virtual Backgrounds"
            >
              <Layers className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Sidebar - Controls & Prompt Input */}
        <div className="space-y-6">
          {/* Avatar Selector */}
          <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-400" /> Select AI Avatar Persona
            </h3>

            <div className="space-y-3">
              {AVATARS.map(av => (
                <button
                  key={av.id}
                  onClick={() => setSelectedAvatar(av.id)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition ${selectedAvatar === av.id ? 'bg-brand-600/20 border-brand-500 text-white' : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'}`}
                >
                  <img src={av.avatarImg} alt={av.name} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                  <div>
                    <h4 className="font-bold text-xs text-gray-200">{av.name}</h4>
                    <p className="text-[11px] text-gray-400">{av.style}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Voice Input Form */}
          <form onSubmit={handleSpeakToAvatar} className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" /> Speak / Prompt Avatar
            </h3>

            <textarea
              value={userPromptInput}
              onChange={(e) => setUserPromptInput(e.target.value)}
              placeholder="Type questions or topics for your AI Avatar to present live..."
              rows={3}
              className="w-full p-3 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-200 focus:outline-none focus:border-brand-500 resize-none"
            />

            <button
              type="submit"
              disabled={!userPromptInput.trim() || isTalking}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-indigo transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Trigger Avatar Speech & Presentation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
