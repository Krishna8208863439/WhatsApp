// Comprehensive Mock Data for ChatSphere AI Platform

export const CURRENT_USER = {
  id: 'usr_me',
  name: 'Elena Rostova',
  handle: '@elena_tech',
  email: 'elena.rostova@nexus-corp.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  status: 'Building the future of enterprise AI messaging 🚀',
  isOnline: true,
  lastSeen: 'Just now',
  phone: '+1 (555) 382-9012',
  role: 'Administrator & Enterprise Lead',
  securityKeys: {
    identityKey: '3f8a91b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
    fingerprint: '8492-1029-4729-1830-5920-1049-3829-5710',
    ratchetStep: 142,
    encryptedBackup: true,
    lastBackup: '2026-07-23 10:45 AM'
  },
  devices: [
    { id: 'dev_1', name: 'MacBook Pro 16" (M3 Max)', type: 'desktop', os: 'macOS Sonoma', ip: '192.168.1.104', active: true, lastActive: 'Active Now' },
    { id: 'dev_2', name: 'iPhone 15 Pro Max', type: 'mobile', os: 'iOS 17.5', ip: '10.0.4.12', active: true, lastActive: '2 mins ago' },
    { id: 'dev_3', name: 'Chrome Browser (Windows 11)', type: 'web', os: 'Windows 11 Enterprise', ip: '192.168.1.88', active: true, lastActive: 'Active Now' }
  ]
};

export const MOCK_CONTACTS = [
  {
    id: 'c_ai_sphere',
    name: 'SphereAI Assistant',
    handle: '@sphere_ai',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80',
    isAI: true,
    badge: 'AI CORE',
    status: 'Always online • Powered by Sphere-GPT-4o',
    isVerified: true
  },
  {
    id: 'c_multi_agent',
    name: 'Multi-Agent Suite',
    handle: '@multi_agent',
    avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=250&q=80',
    isAI: true,
    badge: 'MULTI-AGENT',
    status: 'Research • Code • Translate • Synthesize',
    isVerified: true
  },
  {
    id: 'c_marcus',
    name: 'Marcus Vance',
    handle: '@marcus_v',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    status: 'Lead Cloud Architect @ Nexus',
    isOnline: true,
    lastSeen: 'Online',
    phone: '+1 (555) 782-1920'
  },
  {
    id: 'c_sophia',
    name: 'Dr. Sophia Chen',
    handle: '@sophia_chen',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    status: 'Head of Quantum & NLP Research',
    isOnline: true,
    lastSeen: 'Online',
    phone: '+1 (555) 901-4412'
  },
  {
    id: 'c_nexus_biz',
    name: 'Nexus Cloud Solutions',
    handle: '@nexus_solutions',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=250&q=80',
    isBusiness: true,
    badge: 'VERIFIED BIZ',
    status: 'Enterprise Cloud & AI Hardware Catalog',
    isVerified: true
  },
  {
    id: 'c_alex',
    name: 'Alex Rivera',
    handle: '@alex_r',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    status: 'DevOps & Kubernetes Lead',
    isOnline: false,
    lastSeen: '15m ago',
    phone: '+1 (555) 443-8821'
  }
];

