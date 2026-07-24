import React, { useState } from 'react';
import { Users, Megaphone, Calendar, ShieldCheck, Plus, Sparkles, ChevronRight, MessageSquare } from 'lucide-react';
import { MOCK_COMMUNITIES } from '../../services/mockData';
import { useApp } from '../../context/AppContext';

export default function CommunityView() {
  const { showToast } = useApp();
  const [selectedComm, setSelectedComm] = useState(MOCK_COMMUNITIES[0]);

  return (
    <div className="flex-1 bg-[#0b0f19] flex flex-col lg:flex-row h-full overflow-hidden z-10">
      {/* Communities Sidebar */}
      <div className="w-full lg:w-80 bg-[#0c111e] border-r border-gray-800/80 p-4 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-base text-gray-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-400" /> Communities
          </h2>
          <button
            onClick={() => showToast('New Community wizard launched', 'info')}
            className="p-1.5 rounded-lg bg-brand-600/30 text-brand-300 border border-brand-500/40 hover:bg-brand-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {MOCK_COMMUNITIES.map(comm => (
            <div
              key={comm.id}
              onClick={() => setSelectedComm(comm)}
              className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                selectedComm.id === comm.id
                  ? 'bg-brand-600/20 border-brand-500 shadow-glow-indigo'
                  : 'bg-gray-900/60 border-gray-800 hover:bg-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={comm.avatar} alt={comm.name} className="w-12 h-12 rounded-xl object-cover border border-gray-700" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-xs text-gray-100 truncate">{comm.name}</h3>
                  <p className="text-[11px] text-gray-400">{comm.membersCount.toLocaleString()} Members</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Community Stage */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Banner */}
        <div className="relative h-44 rounded-3xl overflow-hidden border border-gray-800 flex items-end p-6">
          <img src={selectedComm.banner} alt="banner" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="relative z-10 flex items-center gap-4">
            <img src={selectedComm.avatar} alt={selectedComm.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-glow-indigo" />
            <div>
              <h1 className="font-black text-xl text-white flex items-center gap-2">
                {selectedComm.name}
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> AI Moderated
                </span>
              </h1>
              <p className="text-xs text-gray-300">{selectedComm.description}</p>
            </div>
          </div>
        </div>

        {/* Grid for Subgroups & Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subgroups Card */}
          <div className="p-5 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-3">
            <h3 className="font-bold text-sm text-gray-200 flex items-center justify-between">
              <span>Topic Subgroups</span>
              <span className="text-xs text-brand-400 font-normal">{selectedComm.subgroups.length} Channels</span>
            </h3>

            <div className="space-y-2">
              {selectedComm.subgroups.map(sub => (
                <div
                  key={sub.id}
                  onClick={() => showToast(`Joined subgroup: ${sub.name}`, 'info')}
                  className="p-3 rounded-xl bg-gray-950/60 hover:bg-gray-800 border border-gray-800 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-brand-400" />
                    <span className="text-xs font-semibold text-gray-200">{sub.name}</span>
                  </div>
                  {sub.unread > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-600 text-white">
                      {sub.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="p-5 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-3">
            <h3 className="font-bold text-sm text-gray-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" /> Community Events
            </h3>

            <div className="space-y-2">
              {selectedComm.upcomingEvents.map(evt => (
                <div key={evt.id} className="p-3.5 rounded-xl bg-gray-950/80 border border-amber-900/40 space-y-2">
                  <h4 className="font-bold text-xs text-amber-200">{evt.title}</h4>
                  <p className="text-[11px] text-gray-400">{evt.date} • {evt.location}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-gray-500 font-medium">{evt.attendees} Attending</span>
                    <button
                      onClick={() => showToast('RSVP Confirmed!', 'success')}
                      className="px-3 py-1 text-[10px] font-bold rounded-lg bg-amber-600 hover:bg-amber-500 text-white shadow-sm"
                    >
                      RSVP Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
