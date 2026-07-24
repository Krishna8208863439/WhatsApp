/**
 * ChatSphere AI - Database Schema Definitions
 * Enterprise Schemas for PostgreSQL / MongoDB / Redis Cache Data Store
 */

export const POSTGRES_SCHEMAS = `
-- PostgreSQL DDL for Enterprise ChatSphere AI Platform

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    public_key TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_name VARCHAR(100) NOT NULL,
    device_os VARCHAR(50) NOT NULL,
    device_fingerprint TEXT UNIQUE NOT NULL,
    ratchet_identity_key TEXT NOT NULL,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('direct', 'group', 'community', 'channel')),
    title VARCHAR(150),
    icon_url TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_members (
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'moderator', 'member')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (chat_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('text', 'image', 'video', 'audio', 'document', 'location', 'poll', 'code', 'ai_response')),
    content TEXT,
    ciphertext TEXT,
    encryption_nonce TEXT,
    media_url TEXT,
    reply_to_message_id UUID REFERENCES messages(id),
    is_disappearing BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS communities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    icon_url TEXT,
    banner_url TEXT,
    owner_id UUID REFERENCES users(id),
    member_count INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) DEFAULT 'announcement' CHECK (type IN ('announcement', 'discussion', 'voice_hub')),
    subscriber_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS business_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    catalog_enabled BOOLEAN DEFAULT TRUE,
    ai_bot_active BOOLEAN DEFAULT TRUE,
    support_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS ai_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    agent_type VARCHAR(50) NOT NULL,
    prompt_tokens INT DEFAULT 0,
    completion_tokens INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

export const MONGODB_COLLECTION_MODELS = {
  users: {
    _id: "ObjectId",
    phoneNumber: "String (Indexed)",
    fullName: "String",
    avatarUrl: "String",
    e2eIdentityKey: "String",
    devices: [
      {
        deviceId: "String",
        os: "String",
        lastSync: "Date"
      }
    ],
    settings: {
      readReceipts: "Boolean",
      lastSeenPrivacy: "String",
      aiAutoTranslate: "Boolean"
    }
  },
  messages: {
    _id: "ObjectId",
    chatId: "ObjectId (Indexed)",
    senderId: "ObjectId",
    messageType: "String (text | audio | image | code | poll)",
    encryptedPayload: {
      ciphertext: "String",
      iv: "String",
      ephemeralPublicKey: "String"
    },
    reactions: [
      { userId: "ObjectId", emoji: "String" }
    ],
    aiSummary: "String",
    createdAt: "Date (TTL Indexed for disappearing messages)"
  },
  aiMeetingLogs: {
    _id: "ObjectId",
    callId: "String",
    title: "String",
    participants: ["String"],
    transcript: [
      { speaker: "String", timestamp: "String", text: "String" }
    ],
    actionItems: [
      { task: "String", assignee: "String", status: "String" }
    ],
    summary: "String"
  }
};
