# CalmMind Project Documentation

## 1. Project Overview

CalmMind is an AI-powered mental wellness platform built as a full-stack web application. It combines patient mental health tracking, private journaling, AI emotional support, role-based dashboards, and appointment functionality into one cohesive system.

The platform is designed for:
- Patients seeking daily mood tracking, reflection journaling, and emotional support.
- Psychologists who can review patient history, manage appointments, and interact with clients.
- Admins who can oversee users and system data.

CalmMind is intended to support mental health, not replace licensed therapy. It includes safeguards in the AI chat experience that remind users the system is not a substitute for professional treatment.

---

## 2. What the Website Solves

CalmMind addresses several common mental wellness needs:

- **Continuous emotional support** through an AI chatbot available 24/7.
- **Mood tracking and trends** so users can record daily emotional states and review historical progress.
- **Private journaling** for self-reflection and mental health habit building.
- **Task-based motivation** with gamification: streaks, points, and badges encourage consistent use.
- **Structured user roles** so Patients, Psychologists, and Admins can each access tailored experiences.
- **Integrated appointment UI** to support future psychologist scheduling and consultations.

This project is evaluated against those objectives by showing how the platform lets users log moods, journal privately, engage with AI, and build healthy behavioral patterns.

---

## 3. Core Tech Stack

### Frontend
- `React` 18
- `React Router DOM` 6 for route-based navigation
- `react-scripts` for Create React App tooling
- `recharts` for charts and visualization
- `react-calendar` for date selection
- `date-fns` for date formatting and manipulation
- `socket.io-client` for real-time communication (chat/notifications)

### Backend
- `Node.js` with `Express` for API and server logic
- `Prisma` ORM and `@prisma/client` for database modeling and access
- `PostgreSQL` database hosted via Supabase connection strings
- `socket.io` for bidirectional real-time socket features
- `jsonwebtoken` for JWT-based authentication
- `bcryptjs` for password hashing
- `dotenv` for environment variable management
- `cors` for cross-origin API access
- `multer` for file upload support (if needed)
- `nodemailer` for email functionality (planned or future integration)

### AI
- `@google/generative-ai` and `groq-sdk` to connect with Groq AI for chatbot responses
- Groq API uses Llama-based AI models for conversational emotional support

### Development
- `nodemon` for backend hot reload during development

---

## 4. Project Structure

```
AI-Powered-Mental-Wellness-Platform/
│
├── backend/                        # Express.js API server
│   ├── prisma/                     # Prisma schema and seed data
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.js           # Prisma client singleton
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT auth middleware
│   │   ├── routes/                 # API endpoints by feature
│   │   ├── utils/
│   │   │   └── gamification.js     # points, streaks, badge logic
│   ├── package.json
│   └── server.js                   # Express server entry point
│
├── src/                            # React frontend app
│   ├── api/                        # API helper functions
│   ├── components/                 # UI components and layouts
│   ├── data/                       # static page/navigation data
│   ├── pages/                      # route-based pages
│   ├── styles/                     # theme and CSS
│   ├── App.jsx
│   └── index.jsx
│
├── public/                         # static frontend assets
├── package.json                    # frontend dependencies
└── README.md
```

---

## 5. What Each Part Does

### Frontend
- `src/App.jsx` configures routes and page components.
- `src/index.jsx` mounts the React app and provides global providers.
- `src/api/index.js` centralizes API calls between the frontend and backend.
- `src/components/layout/` contains layouts for patient, admin, psychologist, sidebar, and top bar navigation.
- `src/components/ui/` contains reusable UI widgets like cards, charts, buttons, toast notifications, and calendars.
- `src/pages/` contains pages for: `Dashboard`, `MoodTracking`, `Journal`, `Appointments`, `AiChat`, `PatientSignup`, `TherapistSignup`, `AdminSignup`, `Login`, `Settings`, and `NotFound`.
- `src/styles/theme.js` defines the application theme, color palette, and style tokens.

### Backend
- `backend/server.js` starts the Express server, loads middleware, and attaches routes.
- `backend/src/routes/auth.js` handles signup and login for all user roles.
- `backend/src/routes/chat.js` handles AI chat session creation, message sending, and history retrieval.
- `backend/src/routes/journal.js` handles create/read/update/delete for journal entries.
- `backend/src/routes/mood.js` handles mood logging and retrieval of mood history.
- `backend/src/routes/dashboard.js` returns user-specific dashboard data, notifications, and gamification status.
- `backend/src/middleware/auth.js` checks JWT tokens and verifies user permissions.
- `backend/src/utils/gamification.js` contains logic for awarding points, calculating streaks, and determining badges.
- `backend/prisma/schema.prisma` defines database models for users, moods, journals, chat sessions, notifications, badges, and related records.

---

## 6. Workflow and User Journey

