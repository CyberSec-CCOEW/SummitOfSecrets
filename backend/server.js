const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─── FILESYSTEM DATA ────────────────────────────────────────────────────────
const FILESYSTEM = {
    'Company Files': {
        ico: '💼',
        files: [
            {
                name: 'Q1_Financial_Report.txt', ico: '📄', size: '14 KB', modified: 'Feb 20, 2026',
                content: `Q1 FINANCIAL REPORT — SUMMIT TECH SOLUTIONS
============================================
Period: January 1 – March 31, 2026
Prepared by: Finance Team
Status: DRAFT

REVENUE SUMMARY
---------------
Total Revenue:       ₹48,72,500
Product Sales:       ₹32,10,000
Service Contracts:   ₹12,40,500
Consulting Fees:     ₹4,22,000

EXPENSES
--------
Salaries & Wages:    ₹21,80,000
Infrastructure:      ₹4,60,000
Marketing:           ₹2,10,000
Miscellaneous:       ₹90,000
Total Expenses:      ₹29,40,000

NET PROFIT:          ₹19,32,500
Profit Margin:       39.6%

NOTES:
- Q1 exceeded targets by 12%
- New SummitOfSecrets contract worth ₹8L secured in March
- Recommend increasing infrastructure budget for Q2

Next review: April 5, 2026`
            },
            {
                name: 'Employee_Directory.txt', ico: '📄', size: '6 KB', modified: 'Feb 18, 2026',
                content: `EMPLOYEE DIRECTORY — SUMMIT TECH SOLUTIONS
==========================================
Last Updated: February 18, 2026

ENGINEERING
-----------
Arjun Kumar          | Senior Developer     | arjun.k@summittech.in
Arpita Sharma        | Frontend Engineer    | arpita.s@summittech.in
Karan Mehta          | Backend Developer    | karan.m@summittech.in
Priya Iyer           | DevOps Engineer      | priya.i@summittech.in
Rohan Desai          | Security Analyst     | rohan.d@summittech.in

MANAGEMENT
----------
Vikram Sharma        | CTO                  | v.sharma@summittech.in
Neha Joshi           | Product Manager      | neha.j@summittech.in

HR & OPERATIONS
---------------
Sunita Patil         | HR Manager           | sunita.p@summittech.in
Amit Kulkarni        | Office Manager       | amit.k@summittech.in

TOTAL HEADCOUNT: 9 Full-Time, 3 Contract
Office: Baner, Pune – 411045`
            },
            {
                name: 'Project_Proposal_SoS.txt', ico: '📄', size: '9 KB', modified: 'Jan 12, 2026',
                content: `PROJECT PROPOSAL
================
Project Name: Summit of Secrets (SoS)
Client: Internal / CyberSec Education Division
Lead Developer: Arjun Kumar
Status: IN PROGRESS

OVERVIEW
--------
Summit of Secrets is an interactive cybersecurity simulation platform
designed to teach ethical hacking concepts through a realistic "desktop"
environment. Users navigate a simulated computer system and must identify
security vulnerabilities hidden across folders, logs, and communications.

OBJECTIVES
----------
1. Create an immersive, realistic desktop UI simulation
2. Plant cryptic clues across various system folders
3. Build a scoring and hint system via REST API
4. Deploy a multi-user leaderboard

TIMELINE
--------
Phase 1 (UI/UX Design):     Jan 2026 ✅
Phase 2 (Backend API):       Feb 2026 ✅
Phase 3 (Game Logic):        Mar 2026 🔄
Phase 4 (Testing & Deploy):  Apr 2026 📅

BUDGET: ₹4,50,000 allocated
TECH STACK: Node.js, Express, HTML/CSS/JS, PostgreSQL`
            },
            {
                name: 'NDA_Template.txt', ico: '📄', size: '4 KB', modified: 'Dec 5, 2025',
                content: `NON-DISCLOSURE AGREEMENT (TEMPLATE)
=====================================
Summit Tech Solutions, Pune

This Non-Disclosure Agreement ("Agreement") is entered into as of
[DATE] between Summit Tech Solutions ("Company") and [PARTY NAME] ("Recipient").

1. CONFIDENTIAL INFORMATION
   Recipient agrees to keep confidential all technical, business, financial,
   and strategic information shared by the Company.

2. OBLIGATIONS
   Recipient shall not disclose, reproduce, or use Confidential Information
   for any purpose other than the stated project scope.

3. TERM
   This agreement remains in effect for 2 years from the date of signing.

4. EXCEPTIONS
   Information already in public domain is excluded from this agreement.

Signed: _____________________    Date: __________
Company Representative

Signed: _____________________    Date: __________
Recipient`
            }
        ]
    },

    'Logs': {
        ico: '📋',
        files: [
            {
                name: 'system_log_Feb23.txt', ico: '📋', size: '22 KB', modified: 'Feb 23, 2026',
                content: `SYSTEM LOG — Arjun's MacBook Pro
=================================
Date: February 23, 2026

[09:00:01] [INFO]  System boot completed. macOS Sequoia 15.3
[09:00:04] [INFO]  FileVault encryption: ACTIVE
[09:00:11] [INFO]  Wi-Fi connected: SummitOffice_5G (192.168.1.44)
[09:01:32] [INFO]  VS Code launched (v1.88.0)
[09:15:44] [INFO]  Git pull: branch arpita_desktop_page — 3 new commits
[09:22:07] [WARN]  High memory usage detected: 7.8 GB / 16 GB
[09:22:08] [INFO]  Chrome closed. Memory freed.
[09:38:55] [INFO]  Terminal opened: /Users/arjun/Projects/SummitOfSecrets
[09:40:13] [INFO]  npm install — 312 packages added
[09:41:29] [INFO]  Server started: localhost:3001
[10:05:17] [INFO]  Spotlight search: "CCTV footage naming convention"
[10:22:44] [WARN]  SSH login attempt — unknown IP: 203.0.113.77 — BLOCKED
[10:22:45] [INFO]  Firewall rule triggered. IP flagged.
[10:45:00] [INFO]  Zoom call started: Team Stand-up
[11:12:38] [INFO]  Zoom call ended. Duration: 27m 38s
[11:30:05] [INFO]  File saved: /frontend/index.html
[11:30:06] [INFO]  Live reload triggered.
[12:00:00] [INFO]  Screen locked (idle timeout: 5 min)`
            },
            {
                name: 'access_log.txt', ico: '📋', size: '8 KB', modified: 'Feb 22, 2026',
                content: `ACCESS LOG — localhost:3001
===========================
Generated: Feb 22, 2026 23:59:59

192.168.1.44 - - [22/Feb/2026 09:01:12] "GET / HTTP/1.1" 200 4821
192.168.1.44 - - [22/Feb/2026 09:01:14] "GET /api/desktop HTTP/1.1" 200 843
192.168.1.44 - - [22/Feb/2026 09:01:14] "GET /api/notifications HTTP/1.1" 200 412
192.168.1.44 - - [22/Feb/2026 09:14:33] "GET /api/files HTTP/1.1" 200 289
192.168.1.44 - - [22/Feb/2026 10:22:01] "GET /api/desktop HTTP/1.1" 200 843
192.168.1.44 - - [22/Feb/2026 10:22:02] "GET /api/time HTTP/1.1" 200 52
203.0.113.77 - - [22/Feb/2026 10:22:44] "GET /admin HTTP/1.1" 403 -
203.0.113.77 - - [22/Feb/2026 10:22:45] "GET /.env HTTP/1.1" 404 -
203.0.113.77 - - [22/Feb/2026 10:22:46] "GET /config HTTP/1.1" 404 -
192.168.1.44 - - [22/Feb/2026 14:05:22] "POST /api/desktop HTTP/1.1" 404 -
192.168.1.44 - - [22/Feb/2026 18:30:11] "GET / HTTP/1.1" 200 4821

NOTE: Suspicious IP 203.0.113.77 blocked at firewall level after 3 attempts.`
            },
            {
                name: 'error_log.txt', ico: '📋', size: '3 KB', modified: 'Feb 21, 2026',
                content: `ERROR LOG — SummitOfSecrets App
================================
Feb 21, 2026

[09:14:22] [ERROR] Cannot read property 'name' of undefined
  at renderFinder (index.html:599)
  at openFolderWindow (index.html:633)
  → FIXED: Added null check before folder render

[10:55:38] [ERROR] CORS policy: No 'Access-Control-Allow-Origin'
  at fetch (index.html:734)
  → FIXED: Added cors() middleware to server.js

[14:02:11] [WARN]  NavStack desync: navPos > stack.length
  at navFwd (index.html:625)
  → FIXED: Added bounds check on navPos

[16:44:00] [ERROR] Cannot find module 'nodemon'
  → FIXED: Run npm install --save-dev nodemon

TOTAL ERRORS TODAY: 3 (all resolved)
Build status: ✅ PASSING`
            }
        ]
    },

    'Chats': {
        ico: '💬',
        files: [
            {
                name: 'chat_karan_feb23.txt', ico: '💬', size: '5 KB', modified: 'Feb 23, 2026',
                content: `CHAT LOG — Karan Mehta
=======================
Feb 23, 2026 | iMessage

[09:15] Karan: yo did u push the updated server.js?
[09:16] Arjun: yeah just pushed, check the arpita_desktop_page branch
[09:17] Karan: nice the api routes look clean 👌
[09:17] Karan: btw that 403.0.113.77 ip in the logs is weird
[09:18] Arjun: yeah firewall caught it. prob a scanner bot
[09:18] Arjun: blocked already, not worried
[09:20] Karan: ok good. hey can u review my PR before standup?
[09:20] Arjun: sure send the link
[09:21] Karan: https://github.com/CyberSec-CCOEW/SummitOfSecrets/pull/42
[09:22] Arjun: looks good, left 2 comments, minor stuff
[09:22] Arjun: approving 👍
[09:22] Karan: lol already? fast reviewer
[09:23] Arjun: coffee helps 😂
[09:45] Karan: standup in 15
[09:45] Arjun: already in zoom`
            },
            {
                name: 'chat_arpita_feb22.txt', ico: '💬', size: '4 KB', modified: 'Feb 22, 2026',
                content: `CHAT LOG — Arpita Sharma
=========================
Feb 22, 2026 | iMessage

[11:30] Arpita: arjun!! the desktop page is done omg
[11:31] Arjun: no way send screenshots
[11:31] Arpita: [image: desktop_preview.png]
[11:32] Arjun: this looks SO good. the dock hover animation 🔥
[11:32] Arpita: right?? took me 2 hours to get the cubic-bezier right lol
[11:33] Arjun: push it to the branch, ill review asap
[11:33] Arpita: pushed! also added the diary widget in top right like u asked
[11:34] Arjun: perfect. one thing — can u make the folder content actually open files?
[11:35] Arpita: yeah i was gonna ask about that. like a text viewer popup?
[11:35] Arjun: exactly. i'll handle the backend data, u handle the viewer UI
[11:36] Arpita: deal 🤝
[11:36] Arpita: also mango cake from karan was 10/10
[11:37] Arjun: agreed. best sprint retro ever`
            },
            {
                name: 'chat_priya_feb20.txt', ico: '💬', size: '3 KB', modified: 'Feb 20, 2026',
                content: `CHAT LOG — Priya Iyer
======================
Feb 20, 2026 | Slack DM

[14:05] Priya: hey the CI pipeline is all set up ✅
[14:06] Priya: auto deploys on push to main now
[14:06] Arjun: amazing!! how long does the build take?
[14:07] Priya: like 2 mins. added caching for node_modules
[14:07] Arjun: nice. did u add the health check endpoint?
[14:08] Priya: yep /api/health returns 200 with server uptime
[14:08] Arjun: perfect. last thing — can u set env vars for prod?
[14:09] Priya: already done 😎 PORT, NODE_ENV, CORS_ORIGIN
[14:09] Arjun: u r literally a devops god
[14:10] Priya: i know 💅`
            }
        ]
    },

    'CCTV Footage': {
        ico: '📹',
        files: [
            {
                name: 'CAM01_metadata.txt', ico: '📹', size: '2 KB', modified: 'Feb 23, 2026',
                content: `CCTV CAMERA METADATA — CAM01
=============================
Camera ID:     CAM-01
Location:      Main Entrance / Reception
Resolution:    1080p @ 30fps
Status:        ACTIVE ✅
Last Motion:   Feb 23, 2026 at 09:04:22
Storage Used:  148.2 GB / 500 GB

RECENT EVENTS:
[08:55] Motion detected — Person entering lobby
[09:00] Badge scan: A.Kumar (Employee ID: EMP-007)
[09:04] Motion detected — Delivery courier
[09:04] Package logged by reception
[10:22] Motion detected — Unknown visitor (unregistered)
[10:22] ⚠️ Visitor did not sign in — flagged for review

NOTE: Footage retention: 30 days. Auto-purge enabled.`
            },
            {
                name: 'CAM02_metadata.txt', ico: '📹', size: '2 KB', modified: 'Feb 23, 2026',
                content: `CCTV CAMERA METADATA — CAM02
=============================
Camera ID:     CAM-02
Location:      Server Room (Restricted)
Resolution:    4K @ 15fps
Status:        ACTIVE ✅
Last Motion:   Feb 23, 2026 at 11:30:05
Storage Used:  210.4 GB / 500 GB

RECENT EVENTS:
[07:30] Motion detected — Cleaning staff entry (authorized)
[07:45] Motion detected — Cleaning staff exit
[09:38] Motion detected — A.Kumar entered server room
[09:41] Motion detected — A.Kumar exited server room
[11:30] Motion detected — Priya Iyer entered server room
[11:45] Motion detected — Priya Iyer exited server room

ACCESS LOG: All entries authorized ✅
No anomalies detected.`
            },
            {
                name: 'CCTV_incident_report.txt', ico: '📄', size: '5 KB', modified: 'Feb 22, 2026',
                content: `INCIDENT REPORT — CCTV SYSTEM
==============================
Report ID:    INC-2026-0042
Date:         February 22, 2026
Reported by:  Arjun Kumar
Status:       UNDER REVIEW

INCIDENT SUMMARY
----------------
At 10:22 AM on Feb 22, 2026, CAM-01 captured an unregistered individual
entering the building without signing the visitor log. The individual
was present in the reception area for approximately 4 minutes before
leaving without interacting with staff.

DESCRIPTION
-----------
- Build: Medium, approximately 5'9"
- Attire: Dark jacket, backpack
- Duration in premises: ~4 minutes
- Did not approach reception desk
- Exited via main entrance

CORRELATION
-----------
At 10:22 AM on the same date, the server access log recorded 3 failed
attempts from external IP 203.0.113.77 targeting /admin and /.env paths.
Possible correlation — under investigation.

ACTIONS TAKEN
-------------
✅ IP 203.0.113.77 blocked at firewall
✅ Footage preserved and flagged
⏳ Report forwarded to security team
⏳ Review visitor policy for front desk

Next review: Feb 25, 2026`
            }
        ]
    },

    'Schedule': {
        ico: '📅',
        files: [
            {
                name: 'week_schedule_feb23.txt', ico: '📅', size: '4 KB', modified: 'Feb 23, 2026',
                content: `WEEKLY SCHEDULE — Arjun Kumar
==============================
Week of: Feb 23 – Feb 28, 2026

MONDAY, FEB 23
--------------
09:00  Daily stand-up (Zoom, 15 min)
10:00  Code review — SummitOfSecrets PR #43
11:30  1:1 with Vikram (CTO)
14:00  Folder viewer feature implementation
17:00  Gym — HIIT session
19:00  Personal: Call Rohan

TUESDAY, FEB 24
----------------
09:00  Daily stand-up
10:00  Backend API documentation session
12:00  Lunch with Karan
14:00  Security audit prep — check logs
16:00  Sprint planning for March

WEDNESDAY, FEB 25
------------------
09:00  Daily stand-up
10:00  Review CCTV incident report
11:00  Meeting with Priya — CI/CD optimizations
15:00  Feature freeze for v1.0

THURSDAY, FEB 26
-----------------
09:00  Daily stand-up
10:00  QA Testing — full system walkthrough
14:00  Fix any P1 bugs from QA
17:30  Team dinner (Baner, venue TBD)

FRIDAY, FEB 27
---------------
09:00  Daily stand-up
11:00  v1.0 Demo to Vikram
14:00  Buffer time / documentation
16:00  Early finish if demo goes well 🎉

WEEKEND
-------
SAT: Train tickets to Mumbai (booking!)
SUN: Rest — no laptops (trying this again)`
            },
            {
                name: 'meetings_march.txt', ico: '📅', size: '3 KB', modified: 'Feb 19, 2026',
                content: `MARCH 2026 — KEY MEETINGS & DEADLINES
======================================

WEEK 1 (Mar 1–7)
-----------------
Mar 1  - v1.0 Production deployment
Mar 2  - Post-launch retrospective
Mar 4  - Onboarding: 2 new interns (Sharma sir's cohort)
Mar 5  - Q1 Financial review with Finance team

WEEK 2 (Mar 8–14)
------------------
Mar 10 - Mid-sprint check-in
Mar 12 - Security team external audit begins
Mar 13 - Response to audit findings

WEEK 3 (Mar 15–21)
-------------------
Mar 17 - v1.1 planning kickoff
Mar 18 - Conference: PyCon Pune 2026 (attending)
Mar 20 - DEADLINE: March deliverables report

WEEK 4 (Mar 22–31)
-------------------
Mar 24 - Team quarterly review
Mar 28 - Client demo (if secured)
Mar 31 - Q1 close — all docs to Finance

PERSONAL REMINDERS
-------------------
→ Visit home (Nagpur) — book before Mar 5
→ Renew gym membership (expires Mar 14)
→ Rohan's birthday — Mar 19 🎂`
            }
        ]
    },

    'Mails': {
        ico: '📧',
        files: [
            {
                name: 'mail_sharma_sir.txt', ico: '📧', size: '3 KB', modified: 'Feb 21, 2026',
                content: `FROM:    v.sharma@summittech.in
TO:      arjun.k@summittech.in
DATE:    February 21, 2026, 11:45 AM
SUBJECT: Internship Cohort — March 2026

Arjun,

Hope the sprint is going well. Saw the desktop UI demo — excellent work from the team.

I wanted to confirm the internship batch joining in March. We have 2 candidates finalized:
  1. Sneha Rao — Frontend (React focus)
  2. Dev Patel — Backend (Node.js focus)

Please coordinate with HR (Sunita) on their onboarding.
They'll be working under your wing for the first 4 weeks.

Also — make sure the SummitOfSecrets repo is clean before they join.
No sensitive data in commit history. Run git-secrets if you haven't.

Let me know if you need anything.

Regards,
Vikram Sharma
CTO, Summit Tech Solutions`
            },
            {
                name: 'mail_github_actions.txt', ico: '📧', size: '2 KB', modified: 'Feb 21, 2026',
                content: `FROM:    noreply@github.com
TO:      arjun.k@summittech.in
DATE:    February 21, 2026, 10:32 AM
SUBJECT: ✅ CI/CD Pipeline passed — PR #42 merged

Hi arjunkumar-dev,

Your pull request #42 "Add folder navigation with breadcrumbs" was
successfully merged into the main branch.

Build Summary:
  ✅ Lint checks passed
  ✅ Unit tests passed (14/14)
  ✅ Build successful (2m 14s)
  ✅ Deployed to staging: https://staging.summitsecrets.dev

Triggered by: Priya Iyer (priya-devops)
Branch: arpita_desktop_page → main

View run: https://github.com/CyberSec-CCOEW/SummitOfSecrets/actions/runs/98712

— GitHub Actions`
            },
            {
                name: 'mail_security_alert.txt', ico: '📧', size: '2 KB', modified: 'Feb 22, 2026',
                content: `FROM:    alerts@cloudflare.com
TO:      arjun.k@summittech.in
DATE:    February 22, 2026, 10:23 AM
SUBJECT: ⚠️ Firewall Alert — Blocked Attack (3 attempts)

SECURITY ALERT — ACTION TAKEN

We detected and blocked suspicious activity targeting your server:

Blocked IP:    203.0.113.77
Location:      Unknown (VPN/Proxy detected)
Time:          10:22:44 – 10:22:46 AM IST
Attempts:      3 requests blocked

Targeted paths:
  GET /admin       → 403 Forbidden
  GET /.env        → 404 Not Found
  GET /config      → 404 Not Found

These are common automated scan patterns (likely a bot).
No data was accessed. Your firewall rules worked correctly.

RECOMMENDED ACTIONS:
  ✅ IP has been automatically blocked
  → Consider enabling bot fight mode
  → Review your .env exposure in public repos

Stay safe,
Cloudflare Security Team`
            },
            {
                name: 'mail_rohan.txt', ico: '📧', size: '2 KB', modified: 'Feb 18, 2026',
                content: `FROM:    rohan.desai@gmail.com
TO:      arjun.k@summittech.in  
DATE:    February 18, 2026, 8:14 PM
SUBJECT: Long time no talk bro

Arjun,

Man it's been forever. How's Pune treating you?

Saw you guys are working on some cybersecurity simulation thing —
sounds cool. Is it like a CTF (Capture the Flag) kind of deal?
I used to love those back in college.

Anyway was in your area last week for a client meeting but didn't
want to bother you during sprint. Let me know when you're free —
we should grab food at Vohuman Cafe like old times.

Also — random question — do you still have my copy of "The Art of 
Deception" by Mitnick? I lent it to you in 2023 I think lol.

Hit me back when you surface from the code cave,
Rohan

P.S. Happy early birthday if I forget again 😅`
            }
        ]
    },

    'Recycle Bin': {
        ico: '🗑️',
        files: [
            {
                name: 'old_readme_v1.txt', ico: '🗑️', size: '1 KB', modified: 'Jan 5, 2026',
                content: `[DELETED FILE — Recycle Bin]
Original path: ~/Projects/SummitOfSecrets/README.md

# SummitOfSecrets

This is the old README. Replaced by updated version.

old setup instructions:
node index.js
// that's it lol

(this file has been deleted and is pending permanent removal)`
            },
            {
                name: 'test_scratch.txt', ico: '🗑️', size: '512 B', modified: 'Feb 10, 2026',
                content: `[DELETED FILE — Recycle Bin]
Original path: ~/Desktop/test_scratch.txt

testing 123
testing api endpoint
curl localhost:3000/api/files
{ "error": "cannot GET /api/files" }
ok port is 3001 not 3000, fixed

asdfasdf
todo: remove this file

(permanently deleted — awaiting bin empty)`
            },
            {
                name: 'passwords_old.txt', ico: '🗑️', size: '1 KB', modified: 'Dec 20, 2025',
                content: `[DELETED FILE — Recycle Bin]
⚠️  WARNING: This file contained sensitive information.
     It has been securely flagged for permanent deletion.

Original path: ~/Documents/passwords_old.txt
Reason deleted: Security policy — plaintext passwords not allowed.

All credentials have been migrated to 1Password (company vault).
This file should be permanently wiped.

Reminder: Use a password manager. Never store credentials in plaintext.

(File flagged — permanent deletion pending IT approval)`
            }
        ]
    },

    'Downloads': {
        ico: '📥',
        files: [
            {
                name: 'VSCode_1.88.0.txt', ico: '📦', size: '89 MB', modified: 'Feb 15, 2026',
                content: `[DOWNLOAD RECORD]
File: VSCode-darwin-universal-1.88.0.dmg
Source: https://code.visualstudio.com/Download
Downloaded: Feb 15, 2026 at 14:22
Size: 89.4 MB
Status: ✅ Installed
Location: /Applications/Visual Studio Code.app`
            },
            {
                name: 'arjun_resume_2026.txt', ico: '📄', size: '180 KB', modified: 'Feb 12, 2026',
                content: `ARJUN KUMAR — RESUME (2026)
============================
arjun.k@summittech.in | Pune, Maharashtra
github.com/arjunkumar-dev | linkedin.com/in/arjunkumar

SUMMARY
-------
Full-stack developer with 4+ years of experience building
scalable web applications and security-focused software.
Currently leading development of SummitOfSecrets at Summit Tech.

EXPERIENCE
----------
Summit Tech Solutions, Pune          (2023 – Present)
Senior Developer
- Architected REST API backend serving 10,000+ req/day
- Built macOS-style desktop simulation in vanilla JS
- Led team of 5 engineers across frontend and backend

Infosys, Pune                        (2021 – 2023)
Software Engineer
- Developed microservices for banking dashboard
- Reduced API response time by 40% via caching

SKILLS
------
Languages: JavaScript, Python, SQL, Bash
Frontend:  HTML/CSS, React, Vue.js
Backend:   Node.js, Express, FastAPI
Tools:     Git, Docker, Linux, AWS

EDUCATION
---------
B.E. Computer Engineering
COEP Technological University, Pune — 2021 (CGPA: 8.9)`
            }
        ]
    },

    'Documents': {
        ico: '📄',
        files: [
            {
                name: 'notes_general.txt', ico: '📝', size: '3 KB', modified: 'Feb 23, 2026',
                content: `GENERAL NOTES — Arjun Kumar
============================
Last updated: Feb 23, 2026

QUICK REFS
----------
MacBook serial: C02X4KMPJGH6
Git user: arjunkumar-dev
Server: localhost:3001
Staging: https://staging.summitsecrets.dev

COMMANDS I KEEP FORGETTING
---------------------------
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Git undo last commit (keep changes)
git reset --soft HEAD~1

# Find large files
find . -size +100M -not -path "./.git/*"

# Check who's using a port
ss -tulnp | grep 3001

IDEAS / TODO
------------
→ Add dark/light mode toggle to desktop UI
→ Implement real file search in Spotlight
→ Add Terminal emulator window
→ Easter egg hidden in CCTV logs? 🤔
→ Read: "Hacking: The Art of Exploitation" (still on shelf)`
            },
            {
                name: 'reading_list.txt', ico: '📚', size: '2 KB', modified: 'Feb 10, 2026',
                content: `READING LIST 2026
=================

CURRENTLY READING
-----------------
📖 The Pragmatic Programmer — David Thomas, Andrew Hunt
   Page: 184 / 352

TO READ (Tech)
--------------
📚 Hacking: The Art of Exploitation — Jon Erickson
📚 Clean Architecture — Robert C. Martin  
📚 Designing Data-Intensive Applications — Kleppmann
📚 The Art of Deception — Kevin Mitnick (WHERE IS MY COPY)

TO READ (Non-Tech)
------------------
📚 Atomic Habits — James Clear (started 3x, never finished)
📚 Sapiens — Yuval Noah Harari
📚 The Alchemist (reread)

FINISHED IN 2025
----------------
✅ You Don't Know JS (series) — Kyle Simpson
✅ The DevOps Handbook
✅ Deep Work — Cal Newport (good, actually applied some)`
            }
        ]
    },

    'Pictures': {
        ico: '🖼️',
        files: [
            {
                name: 'screenshots_index.txt', ico: '📋', size: '1 KB', modified: 'Feb 21, 2026',
                content: `SCREENSHOTS FOLDER — INDEX
===========================
(Image thumbnails not viewable in text mode)

desktop_preview_v1.png      — Jan 28, 2026  [4.2 MB]
desktop_preview_v2.png      — Feb 3, 2026   [4.8 MB]
arpita_desktop_final.png    — Feb 21, 2026  [5.1 MB]  ← latest
ci_all_green_screenshot.png — Feb 21, 2026  [2.3 MB]
team_standup_zoom.png       — Feb 17, 2026  [3.1 MB]
mango_cake.jpg              — Feb 21, 2026  [1.8 MB]
pune_sunset.jpg             — Feb 15, 2026  [6.4 MB]

Total: 7 files, 27.7 MB`
            }
        ]
    },

    'Applications': {
        ico: '📦',
        files: [
            {
                name: 'installed_apps.txt', ico: '📋', size: '2 KB', modified: 'Feb 15, 2026',
                content: `INSTALLED APPLICATIONS — Arjun's MacBook Pro
==============================================
macOS Sequoia 15.3 | 16 GB RAM | 512 GB SSD

DEVELOPMENT
-----------
✅ Visual Studio Code        v1.88.0
✅ Terminal (built-in)       Sequoia
✅ Xcode Command Line Tools  15.3
✅ Docker Desktop            4.28.0
✅ Postman                   10.24
✅ TablePlus                 6.1.0

BROWSERS
--------
✅ Safari                    17.4
✅ Chrome                    122.0
✅ Firefox Developer Edition  124.0

PRODUCTIVITY
------------
✅ Notion                    3.13
✅ Slack                     4.38
✅ Zoom                      5.17
✅ 1Password                 8.10
✅ CleanMyMac X              4.15

ENTERTAINMENT
-------------
✅ Spotify                   1.2.37
✅ IINA (video player)       1.3.4

TOTAL: 18 applications`
            }
        ]
    },

    'Music': {
        ico: '🎵',
        files: [
            {
                name: 'playlist_coding.txt', ico: '🎵', size: '2 KB', modified: 'Feb 20, 2026',
                content: `CODING PLAYLIST — Arjun's Picks
================================
"Focus Mode" | Updated Feb 20, 2026
Spotify: open.spotify.com/playlist/arjunkumar-focus

CURRENT ROTATION
----------------
1.  Daft Punk — Get Lucky
2.  Bonobo — Kiara
3.  Tycho — Awake
4.  Four Tet — Sing
5.  Caribou — Can't Do Without You
6.  Flying Lotus — Never Catch Me
7.  Tame Impala — Let It Happen
8.  Khruangbin — Maria También
9.  Com Truise — Brokendate
10. Jon Hopkins — Open Eye Signal

LATE NIGHT (when debugging)
----------------------------
11. Brian Eno — Music For Airports
12. Nils Frahm — Says
13. Ólafur Arnalds — Near Light
14. Max Richter — On the Nature of Daylight

Total: 14 tracks | ~58 minutes`
            }
        ]
    },

    'Movies': {
        ico: '🎬',
        files: [
            {
                name: 'watchlist.txt', ico: '🎬', size: '2 KB', modified: 'Feb 1, 2026',
                content: `WATCHLIST 2026 — Arjun
=======================

TECH / HACKER FILMS
--------------------
✅ The Social Network (rewatch — still 10/10)
✅ Mr. Robot (S1-S4 — all time favourite)
⏳ Zero Days (2016 documentary)
⏳ Citizenfour (Snowden doc)
⏳ The Imitation Game

GENERAL
-------
✅ Oppenheimer (Jan 2026, theatre)
⏳ Dune: Part Three (if it exists)
⏳ Interstellar (3rd rewatch)
⏳ 12 Angry Men (finally)

BOLLYWOOD
---------
✅ Animal (had opinions)
⏳ Stree 2
⏳ Tumbbad (rewatch)`
            }
        ]
    }
};

