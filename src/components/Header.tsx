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
  Volume2
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
  hasGeminiKey
}) => {
  const panelClass = accessibility.reducedTransparency
    ? 'solid-panel'
    : 'glass-panel';

  return (
    <header className={`sticky top-0 z-30 w-full ${panelClass} border-b border-slate-200 dark:border-slate-800 transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand & Team Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
                CampusOS v2
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                AgentX '26
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Vasavi College of Engineering • Multi-Agent AI System
            </p>
          </div>
        </div>

        {/* Center / Right Control Cluster */}
        <div className="flex items-center gap-2">
          {/* User Role Switcher */}
          <div className="relative hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium">
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-500 dark:text-slate-400">Role:</span>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const found = DEMO_USERS.find((u) => u.id === e.target.value);
                if (found) onUserChange(found);
              }}
              className="bg-transparent text-slate-900 dark:text-slate-100 font-semibold focus:outline-none cursor-pointer"
              aria-label="Select Demo User Profile Role"
            >
              {DEMO_USERS.map((u) => (
                <option key={u.id} value={u.id} className="dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {u.name} ({u.branch} - {u.year})
                </option>
              ))}
            </select>
          </div>

          {/* Real-time Notification Trigger / Alert Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Real-Time Alerts & Class Notifications"
            aria-label={`Campus Alerts, ${unreadAlertsCount} unread`}
          >
            <Bell className="w-5 h-5" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white animate-bounce">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Voice Companion Assistant Button */}
          <button
            onClick={onOpenVoiceCompanion}
            className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors flex items-center gap-1 text-xs font-semibold"
            title="Voice Assistant Companion (Speech Input & TTS)"
            aria-label="Open Voice Companion"
          >
            <Mic className="w-4 h-4" />
            <span className="hidden lg:inline">Voice AI</span>
          </button>

          {/* Demo Test Suite Runner */}
          <button
            onClick={onOpenTestSuite}
            className="p-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
            title="Interactive Demo Cases & Prototyping Test Suite"
            aria-label="Open Prototyping Test Suite"
          >
            <PlayCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Test Suite</span>
          </button>

          {/* Accessibility Auditor & Theme Controls */}
          <button
            onClick={onOpenAccessibility}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Accessibility & Colorblind Modes"
            aria-label="Open Accessibility & Display Settings"
          >
            <Eye className="w-5 h-5 text-teal-500" />
          </button>

          {/* Secrets / API Credentials */}
          <button
            onClick={onOpenSecrets}
            className={`p-2 rounded-xl text-xs flex items-center gap-1 font-medium transition-colors ${
              hasGeminiKey
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}
            title="API Keys & Database Credentials Config"
            aria-label="API Keys and Secrets Config"
          >
            <Key className="w-4 h-4" />
            <span className="hidden xl:inline">
              {hasGeminiKey ? 'Gemini Active' : 'Keys Config'}
            </span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light / Dark Mode"
            aria-label="Toggle Light and Dark Mode"
          >
            {accessibility.theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
