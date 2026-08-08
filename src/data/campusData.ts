import {
  UserProfile,
  ClassSession,
  SportsCourt,
  TimeSlot,
  FacultyEntry,
  AdminTaskMap,
  ClubRegistry,
  LabResource,
  CampusAlertNotification,
  Citation
} from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_001',
  name: 'Rahul Sharma',
  email: 'rahul.s@vce.ac.in',
  role: 'student',
  branch: 'CSE',
  year: '3rd Year',
  rollNo: '1602-23-733-042',
  attendancePercentage: 73.5, // Just below 75% threshold to demonstrate condonation math!
  hosteler: true,
  interests: ['Machine Learning', 'Robotics', 'Badminton', 'Web Development']
};

export const DEMO_USERS: UserProfile[] = [
  INITIAL_USER,
  {
    id: 'usr_002',
    name: 'Ananya Rao',
    email: 'ananya.ece@vce.ac.in',
    role: 'student',
    branch: 'ECE',
    year: '2nd Year',
    rollNo: '1602-24-735-018',
    attendancePercentage: 84.2,
    hosteler: false,
    interests: ['Embedded Systems', 'IoT', 'Tennis', 'Cultural Events']
  },
  {
    id: 'usr_003',
    name: 'Dr. K. Srinivas',
    email: 'hod.cse@vce.ac.in',
    role: 'faculty',
    branch: 'CSE',
    year: 'Faculty',
    rollNo: 'FAC-CSE-001',
    attendancePercentage: 100,
    hosteler: false,
    interests: ['AI Research', 'Academic Governance']
  },
  {
    id: 'usr_004',
    name: 'TPO Officer Admin',
    email: 'placements@vce.ac.in',
    role: 'admin',
    branch: 'Training & Placement Cell',
    year: 'Admin',
    rollNo: 'ADM-TPO-001',
    attendancePercentage: 100,
    hosteler: false,
    interests: ['Corporate Relations', 'Placement Drives']
  }
];

