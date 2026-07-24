/**
 * ChatSphere AI - Main Backend Server Entry Point
 * High-performance Node.js / Express server powering real-time WebSocket, WebRTC, & AI endpoints.
 */

import express from 'express';
import http from 'http';
import cors from 'cors';
import apiRouter from './routes/api.js';
import { ChatSphereWebSocketServer } from './websocket.js';
import { WebRTCCallRelay } from './webrtc.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON Parsing
app.use(cors({ origin: '*' }));
app.use(express.json());

// Mount API Routes
app.use('/api', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.send('<h1>ChatSphere AI – Enterprise Backend Server Running</h1><p>API Endpoint: <a href="/api/health">/api/health</a></p>');
});

// HTTP & WebSocket Server Setup
const server = http.createServer(app);
const wsServer = new ChatSphereWebSocketServer(server);
const rtcRelay = new WebRTCCallRelay();

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 ChatSphere AI Enterprise Backend Active`);
  console.log(`🌐 HTTP Server: http://localhost:${PORT}`);
  console.log(`⚡ WebSocket Server: ws://localhost:${PORT}/ws`);
  console.log(`📹 WebRTC Relay: Operational`);
  console.log(`====================================================`);
});