### Patient Workflow
1. Sign up as a Patient and log in.
2. Complete profile details and access the patient dashboard.
3. Use the AI chat to get emotional support and review chat history.
4. Log daily moods and view mood charts and trends.
5. Write private journal entries for reflection.
6. Earn points and badges through consistent app usage.
7. Book appointments with psychologists from the appointments UI.

### Psychologist Workflow
1. Sign up as a Psychologist.
2. Access a psychologist dashboard to review patient summaries and appointment requests.
3. Use patient history data to inform consultations.
4. Interact with patients via planned chat or session features.

### Admin Workflow
1. Sign up as an Admin using the `ADMIN_ACCESS_CODE` from environment configuration.
2. Review system data, manage users, and monitor platform activity.
3. Oversee psychologist and patient workflows.

---

## 7. Key Libraries and Their Purpose

### Frontend Libraries
- `react` / `react-dom`: Core UI framework.
- `react-router-dom`: Routing and protected route handling.
- `react-scripts`: Build and development scripts from Create React App.
- `recharts`: Data visualization and charts for mood history and progress.
- `react-calendar`: Calendar UI for choosing mood or appointment dates.
- `date-fns`: Date parsing, formatting, and relative date utilities.
- `socket.io-client`: Real-time updates for chat or notifications.

### Backend Libraries
- `express`: HTTP server and routing.
- `cors`: Enable cross-origin requests from the frontend.
- `dotenv`: Load `.env` configuration values.
- `jsonwebtoken`: Create and verify JWT tokens for authentication.
- `bcryptjs`: Securely hash and compare passwords.
- `prisma` / `@prisma/client`: Database schema, queries, and migrations.
- `@google/generative-ai` / `groq-sdk`: AI model integration for chat.
- `socket.io`: Real-time socket communication.
- `multer`: Multipart form data parsing (uploads).
- `nodemailer`: Email sending support (for future email workflows).
- `nodemon`: Auto-reload backend during development.

---

## 8. Evaluation Questions Answered

### What problem does this project solve?
It solves the need for a single mental wellness platform that provides daily mood tracking, private journaling, supportive AI conversation, and role-specific dashboards for patients, psychologists, and admins.

### What value does it deliver?
- Helps patients develop healthy mental wellness habits.
- Gives psychologists structured patient data to support care.
- Offers admins a way to manage the app and monitor usage.
- Uses gamification to encourage continued self-care.

### What are the main features?
- AI emotional support chat
- Mood logging and trend charts
- Private journal CRUD
- Gamification with points and badges
- Role-based dashboards
- Appointment booking UI
- Authentication and authorization with JWT
- Real-time socket support scaffolded via Socket.io

### Which tech stack was used?
- Frontend: React, React Router, Recharts, React Calendar, Date-fns, Socket.io client
- Backend: Node.js, Express, Prisma, PostgreSQL, JWT, bcrypt, Groq AI integration
- Deployment: Vercel for frontend, Render or similar for backend, Supabase-hosted PostgreSQL

### How is the AI chat implemented?
AI chat is handled by backend routes in `backend/src/routes/chat.js`, which send user messages to the Groq AI service and store session history. The AI responds to user emotion-related inputs while reminding users that it is not a replacement for real therapy.

### How does authentication work?
Users sign up and log in through backend auth routes. Passwords are hashed with `bcryptjs`, and JWT tokens are issued with `jsonwebtoken`. Protected backend routes verify the token and user role before granting access.

### What is the database setup?
A PostgreSQL database is used through Prisma. The schema includes users, moods, journals, chat sessions, notifications, badges, and role-specific data. Supabase connection strings are stored in `backend/.env`.

---

## 9. How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd ..
npm install
npm start
```

---

## 10. Future Improvements

- Complete appointment booking backend APIs.
- Add admin and psychologist dashboard backend integration.
- Enable real-time messaging between patients and psychologists.
- Add email verification and password reset flows.
- Expand AI chat safety and mental health escalation features.

---

## 11. Notes and Recommendations

- `backend/.env` stores sensitive keys and should not be committed.
- Use the `ADMIN_ACCESS_CODE` environment variable to control admin signup.
- Seed the database after pushing the Prisma schema using `node prisma/seed.js`.
- Keep AI usage and user privacy transparent in any evaluation or demo.

---

## 12. File References

- `backend/package.json`
- `package.json`
- `README.md`
- `backend/server.js`
- `backend/src/routes/auth.js`
- `backend/src/routes/chat.js`
- `backend/src/routes/journal.js`
- `backend/src/routes/mood.js`
- `backend/src/routes/dashboard.js`
- `backend/src/middleware/auth.js`
- `backend/src/utils/gamification.js`
- `backend/prisma/schema.prisma`
- `src/App.jsx`
- `src/index.jsx`
- `src/api/index.js`
- `src/components/layout/`
- `src/components/ui/`
- `src/pages/`
- `src/styles/theme.js`
