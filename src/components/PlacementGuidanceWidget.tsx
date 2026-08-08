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
  Check,
  ChevronDown,
  ChevronUp,
  Target,
  Clock,
  BookOpen,
  Code2
} from 'lucide-react';
import { PLACEMENT_DRIVES_DATA } from '../data/campusData';
import { UserProfile, PlacementCompany, InterviewRoadmap } from '../types';

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
  const [expandedRoadmaps, setExpandedRoadmaps] = useState<Record<string, boolean>>({
    plc_1: true // Expand Google Cloud by default
  });

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  const cgpa = 8.7; // Student CGPA
  const attendance = currentUser.attendancePercentage || 73.5;

  const toggleRoadmap = (driveId: string) => {
    setExpandedRoadmaps((prev) => ({ ...prev, [driveId]: !prev[driveId] }));
  };

  const sampleRoadmaps: Record<string, InterviewRoadmap> = {
    plc_1: {
      companyId: 'plc_1',
      companyName: 'Google Cloud Platform',
      role: 'Software Development Engineer (SDE 1)',
      technicalTopics: [
        'Distributed Systems & RPC Architecture',
        'Data Structures: Graphs, Segment Trees, Dynamic Programming',
        'System Design Basics: Load Balancing, Caching, Sharding'
      ],
      aptitudeCodingPlan: [
        'LeetCode Hard/Medium 15-day sprint (focus on Trees & Graphs)',
        'System Design Primer & Distributed Caching exercises'
      ],
      resumeFixes: [
        'Highlight Cloud Computing & Distributed Projects at top',
        'Quantify metrics: "Reduced API latency by 35% using Redis caching"'
      ],
      timeline: [
        { phase: 'Week 1', focus: 'DSA Core & Algorithms', tasks: ['Solve 20 Graph/Tree problems', 'Revise OS Memory & Threading'] },
        { phase: 'Week 2', focus: 'System Design & Distributed AI', tasks: ['Design URL Shortener & Rate Limiter', 'Review GCP Architecture'] },
        { phase: 'Week 3', focus: 'Mock Interviews & Drive Week', tasks: ['2 Peer Mock Interviews on Pramp', 'Final Resume Polish'] }
      ]
    },
    plc_2: {
      companyId: 'plc_2',
      companyName: 'ServiceNow India',
      role: 'Associate Platform Engineer',
      technicalTopics: [
        'JavaScript ES6+, Promises, Async/Await',
        'RESTful API Design & OAuth Security',
        'Relational Databases & SQL Query Optimization'
      ],
      aptitudeCodingPlan: [
        'JavaScript Array/Object manipulation puzzles',
        'HackerRank SQL & Database Schema drills'
      ],
      resumeFixes: [
        'Accentuate React & Node.js full-stack campus apps',
        'Add link to GitHub repo and live deployed URLs'
      ],
      timeline: [
        { phase: 'Week 1', focus: 'JS Fundamentals & DOM', tasks: ['Deep dive Event Loop & Closures', 'Build REST API with Express'] },
        { phase: 'Week 2', focus: 'Database & ServiceNow Stack', tasks: ['Complex SQL Joins & Indexing', 'Mock Technical Round'] }
      ]
    },
    plc_3: {
      companyId: 'plc_3',
      companyName: 'Microsoft Corporation',
      role: 'Cloud & AI Engineer Intern',
      technicalTopics: [
        'Generative AI, Multi-Agent Systems & Embeddings',
        'C++ / Python Memory Management & Concurrency',
        'Data Structures: Heaps, Trie, Dynamic Programming'
      ],
      aptitudeCodingPlan: [
        'Microsoft tagged LeetCode questions (last 6 months)',
        'Object-Oriented Design (OOD) patterns'
      ],
      resumeFixes: [
        'Feature CampusOS / Agentic AI projects prominently',
        'Clear attendance condonation with HOD to unlock ticket'
      ],
      timeline: [
        { phase: 'Week 1', focus: 'C++ STL & Multi-Threading', tasks: ['Concurrency primitives & Smart Pointers', 'OOD Parking Lot Problem'] },
        { phase: 'Week 2', focus: 'AI & Machine Learning Prep', tasks: ['Explain Transformer Attention mechanism', 'Mock HR & Tech round'] }
      ]
    },
    plc_4: {
      companyId: 'plc_4',
      companyName: 'Deloitte USI',
      role: 'Technology Consultant',
      technicalTopics: [
        'Aptitude: Permutations, Probability, Data Interpretation',
        'SQL Queries & Basic Java / Python OOPs concepts',
        'Business Communication & Case Study Analysis'
      ],
      aptitudeCodingPlan: [
        'RS Aggarwal Quantitative Aptitude practice sets',
        'SQL queries: GROUP BY, HAVING, Subqueries'
      ],
      resumeFixes: [
        'Highlight leadership in campus clubs and organizing events',
        'Format cleanly with standard single-column ATS template'
      ],
      timeline: [
        { phase: 'Week 1', focus: 'Aptitude & Logical Reasoning', tasks: ['Solve 50 Quant & DI questions', 'Practice SQL joins'] },
        { phase: 'Week 2', focus: 'Case Studies & HR Interview', tasks: ['Group Discussion practice on tech trends', 'Behavioral STAR answers'] }
      ]
    }
  };

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
        {filteredDrives.map((drive) => {
          const isRoadmapOpen = !!expandedRoadmaps[drive.id];
          const roadmap = sampleRoadmaps[drive.id];

          return (
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

              {/* Toggle Auto-Generated Interview Roadmap */}
              <button
                onClick={() => toggleRoadmap(drive.id)}
                className="w-full py-2.5 rounded-xl bg-[#2dd4bf]/10 hover:bg-[#2dd4bf]/20 text-[#2dd4bf] text-xs font-bold flex items-center justify-between px-4 transition-all border border-[#2dd4bf]/30"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-Generated AI Interview Roadmap
                </span>
                {isRoadmapOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Inline Interview Preparation Roadmap Panel */}
              {isRoadmapOpen && roadmap && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-[#2dd4bf]/30 text-white space-y-3.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#2dd4bf] flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" /> Chained TPO Agent Plan • {drive.companyName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Tailored for CSE Rahul</span>
                  </div>

                  {/* Technical Topics */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-[#2dd4bf]" /> Key Technical Topics to Revise:
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 pl-1">
                      {roadmap.technicalTopics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Aptitude & Coding */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Aptitude & Coding Practice Plan:
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 pl-1">
                      {roadmap.aptitudeCodingPlan.map((plan, i) => (
                        <li key={i}>{plan}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Resume Fixes */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-amber-400" /> Suggested Resume Polish:
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 pl-1">
                      {roadmap.resumeFixes.map((fix, i) => (
                        <li key={i}>{fix}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Week-by-Week Timeline */}
                  <div className="space-y-1.5 border-t border-white/10 pt-2.5">
                    <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> Suggested Mock-Interview Timeline:
                    </span>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {roadmap.timeline.map((step, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs flex items-start gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#2dd4bf] text-black font-extrabold text-[10px] shrink-0">
                            {step.phase}
                          </span>
                          <div>
                            <strong className="text-[#2dd4bf] block">{step.focus}</strong>
                            <p className="text-[11px] text-slate-300 mt-0.5">
                              {step.tasks.join(' • ')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

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
                  Ask AI Agent Studio for Detailed Mock Drive Session
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
