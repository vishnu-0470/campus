import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { PremiumAudioHeader } from './components/PremiumAudioHeader';
import { ClassNotificationBanner } from './components/ClassNotificationBanner';
import { SportsBookingWidget } from './components/SportsBookingWidget';
import { AgentOrchestrator } from './components/AgentOrchestrator';
import { FacultyAndAdminDirectory } from './components/FacultyAndAdminDirectory';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { TestSuiteModal } from './components/TestSuiteModal';
import { SecretsModal } from './components/SecretsModal';
import { VoiceAssistantCompanion } from './components/VoiceAssistantCompanion';
import { ColorblindSVGFilters } from './components/ColorblindSVGFilters';
import { AttendanceHeatmap } from './components/AttendanceHeatmap';
import { AdminDeskPortal } from './components/AdminDeskPortal';
import { PlacementGuidanceWidget } from './components/PlacementGuidanceWidget';
import { AIDoubtChatbox } from './components/AIDoubtChatbox';
import { NoticeScannerCameraWidget } from './components/NoticeScannerCameraWidget';
import { NextClassWidget } from './components/NextClassWidget';
import { NotificationsDrawer } from './components/NotificationsDrawer';

import {
  UserProfile,
  Message,
  ClassSession,
  SportsCourt,
  TimeSlot,
  CampusAlertNotification,
  AccessibilityConfig,
  PersonalCalendarEvent
} from './types';

