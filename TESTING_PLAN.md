# CalmMind Project Testing Plan

## 1. Overview

This document defines the testing strategy, phases, and detailed test cases for the CalmMind web application. It covers both the frontend React application and the backend Express + Prisma API. The goal is to ensure functional correctness, security, reliability, maintainability, and usability of the entire platform.

## 2. Test Objectives

- Validate core user journeys for Patients, Psychologists, and Admins.
- Verify backend APIs for authentication, data persistence, authorization, and business logic.
- Ensure the AI chat, mood tracking, journal, appointment booking, and gamification systems behave correctly.
- Identify regressions in future releases.
- Confirm deployment readiness.

## 3. Testing Strategy

### 3.1 Black Box Testing

Black box testing focuses on validating system behavior without inspecting internal code.

- Functional testing: validate UI flows, API responses, form validation, role-based access.
- End-to-end testing: simulate real user journeys across frontend and backend.
- API testing: cover all REST routes and expected responses.
- Usability testing: verify navigation, error messaging, and accessibility.
- Compatibility testing: validate supported browsers and network conditions.

### 3.2 White Box Testing

White box testing inspects internal code structure, logic paths, and data flow.

- Unit tests: validate utility functions, middleware, route handlers, and custom hooks.
- Integration tests: verify backend routes with database interaction and authorization.
- Code coverage: confirm major modules and branches are covered.
- Static analysis: linting, type checks, and Prisma schema validation.

### 3.3 Test Environment

- Backend: Node.js with local Supabase/Postgres instance, Prisma client.
- Frontend: React app running locally with `npm start`, or CI environment.
- Test data: seeded users, psychologists, appointments, journal entries, mood logs, notifications, and badges.

## 4. Testing Phases

### 4.1 Planning

- Review requirements and feature list.
- Define test scope and priority.
- Identify data models and existing routes.
- Create test cases and test data matrices.

### 4.2 Unit Testing

- Backend: `utils/gamification.js`, middleware auth, route helpers.
- Frontend: page components, API module, reusable UI components.

### 4.3 Integration Testing

- Backend API routes + database + middleware.
- Frontend API module + mocked responses.

### 4.4 System Testing

- End-to-end user journeys across frontend and backend.
- Security and access control.

### 4.5 Regression Testing

- After every significant code change.
- Re-run all automated tests and key manual scenarios.

### 4.6 Acceptance Testing

- Confirm feature acceptance criteria for product owners.
- Validate user stories for each role.

### 4.7 Non-Functional Testing

- Performance: API latency, database query efficiency.
- Security: JWT protection, input validation, access control.
- Accessibility: keyboard navigation, color contrast, screen reader support.
- Reliability: backend robustness, frontend error handling.

## 5. Functional Test Cases

### 5.1 Authentication & User Management

#### 5.1.1 Patient Signup

- TC-Auth-01: Submit valid patient signup form and receive 201 with token.
- TC-Auth-02: Signup without full name returns 400 error.
- TC-Auth-03: Signup without email returns 400 error.
- TC-Auth-04: Signup with invalid email format returns validation error.
- TC-Auth-05: Signup with password shorter than 6 characters returns 400.
- TC-Auth-06: Duplicate email returns 400 duplicate account error.
- TC-Auth-07: Signup stores new User record and Reward and Notification entries.

#### 5.1.2 Psychologist Signup

- TC-Auth-11: Submit valid therapist signup and receive 201 pending approval.
- TC-Auth-12: Missing required fields returns 400.
- TC-Auth-13: Invalid duplicate email returns 400.
- TC-Auth-14: Psychologist account created with `isApproved=false`.
- TC-Auth-15: Psychologist user role is `PSYCHOLOGIST`.

#### 5.1.3 Admin Signup

- TC-Auth-21: Submit valid admin signup with correct admin code and receive 201.
- TC-Auth-22: Invalid admin access code returns 403.
- TC-Auth-23: Missing admin fields returns 400.
- TC-Auth-24: Admin account created with `isVerified=true`.

#### 5.1.4 Login