export const MOCK_CHATS = [
  {
    id: 'chat_marcus',
    type: 'direct',
    contactId: 'c_marcus',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    isOnline: true,
    unreadCount: 2,
    pinned: true,
    disappearingDays: 7,
    lastMessage: 'I reviewed the WebRTC multi-peer mesh latency logs. Looks rock solid under 40ms!',
    lastTimestamp: '10:42 AM',
    messages: [
      {
        id: 'msg_m1',
        senderId: 'c_marcus',
        senderName: 'Marcus Vance',
        text: 'Hey Elena! Did you test the end-to-end Signal protocol key ratchet for the new desktop release?',
        timestamp: '10:30 AM',
        status: 'read',
        reactions: [{ emoji: '👍', count: 2, users: ['usr_me', 'c_marcus'] }]
      },
      {
        id: 'msg_m2',
        senderId: 'usr_me',
        senderName: 'Elena Rostova',
        text: 'Yes! The double ratchet session resets seamlessly across Web and Mobile sync. Check out this snippet from our cryptographic audit:',
        timestamp: '10:32 AM',
        status: 'read',
        codeSnippet: {
          language: 'typescript',
          code: `async function rotateSessionRatchet(sessionKey: Uint8Array): Promise<SessionState> {\n  const nextHeader = await crypto.subtle.deriveKey(\n    { name: "HKDF", hash: "SHA-256", salt: sessionKey, info: new TextEncoder().encode("Signal-Ratchet-v2") },\n    masterKey,\n    { name: "AES-GCM", length: 256 },\n    true,\n    ["encrypt", "decrypt"]\n  );\n  return { key: nextHeader, step: sessionKey.length };\n}`
        }
      },
      {
        id: 'msg_m3',
        senderId: 'c_marcus',
        senderName: 'Marcus Vance',
        type: 'voice',
        audioUrl: 'mock_audio.mp3',
        audioDuration: '0:24',
        transcription: 'Awesome work. I also checked the cluster auto-scaler in US-East. Everything is ready for peak load.',
        aiSummary: 'Confirmed infrastructure readiness in US-East cluster.',
        timestamp: '10:35 AM',
        status: 'read',
        reactions: [{ emoji: '🔥', count: 1, users: ['usr_me'] }]
      },
      {
        id: 'msg_m4',
        senderId: 'usr_me',
        senderName: 'Elena Rostova',
        type: 'poll',
        poll: {
          id: 'poll_1',
          question: 'Which AI Model latency target should we set for default smart replies?',
          options: [
            { text: 'Sub-50ms (Quantized Sphere-Lite)', votes: 4, percentage: 57 },
            { text: 'Sub-150ms (Full Sphere-4o Full)', votes: 2, percentage: 29 },
            { text: 'Dynamic adaptive switching', votes: 1, percentage: 14 }
          ],
          totalVotes: 7,
          userVotedOption: 0
        },
        timestamp: '10:38 AM',
        status: 'read'
      },
      {
        id: 'msg_m5',
        senderId: 'c_marcus',
        senderName: 'Marcus Vance',
        text: 'I reviewed the WebRTC multi-peer mesh latency logs. Looks rock solid under 40ms!',
        timestamp: '10:42 AM',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'chat_ai_sphere',
    type: 'ai',
    contactId: 'c_ai_sphere',
    name: 'SphereAI Assistant',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80',
    isOnline: true,
    unreadCount: 0,
    pinned: true,
    badge: 'AI CORE',
    lastMessage: 'I have summarized your 3 team calls today and generated 5 action items.',
    lastTimestamp: '09:15 AM',
    messages: [
      {
        id: 'msg_ai1',
        senderId: 'c_ai_sphere',
        senderName: 'SphereAI Assistant',
        text: 'Hello Elena! I am your SphereAI Assistant. How can I assist your workflow today?\n\n- Summarize long chat threads\n- Draft formal or business replies\n- Analyze uploaded documents & images\n- Extract OCR text & translate in real-time',
        timestamp: '09:00 AM',
        status: 'read'
      },
      {
        id: 'msg_ai2',
        senderId: 'usr_me',
        senderName: 'Elena Rostova',
        text: 'Can you generate an executive summary of our Q3 Enterprise AI Infrastructure Deployment?',
        timestamp: '09:10 AM',
        status: 'read'
      },
      {
        id: 'msg_ai3',
        senderId: 'c_ai_sphere',
        senderName: 'SphereAI Assistant',
        text: '### 📊 Q3 Executive Summary: Enterprise AI Infrastructure\n\n1. **Zero-Trust E2E Encryption**: Completed Signal Double-Ratchet deployment across 1.2M active user nodes.\n2. **Voice & Video Latency**: Reduced global WebRTC TURN relay latency by **38%** with edge nodes in Tokyo, Frankfurt, and Virginia.\n3. **Multi-Agent Orchestration**: Integrated real-time consensus engine for parallel AI agents.\n4. **Compliance & Safety**: Passed SOC2 Type II and ISO 27001 audit zero-findings.',
        timestamp: '09:15 AM',
        status: 'read',
        reactions: [{ emoji: '🤖', count: 1, users: ['usr_me'] }]
      }
    ]
  },
  {
    id: 'chat_multi_agent',
    type: 'ai',
    contactId: 'c_multi_agent',
    name: 'Multi-Agent Productivity Suite',
    avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=250&q=80',
    isOnline: true,
    unreadCount: 0,
    pinned: false,
    badge: 'MULTI-AGENT',
    lastMessage: '[Research Agent & Code Auditor] Verification complete with 0 critical security issues.',
    lastTimestamp: 'Yesterday',
    messages: [
      {
        id: 'msg_ma1',
        senderId: 'c_multi_agent',
        senderName: 'Multi-Agent Suite',
        text: '⚡ Multi-Agent System Initialized: **Research Agent**, **Code Auditor**, **Translator**, and **Business Lead** are ready to collaborate.',
        timestamp: 'Yesterday',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat_group_engineering',
    type: 'group',
    name: '⚡ Core Engineering & AI Infra',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=250&q=80',
    membersCount: 48,
    unreadCount: 5,
    pinned: false,
    lastMessage: 'Dr. Sophia Chen uploaded the new benchmark report for voice transcription.',
    lastTimestamp: '08:45 AM',
    messages: [
      {
        id: 'msg_g1',
        senderId: 'c_sophia',
        senderName: 'Dr. Sophia Chen',
        text: 'Team, here is the benchmark report comparing Whisper-v3 vs ChatSphere Speech-AI on noisy background calls:',
        timestamp: '08:40 AM',
        status: 'read'
      },
      {
        id: 'msg_g2',
        senderId: 'c_sophia',
        senderName: 'Dr. Sophia Chen',
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        caption: 'AI Speech WER (Word Error Rate) comparison graph',
        ocrExtractedText: 'Benchmark Results: ChatSphere Speech AI - 2.1% WER | Competitor A - 5.4% WER | Competitor B - 8.2% WER',
        timestamp: '08:45 AM',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat_business_nexus',
    type: 'business',
    contactId: 'c_nexus_biz',
    name: 'Nexus Cloud Solutions',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=250&q=80',
    unreadCount: 0,
    pinned: false,
    badge: 'VERIFIED BIZ',
    lastMessage: 'Welcome to Nexus Cloud Solutions! Check out our H100 & Quantum Compute clusters in our store catalog.',
    lastTimestamp: 'Jul 21',
    messages: [
      {
        id: 'msg_b1',
        senderId: 'c_nexus_biz',
        senderName: 'Nexus Cloud Solutions',
        text: 'Welcome to Nexus Cloud Solutions! Browse our enterprise hardware catalog directly inside ChatSphere AI.',
        timestamp: 'Jul 21',
        status: 'read'
      }
    ]
  }
];

export const MOCK_COMMUNITIES = [
  {
    id: 'comm_nexus_global',
    name: 'Nexus Tech Global Enterprise',
    avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=250&q=80',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    membersCount: 14200,
    description: 'Official global community for Nexus engineers, AI researchers, and cloud developers.',
    subgroups: [
      { id: 'sub_announcements', name: '📢 Global Announcements', unread: 2, isAnnouncement: true },
      { id: 'sub_ai_research', name: '🧠 AI & Quantum Frontier', unread: 12 },
      { id: 'sub_infrastructure', name: '☁️ Cloud & Kubernetes Scale', unread: 0 },
      { id: 'sub_events', name: '📅 Hackathons & Summits', unread: 1 }
    ],
    upcomingEvents: [
      { id: 'evt_1', title: 'Global AI Summit 2026', date: 'Tomorrow, 4:00 PM UTC', location: 'ChatSphere Main Stage (HD Video)', attendees: 840 }
    ]
  },
  {
    id: 'comm_open_ai_devs',
    name: 'Open AI & WebRTC Developer Guild',
    avatar: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=250&q=80',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    membersCount: 8900,
    description: 'Community dedicated to ultra-low latency streaming, AI agents, and edge computing.',
    subgroups: [
      { id: 'sub_webrtc_help', name: '🎥 WebRTC & P2P Protocols', unread: 4 },
      { id: 'sub_agents_showcase', name: '🤖 Multi-Agent Showcase', unread: 7 }
    ],
    upcomingEvents: [
      { id: 'evt_2', title: 'Zero-Latency Voice AI Workshop', date: 'July 26, 6:00 PM UTC', location: 'Voice Stage', attendees: 320 }
    ]
  }
];

export const MOCK_CHANNELS = [
  {
    id: 'chan_tech_radar',
    name: 'TechRadar AI & Enterprise Daily',
    handle: '@techradar_official',
    avatar: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=250&q=80',
    subscribers: '482,900',
    verified: true,
    description: 'Breaking news on artificial intelligence, cloud architecture, and communication tech.',
    posts: [
      {
        id: 'post_1',
        title: '🚀 ChatSphere AI Releases Signal V2 Protocol Upgrade',
        content: 'ChatSphere AI has officially rolled out its quantum-resistant double-ratchet encryption engine. Benchmarks show zero throughput impact while guaranteeing future-proof privacy.',
        media: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        timestamp: '2 hours ago',
        reactions: { '⚡': 3420, '🔥': 1890, '👏': 920 },
        commentsCount: 142
      }
    ]
  },
  {
    id: 'chan_cybersec',
    name: 'CyberSec & E2E Privacy Alert',
    handle: '@cybersec_watch',
    avatar: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=250&q=80',
    subscribers: '194,200',
    verified: true,
    description: 'Real-time security advisories, vulnerability disclosures, and encryption best practices.',
    posts: [
      {
        id: 'post_2',
        title: '🛡️ Best Practices for Enterprise Multi-Device Session Revocation',
        content: 'Ensure all inactive WebAuthn hardware keys are audited every 30 days. ChatSphere AI users can now enforce automatic session expiry.',
        timestamp: 'Yesterday',
        reactions: { '🛡️': 1240, '👍': 850 },
        commentsCount: 38
      }
    ]
  }
];

export const MOCK_STORIES = [
  {
    id: 'story_me',
    userName: 'Your Story',
    avatar: CURRENT_USER.avatar,
    isUser: true,
    hasUnseen: false,
    items: [
      {
        id: 'st_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        text: 'Testing the new ChatSphere AR Filters engine! ⚡',
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'story_marcus',
    userName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    hasUnseen: true,
    items: [
      {
        id: 'st_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        text: 'Deploying cluster node #142 in Tokyo 🗼',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 'story_sophia',
    userName: 'Dr. Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    hasUnseen: true,
    items: [
      {
        id: 'st_3',
        type: 'text',
        bgColor: 'from-purple-900 to-indigo-900',
        text: '“Privacy is not an option; it is an fundamental architectural primitive.” 🔒',
        timestamp: '4 hours ago'
      }
    ]
  }
];

export const MOCK_CALL_LOGS = [
  { id: 'call_1', name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', type: 'video', direction: 'incoming', time: 'Today, 10:15 AM', duration: '14m 20s', quality: 'HD 1080p (30fps)' },
  { id: 'call_2', name: 'Dr. Sophia Chen', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80', type: 'audio', direction: 'outgoing', time: 'Yesterday, 4:30 PM', duration: '8m 45s', quality: 'Opus 48kHz HD' },
  { id: 'call_3', name: 'Core Engineering Group Call', avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=250&q=80', type: 'video', direction: 'group', time: 'Jul 21, 2:00 PM', duration: '42m 10s', quality: 'HD Group Mesh' }
];

export const MOCK_BUSINESS_PRODUCTS = [
  {
    id: 'prod_h100',
    name: 'Nexus Quantum AI Pod (H100 NVLink Cluster)',
    price: '$24,999 / mo',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80',
    description: '8x Nvidia H100 Tensor Core GPUs with 640GB HBM3 VRAM, 3.2Tbps InfiniBand interconnect.',
    inStock: true
  },
  {
    id: 'prod_edge_node',
    name: 'ChatSphere Edge Gateway Server',
    price: '$4,499 one-time',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=500&q=80',
    description: 'On-premise hardware appliance for zero-trust E2E encryption key escrow & local turn server.',
    inStock: true
  }
];

export const MOCK_ADMIN_METRICS = {
  activeUsersOnline: '1,428,910',
  totalMessagesToday: '42.8M',
  aiTokensProcessed: '892.4M',
  webrtcCallMinutes: '3.4M mins',
  avgLatencyMs: 24,
  e2eCompliance: '100%',
  moderationQueueCount: 3
};

export const MOCK_MODERATION_QUEUE = [
  { id: 'mod_1', type: 'Spam Alert', sender: '@spammer_bot99', content: 'Claim $5000 crypto gift now at scam-link.xyz!', confidence: '99.4% Spam', status: 'Pending Review' },
  { id: 'mod_2', type: 'Malware Link', sender: '@unverified_dev', content: 'Download cracked app update: dangerous_executable.exe', confidence: '98.1% High Risk', status: 'Pending Review' },
  { id: 'mod_3', type: 'Phishing Attempt', sender: '@fake_admin_support', content: 'Urgent: Verify your ChatSphere password here', confidence: '99.9% Phishing', status: 'Pending Review' }
];
