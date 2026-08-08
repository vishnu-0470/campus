import React, { useState } from 'react';
import {
  PlayCircle,
  X,
  UserCheck,
  Calendar,
  Bell,
  Cpu,
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';
import { DEMO_USERS } from '../data/campusData';

interface TestSuiteModalProps {
  onClose: () => void;
  onSelectUser: (user: UserProfile) => void;
  onTriggerNotification: (title: string, message: string, type: any) => void;
  onRunConflictTest: () => void;
  onRunWorkflowTest: (query: string) => void;
  onRunOCRTest: (ocrSampleText: string) => void;
}

export const TestSuiteModal: React.FC<TestSuiteModalProps> = ({
  onClose,
  onSelectUser,
  onTriggerNotification,
  onRunConflictTest,
  onRunWorkflowTest,
  onRunOCRTest
}) => {
  const [activeTestTab, setActiveTestTab] = useState<'login' | 'conflict' | 'notif' | 'workflow' | 'ocr'>('login');
  const [testLog, setTestLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setTestLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="test-suite-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="test-suite-title" className="text-base font-bold text-slate-900 dark:text-slate-100">
                Prototyping Demo Test Suite & Benchmark Runner
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Validate agentic AI capabilities, real-time conflicts, & notification triggers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close test suite"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Test Category Tabs */}
        <div className="flex items-center gap-2 px-5 pt-4 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'login', label: '1. User Roles & Login', icon: UserCheck },
            { id: 'conflict', label: '2. Booking Conflict Engine', icon: Calendar },
            { id: 'notif', label: '3. Real-Time Alerts', icon: Bell },
            { id: 'workflow', label: '4. End-to-End Multi-Agent Workflow', icon: Cpu },
            { id: 'ocr', label: '5. Vision / OCR Notice Scan', icon: FileSearch }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTestTab(tab.id as any)}
                className={`pb-3 px-3 font-bold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTestTab === tab.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Test Execution Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* 1. User Login */}
          {activeTestTab === 'login' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Test User Switcher & Role Personalization
              </h3>
              <p className="text-xs text-slate-500">
                Switch profiles to verify personalized multi-agent reasoning, eligibility thresholds, and role-based permissions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEMO_USERS.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      onSelectUser(user);
                      addLog(`Switched user profile to: ${user.name} (${user.branch})`);
                    }}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-emerald-500 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                        {user.name}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                        {user.role.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {user.branch} • {user.year} • Roll: {user.rollNo}
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                      Attendance: <strong>{user.attendancePercentage}%</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Court Booking Conflicts */}
          {activeTestTab === 'conflict' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Court & Room Booking Conflict Engine
              </h3>
              <p className="text-xs text-slate-500">
                Simulate concurrent booking requests on a locked slot to evaluate how the Sports Booking Agent detects conflicts and offers conflict resolution alternatives.
              </p>
              <button
                onClick={() => {
                  onRunConflictTest();
                  addLog('Executed Court Booking Conflict Resolution Test: Detected locked slot 17:00, generated alternative court 2 recommendation.');
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" /> Trigger Concurrent Booking Conflict Simulation
              </button>
            </div>
          )}

          {/* 3. Real-Time Alerts */}
          {activeTestTab === 'notif' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Real-Time Class & Extra Alerts Dispatcher
              </h3>
              <p className="text-xs text-slate-500">
                Instantly trigger test alerts to verify notification state, sound triggers, and live bell indicators.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onTriggerNotification(
                      '🔔 Class Reminder: Deep Learning in 10 mins',
                      'Your class CS301 begins at 09:30 AM in IT-304.',
                      'class'
                    );
                    addLog('Dispatched Class Reminder Alert');
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-left text-xs font-bold hover:border-emerald-500"
                >
                  Trigger Class Reminder
                </button>

                <button
                  onClick={() => {
                    onTriggerNotification(
                      '🏸 Badminton Court Slot Open',
                      'Slot 18:00 - 19:00 on Badminton Court 1 is open.',
                      'court'
                    );
                    addLog('Dispatched Sports Slot Alert');
                  }}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-left text-xs font-bold hover:border-teal-500"
                >
                  Trigger Sports Court Open Alert
                </button>
              </div>
            </div>
          )}

          {/* 4. Multi-Agent Workflow */}
          {activeTestTab === 'workflow' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                End-to-End Multi-Agent Workflow Execution
              </h3>
              <p className="text-xs text-slate-500">
                Executes a complete 5-agent pipeline: Academic eligibility check -&gt; RAG policy lookup -&gt; Event registration -&gt; Calendar entry -&gt; Notification reminder.
              </p>
              <button
                onClick={() => {
                  onRunWorkflowTest(
                    'I am a third-year CSE student. Am I eligible for the Google internship? If yes, register me for tomorrow placement workshop, add it to my calendar, and remind me one hour before.'
                  );
                  addLog('Started End-to-End 5-Agent Workflow Execution Test.');
                  onClose();
                }}
                className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Run Example 1 Multi-Agent Workflow
              </button>
            </div>
          )}

          {/* 5. Vision / OCR Notice Scan */}
          {activeTestTab === 'ocr' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Vision & OCR Notice / Timetable Analyzer
              </h3>
              <p className="text-xs text-slate-500">
                Simulates scanning an institutional notice/timetable or hostel form to extract structured exam dates, fees, and approval rules.
              </p>
              <button
                onClick={() => {
                  onRunOCRTest('Scanned Vasavi College Notice: Makeup Examination Regulations 2026');
                  addLog('Ran Vision / OCR Document Scan Test on Exam Notice.');
                  onClose();
                }}
                className="w-full py-3 rounded-2xl bg-teal-600 text-white font-bold text-xs shadow-md hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" /> Simulate Document OCR Scan
              </button>
            </div>
          )}

          {/* Live Execution Console Logs */}
          <div className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] space-y-1 max-h-36 overflow-y-auto">
            <div className="text-slate-500 font-bold border-b border-slate-800 pb-1 mb-1">
              Test Execution Console Log:
            </div>
            {testLog.length === 0 ? (
              <p className="text-slate-600 italic">No tests executed in this session yet.</p>
            ) : (
              testLog.map((log, i) => <div key={i}>{log}</div>)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
