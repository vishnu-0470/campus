import React, { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  Bell,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  Volume2,
  X,
  Navigation,
  Compass,
  Footprints,
  Accessibility,
  Radio,
  Layers
} from 'lucide-react';
import { ClassSession, CampusAlertNotification, BuildingDirections } from '../types';

interface ClassNotificationBannerProps {
  nextClass: ClassSession;
  alerts: CampusAlertNotification[];
  onTriggerAlert: (title: string, message: string, type: 'class' | 'court' | 'placement' | 'exam' | 'urgent') => void;
  onAskAgentAboutClass: (courseCode: string) => void;
  accessibilityTransparency: boolean;
}

export const ClassNotificationBanner: React.FC<ClassNotificationBannerProps> = ({
  nextClass,
  alerts,
  onTriggerAlert,
  onAskAgentAboutClass,
  accessibilityTransparency
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [audioReminderActive, setAudioReminderActive] = useState(true);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [minutesRemaining, setMinutesRemaining] = useState<number>(
    nextClass.minutesRemaining !== undefined ? nextClass.minutesRemaining : 15
  );
  const [proactiveTriggered, setProactiveTriggered] = useState(true);

  // Proactive Class Agent timer monitor (Interval tick)
  useEffect(() => {
    const timer = setInterval(() => {
      setMinutesRemaining((prev) => {
        if (prev <= 1) return 60; // loop for demo
        return prev - 1;
      });
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, []);

  // When minutesRemaining hits exactly 15 or on initial load, trigger proactive speech alert
  useEffect(() => {
    if (minutesRemaining <= 15 && audioReminderActive && !proactiveTriggered) {
      if ('speechSynthesis' in window) {
        const text = `Proactive Class Agent alert: Your next session ${nextClass.courseCode} ${nextClass.courseName} begins in ${minutesRemaining} minutes in ${nextClass.room}, ${nextClass.building}. Map directions are ready.`;
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      }
      setProactiveTriggered(true);
    }
  }, [minutesRemaining, audioReminderActive, proactiveTriggered, nextClass]);

  if (dismissed) return null;

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';
  const directions: BuildingDirections | undefined = nextClass.buildingDirections;

  const handleSoundAlert = () => {
    const nextState = !audioReminderActive;
    setAudioReminderActive(nextState);
    if (nextState && 'speechSynthesis' in window) {
      const text = `Proactive Class Agent active. Next session ${nextClass.courseName} begins in ${minutesRemaining} minutes in ${nextClass.room}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSimulate15MinProactive = () => {
    setMinutesRemaining(15);
    setProactiveTriggered(false);
    onTriggerAlert(
      '🤖 Proactive Class Agent Alert (15 Min)',
      `Upcoming Session: ${nextClass.courseCode} in ${nextClass.room} (${nextClass.building}) starts in 15 mins. Directions generated.`,
      'class'
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4 space-y-3">
      {/* Top Pop-Up Notification Toast Bar for Latest Circulars & Updates */}
      {alerts && alerts.length > 0 && alerts[0] && !alerts[0].read && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-slate-900 border border-indigo-500/40 text-white shadow-xl flex items-center justify-between gap-3 animate-bounce-short">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
              <Radio className="w-4 h-4 animate-pulse text-indigo-400" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  NEW CAMPUS BROADCAST
                </span>
                <span className="text-[10px] text-slate-400">{alerts[0].timestamp}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-white mt-0.5">
                {alerts[0].title}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                {alerts[0].message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onAskAgentAboutClass(alerts[0].title)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
            >
              Details
            </button>
          </div>
        </div>
      )}

      <div
        className={`${panelClass} rounded-2xl p-4 sm:p-5 border-l-4 border-l-emerald-500 shadow-lg relative overflow-hidden transition-all`}
        role="region"
        aria-label="Real-time Proactive Class Notification Banner"
      >
        {/* Subtle Proactive Agent Signal Wave */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          {/* Main Class Info Box */}
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 relative">
              <Clock className="w-6 h-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex items-center gap-1 shadow-sm">
                  <Radio className="w-3 h-3 animate-pulse" /> PROACTIVE CLASS AGENT
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  <Calendar className="w-3.5 h-3.5" /> Starts in {minutesRemaining} mins ({nextClass.startTime})
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                {nextClass.courseCode}: {nextClass.courseName}
              </h2>

              <div className="flex items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-300 mt-1 flex-wrap">
                <span className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Room: <strong className="text-emerald-600 dark:text-emerald-400">{nextClass.room}</strong> ({nextClass.building})
                </span>
                <span>•</span>
                <span>Faculty: {nextClass.facultyName}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons & Map Directions Trigger */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-200 dark:border-slate-800 flex-wrap sm:flex-nowrap">
            {/* Map Directions Button */}
            <button
              onClick={() => setShowDirectionsModal(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all transform hover:scale-[1.02]"
              aria-label="View Map Directions to Class Building"
            >
              <Navigation className="w-4 h-4 text-emerald-200 animate-bounce" />
              <span>Map Directions ({directions?.estimatedWalkMinutes || 2.5}m)</span>
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundAlert}
              className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors ${
                audioReminderActive
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
              title="Toggle Audio Voice Reminder"
              aria-label="Toggle Audio Reminder"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {audioReminderActive ? 'Audio ON' : 'Mute'}
              </span>
            </button>

            {/* Ask Agent Button */}
            <button
              onClick={() => onAskAgentAboutClass(nextClass.courseCode)}
              className="px-3 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
              Ask Agent
            </button>

            {/* Fast Proactive Test Trigger */}
            <button
              onClick={handleSimulate15MinProactive}
              className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-colors flex items-center gap-1"
              title="Simulate 15-Minute Proactive Class Alert"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="hidden lg:inline">Simulate 15M Alert</span>
            </button>

            <button
              onClick={() => setDismissed(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Dismiss Alert Banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Directions & Walking Route Modal */}
      {showDirectionsModal && directions && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="directions-modal-title"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Compass className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <h3 id="directions-modal-title" className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Campus Map Directions: {directions.buildingName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Turn-by-turn walking route to Room {directions.roomNumber} ({directions.floorLevel})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Close directions modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Route Summary Metric Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Distance</span>
                  <span className="text-base font-extrabold text-teal-700 dark:text-teal-300 flex items-center justify-center gap-1 mt-0.5">
                    <Footprints className="w-4 h-4" /> {directions.totalDistanceMeters}m
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Walk Time</span>
                  <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1 mt-0.5">
                    <Clock className="w-4 h-4" /> ~{directions.estimatedWalkMinutes} mins
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Floor & Wing</span>
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1 mt-1">
                    <Layers className="w-3.5 h-3.5" /> {directions.floorLevel}
                  </span>
                </div>
              </div>

              {/* Schematic Map Path Visualizer */}
              <div className="p-4 rounded-2xl bg-slate-950 text-white relative overflow-hidden border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Campus Schematic Route Overlay</span>
                  <span className="text-emerald-400 font-mono">Start: {directions.startPoint}</span>
                </div>

                <div className="h-28 rounded-xl bg-slate-900 border border-slate-800 relative flex items-center justify-between px-6">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-50" />

                  {/* Start Point Pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="p-2 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold shadow">
                      Start
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1">Main Gate / Plaza</span>
                  </div>

                  {/* Dotted Navigation Path Line */}
                  <div className="flex-1 h-0.5 border-t-2 border-dashed border-emerald-500/60 mx-4 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[9px] font-mono font-bold border border-emerald-500/30">
                      {directions.totalDistanceMeters}m
                    </div>
                  </div>

                  {/* Destination Pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="p-2.5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg animate-bounce">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 mt-1">{directions.buildingName}</span>
                  </div>
                </div>
              </div>

              {/* Turn-by-turn Route Steps List */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Turn-by-Turn Route Instructions
                </h4>
                <div className="space-y-2">
                  {directions.routeSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {step.instruction}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          <span>📍 Landmark: <strong>{step.landmark}</strong></span>
                          <span>•</span>
                          <span>{step.distanceMeter}m</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessibility Route Info */}
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
                <Accessibility className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Inclusive Accessibility Route:</strong>
                  <span>{directions.accessibilityRoute}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
              <button
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    const speechText = `Directions to ${directions.buildingName}: ${directions.routeSteps.map((s) => s.instruction).join('. ')}`;
                    const utterance = new SpeechSynthesisUtterance(speechText);
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4 text-emerald-500" /> Read Directions Aloud
              </button>

              <button
                onClick={() => setShowDirectionsModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
              >
                Got It, Let's Go
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
