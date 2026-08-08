import React, { useState, useEffect } from 'react';
import { Clock, MapPin, User, BookOpen, ExternalLink, AlertTriangle, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { UserProfile } from '../types';

interface NextClassWidgetProps {
  currentUser: UserProfile;
  accessibilityTransparency?: boolean;
}

export const NextClassWidget: React.FC<NextClassWidgetProps> = ({
  currentUser,
  accessibilityTransparency
}) => {
  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  // Live countdown simulator
  const [secondsLeft, setSecondsLeft] = useState(1320); // 22 minutes
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const nextClassData = {
    subjectCode: 'CS301',
    subjectName: 'Deep Learning & Neural Networks',
    faculty: 'Dr. V. Srinivas (HOD CSE)',
    timeSlot: '11:15 AM - 12:15 PM',
    venue: 'Visvesvaraya Block • Room 302 (Lab 4)',
    topicToday: 'Backpropagation Gradient Descent & PyTorch Autograd',
    syllabusUnit: 'Unit III: Optimization & Deep Feedforward Networks',
    attendance: currentUser.attendancePercentage || 73.5,
    requiredClassesTo75: 2
  };

  return (
    <div className={`${panelClass} rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 relative overflow-hidden transition-all`}>
      {/* Decorative Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2dd4bf]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-extrabold uppercase text-[#2dd4bf] tracking-wider">
            Up Next On Timetable
          </span>
        </div>

        <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Starts in {formatCountdown(secondsLeft)}</span>
        </div>
      </div>

      {/* Subject Title & Venue */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-bold">
              {nextClassData.subjectCode}
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              {nextClassData.subjectName}
            </h3>
          </div>

          <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 shrink-0">
            {nextClassData.timeSlot}
          </span>
        </div>

        {/* Faculty & Venue Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
            <User className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">{nextClassData.faculty}</span>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{nextClassData.venue}</span>
          </div>
        </div>
      </div>

      {/* Today's Topic & Syllabus Shortcut */}
      <div className="p-3 rounded-2xl bg-slate-900 border border border-slate-800 text-slate-200 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#2dd4bf] font-bold uppercase flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> Today's Lecture Topic
          </span>
          <button
            onClick={() => setShowSyllabusModal(!showSyllabusModal)}
            className="text-[10px] font-bold text-[#2dd4bf] hover:underline flex items-center gap-1"
          >
            <span>View Subject Syllabus</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <p className="font-semibold text-slate-100 text-xs">
          "{nextClassData.topicToday}"
        </p>

        {/* Syllabus Expanded Preview */}
        {showSyllabusModal && (
          <div className="p-2.5 rounded-xl bg-slate-950 border border-[#2dd4bf]/30 text-[11px] text-slate-300 space-y-1.5 animate-in fade-in">
            <p className="font-bold text-[#2dd4bf]">{nextClassData.syllabusUnit}</p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[10px]">
              <li>Gradient Descent & Stochastic Optimization</li>
              <li>Vanishing / Exploding Gradients & BatchNorm</li>
              <li>PyTorch Autograd graph construction demo</li>
            </ul>
          </div>
        )}
      </div>

      {/* Attendance Quick Alert */}
      <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
        nextClassData.attendance < 75
          ? 'bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300'
          : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300'
      }`}>
        <span className="flex items-center gap-1.5">
          {nextClassData.attendance < 75 ? (
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          )}
          <span>
            CS301 Attendance: <strong>{nextClassData.attendance}%</strong>
          </span>
        </span>

        <span className="text-[11px] font-mono font-extrabold underline">
          {nextClassData.attendance < 75
            ? `Attend today to reach 75%!`
            : 'Safe to bunk 1 class'}
        </span>
      </div>
    </div>
  );
};
