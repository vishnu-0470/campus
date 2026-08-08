import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Info,
  Calendar,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { ATTENDANCE_WEEKLY_DATA, SUBJECT_ATTENDANCE_DATA } from '../data/campusData';
import { UserProfile } from '../types';

interface AttendanceHeatmapProps {
  currentUser: UserProfile;
  accessibilityTransparency?: boolean;
  onAskAgentAboutAttendance?: (query: string) => void;
}

export const AttendanceHeatmap: React.FC<AttendanceHeatmapProps> = ({
  currentUser,
  accessibilityTransparency,
  onAskAgentAboutAttendance
}) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'subjects'>('weekly');
  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  const overallPercentage = currentUser.attendancePercentage || 73.5;
  const isBelowThreshold = overallPercentage < 75.0;

  // Recharts custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-slate-900/95 text-white border border-slate-700 text-xs shadow-xl backdrop-blur-md">
          <p className="font-bold text-emerald-400 mb-1">{data.day}</p>
          <div className="space-y-1">
            <p className="flex justify-between gap-4">
              <span className="text-slate-300">Classes Attended:</span>
              <span className="font-bold">{data.presentClasses} / {data.totalClasses}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-300">Daily Attendance:</span>
              <span className="font-extrabold text-teal-300">{data.percentage}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${panelClass} rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 transition-all`}>
      {/* Widget Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Weekly Attendance Heatmap & Analytics
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" /> Read-Only Student View
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Official attendance log verified by Vasavi College Examination Cell
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'weekly'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Weekly Trend
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'subjects'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Subject Breakdown
          </button>
        </div>
      </div>

      {/* Condonation & Overall Attendance Overview Banner */}
      <div className={`p-4 rounded-2xl border ${
        isBelowThreshold
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
      } flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
        <div className="flex items-start gap-3">
          {isBelowThreshold ? (
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
          ) : (
            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider">
                Overall Semester Attendance
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                isBelowThreshold ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {overallPercentage}%
              </span>
            </div>
            <p className="text-xs mt-1">
              {isBelowThreshold ? (
                <span>
                  <strong>Condonation Risk (&lt;75%):</strong> Your attendance is 73.5%. Submit medical condonation form before August 15 to qualify for end-sem hall tickets.
                </span>
              ) : (
                <span>
                  <strong>Safe Zone (&gt;75%):</strong> Excellent track record! You are fully eligible for all upcoming campus placement drives and exams.
                </span>
              )}
            </p>
          </div>
        </div>

        {onAskAgentAboutAttendance && (
          <button
            onClick={() =>
              onAskAgentAboutAttendance(
                'How many classes do I need to attend to reach 75% attendance for condonation waiver?'
              )
            }
            className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shrink-0 flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
            Calculate Condonation Math
          </button>
        )}
      </div>

      {/* Main Chart or Subject Grid Content */}
      {activeTab === 'weekly' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Daily Class Attendance % (Mon - Sat)
            </span>
            <span className="text-[11px] font-mono">Minimum Required: 75.0%</span>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ATTENDANCE_WEEKLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis
                  dataKey="shortDay"
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  axisLine={{ stroke: '#475569', opacity: 0.3 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#475569', opacity: 0.3 }}
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                  {ATTENDANCE_WEEKLY_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.percentage >= 80
                          ? '#10b981'
                          : entry.percentage >= 70
                          ? '#14b8a6'
                          : '#f59e0b'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Day Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
            {ATTENDANCE_WEEKLY_DATA.map((item) => (
              <div
                key={item.day}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-center"
              >
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase block">
                  {item.shortDay}
                </span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 block mt-0.5">
                  {item.percentage}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {item.presentClasses}/{item.totalClasses} Present
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Subject Wise Attendance List */
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-emerald-500" /> Subject-wise Official Log
            </span>
            <span>Faculty Updated: Today 08:30 AM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SUBJECT_ATTENDANCE_DATA.map((subject) => (
              <div
                key={subject.subjectCode}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {subject.subjectCode}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">
                      {subject.subjectName}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Prof: {subject.professor}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={`text-sm font-black ${
                      subject.percentage < 75 ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {subject.percentage}%
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {subject.attendedClasses}/{subject.totalClasses} Attended
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      subject.percentage >= 80
                        ? 'bg-emerald-500'
                        : subject.percentage >= 75
                        ? 'bg-teal-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${subject.percentage}%` }}
                  />
                </div>

                {subject.isCondonationRisk && (
                  <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    Attend next {subject.requiredClassesFor75} classes continuously to reach 75.0%
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Official Read-Only Footer Banner */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <strong>Student Read-Only Security Mode:</strong> Attendance records are read-only and posted strictly by Department Faculty & TPO.
        </span>
        <span className="font-mono text-[10px]">VasaviOS ERP Sync</span>
      </div>
    </div>
  );
};
