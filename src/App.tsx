import React, { useState, useEffect } from 'react';
import {
  Header
} from './components/Header';
import { ClassNotificationBanner } from './components/ClassNotificationBanner';
import { SportsBookingWidget } from './components/SportsBookingWidget';
import { AgentOrchestrator } from './components/AgentOrchestrator';
import { FacultyAndAdminDirectory } from './components/FacultyAndAdminDirectory';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { TestSuiteModal } from './components/TestSuiteModal';
import { SecretsModal } from './components/SecretsModal';
import { VoiceAssistantCompanion } from './components/VoiceAssistantCompanion';
import { ColorblindSVGFilters } from './components/ColorblindSVGFilters';

import {
  UserProfile,
  Message,
  ClassSession,
  SportsCourt,
  TimeSlot,
  CampusAlertNotification,
  AccessibilityConfig
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

  // Accessibility State
  const [accessibility, setAccessibility] = useState<AccessibilityConfig>({
    theme: 'light',
    colorblindMode: 'normal',
    reducedMotion: false,
    reducedTransparency: false,
    highContrastText: false,
    screenReaderEnabled: false,
    speechRate: 1.0
  });

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
      <ClassNotificationBanner
        nextClass={nextClass}
        alerts={alerts}
        onTriggerAlert={handleTriggerAlert}
        onAskAgentAboutClass={(courseCode) =>
          handleSendMessage(`Where is my next class for ${courseCode} and what is my attendance eligibility?`)
        }
        accessibilityTransparency={accessibility.reducedTransparency}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
        {/* Agent Conversational & Execution Surface */}
        <section aria-label="Multi-Agent Conversational AI Studio">
          <AgentOrchestrator
            messages={messages}
            onSendMessage={handleSendMessage}
            onApproveAction={handleApproveAction}
            onRejectAction={handleRejectAction}
            currentUser={currentUser}
            accessibilityTransparency={accessibility.reducedTransparency}
          />
        </section>

        {/* Real-time Sports Court & Turf Booking Engine */}
        <section aria-label="Sports Court and Turf Reservation Engine">
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
        </section>

        {/* Campus Directory: Faculty, Admin Task Map, Labs & Clubs */}
        <section aria-label="Faculty Directory and Campus Navigator">
          <FacultyAndAdminDirectory
            accessibilityTransparency={accessibility.reducedTransparency}
            onAskAgentAboutContact={(query) => handleSendMessage(query)}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>
          <strong>CampusOS v2</strong> — Built by Team Akul, Vasavi College of Engineering for AgentX National Hackathon 2026.
        </p>
        <p className="mt-1">
          WCAG 2.1 AA Inclusive Design • Real-time Multi-Agent Architecture • Generative UI
        </p>
      </footer>

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
