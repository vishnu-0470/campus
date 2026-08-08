import React from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Eye,
  Mic,
  Key,
  PlayCircle,
  Bell,
  UserCheck,
  Volume2,
  Wifi,
  WifiOff
} from 'lucide-react';
import { UserProfile, AccessibilityConfig } from '../types';
import { DEMO_USERS } from '../data/campusData';

interface HeaderProps {
  currentUser: UserProfile;
  onUserChange: (user: UserProfile) => void;
  accessibility: AccessibilityConfig;
  onToggleTheme: () => void;
  onOpenAccessibility: () => void;
  onOpenVoiceCompanion: () => void;
  onOpenTestSuite: () => void;
  onOpenSecrets: () => void;
  unreadAlertsCount: number;
  onOpenNotifications: () => void;
  hasGeminiKey: boolean;
  isOfflineMode?: boolean;
  onToggleOfflineMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onUserChange,
  accessibility,
  onToggleTheme,
  onOpenAccessibility,
  onOpenVoiceCompanion,
  onOpenTestSuite,
  onOpenSecrets,
  unreadAlertsCount,
  onOpenNotifications,
  hasGeminiKey,
  isOfflineMode,
  onToggleOfflineMode
}) => {
  const panelClass = accessibility.reducedTransparency
    ? 'solid-panel'
    : 'glass-panel';

  return (
    <header className={`sticky top-0 z-30 w-full ${panelClass} border-b border-white/10 transition-colors bg-[#050505]/90 backdrop-blur-xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand & Team Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0e0f11] border border-white/10 flex items-center justify-center text-[#2dd4bf] shadow-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white uppercase">
                Synapse
              </h1>
            </div>
            <p className="text-[11px] text-[#9ca3af] hidden sm:block">
              Vasavi College of Engineering • Multi-Agent AI System
            </p>
          </div>
        </div>

        {/* Center / Right Control Cluster */}
        <div className="flex items-center gap-2">
          {/* User Role Switcher */}
          <div className="relative hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0e0f11] border border-white/10 text-xs font-medium">
            <UserCheck className="w-3.5 h-3.5 text-[#2dd4bf]" />
            <span className="text-[#9ca3af]">Role:</span>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const found = DEMO_USERS.find((u) => u.id === e.target.value);
                if (found) onUserChange(found);
              }}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              aria-label="Select Demo User Profile Role"
            >
              {DEMO_USERS.map((u) => (
                <option key={u.id} value={u.id} className="bg-[#0e0f11] text-white">
                  {u.name} ({u.branch} - {u.year})
                </option>
              ))}
            </select>
          </div>

          {/* Offline-First Mode Indicator / Toggle */}
          <button
            onClick={onToggleOfflineMode}
            className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isOfflineMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}
            title="Toggle Offline-First PWA Mode (Simulate Patchy Campus Wi-Fi)"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Offline PWA</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">PWA Ready</span>
              </>
            )}
          </button>

          {/* Real-time Notification Trigger / Alert Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            title="Real-Time Alerts & Class Notifications"
            aria-label={`Campus Alerts, ${unreadAlertsCount} unread`}
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2dd4bf] text-[10px] font-black text-black">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Voice Companion Assistant Button */}
          <button
            onClick={onOpenVoiceCompanion}
            className="p-2 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] hover:bg-[#2dd4bf]/20 transition-all flex items-center gap-1 text-xs font-bold border border-[#2dd4bf]/20"
            title="Voice Assistant Companion (Speech Input & TTS)"
            aria-label="Open Voice Companion"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Voice AI</span>
          </button>

          {/* Demo Test Suite Runner */}
          <button
            onClick={onOpenTestSuite}
            className="px-3.5 py-1.5 rounded-full bg-white text-black font-extrabold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            title="Interactive Demo Cases & Prototyping Test Suite"
            aria-label="Open Prototyping Test Suite"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Test Suite</span>
          </button>

          {/* Accessibility Auditor & Theme Controls */}
          <button
            onClick={onOpenAccessibility}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            title="Accessibility & Colorblind Modes"
            aria-label="Open Accessibility & Display Settings"
          >
            <Eye className="w-4 h-4 text-[#2dd4bf]" />
          </button>

          {/* Secrets / API Credentials */}
          <button
            onClick={onOpenSecrets}
            className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1 font-bold transition-all border ${
              hasGeminiKey
                ? 'bg-[#2dd4bf]/10 text-[#2dd4bf] border-[#2dd4bf]/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}
            title="API Keys & Database Credentials Config"
            aria-label="API Keys and Secrets Config"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">
              {hasGeminiKey ? 'Gemini Active' : 'Keys Config'}
            </span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            title="Toggle Light / Dark Mode"
            aria-label="Toggle Light and Dark Mode"
          >
            {accessibility.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
