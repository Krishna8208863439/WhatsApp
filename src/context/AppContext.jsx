import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENT_USER } from '../services/mockData';
import { backendApi } from '../services/backendApi';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const [activeTab, setActiveTab] = useState('chats'); // 'chats' | 'communities' | 'channels' | 'calls' | 'status' | 'ai_suite' | 'ai_workflows' | 'ai_avatar_calls' | 'meeting_assistant' | 'voice_lab' | 'business' | 'admin' | 'security'
  const [activeCall, setActiveCall] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    backendApi.connectWebSocket(currentUser.id);
    const unsubscribe = backendApi.subscribe((data) => {
      if (data.type === 'status_change') {
        setIsBackendConnected(data.isConnected);
      }
    });

    return () => unsubscribe();
  }, [currentUser.id]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  };

  const startCall = (contactName, contactAvatar, type = 'video', isGroup = false) => {
    setActiveCall({
      type,
      contactName,
      contactAvatar,
      isGroup,
      isIncoming: false,
      startTime: Date.now(),
      muted: false,
      videoOn: true,
      screenSharing: false,
      arFilter: 'none',
      noiseCancellation: true,
      captionsOn: true
    });
  };

  const endCall = () => {
    if (activeCall) {
      showToast(`Call with ${activeCall.contactName} ended`, 'info');
      setActiveCall(null);
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      activeTab,
      setActiveTab,
      activeCall,
      setActiveCall,
      startCall,
      endCall,
      toast,
      showToast,
      searchQuery,
      setSearchQuery,
      showRightPanel,
      setShowRightPanel,
      customApiKey,
      setCustomApiKey,
      showSettingsModal,
      setShowSettingsModal,
      isBackendConnected
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

