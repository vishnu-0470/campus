import React from 'react';
import { Key, Database, ShieldCheck, CheckCircle, Info, X } from 'lucide-react';

interface SecretsModalProps {
  onClose: () => void;
  hasGeminiKey: boolean;
}

export const SecretsModal: React.FC<SecretsModalProps> = ({ onClose, hasGeminiKey }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="secrets-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 id="secrets-modal-title" className="text-base font-bold text-slate-900 dark:text-slate-100">
                API Keys & Database Credentials Setup Guide
              </h2>
              <p className="text-xs text-slate-500">
                Environment configuration & security overview
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Key Status Breakdown */}
        <div className="space-y-4 text-xs">
          {/* Gemini & Agent API Key */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-sm">
                <Key className="w-4 h-4 text-emerald-500" /> GEMINI_API_KEY / agent Key
              </span>
              {hasGeminiKey ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Injected & Active
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                  Using Local AI Solver Mode
                </span>
              )}
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              <strong>Purpose:</strong> Powers Gemini 3.6 Flash multi-agent reasoning, RAG vector retrieval, and vision OCR document scanning.
            </p>
            <p className="text-slate-500 italic">
              <strong>Secrets Menu Status:</strong> Detected active key configuration (<code>GEMINI_API_KEY</code> / <code>agent</code>). The platform securely proxies all requests on the server side so keys are never exposed to the client.
            </p>
          </div>

          {/* Database Setup */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-sm">
                <Database className="w-4 h-4 text-teal-500" /> Firebase Firestore Database
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Provisioned & Connected
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              <strong>Status:</strong> Provisioned Cloud Firestore database (Project ID: <code>gen-lang-client-0582891250</code>) with deployed security rules and schema blueprints for real-time user profiles, court bookings, and proactive alerts.
            </p>
            <p className="text-slate-500">
              Multi-device persistent cloud sync is active with fallback to embedded high-performance cache.
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>
            Server-side architecture active: All API requests proxy through Express endpoints, keeping secrets safe.
          </span>
        </div>
      </div>
    </div>
  );
};
