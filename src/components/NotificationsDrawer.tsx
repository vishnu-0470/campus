import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCircle,
  Radio,
  FileText,
  Clock,
  Calendar,
  Trophy,
  Briefcase,
  AlertTriangle,
  ExternalLink,
  CheckCheck,
  Download,
  Eye
} from 'lucide-react';
import { CampusAlertNotification, NoticeAttachment } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: CampusAlertNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigateToSection?: (section: string) => void;
  onViewAttachment?: (attachment: NoticeAttachment) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigateToSection,
  onViewAttachment
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'class' | 'urgent' | 'placement'>('all');

  if (!isOpen) return null;

  const unreadCount = alerts.filter((a) => !a.read).length;

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'unread') return !a.read;
    if (filter === 'class') return a.type === 'class';
    if (filter === 'urgent') return a.type === 'urgent';
    if (filter === 'placement') return a.type === 'placement';
    return true;
  });

  const getTypeIcon = (type: CampusAlertNotification['type']) => {
    switch (type) {
      case 'class':
        return <Clock className="w-4 h-4 text-emerald-400" />;
      case 'court':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'placement':
        return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      default:
        return <Radio className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0e0f11] border-l border-white/10 shadow-2xl h-full flex flex-col text-white">
        {/* Header Bar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#050505]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#2dd4bf]/10 text-[#2dd4bf] border border-[#2dd4bf]/20 relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2dd4bf] text-[9px] font-black text-black">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
                Campus Notification Center
              </h3>
              <p className="text-[11px] text-slate-400">
                {unreadCount} unread • CampusOS Dispatch Feed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-[#2dd4bf] flex items-center gap-1 border border-white/10"
                title="Mark all notifications as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mark all read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-2 border-b border-white/10 bg-[#0a0b0d] flex items-center gap-1 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'all', label: `All (${alerts.length})` },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'class', label: 'Classes' },
            { id: 'urgent', label: 'Notices' },
            { id: 'placement', label: 'Placements' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-[#2dd4bf] text-black shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-2xl border transition-all relative group ${
                  !alert.read
                    ? 'bg-[#15171c] border-[#2dd4bf]/40 shadow-lg shadow-[#2dd4bf]/5'
                    : 'bg-[#0e0f11] border-white/5 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
                      {getTypeIcon(alert.type)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                          {alert.timestamp}
                        </span>
                        {!alert.read && (
                          <span className="px-1.5 py-0.2 rounded bg-[#2dd4bf] text-black font-black text-[9px] uppercase">
                            NEW
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white mt-0.5">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {alert.message}
                      </p>

                      {/* Attachment preview if available */}
                      {alert.attachment && (
                        <div className="mt-2.5 p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-[#2dd4bf] shrink-0" />
                            <span className="truncate text-slate-200 text-[11px] font-medium">
                              {alert.attachment.name} ({alert.attachment.docCategory})
                            </span>
                          </div>
                          {onViewAttachment && (
                            <button
                              onClick={() => onViewAttachment(alert.attachment!)}
                              className="px-2 py-1 rounded bg-[#2dd4bf]/20 text-[#2dd4bf] hover:bg-[#2dd4bf]/30 text-[10px] font-bold shrink-0 flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" /> View
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {!alert.read && (
                    <button
                      onClick={() => onMarkAsRead(alert.id)}
                      className="p-1 rounded-lg text-slate-500 hover:text-[#2dd4bf] hover:bg-white/10 shrink-0"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {alert.targetSection && onNavigateToSection && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => {
                        onMarkAsRead(alert.id);
                        onNavigateToSection(alert.targetSection!);
                        onClose();
                      }}
                      className="text-[11px] font-bold text-[#2dd4bf] hover:underline flex items-center gap-1"
                    >
                      Open in {alert.targetSection} <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-600 opacity-50" />
              <p className="text-xs font-bold text-slate-400">No Notifications</p>
              <p className="text-[11px]">All campus broadcast alerts and updates are caught up.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-[#050505] text-[10px] text-slate-500 flex items-center justify-between font-mono">
          <span>CampusOS v2.6 Alert Sync</span>
          <span>Vasavi College Network</span>
        </div>
      </div>
    </div>
  );
};