- TC-Auth-31: Patient can login with correct email/password and role=patient.
- TC-Auth-32: Psychologist can login only if approved.
- TC-Auth-33: Admin can login with correct credentials and role=admin.
- TC-Auth-34: Wrong password returns 401.
- TC-Auth-35: Wrong role selection returns 401.
- TC-Auth-36: Inactive user returns 403.
- TC-Auth-37: Login updates `lastActiveAt`.
- TC-Auth-38: Login response returns token and user object.

#### 5.1.5 Protected Profile and Session

- TC-Auth-41: `GET /api/auth/me` returns current user details when authenticated.
- TC-Auth-42: Protected endpoint returns 401 without token.
- TC-Auth-43: Invalid token returns 401.
- TC-Auth-44: Profile update with valid data saves new values.
- TC-Auth-45: Password change validates old password and sets new hash.
- TC-Auth-46: Export data returns user's data in correct structure.
- TC-Auth-47: Deactivate account sets `isActive=false` and denies future login.
- TC-Auth-48: Delete account removes user and cascades relevant relational data.

### 5.2 Mood Tracking

#### 5.2.1 Mood Entry Creation

- TC-Mood-01: Create mood entry with valid fields and receive 201.
- TC-Mood-02: Missing mood score or label returns 400.
- TC-Mood-03: Mood tags may be optional.
- TC-Mood-04: Correct user association is saved.
- TC-Mood-05: Mood log generation triggers reward point creation.

#### 5.2.2 Mood History Retrieval

- TC-Mood-11: `GET /api/mood` returns mood history for authenticated user.
- TC-Mood-12: Response includes mood logs sorted by date.
- TC-Mood-13: `GET /api/mood` returns 401 without token.
- TC-Mood-14: Dashboard charts compute average mood and trend.

### 5.3 Journal Management

- TC-Journal-01: Create new journal entry with title + content.
- TC-Journal-02: Fail to create entry if content is missing.
- TC-Journal-03: Retrieve all journal entries for current user.
- TC-Journal-04: Update existing journal entry successfully.
- TC-Journal-05: Prevent update of another user's entry.
- TC-Journal-06: Delete existing journal entry.
- TC-Journal-07: Delete non-existent entry returns 404 or appropriate error.
- TC-Journal-08: Journal operations are authenticated.
- TC-Journal-09: Journal entry creation triggers reward points and notification if applicable.

### 5.4 AI Chat & Chat Sessions

- TC-Chat-01: Start a new chat session returns 201 and session id.
- TC-Chat-02: `GET /api/chat/sessions` returns all sessions for current user.
- TC-Chat-03: Session list includes timestamp and messages summary.
- TC-Chat-04: `GET /api/chat/session/:id/messages` returns correct message history.
- TC-Chat-05: Send chat message appends message and triggers AI response.
- TC-Chat-06: Chat message validation rejects empty content.
- TC-Chat-07: Delete chat session removes all related messages.
- TC-Chat-08: AI chat endpoint handles Groq failures gracefully.
- TC-Chat-09: Chat session and message creation is authenticated.

### 5.5 Appointment Booking

- TC-Appt-01: `GET /api/appointments/psychologists` returns active psychologists.
- TC-Appt-02: Book appointment with valid patientId, psychologistId, slotId, scheduledAt.
- TC-Appt-03: Fail booking if psychologist is unavailable.
- TC-Appt-04: Prevent double booking same slot.
- TC-Appt-05: View appointments for current user.
- TC-Appt-06: Cancel appointment updates status to CANCELLED.
- TC-Appt-07: `GET /api/appointments/availability/:psychologistId` returns slots.
- TC-Appt-08: Psychologist can add and remove availability slots.
- TC-Appt-09: Appointment notes can be created by authorized users.
- TC-Appt-10: Appointment creation and cancellation are authenticated.

### 5.6 Dashboard and Notifications

- TC-Dash-01: `GET /api/dashboard` returns summary counts and points.
- TC-Dash-02: Dashboard data includes mood trends, badges, appointments.
- TC-Dash-03: `GET /api/dashboard/notifications` returns notifications list.
- TC-Dash-04: Mark notifications read updates the `isRead` flag.
- TC-Dash-05: Clear all notifications removes or marks all as read.
- TC-Dash-06: Notification creation occurs after gamification events.

### 5.7 Psychologist Dashboard

