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
  AlertCircle,
  Upload,
  FileText,
  Paperclip,
  X,
  Sliders
} from 'lucide-react';
import { UserProfile, AdminAnnouncement, SportsCourt, TimeSlot, NoticeAttachment } from '../types';

interface AdminDeskPortalProps {
  currentUser: UserProfile;
  accessibilityTransparency?: boolean;
  onPostAnnouncement: (title: string, message: string, priority: 'low' | 'medium' | 'high' | 'urgent', attachment?: NoticeAttachment) => void;
  onUpdateStudentAttendance: (studentId: string, subjectCode: string, newPercentage: number) => void;
  sportsSlots: TimeSlot[];
  sportsCourts: SportsCourt[];
  onUpdateCourtCapacity?: (courtId: string, newCapacity: number) => void;
}

export const AdminDeskPortal: React.FC<AdminDeskPortalProps> = ({
  currentUser,
  accessibilityTransparency,
  onPostAnnouncement,
  onUpdateStudentAttendance,
  sportsSlots,
  sportsCourts,
  onUpdateCourtCapacity
}) => {
  const [activeTab, setActiveTab] = useState<'circulars' | 'attendance' | 'sports_approvals'>('circulars');

  // Circular / Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annRefNo, setAnnRefNo] = useState('VCE/CIRCULAR/2026/042');
  const [docCategory, setDocCategory] = useState<'Notice' | 'Timetable' | 'Syllabus' | 'Announcement'>('Notice');
  const [annMessage, setAnnMessage] = useState('');
  const [annPriority, setAnnPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('urgent');
  const [annTarget, setAnnTarget] = useState('All Students & Faculty');
  const [attachedFile, setAttachedFile] = useState<NoticeAttachment | null>(null);
  const [annSuccessMsg, setAnnSuccessMsg] = useState('');

  // Attendance Form State
  const [selectedStudent, setSelectedStudent] = useState('usr_001'); // Rahul Sharma
  const [selectedSubject, setSelectedSubject] = useState('CS301');
  const [newAttendanceValue, setNewAttendanceValue] = useState('82');
  const [attRemarks, setAttRemarks] = useState('Practical & Theory Register Updated by Faculty');
  const [attSuccessMsg, setAttSuccessMsg] = useState('');

  // Court Capacities local edit state
  const [editingCapacities, setEditingCapacities] = useState<Record<string, number>>({
    crt_badminton_1: 4,
    crt_badminton_2: 4,
    crt_basketball_1: 10,
    crt_tennis_1: 4,
    crt_turf_1: 14
  });

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';
  const isAdminOrFaculty = currentUser.role === 'admin' || currentUser.role === 'faculty';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const isPdf = file.type.includes('pdf') || file.name.endsWith('.pdf');
      const isImg = file.type.includes('image') || file.name.match(/\.(jpg|jpeg|png|webp)$/i);

      setAttachedFile({
        name: file.name,
        url: URL.createObjectURL(file),
        fileType: isPdf ? 'pdf' : isImg ? 'image' : 'document',
        docCategory: docCategory,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`
      });
    }
  };

  const handlePublishCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;

    const fullNotice = `[Ref: ${annRefNo}] [Type: ${docCategory}] Target: ${annTarget}\n\n${annMessage}`;
    
    // Attach default mock document if none uploaded so student can preview it
    const finalAttachment: NoticeAttachment = attachedFile || {
      name: `${annTitle.replace(/\s+/g, '_')}_Document.pdf`,
      fileType: 'pdf',
      docCategory: docCategory,
      fileSize: '420 KB',
      url: 'https://vce.ac.in/circulars/official_notice.pdf'
    };

    onPostAnnouncement(`OFFICIAL ${docCategory.toUpperCase()}: ${annTitle}`, fullNotice, annPriority, finalAttachment);
    setAnnSuccessMsg(`Official ${docCategory} "${annTitle}" (${annRefNo}) with attachment published! Visible on top notification bar and circular board.`);
    setAnnTitle('');
    setAnnMessage('');
    setAttachedFile(null);

    setTimeout(() => setAnnSuccessMsg(''), 5000);
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(newAttendanceValue);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) return;

    onUpdateStudentAttendance(selectedStudent, selectedSubject, parsed);

    const studentLabel = selectedStudent === 'usr_001' ? 'Rahul Sharma (1602-23-733-042)' : 'Ananya Rao (1602-24-735-018)';
    onPostAnnouncement(
      `Attendance Update: ${selectedSubject}`,
      `Faculty posted updated official register for ${studentLabel}: ${parsed}% (${attRemarks}).`,
      parsed < 75 ? 'urgent' : 'high'
    );

    setAttSuccessMsg(`Attendance for ${studentLabel} updated to ${parsed}% in official ERP register and broadcasted!`);
    setTimeout(() => setAttSuccessMsg(''), 5000);
  };

  const handleCapacityChange = (courtId: string, val: number) => {
    setEditingCapacities(prev => ({ ...prev, [courtId]: val }));
    if (onUpdateCourtCapacity) {
      onUpdateCourtCapacity(courtId, val);
    }
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
                Campus Admin & Faculty Dispatch Desk
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
              Upload official notices/timetables, post attendance, & configure court max capacities
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setActiveTab('circulars')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'circulars'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-indigo-500" /> Upload Circular & Timetable
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'attendance'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" /> Post Attendance Register
          </button>
          <button
            onClick={() => setActiveTab('sports_approvals')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sports_approvals'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> Court Capacities & FCFS
          </button>
        </div>
      </div>

      {/* Access Guard Notice */}
      {!isAdminOrFaculty && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Demo Role Switch:</strong> You are currently viewing as <strong>Student ({currentUser.name})</strong>. Switch to <strong>TPO Officer Admin</strong> or <strong>Dr. Srinivas (Faculty)</strong> using the top profile switcher to test admin publishing!
            </span>
          </span>
        </div>
      )}

      {/* Content Tab 1: Broadcast Official Circulars & Upload Documents */}
      {activeTab === 'circulars' && (
        <div className="space-y-5">
          {annSuccessMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {annSuccessMsg}
            </div>
          )}

          <form onSubmit={handlePublishCircular} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Radio className="w-4 h-4 text-indigo-500 animate-pulse" /> Upload Official Circular, Timetable or Syllabus
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. B.Tech 3rd Sem CSE Official Class Timetable"
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Document Type Category
                </label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-indigo-600 dark:text-indigo-400"
                >
                  <option value="Notice">Notice / Circular</option>
                  <option value="Timetable">Class / Exam Timetable</option>
                  <option value="Syllabus">Subject Syllabus PDF</option>
                  <option value="Announcement">Placement Announcement</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Reference Order No.
                </label>
                <input
                  type="text"
                  value={annRefNo}
                  onChange={(e) => setAnnRefNo(e.target.value)}
                  placeholder="e.g. VCE/COE/2026/104"
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Target Audience
                </label>
                <select
                  value={annTarget}
                  onChange={(e) => setAnnTarget(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All Students & Faculty">All Students & Faculty</option>
                  <option value="All B.Tech 3rd Year Students">All B.Tech 3rd Year Students</option>
                  <option value="CSE & ECE Departments">CSE & ECE Departments</option>
                  <option value="Hostel Residents">Hostel Residents</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Priority / Banner Level
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
            </div>

            {/* Document Upload Zone */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1 flex items-center justify-between">
                <span>Attach File Document (PDF / Image / Doc)</span>
                <span className="text-[10px] text-indigo-500 font-normal">Supports .pdf, .png, .jpg, .docx</span>
              </label>

              {attachedFile ? (
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <div>
                      <span className="font-bold text-indigo-200">{attachedFile.name}</span>
                      <span className="text-[10px] text-slate-400 ml-2">({attachedFile.docCategory} • {attachedFile.fileSize})</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="p-1 rounded-lg hover:bg-indigo-500/20 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-indigo-500 bg-white/50 dark:bg-slate-900/50 cursor-pointer transition-all text-xs font-bold text-slate-600 dark:text-slate-300">
                  <Upload className="w-4 h-4 text-indigo-500" />
                  <span>Click to attach {docCategory} file or drag and drop</span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Full Document Summary / Directives
              </label>
              <textarea
                rows={3}
                value={annMessage}
                onChange={(e) => setAnnMessage(e.target.value)}
                placeholder="Enter document highlights, room allocations, exam dates, or timetable schedule summary..."
                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <Send className="w-4 h-4" /> Publish {docCategory} & Broadcast to All
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Tab 2: Post Official Attendance Logs */}
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
              <UserCheck className="w-4 h-4 text-emerald-500" /> Post Official Student Attendance Register
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Select Student / Batch
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
                  Course Subject Code
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

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Faculty Remarks / Log Note
              </label>
              <input
                type="text"
                value={attRemarks}
                onChange={(e) => setAttRemarks(e.target.value)}
                placeholder="e.g. Lab 4 sessions included. Medical leave approved."
                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-200/60 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Official ERP Lock: Updates reflect immediately in student read-only view and top notification bar.</span>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
              >
                Post Official Attendance Register
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Tab 3: Sports Court Allotment & Court Capacities */}
      {activeTab === 'sports_approvals' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-500" /> Sports Court Max Player Capacity Configurator
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure maximum slot capacity per court. When bookings reach capacity, slots toggle to FULL and enable student waitlists.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {sportsCourts.map((court) => (
                <div
                  key={court.id}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">
                    {court.name}
                  </span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Max Capacity:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={editingCapacities[court.id] || court.maxCapacity || 4}
                        onChange={(e) => handleCapacityChange(court.id, parseInt(e.target.value) || 4)}
                        className="w-16 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-center text-xs"
                      />
                      <span className="text-[10px] text-slate-400">players</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" /> Active Court Slot Reservations
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sportsSlots.slice(0, 6).map((slot) => {
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
                          Capacity: {editingCapacities[court?.id || ''] || court?.maxCapacity || 4} Max
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
        </div>
      )}
    </div>
  );
};

