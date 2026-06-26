# ColourAid — Milestone Tracker

> **Legend**: ✅ Complete · 🔄 In Progress · ⬜ Planned

---

## Milestone 1 — Backend Foundation ✅

**Goal**: Scaffold a production-grade Express backend with versioned routing and standard middleware.

| Task | Status |
|---|---|
| Scaffold backend folder structure | ✅ |
| Add versioned routing (`/api/v1`) | ✅ |
| Health endpoint `GET /api/v1/health` | ✅ |
| Centralised error middleware | ✅ |
| Morgan request logger | ✅ |
| Reusable `apiResponse` helper | ✅ |
| `.env.example` with minimal config | ✅ |
| Manual verification of startup & endpoint | ✅ |

---

## Milestone 2 — Ishihara Screening ✅

**Goal**: Implement a 3-plate Ishihara colour-blindness screening test with full backend persistence.

| Task | Status |
|---|---|
| Generate Ishihara plate PNGs (`generate_plates.py`) | ✅ |
| `ishihara_assessments` SQLite table | ✅ |
| `POST /api/v1/assessments/ishihara` — save result | ✅ |
| `GET /api/v1/assessments/ishihara` — list (session-scoped) | ✅ |
| `GET /api/v1/assessments/ishihara/:id` — fetch by id | ✅ |
| `DELETE /api/v1/assessments/ishihara/:id` | ✅ |
| Frontend multi-step plate flow | ✅ |
| Frontend calls backend on completion | ✅ |
| Ishihara screening history rendered in UI | ✅ |

---

## Milestone 3 — Farnsworth D-15 Assessment ✅

**Goal**: Implement the drag-and-drop Farnsworth D-15 colour-arrangement test with automated scoring and persistence.

| Task | Status |
|---|---|
| `farnsworth_assessments` SQLite table | ✅ |
| D-15 scoring algorithm (`farnsworthService.js`) | ✅ |
| `POST /api/v1/assessments/farnsworth` | ✅ |
| `GET /api/v1/assessments/farnsworth` — list (session-scoped) | ✅ |
| `GET /api/v1/assessments/farnsworth/:id` | ✅ |
| `DELETE /api/v1/assessments/farnsworth/:id` | ✅ |
| Drag-and-drop cap UI | ✅ |
| Canvas error-axis plot | ✅ |
| D-15 history rendered in UI | ✅ |
| Backend unit tests — scoring logic | ✅ |

---

## Milestone 4 — Adaptive Global Themes ✅

**Goal**: Apply CVD-specific CSS custom-property themes that update across the entire UI based on the user's assessment result.

| Task | Status |
|---|---|
| CSS theme tokens for Protan/Deutan | ✅ |
| CSS theme tokens for Tritan | ✅ |
| Auto-apply theme on assessment completion | ✅ |
| Manual override radio buttons | ✅ |
| Theme preview colour swatches | ✅ |
| Lock controls until assessment taken | ✅ |

---

## Milestone 5 — Image Correction (Daltonization) ✅

**Goal**: Allow users to upload images and view them under simulated CVD and after Daltonization correction — both server-side (high quality) and client-side (instant fallback).

| Task | Status |
|---|---|
| Multer upload route `POST /api/v1/images/upload` | ✅ |
| Image serve route `GET /api/v1/images/:filename` | ✅ |
| Sharp `recomb` backend Daltonization — Protanopia | ✅ |
| Sharp `recomb` backend Daltonization — Deuteranopia | ✅ |
| Sharp `recomb` backend Daltonization — Tritanopia | ✅ |
| Backend simulation matrices for all 3 CVD types | ✅ |
| `POST /api/v1/images/process` — `type` + `action` params | ✅ |
| Client-side Canvas LMS Daltonization pipeline (fallback) | ✅ |
| Server-side processing called first; fallback on error | ✅ |
| Drag-and-drop upload UI with original/simulated/corrected toggle | ✅ |
| Image correction locked until assessment taken | ✅ |

---

## Milestone 6 — Privacy & Session Isolation ✅

**Goal**: Ensure each user's assessment history is isolated to their local browser session.

| Task | Status |
|---|---|
| `sessionId` query-param support on Farnsworth GET endpoint | ✅ |
| `sessionId` query-param support on Ishihara GET endpoint | ✅ |
| Frontend sends `colouraid_session_id` with all history fetches | ✅ |
| Backend model SQL filters by `session_id` when param provided | ✅ |

---

## Milestone 7 — Testing & Documentation ✅

| Task | Status |
|---|---|
| Backend unit tests — D-15 scoring (`farnsworth.test.js`) | ✅ |
| Backend unit tests — Daltonization exports (`daltonization.test.js`) | ✅ |
| `npm test` script wired to `node --test` | ✅ |
| `01_PROJECT_OVERVIEW.md` populated | ✅ |
| `10_MILESTONES.md` populated (this file) | ✅ |

---

## Planned / Future Milestones

| Milestone | Notes |
|---|---|
| **User Accounts** | Register / login; tie assessments to authenticated users instead of anonymous sessions |
| **PostgreSQL Migration** | Swap SQLite for PostgreSQL using the existing abstraction layer (`backend/database/`) |
| **Admin Dashboard** | Aggregate statistics across all users (de-identified) |
| **Mobile-Optimised D-15** | Touch drag-and-drop for iOS / Android browsers |
| **PDF Report Export** | Downloadable summary of assessment results |
| **Localisation** | i18n support for multiple languages |
