import React, { createContext, useContext, useState } from 'react';
import { CURRENT_USER } from '../services/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const [activeTab, setActiveTab] = useState('chats'); // 'chats' | 'communities' | 'channels' | 'calls' | 'status' | 'ai_suite' | 'business' | 'admin' | 'security'
  const [activeCall, setActiveCall] = useState(null); // null | { type: 'video'|'audio', contactName, contactAvatar, isGroup, isIncoming }
  const [toast, setToast] = useState(null); // null | { message, type: 'info'|'success'|'warning', id }
  const [searchQuery, setSearchQuery] = useState('');
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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
      arFilter: 'none', // 'none' | 'cyber' | 'studio' | 'blur'
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
      setShowSettingsModal
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
