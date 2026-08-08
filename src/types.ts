export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch: string; // e.g. 'CSE', 'ECE', 'IT'
  year: string; // e.g. '3rd Year', '2nd Year'
  rollNo: string;
  attendancePercentage: number;
  hosteler: boolean;
  interests: string[];
}

export interface ClassSession {
  id: string;
  courseCode: string;
  courseName: string;
  facultyName: string;
  facultyEmail: string;
  room: string;
  building: string;
  startTime: string; // e.g. '09:30 AM'
  endTime: string; // e.g. '10:30 AM'
  dayOfWeek: string;
  isNext: boolean;
  minutesRemaining?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'rescheduled';
  buildingDirections?: BuildingDirections;
}

export interface RouteStep {
  stepNumber: number;
  instruction: string;
  distanceMeter: number;
  landmark: string;
}

export interface BuildingDirections {
  buildingName: string;
  roomNumber: string;
  floorLevel: string;
  totalDistanceMeters: number;
  estimatedWalkMinutes: number;
  startPoint: string;
  routeSteps: RouteStep[];
  accessibilityRoute: string; // Elevator / Ramp details
  mapCoordinates: { x: number; y: number }; // Percentage for schematic campus map placement
}

export type CourtType = 'Badminton' | 'Basketball' | 'Tennis' | 'Football Turf';

export interface SportsCourt {
  id: string;
  name: string;
  type: CourtType;
  location: string;
  maxCapacity: number;
}

export interface TimeSlot {
  id: string;
  courtId: string;
  startTime: string; // e.g. '16:00'
  endTime: string; // e.g. '17:00'
  status: 'available' | 'booked' | 'maintenance' | 'reserved';
  bookedBy?: string;
  bookedByRoll?: string;
  bookingTime?: string;
}

export interface AgentStep {
  agentName: string;
  action: string;
  thought: string;
  toolUsed?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  explanation?: string;
}

export interface ExecutionPlan {
  id: string;
  query: string;
  orchestratorReasoning: string;
  steps: AgentStep[];
  citations?: Citation[];
  requiresApproval?: boolean;
  approvalAction?: PendingApproval;
}

export interface Citation {
  documentTitle: string;
  clause: string;
  snippet: string;
  relevanceScore: number;
}

export interface PendingApproval {
  id: string;
  type: 'BOOK_COURT' | 'SEND_EMAIL' | 'REGISTER_WORKSHOP' | 'SCHEDULE_CALENDAR' | 'SUBMIT_GRIEVANCE';
  title: string;
  description: string;
  details: Record<string, any>;
  riskLevel: 'low' | 'medium' | 'high';
  approved?: boolean;
  rejected?: boolean;
}

export interface FacultyEntry {
  id: string;
  name: string;
  designation: string;
  department: string;
  room: string;
  officeHours: string;
  contactEmail: string;
  phoneExt: string;
  responsibilities: string[]; // e.g. ['Attendance Condonation', 'Lab Approvals']
}

export interface AdminTaskMap {
  id: string;
  taskName: string;
  officeWindow: string;
  responsiblePerson: string;
  requiredDocuments: string[];
  estimatedProcessingTime: string;
  instructions: string;
}

export interface ClubRegistry {
  id: string;
  name: string;
  category: string;
  advisorName: string;
  joiningFee: string;
  eligibility: string;
  registrationLink: string;
  description: string;
}

export interface LabResource {
  id: string;
  labName: string;
  department: string;
  location: string;
  equipment: string[];
  projectSupportTags: string[]; // e.g. ['3D Printing', 'PCB Testing', 'AI Compute']
  labInCharge: string;
  accessProcedure: string;
}

export interface NoticeAttachment {
  name: string;
  url?: string;
  fileType: 'pdf' | 'image' | 'document';
  docCategory: 'Notice' | 'Timetable' | 'Syllabus' | 'Announcement';
  fileSize?: string;
}

export interface CampusAlertNotification {
  id: string;
  title: string;
  message: string;
  type: 'class' | 'court' | 'placement' | 'exam' | 'urgent';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  targetSection?: 'circulars' | 'attendance' | 'sports' | 'placement' | 'calendar';
  attachment?: NoticeAttachment;
}

export type ColorblindMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'highcontrast';

export interface AccessibilityConfig {
  theme: 'light' | 'dark';
  colorblindMode: ColorblindMode;
  reducedMotion: boolean;
  reducedTransparency: boolean;
  highContrastText: boolean;
  screenReaderEnabled: boolean;
  speechRate: number;
}

export interface AccessibilityAuditResult {
  passedCount: number;
  warningCount: number;
  failedCount: number;
  scorePercentage: number;
  audits: {
    rule: string;
    description: string;
    status: 'pass' | 'warn' | 'fail';
    elementTarget?: string;
  }[];
}

export interface WeeklyAttendanceDay {
  day: string;
  shortDay: string;
  presentClasses: number;
  totalClasses: number;
  percentage: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  attendedClasses: number;
  totalClasses: number;
  percentage: number;
  professor: string;
  isCondonationRisk: boolean;
  requiredClassesFor75: number;
}

export interface InterviewRoadmapStep {
  phase: string;
  focus: string;
  tasks: string[];
}

export interface InterviewRoadmap {
  companyId: string;
  companyName: string;
  role: string;
  technicalTopics: string[];
  aptitudeCodingPlan: string[];
  resumeFixes: string[];
  timeline: InterviewRoadmapStep[];
}

export interface PlacementCompany {
  id: string;
  companyName: string;
  logoUrl?: string;
  role: string;
  packageLpa: number;
  minCgpa: number;
  minAttendance: number;
  allowBacklogs: boolean;
  eligibleBranches: string[];
  driveDate: string;
  location: string;
  description: string;
  userEligible?: boolean;
  eligibilityReason?: string;
  roadmap?: InterviewRoadmap;
}

export interface AdminAnnouncement {
  id: string;
  title: string;
  message: string;
  postedBy: string;
  targetAudience: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  docCategory?: 'Notice' | 'Timetable' | 'Syllabus' | 'Announcement';
  timestamp: string;
  attachment?: NoticeAttachment;
}

export interface AcademicDoubt {
  id: string;
  subject: string;
  question: string;
  answer?: string;
  codeSnippet?: string;
  timestamp: string;
}

export interface PersonalCalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  category: 'exam' | 'submission' | 'fee' | 'event' | 'circular' | 'class';
  requirements?: string;
  sourceNoticeTitle?: string;
  addedAt: string;
  isManual?: boolean;
  reminderTriggered?: boolean;
}

export interface ExtractedNoticeData {
  title: string;
  category: string;
  summary: string;
  events: {
    title: string;
    date: string;
    time?: string;
    location?: string;
    details?: string;
  }[];
  alerts: {
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  }[];
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'agent-orchestrator';
  text: string;
  timestamp: string;
  plan?: ExecutionPlan;
  citations?: Citation[];
  approval?: PendingApproval;
  audioUrl?: string;
}