export const INITIAL_CLASSES: ClassSession[] = [
  {
    id: 'cls_1',
    courseCode: 'CS301',
    courseName: 'Deep Learning & Multi-Agent AI',
    facultyName: 'Dr. K. Srinivas',
    facultyEmail: 'srinivas.k@vce.ac.in',
    room: 'IT-304',
    building: 'Ramanujan Block (IT/CSE)',
    startTime: '09:30 AM',
    endTime: '10:30 AM',
    dayOfWeek: 'Today',
    isNext: true,
    minutesRemaining: 15,
    status: 'upcoming',
    buildingDirections: {
      buildingName: 'Ramanujan Block (IT & CSE Wing)',
      roomNumber: 'IT-304',
      floorLevel: '3rd Floor (East Corridor)',
      totalDistanceMeters: 180,
      estimatedWalkMinutes: 2.5,
      startPoint: 'Central Canteen Plaza / Campus Main Gate',
      routeSteps: [
        {
          stepNumber: 1,
          instruction: 'Head East along paved Palm Tree Avenue toward Central Library Quad.',
          distanceMeter: 70,
          landmark: 'Pass Administrative Block entrance on left'
        },
        {
          stepNumber: 2,
          instruction: 'Turn North at Fountain Square past the Student Services Cell.',
          distanceMeter: 50,
          landmark: 'Fountain Square & ATM Kiosk'
        },
        {
          stepNumber: 3,
          instruction: 'Enter Ramanujan Block main glass archway (Portico A).',
          distanceMeter: 30,
          landmark: 'Portico A Glass Archway Entrance'
        },
        {
          stepNumber: 4,
          instruction: 'Take Elevator A / Central Stairs to 3rd Floor. Room IT-304 is the 2nd door on the left.',
          distanceMeter: 30,
          landmark: 'Elevator A & Room IT-304'
        }
      ],
      accessibilityRoute: 'Wheelchair ramp available at Portico A entrance. Take Elevator A to 3rd Floor.',
      mapCoordinates: { x: 65, y: 32 }
    }
  },
  {
    id: 'cls_2',
    courseCode: 'CS302',
    courseName: 'Cloud Computing & Microservices',
    facultyName: 'Prof. M. Sunitha',
    facultyEmail: 'sunitha.m@vce.ac.in',
    room: 'CS-102',
    building: 'Visvesvaraya Block',
    startTime: '10:45 AM',
    endTime: '11:45 AM',
    dayOfWeek: 'Today',
    isNext: false,
    status: 'upcoming',
    buildingDirections: {
      buildingName: 'Visvesvaraya Block (ECE / Civil Block)',
      roomNumber: 'CS-102',
      floorLevel: 'Ground Floor (Right Wing)',
      totalDistanceMeters: 120,
      estimatedWalkMinutes: 1.5,
      startPoint: 'Ramanujan Block Exit',
      routeSteps: [
        {
          stepNumber: 1,
          instruction: 'Exit Ramanujan Block South Door and walk towards Central Library Quad.',
          distanceMeter: 60,
          landmark: 'Central Library Quad'
        },
        {
          stepNumber: 2,
          instruction: 'Cross covered corridor into Visvesvaraya Block Entrance B.',
          distanceMeter: 40,
          landmark: 'Electronics Workshop Entrance B'
        },
        {
          stepNumber: 3,
          instruction: 'Room CS-102 is immediately on your right beside the Seminar Hall.',
          distanceMeter: 20,
          landmark: 'Seminar Hall 2'
        }
      ],
      accessibilityRoute: 'Ground Floor level access, no stairs required.',
      mapCoordinates: { x: 45, y: 55 }
    }
  },
  {
    id: 'cls_3',
    courseCode: 'CS303',
    courseName: 'Compiler Design Lab',
    facultyName: 'Dr. V. Rajesh',
    facultyEmail: 'rajesh.v@vce.ac.in',
    room: 'Lab 5 (CSE)',
    building: 'Software Complex 2nd Floor',
    startTime: '01:30 PM',
    endTime: '03:30 PM',
    dayOfWeek: 'Today',
    isNext: false,
    status: 'upcoming',
    buildingDirections: {
      buildingName: 'Software Complex (CSE Labs)',
      roomNumber: 'Lab 5',
      floorLevel: '2nd Floor (North Wing)',
      totalDistanceMeters: 220,
      estimatedWalkMinutes: 3,
      startPoint: 'Visvesvaraya Block',
      routeSteps: [
        {
          stepNumber: 1,
          instruction: 'Head North towards the FabLab Innovation Pavilion.',
          distanceMeter: 100,
          landmark: 'FabLab Pavilion'
        },
        {
          stepNumber: 2,
          instruction: 'Take covered walkway into Software Complex Block 2.',
          distanceMeter: 80,
          landmark: 'Software Complex Lobby'
        },
        {
          stepNumber: 3,
          instruction: 'Take Elevator / North Stairs to 2nd Floor. Lab 5 is directly in front.',
          distanceMeter: 40,
          landmark: 'CSE Lab 5 Gateway'
        }
      ],
      accessibilityRoute: 'Elevator available in Software Complex Block 2 Lobby.',
      mapCoordinates: { x: 80, y: 20 }
    }
  }
];

export const SPORTS_COURTS: SportsCourt[] = [
  {
    id: 'crt_badminton_1',
    name: 'Badminton Court 1 (Indoor)',
    type: 'Badminton',
    location: 'Campus Sports Complex - Hall A',
    maxCapacity: 4
  },
  {
    id: 'crt_badminton_2',
    name: 'Badminton Court 2 (Indoor)',
    type: 'Badminton',
    location: 'Campus Sports Complex - Hall A',
    maxCapacity: 4
  },
  {
    id: 'crt_basketball_1',
    name: 'Main Basketball Court',
    type: 'Basketball',
    location: 'Outdoor Sports Ground',
    maxCapacity: 10
  },
  {
    id: 'crt_tennis_1',
    name: 'Synthetic Tennis Court',
    type: 'Tennis',
    location: 'North Lawn Sports Area',
    maxCapacity: 4
  },
  {
    id: 'crt_turf_1',
    name: 'Mini Football Turf',
    type: 'Football Turf',
    location: 'South Campus Pavilion',
    maxCapacity: 14
  }
];

