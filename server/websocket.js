/**
 * ChatSphere AI - WebSocket Real-Time Communication Engine
 * Manages client connections, presence tracking, live messaging & signaling.
 */

import { WebSocketServer } from 'ws';

export class ChatSphereWebSocketServer {
  constructor(server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });
    this.clients = new Map(); // userId -> WebSocket connection
    this.rooms = new Map();   // roomId -> Set of userIds

    this.init();
  }

  init() {
    this.wss.on('connection', (ws, req) => {
      let currentUserId = null;

      ws.on('message', (messageRaw) => {
        try {
          const payload = JSON.parse(messageRaw.toString());
          this.handleClientMessage(ws, payload, (userId) => {
            currentUserId = userId;
          });
        } catch (err) {
          console.error('[WebSocket Error] Invalid JSON payload:', err.message);
        }
      });

      ws.on('close', () => {
        if (currentUserId) {
          this.clients.delete(currentUserId);
          this.broadcastPresence(currentUserId, 'offline');
          console.log(`[WebSocket] Client disconnected: ${currentUserId}`);
        }
      });
    });

    console.log('[WebSocket Server] Initialized on /ws endpoint');
  }

  handleClientMessage(ws, payload, setUserId) {
    const { type, userId, chatId, data } = payload;

    switch (type) {
      case 'auth_init':
        setUserId(userId);
        this.clients.set(userId, ws);
        this.broadcastPresence(userId, 'online');
        ws.send(JSON.stringify({ type: 'auth_ack', status: 'connected', serverTime: new Date().toISOString() }));
        break;

      case 'chat_message':
        this.relayChatMessage(chatId, userId, data);
        break;

      case 'typing_indicator':
        this.relayTyping(chatId, userId, data.isTyping);
        break;

      case 'webrtc_signal':
        this.relayWebRTCSignal(data.targetUserId, userId, data.signal);
        break;

      case 'ping':
        ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
        break;

      default:
        console.log(`[WebSocket] Unhandled payload type: ${type}`);
    }
  }

  relayChatMessage(chatId, senderId, messageData) {
    const responsePayload = JSON.stringify({
      type: 'new_message',
      chatId,
      senderId,
      message: {
        id: 'msg_' + Date.now(),
        sender: senderId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
        ...messageData
      }
    });

    // Broadcast to all connected clients in workspace / chat
    for (const [userId, client] of this.clients.entries()) {
      if (client.readyState === 1) {
        client.send(responsePayload);
      }
    }
  }

  relayTyping(chatId, senderId, isTyping) {
    const payload = JSON.stringify({
      type: 'user_typing',
      chatId,
      senderId,
      isTyping
    });

    for (const [userId, client] of this.clients.entries()) {
      if (userId !== senderId && client.readyState === 1) {
        client.send(payload);
      }
    }
  }

  relayWebRTCSignal(targetUserId, senderId, signal) {
    const targetWs = this.clients.get(targetUserId);
    if (targetWs && targetWs.readyState === 1) {
      targetWs.send(JSON.stringify({
        type: 'webrtc_signal',
        senderId,
        signal
      }));
    }
  }

  broadcastPresence(userId, status) {
    const payload = JSON.stringify({
      type: 'presence_update',
      userId,
      status,
      timestamp: new Date().toISOString()
    });

    for (const [id, client] of this.clients.entries()) {
      if (id !== userId && client.readyState === 1) {
        client.send(payload);
      }
    }
  }
}
