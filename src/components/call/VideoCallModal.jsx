import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, Monitor, Sparkles, 
  ShieldCheck, Wand2, Volume2, Settings, Users, MessageSquare, Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ARFilterCanvas from './ARFilterCanvas';

export default function VideoCallModal() {
  const { activeCall, endCall, showToast } = useApp();
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [arFilter, setArFilter] = useState('cyber'); // 'none' | 'cyber' | 'studio' | 'blur'
  const [noiseCancel, setNoiseCancel] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!activeCall) return;
    const timer = setInterval(() => setCallDuration(d => d + 1), 1000);

    // Try starting local video stream from webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.log('Webcam not active or blocked - using HD avatar feed'));
    }

    return () => clearInterval(timer);
  }, [activeCall]);

  if (!activeCall || activeCall.type !== 'video') return null;

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-600/30 border border-brand-500/40 text-brand-300 flex items-center gap-2 text-xs font-bold shadow-glow-indigo">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            HD 1080p WebRTC Mesh • Signal E2E Encrypted
          </div>
          <span className="px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-mono font-bold animate-pulse flex items-center gap-1.5">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            REC 0:{formatDuration(callDuration)}
          </span>
        </div>

        {/* Call Info */}
        <div className="text-right">
          <h3 className="font-extrabold text-sm text-gray-100">{activeCall.contactName}</h3>
          <p className="text-[11px] text-gray-400">Low-Latency Opus 48kHz Audio</p>
        </div>
      </div>

      {/* Main Video Stream Grid */}
      <div className="flex-1 my-4 grid grid-cols-1 md:grid-cols-2 gap-4 relative items-center justify-center min-h-0">
        {/* Remote Participant Stage */}
        <div className="relative h-full rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl flex items-center justify-center group">
          <img
            src={activeCall.contactAvatar}
            alt={activeCall.contactName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

          {/* Participant Label */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-gray-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-800 text-xs font-bold text-gray-200">
            <span>{activeCall.contactName}</span>
            <span className="text-[10px] text-emerald-400">4K 60FPS</span>
          </div>
        </div>

        {/* Local User Stream with AR Filters */}
        <div className="relative h-full rounded-3xl overflow-hidden bg-gray-950 border border-brand-500/40 shadow-glow-indigo flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
          {!videoOn && (
            <div className="absolute inset-0 bg-gray-950 flex flex-col items-center justify-center text-gray-500 text-xs">
              <VideoOff className="w-10 h-10 mb-2 text-gray-600" /> Camera Muted
            </div>
          )}

          {/* Canvas AR Filter Overlay */}
          <ARFilterCanvas filter={arFilter} videoRef={videoRef} />

          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-gray-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-800 text-xs font-bold text-gray-200">
            <span>You (Elena)</span>
            <span className="text-[10px] text-cyanGlow uppercase font-mono">AR: {arFilter}</span>
          </div>
        </div>

        {/* Live AI Interpretation Subtitles Bar */}
        {captionsOn && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-2xl bg-gray-950/90 border border-brand-500/50 shadow-glow-indigo text-xs text-center text-cyan-200 font-medium z-30 max-w-xl backdrop-blur-md">
            <div className="text-[10px] font-bold text-brand-300 flex items-center justify-center gap-1 mb-0.5">
              <Sparkles className="w-3 h-3 text-cyanGlow" /> Real-Time Live AI Subtitles:
            </div>
            "We are standardizing our microservices mesh with zero-latency WebRTC data channels."
          </div>
        )}
      </div>

      {/* Floating Control Toolbar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-900/90 border border-gray-800 backdrop-blur-md max-w-3xl mx-auto w-full z-20 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Mute Audio Toggle */}
          <button
            onClick={() => setMuted(!muted)}
            className={`p-3 rounded-xl border transition-all ${
              muted
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700'
            }`}
            title="Toggle Microphone"
          >
            {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Toggle Video Camera */}
          <button
            onClick={() => setVideoOn(!videoOn)}
            className={`p-3 rounded-xl border transition-all ${
              !videoOn
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700'
            }`}
            title="Toggle Video Stream"
          >
            {!videoOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* Toggle Screen Share */}
          <button
            onClick={() => {
              setScreenSharing(!screenSharing);
              showToast(screenSharing ? 'Stopped screen sharing' : 'Screen sharing active', 'info');
            }}
            className={`p-3 rounded-xl border transition-all ${
              screenSharing
                ? 'bg-brand-600 text-white border-brand-500 shadow-glow-indigo'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700'
            }`}
            title="Share Screen"
          >
            <Monitor className="w-5 h-5" />
          </button>
        </div>

        {/* Center AR Filters Dropdown */}
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-cyanGlow" />
          <select
            value={arFilter}
            onChange={(e) => {
              setArFilter(e.target.value);
              showToast(`AR Filter applied: ${e.target.value}`, 'success');
            }}
            className="p-2 rounded-xl bg-gray-950 border border-brand-500/40 text-xs font-bold text-gray-200 outline-none cursor-pointer"
          >
            <option value="none">AR Filter: None</option>
            <option value="cyber">AR Filter: Cyber Grid HUD</option>
            <option value="studio">AR Filter: Studio Lighting</option>
            <option value="blur">AR Filter: Background Blur</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Subtitles Toggle */}
          <button
            onClick={() => setCaptionsOn(!captionsOn)}
            className={`p-3 rounded-xl border transition-all ${
              captionsOn
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-glow-indigo'
                : 'bg-gray-800 text-gray-400 border-gray-700'
            }`}
            title="Toggle AI Subtitles"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          {/* End Call Button */}
          <button
            onClick={endCall}
            className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
          >
            <PhoneOff className="w-5 h-5" /> End HD Call
          </button>
        </div>
      </div>
    </div>
  );
}
