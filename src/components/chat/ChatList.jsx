import React from 'react';
import { Pin, Bot, ShoppingBag, CheckCheck, Clock, Sparkles } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useApp } from '../../context/AppContext';

export default function ChatList() {
  const { chats, activeChatId, selectChat, filterType, setFilterType, togglePinChat } = useChat();
  const { searchQuery } = useApp();

  const filterChips = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'groups', label: 'Groups' },
    { id: 'ai', label: 'AI Bots' },
    { id: 'business', label: 'Business' }
  ];

  const filteredChats = chats.filter(chat => {
    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return chat.name.toLowerCase().includes(q) || chat.lastMessage.toLowerCase().includes(q);
    }
    // Filter chip selector
    if (filterType === 'unread') return chat.unreadCount > 0;
    if (filterType === 'groups') return chat.type === 'group';
    if (filterType === 'ai') return chat.type === 'ai' || chat.badge?.includes('AI');
    if (filterType === 'business') return chat.type === 'business' || chat.badge?.includes('BIZ');
    return true;
  });

  // Sort pinned first
  const sortedChats = [...filteredChats].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="w-80 lg:w-96 bg-[#0c111e] border-r border-gray-800/80 flex flex-col h-full z-10">
      {/* Category Filter Chips */}
      <div className="p-3 border-b border-gray-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {filterChips.map(chip => (
          <button
            key={chip.id}
            onClick={() => setFilterType(chip.id)}
            className={`px-3 py-1 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              filterType === chip.id
                ? 'bg-brand-600 text-white shadow-glow-indigo'
                : 'bg-gray-900/60 text-gray-400 hover:text-gray-200 border border-gray-800'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Chat Conversation Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-900/50">
        {sortedChats.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-xs">
            No conversation matches filter
          </div>
        ) : (
          sortedChats.map(chat => {
            const isSelected = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all duration-150 group relative ${
                  isSelected
                    ? 'bg-brand-600/15 border-l-4 border-brand-500'
                    : 'hover:bg-gray-900/40'
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-700/60 shadow-sm"
                  />
                  {chat.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-darkBg rounded-full"></span>
                  )}
                  {chat.type === 'ai' && (
                    <span className="absolute -top-1 -right-1 p-0.5 rounded-full bg-brand-600 text-white shadow-sm">
                      <Sparkles className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <h3 className={`font-bold text-xs lg:text-sm truncate ${isSelected ? 'text-brand-300' : 'text-gray-200'}`}>
                        {chat.name}
                      </h3>
                      {chat.badge && (
                        <span className="px-1 py-0.2 text-[9px] font-extrabold rounded bg-brand-900/80 text-brand-300 border border-brand-700/50">
                          {chat.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium ml-2 flex-shrink-0">{chat.lastTimestamp}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <p className="truncate text-[12px] text-gray-400 group-hover:text-gray-300 leading-snug">
                      {chat.lastMessage}
                    </p>
                    
                    <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                      {chat.disappearingDays > 0 && (
                        <Clock className="w-3 h-3 text-amber-400" title={`Disappearing in ${chat.disappearingDays} days`} />
                      )}

                      {chat.pinned && (
                        <button
                          onClick={(e) => { e.stopPropagation(); togglePinChat(chat.id); }}
                          className="text-brand-400 hover:text-brand-300"
                        >
                          <Pin className="w-3 h-3 fill-brand-400" />
                        </button>
                      )}

                      {chat.unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-brand-600 text-white shadow-glow-indigo">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
