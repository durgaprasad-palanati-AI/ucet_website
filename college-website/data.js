// ============================================================
//  DATA.JS  —  Edit this file OR use the Admin Panel
//  All website content is stored here
// ============================================================

const COLLEGE_DATA = {

  // ── BASIC INFO ──────────────────────────────────────────
  info: {
    name: "Sri Venkateswara College",
    tagline: "of Engineering & Technology",
    affiliation: "Affiliated to Osmania University | NAAC Accredited",
    phone: "+91 98765 43210",
    email: "info@college.edu.in",
    address: "Nalgonda, Telangana - 508001",
    hours: "Mon–Sat: 9:00 AM – 5:00 PM",
    founded: "1999",
    footerDesc: "Committed to academic excellence and holistic development since 1999."
  },

  // ── HERO SECTION ────────────────────────────────────────
  hero: {
    sub: "Welcome to Excellence in Education",
    title: "Shaping Tomorrow's Leaders",
    desc: "Empowering students with knowledge, values, and skills to excel in the modern world.",
    stats: [
      { num: "25+", label: "Years" },
      { num: "5000+", label: "Students" },
      { num: "200+", label: "Faculty" },
      { num: "95%", label: "Placement" }
    ]
  },

  // ── ABOUT ────────────────────────────────────────────────
  about: {
    para1: "Founded with a vision to provide world-class education, our college has been a beacon of academic excellence for over two decades. We are committed to nurturing talent and building character.",
    para2: "Our state-of-the-art infrastructure, experienced faculty, and industry-oriented curriculum prepare students for the challenges of the modern world.",
    highlights: [
      "NAAC A+ Accredited",
      "NBA Accredited Programs",
      "ISO 9001:2015 Certified",
      "100% Wi-Fi Campus"
    ]
  },

  // ── MARQUEE / LATEST NEWS ────────────────────────────────
  marquee: [
    "Admissions Open for 2025-26 Batch",
    "Annual Sports Day on 15th March",
    "Placement Drive: TCS & Infosys on 20th Feb",
    "NAAC Peer Team Visit Scheduled",
    "New Computer Lab inaugurated with 120 systems",
    "Scholarship applications invited for SC/ST students"
  ],

  // ── DEPARTMENTS ─────────────────────────────────────────
  departments: [
    { name: "Computer Science", icon: "fas fa-laptop-code", intake: "120 seats", about: "B.Tech / M.Tech" },
    { name: "Electronics & Comm.", icon: "fas fa-microchip", intake: "60 seats", about: "B.Tech / M.Tech" },
    { name: "Mechanical Engg.", icon: "fas fa-cogs", intake: "60 seats", about: "B.Tech" },
    { name: "Civil Engineering", icon: "fas fa-hard-hat", intake: "60 seats", about: "B.Tech" },
    { name: "Electrical Engg.", icon: "fas fa-bolt", intake: "60 seats", about: "B.Tech" },
    { name: "Information Tech.", icon: "fas fa-network-wired", intake: "60 seats", about: "B.Tech" },
    { name: "MBA", icon: "fas fa-briefcase", intake: "60 seats", about: "Post Graduate" },
    { name: "MCA", icon: "fas fa-code", intake: "30 seats", about: "Post Graduate" }
  ],

  // ── FACULTY ──────────────────────────────────────────────
  faculty: [
    { name: "Dr. K. Ramaiah", designation: "Principal", dept: "Administration", qual: "Ph.D, M.Tech", photo: "" },
    { name: "Dr. S. Lakshmi", designation: "HOD - CSE", dept: "CSE", qual: "Ph.D, M.Tech", photo: "" },
    { name: "Prof. R. Nagaraju", designation: "HOD - ECE", dept: "ECE", qual: "M.Tech", photo: "" },
    { name: "Dr. V. Suresh", designation: "HOD - Mech", dept: "Mechanical", qual: "Ph.D", photo: "" },
    { name: "Prof. A. Padmavathi", designation: "Sr. Professor", dept: "CSE", qual: "M.Tech, MBA", photo: "" },
    { name: "Dr. B. Ravi Kumar", designation: "Associate Prof.", dept: "Civil", qual: "Ph.D, M.E.", photo: "" },
    { name: "Prof. C. Mounika", designation: "Assistant Prof.", dept: "ECE", qual: "M.Tech", photo: "" },
    { name: "Prof. D. Srinivas", designation: "Assistant Prof.", dept: "Electrical", qual: "M.Tech", photo: "" }
  ],

  // ── NOTICES ──────────────────────────────────────────────
  notices: [
    { date: "10 Jan", title: "Semester Exams Timetable", body: "B.Tech I, II, III & IV year semester examinations timetable released.", isNew: true, link: "" },
    { date: "08 Jan", title: "Internal Marks Submission", body: "Last date for internal marks submission is 15th January.", isNew: true, link: "" },
    { date: "05 Jan", title: "Fee Payment Deadline", body: "Second installment of tuition fee due by 20th January.", isNew: false, link: "" },
    { date: "01 Jan", title: "Winter Break Notice", body: "College will remain closed from Jan 1–3 for winter holidays.", isNew: false, link: "" }
  ],

  // ── CIRCULARS ────────────────────────────────────────────
  circulars: [
    { date: "09 Jan", title: "Anti-Ragging Committee Meeting", body: "All department heads must attend the anti-ragging committee meeting on 12th Jan.", isNew: true, link: "" },
    { date: "07 Jan", title: "Faculty Professional Development", body: "FDP on 'AI in Education' scheduled for 18-20 January.", isNew: true, link: "" },
    { date: "03 Jan", title: "Library Hours Extended", body: "Library will remain open till 8:00 PM from January onwards.", isNew: false, link: "" }
  ],

  // ── EVENTS ───────────────────────────────────────────────
  events: [
    { date: "15 Jan", title: "Annual Cultural Fest - UTSAV 2025", body: "Two-day cultural extravaganza with competitions, performances and prize distribution.", isNew: true, link: "" },
    { date: "20 Jan", title: "Technical Symposium - TECHVISION", body: "Paper presentations, project expo, and hackathon for all engineering students.", isNew: true, link: "" },
    { date: "25 Jan", title: "Sports Day 2025", body: "Annual sports meet with inter-department competitions.", isNew: false, link: "" }
  ],

  // ── GALLERY ──────────────────────────────────────────────
  gallery: [
    // Add image URLs or file paths here
    // Example: { url: "images/photo1.jpg", caption: "Science Lab" }
  ],

  // ── FOOTER LINKS ─────────────────────────────────────────
  footerLinks: [
    { label: "Admission Portal", url: "#" },
    { label: "Exam Results", url: "#" },
    { label: "Library", url: "#" },
    { label: "Alumni", url: "#" },
    { label: "NIRF Data", url: "#" }
  ],

  // ── SOCIAL LINKS ─────────────────────────────────────────
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    twitter: "#"
  }
};
