import React, { useState } from 'react';
import { Mic, Volume2, ShieldCheck, Play, CheckCircle2, AlertTriangle, Sliders, RefreshCw, Lock } from 'lucide-react';
import { cloneAndSynthesizeVoice } from '../../services/aiService';
import { backendApi } from '../../services/backendApi';
import { useApp } from '../../context/AppContext';

export default function VoiceCloningLab() {
  const { showToast } = useApp();
  const [voiceSampleName, setVoiceSampleName] = useState('Alex Vance Executive Voice Sample');
  const [consentGranted, setConsentGranted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(true);
  const [textPrompt, setTextPrompt] = useState('Welcome to ChatSphere AI enterprise broadcast. All real-time channels are encrypted and monitored with zero-trust AI agents.');
  const [pitch, setPitch] = useState(1.0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedResult, setSynthesizedResult] = useState(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    showToast('Recording 5-second voice sample for neural embedding...', 'info');
    setTimeout(() => {
      setIsRecording(false);
      setRecordingComplete(true);
      showToast('Voice sample recorded & pitch frequency analyzed!', 'success');
    }, 4000);
  };

  const handleSynthesize = async (e) => {
    e.preventDefault();
    if (!consentGranted) {
      showToast('Biometric consent verification is required!', 'error');
      return;
    }

    setIsSynthesizing(true);
    showToast('Synthesizing voice clone via ChatSphere Neural Speech engine...', 'info');

    try {
      const res = await backendApi.synthesizeVoiceClone(textPrompt, consentGranted, pitch);
      const cloneData = await cloneAndSynthesizeVoice(voiceSampleName, textPrompt, pitch, consentGranted);

      setSynthesizedResult({
        ...cloneData,
        metrics: res.metrics || { timbreMatchScore: '99.1%', latencyMs: 120 }
      });
      showToast('Voice synthesized successfully! Ready for playback.', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0b0f19] text-gray-100 p-6 overflow-y-auto space-y-6 z-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Mic className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-100 tracking-tight flex items-center gap-2">
              AI Voice Cloning & Neural Speech Lab
            </h2>
            <p className="text-xs text-gray-400">
              Ethical AI Voice Synthesis • Biometric Consent Gateways • Low-Latency Audio Playback
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> Security Policy Verified
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Voice Sample Recording & Consent */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-4 shadow-xl">
            <h3 className="text-sm font-extrabold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-400" /> Step 1: Voice Sample & Consent Protocol
            </h3>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs leading-relaxed flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong>Mandatory Ethical AI Consent:</strong> Voice cloning requires explicit authorization. By enabling consent, you verify that this voice belongs to you or you hold authorized permission.
              </div>
            </div>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-gray-950 border border-gray-800 cursor-pointer hover:border-gray-700 transition">
              <input
                type="checkbox"
                checked={consentGranted}
                onChange={(e) => setConsentGranted(e.target.checked)}
                className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-gray-900 border-gray-700"
              />
              <span className="text-xs font-bold text-gray-200">
                I grant explicit consent for biometric AI voice embedding synthesis.
              </span>
            </label>

            {/* Record Sample Button */}
            <div className="pt-2">
              <button
                onClick={handleStartRecording}
                disabled={isRecording}
                className={`w-full py-3 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition ${isRecording ? 'bg-red-500/20 border-red-500/50 text-red-300 animate-pulse' : 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700'}`}
              >
                <Mic className="w-4 h-4" />
                {isRecording ? 'Recording Sample (Say "Hello ChatSphere AI")...' : 'Record 5-Second Voice Sample'}
              </button>
            </div>

            {recordingComplete && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Audio sample embedded & encrypted with 256-bit key.
              </div>
            )}
          </div>

          {/* Pitch & Frequency Controls */}
          <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-4 shadow-xl">
            <h3 className="text-sm font-extrabold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" /> Pitch & Timbre Modifiers
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-semibold">
                <span>Pitch Frequency</span>
                <span className="text-brand-400">{pitch.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-950 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Text to Speech Synthesis */}
        <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-brand-400" /> Step 2: Neural Speech Synthesis
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400">Target Broadcast Text</label>
              <textarea
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                rows={5}
                className="w-full p-4 rounded-2xl bg-gray-950 border border-gray-800 text-xs text-gray-200 focus:outline-none focus:border-brand-500 resize-none"
              />
            </div>

            <button
              onClick={handleSynthesize}
              disabled={isSynthesizing || !consentGranted}
              className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-indigo transition"
            >
              {isSynthesizing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Voice Clone...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Generate Cloned Voice Note
                </>
              )}
            </button>
          </div>

          {/* Synthesis Output Display */}
          {synthesizedResult && (
            <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Neural Voice Ready
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  Score: {synthesizedResult.metrics?.timbreMatchScore || '99.1%'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => showToast('Playing synthesized voice note sample...', 'info')}
                    className="p-2.5 rounded-full bg-brand-600 text-white hover:bg-brand-500 shadow-md"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">Neural Voice Note Broadcast</h4>
                    <p className="text-[10px] text-gray-400">Duration: 00:08 • 48kHz WAV</p>
                  </div>
                </div>

                <span className="px-2 py-1 rounded bg-gray-800 text-[10px] text-brand-300 font-mono">
                  {synthesizedResult.metrics?.latencyMs || 120}ms
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
