import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, MessageSquare, Bot, Activity, 
  ShieldAlert, CheckCircle, Ban, RefreshCw, FileText, Download
} from 'lucide-react';
import { MOCK_ADMIN_METRICS, MOCK_MODERATION_QUEUE } from '../../services/mockData';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { showToast } = useApp();
  const [metrics] = useState(MOCK_ADMIN_METRICS);
  const [modQueue, setModQueue] = useState(MOCK_MODERATION_QUEUE);

  const handleModerationAction = (id, action) => {
    setModQueue(prev => prev.filter(item => item.id !== id));
    showToast(`Moderation action '${action}' executed for item`, 'info');
  };

  return (
    <div className="flex-1 bg-[#0b0f19] flex flex-col h-full overflow-hidden p-6 z-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-600 to-indigo-600 shadow-glow-indigo">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-gray-100 flex items-center gap-2">
              System Admin & AI Security Oversight
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                SYSTEM HEALTH 100%
              </span>
            </h2>
            <p className="text-xs text-gray-400">Global Cluster Latency, WebRTC Relay Health & AI Content Moderation</p>
          </div>
        </div>

        <button
          onClick={() => showToast('Exported Security Audit Logs (JSON)', 'success')}
          className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 text-xs font-bold flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export Audit Logs
        </button>
      </div>

      {/* Metrics Counter Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Users Online', value: metrics.activeUsersOnline, sub: 'Global Multi-Region', icon: Users, color: 'text-brand-400' },
          { label: 'Messages Today', value: metrics.totalMessagesToday, sub: 'WebSocket Mesh', icon: MessageSquare, color: 'text-cyanGlow' },
          { label: 'AI Tokens Processed', value: metrics.aiTokensProcessed, sub: 'Sphere-4o Engine', icon: Bot, color: 'text-purple-400' },
          { label: 'Avg Peer Latency', value: `${metrics.avgLatencyMs} ms`, sub: 'WebRTC Relay', icon: Activity, color: 'text-emerald-400' }
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{card.label}</span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="font-black text-xl text-gray-100">{card.value}</div>
              <div className="text-[10px] text-gray-500 font-medium">{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Content Moderation Queue & Network Throughput */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2">
        {/* Moderation Queue */}
        <div className="p-5 rounded-3xl bg-gray-900/90 border border-gray-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" /> AI Content Moderation Queue ({modQueue.length})
            </h3>
            <span className="text-[10px] text-gray-500 font-mono">Auto Spam / Phishing Engine</span>
          </div>

          {modQueue.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500">
              No flagged items in moderation queue. System safe!
            </div>
          ) : (
            <div className="space-y-3">
              {modQueue.map(item => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-gray-950 border border-rose-950/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-300">{item.type} • {item.sender}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-950 text-rose-300 border border-rose-800">
                      {item.confidence}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono bg-black/50 p-2 rounded-lg border border-gray-900">{item.content}</p>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleModerationAction(item.id, 'Approve')}
                      className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleModerationAction(item.id, 'Block Account')}
                      className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                    >
                      Block User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Network Throughput Simulated Visualizer */}
        <div className="p-5 rounded-3xl bg-gray-900/90 border border-gray-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-gray-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyanGlow" /> Real-Time Traffic & Token Consumption
            </h3>
            <p className="text-xs text-gray-400">Live throughput per second across WebSocket relays</p>
          </div>

          <div className="flex items-end gap-1.5 h-44 p-4 rounded-2xl bg-gray-950 border border-gray-800 justify-between">
            {[45, 60, 75, 50, 90, 80, 95, 65, 85, 100, 70, 90, 80, 60, 88, 92, 78, 85].map((val, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-brand-600 to-cyanGlow rounded-t transition-all duration-300 hover:brightness-125"
                style={{ height: `${val}%` }}
                title={`Throughput: ${val * 120} req/sec`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2">
            <span>Peak: 12,000 req/sec</span>
            <span>WebSocket Connections: 1,428,910</span>
          </div>
        </div>
      </div>
    </div>
  );
}
