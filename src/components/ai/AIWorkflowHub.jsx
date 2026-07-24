import React, { useState } from 'react';
import { Bot, Play, Cpu, CheckCircle, Zap, Shield, RefreshCw, Layers, ArrowRight, Activity } from 'lucide-react';
import { runMultiAgentWorkflow } from '../../services/aiService';
import { backendApi } from '../../services/backendApi';
import { useApp } from '../../context/AppContext';

export default function AIWorkflowHub() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('workflows');
  const [executingId, setExecutingId] = useState(null);
  const [executionLogs, setExecutionLogs] = useState([
    { id: 'log_1', time: '11:20 AM', title: 'Auto-Summarize Meetings', agent: 'Meeting Transcriber', status: 'Success', result: 'Pushed note to #general channel' },
    { id: 'log_2', time: '10:45 AM', title: 'Security Scan & Signal Verification', agent: 'E2EE Sentinel', status: 'Success', result: 'Passed 0 vulnerabilities' }
  ]);

  const [workflows, setWorkflows] = useState([
    {
      id: 'wf_1',
      name: 'Meeting-to-Action Item Multi-Agent Pipeline',
      description: 'Listens to audio calls, generates transcripts, assigns tasks to team members, and updates Jira/Notion.',
      agents: ['Audio Listener', 'NLP Summarizer', 'Task Dispatcher'],
      trigger: 'Voice/Video Call End',
      status: 'Active',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'wf_2',
      name: 'Code Review & Automated Security Sandbox',
      description: 'Parses shared code snippets in chat, runs linting, checks double-ratchet keys, and returns performance benchmarks.',
      agents: ['Code Parser', 'Linter Agent', 'Security Auditor'],
      trigger: 'Code Snippet Post',
      status: 'Active',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'wf_3',
      name: 'Multilingual Customer Support Relay',
      description: 'Auto-detects foreign languages in incoming business messages, translates into 100+ languages, and drafts responses.',
      agents: ['Language Detector', 'Neural Translator', 'Tone Adjuster'],
      trigger: 'Business Chat Received',
      status: 'Active',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'wf_4',
      name: 'AI Smart Voice Cloning Assistant',
      description: 'Synthesizes personalized voice notes for outgoing broadcasts when authenticated via biometrics/passkeys.',
      agents: ['Consent Auditor', 'Voice Synthesizer', 'Audio Normalizer'],
      trigger: 'Voice Broadcast Request',
      status: 'Paused',
      color: 'from-amber-600 to-orange-600'
    }
  ]);

  const handleRunWorkflow = async (wf) => {
    setExecutingId(wf.id);
    showToast(`Executing multi-agent workflow: ${wf.name}...`, 'info');

    try {
      const res = await backendApi.triggerWorkflow(wf.id);
      const executionResult = await runMultiAgentWorkflow(wf.id);

      const newLog = {
        id: 'log_' + Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: wf.name,
        agent: wf.agents.join(' ➔ '),
        status: 'Success',
        result: executionResult.stepsExecuted ? executionResult.stepsExecuted.map(s => `${s.agent}: ${s.details}`).join(' | ') : 'Executed successfully'
      };

      setExecutionLogs(prev => [newLog, ...prev]);
      showToast(`Multi-Agent Pipeline "${wf.name}" completed in ${executionResult.executionTimeMs || 180}ms`, 'success');
    } catch (err) {
      showToast('Execution error: ' + err.message, 'error');
    } finally {
      setExecutingId(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0b0f19] text-gray-100 overflow-y-auto z-10 p-6 space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 shadow-glow-indigo text-white">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-100 tracking-tight flex items-center gap-2">
              Multi-Agent Productivity & Workflow Automation Hub
            </h2>
            <p className="text-xs text-gray-400">
              Autonomous AI Agent Networks • Event-Driven Pipelines • Zero-Trust Execution
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveTab('workflows')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'workflows' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Active Workflows ({workflows.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'logs' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Execution Logs ({executionLogs.length})
          </button>
        </div>
      </div>

      {activeTab === 'workflows' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workflows.map(wf => (
            <div
              key={wf.id}
              className="p-5 rounded-2xl bg-gray-900/90 border border-gray-800/80 hover:border-brand-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 h-1 w-full bg-gradient-to-r ${wf.color}`} />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-gray-800 text-[11px] font-semibold text-brand-300 border border-gray-700 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-amber-400" /> Trigger: {wf.trigger}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${wf.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gray-800 text-gray-400'}`}>
                    {wf.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-gray-100 group-hover:text-brand-300 transition">
                  {wf.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {wf.description}
                </p>
              </div>

              {/* Agent Chain Pipeline */}
              <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800/60 space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Agent Chain Sequence
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {wf.agents.map((agent, idx) => (
                    <React.Fragment key={idx}>
                      <span className="px-2 py-1 rounded-md bg-gray-900 border border-gray-800 text-[11px] font-medium text-gray-300 flex items-center gap-1">
                        <Bot className="w-3 h-3 text-indigo-400" /> {agent}
                      </span>
                      {idx < wf.agents.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-gray-600" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-800/80">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Enterprise E2E Verified
                </span>
                <button
                  onClick={() => handleRunWorkflow(wf)}
                  disabled={executingId === wf.id}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-glow-indigo transition"
                >
                  {executingId === wf.id ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Executing Agents...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> Run Pipeline
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-3 max-w-4xl">
          {executionLogs.map(log => (
            <div key={log.id} className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center justify-between shadow-md">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-gray-200">{log.title}</h4>
                    <span className="text-[10px] text-gray-400">{log.time}</span>
                  </div>
                  <p className="text-[11px] text-indigo-300 mt-0.5">Agents: {log.agent}</p>
                  <p className="text-xs text-gray-400 mt-1 font-mono bg-gray-950 p-2 rounded-lg border border-gray-800">
                    {log.result}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