export const INITIAL_SLOTS: TimeSlot[] = [
  // Badminton Court 1
  { id: 's_bad_1_1600', courtId: 'crt_badminton_1', startTime: '16:00', endTime: '17:00', status: 'available' },
  { id: 's_bad_1_1700', courtId: 'crt_badminton_1', startTime: '17:00', endTime: '18:00', status: 'booked', bookedBy: 'Vikram Mehta', bookedByRoll: '1602-23-733-010' },
  { id: 's_bad_1_1800', courtId: 'crt_badminton_1', startTime: '18:00', endTime: '19:00', status: 'available' },
  { id: 's_bad_1_1900', courtId: 'crt_badminton_1', startTime: '19:00', endTime: '20:00', status: 'available' },

  // Badminton Court 2
  { id: 's_bad_2_1600', courtId: 'crt_badminton_2', startTime: '16:00', endTime: '17:00', status: 'available' },
  { id: 's_bad_2_1700', courtId: 'crt_badminton_2', startTime: '17:00', endTime: '18:00', status: 'available' },
  { id: 's_bad_2_1800', courtId: 'crt_badminton_2', startTime: '18:00', endTime: '19:00', status: 'booked', bookedBy: 'Srikant Verma', bookedByRoll: '1602-22-735-088' },

  // Basketball
  { id: 's_bask_1600', courtId: 'crt_basketball_1', startTime: '16:00', endTime: '17:30', status: 'available' },
  { id: 's_bask_1730', courtId: 'crt_basketball_1', startTime: '17:30', endTime: '19:00', status: 'reserved', bookedBy: 'College Team Practice' },

  // Tennis
  { id: 's_ten_1600', courtId: 'crt_tennis_1', startTime: '16:00', endTime: '17:00', status: 'available' },
  { id: 's_ten_1700', courtId: 'crt_tennis_1', startTime: '17:00', endTime: '18:00', status: 'available' },

  // Turf
  { id: 's_turf_1700', courtId: 'crt_turf_1', startTime: '17:00', endTime: '18:30', status: 'available' },
  { id: 's_turf_1830', courtId: 'crt_turf_1', startTime: '18:30', endTime: '20:00', status: 'available' }
];

export const FACULTY_DIRECTORY: FacultyEntry[] = [
  {
    id: 'fac_1',
    name: 'Dr. K. Srinivas',
    designation: 'HOD & Professor, CSE',
    department: 'Computer Science & Engineering',
    room: 'Ramanujan Block Room 301',
    officeHours: 'Mon-Fri 02:00 PM - 04:00 PM',
    contactEmail: 'srinivas.k@vce.ac.in',
    phoneExt: '401',
    responsibilities: ['Attendance Condonation', 'Academic Approvals', 'Makeup Exam Permissions', 'Elective Mapping']
  },
  {
    id: 'fac_2',
    name: 'Prof. L. N. Sastry',
    designation: 'Head of Training & Placement',
    department: 'Placement Cell',
    room: 'Placement Block Room 102',
    officeHours: 'Daily 11:00 AM - 01:00 PM',
    contactEmail: 'placements@vce.ac.in',
    phoneExt: '105',
    responsibilities: ['Placement Grievances', 'Company Eligibility Verification', 'NOC for Internships']
  },
  {
    id: 'fac_3',
    name: 'Dr. P. V. Ramana',
    designation: 'Dean Student Affairs',
    department: 'Student Affairs & Administration',
    room: 'Administrative Block 1st Floor',
    officeHours: 'Tue & Thu 03:00 PM - 05:00 PM',
    contactEmail: 'dean.sa@vce.ac.in',
    phoneExt: '202',
    responsibilities: ['Scholarships', 'Hostel Disputes', 'Club Advisor Approvals', 'Bonafide Certificates']
  },
  {
    id: 'fac_4',
    name: 'Mr. B. Ravinder',
    designation: 'Chief Warden & Hostel Admin',
    department: 'Hostel Management',
    room: 'Hostel Office (Boys Hostel Block A)',
    officeHours: 'Mon-Sat 09:00 AM - 01:00 PM',
    contactEmail: 'warden@vce.ac.in',
    phoneExt: '501',
    responsibilities: ['Room Allotment', 'Mess Grievances', 'Outstation Out-Pass Approval']
  },
  {
    id: 'fac_5',
    name: 'Dr. M. Veeresh',
    designation: 'Sports Director & Physical Education Head',
    department: 'Physical Education',
    room: 'Sports Complex Office',
    officeHours: 'Daily 03:00 PM - 06:00 PM',
    contactEmail: 'sports@vce.ac.in',
    phoneExt: '601',
    responsibilities: ['Sports Court Booking Overrides', 'Inter-College Tournament Approvals', 'Equipment Issue']
  }
];

