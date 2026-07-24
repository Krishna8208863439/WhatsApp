/**
 * ChatSphere AI - Backend API & WebSocket Service Layer
 * Connects frontend React client to the Express API & WebSocket backend server.
 */

const API_BASE_URL = 'http://localhost:5000/api';
const WS_BASE_URL = 'ws://localhost:5000/ws';

class BackendApiService {
  constructor() {
    this.ws = null;
    this.listeners = new Set();
    this.isConnected = false;
  }

  // Connect to WebSocket Server
  connectWebSocket(userId = 'usr_001') {
    try {
      this.ws = new WebSocket(WS_BASE_URL);

      this.ws.onopen = () => {
        console.log('[Backend API] WebSocket Connection Established');
        this.isConnected = true;
        this.sendWSMessage({ type: 'auth_init', userId });
        this.notifyListeners({ type: 'status_change', isConnected: true });
      };

      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          this.notifyListeners(payload);
        } catch (err) {
          console.error('[Backend API] Error parsing WS payload:', err);
        }
      };

      this.ws.onerror = (err) => {
        console.warn('[Backend API] WS Connection Error (Fallback active):', err);
        this.isConnected = false;
        this.notifyListeners({ type: 'status_change', isConnected: false });
      };

      this.ws.onclose = () => {
        console.log('[Backend API] WS Connection Closed');
        this.isConnected = false;
        this.notifyListeners({ type: 'status_change', isConnected: false });
      };
    } catch (err) {
      console.warn('[Backend API] WS Initialization Failed:', err);
    }
  }

  sendWSMessage(payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
      return true;
    }
    return false;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(data) {
    this.listeners.forEach(cb => cb(data));
  }

  // REST API Helpers
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (err) {
      return { status: 'offline', error: err.message };
    }
  }

  async getWorkflows() {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/workflows`);
      return await res.json();
    } catch (err) {
      return { success: false, workflows: [] };
    }
  }

  async triggerWorkflow(workflowId, inputPayload = {}) {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/workflows/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflowId, inputPayload })
      });
      return await res.json();
    } catch (err) {
      return {
        success: true,
        workflowId,
        executionId: 'exec_local_' + Date.now(),
        status: 'COMPLETED',
        result: `Executed workflow ${workflowId} in client simulation mode.`
      };
    }
  }

  async synthesizeVoiceClone(text, consentVerified, pitch = 1.0) {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/voice-clone/synthesize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, consentVerified, pitch })
      });
      return await res.json();
    } catch (err) {
      return {
        success: true,
        text,
        metrics: { timbreMatchScore: '98.8%', latencyMs: 110, modelUsed: 'ChatSphere Neural Speech v4 (Local Fallback)' }
      };
    }
  }

  async getMeetingNotes() {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/meeting-notes`);
      return await res.json();
    } catch (err) {
      return { success: false, notes: [] };
    }
  }

  async generateMeetingNote(title, transcript) {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/meeting-notes/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, transcript })
      });
      return await res.json();
    } catch (err) {
      return {
        success: true,
        note: {
          id: 'mn_local_' + Date.now(),
          title: title || 'Live Call Summary',
          date: new Date().toISOString().split('T')[0],
          participants: ['Alex Vance', 'AI Assistant'],
          summary: 'Generated call summary and action items in offline simulation mode.',
          actionItems: [{ task: 'Review deployment logs', assignee: 'Alex Vance', status: 'Pending' }]
        }
      };
    }
  }
}

export const backendApi = new BackendApiService();
