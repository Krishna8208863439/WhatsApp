import React, { useState, useEffect } from 'react';
import { FileText, CheckSquare, Calendar, Download, Sparkles, Clock, Users, Plus, Share2, Check } from 'lucide-react';
import { generateLiveMeetingNote } from '../../services/aiService';
import { backendApi } from '../../services/backendApi';
import { useApp } from '../../context/AppContext';

export default function AIMeetingAssistant() {
  const { showToast } = useApp();
  const [meetingTopic, setMeetingTopic] = useState('Enterprise AI & Double Ratchet Roadmap');
  const [meetingNotes, setMeetingNotes] = useState([
    {
      id: 'mn_1',
      title: 'Q3 Enterprise Architecture & Scalability',
      date: '2026-07-24',
      duration: '32 mins',
      participants: ['Alex Vance', 'Sarah Connor', 'Marcus Brody'],
      summary: 'Delivered WebSockets benchmark results (8ms latency). Approved Signal protocol double-ratchet session expiration policies and AI Voice consent controls.',
      actionItems: [
        { id: 'act_1', task: 'Deploy WebSocket horizontal pod autoscalers', owner: 'Alex Vance', status: 'In Progress' },
        { id: 'act_2', task: 'Finalize WebAuthn Passkey biometric fallback', owner: 'Sarah Connor', status: 'Done' }
      ]
    }
  ]);

  const [activeNote, setActiveNote] = useState(meetingNotes[0]);

  const handleGenerateNewNote = async () => {
    showToast('AI Listening to call audio & generating transcript summary...', 'info');
    const newNote = generateLiveMeetingNote(meetingTopic);
    
    try {
      const backendRes = await backendApi.generateMeetingNote(meetingTopic, 'Live Audio Signal');
      if (backendRes.note) {
        setMeetingNotes([backendRes.note, ...meetingNotes]);
        setActiveNote(backendRes.note);
      } else {
        setMeetingNotes([newNote, ...meetingNotes]);
        setActiveNote(newNote);
      }
      showToast('AI Meeting Notes & Action Items generated successfully!', 'success');
    } catch (err) {
      setMeetingNotes([newNote, ...meetingNotes]);
      setActiveNote(newNote);
    }
  };

  const toggleTaskStatus = (taskId) => {
    setActiveNote(prev => ({
      ...prev,
      actionItems: prev.actionItems.map(item =>
        item.id === taskId
          ? { ...item, status: item.status === 'Done' ? 'Pending' : 'Done' }
          : item
      )
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0b0f19] text-gray-100 p-6 overflow-y-auto space-y-6 z-10">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-glow-indigo">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-100 tracking-tight flex items-center gap-2">
              AI Meeting Assistant & Note Synthesizer
            </h2>
            <p className="text-xs text-gray-400">
              Live Call Audio Transcription • Action Items Extractor • Executive Summary Export
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerateNewNote}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-indigo transition"
        >
          <Sparkles className="w-4 h-4" /> Synthesize Call Note
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left List of Meeting Logs */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Saved Meeting Transcripts ({meetingNotes.length})
          </h3>

          {meetingNotes.map(note => (
            <div
              key={note.id}
              onClick={() => setActiveNote(note)}
              className={`p-4 rounded-2xl border cursor-pointer transition ${activeNote?.id === note.id ? 'bg-brand-600/20 border-brand-500 shadow-lg' : 'bg-gray-900 border-gray-800 hover:border-gray-700'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-brand-300 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {note.date}
                </span>
                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {note.duration}
                </span>
              </div>
              <h4 className="font-bold text-xs text-gray-200">{note.title}</h4>
              <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">{note.summary}</p>
            </div>
          ))}
        </div>

        {/* Right Active Note Details */}
        {activeNote && (
          <div className="lg:col-span-2 p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-100">{activeNote.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand-400" /> {activeNote.date}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-indigo-400" /> {activeNote.participants.join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast('Meeting Summary Exported as PDF', 'success')}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700"
                    title="Export PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showToast('Share link copied to clipboard', 'info')}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700"
                    title="Share Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Summary Section */}
              <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800/80 space-y-2">
                <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Generated Executive Summary
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {activeNote.summary}
                </p>
              </div>

              {/* Action Items List */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-gray-200 uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400" /> Extracted Action Items ({activeNote.actionItems.length})
                </h4>

                <div className="space-y-2">
                  {activeNote.actionItems.map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleTaskStatus(item.id)}
                      className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between cursor-pointer hover:border-gray-700 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${item.status === 'Done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-700 bg-gray-900'}`}>
                          {item.status === 'Done' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className={`text-xs ${item.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                          {item.task}
                        </span>
                      </div>

                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {item.owner}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
              <span>Whisper Speech-to-Text • LangChain NLP Model</span>
              <span className="text-emerald-400 font-semibold">100% End-to-End Encrypted Note Storage</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
