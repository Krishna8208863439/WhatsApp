import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import RightPanel from './components/layout/RightPanel';
import ChatList from './components/chat/ChatList';
import ChatWindow from './components/chat/ChatWindow';
import AIAssistantPanel from './components/ai/AIAssistantPanel';
import AIWorkflowHub from './components/ai/AIWorkflowHub';
import AIAvatarCallView from './components/call/AIAvatarCallView';
import AIMeetingAssistant from './components/call/AIMeetingAssistant';
import VoiceCloningLab from './components/ai/VoiceCloningLab';
import CommunityView from './components/community/CommunityView';
import ChannelsView from './components/community/ChannelsView';
import StatusStories from './components/status/StatusStories';
import BusinessHub from './components/business/BusinessHub';
import AdminDashboard from './components/admin/AdminDashboard';
import SecuritySync from './components/security/SecuritySync';
import VideoCallModal from './components/call/VideoCallModal';
import AudioCallModal from './components/call/AudioCallModal';
import SettingsModal from './components/common/SettingsModal';
import Toast from './components/common/Toast';
import { MOCK_CALL_LOGS } from './services/mockData';
import { Phone, Video, ShieldCheck } from 'lucide-react';

function AppContent() {
  const { activeTab, startCall } = useApp();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0b0f19] text-gray-100 font-sans">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Stage */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Render header for main chat view */}
        {activeTab === 'chats' && <Header />}

        {/* Dynamic View Router */}
        <div className="flex-1 flex h-full overflow-hidden relative">
          {activeTab === 'chats' && (
            <>
              <ChatList />
              <ChatWindow />
              <RightPanel />
            </>
          )}

          {activeTab === 'ai_suite' && <AIAssistantPanel />}
          {activeTab === 'ai_workflows' && <AIWorkflowHub />}
          {activeTab === 'ai_avatar_calls' && <AIAvatarCallView />}
          {activeTab === 'meeting_assistant' && <AIMeetingAssistant />}
          {activeTab === 'voice_lab' && <VoiceCloningLab />}
          {activeTab === 'communities' && <CommunityView />}
          {activeTab === 'channels' && <ChannelsView />}

          {activeTab === 'calls' && (
            <div className="flex-1 bg-[#0b0f19] p-6 overflow-y-auto z-10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div>
                  <h2 className="font-extrabold text-lg text-gray-100 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-brand-400" /> HD Voice & Video Call Log
                  </h2>
                  <p className="text-xs text-gray-400">Low-Latency Opus & H.264 WebRTC Relays</p>
                </div>
              </div>

              <div className="space-y-3 max-w-3xl">
                {MOCK_CALL_LOGS.map(call => (
                  <div key={call.id} className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-3">
                      <img src={call.avatar} alt={call.name} className="w-11 h-11 rounded-full object-cover border border-gray-700" />
                      <div>
                        <h4 className="font-bold text-xs text-gray-200">{call.name}</h4>
                        <p className="text-[11px] text-gray-400">{call.time} • {call.duration} • <span className="text-emerald-400 font-medium">{call.quality}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startCall(call.name, call.avatar, 'audio', call.type === 'group')}
                        className="p-2 rounded-xl bg-gray-800 hover:bg-brand-600/30 text-gray-300 hover:text-brand-300 border border-gray-700"
                        title="Redial Audio Call"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startCall(call.name, call.avatar, 'video', call.type === 'group')}
                        className="p-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-glow-indigo"
                        title="Redial Video Call"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'status' && <StatusStories />}
          {activeTab === 'business' && <BusinessHub />}
          {activeTab === 'security' && <SecuritySync />}
          {activeTab === 'admin' && <AdminDashboard />}
        </div>
      </main>

      {/* Global Call Overlays, Settings Modal & Toasts */}
      <VideoCallModal />
      <AudioCallModal />
      <SettingsModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </AppProvider>
  );
}