export const ADMIN_TASK_MAP: AdminTaskMap[] = [
  {
    id: 'adm_1',
    taskName: 'Attendance Condonation & Medical Leave',
    officeWindow: 'Academic Section, Window 3',
    responsiblePerson: 'Mr. Suresh (Academic Assistant) & Approved by HOD',
    requiredDocuments: ['Medical Certificate from Civil Surgeon / Hospital', 'Condonation Application Form', 'Fee Receipt (₹1,000 condonation fee)'],
    estimatedProcessingTime: '2 Working Days',
    instructions: 'Get form signed by HOD first, pay condonation fee at Counter 1, then submit at Window 3.'
  },
  {
    id: 'adm_2',
    taskName: 'Bonafide Certificate / Railway Concession',
    officeWindow: 'Student Services Cell, Window 1',
    responsiblePerson: 'Mrs. Lakshmi (Student Service Exec)',
    requiredDocuments: ['Student ID Card Copy', 'Fee Paid Receipt copy'],
    estimatedProcessingTime: 'Same Day (2 Hours)',
    instructions: 'Fill online request on portal or hand in form at Window 1 before 12:00 PM.'
  },
  {
    id: 'adm_3',
    taskName: 'No Objection Certificate (NOC) for Internship',
    officeWindow: 'Placement Office, Counter 2',
    responsiblePerson: 'Prof. L. N. Sastry (TPO Head)',
    requiredDocuments: ['Official Offer Letter from Company', 'Academic Clearance Form signed by HOD'],
    estimatedProcessingTime: '3 Working Days',
    instructions: 'Upload offer letter on TPO portal, forward to HOD, then collect NOC from TPO Office.'
  },
  {
    id: 'adm_4',
    taskName: 'Duplicate ID Card Reissue',
    officeWindow: 'Admin Block, Counter 4',
    responsiblePerson: 'Mr. Prakash (Card Printing In-charge)',
    requiredDocuments: ['Police FIR Copy (if lost)', 'Challan Receipt of ₹250', 'Passport Photo'],
    estimatedProcessingTime: '2 Working Days',
    instructions: 'Pay challan at Bank Counter on campus, bring receipt to Counter 4.'
  }
];

export const CLUB_REGISTRY: ClubRegistry[] = [
  {
    id: 'clb_1',
    name: 'Google Developer Student Club (GDSC VCE)',
    category: 'Technical & AI',
    advisorName: 'Dr. K. Srinivas (CSE)',
    joiningFee: 'Free',
    eligibility: 'All Engineering Students (1st-4th Year)',
    registrationLink: 'https://vce.ac.in/clubs/gdsc',
    description: 'Focuses on Cloud, Mobile, Web, and Agentic AI development. Organizes hackathons and workshops.'
  },
  {
    id: 'clb_2',
    name: 'IEEE VCE Student Branch & Robotics Club',
    category: 'Robotics & Hardware',
    advisorName: 'Prof. A. Nagesh (ECE)',
    joiningFee: '₹500 / year',
    eligibility: 'CSE, ECE, EEE, IT, Mechanical',
    registrationLink: 'https://vce.ac.in/clubs/ieee',
    description: 'Hands-on hardware fabrication, IoT projects, microcontrollers, and PCB design sessions.'
  },
  {
    id: 'clb_3',
    name: 'Vasavi Sports & Athletics Association',
    category: 'Sports & Fitness',
    advisorName: 'Dr. M. Veeresh (Physical Ed)',
    joiningFee: 'Free',
    eligibility: 'Open to all students',
    registrationLink: 'https://vce.ac.in/sports',
    description: 'Coordinates inter-college tournaments, badminton leagues, football cups, and daily sports facility usage.'
  }
];

