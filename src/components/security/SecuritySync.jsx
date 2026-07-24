import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, KeyRound, Smartphone, Laptop, Globe, 
  Trash2, QrCode, CheckCircle2, ShieldAlert, Fingerprint, RefreshCw
} from 'lucide-react';
import { CURRENT_USER } from '../../services/mockData';
import { useApp } from '../../context/AppContext';

export default function SecuritySync() {
  const { showToast } = useApp();
  const [user, setUser] = useState(CURRENT_USER);
  const [passkeyActive, setPasskeyActive] = useState(true);

  const handleRevokeDevice = (deviceId) => {
    setUser(prev => ({
      ...prev,
      devices: prev.devices.filter(d => d.id !== deviceId)
    }));
    showToast('Device session revoked & key destroyed', 'warning');
  };

  return (
    <div className="flex-1 bg-[#0b0f19] flex flex-col h-full overflow-hidden p-6 z-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-600 shadow-glow-cyan">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-gray-100 flex items-center gap-2">
              Security, E2E Encryption & Multi-Device Sync
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                SIGNAL V2 ACTIVE
              </span>
            </h2>
            <p className="text-xs text-gray-400">Manage Hardware Passkeys, Active Session Keys & Encrypted Backups</p>
          </div>
        </div>

        <button
          onClick={() => showToast('Re-keyed all active session ratchets', 'success')}
          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-glow-indigo flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Rotate Session Ratchet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2">
        {/* Signal Key Ratchet Inspector */}
        <div className="p-5 rounded-3xl bg-gray-900/90 border border-gray-800 space-y-4 shadow-xl">
          <h3 className="font-bold text-sm text-gray-200 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" /> Cryptographic Identity & Keys
          </h3>

          <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-3 font-mono text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] font-sans">Identity Key (Curve25519)</span>
              <span className="text-cyan-300 text-[11px] break-all">{user.securityKeys.identityKey}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] font-sans">Safety Fingerprint</span>
              <span className="text-emerald-400 text-[11px] font-bold">{user.securityKeys.fingerprint}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-[11px] pt-1 font-sans">
              <span>Double-Ratchet Step: #{user.securityKeys.ratchetStep}</span>
              <span className="text-emerald-400 font-bold">AES-256-GCM</span>
            </div>
          </div>

          {/* Passkey WebAuthn Simulator Card */}
          <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-6 h-6 text-brand-400" />
              <div>
                <h4 className="font-bold text-xs text-gray-200">Hardware Passkey (WebAuthn)</h4>
                <p className="text-[11px] text-gray-400">TouchID / FaceID biometrics enabled</p>
              </div>
            </div>
            <button
              onClick={() => {
                setPasskeyActive(!passkeyActive);
                showToast(`Passkey state: ${!passkeyActive ? 'Enabled' : 'Disabled'}`, 'info');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                passkeyActive
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-gray-800 text-gray-400 border-gray-700'
              }`}
            >
              {passkeyActive ? 'Enabled ✓' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Multi-Device Session Sync Manager */}
        <div className="p-5 rounded-3xl bg-gray-900/90 border border-gray-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-200 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-cyanGlow" /> Active Multi-Device Sessions ({user.devices.length})
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold">Encrypted Sync</span>
          </div>

          <div className="space-y-3">
            {user.devices.map(dev => {
              const DevIcon = dev.type === 'desktop' ? Laptop : dev.type === 'mobile' ? Smartphone : Globe;
              return (
                <div key={dev.id} className="p-3.5 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gray-900 text-cyanGlow border border-gray-800">
                      <DevIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-200">{dev.name}</h4>
                      <p className="text-[11px] text-gray-400">{dev.os} • IP: {dev.ip} • <span className="text-emerald-400">{dev.lastActive}</span></p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRevokeDevice(dev.id)}
                    className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-800/60 transition-colors"
                    title="Revoke Session & Destroy Key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
