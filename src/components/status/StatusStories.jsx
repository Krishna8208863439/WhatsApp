import React, { useState } from 'react';
import { CircleDot, Plus, Sparkles, Send, X, Volume2, Image as ImageIcon } from 'lucide-react';
import { MOCK_STORIES } from '../../services/mockData';
import { useApp } from '../../context/AppContext';

export default function StatusStories() {
  const { showToast } = useApp();
  const [stories, setStories] = useState(MOCK_STORIES);
  const [activeStory, setActiveStory] = useState(MOCK_STORIES[0]);
  const [storyIndex, setStoryIndex] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [showAiMaker, setShowAiMaker] = useState(false);
  const [aiStatusPrompt, setAiStatusPrompt] = useState('');

  const currentItem = activeStory.items[storyIndex] || activeStory.items[0];

  const handleCreateAiStatus = () => {
    if (!aiStatusPrompt.trim()) return;
    const newStoryItem = {
      id: `st_${Date.now()}`,
      type: 'text',
      bgColor: 'from-cyan-900 via-indigo-900 to-purple-900',
      text: `✨ AI Generated Status:\n"${aiStatusPrompt}"`,
      timestamp: 'Just now'
    };

    setStories(prev => prev.map(s => s.isUser ? { ...s, items: [...s.items, newStoryItem] } : s));
    setShowAiMaker(false);
    setAiStatusPrompt('');
    showToast('AI Status posted! Will expire in 24 hours ⏳', 'success');
  };

  return (
    <div className="flex-1 bg-[#0b0f19] flex flex-col lg:flex-row h-full overflow-hidden z-10">
      {/* Stories Sidebar */}
      <div className="w-full lg:w-80 bg-[#0c111e] border-r border-gray-800/80 p-4 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-base text-gray-100 flex items-center gap-2">
            <CircleDot className="w-5 h-5 text-brand-400" /> Status Updates
          </h2>
          <button
            onClick={() => setShowAiMaker(true)}
            className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold shadow-glow-indigo flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Maker
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400">Recent Updates</h3>
          {stories.map(story => (
            <div
              key={story.id}
              onClick={() => { setActiveStory(story); setStoryIndex(0); }}
              className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                activeStory.id === story.id
                  ? 'bg-brand-600/20 border-brand-500 shadow-glow-indigo'
                  : 'bg-gray-900/60 border-gray-800 hover:bg-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={story.avatar} alt={story.userName} className="w-12 h-12 rounded-full object-cover border-2 border-brand-400 p-0.5" />
                  {story.isUser && (
                    <span className="absolute bottom-0 right-0 p-0.5 rounded-full bg-brand-600 text-white border border-darkBg">
                      <Plus className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-gray-100">{story.userName}</h4>
                  <p className="text-[11px] text-gray-400">{story.items[0]?.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Story Viewing Stage */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-sm h-[540px] rounded-3xl overflow-hidden relative border border-gray-800 shadow-2xl flex flex-col justify-between p-5 bg-gradient-to-br from-indigo-950 via-gray-900 to-purple-950">
          {/* Top Progress Segment */}
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden flex gap-1 z-20">
            {activeStory.items.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-full transition-all ${i === storyIndex ? 'bg-cyanGlow' : 'bg-gray-700'}`}
              />
            ))}
          </div>

          {/* User Header */}
          <div className="flex items-center gap-3 z-20 pt-2">
            <img src={activeStory.avatar} alt="user" className="w-9 h-9 rounded-full object-cover border border-white/40" />
            <div>
              <h4 className="font-bold text-xs text-white">{activeStory.userName}</h4>
              <p className="text-[10px] text-gray-300">{currentItem.timestamp}</p>
            </div>
          </div>

          {/* Story Body */}
          <div className="my-auto text-center z-20">
            {currentItem.type === 'image' ? (
              <img src={currentItem.url} alt="story" className="w-full h-72 object-cover rounded-2xl border border-white/20 mb-3 shadow-lg" />
            ) : null}
            <p className="font-extrabold text-base sm:text-lg text-white drop-shadow-md leading-relaxed">
              {currentItem.text}
            </p>
          </div>

          {/* Reply Input */}
          <div className="flex items-center gap-2 z-20">
            <input
              type="text"
              placeholder="Reply to story..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && replyText.trim()) {
                  showToast(`Replied to ${activeStory.userName}'s story`, 'success');
                  setReplyText('');
                }
              }}
              className="flex-1 px-4 py-2 text-xs rounded-full bg-black/60 border border-white/20 text-white placeholder-gray-400 outline-none backdrop-blur-md"
            />
            <button
              onClick={() => {
                if (replyText.trim()) {
                  showToast(`Replied to ${activeStory.userName}'s story`, 'success');
                  setReplyText('');
                }
              }}
              className="p-2 rounded-full bg-brand-600 text-white shadow-glow-indigo"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Status Generator Modal */}
      {showAiMaker && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-900 border border-brand-500/40 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="font-bold text-sm text-gray-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyanGlow" /> Generate AI Status Story
              </h3>
              <button onClick={() => setShowAiMaker(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Status Topic or Quote Prompt</label>
              <input
                type="text"
                placeholder="e.g. Inspiring quote about quantum encryption & future..."
                value={aiStatusPrompt}
                onChange={(e) => setAiStatusPrompt(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-gray-950 border border-gray-800 text-gray-100 outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
              <button onClick={() => setShowAiMaker(false)} className="px-4 py-2 text-xs font-semibold text-gray-400">
                Cancel
              </button>
              <button onClick={handleCreateAiStatus} className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-glow-indigo">
                Post AI Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
