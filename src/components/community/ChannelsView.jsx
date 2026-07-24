import React, { useState } from 'react';
import { Radio, CheckCircle, Heart, MessageCircle, Share2, Sparkles, Send } from 'lucide-react';
import { MOCK_CHANNELS } from '../../services/mockData';
import { useApp } from '../../context/AppContext';

export default function ChannelsView() {
  const { showToast } = useApp();
  const [channels, setChannels] = useState(MOCK_CHANNELS);
  const [selectedChan, setSelectedChan] = useState(MOCK_CHANNELS[0]);

  const handleReact = (postId, emoji) => {
    showToast(`Added reaction ${emoji} to broadcast post`, 'success');
  };

  return (
    <div className="flex-1 bg-[#0b0f19] flex flex-col lg:flex-row h-full overflow-hidden z-10">
      {/* Channels Sidebar */}
      <div className="w-full lg:w-80 bg-[#0c111e] border-r border-gray-800/80 p-4 space-y-4 overflow-y-auto">
        <h2 className="font-extrabold text-base text-gray-100 flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyanGlow" /> Broadcast Channels
        </h2>

        <div className="space-y-2">
          {channels.map(chan => (
            <div
              key={chan.id}
              onClick={() => setSelectedChan(chan)}
              className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                selectedChan.id === chan.id
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-glow-cyan'
                  : 'bg-gray-900/60 border-gray-800 hover:bg-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={chan.avatar} alt={chan.name} className="w-11 h-11 rounded-full object-cover border border-gray-700" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-xs text-gray-100 truncate">{chan.name}</h3>
                    {chan.verified && <CheckCircle className="w-3.5 h-3.5 text-cyanGlow flex-shrink-0" />}
                  </div>
                  <p className="text-[11px] text-gray-400">{chan.subscribers} Subscribers</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast Feed */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <img src={selectedChan.avatar} alt={selectedChan.name} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500" />
            <div>
              <h2 className="font-extrabold text-lg text-gray-100 flex items-center gap-1.5">
                {selectedChan.name} <CheckCircle className="w-4 h-4 text-cyanGlow" />
              </h2>
              <p className="text-xs text-gray-400">{selectedChan.description}</p>
            </div>
          </div>
          <button
            onClick={() => showToast('Subscribed to Broadcast Channel! 🔔', 'success')}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-glow-cyan"
          >
            Subscribe 🔔
          </button>
        </div>

        {/* Posts Loop */}
        <div className="space-y-6">
          {selectedChan.posts.map(post => (
            <div key={post.id} className="p-5 rounded-3xl bg-gray-900/90 border border-gray-800 space-y-4 shadow-xl">
              <h3 className="font-bold text-base text-gray-100">{post.title}</h3>
              <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">{post.content}</p>

              {post.media && (
                <img src={post.media} alt="post media" className="w-full max-h-80 object-cover rounded-2xl border border-gray-800" />
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-xs">
                <div className="flex items-center gap-2">
                  {Object.entries(post.reactions).map(([emoji, count]) => (
                    <button
                      key={emoji}
                      onClick={() => handleReact(post.id, emoji)}
                      className="px-2.5 py-1 rounded-full bg-gray-950 border border-gray-800 hover:border-cyan-500 text-gray-200 text-xs font-semibold flex items-center gap-1"
                    >
                      <span>{emoji}</span> <span>{count}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-gray-400 text-xs font-medium">
                  <span>{post.commentsCount} Comments</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
