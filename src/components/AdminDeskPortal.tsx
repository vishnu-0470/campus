import React, { useState } from 'react';
import {
  Megaphone,
  UserCheck,
  Send,
  Bell,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  Trophy,
  Users,
  PlusCircle,
  Radio,
  Lock,
  Layers,
  AlertCircle
} from 'lucide-react';
import { UserProfile, AdminAnnouncement, SportsCourt, TimeSlot } from '../types';

interface AdminDeskPortalProps {
  currentUser: UserProfile;
  accessibilityTransparency?: boolean;
  onPostAnnouncement: (title: string, message: string, priority: 'low' | 'medium' | 'high' | 'urgent') => void;
  onUpdateStudentAttendance: (studentId: string, subjectCode: string, newPercentage: number) => void;
  sportsSlots: TimeSlot[];
  sportsCourts: SportsCourt[];
}

export const AdminDeskPortal: React.FC<AdminDeskPortalProps> = ({
  currentUser,
  accessibilityTransparency,
  onPostAnnouncement,
  onUpdateStudentAttendance,
  sportsSlots,
  sportsCourts
}) => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'attendance' | 'sports_approvals'>('announcements');

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [annPriority, setAnnPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('high');
  const [annTarget, setAnnTarget] = useState('All B.Tech Students');
  const [annSuccessMsg, setAnnSuccessMsg] = useState('');

  // Attendance Form State
  const [selectedStudent, setSelectedStudent] = useState('usr_001'); // Rahul Sharma
  const [selectedSubject, setSelectedSubject] = useState('CS301');
  const [newAttendanceValue, setNewAttendanceValue] = useState('78');
  const [attSuccessMsg, setAttSuccessMsg] = useState('');

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';
  const isAdminOrFaculty = currentUser.role === 'admin' || currentUser.role === 'faculty';

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;

    onPostAnnouncement(annTitle, annMessage, annPriority);
    setAnnSuccessMsg(`Announcement "${annTitle}" successfully broadcasted to student desks!`);
    setAnnTitle('');
    setAnnMessage('');

    setTimeout(() => setAnnSuccessMsg(''), 4000);
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(newAttendanceValue);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) return;

    onUpdateStudentAttendance(selectedStudent, selectedSubject, parsed);
    setAttSuccessMsg(`Attendance for Student (${selectedStudent}) updated to ${parsed}% officially!`);

    setTimeout(() => setAttSuccessMsg(''), 4000);
  };

  return (
    <div className={`${panelClass} rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 transition-all`}>
      {/* Portal Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Campus Admin & Faculty Control Desk
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase flex items-center gap-1 ${
                isAdminOrFaculty
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {isAdminOrFaculty ? <Sparkles className="w-3 h-3 text-indigo-500" /> : <Lock className="w-3 h-3 text-amber-500" />}
                {currentUser.role.toUpperCase()} MODE
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Broadcast alerts, post official attendance logs, and monitor First Come First Serve sports allotments
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'announcements'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-indigo-500" /> Announcements
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'attendance'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" /> Post Attendance
          </button>
          <button
            onClick={() => setActiveTab('sports_approvals')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sports_approvals'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> Sports Allotments
          </button>
        </div>
      </div>

      {/* Access Guard Notice */}
      {!isAdminOrFaculty && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Demo Switch:</strong> You are currently viewing as <strong>Student ({currentUser.name})</strong>. Switch to <strong>TPO Officer Admin</strong> or <strong>Dr. Srinivas (Faculty)</strong> using the top profile switcher to test admin publishing!
            </span>
          </span>
        </div>
      )}

      {/* Content Tab 1: Broadcast Announcements */}
      {activeTab === 'announcements' && (
        <div className="space-y-5">
          {annSuccessMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {annSuccessMsg}
            </div>
          )}

          <form onSubmit={handlePublishAnnouncement} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Radio className="w-4 h-4 text-indigo-500 animate-pulse" /> Dispatch Real-Time Alert to Student Desk
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Announcement Title
                </label>
                <input
                  type="text"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. Mid-Sem Time Table / Condonation Application Open"
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Target Audience
                </label>
                <select
                  value={annTarget}
                  onChange={(e) => setAnnTarget(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All B.Tech Students">All B.Tech Students</option>
                  <option value="3rd Year CSE Students">3rd Year CSE Students</option>
                  <option value="Hostel Residents">Hostel Residents</option>
                  <option value="Placement Eligible Candidates">Placement Eligible Candidates</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Priority & Banner Type
              </label>
              <div className="flex items-center gap-2">
                {(['low', 'medium', 'high', 'urgent'] as const).map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setAnnPriority(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      annPriority === p
                        ? p === 'urgent'
                          ? 'bg-rose-500 text-white shadow-md'
                          : p === 'high'
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Detailed Message Content
              </label>
              <textarea
                rows={3}
                value={annMessage}
                onChange={(e) => setAnnMessage(e.target.value)}
                placeholder="Write full notice details regarding dates, hall tickets, or circular guidelines..."
                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <Send className="w-4 h-4" /> Broadcast to Student Desks
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Tab 2: Post Attendance Logs */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          {attSuccessMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {attSuccessMsg}
            </div>
          )}

          <form onSubmit={handleSaveAttendance} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-500" /> Update Official Attendance Register
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Select Student
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="usr_001">Rahul Sharma (CSE 3rd Yr - 1602-23-733-042)</option>
                  <option value="usr_002">Ananya Rao (ECE 2nd Yr - 1602-24-735-018)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Course Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="CS301">CS301: Deep Learning & Neural Nets</option>
                  <option value="CS302">CS302: Design & Analysis of Algorithms</option>
                  <option value="CS304">CS304: Operating Systems Kernel</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Updated Percentage (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newAttendanceValue}
                  onChange={(e) => setNewAttendanceValue(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                  required
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-200/60 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Official ERP Lock: Updates reflect immediately in student read-only view.</span>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
              >
                Save Official Register
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Tab 3: Sports Court Allotment Queue */}
      {activeTab === 'sports_approvals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" /> First Come First Serve (FCFS) AI Allotment Audit
            </h4>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Agent Auto-Approval: Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sportsSlots.slice(0, 4).map((slot) => {
              const court = sportsCourts.find((c) => c.id === slot.courtId);
              const isBooked = slot.status === 'booked';

              return (
                <div
                  key={slot.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
                        {court?.name || 'Badminton Court 1'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {isBooked ? (
                        <>Booked by: <strong>{slot.bookedBy || 'Rahul Sharma'}</strong> ({slot.bookedByRoll || '1602-23-733-042'})</>
                      ) : (
                        'Slot Open for FCFS Reservation'
                      )}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> FCFS Queue Verified
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {slot.bookingTime || 'Timestamp: 08:15 AM'}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase shrink-0 ${
                    isBooked
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {isBooked ? 'AI Approved' : 'Open Slot'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
