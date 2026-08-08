import React, { useState } from 'react';
import {
  Building2,
  Utensils,
  AlertOctagon,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  Send,
  Sparkles,
  ShieldAlert,
  UserCheck,
  Calendar,
  Key,
  MessageSquare,
  QrCode,
  Tag
} from 'lucide-react';
import { UserProfile } from '../types';

interface StudentServicesPortalProps {
  currentUser: UserProfile;
  accessibilityTransparency: boolean;
  onPostAnnouncement?: (title: string, message: string, priority: 'low' | 'medium' | 'high' | 'urgent') => void;
}

export interface GrievanceTicket {
  id: string;
  category: 'Hostel & Mess' | 'Wi-Fi & IT Services' | 'Infrastructure' | 'Sanitation' | 'Anti-Ragging' | 'Library';
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'Open' | 'Assigned to Agent' | 'In Progress' | 'Resolved';
  assignedAgent: string;
  timestamp: string;
  estimatedResolution: string;
}

export const StudentServicesPortal: React.FC<StudentServicesPortalProps> = ({
  currentUser,
  accessibilityTransparency,
  onPostAnnouncement
}) => {
  const [activeTab, setActiveTab] = useState<'hostel' | 'grievance' | 'gatepass'>('hostel');

  // Grievances State
  const [tickets, setTickets] = useState<GrievanceTicket[]>([
    {
      id: 'GRV-2026-104',
      category: 'Wi-Fi & IT Services',
      subject: 'Frequent Wi-Fi Disconnection in Visvesvaraya Block B 2nd Floor',
      description: 'The campus Wi-Fi access point fluctuates repeatedly between 11 PM and 2 AM, affecting online project submission.',
      priority: 'high',
      status: 'In Progress',
      assignedAgent: 'IT & Network Services Agent',
      timestamp: 'Yesterday at 04:30 PM',
      estimatedResolution: 'Today within 6 hours'
    },
    {
      id: 'GRV-2026-092',
      category: 'Hostel & Mess',
      subject: 'Request for Hot Water Geyser Maintenance in Washroom 3B',
      description: 'Geyser thermostat is malfunctioning and tripping the circuit breaker.',
      priority: 'medium',
      status: 'Resolved',
      assignedAgent: 'Hostel Caretaker & Maintenance Agent',
      timestamp: '3 days ago',
      estimatedResolution: 'Completed'
    }
  ]);

  const [newCategory, setNewCategory] = useState<GrievanceTicket['category']>('Hostel & Mess');
  const [newSubject, setNewSubject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');

  // Gate Pass State
  const [gatepassReason, setGatepassReason] = useState('Weekend Home Visit');
  const [outDate, setOutDate] = useState('2026-08-08');
  const [inDate, setInDate] = useState('2026-08-10');
  const [gatepassStatus, setGatepassStatus] = useState<string | null>(null);

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) return;

    const newTicket: GrievanceTicket = {
      id: `GRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      category: newCategory,
      subject: newSubject,
      description: newDescription,
      priority: newPriority,
      status: 'Assigned to Agent',
      assignedAgent: `${newCategory} AI Agent`,
      timestamp: 'Just now',
      estimatedResolution: newPriority === 'urgent' ? 'Within 4 hours (Escalated)' : '24 - 48 hours'
    };

    setTickets([newTicket, ...tickets]);

    if (onPostAnnouncement && newPriority === 'urgent') {
      onPostAnnouncement(
        `URGENT GRIEVANCE ESCALATION: ${newSubject}`,
        `Student ${currentUser.name} (${currentUser.rollNo}) filed an urgent grievance for ${newCategory}. Assigned to ${newCategory} AI Agent.`,
        'urgent'
      );
    }

    setSubmitSuccessMsg(`Grievance ${newTicket.id} submitted! Auto-assigned to ${newTicket.assignedAgent} with SLA priority ${newPriority.toUpperCase()}.`);
    setNewSubject('');
    setNewDescription('');
    setTimeout(() => setSubmitSuccessMsg(''), 6000);
  };

  const handleApplyGatepass = (e: React.FormEvent) => {
    e.preventDefault();
    setGatepassStatus(`Gate Pass GP-2026-${Math.floor(1000 + Math.random() * 9000)} approved by Hostel Warden AI Agent! QR digital pass ready for security gate scanning.`);
  };

  return (
    <div className={`w-full ${panelClass} rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xl space-y-5`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Student Services Agent (Hostels & Grievances)
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 font-mono text-[10px] font-bold uppercase">
                Active AI Agent
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Hostel allotments, Mess schedule, Outing Gate passes, & Grievance SLA ticket tracking
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('hostel')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'hostel'
                ? 'bg-teal-500 text-slate-950 font-extrabold shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Hostel & Mess
          </button>
          <button
            onClick={() => setActiveTab('grievance')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'grievance'
                ? 'bg-teal-500 text-slate-950 font-extrabold shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" /> Grievances ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('gatepass')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'gatepass'
                ? 'bg-teal-500 text-slate-950 font-extrabold shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" /> Outing Pass
          </button>
        </div>
      </div>

      {/* TAB 1: Hostel & Mess Info */}
      {activeTab === 'hostel' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hostel Allotment Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h4 className="text-xs font-extrabold uppercase text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Key className="w-4 h-4 text-teal-500" /> Room Allotment Status
              </h4>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                Active Resident
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Hostel Block</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-200">Visvesvaraya Block B</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Room Number</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-200">Room 204 (2-Sharing)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Warden In-Charge</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-200">Dr. M. Sateesh</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Curfew Timing</span>
                <span className="font-extrabold text-teal-600 dark:text-teal-400">09:30 PM (Daily)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              Note: Attendance is recorded nightly at 09:45 PM by biometric facial scanner at hostel gates.
            </p>
          </div>

          {/* Today's Mess Menu Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h4 className="text-xs font-extrabold uppercase text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-500" /> Today's Mess Menu Schedule
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">Saturday Special</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between">
                <div>
                  <span className="font-bold text-amber-600 dark:text-amber-400">Breakfast (07:30 - 09:00 AM):</span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">Idli, Vada, Sambhar, Coconut Chutney, Tea/Coffee</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-500 font-bold shrink-0">Served</span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between">
                <div>
                  <span className="font-bold text-teal-600 dark:text-teal-400">Lunch (12:30 - 02:00 PM):</span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">Veg Biryani, Mirchi Ka Salan, Raita, Paneer Curry, Rice</p>
                </div>
                <span className="text-[10px] font-mono text-teal-400 font-bold shrink-0">Next Up</span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between">
                <div>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Dinner (07:30 - 09:00 PM):</span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">Roti, Dal Tadka, Mixed Veg, Steamed Rice, Sweet Gulab Jamun</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Grievance Redressal & Complaint Tracker */}
      {activeTab === 'grievance' && (
        <div className="space-y-5">
          {submitSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{submitSuccessMsg}</span>
            </div>
          )}

          {/* New Grievance Submission Form */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-500" /> Submit New Campus Grievance / Complaint
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">AI Agent Escalation Active</span>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
                    Department / Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="Hostel & Mess">Hostel & Mess Services</option>
                    <option value="Wi-Fi & IT Services">Wi-Fi & Campus IT Infrastructure</option>
                    <option value="Infrastructure">Classroom & Lab Maintenance</option>
                    <option value="Sanitation">Sanitation & Hygiene</option>
                    <option value="Anti-Ragging">Anti-Ragging & Student Safety (High Priority)</option>
                    <option value="Library">Library & Digital Resources</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
                    Priority Level
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="low">Low (General Query / Request)</option>
                    <option value="medium">Medium (Standard Maintenance)</option>
                    <option value="high">High (Affects Daily Studies / Hostel)</option>
                    <option value="urgent">Urgent (Safety / Critical System Breakdown)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
                  Issue Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Broken fan in Lab 4 or Wi-Fi connectivity issue"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe location, timing, and details so the specialized agent can resolve it..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch Grievance Ticket to AI Agent
                </button>
              </div>
            </form>
          </div>

          {/* Ticket History */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-500" /> Tracked Grievance Tickets & Resolution Status
            </h4>

            <div className="space-y-2">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{t.id}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                        {t.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${
                        t.priority === 'urgent'
                          ? 'bg-rose-500/20 text-rose-500'
                          : t.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-500'
                          : 'bg-indigo-500/20 text-indigo-500'
                      }`}>
                        {t.priority}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        t.status === 'Resolved'
                          ? 'bg-emerald-500/20 text-emerald-500'
                          : 'bg-teal-500/20 text-teal-400 animate-pulse'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  </div>

                  <h5 className="font-bold text-slate-900 dark:text-slate-100">{t.subject}</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">{t.description}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1 font-mono">
                    <span>Assigned: {t.assignedAgent}</span>
                    <span>SLA Target: {t.estimatedResolution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Outing Gate Pass */}
      {activeTab === 'gatepass' && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-extrabold uppercase text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-teal-500" /> Digital Outing & Gate Pass Generator
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Hostel Warden Agent</span>
          </div>

          <form onSubmit={handleApplyGatepass} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
                  Outing Reason
                </label>
                <input
                  type="text"
                  value={gatepassReason}
                  onChange={(e) => setGatepassReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={outDate}
                  onChange={(e) => setOutDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
                  Expected Return Date
                </label>
                <input
                  type="date"
                  value={inDate}
                  onChange={(e) => setInDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow"
            >
              <QrCode className="w-4 h-4" /> Request Instant Digital Outing Gate Pass
            </button>
          </form>

          {gatepassStatus && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-slate-900 dark:text-emerald-300 text-xs font-bold space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <span>{gatepassStatus}</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[11px]">Pass Holder: {currentUser.name} ({currentUser.rollNo})</p>
                  <p className="font-mono text-[10px] text-slate-500">Valid: {outDate} to {inDate}</p>
                </div>
                <div className="p-2 bg-slate-900 text-teal-400 rounded-md font-mono text-[10px] font-bold">
                  [QR APPROVED]
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