- TC-PSY-01: `GET /api/psychologist-dashboard` returns full psychologist summary.
- TC-PSY-02: Only PSYCHOLOGIST role may access psychologist dashboard.
- TC-PSY-03: Response includes today’s appointments and weekly calendar data.
- TC-PSY-04: Recent patient mood logs are attached properly.
- TC-PSY-05: Completed, pending, canceled session counts are accurate.
- TC-PSY-06: Endpoint returns 404 if psychologist profile missing.

### 5.8 Admin Functions

- TC-Admin-01: `GET /api/admin/stats` returns overall user, appointment, and revenue metrics.
- TC-Admin-02: Only ADMIN role may access admin routes.
- TC-Admin-03: `GET /api/admin/users` returns all users list.
- TC-Admin-04: `PUT /api/admin/approve-psychologist/:id` approves pending accounts.
- TC-Admin-05: `DELETE /api/admin/users/:id` removes specified user.
- TC-Admin-06: Normal users cannot access admin endpoints.

### 5.9 Intake Form

- TC-Intake-01: `GET /api/intake` returns user intake if already submitted.
- TC-Intake-02: `POST /api/intake` saves intake data for current patient.
- TC-Intake-03: `GET /api/intake/patient/:patientId` returns patient intake for psychologist/admin.
- TC-Intake-04: Intake endpoints are authenticated.
- TC-Intake-05: Submit invalid intake data returns 400.

### 5.10 Settings and Profile

- TC-Settings-01: Profile and notification settings display current user values.
- TC-Settings-02: Update profile with valid values persists changes.
- TC-Settings-03: Invalid values show client-side validation errors.
- TC-Settings-04: Logout clears local storage and redirects to login.

### 5.11 Landing and Public Pages

- TC-Landing-01: Landing page loads and displays feature cards.
- TC-Landing-02: Navigation links to login, signup, and feature pages.
- TC-Landing-03: NotFound route shows friendly 404 page for invalid URLs.

## 6. White Box Test Cases

### 6.1 Backend Unit Tests

#### 6.1.1 Utility Function Tests

- `backend/src/utils/gamification.js`
  - Validate points mapping for `MOOD_LOG`, `JOURNAL_ENTRY`, `CHAT_SESSION`.
  - Verify `calculateUserStats` returns correct totals and streaks.
  - Verify notification creation rules when threshold conditions are met.

#### 6.1.2 Middleware Tests

- `backend/src/middleware/auth.js`
  - `protect` returns 401 when Authorization header missing.
  - `protect` allows valid JWT tokens.
  - `requireRole('ADMIN')` rejects non-admin users.
  - `requireRole('PSYCHOLOGIST')` rejects bad role values.

#### 6.1.3 Auth Route Logic

- `backend/src/routes/auth.js`
  - Signup route rejects invalid payloads.
  - Login route compares hashed passwords correctly.
  - Admin signup verifies `ADMIN_ACCESS_CODE`.
  - Change-password route validates old password and hashes new one.

#### 6.1.4 API Helpers and Client

- `src/api/index.js`
  - `post` correctly composes JSON and handles authorization.
  - `handleResponse` handles 401 with redirect logic.
  - Local storage session helper behavior.

### 6.2 Frontend Component Tests

- `src/pages/Login.jsx`
  - role selection updates `selectedRole`.
  - empty form shows error and shakes.
  - valid form calls `login` API helper.

- `src/pages/PatientSignup.jsx`, `TherapistSignup.jsx`, `AdminSignup.jsx`
  - field validation and submission behavior.

- `src/pages/MoodTracking.jsx`
  - mood input selection and `logMood` submission.
  - chart rendering when data present.

- `src/pages/Journal.jsx`
  - list rendering and CRUD button behavior.

- `src/components/ui/*`
  - `Badge`, `Button`, `Card`, `MoodChart`, `WeekCalendarGrid` render expected markup.
  - `WeekCalendarGrid` maps appointment slots and handles empty state.

### 6.3 Integration Tests

- Backend route tests with actual Prisma client and test database.
- Verify route middleware + database write/read.
- Example coverage:
  - `POST /api/auth/patient-signup` then `POST /api/auth/login`.
  - `POST /api/mood`, `GET /api/mood`, `GET /api/dashboard`.
  - `POST /api/journal`, `PUT /api/journal/:id`, `DELETE /api/journal/:id`.
  - Admin approval flow for psychologists.

