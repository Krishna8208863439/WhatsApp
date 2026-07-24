/**
 * ChatSphere AI - WebRTC HD Audio/Video Call Signaling Relay
 * Handles room creation, session negotiation, peer handshake, and live interpretation audio feeds.
 */

export class WebRTCCallRelay {
  constructor() {
    this.rooms = new Map(); // roomId -> { peers: Map<userId, peerInfo>, callType: 'audio' | 'video' }
  }

  createOrJoinRoom(roomId, userId, peerInfo) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        id: roomId,
        createdAt: new Date(),
        peers: new Map(),
        callType: peerInfo.callType || 'video',
        isRecording: false,
        liveInterpretationLang: peerInfo.interpretationLang || null
      });
    }

    const room = this.rooms.get(roomId);
    room.peers.set(userId, {
      userId,
      muted: false,
      videoOff: false,
      joinedAt: new Date(),
      ...peerInfo
    });

    return room;
  }

  leaveRoom(roomId, userId) {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      room.peers.delete(userId);
      if (room.peers.size === 0) {
        this.rooms.delete(roomId);
      }
      return true;
    }
    return false;
  }

  handleSignal(roomId, senderId, targetId, payload) {
    const room = this.rooms.get(roomId);
    if (!room) return { error: 'Room not found' };

    return {
      success: true,
      roomId,
      senderId,
      targetId,
      payload
    };
  }

  getRoomSummary(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    return {
      roomId: room.id,
      callType: room.callType,
      participantCount: room.peers.size,
      participants: Array.from(room.peers.values()),
      isRecording: room.isRecording,
      liveInterpretationLang: room.liveInterpretationLang
    };
  }
}
