import React, { useState } from 'react';
import { ShoppingBag, Star, CheckCircle, Sparkles, Send, Plus, Store, Bot, Megaphone } from 'lucide-react';
import { MOCK_BUSINESS_PRODUCTS } from '../../services/mockData';
import { useApp } from '../../context/AppContext';

export default function BusinessHub() {
  const { showToast } = useApp();
  const [products] = useState(MOCK_BUSINESS_PRODUCTS);
  const [activeSubTab, setActiveSubTab] = useState('catalog'); // 'catalog' | 'campaigns' | 'bot'

  return (
    <div className="flex-1 bg-[#0b0f19] flex flex-col h-full overflow-hidden p-6 z-10 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 shadow-glow-cyan">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-gray-100 flex items-center gap-2">
              Nexus Business Hub
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Verified Enterprise Account
              </span>
            </h2>
            <p className="text-xs text-gray-400">In-Chat Store Catalogs, Broadcast Campaigns & Automated Support</p>
          </div>
        </div>

        <div className="flex p-1 rounded-xl bg-gray-900 border border-gray-800">
          {[
            { id: 'catalog', label: 'Store Catalog' },
            { id: 'campaigns', label: 'Broadcast Campaigns' },
            { id: 'bot', label: 'Support AI Bot' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeSubTab === t.id
                  ? 'bg-cyan-600 text-white shadow-glow-cyan'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pr-2">
        {activeSubTab === 'catalog' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-200">Hardware & Enterprise Compute Catalog</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(prod => (
                <div key={prod.id} className="p-4 rounded-3xl bg-gray-900/90 border border-gray-800 flex flex-col justify-between space-y-3 shadow-xl">
                  <img src={prod.image} alt={prod.name} className="w-full h-44 object-cover rounded-2xl border border-gray-800" />
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-gray-100">{prod.name}</h4>
                      <span className="font-extrabold text-sm text-cyanGlow">{prod.price}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{prod.description}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mb-3">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {prod.rating} / 5.0 • In Stock
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
                    <button
                      onClick={() => showToast(`Inquiry for ${prod.name} sent to Nexus Support`, 'success')}
                      className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-4 h-4" /> Send Chat Inquiry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'campaigns' && (
          <div className="p-6 rounded-3xl bg-gray-900/90 border border-gray-800 space-y-4 max-w-2xl mx-auto">
            <h3 className="font-bold text-sm text-gray-200 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-cyanGlow" /> Launch Broadcast Marketing Campaign
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Campaign Audience Segment</label>
                <select className="w-full p-2.5 text-xs rounded-xl bg-gray-950 border border-gray-800 text-gray-200 outline-none">
                  <option>All Enterprise Leads (14,200 recipients)</option>
                  <option>Active Cloud Infrastructure Admins (4,800 recipients)</option>
                  <option>VIP Accounts (820 recipients)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Broadcast Message</label>
                <textarea
                  rows={4}
                  placeholder="Draft your promotional broadcast message..."
                  defaultValue="🚀 Exclusive Announcement: Nexus Quantum AI Clusters now feature sub-5ms inter-region latency. Reply INFO to claim trial access."
                  className="w-full p-3 text-xs rounded-xl bg-gray-950 border border-gray-800 text-gray-100 outline-none leading-relaxed"
                />
              </div>
              <button
                onClick={() => showToast('Broadcast campaign queued for delivery! 🚀', 'success')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs shadow-glow-cyan"
              >
                Send Broadcast to 14,200 Leads
              </button>
            </div>
          </div>
        )}

        {activeSubTab === 'bot' && (
          <div className="p-6 rounded-3xl bg-gray-900/90 border border-gray-800 space-y-4 max-w-2xl mx-auto">
            <h3 className="font-bold text-sm text-gray-200 flex items-center gap-2">
              <Bot className="w-4 h-4 text-brand-400" /> Automated Customer Support Bot Configuration
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-200">Auto Welcome Greeting</h4>
                  <p className="text-[11px] text-gray-400">Triggered on first incoming message</p>
                </div>
                <span className="px-2 py-0.5 font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Active</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-200">Catalog Inquiry & Pricing Bot</h4>
                  <p className="text-[11px] text-gray-400">Answers hardware specs & pricing automatically</p>
                </div>
                <span className="px-2 py-0.5 font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
