import React, { createContext, useContext, useState } from 'react';
import { MOCK_CHATS } from '../services/mockData';
import { playSound } from '../services/audioService';
import { generateAIResponse } from '../services/aiService';
import { useApp } from './AppContext';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { showToast, customApiKey } = useApp();
  const [chats, setChats] = useState(MOCK_CHATS);
  const [activeChatId, setActiveChatId] = useState('chat_marcus');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'unread' | 'favorites' | 'groups' | 'ai' | 'business'
  const [isTypingAI, setIsTypingAI] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const selectChat = (chatId) => {
    setActiveChatId(chatId);
    // Mark as read
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, unreadCount: 0 } : c));
  };

  const togglePinChat = (chatId) => {
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, pinned: !c.pinned } : c));
    showToast('Chat pin state updated', 'info');
  };

  const toggleDisappearingMessages = (chatId, days) => {
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, disappearingDays: days } : c));
    showToast(`Disappearing messages set to ${days === 0 ? 'Off' : days + ' days'}`, 'success');
  };

  const sendMessage = async ({ text, type = 'text', codeSnippet, imageUrl, poll, audioUrl, audioDuration, transcription, location }) => {
    playSound('send');

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: 'usr_me',
      senderName: 'Elena Rostova',
      type: type || 'text',
      text: text || '',
      codeSnippet,
      imageUrl,
      poll,
      audioUrl,
      audioDuration,
      transcription,
      location,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      reactions: []
    };

    // Update messages in active chat
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessage: text || (type === 'voice' ? '🎤 Voice note' : type === 'poll' ? '📊 Poll' : '📷 Media'),
          lastTimestamp: newMsg.timestamp,
          messages: [...chat.messages, newMsg]
        };
      }
      return chat;
    }));

    // Trigger AI response if chatting with AI Assistant or Multi-Agent
    if (activeChat.type === 'ai' || activeChat.contactId === 'c_ai_sphere' || activeChat.contactId === 'c_multi_agent') {
      setIsTypingAI(true);
      try {
        const aiText = await generateAIResponse(text || 'Explain this', activeChat.contactId === 'c_multi_agent' ? 'multi_agent' : 'direct', customApiKey);
        setIsTypingAI(false);
        playSound('receive');

        const aiMsg = {
          id: `msg_ai_${Date.now()}`,
          senderId: activeChat.contactId,
          senderName: activeChat.name,
          type: 'text',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          reactions: [{ emoji: '🤖', count: 1, users: ['usr_me'] }]
        };

        setChats(prev => prev.map(chat => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              lastMessage: aiText.slice(0, 60) + '...',
              lastTimestamp: aiMsg.timestamp,
              messages: [...chat.messages, aiMsg]
            };
          }
          return chat;
        }));
      } catch (err) {
        setIsTypingAI(false);
      }
    }
  };

  const addReaction = (messageId, emoji) => {
    playSound('action');
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        const updatedMsgs = chat.messages.map(msg => {
          if (msg.id === messageId) {
            const existing = (msg.reactions || []).find(r => r.emoji === emoji);
            let newReactions = [...(msg.reactions || [])];
            if (existing) {
              newReactions = newReactions.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r);
            } else {
              newReactions.push({ emoji, count: 1, users: ['usr_me'] });
            }
            return { ...msg, reactions: newReactions };
          }
          return msg;
        });
        return { ...chat, messages: updatedMsgs };
      }
      return chat;
    }));
  };

  const votePoll = (messageId, optionIndex) => {
    playSound('action');
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        const updatedMsgs = chat.messages.map(msg => {
          if (msg.id === messageId && msg.poll) {
            const currentTotal = msg.poll.totalVotes + 1;
            const updatedOptions = msg.poll.options.map((opt, idx) => {
              const newVotes = idx === optionIndex ? opt.votes + 1 : opt.votes;
              return {
                ...opt,
                votes: newVotes,
                percentage: Math.round((newVotes / currentTotal) * 100)
              };
            });
            return {
              ...msg,
              poll: {
                ...msg.poll,
                options: updatedOptions,
                totalVotes: currentTotal,
                userVotedOption: optionIndex
              }
            };
          }
          return msg;
        });
        return { ...chat, messages: updatedMsgs };
      }
      return chat;
    }));
    showToast('Vote submitted successfully! 🎉', 'success');
  };

  const deleteMessage = (messageId) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, messages: chat.messages.filter(m => m.id !== messageId) };
      }
      return chat;
    }));
    showToast('Message deleted', 'info');
  };

  return (
    <ChatContext.Provider value={{
      chats,
      activeChat,
      activeChatId,
      selectChat,
      filterType,
      setFilterType,
      sendMessage,
      addReaction,
      votePoll,
      deleteMessage,
      togglePinChat,
      toggleDisappearingMessages,
      isTypingAI
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
}
