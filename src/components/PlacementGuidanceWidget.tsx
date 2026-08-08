import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  GraduationCap,
  Sparkles,
  Building2,
  ArrowRight,
  FileText,
  DollarSign,
  Calendar,
  Check
} from 'lucide-react';
import { PLACEMENT_DRIVES_DATA } from '../data/campusData';
import { UserProfile, PlacementCompany } from '../types';

interface PlacementGuidanceWidgetProps {
  currentUser: UserProfile;
  accessibilityTransparency?: boolean;
  onAskAgentForGuidance?: (companyName: string) => void;
}

export const PlacementGuidanceWidget: React.FC<PlacementGuidanceWidgetProps> = ({
  currentUser,
  accessibilityTransparency,
  onAskAgentForGuidance
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'eligible' | 'high_package'>('all');
  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  const cgpa = 8.7; // Student CGPA
  const attendance = currentUser.attendancePercentage || 73.5;
  const backlogs = 0;

  const filteredDrives = PLACEMENT_DRIVES_DATA.filter((drive) => {
    if (selectedFilter === 'eligible') return drive.userEligible;
    if (selectedFilter === 'high_package') return drive.packageLpa >= 18;
    return true;
  });

  return (
    <div className={`${panelClass} rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 transition-all`}>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                TPO Placement Eligibility & AI Guidance Engine
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> CGPA: {cgpa} / 10
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Automated criterion verification against Vasavi College TPO partner drives
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All Drives ({PLACEMENT_DRIVES_DATA.length})
          </button>
          <button
            onClick={() => setSelectedFilter('eligible')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedFilter === 'eligible'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Eligible Drives
          </button>
          <button
            onClick={() => setSelectedFilter('high_package')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedFilter === 'high_package'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Tier 1 (&gt;18 LPA)
          </button>
        </div>
      </div>

      {/* Student Eligibility Profile Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">CGPA Score</span>
          <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 block mt-0.5">
            {cgpa} / 10.0
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">Top 10% Tier</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Attendance Status</span>
          <span className={`text-base font-extrabold block mt-0.5 ${attendance >= 75 ? 'text-emerald-600' : 'text-amber-500'}`}>
            {attendance}%
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            {attendance < 75 ? 'Condonation Needed' : 'Eligible'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Active Backlogs</span>
          <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 block mt-0.5">
            0 Backlogs
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">Clean Record</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Eligible Drives</span>
          <span className="text-base font-extrabold text-teal-600 dark:text-teal-400 block mt-0.5">
            3 of 4 Drives
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">75% Match</span>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDrives.map((drive) => (
          <div
            key={drive.id}
            className={`p-5 rounded-3xl border transition-all space-y-3 ${
              drive.userEligible
                ? 'bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
                : 'bg-slate-100/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800 opacity-90'
            }`}
          >
            {/* Title & Badge */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {drive.companyName}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                  {drive.role}
                </h4>
              </div>

              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shrink-0 flex items-center gap-1 ${
                drive.userEligible
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {drive.userEligible ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-amber-600" />}
                {drive.userEligible ? 'Eligible' : 'Check Attendance'}
              </span>
            </div>

            {/* Compensation & Date Info */}
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300 flex-wrap">
              <span className="px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 flex items-center gap-1 font-bold">
                💰 ₹{drive.packageLpa} LPA
              </span>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> Drive Date: {drive.driveDate}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {drive.description}
            </p>

            {/* Criteria Breakdown */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
              <p className="text-slate-700 dark:text-slate-300 font-bold">
                Criteria: Min CGPA {drive.minCgpa} • Min Attendance {drive.minAttendance}%
              </p>
              <p className="text-slate-500 dark:text-slate-400 italic">
                {drive.eligibilityReason}
              </p>
            </div>

            {/* Ask AI Agent Guidance */}
            {onAskAgentForGuidance && (
              <button
                onClick={() =>
                  onAskAgentForGuidance(
                    `How should I prepare my resume and technical interview topics for ${drive.companyName} (${drive.role})?`
                  )
                }
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-600" />
                Ask Agent for Interview Preparation Roadmap
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