// ─── API ROUTES ──────────────────────────────────────────────────────────────

app.get('/api/desktop', (req, res) => {
    res.json({
        user: { name: 'Arjun', macbook: "Arjun's MacBook Pro" },
        time: new Date().toISOString(),
        battery: 87,
        wifi: true,
        notifications: [
            { id: 1, app: 'Messages', msg: "Hey Arjun! Are you free tonight?", time: "9:41 AM", icon: '💬' },
            { id: 2, app: 'GitHub', msg: 'PR #42 merged successfully', time: '9:30 AM', icon: '🐙' },
            { id: 3, app: 'Slack', msg: 'Stand-up in 10 minutes!', time: '9:20 AM', icon: '💼' },
            { id: 4, app: 'Calendar', msg: "Team meeting at 11:00 AM", time: '9:00 AM', icon: '📅' },
        ]
    });
});

app.get('/api/time', (req, res) => {
    res.json({ time: new Date().toISOString() });
});

// Get folder contents
app.get('/api/folder/:name', (req, res) => {
    const folderName = decodeURIComponent(req.params.name);
    const folder = FILESYSTEM[folderName];
    if (!folder) return res.status(404).json({ error: 'Folder not found' });
    const files = folder.files.map(f => ({
        name: f.name, ico: f.ico, size: f.size, modified: f.modified
    }));
    res.json({ name: folderName, ico: folder.ico, files });
});

// Get file content
app.get('/api/folder/:folderName/file/:fileName', (req, res) => {
    const folderName = decodeURIComponent(req.params.folderName);
    const fileName = decodeURIComponent(req.params.fileName);
    const folder = FILESYSTEM[folderName];
    if (!folder) return res.status(404).json({ error: 'Folder not found' });
    const file = folder.files.find(f => f.name === fileName);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json({ name: file.name, ico: file.ico, size: file.size, modified: file.modified, content: file.content });
});

// List all folders
app.get('/api/folders', (req, res) => {
    const list = Object.entries(FILESYSTEM).map(([name, v]) => ({
        name, ico: v.ico, count: v.files.length
    }));
    res.json(list);
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Arjun's MacBook server running → http://localhost:${PORT}`);
    console.log(`📁 Folders available: ${Object.keys(FILESYSTEM).join(', ')}`);
});