## 7. End-to-End Testing

### 7.1 E2E Scenarios

#### Scenario 1: Patient onboarding and first mood log

1. Open landing page.
2. Navigate to patient signup.
3. Fill form and submit.
4. Login as patient.
5. Enter first mood log.
6. View dashboard and verify reward/points.

#### Scenario 2: Patient journal workflow

1. Login as patient.
2. Create a new journal entry.
3. Edit the entry.
4. Delete the entry.
5. Confirm journal list updates.

#### Scenario 3: Psychologist application and admin approval

1. Submit psychologist signup.
2. Admin logs in and approves psychologist.
3. Psychologist logs in and accesses dashboard.

#### Scenario 4: Appointment booking flow

1. Patient logs in and views psychologists.
2. Book appointment.
3. Psychologist sees appointment on schedule.
4. Patient cancels appointment.

#### Scenario 5: AI chat history

1. Start AI chat session.
2. Send message.
3. Verify AI response appears and session is stored.
4. Delete chat session.

### 7.2 Recommended Tools

- Cypress: end-to-end UI testing.
- Playwright: browser automation and cross-browser checks.
- Postman/Newman: API contract testing.

## 8. Non-Functional Testing

### 8.1 Security Testing

- JWT token handling and expiration.
- Access-control enforcement on protected routes.
- Password hashing and password change flow.
- Environment configuration not exposed to frontend.
- SQL injection / malformed input protection through Prisma.

### 8.2 Performance Testing

- API response time for dashboard queries.
- Page load times for core routes.
- Stress test chat endpoint with multiple rapid messages.

### 8.3 Accessibility Testing

- Keyboard navigation for forms and menus.
- Contrast ratios on buttons and text.
- Accessible labels and alt text.
- Screen reader compatibility on login and dashboard.

### 8.4 Compatibility Testing

- Supported browsers: Chrome, Edge, Firefox, Safari.
- Mobile viewport responsiveness for login/signup pages.
- API compatibility with HTTP/1.1 and TLS.

## 9. Test Case Matrix

### 9.1 Priority 1: Must pass

- Authentication flows (signup/login/reset/change password).
- Protected route access.
- Mood logging and dashboard data.
- Journal CRUD.
- Appointment booking/cancellation.
- Role-based access for psychologist/admin.
- Chat session creation and message handling.

### 9.2 Priority 2: Important

- Notifications and badge engines.
- Intake form retrieval and submit.
- Settings/profile updates.
- Admin user management.
- Psychologist dashboard metrics.

### 9.3 Priority 3: Nice-to-have

- Landing page navigation.
- Visual charts and UI layout.
- Accessibility checks.

## 10. Test Data and Seed Strategy

- Seed at least one user each for:
  - Patient
  - Psychologist (approved and unapproved)
  - Admin
- Seed appointment slots and appointments.
- Seed mood tags, badges, notifications, and rewards.
- Use isolated database fixtures for automated tests.

## 11. Recommended Automation Approach

### 11.1 Backend

- Use Jest + Supertest for API tests.
- Use Prisma test database or SQLite in-memory for route tests.
- Validate route responses, status codes, and JSON payloads.

### 11.2 Frontend

- Use Jest + React Testing Library.
- Mock `src/api/index.js` calls for component behavior.
- Test page rendering, form errors, button actions, and navigation.

### 11.3 E2E

- Use Cypress to simulate cross-page workflows.
- Use CI-friendly config and seeded test data.

## 12. Risk Areas and Regression Focus

- Database connection and Prisma schema mismatches.
- Auth token refresh and protected route errors.
- Role mismatch between frontend role selection and backend user role.
- AI chat error handling from Groq API.
- Appointment availability and double booking.
- Gamification reward duplication.

## 13. Reporting and Metrics

- Track automated test pass/fail rates.
- Collect code coverage percentages for backend and frontend.
- Record defects by severity and feature.
- Run smoke tests after every deployment.

## 14. Notes for Future Test Expansion

- Add load tests for chat and dashboard endpoints.
- Add contract tests for API schema stability.
- Add mobile-specific regression tests for responsive pages.
- Add PR gating with automated test suite.

---

This document is designed to support project QA across development, deployment, and maintenance. It may be updated as new features are added or architecture changes.