import {
  INITIAL_USER,
  INITIAL_CLASSES,
  SPORTS_COURTS,
  INITIAL_SLOTS,
  INITIAL_ALERTS
} from './data/campusData';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [nextClass, setNextClass] = useState<ClassSession>(INITIAL_CLASSES[0]);
  const [alerts, setAlerts] = useState<CampusAlertNotification[]>(INITIAL_ALERTS);
  const [courts, setCourts] = useState<SportsCourt[]>(SPORTS_COURTS);
  const [slots, setSlots] = useState<TimeSlot[]>(INITIAL_SLOTS);
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(false);
  const [calendarEvents, setCalendarEvents] = useState<PersonalCalendarEvent[]>([
    {
      id: 'cal_1',
      title: 'Deep Learning Mid-Sem Theory Exam',
      date: '2026-08-22',
      time: '10:00 AM',
      location: 'Ramanujan IT-304',
      category: 'exam',
      requirements: 'Hall ticket mandatory',
      sourceNoticeTitle: 'Official CoE Exam Schedule',
      addedAt: 'Yesterday'
    },
    {
      id: 'cal_2',
      title: 'Condonation Form Submission Deadline',
      date: '2026-08-15',
      time: '05:00 PM',
      location: 'HOD CSE Office',
      category: 'submission',
      requirements: 'Medical certificate & Rs 500 fee receipt',
      sourceNoticeTitle: 'HOD CSE Circular',
      addedAt: 'Today'
    }
  ]);

  // Accessibility State with localStorage persistence
  const [accessibility, setAccessibility] = useState<AccessibilityConfig>(() => {
    try {
      const saved = localStorage.getItem('campusos_accessibility_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading accessibility settings from localStorage:', e);
    }
    return {
      theme: 'dark',
      colorblindMode: 'normal',
      reducedMotion: false,
      reducedTransparency: false,
      highContrastText: false,
      screenReaderEnabled: false,
      speechRate: 1.0
    };
  });

  // Effect to save accessibility settings whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('campusos_accessibility_config', JSON.stringify(accessibility));
    } catch (e) {
      console.error('Error saving accessibility settings to localStorage:', e);
    }
  }, [accessibility]);

  // Modal Visibility State
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [showTestSuiteModal, setShowTestSuiteModal] = useState(false);
  const [showSecretsModal, setShowSecretsModal] = useState(false);
  const [showVoiceCompanion, setShowVoiceCompanion] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);

  // Conversation Stream
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: `Hello ${INITIAL_USER.name}! I am CampusOS v2, your Smart Campus Multi-Agent AI System for Vasavi College of Engineering.

I coordinate 9 specialized agents across academics, real-time class reminders, sports court reservations, faculty directory lookup, and administrative processes. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  // Load server status & health check on startup
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.hasGeminiKey) setHasGeminiKey(true);
      })
      .catch((err) => console.log('Server health check completed.'));

    fetchSlots();
    fetchNotifications();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await fetch('/api/sports/slots');
      const data = await res.json();
      if (data.slots) setSlots(data.slots);
      if (data.courts) setCourts(data.courts);
    } catch (e) {
      console.log('Using local sports slots.');
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.nextClass) setNextClass(data.nextClass);
      if (data.alerts) setAlerts(data.alerts);
    } catch (e) {
      console.log('Using local notifications.');
    }
  };

  // Dispatch message to Orchestrator API endpoint
  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          activeUserRole: currentUser.role,
          userBranch: currentUser.branch
        })
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: `msg_a_${Date.now()}`,
        sender: 'assistant',
        text: data.responseContent,
        timestamp: new Date().toLocaleTimeString(),
        plan: {
          id: data.id,
          query: text,
          orchestratorReasoning: data.orchestratorReasoning,
          steps: data.steps || []
        },
        citations: data.citations || [],
        approval: data.approvalAction || undefined
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: `msg_err_${Date.now()}`,
        sender: 'assistant',
        text: 'Apologies, I encountered a temporary connection issue. Retrying multi-agent orchestration...',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  // Human-in-the-Loop Action Approval
  const handleApproveAction = (approvalId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.approval && m.approval.id === approvalId) {
          return {
            ...m,
            approval: { ...m.approval, approved: true }
          };
        }
        return m;
      })
    );

    // Refresh slots
    fetchSlots();
  };

  const handleRejectAction = (approvalId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.approval && m.approval.id === approvalId) {
          return {
            ...m,
            approval: { ...m.approval, rejected: true }
          };
        }
        return m;
      })
    );
  };

  // Trigger real-time alert
  const handleTriggerAlert = async (
    title: string,
    message: string,
    type: 'class' | 'court' | 'placement' | 'exam' | 'urgent'
  ) => {
    try {
      const res = await fetch('/api/notifications/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message, type })
      });
      const data = await res.json();
      if (data.alert) {
        setAlerts((prev) => [data.alert, ...prev]);
      }
    } catch (e) {
      setAlerts((prev) => [
        {
          id: `alt_${Date.now()}`,
          title,
          message,
          type,
          timestamp: 'Just now',
          read: false
        },
        ...prev
      ]);
    }
  };

  const handlePostAnnouncement = (title: string, message: string, priority: 'low' | 'medium' | 'high' | 'urgent') => {
    const newAlert: CampusAlertNotification = {
      id: `anc_${Date.now()}`,
      title: `📢 ${title}`,
      message,
      type: priority === 'urgent' ? 'urgent' : 'class',
      timestamp: 'Just now',
      read: false
    };

    setAlerts((prev) => [newAlert, ...prev]);

    fetch('/api/notifications/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `📢 ${title}`,
        message,
        type: priority === 'urgent' ? 'urgent' : 'class'
      })
    }).catch((err) => console.log('Notice sync error:', err));
  };

  const handleUpdateStudentAttendance = (studentId: string, subjectCode: string, newPercentage: number) => {
    if (studentId === currentUser.id || studentId === 'usr_001') {
      setCurrentUser((prev) => ({
        ...prev,
        attendancePercentage: newPercentage
      }));
    }
  };

  const handleAddCalendarEvent = (newEvent: PersonalCalendarEvent) => {
    setCalendarEvents((prev) => [newEvent, ...prev]);
  };

  // Build root CSS classes for Theme & Colorblind matrix filters
  const rootThemeClass = accessibility.theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900';
  const colorblindFilterClass =
    accessibility.colorblindMode !== 'normal'
      ? `colorblind-${accessibility.colorblindMode}`
      : '';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${rootThemeClass} ${colorblindFilterClass}`}>
      {/* Root SVG Filter Definitions for Colorblind Modes */}
      <ColorblindSVGFilters />

      {/* Header Bar */}
      <Header
        currentUser={currentUser}
        onUserChange={(user) => {
          setCurrentUser(user);
          handleSendMessage(`Switched profile to ${user.name} (${user.branch} - ${user.year}). What is my schedule?`);
        }}
        accessibility={accessibility}
        onToggleTheme={() =>
          setAccessibility((prev) => ({
            ...prev,
            theme: prev.theme === 'dark' ? 'light' : 'dark'
          }))
        }
        onOpenAccessibility={() => setShowAccessibilityPanel(true)}
        onOpenVoiceCompanion={() => setShowVoiceCompanion(true)}
        onOpenTestSuite={() => setShowTestSuiteModal(true)}
        onOpenSecrets={() => setShowSecretsModal(true)}
        unreadAlertsCount={alerts.filter((a) => !a.read).length}
        onOpenNotifications={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
        hasGeminiKey={hasGeminiKey}
      />

      {/* Real-time Class Notification Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <ClassNotificationBanner
          nextClass={nextClass}
          alerts={alerts}
          onTriggerAlert={handleTriggerAlert}
          onAskAgentAboutClass={(courseCode) =>
            handleSendMessage(`Where is my next class for ${courseCode} and what is my attendance eligibility?`)
          }
          accessibilityTransparency={accessibility.reducedTransparency}
        />
      </motion.div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
        {/* Smarter Next Class Countdown Widget */}
        <motion.section
          aria-label="Smarter Next Class Countdown"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <NextClassWidget
            currentUser={currentUser}
            accessibilityTransparency={accessibility.reducedTransparency}
          />
        </motion.section>

        {/* Premium Audio Studio & Soundscape Header */}
        <motion.section
          aria-label="CampusOS Hi-Fi Audio Studio Bar"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <PremiumAudioHeader
            activeVoiceMode={showVoiceCompanion}
            onToggleVoiceMode={() => setShowVoiceCompanion(!showVoiceCompanion)}
            accessibilityTransparency={accessibility.reducedTransparency}
          />
        </motion.section>

        {/* Agent Conversational & Execution Surface */}
        <motion.section
          aria-label="Multi-Agent Conversational AI Studio"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <AgentOrchestrator
            messages={messages}
            onSendMessage={handleSendMessage}
            onApproveAction={handleApproveAction}
            onRejectAction={handleRejectAction}
            currentUser={currentUser}
            accessibilityTransparency={accessibility.reducedTransparency}
          />
        </motion.section>

        {/* Weekly Attendance Heatmap (Recharts) & Read-Only Log */}
        <motion.section
          aria-label="Weekly Attendance Heatmap and Student Log"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <AttendanceHeatmap
            currentUser={currentUser}
            accessibilityTransparency={accessibility.reducedTransparency}
            onAskAgentAboutAttendance={(query) => handleSendMessage(query)}
          />
        </motion.section>

        {/* Notice & Circular AI Camera OCR Scanner */}
        <motion.section
          aria-label="Notice and Circular Camera Scanner"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <NoticeScannerCameraWidget
            accessibilityTransparency={accessibility.reducedTransparency}
            onAddCalendarEvent={handleAddCalendarEvent}
            onAddAlertStream={(title, message, priority) => handlePostAnnouncement(title, message, priority)}
            calendarEvents={calendarEvents}
          />
        </motion.section>

        {/* TPO Placement Eligibility & Career Guidance Engine */}
        <motion.section
          aria-label="Placement Guidance and Drive Eligibility Checker"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <PlacementGuidanceWidget
            currentUser={currentUser}
            accessibilityTransparency={accessibility.reducedTransparency}
            onAskAgentForGuidance={(query) => handleSendMessage(query)}
          />
        </motion.section>

        {/* Campus Admin & Faculty Control Desk */}
        <motion.section
          aria-label="Campus Admin and Faculty Dispatch Desk"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <AdminDeskPortal
            currentUser={currentUser}
            accessibilityTransparency={accessibility.reducedTransparency}
            onPostAnnouncement={handlePostAnnouncement}
            onUpdateStudentAttendance={handleUpdateStudentAttendance}
            sportsSlots={slots}
            sportsCourts={courts}
          />
        </motion.section>

        {/* Real-time Sports Court & Turf Booking Engine */}
        <motion.section
          aria-label="Sports Court and Turf Reservation Engine"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SportsBookingWidget
            courts={courts}
            slots={slots}
            onBookSlot={async (courtId, timeSlot) => {
              await fetchSlots();
            }}
            accessibilityTransparency={accessibility.reducedTransparency}
            onAskAgentToBook={(courtName, slotTime) =>
              handleSendMessage(`Book a slot for ${courtName} at ${slotTime} today.`)
            }
          />
        </motion.section>

        {/* Campus Directory: Faculty, Admin Task Map, Labs & Clubs */}
        <motion.section
          aria-label="Faculty Directory and Campus Navigator"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <FacultyAndAdminDirectory
            accessibilityTransparency={accessibility.reducedTransparency}
            onAskAgentAboutContact={(query) => handleSendMessage(query)}
          />
        </motion.section>
      </main>

      {/* Floating AI Academic Doubts Chatbox */}
      <AIDoubtChatbox accessibilityTransparency={accessibility.reducedTransparency} />


      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="border-t border-white/10 py-8 text-center text-xs text-[#9ca3af] bg-[#050505]"
      >
        <p>
          <strong className="text-white">CampusOS v2</strong> — Built by Team Akul, Vasavi College of Engineering for AgentX National Hackathon 2026.
        </p>
        <p className="mt-1">
          WCAG 2.1 AA Inclusive Design • Real-time Multi-Agent Architecture • Generative UI
        </p>
      </motion.footer>

      {/* Modals */}
      {showAccessibilityPanel && (
        <AccessibilityPanel
          config={accessibility}
          onChange={(newCfg) => setAccessibility(newCfg)}
          onClose={() => setShowAccessibilityPanel(false)}
        />
      )}

      {showTestSuiteModal && (
        <TestSuiteModal
          onClose={() => setShowTestSuiteModal(false)}
          onSelectUser={(u) => {
            setCurrentUser(u);
            setShowTestSuiteModal(false);
          }}
          onTriggerNotification={handleTriggerAlert}
          onRunConflictTest={() => {
            fetch('/api/sports/book', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                courtId: 'crt_badminton_1',
                timeSlot: '17:00' // Pre-locked slot
              })
            }).then(() => fetchSlots());
          }}
          onRunWorkflowTest={(query) => handleSendMessage(query)}
          onRunOCRTest={(sample) =>
            handleSendMessage(`Perform OCR scan on this campus document: "${sample}" and explain regulations.`)
          }
        />
      )}

      {showSecretsModal && (
        <SecretsModal
          onClose={() => setShowSecretsModal(false)}
          hasGeminiKey={hasGeminiKey}
        />
      )}

      {showNotificationsDrawer && (
        <NotificationsDrawer
          alerts={alerts}
          onClose={() => setShowNotificationsDrawer(false)}
          onMarkAllAsRead={() => {
            setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
          }}
          onClearAll={() => setAlerts([])}
        />
      )}

      {showVoiceCompanion && (
        <VoiceAssistantCompanion
          onClose={() => setShowVoiceCompanion(false)}
          onSendMessage={handleSendMessage}
          lastResponseText={
            messages.filter((m) => m.sender === 'assistant').slice(-1)[0]?.text
          }
        />
      )}
    </div>
  );
}