export const LAB_RESOURCES: LabResource[] = [
  {
    id: 'lab_1',
    labName: 'FabLab & Prototype Development Center',
    department: 'Mechanical / Interdisciplinary',
    location: 'Ramanujan Block Ground Floor',
    equipment: ['Ultimaker 3D Printers', 'Laser Cutters', 'CNC Router', 'Electronic Soldering Stations'],
    projectSupportTags: ['3D Printing', 'Fabrication', 'Material Procurement', 'Enclosure Design'],
    labInCharge: 'Mr. N. Ramesh (Lab Superintendent)',
    accessProcedure: 'Submit CAD file via portal or approach Mr. Ramesh with project approval form.'
  },
  {
    id: 'lab_2',
    labName: 'AI & High-Performance Compute Lab',
    department: 'CSE / IT',
    location: 'IT Building 2nd Floor (Lab 7)',
    equipment: ['4x NVIDIA RTX 4090 Workstations', 'Deep Learning Server', 'High-Speed SAN Storage'],
    projectSupportTags: ['AI Compute', 'Model Training', 'PyTorch / TensorFlow', 'Dataset Hosting'],
    labInCharge: 'Dr. K. Srinivas',
    accessProcedure: 'Faculty recommendation required for compute allocation.'
  },
  {
    id: 'lab_3',
    labName: 'Cadence VLSI & Microelectronics Lab',
    department: 'ECE',
    location: 'Visvesvaraya Block 3rd Floor',
    equipment: ['Cadence EDA Suite Licenses', 'Xilinx FPGA Boards', 'Digital Storage Oscilloscopes'],
    projectSupportTags: ['Chip Design', 'FPGA Testing', 'Cadence License', 'Sensor Interfacing'],
    labInCharge: 'Dr. V. Rajesh',
    accessProcedure: 'ECE 3rd/4th year students or project team access via ECE HOD note.'
  }
];

export const INSTITUTIONAL_CITATIONS: Citation[] = [
  {
    documentTitle: 'Vasavi Academic Regulations 2026 (Clause 4.2)',
    clause: 'Attendance Eligibility & Condonation Policy',
    snippet: 'Minimum required attendance per semester is 75%. Condonation of shortage up to 10% (i.e. between 65% and 74.9%) may be granted by HOD/Principal on genuine medical grounds upon submission of valid Civil Surgeon medical certificate and payment of prescribed condonation fee of ₹1,000.',
    relevanceScore: 0.96
  },
  {
    documentTitle: 'VCE Placement Policy Handbook 2026 (Section 3.1)',
    clause: 'Company Eligibility Criteria',
    snippet: 'Students with CGPA >= 7.5 and no active backlogs are eligible for Tier-1 Google, Microsoft, and Amazon campus recruitment drives. Attendance in placement preparation workshops is mandatory.',
    relevanceScore: 0.92
  },
  {
    documentTitle: 'Campus Sports & Facility Rules 2026 (Rule 8)',
    clause: 'Sports Court Booking & Fair Allocation',
    snippet: 'Indoor Badminton courts and Football Turf slots must be reserved through the CampusOS agent or Sports Office up to 24 hours in advance. Maximum duration per student is 1 hour per day. Overlapping bookings for the same court result in automatic conflict resolution.',
    relevanceScore: 0.94
  }
];

export const INITIAL_ALERTS: CampusAlertNotification[] = [
  {
    id: 'alt_1',
    title: '🔔 Class Reminder: Deep Learning in 10 mins',
    message: 'Your next class "Deep Learning & Multi-Agent AI" starts at 09:30 AM in Room IT-304 (Ramanujan Block). Attendance current: 73.5%.',
    type: 'class',
    timestamp: 'Just now',
    read: false,
    actionUrl: '/class/CS301'
  },
  {
    id: 'alt_2',
    title: '🏸 Badminton Court Slot Available',
    message: 'Slot 16:00 - 17:00 on Badminton Court 1 is open for booking. Reserve now with Sports Booking Agent.',
    type: 'court',
    timestamp: '15 mins ago',
    read: false,
    actionUrl: '/sports'
  },
  {
    id: 'alt_3',
    title: '💼 Google Placement Eligibility Verified',
    message: 'You meet the CGPA (8.2/10) requirement for Google SDE Internship drive tomorrow. Workshop registration open.',
    type: 'placement',
    timestamp: '1 hour ago',
    read: true,
    actionUrl: '/placements'
  }
];
