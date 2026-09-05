# AI Assistance Log — Prompts.md

## Project: The Data Hub (Sprint 09: Track B — Fullstack Developer)

This document tracks all AI prompts and interactions used during the development of Sprint 09 Track B, strictly abiding by course policy (LLMs authorized for debugging and conceptual explanation).

---

### Phase 1: Project Initialization & Express Server Setup

#### Entry 1: Project Initialization
- **Target Objective**: Initialize Node.js environment, configure `package.json`, install `express` as a core dependency, and install `nodemon` as a development dependency.
- **Prompt Used**:
  > "CRITICAL RULE: Build Sprint 09 strictly according to the Sprint 09 Track B assignment only. Do not modify, add, or anticipate any Sprint 10 requirements inside Sprint 09... I want to create the Sprint 09 Track B project, 'The Data Hub,' from zero as a separate Node.js + Express REST API project. Please begin with Step 1: Project Setup & Initialization."
- **Outcome / Explanation**:
  - `package.json` configured with entry point `server.js`.
  - Scripts configured: `"start": "node server.js"`, `"dev": "nodemon server.js"`.
  - Core dependency: `express`.
  - Dev dependency: `nodemon`.
  - Clean `.gitignore` verified to exclude `node_modules/`.

#### Entry 2: Dev Server Startup Fix
- **Target Objective**: Diagnose and resolve dev server startup failure ("The dev server didn't start, please fix it").
- **Prompt Used**:
  > "The dev server didn't start, please fix it"
- **Root Cause**: `package.json` was set to run `nodemon server.js`, but the initial `server.js` file had not yet been created, causing nodemon to fail on launch.
- **Outcome / Explanation**:
  - Created `server.js` with Express server initialization and `express.json()` middleware.
  - Bound listener to Port 5000 (Sprint 09 primary assignment requirement) and dual-bound to container proxy port 3000 to ensure connectivity across environments.
  - Restarted dev server and verified HTTP 200 JSON response on both ports.

---

### Phase 2: In-Memory Database & CRUD Architecture

#### Entry 3: In-Memory CRUD Implementation & Frontend Removal
- **Target Objective**: Remove unrequested frontend/Vite files, implement `blogPosts = []` in-memory data store, and construct standard REST routes (`GET /posts`, `GET /posts/:id`, `POST /posts`, `PUT /posts/:id`, `DELETE /posts/:id`).
- **Prompt Used**:
  > "IMPORTANT: SPRINT 09 TRACK B CORRECTION TASK... Your task is to inspect my CURRENT project and correct it so that it fully satisfies the original Sprint 09 Track B assignment... Remove unnecessary frontend files... Sprint 09 must remain exactly a Node.js + Express REST API using an in-memory JavaScript array."
- **Outcome / Explanation**:
  - Deleted unused React/Vite scaffolding (`/src/`, `vite.config.ts`, `tsconfig.json`).
  - Created `controllers/postController.js` containing `let blogPosts = []` and full CRUD logic with title and content validation, 400 Bad Request responses, 404 Not Found handling, and 201 Created statuses.
  - Created `routes/postRoutes.js` using `express.Router()` to cleanly route endpoints to controller actions.

---

### Phase 3: Custom Middleware, Authentication & Port Debugging

#### Entry 4: Custom Logger Middleware & Mock Authentication
- **Target Objective**: Implement custom request logger without third-party libraries and add a mock login endpoint returning a mock JWT token.
- **Outcome / Explanation**:
  - Created `middleware/logger.js` logging `[METHOD] URL - HH:MM AM/PM`.
  - Created `POST /login` in `server.js` accepting `email` and `password` and returning `{ "message": "Login successful", "token": "mock-jwt-token" }`.
  - Added 404 handler for unknown routes and 500 global error handler avoiding stack trace leakage.

#### Entry 5: Port Conflict Resolution (EADDRINUSE 8080)
- **Target Objective**: Debug server failure during automated test execution.
- **Root Cause**: When reading `process.env.PORT || 5000`, the container had `process.env.PORT=8080` already bound by the internal system, causing an `EADDRINUSE :::8080` unhandled error.
- **Outcome / Explanation**:
  - Changed port binding in `server.js` to strictly bind `PORT = 5000` (Sprint 09 requirement) and secondary listener on port 3000 with `EADDRINUSE` catch.
  - Server successfully starts on port 5000 and 3000 without crashing.

#### Entry 6: Postman / Thunder Client QA Verification
- **Target Objective**: Execute all 10 standard test cases and 6 failure cases against the live server.
- **Outcome / Explanation**:
  - All 16 tests executed against `http://localhost:5000`.
  - Verified 201 Created on valid POST, 200 OK on GET, 200 OK on PUT and DELETE, 400 Bad Request on missing fields, and 404 Not Found on non-existent IDs.
  - All responses returned valid JSON structures.

#### Entry 7: Minimal Correction - Single Port 5000 Listener & Frontend Cleanup
- **Target Objective**: Apply strict minimal corrections per Sprint 09 Track B instructions:
  1. Remove extra port 3000 listener in `server.js` so only Port 5000 is used.
  2. Remove leftover `index.html` frontend file.
  3. Verify Postman and deployment instructions remain accurate without fabricating test results.
- **Outcome / Explanation**:
  - `server.js` now exclusively binds to Port 5000 via `app.listen(PORT, ...)`.
  - `index.html` was deleted; no frontend code remains.
  - No MongoDB, Mongoose, or Sprint 10 features were added.

