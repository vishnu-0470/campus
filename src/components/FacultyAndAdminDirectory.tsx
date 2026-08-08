import React, { useState } from 'react';
import {
  Users,
  MapPin,
  FileCheck,
  Building,
  Wrench,
  Search,
  ExternalLink,
  Clock,
  Mail,
  Phone,
  Sparkles
} from 'lucide-react';
import {
  FACULTY_DIRECTORY,
  ADMIN_TASK_MAP,
  CLUB_REGISTRY,
  LAB_RESOURCES
} from '../data/campusData';

interface FacultyAndAdminDirectoryProps {
  accessibilityTransparency: boolean;
  onAskAgentAboutContact: (queryText: string) => void;
}

export const FacultyAndAdminDirectory: React.FC<FacultyAndAdminDirectoryProps> = ({
  accessibilityTransparency,
  onAskAgentAboutContact
}) => {
  const [activeTab, setActiveTab] = useState<'faculty' | 'admin' | 'labs' | 'clubs'>('faculty');
  const [searchTerm, setSearchTerm] = useState('');

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  const filteredFaculty = FACULTY_DIRECTORY.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.responsibilities.some((r) => r.toLowerCase().includes(searchTerm.toLowerCase())) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdmin = ADMIN_TASK_MAP.filter(
    (a) =>
      a.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.officeWindow.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLabs = LAB_RESOURCES.filter(
    (l) =>
      l.labName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.projectSupportTags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredClubs = CLUB_REGISTRY.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${panelClass} rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg my-6`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Campus Navigator: Faculty, Labs & Admin Directory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              "Who do I contact, where do I go, what do I carry?"
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search faculty, task, lab..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Search directory"
          />
        </div>
      </div>

      {/* Directory Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 overflow-x-auto scrollbar-none">
        {[
          { key: 'faculty', label: 'Faculty Directory', icon: Users },
          { key: 'admin', label: 'Administrative Tasks', icon: FileCheck },
          { key: 'labs', label: 'Lab Resources & Equipment', icon: Wrench },
          { key: 'clubs', label: 'Clubs & Memberships', icon: Building }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Faculty Directory Grid */}
      {activeTab === 'faculty' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFaculty.map((f) => (
            <div
              key={f.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 shadow-sm hover:border-teal-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {f.name}
                  </h4>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                    {f.designation}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {f.department}
                  </p>
                </div>
                <button
                  onClick={() => onAskAgentAboutContact(`How do I reach ${f.name}?`)}
                  className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 text-[11px] font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Ask
                </button>
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-500" />
                  <strong>Room:</strong> {f.room}
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-500" />
                  <strong>Hours:</strong> {f.officeHours}
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-500" />
                  <span>{f.contactEmail}</span> (Ext: {f.phoneExt})
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Handles Student Concerns:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {f.responsibilities.map((r, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Administrative Task Map */}
      {activeTab === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAdmin.map((a) => (
            <div
              key={a.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {a.taskName}
                </h4>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  SLA: {a.estimatedProcessingTime}
                </span>
              </div>

              <div className="mt-2 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Where to Go:</strong>{' '}
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    {a.officeWindow}
                  </span>
                </p>
                <p>
                  <strong>Who to Meet:</strong> {a.responsiblePerson}
                </p>
              </div>

              <div className="mt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Required Documents to Carry:
                </span>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 mt-1 space-y-0.5">
                  {a.requiredDocuments.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 text-[11px] text-slate-500 italic bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                Instructions: {a.instructions}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Lab Resource Directory */}
      {activeTab === 'labs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLabs.map((l) => (
            <div
              key={l.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 shadow-sm"
            >
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {l.labName}
              </h4>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                {l.department} • {l.location}
              </p>

              <div className="mt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Equipment Available:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {l.equipment.map((eq, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-800 dark:text-teal-300 text-[10px] font-semibold"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-600 dark:text-slate-300">
                <p>
                  <strong>Lab In-Charge:</strong> {l.labInCharge}
                </p>
                <p className="mt-1">
                  <strong>Access Procedure:</strong> {l.accessProcedure}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Club Registry */}
      {activeTab === 'clubs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClubs.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {c.name}
                  </h4>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                    {c.category}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {c.joiningFee}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                {c.description}
              </p>

              <div className="mt-3 text-xs text-slate-500 space-y-0.5">
                <p>
                  <strong>Advisor:</strong> {c.advisorName}
                </p>
                <p>
                  <strong>Eligibility:</strong> {c.eligibility}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
